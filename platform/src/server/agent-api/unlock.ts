import { readBody, text, reply, findActiveUser, runType, runSubflow } from './common.ts'

// POST /api/x_snc_helix_core/agent/unlock
// Body: { user_sys_id, mfa_attestation, run_id, run_type }
// mfa_attestation is added by the demo host after the presenter approves the
// simulated push. The model never sees or sets it.
export function unlockHandler(request: any, response: any): void {
    const body = readBody(request)
    const user = findActiveUser(text(body.user_sys_id, 32))
    if (!user) {
        reply(response, 404, { error: 'user_not_found' })
        return
    }

    const out = runSubflow('unlock_account', {
        user: user, // reference inputs take the GlideRecord, not the sys_id
        mfa_status: text(body.mfa_attestation, 40),
        run_id: text(body.run_id, 64),
        run_type: runType(body.run_type),
        inputs_redacted: JSON.stringify({ user: user.getValue('user_name'), mfa_attestation: text(body.mfa_attestation, 40) }),
    })

    // Subflow outputs are platform objects; convert each one to plain text.
    const success = text(out.success) === 'true'
    reply(response, success ? 200 : 403, {
        success: success,
        tool: 'unlock_account',
        autonomy_tier: 'tier_1',
        incident_number: text(out.incident_number, 40) || null,
        incident_sys_id: text(out.incident_sys_id, 32) || null,
        audit_number: text(out.audit_number, 40) || null,
        message: text(out.message, 1000) || null,
    })
}
