import { Subflow, wfa, action } from '@servicenow/sdk/automation'
import { StringColumn, BooleanColumn } from '@servicenow/sdk/core'

// Studio tool wrappers. Each runs AS THE CALLER (runAs: 'user'), so the
// requester is always the logged-in user, never a name the model supplies.
// They expose only business inputs to the model and delegate the work to the
// core app's subflows, the same ones the external agent reaches through REST.

// Core subflows (x_snc_helix_core). sys_ids come from platform/src/fluent/generated/keys.ts
// and are identical on every instance the core app is installed on.
const CORE_CHECK_APPLICATION = '202546fdabae4e4580ebd2eee92f068e'
const CORE_CHECK_ENTITLEMENTS = '2073b2a7ed754529901d2cf94497ea12'
const CORE_CREATE_ACCESS_REQUEST = 'f5934dada8684d80990f1f7cae0a3734'
const CORE_NOTIFY_REQUESTER = 'a8d4c0d51b1e4bbc9d2cb0df380898b9'

// Tool: lookup_user. Who is asking? Answered by the session, not the chat.
export const studioLookupUser = Subflow(
    {
        $id: Now.ID['studio-lookup-user'],
        name: 'studio_lookup_user',
        internalName: 'studio_lookup_user',
        description: 'Return the name, title and manager of the user who is asking.',
        runAs: 'user',
        inputs: {},
        outputs: {
            name: StringColumn({ label: 'Name' }),
            title: StringColumn({ label: 'Title' }),
            manager: StringColumn({ label: 'Manager' }),
        },
    },
    (params) => {
        const me = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['studio-lookup-user-me'] },
            { table: 'sys_user', conditions: 'sys_id=javascript:gs.getUserID()' }
        )
        wfa.flowLogic.assignSubflowOutputs({ $id: Now.ID['studio-lookup-user-out'] }, params.outputs, {
            name: wfa.dataPill(me.Record.name, 'string'),
            title: wfa.dataPill(me.Record.title, 'string'),
            manager: wfa.dataPill(me.Record.manager.name, 'string'),
        })
    }
)

// Tool: check_application. The platform reports the GxP classification.
export const studioCheckApplication = Subflow(
    {
        $id: Now.ID['studio-check-application'],
        name: 'studio_check_application',
        internalName: 'studio_check_application',
        description: 'Return the GxP classification and approvers of an application, by name.',
        runAs: 'user',
        inputs: {
            application_name: StringColumn({ label: 'Application name', mandatory: true }),
        },
        outputs: {
            found: BooleanColumn({ label: 'Found' }),
            application: StringColumn({ label: 'Application' }),
            gxp_classification: StringColumn({ label: 'GxP classification' }),
            system_owner: StringColumn({ label: 'System owner' }),
            quality_approver: StringColumn({ label: 'Quality approver' }),
        },
    },
    (params) => {
        const app = wfa.subflow(
            CORE_CHECK_APPLICATION,
            { $id: Now.ID['studio-check-application-core'] },
            {
                application_name: wfa.dataPill(params.inputs.application_name, 'string'),
                run_id: 'studio',
                run_type: 'demo',
                waitForCompletion: true,
            }
        )
        wfa.flowLogic.assignSubflowOutputs({ $id: Now.ID['studio-check-application-out'] }, params.outputs, {
            found: wfa.dataPill(app.found, 'boolean'),
            application: wfa.dataPill(app.application, 'string'),
            gxp_classification: wfa.dataPill(app.gxp_classification, 'string'),
            system_owner: wfa.dataPill(app.system_owner_name, 'string'),
            quality_approver: wfa.dataPill(app.quality_approver_name, 'string'),
        })
    }
)

// Tool: check_entitlements. Only ever about the caller's own access.
export const studioCheckEntitlements = Subflow(
    {
        $id: Now.ID['studio-check-entitlements'],
        name: 'studio_check_entitlements',
        internalName: 'studio_check_entitlements',
        description: 'Check whether the user who is asking already has access to an application.',
        runAs: 'user',
        inputs: {
            application_name: StringColumn({ label: 'Application name', mandatory: true }),
        },
        outputs: {
            found: BooleanColumn({ label: 'Application found' }),
            has_access: BooleanColumn({ label: 'Has access' }),
            granted_on: StringColumn({ label: 'Granted on' }),
        },
    },
    (params) => {
        const me = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['studio-check-ent-me'] },
            { table: 'sys_user', conditions: 'sys_id=javascript:gs.getUserID()' }
        )
        const app = wfa.subflow(
            CORE_CHECK_APPLICATION,
            { $id: Now.ID['studio-check-ent-app'] },
            {
                application_name: wfa.dataPill(params.inputs.application_name, 'string'),
                run_id: 'studio',
                run_type: 'demo',
                waitForCompletion: true,
            }
        )
        wfa.flowLogic.if(
            { $id: Now.ID['studio-check-ent-if-found'], condition: `${wfa.dataPill(app.found, 'boolean')}=true` },
            () => {
                const ent = wfa.subflow(
                    CORE_CHECK_ENTITLEMENTS,
                    { $id: Now.ID['studio-check-ent-core'] },
                    {
                        user: wfa.dataPill(me.Record, 'reference'),
                        application: wfa.dataPill(app.application_sys_id, 'reference'),
                        run_id: 'studio',
                        run_type: 'demo',
                        waitForCompletion: true,
                    }
                )
                wfa.flowLogic.assignSubflowOutputs({ $id: Now.ID['studio-check-ent-out'] }, params.outputs, {
                    found: true,
                    has_access: wfa.dataPill(ent.has_access, 'boolean'),
                    granted_on: wfa.dataPill(ent.granted_on, 'string'),
                })
            }
        )
        wfa.flowLogic.else({ $id: Now.ID['studio-check-ent-else'] }, () => {
            wfa.flowLogic.assignSubflowOutputs({ $id: Now.ID['studio-check-ent-out-missing'] }, params.outputs, {
                found: false,
                has_access: false,
            })
        })
    }
)

