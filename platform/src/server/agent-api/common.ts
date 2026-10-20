import { GlideRecord } from '@servicenow/glide'
import { FlowAPI } from '@servicenow/glide/sn_fd'

// Shared helpers for the agent API handlers. Handlers validate inputs, then
// hand the work to a subflow. Business logic lives in the subflows.

export type Body = { [key: string]: unknown }

export function readBody(request: any): Body {
    const data = request.body ? request.body.data : null
    return data && typeof data === 'object' ? (data as Body) : {}
}

export function text(value: unknown, maxLength = 4000): string {
    if (value === null || value === undefined) return ''
    return String(value).slice(0, maxLength)
}

export function reply(response: any, status: number, body: Body): void {
    response.setStatus(status)
    response.setBody(body)
}

// Only active demo personas (user_name helix.*); returns null instead of throwing so handlers answer 404.
// Keeps a leaked integration password from unlocking or reading any other account, admin included.
// shortcut: allowlist by user_name prefix, replace with the signed-in user from an IdP token in production.
export function findActiveUser(sysId: string): GlideRecord<'sys_user'> | null {
    if (!sysId) return null
    const user = new GlideRecord('sys_user')
    if (!user.get(sysId) || user.getValue('active') !== '1') return null
    return (user.getValue('user_name') || '').indexOf('helix.') === 0 ? user : null
}

export function findApplication(sysId: string): GlideRecord<'cmdb_ci_business_app'> | null {
    if (!sysId) return null
    const app = new GlideRecord('cmdb_ci_business_app')
    return app.get(sysId) ? app : null
}

// run_type is either demo or eval; anything else is recorded as demo.
export function runType(value: unknown): string {
    return value === 'eval' ? 'eval' : 'demo'
}

// Runs one of this app's subflows in the foreground and returns its outputs.
export function runSubflow(internalName: string, inputs: Body): Body {
    return FlowAPI.executeSubflow('x_snc_helix_core.' + internalName, inputs as any, 30000) as Body
}
