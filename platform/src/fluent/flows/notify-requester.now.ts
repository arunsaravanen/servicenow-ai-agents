import { Subflow, wfa, action } from '@servicenow/sdk/automation'
import { ReferenceColumn, StringColumn, BooleanColumn } from '@servicenow/sdk/core'

// Tool: notify_requester. Posts a customer-visible comment on the incident or
// request item the agent just worked on. Limited to those two record types so
// it cannot become a general-purpose write tool.
export const notifyRequester = Subflow(
    {
        $id: Now.ID['subflow-notify-requester'],
        name: 'notify_requester',
        internalName: 'notify_requester',
        description: 'Tell the requester what happened and what happens next, as a comment on their ticket.',
        runAs: 'system',
        inputs: {
            requested_for: ReferenceColumn({ label: 'Requested for', referenceTable: 'sys_user', mandatory: true }),
            record_sys_id: StringColumn({ label: 'Incident or request item sys_id', mandatory: true }),
            message: StringColumn({ label: 'Message', maxLength: 4000, mandatory: true }),
            run_id: StringColumn({ label: 'Run ID' }),
            run_type: StringColumn({ label: 'Run type' }),
        },
        outputs: {
            success: BooleanColumn({ label: 'Success' }),
            audit_number: StringColumn({ label: 'Audit number' }),
            message: StringColumn({ label: 'Message', maxLength: 1000 }),
        },
    },
    (params) => {
        const ticket = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['notify-lookup-ticket'], annotation: 'Only incidents and request items' },
            {
                table: 'task',
                conditions: `sys_id=${wfa.dataPill(params.inputs.record_sys_id, 'string')}^sys_class_nameINincident,sc_req_item`,
                dont_fail_flow_on_error: true,
            }
        )

        wfa.flowLogic.if(
            {
                $id: Now.ID['notify-if-found'],
                condition: `${wfa.dataPill(ticket.Record.sys_id, 'string')}ISNOTEMPTY`,
            },
            () => {
                wfa.action(
                    action.core.updateRecord,
                    { $id: Now.ID['notify-add-comment'] },
                    {
                        table_name: 'task',
                        record: wfa.dataPill(ticket.Record, 'reference'),
                        values: TemplateValue({ comments: wfa.dataPill(params.inputs.message, 'string') }),
                    }
                )

                const audit = wfa.action(
                    action.core.createRecord,
                    { $id: Now.ID['notify-audit-executed'] },
                    {
                        table_name: 'x_snc_helix_core_ai_action',
                        values: TemplateValue({
                            run_id: wfa.dataPill(params.inputs.run_id, 'string'),
                            run_type: wfa.dataPill(params.inputs.run_type, 'string'),
                            requested_for: wfa.dataPill(params.inputs.requested_for, 'reference'),
                            tool_name: 'notify_requester',
                            decision: 'executed',
                            inputs: wfa.dataPill(params.inputs.message, 'string'),
                            result: 'Comment posted to the requester.',
                            target_table: 'task',
                            target_sys_id: wfa.dataPill(ticket.Record.sys_id, 'string'),
                            target_display: wfa.dataPill(ticket.Record.number, 'string'),
                            mfa_verified: 'not_required',
                            confirmed_by: 'not_required',
                        }),
                    }
                )

                wfa.flowLogic.assignSubflowOutputs({ $id: Now.ID['notify-out-success'] }, params.outputs, {
                    success: true,
                    audit_number: wfa.dataPill(audit.record.number, 'string'),
                    message: 'Requester notified.',
                })
            }
        )

        wfa.flowLogic.else({ $id: Now.ID['notify-else-refused'] }, () => {
            const audit = wfa.action(
                action.core.createRecord,
                { $id: Now.ID['notify-audit-rejected'] },
                {
                    table_name: 'x_snc_helix_core_ai_action',
                    values: TemplateValue({
                        run_id: wfa.dataPill(params.inputs.run_id, 'string'),
                        run_type: wfa.dataPill(params.inputs.run_type, 'string'),
                        requested_for: wfa.dataPill(params.inputs.requested_for, 'reference'),
                        tool_name: 'notify_requester',
                        decision: 'rejected',
                        inputs: wfa.dataPill(params.inputs.record_sys_id, 'string'),
                        result: 'Refused by the platform: target is not an incident or request item.',
                    }),
                }
            )

            wfa.flowLogic.assignSubflowOutputs({ $id: Now.ID['notify-out-refused'] }, params.outputs, {
                success: false,
                audit_number: wfa.dataPill(audit.record.number, 'string'),
                message: 'Refused: can only comment on an incident or request item.',
            })
        })
    }
)
