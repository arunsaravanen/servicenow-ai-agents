import { readBody, text, reply, findActiveUser, findApplication, runType, runSubflow } from './common.ts'

// POST /api/x_snc_helix_core/agent/access_request
// Body: { user_sys_id, application_sys_id, justification, confirmed_by, run_id, run_type }
// No approver fields: the platform reads approvers from the CMDB.
// confirmed_by is added by the demo host after the presenter clicks Confirm.
export function accessRequestHandler(request: any, response: any): void {
    const body = readBody(request)
    const user = findActiveUser(text(body.user_sys_id, 32))
    if (!user) {
        reply(response, 404, { error: 'user_not_found' })
        return
    }
    const app = findApplication(text(body.application_sys_id, 32))
    if (!app) {
        reply(response, 404, { error: 'application_not_found' })
        return
    }

    const justification = text(body.justification, 1000)
    const out = runSubflow('create_access_request', {
        requested_for: user, // reference inputs take the GlideRecord, not the sys_id
        application: app,
        justification: justification,
        confirmed_by: text(body.confirmed_by, 40),
        run_id: text(body.run_id, 64),
        run_type: runType(body.run_type),
        inputs_redacted: JSON.stringify({
            user: user.getValue('user_name'),
            application: app.getValue('name'),
            justification: justification.slice(0, 200),
        }),
    })

    // Subflow outputs are platform objects; convert each one to plain text.
    const approvers: string[] = []
    if (text(out.manager_name)) approvers.push(text(out.manager_name, 100) + ' (manager)')
    if (text(out.system_owner_name)) approvers.push(text(out.system_owner_name, 100) + ' (system owner)')
    if (text(out.quality_approver_name)) approvers.push(text(out.quality_approver_name, 100) + ' (Quality)')

    const success = text(out.success) === 'true'
    reply(response, success ? 201 : 403, {
        success: success,
        tool: 'create_access_request',
        application: app.getValue('name'),
        autonomy_tier: text(out.autonomy_tier, 20) || null,
        request_number: text(out.request_number, 40) || null,
        request_sys_id: text(out.request_sys_id, 32) || null,
        approvers: approvers,
        audit_number: text(out.audit_number, 40) || null,
        message: text(out.message, 1000) || null,
    })
}
