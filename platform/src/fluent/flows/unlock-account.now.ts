import { Subflow, wfa, action } from '@servicenow/sdk/automation'
import { ReferenceColumn, StringColumn, BooleanColumn } from '@servicenow/sdk/core'

// Tool: unlock_account (Tier 1, AI acts alone).
// Runs only with an MFA attestation. The attestation is added by the demo
// host after the presenter approves the simulated push; the model never sees
// or sets it. Writes its own audit row on every path.
export const unlockAccount = Subflow(
    {
        $id: Now.ID['subflow-unlock-account'],
        name: 'unlock_account',
        internalName: 'unlock_account',
        description: 'Unlock a locked-out account after MFA, record a resolved incident, audit the action.',
        runAs: 'system',
        inputs: {
            user: ReferenceColumn({ label: 'User', referenceTable: 'sys_user', mandatory: true }),
            mfa_status: StringColumn({ label: 'MFA status', mandatory: true }),
            run_id: StringColumn({ label: 'Run ID' }),
            run_type: StringColumn({ label: 'Run type' }),
            inputs_redacted: StringColumn({ label: 'Inputs (redacted)', maxLength: 4000 }),
        },
        outputs: {
            success: BooleanColumn({ label: 'Success' }),
            incident_number: StringColumn({ label: 'Incident number' }),
            incident_sys_id: StringColumn({ label: 'Incident sys_id' }),
            audit_number: StringColumn({ label: 'Audit number' }),
            message: StringColumn({ label: 'Message', maxLength: 1000 }),
        },
    },
    (params) => {
        wfa.flowLogic.if(
            {
                $id: Now.ID['unlock-if-mfa-approved'],
                condition: `${wfa.dataPill(params.inputs.mfa_status, 'string')}=approved_simulated`,
            },
            () => {
                wfa.action(
                    action.core.updateRecord,
                    { $id: Now.ID['unlock-clear-locked-out'] },
                    {
                        table_name: 'sys_user',
                        record: wfa.dataPill(params.inputs.user, 'reference'),
                        values: TemplateValue({ locked_out: false }),
                    }
                )

                const incident = wfa.action(
                    action.core.createRecord,
                    { $id: Now.ID['unlock-create-incident'], annotation: 'Record the work as a resolved incident' },
                    {
                        table_name: 'incident',
                        values: TemplateValue({
                            caller_id: wfa.dataPill(params.inputs.user, 'reference'),
                            short_description: 'Account locked out: unlocked by the AI service desk agent',
                            category: 'inquiry',
                            state: 6,
                            close_code: 'Solution provided',
                            close_notes:
                                'Identity verified by MFA push (simulated in this demo). Account unlocked by the unlock_account subflow. No human involved.',
                        }),
                    }
                )

                const audit = wfa.action(
                    action.core.createRecord,
                    { $id: Now.ID['unlock-audit-executed'] },
                    {
                        table_name: 'x_snc_helix_core_ai_action',
                        values: TemplateValue({
                            run_id: wfa.dataPill(params.inputs.run_id, 'string'),
                            run_type: wfa.dataPill(params.inputs.run_type, 'string'),
                            requested_for: wfa.dataPill(params.inputs.user, 'reference'),
                            tool_name: 'unlock_account',
                            autonomy_tier: 'tier_1',
                            decision: 'executed',
                            inputs: wfa.dataPill(params.inputs.inputs_redacted, 'string'),
                            result: 'Account unlocked. Incident created and resolved.',
                            target_table: 'incident',
                            target_sys_id: wfa.dataPill(incident.record.sys_id, 'string'),
                            target_display: wfa.dataPill(incident.record.number, 'string'),
                            mfa_verified: 'approved_simulated',
                            confirmed_by: 'not_required',
                        }),
                    }
                )

                wfa.flowLogic.assignSubflowOutputs({ $id: Now.ID['unlock-out-success'] }, params.outputs, {
                    success: true,
                    incident_number: wfa.dataPill(incident.record.number, 'string'),
                    incident_sys_id: wfa.dataPill(incident.record.sys_id, 'string'),
                    audit_number: wfa.dataPill(audit.record.number, 'string'),
                    message: 'Account unlocked. Incident resolved.',
                })
            }
        )

        wfa.flowLogic.else({ $id: Now.ID['unlock-else-no-mfa'] }, () => {
            const audit = wfa.action(
                action.core.createRecord,
                { $id: Now.ID['unlock-audit-rejected'] },
                {
                    table_name: 'x_snc_helix_core_ai_action',
                    values: TemplateValue({
                        run_id: wfa.dataPill(params.inputs.run_id, 'string'),
                        run_type: wfa.dataPill(params.inputs.run_type, 'string'),
                        requested_for: wfa.dataPill(params.inputs.user, 'reference'),
                        tool_name: 'unlock_account',
                        autonomy_tier: 'tier_1',
                        decision: 'rejected',
                        inputs: wfa.dataPill(params.inputs.inputs_redacted, 'string'),
                        result: 'Refused by the platform: no approved MFA attestation. Nothing was changed.',
                    }),
                }
            )

            wfa.flowLogic.assignSubflowOutputs({ $id: Now.ID['unlock-out-rejected'] }, params.outputs, {
                success: false,
                audit_number: wfa.dataPill(audit.record.number, 'string'),
                message: 'Refused: identity not verified. Nothing was changed.',
            })
        })
    }
)
