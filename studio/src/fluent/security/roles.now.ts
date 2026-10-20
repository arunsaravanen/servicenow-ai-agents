import { Role } from '@servicenow/sdk/core'

// Who may invoke the Helix access agent. Grants no table access by itself:
// every tool is a subflow with fixed behaviour.
export const accessRequesterRole = Role({
    name: 'x_snc_helix_agent.access_requester',
    description: 'May ask the Helix Application Access Agent for application access.',
})
