import { RestApi, Role, Acl } from '@servicenow/sdk/core'
import { unlockHandler } from '../../server/agent-api/unlock'
import { accessRequestHandler } from '../../server/agent-api/access-request'
import { applicationHandler, entitlementsHandler } from '../../server/agent-api/reads'

// The only door the agent has into the platform. One route per business
// action. There is deliberately no provisioning route.
export const agentApiRole = Role({
    name: 'x_snc_helix_core.agent_api',
    description: 'Call the Helix agent business-action API. Grants no table access.',
})

export const agentApiAcl = Acl({
    $id: Now.ID['agent-api-execute'],
    type: 'rest_endpoint',
    name: 'x_snc_helix_core agent API',
    operation: 'execute',
    roles: [agentApiRole],
    description: 'Only the agent integration role may call the business-action API.',
})

RestApi({
    $id: Now.ID['agent-api'],
    name: 'Helix agent API',
    serviceId: 'agent',
    consumes: 'application/json',
    produces: 'application/json',
    enforceAcl: [agentApiAcl],
    routes: [
        {
            $id: Now.ID['agent-api-application'],
            path: '/application',
            method: 'GET',
            script: applicationHandler,
            shortDescription: 'Read: GxP classification and approvers of an application, by name.',
            enforceAcl: [agentApiAcl],
        },
        {
            $id: Now.ID['agent-api-entitlements'],
            path: '/entitlements',
            method: 'GET',
            script: entitlementsHandler,
            shortDescription: 'Read: does this user already hold this application?',
            enforceAcl: [agentApiAcl],
        },
        {
            $id: Now.ID['agent-api-unlock'],
            path: '/unlock',
            method: 'POST',
            script: unlockHandler,
            shortDescription: 'Tier 1: unlock an account. Requires an MFA attestation.',
            enforceAcl: [agentApiAcl],
        },
        {
            $id: Now.ID['agent-api-access-request'],
            path: '/access_request',
            method: 'POST',
            script: accessRequestHandler,
            shortDescription: 'Submit an access request routed by GxP classification. Requires a confirmation.',
            enforceAcl: [agentApiAcl],
        },
    ],
})
