import { Flow, wfa, action, trigger } from '@servicenow/sdk/automation'

// Catalog fulfillment flows. They decide WHO approves. The agent never
// supplies approvers: they are read from the CMDB and the user record.

// Tier 3: validated (GxP) application. System owner AND Quality must approve;
// either one can reject. Approvers come from the application CI.
export const gxpAccessApprovalFlow = Flow(
    {
        $id: Now.ID['flow-gxp-access-approval'],
        name: 'Helix: Validated (GxP) application access approval',
        runAs: 'system',
    },
    wfa.trigger(trigger.application.serviceCatalog, { $id: Now.ID['flow-gxp-trigger'] }, { run_flow_in: 'background' }),
    (params) => {
        // create_access_request sets the CI on the request item right after
        // submitting it. Wait for it so approvers are always read from the CMDB.
        wfa.action(
            action.core.waitForCondition,
            { $id: Now.ID['flow-gxp-wait-ci'], annotation: 'Wait for the application CI on the request item' },
            {
                table_name: 'sc_req_item',
                record: `${wfa.dataPill(params.trigger.request_item, 'reference')}`,
                conditions: 'cmdb_ciISNOTEMPTY',
            }
        )

        const app = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['flow-gxp-lookup-app'], annotation: 'Read approvers from the application CI' },
            {
                table: 'cmdb_ci_business_app',
                conditions: `sys_id=${wfa.dataPill(params.trigger.request_item.cmdb_ci, 'string')}`,
            }
        )

        const approval = wfa.action(
            action.core.askForApproval,
            { $id: Now.ID['flow-gxp-approval'], annotation: 'System owner and Quality' },
            {
                record: wfa.dataPill(params.trigger.request_item, 'reference'),
                table: 'sc_req_item',
                approval_reason: 'GxP validated system: the system owner and Quality must both approve.',
                approval_conditions: wfa.approvalRules({
                    conditionType: 'OR',
                    ruleSets: [
                        {
                            action: 'Approves',
                            conditionType: 'AND',
                            rules: [
                                [
                                    {
                                        ruleType: 'All',
                                        users: [
                                            wfa.dataPill(app.Record.x_snc_helix_core_system_owner, 'reference'),
                                            wfa.dataPill(app.Record.x_snc_helix_core_quality_approver, 'reference'),
                                        ],
                                        groups: [],
                                        manual: false,
                                    },
                                ],
                            ],
                        },
                        {
                            action: 'Rejects',
                            conditionType: 'AND',
                            rules: [
                                [
                                    {
                                        ruleType: 'Any',
                                        users: [
                                            wfa.dataPill(app.Record.x_snc_helix_core_system_owner, 'reference'),
                                            wfa.dataPill(app.Record.x_snc_helix_core_quality_approver, 'reference'),
                                        ],
                                        groups: [],
                                        manual: false,
                                    },
                                ],
                            ],
                        },
                    ],
                }),
            }
        )

        wfa.flowLogic.if(
            {
                $id: Now.ID['flow-gxp-if-approved'],
                condition: `${wfa.dataPill(approval.approval_state, 'choice')}=approved`,
            },
            () => {
                wfa.action(
                    action.core.createCatalogTask,
                    { $id: Now.ID['flow-gxp-provision-task'], annotation: 'Humans provision, never the AI' },
                    {
                        ah_requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                        ah_short_description:
                            'Provision access to the validated application. Approved by system owner and Quality. Performed by the application team: the AI agent has no provisioning tool.',
                        ah_wait: false,
                    }
                )
            }
        )
    }
)

// Tier 2: standard (non-validated) application. The requester's manager approves.
export const standardAccessApprovalFlow = Flow(
    {
        $id: Now.ID['flow-standard-access-approval'],
        name: 'Helix: Standard application access approval',
        runAs: 'system',
    },
    wfa.trigger(trigger.application.serviceCatalog, { $id: Now.ID['flow-std-trigger'] }, { run_flow_in: 'background' }),
    (params) => {
        const approval = wfa.action(
            action.core.askForApproval,
            { $id: Now.ID['flow-std-approval'], annotation: "Requester's manager" },
            {
                record: wfa.dataPill(params.trigger.request_item, 'reference'),
                table: 'sc_req_item',
                approval_reason: 'Standard application access: the requester\'s manager approves.',
                approval_conditions: wfa.approvalRules({
                    conditionType: 'OR',
                    ruleSets: [
                        {
                            action: 'ApprovesRejects',
                            conditionType: 'AND',
                            rules: [
                                [
                                    {
                                        ruleType: 'Any',
                                        users: [wfa.dataPill(params.trigger.request_item.requested_for.manager, 'reference')],
                                        groups: [],
                                        manual: false,
                                    },
                                ],
                            ],
                        },
                    ],
                }),
            }
        )

        wfa.flowLogic.if(
            {
                $id: Now.ID['flow-std-if-approved'],
                condition: `${wfa.dataPill(approval.approval_state, 'choice')}=approved`,
            },
            () => {
                wfa.action(
                    action.core.createCatalogTask,
                    { $id: Now.ID['flow-std-provision-task'] },
                    {
                        ah_requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                        ah_short_description: 'Provision access to the application. Approved by the requester\'s manager.',
                        ah_wait: false,
                    }
                )
            }
        )
    }
)
