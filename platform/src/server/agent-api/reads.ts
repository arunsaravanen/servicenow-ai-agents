import { reply, text, findActiveUser, findApplication, runType, runSubflow } from './common.ts'

// GET handlers. Each calls one read subflow; the subflow writes the audit row.

function param(request: any, name: string): string {
    const value = request.queryParams ? request.queryParams[name] : null
    // queryParams values arrive as arrays of strings
    return text(Array.isArray(value) ? value[0] : value, 200)
}

// GET /api/x_snc_helix_core/agent/application?name=LIMS&run_id=...&run_type=...
export function applicationHandler(request: any, response: any): void {
    const name = param(request, 'name')
    // The name goes into an encoded query: ^ would let a caller add conditions of its own.
    if (!name || /[\^\r\n]/.test(name)) {
        reply(response, 400, { error: 'invalid_name' })
        return
    }
    const out = runSubflow('check_application', {
        application_name: name,
        run_id: param(request, 'run_id'),
        run_type: runType(param(request, 'run_type')),
    })
    if (text(out.found) !== 'true') {
        reply(response, 404, { error: 'application_not_found' })
        return
    }
    const classification = text(out.gxp_classification, 40) || 'unclassified'
    reply(response, 200, {
        tool: 'check_application',
        application: text(out.application, 100),
        application_sys_id: text(out.application_sys_id, 32),
        gxp_classification: classification,
        // Default deny: anything not explicitly not_validated is treated as validated.
        treated_as_validated: classification !== 'not_validated',
        system_owner: text(out.system_owner_name, 100) || null,
        quality_approver: text(out.quality_approver_name, 100) || null,
        audit_number: text(out.audit_number, 40) || null,
    })
}

// GET /api/x_snc_helix_core/agent/entitlements?user_sys_id=...&application_sys_id=...
export function entitlementsHandler(request: any, response: any): void {
    const user = findActiveUser(param(request, 'user_sys_id'))
    const app = findApplication(param(request, 'application_sys_id'))
    if (!user || !app) {
        reply(response, 404, { error: user ? 'application_not_found' : 'user_not_found' })
        return
    }
    const out = runSubflow('check_entitlements', {
        user: user,
        application: app,
        run_id: param(request, 'run_id'),
        run_type: runType(param(request, 'run_type')),
    })
    reply(response, 200, {
        tool: 'check_entitlements',
        user: user.getValue('name'),
        application: app.getValue('name'),
        has_access: text(out.has_access) === 'true',
        granted_on: text(out.granted_on, 40) || null,
        audit_number: text(out.audit_number, 40) || null,
    })
}
