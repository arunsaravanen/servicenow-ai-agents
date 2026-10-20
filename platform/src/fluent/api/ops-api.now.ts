import { RestApi, Acl } from '@servicenow/sdk/core'
import { publishFlowsHandler } from '../../server/ops/publish-flows'

// Deployment helper, separate from the agent API. Admins only; the agent's
// integration role cannot call it.
export const opsApiAcl = Acl({
    $id: Now.ID['ops-api-execute'],
    type: 'rest_endpoint',
    name: 'x_snc_helix_core ops API',
    operation: 'execute',
    roles: ['admin'],
    description: 'Deployment operations (publish flows). Admin only.',
})

RestApi({
    $id: Now.ID['ops-api'],
    name: 'Helix ops API',
    serviceId: 'ops',
    consumes: 'application/json',
    produces: 'application/json',
    enforceAcl: [opsApiAcl],
    routes: [
        {
            $id: Now.ID['ops-api-publish-flows'],
            path: '/publish_flows',
            method: 'POST',
            script: publishFlowsHandler,
            shortDescription: "Publish every flow and subflow in this app after an install.",
            enforceAcl: [opsApiAcl],
        },
    ],
})