// Tool: create_access_request (Supervised in the agent). Requested for the
// caller; tier, catalog item and approvers are decided by the core subflow.
export const studioCreateAccessRequest = Subflow(
    {
        $id: Now.ID['studio-create-access-request'],
        name: 'studio_create_access_request',
        internalName: 'studio_create_access_request',
        description: 'Submit an access request for the user who is asking. Never provisions.',
        runAs: 'user',
        inputs: {
            application_name: StringColumn({ label: 'Application name', mandatory: true }),
            justification: StringColumn({ label: 'Business justification', maxLength: 1000, mandatory: true }),
        },
        outputs: {
            success: BooleanColumn({ label: 'Success' }),
            autonomy_tier: StringColumn({ label: 'Autonomy tier' }),
            request_number: StringColumn({ label: 'Request number' }),
            manager: StringColumn({ label: 'Manager approver' }),
            system_owner: StringColumn({ label: 'System owner approver' }),
            quality_approver: StringColumn({ label: 'Quality approver' }),
            message: StringColumn({ label: 'Message', maxLength: 1000 }),
        },
    },
    (params) => {
        const me = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['studio-car-me'] },
            { table: 'sys_user', conditions: 'sys_id=javascript:gs.getUserID()' }
        )
        const app = wfa.subflow(
            CORE_CHECK_APPLICATION,
            { $id: Now.ID['studio-car-app'] },
            {
                application_name: wfa.dataPill(params.inputs.application_name, 'string'),
                run_id: 'studio',
                run_type: 'demo',
                waitForCompletion: true,
            }
        )
        wfa.flowLogic.if(
            { $id: Now.ID['studio-car-if-found'], condition: `${wfa.dataPill(app.found, 'boolean')}=true` },
            () => {
                const req = wfa.subflow(
                    CORE_CREATE_ACCESS_REQUEST,
                    { $id: Now.ID['studio-car-core'] },
                    {
                        requested_for: wfa.dataPill(me.Record, 'reference'),
                        application: wfa.dataPill(app.application_sys_id, 'reference'),
                        justification: wfa.dataPill(params.inputs.justification, 'string'),
                        // The human gate is Studio's Supervised execution mode on this tool.
                        confirmed_by: 'studio_supervised',
                        run_id: 'studio',
                        run_type: 'demo',
                        inputs_redacted: wfa.dataPill(params.inputs.application_name, 'string'),
                        waitForCompletion: true,
                    }
                )
                wfa.flowLogic.assignSubflowOutputs({ $id: Now.ID['studio-car-out'] }, params.outputs, {
                    success: wfa.dataPill(req.success, 'boolean'),
                    autonomy_tier: wfa.dataPill(req.autonomy_tier, 'string'),
                    request_number: wfa.dataPill(req.request_number, 'string'),
                    manager: wfa.dataPill(req.manager_name, 'string'),
                    system_owner: wfa.dataPill(req.system_owner_name, 'string'),
                    quality_approver: wfa.dataPill(req.quality_approver_name, 'string'),
                    message: wfa.dataPill(req.message, 'string'),
                })
            }
        )
        wfa.flowLogic.else({ $id: Now.ID['studio-car-else'] }, () => {
            wfa.flowLogic.assignSubflowOutputs({ $id: Now.ID['studio-car-out-missing'] }, params.outputs, {
                success: false,
                message: 'No application with that name was found. Nothing was submitted.',
            })
        })
    }
)

// Tool: notify_requester. Posts a comment on the caller's request item or incident.
export const studioNotifyRequester = Subflow(
    {
        $id: Now.ID['studio-notify-requester'],
        name: 'studio_notify_requester',
        internalName: 'studio_notify_requester',
        description: 'Add a comment the user can see on their request item or incident.',
        runAs: 'user',
        inputs: {
            record_number: StringColumn({ label: 'Request item or incident number', mandatory: true }),
            message: StringColumn({ label: 'Message', maxLength: 4000, mandatory: true }),
        },
        outputs: {
            success: BooleanColumn({ label: 'Success' }),
            message: StringColumn({ label: 'Message', maxLength: 1000 }),
        },
    },
    (params) => {
        const me = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['studio-notify-me'] },
            { table: 'sys_user', conditions: 'sys_id=javascript:gs.getUserID()' }
        )
        const ticket = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['studio-notify-ticket'] },
            {
                table: 'task',
                conditions: `number=${wfa.dataPill(params.inputs.record_number, 'string')}^sys_class_nameINincident,sc_req_item`,
                dont_fail_flow_on_error: true,
            }
        )
        const out = wfa.subflow(
            CORE_NOTIFY_REQUESTER,
            { $id: Now.ID['studio-notify-core'] },
            {
                requested_for: wfa.dataPill(me.Record, 'reference'),
                record_sys_id: wfa.dataPill(ticket.Record.sys_id, 'string'),
                message: wfa.dataPill(params.inputs.message, 'string'),
                run_id: 'studio',
                run_type: 'demo',
                waitForCompletion: true,
            }
        )
        wfa.flowLogic.assignSubflowOutputs({ $id: Now.ID['studio-notify-out'] }, params.outputs, {
            success: wfa.dataPill(out.success, 'boolean'),
            message: wfa.dataPill(out.message, 'string'),
        })
    }
)
