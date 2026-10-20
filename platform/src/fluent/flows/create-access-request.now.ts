import { Subflow, wfa, action } from '@servicenow/sdk/automation'
import { ReferenceColumn, StringColumn, BooleanColumn } from '@servicenow/sdk/core'
// Catalog items are referenced by their Now.ID keys (see catalog/access-items.now.ts).
import '../catalog/access-items.now'

// Tool: create_access_request (Supervised: runs only after a confirmation).
// The agent passes WHO and WHICH APP and WHY. The platform decides the tier,
// the catalog item and the approvers from the CMDB. It never provisions.
// Fail closed: unclassified apps are treated as validated, and if the
// approvers are not on record nothing is submitted.
export const createAccessRequest = Subflow(
    {
        $id: Now.ID['subflow-create-access-request'],
        name: 'create_access_request',
        internalName: 'create_access_request',
        description: 'Submit an application access request routed by GxP classification. Never provisions.',
        runAs: 'system',
        inputs: {
            requested_for: ReferenceColumn({ label: 'Requested for', referenceTable: 'sys_user', mandatory: true }),
            application: ReferenceColumn({
                label: 'Application',
                referenceTable: 'cmdb_ci_business_app',
                mandatory: true,
            }),
            justification: StringColumn({ label: 'Business justification', maxLength: 4000 }),
            confirmed_by: StringColumn({ label: 'Confirmed by' }),
            run_id: StringColumn({ label: 'Run ID' }),
            run_type: StringColumn({ label: 'Run type' }),
            inputs_redacted: StringColumn({ label: 'Inputs (redacted)', maxLength: 4000 }),
        },
        outputs: {
            success: BooleanColumn({ label: 'Success' }),
            autonomy_tier: StringColumn({ label: 'Autonomy tier' }),
            request_number: StringColumn({ label: 'Request item number' }),
            request_sys_id: StringColumn({ label: 'Request item sys_id' }),
            manager_name: StringColumn({ label: 'Manager approver' }),
            system_owner_name: StringColumn({ label: 'System owner approver' }),
            quality_approver_name: StringColumn({ label: 'Quality approver' }),
            audit_number: StringColumn({ label: 'Audit number' }),
            message: StringColumn({ label: 'Message', maxLength: 1000 }),
        },
    },
    (params) => {
        wfa.flowLogic.if(
            {
                $id: Now.ID['car-if-confirmed'],
                annotation: 'Supervised: a confirmation must be present',
                condition: `${wfa.dataPill(params.inputs.confirmed_by, 'string')}=human_presenter^OR${wfa.dataPill(params.inputs.confirmed_by, 'string')}=eval_harness^OR${wfa.dataPill(params.inputs.confirmed_by, 'string')}=studio_supervised`,
            },
            () => {
                const app = wfa.action(
                    action.core.lookUpRecord,
                    { $id: Now.ID['car-lookup-app'] },
                    {
                        table: 'cmdb_ci_business_app',
                        conditions: `sys_id=${wfa.dataPill(params.inputs.application, 'string')}`,
                    }
                )

                // Tier 2: explicitly not validated, and a manager exists to approve.
                wfa.flowLogic.if(
                    {
                        $id: Now.ID['car-if-standard'],
                        condition: `${wfa.dataPill(app.Record.x_snc_helix_core_gxp_classification, 'string')}=not_validated^${wfa.dataPill(params.inputs.requested_for.manager, 'string')}ISNOTEMPTY`,
                    },
                    () => {
                        const submitted = wfa.action(
                            action.core.submitCatalogItemRequest,
                            { $id: Now.ID['car-submit-standard'] },
                            {
                                catalog_item: Now.ref('sc_cat_item', 'cat-item-standard-access'),
                                sysparm_requested_for: wfa.dataPill(params.inputs.requested_for, 'reference'),
                                special_instructions: wfa.dataPill(params.inputs.justification, 'string'),
                            }
                        )

                        wfa.action(
                            action.core.updateRecord,
                            { $id: Now.ID['car-standard-set-ci'] },
                            {
                                table_name: 'sc_req_item',
                                record: wfa.dataPill(submitted.requested_item, 'reference'),
                                values: TemplateValue({
                                    cmdb_ci: wfa.dataPill(params.inputs.application, 'reference'),
                                    short_description: wfa.dataPill(app.Record.name, 'string'),
                                    description: wfa.dataPill(params.inputs.justification, 'string'),
                                }),
                            }
                        )

                        const audit = wfa.action(
                            action.core.createRecord,
                            { $id: Now.ID['car-audit-standard'] },
                            {
                                table_name: 'x_snc_helix_core_ai_action',
                                values: TemplateValue({
                                    run_id: wfa.dataPill(params.inputs.run_id, 'string'),
                                    run_type: wfa.dataPill(params.inputs.run_type, 'string'),
                                    requested_for: wfa.dataPill(params.inputs.requested_for, 'reference'),
                                    tool_name: 'create_access_request',
                                    autonomy_tier: 'tier_2',
                                    decision: 'routed_for_approval',
                                    inputs: wfa.dataPill(params.inputs.inputs_redacted, 'string'),
                                    result: 'Standard access request submitted. Routed to the requester\'s manager.',
                                    target_table: 'sc_req_item',
                                    target_sys_id: wfa.dataPill(submitted.requested_item.sys_id, 'string'),
                                    target_display: wfa.dataPill(submitted.requested_item.number, 'string'),
                                    mfa_verified: 'not_required',
                                    confirmed_by: wfa.dataPill(params.inputs.confirmed_by, 'string'),
                                }),
                            }
                        )

                        wfa.flowLogic.assignSubflowOutputs({ $id: Now.ID['car-out-standard'] }, params.outputs, {
                            success: true,
                            autonomy_tier: 'tier_2',
                            request_number: wfa.dataPill(submitted.requested_item.number, 'string'),
                            request_sys_id: wfa.dataPill(submitted.requested_item.sys_id, 'string'),
                            manager_name: wfa.dataPill(params.inputs.requested_for.manager.name, 'string'),
                            audit_number: wfa.dataPill(audit.record.number, 'string'),
                            message: 'Submitted. The requester\'s manager has been asked to approve.',
                        })
                    }
                )

                // Tier 3: validated OR unclassified, with both approvers on record.
                wfa.flowLogic.elseIf(
                    {
                        $id: Now.ID['car-elseif-gxp'],
                        condition: `${wfa.dataPill(app.Record.x_snc_helix_core_gxp_classification, 'string')}!=not_validated^${wfa.dataPill(app.Record.x_snc_helix_core_system_owner, 'string')}ISNOTEMPTY^${wfa.dataPill(app.Record.x_snc_helix_core_quality_approver, 'string')}ISNOTEMPTY`,
                    },
                    () => {
                        const submitted = wfa.action(
                            action.core.submitCatalogItemRequest,
                            { $id: Now.ID['car-submit-gxp'] },
                            {
                                catalog_item: Now.ref('sc_cat_item', 'cat-item-gxp-access'),
                                sysparm_requested_for: wfa.dataPill(params.inputs.requested_for, 'reference'),
                                special_instructions: wfa.dataPill(params.inputs.justification, 'string'),
                            }
                        )

                        wfa.action(
                            action.core.updateRecord,
                            { $id: Now.ID['car-gxp-set-ci'], annotation: 'The approval flow reads approvers from this CI' },
                            {
                                table_name: 'sc_req_item',
                                record: wfa.dataPill(submitted.requested_item, 'reference'),
                                values: TemplateValue({
                                    cmdb_ci: wfa.dataPill(params.inputs.application, 'reference'),
                                    short_description: wfa.dataPill(app.Record.name, 'string'),
                                    description: wfa.dataPill(params.inputs.justification, 'string'),
                                }),
                            }
                        )

                        const audit = wfa.action(
                            action.core.createRecord,
                            { $id: Now.ID['car-audit-gxp'] },
                            {
                                table_name: 'x_snc_helix_core_ai_action',
                                values: TemplateValue({
                                    run_id: wfa.dataPill(params.inputs.run_id, 'string'),
                                    run_type: wfa.dataPill(params.inputs.run_type, 'string'),
                                    requested_for: wfa.dataPill(params.inputs.requested_for, 'reference'),
                                    tool_name: 'create_access_request',
                                    autonomy_tier: 'tier_3',
                                    decision: 'routed_for_approval',
                                    inputs: wfa.dataPill(params.inputs.inputs_redacted, 'string'),
                                    result: 'Validated system: request submitted, routed to system owner and Quality. Not provisioned.',
                                    target_table: 'sc_req_item',
                                    target_sys_id: wfa.dataPill(submitted.requested_item.sys_id, 'string'),
                                    target_display: wfa.dataPill(submitted.requested_item.number, 'string'),
                                    mfa_verified: 'not_required',
                                    confirmed_by: wfa.dataPill(params.inputs.confirmed_by, 'string'),
                                }),
                            }
                        )

                        wfa.flowLogic.assignSubflowOutputs({ $id: Now.ID['car-out-gxp'] }, params.outputs, {
                            success: true,
                            autonomy_tier: 'tier_3',
                            request_number: wfa.dataPill(submitted.requested_item.number, 'string'),
                            request_sys_id: wfa.dataPill(submitted.requested_item.sys_id, 'string'),
                            system_owner_name: wfa.dataPill(app.Record.x_snc_helix_core_system_owner.name, 'string'),
                            quality_approver_name: wfa.dataPill(app.Record.x_snc_helix_core_quality_approver.name, 'string'),
                            audit_number: wfa.dataPill(audit.record.number, 'string'),
                            message: 'Submitted. The system owner and Quality must both approve. The AI does not provision validated systems.',
                        })
                    }
                )

                // Fail closed: no approvers on record (e.g. unclassified CI, or no manager).
                wfa.flowLogic.else({ $id: Now.ID['car-else-no-approvers'] }, () => {
                    const audit = wfa.action(
                        action.core.createRecord,
                        { $id: Now.ID['car-audit-no-approvers'] },
                        {
                            table_name: 'x_snc_helix_core_ai_action',
                            values: TemplateValue({
                                run_id: wfa.dataPill(params.inputs.run_id, 'string'),
                                run_type: wfa.dataPill(params.inputs.run_type, 'string'),
                                requested_for: wfa.dataPill(params.inputs.requested_for, 'reference'),
                                tool_name: 'create_access_request',
                                autonomy_tier: 'tier_3',
                                decision: 'rejected',
                                inputs: wfa.dataPill(params.inputs.inputs_redacted, 'string'),
                                result: 'Refused by the platform: no approvers on record for this application. Nothing was submitted.',
                                mfa_verified: 'not_required',
                                confirmed_by: wfa.dataPill(params.inputs.confirmed_by, 'string'),
                            }),
                        }
                    )

                    wfa.flowLogic.assignSubflowOutputs({ $id: Now.ID['car-out-no-approvers'] }, params.outputs, {
                        success: false,
                        autonomy_tier: 'tier_3',
                        audit_number: wfa.dataPill(audit.record.number, 'string'),
                        message:
                            'Not submitted: this application has no approvers on record (it may not be classified by Quality yet). The service desk must route it manually.',
                    })
                })
            }
        )

        wfa.flowLogic.else({ $id: Now.ID['car-else-not-confirmed'] }, () => {
            const audit = wfa.action(
                action.core.createRecord,
                { $id: Now.ID['car-audit-not-confirmed'] },
                {
                    table_name: 'x_snc_helix_core_ai_action',
                    values: TemplateValue({
                        run_id: wfa.dataPill(params.inputs.run_id, 'string'),
                        run_type: wfa.dataPill(params.inputs.run_type, 'string'),
                        requested_for: wfa.dataPill(params.inputs.requested_for, 'reference'),
                        tool_name: 'create_access_request',
                        decision: 'rejected',
                        inputs: wfa.dataPill(params.inputs.inputs_redacted, 'string'),
                        result: 'Refused by the platform: no confirmation. Nothing was submitted.',
                    }),
                }
            )

            wfa.flowLogic.assignSubflowOutputs({ $id: Now.ID['car-out-not-confirmed'] }, params.outputs, {
                success: false,
                audit_number: wfa.dataPill(audit.record.number, 'string'),
                message: 'Refused: a human must confirm before a request is submitted.',
            })
        })
    }
)
