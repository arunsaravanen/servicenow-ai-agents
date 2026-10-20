import { Subflow, wfa, action } from '@servicenow/sdk/automation'
import { ReferenceColumn, StringColumn, BooleanColumn } from '@servicenow/sdk/core'

// Read tools. Narrow on purpose: each returns only what the agent needs,
// and each writes an audit row so the platform can prove what was read.
// Shared by the external agent's REST endpoints and the Studio agent.

// Tool: check_application. The platform, not the model, decides whether the
// app is validated. Blank classification is reported as 'unclassified'.
export const checkApplication = Subflow(
    {
        $id: Now.ID['subflow-check-application'],
        name: 'check_application',
        internalName: 'check_application',
        description: 'Look up an application CI by name and return its GxP classification and approvers.',
        runAs: 'system',
        inputs: {
            application_name: StringColumn({ label: 'Application name', mandatory: true }),
            run_id: StringColumn({ label: 'Run ID' }),
            run_type: StringColumn({ label: 'Run type' }),
        },
        outputs: {
            found: BooleanColumn({ label: 'Found' }),
            application_sys_id: StringColumn({ label: 'Application sys_id' }),
            application: StringColumn({ label: 'Application' }),
            gxp_classification: StringColumn({ label: 'GxP classification' }),
            system_owner_name: StringColumn({ label: 'System owner' }),
            quality_approver_name: StringColumn({ label: 'Quality approver' }),
            audit_number: StringColumn({ label: 'Audit number' }),
        },
    },
    (params) => {
        const app = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['check-app-lookup'] },
            {
                table: 'cmdb_ci_business_app',
                conditions: `nameSTARTSWITH${wfa.dataPill(params.inputs.application_name, 'string')}`,
                dont_fail_flow_on_error: true,
            }
        )

        wfa.flowLogic.if(
            { $id: Now.ID['check-app-if-found'], condition: `${wfa.dataPill(app.Record.sys_id, 'string')}ISNOTEMPTY` },
            () => {
                const audit = wfa.action(
                    action.core.createRecord,
                    { $id: Now.ID['check-app-audit-found'] },
                    {
                        table_name: 'x_snc_helix_core_ai_action',
                        values: TemplateValue({
                            run_id: wfa.dataPill(params.inputs.run_id, 'string'),
                            run_type: wfa.dataPill(params.inputs.run_type, 'string'),
                            tool_name: 'check_application',
                            autonomy_tier: 'read',
                            decision: 'read',
                            inputs: wfa.dataPill(params.inputs.application_name, 'string'),
                            result: wfa.dataPill(app.Record.x_snc_helix_core_gxp_classification, 'string'),
                            target_table: 'cmdb_ci_business_app',
                            target_sys_id: wfa.dataPill(app.Record.sys_id, 'string'),
                            target_display: wfa.dataPill(app.Record.name, 'string'),
                        }),
                    }
                )
                wfa.flowLogic.assignSubflowOutputs({ $id: Now.ID['check-app-out-found'] }, params.outputs, {
                    found: true,
                    application_sys_id: wfa.dataPill(app.Record.sys_id, 'string'),
                    application: wfa.dataPill(app.Record.name, 'string'),
                    gxp_classification: wfa.dataPill(app.Record.x_snc_helix_core_gxp_classification, 'string'),
                    system_owner_name: wfa.dataPill(app.Record.x_snc_helix_core_system_owner.name, 'string'),
                    quality_approver_name: wfa.dataPill(app.Record.x_snc_helix_core_quality_approver.name, 'string'),
                    audit_number: wfa.dataPill(audit.record.number, 'string'),
                })
            }
        )

        wfa.flowLogic.else({ $id: Now.ID['check-app-else'] }, () => {
            wfa.flowLogic.assignSubflowOutputs({ $id: Now.ID['check-app-out-missing'] }, params.outputs, {
                found: false,
            })
        })
    }
)

// Tool: check_entitlements. Answers one question: does this user already
// have this application? Never lists anyone else's access.
export const checkEntitlements = Subflow(
    {
        $id: Now.ID['subflow-check-entitlements'],
        name: 'check_entitlements',
        internalName: 'check_entitlements',
        description: 'Check whether a user already holds an active entitlement to an application.',
        runAs: 'system',
        inputs: {
            user: ReferenceColumn({ label: 'User', referenceTable: 'sys_user', mandatory: true }),
            application: ReferenceColumn({ label: 'Application', referenceTable: 'cmdb_ci_business_app', mandatory: true }),
            run_id: StringColumn({ label: 'Run ID' }),
            run_type: StringColumn({ label: 'Run type' }),
        },
        outputs: {
            has_access: BooleanColumn({ label: 'Has access' }),
            granted_on: StringColumn({ label: 'Granted on' }),
            audit_number: StringColumn({ label: 'Audit number' }),
        },
    },
    (params) => {
        // Use the reference inputs directly (their value is the sys_id). Dot-walking
        // them (.sys_id, .name) fails when a caller passes a sys_id rather than a record.
        const app = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['check-ent-app'] },
            {
                table: 'cmdb_ci_business_app',
                conditions: `sys_id=${wfa.dataPill(params.inputs.application, 'string')}`,
                dont_fail_flow_on_error: true,
            }
        )
        const ent = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['check-ent-lookup'] },
            {
                table: 'x_snc_helix_core_entitlement',
                conditions: `user=${wfa.dataPill(params.inputs.user, 'string')}^application=${wfa.dataPill(params.inputs.application, 'string')}^active=true`,
                dont_fail_flow_on_error: true,
            }
        )

        const audit = wfa.action(
            action.core.createRecord,
            { $id: Now.ID['check-ent-audit'] },
            {
                table_name: 'x_snc_helix_core_ai_action',
                values: TemplateValue({
                    run_id: wfa.dataPill(params.inputs.run_id, 'string'),
                    run_type: wfa.dataPill(params.inputs.run_type, 'string'),
                    requested_for: wfa.dataPill(params.inputs.user, 'reference'),
                    tool_name: 'check_entitlements',
                    autonomy_tier: 'read',
                    decision: 'read',
                    inputs: wfa.dataPill(app.Record.name, 'string'),
                    target_table: 'cmdb_ci_business_app',
                    target_sys_id: wfa.dataPill(params.inputs.application, 'string'),
                    target_display: wfa.dataPill(app.Record.name, 'string'),
                }),
            }
        )

        wfa.flowLogic.if(
            { $id: Now.ID['check-ent-if-has'], condition: `${wfa.dataPill(ent.Record.sys_id, 'string')}ISNOTEMPTY` },
            () => {
                wfa.flowLogic.assignSubflowOutputs({ $id: Now.ID['check-ent-out-has'] }, params.outputs, {
                    has_access: true,
                    granted_on: wfa.dataPill(ent.Record.granted_on, 'string'),
                    audit_number: wfa.dataPill(audit.record.number, 'string'),
                })
            }
        )
        wfa.flowLogic.else({ $id: Now.ID['check-ent-else'] }, () => {
            wfa.flowLogic.assignSubflowOutputs({ $id: Now.ID['check-ent-out-none'] }, params.outputs, {
                has_access: false,
                audit_number: wfa.dataPill(audit.record.number, 'string'),
            })
        })
    }
)
