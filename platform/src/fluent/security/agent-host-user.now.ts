import { Record } from '@servicenow/sdk/core'
import { agentApiRole } from '../api/agent-api.now'

// The account the external agent host (host/) signs in with. It holds only the
// agent API role, so it can call the business-action routes and nothing else.
// Web-service only: it can never open the UI. No password in code: set it on
// the instance and keep it in .env.<name> as SN_AGENT_USER / SN_AGENT_PASSWORD.

export const agentHostUser = Record({
    $id: Now.ID['user-agent-host'],
    table: 'sys_user',
    data: {
        user_name: 'helix.agent.host',
        first_name: 'Helix',
        last_name: 'Agent Host',
        web_service_access_only: true,
        active: true,
    },
})

// Record() does not apply platform defaults: without state 'active' the grant does nothing.
Record({
    $id: Now.ID['agent-host-role-agent-api'],
    table: 'sys_user_has_role',
    data: { user: agentHostUser, role: agentApiRole, state: 'active' },
})
