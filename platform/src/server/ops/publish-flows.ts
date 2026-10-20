import { GlideRecord } from '@servicenow/glide'
import { FlowAPI } from '@servicenow/glide/sn_fd'

// Only these apps' flows can be published through this route.
const PUBLISHABLE_SCOPES = ['x_snc_helix_core', 'x_snc_helix_agent']

// POST /api/x_snc_helix_core/ops/publish_flows (admin only)
// Body: { scope } (optional, default x_snc_helix_core; must be in the allowlist)
// Publishes every flow and subflow in that app, so an install never leaves
// the platform running a stale published version. Returns the state after.
export function publishFlowsHandler(request: any, response: any): void {
    const data = request.body ? request.body.data : null
    const scope = data && data.scope ? String(data.scope) : 'x_snc_helix_core'
    if (PUBLISHABLE_SCOPES.indexOf(scope) < 0) {
        response.setStatus(400)
        response.setBody({ error: 'scope_not_allowed' })
        return
    }
    const results: { [key: string]: string }[] = []
    const flow = new GlideRecord('sys_hub_flow')
    flow.addQuery('sys_scope.scope', scope)
    flow.orderBy('name')
    flow.query()
    while (flow.next()) {
        const sysId = flow.getUniqueValue()
        let outcome = 'published'
        try {
            FlowAPI.publish(sysId)
        } catch (e) {
            outcome = 'error: ' + String(e).slice(0, 300)
        }
        const after = new GlideRecord('sys_hub_flow')
        after.get(sysId)
        results.push({
            name: String(after.getValue('name')),
            type: String(after.getValue('type')),
            outcome: outcome,
            status: String(after.getValue('status')),
            active: String(after.getValue('active')),
        })
    }
    response.setStatus(200)
    response.setBody({ flows: results })
}
