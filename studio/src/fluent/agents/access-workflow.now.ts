import { AiAgenticWorkflow } from '@servicenow/sdk/core'

// The Now Assist panel routes requests to agentic workflows, not to standalone
// agents. Without this wrapper the router sent "I need access to LIMS" to the
// out-of-box Web Automation workflow. The description is written for the router.

// Helix Application Access Agent: its sys_id comes from our build (keys.ts,
// 'helix-access-agent'), so it is identical on every instance.
const ACCESS_AGENT = '3719448679ce413e9638f19c72d8ee16'
const ACCESS_REQUESTER_ROLE = 'cb0393c1f2cd41c6999a9c2926a45397'

export const accessWorkflow = AiAgenticWorkflow({
    $id: Now.ID['helix-access-workflow'],
    name: 'Helix Application Access',
    description:
        'Handles employee requests for access to Helix business applications, for example LIMS, the LIMS Reporting Tool, Tableau or eTMF. Checks existing access and the GxP classification, then submits an access request for approval. Use for any request like "I need access to <application>". Never provisions access.',
    recordType: 'custom',
    // Supervised: kept at the default so a workflow setting can never bypass the
    // Supervised create_access_request tool.
    executionMode: 'copilot',

    securityAcl: {
        $id: Now.ID['helix-access-workflow-acl'],
        type: 'Specific role',
        roles: [ACCESS_REQUESTER_ROLE],
    },
    dataAccess: {
        roleMap: ['x_snc_helix_agent.access_requester'],
    },

    team: {
        $id: Now.ID['helix-access-team'],
        name: 'Helix Application Access Team',
        members: [ACCESS_AGENT],
    },

    versions: [
        {
            name: 'V1',
            number: 1,
            state: 'published',
            instructions: `Step 1: Use the Helix Application Access Agent to handle the request, passing the requester's words unchanged.
Step 2: Present the agent's answer to the requester in plain English: what was submitted, who must approve, and what happens next. Never state or imply that access has been granted.`,
        },
    ],
})
