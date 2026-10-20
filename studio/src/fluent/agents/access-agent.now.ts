import { AiAgent } from '@servicenow/sdk/core'

// The GxP access agent from slide 7, built in AI Agent Studio.
// Role and the first paragraph of instructions are the deck text verbatim.
// The safety comes from the tool inventory: five tools, one Supervised write,
// and no provisioning tool at all.

// Tool subflows in this app (studio/src/fluent/generated/keys.ts).
const LOOKUP_USER = 'c4f465d8ed4b4acb9535d7d199acc476'
const CHECK_APPLICATION = 'a8027d02667f48d2a3eb2a0aee954ec9'
const CHECK_ENTITLEMENTS = '22318850f4dd4d8cb6c003904d8bc427'
const CREATE_ACCESS_REQUEST = 'd575ef8beca4468e9bd2f786d4b78ef1'
const NOTIFY_REQUESTER = '0b955ddaad8b451ba48a336588cabb63'

// x_snc_helix_agent.access_requester. Role sys_ids are derived from the role name
// at build time (see dist/app), so this is identical on every instance.
const ACCESS_REQUESTER_ROLE = 'cb0393c1f2cd41c6999a9c2926a45397'

export const accessAgent = AiAgent({
    $id: Now.ID['helix-access-agent'],
    name: 'Helix Application Access Agent',
    description:
        'Handles application access requests for Helix employees. Checks existing access and the GxP classification, then submits a request that the platform routes to the right approvers. Never provisions.',
    agentRole: 'Handles application access requests. Never provisions a validated system.',
    agentDescriptor: 'created_by_build_agent',
    recordType: 'custom',
    channel: 'nap',
    processingMessage: 'Checking your access and the application record...',
    postProcessingMessage: 'Your access request has been handled.',

    // Only users holding the access requester role can invoke the agent.
    securityAcl: {
        $id: Now.ID['helix-access-agent-acl'],
        type: 'Specific role',
        roles: [ACCESS_REQUESTER_ROLE],
    },
    // Dynamic user: the agent runs as the person asking, limited to this role.
    dataAccess: {
        roleMap: ['x_snc_helix_agent.access_requester'],
        description: 'Runs as the requester; tools are fixed-behaviour subflows.',
    },

    versionDetails: [
        {
            name: 'V1',
            number: 1,
            state: 'published',
            instructions: `Look up existing entitlements first. Check the validated-system flag on the application CI. If flagged, create the catalog request with the system owner and Quality as approvers and tell the requester what happens next. Never attempt provisioning.

Step 1: Use lookup_user to learn who is asking. The requester is always this person.
Step 2: Take the short application name from the request (for example "LIMS" or "Tableau"). Use check_entitlements with that name. If the requester already has access, tell them and stop.
Step 3: Use check_application with the same name. If it is not found, say so and stop.
Step 4: If the requester has not given a reason, ask for a one-sentence business justification. Then use create_access_request with the application name and the justification. The platform decides the approvers; never promise access.
Step 5: If a request number was returned, use notify_requester with that number and a two-sentence summary of what happens next.
Step 6: Answer in plain English: the request number, who must approve (for a validated system, the system owner and Quality by name; otherwise the manager by name), and that the application team grants access only after approval. If the request was not submitted, explain why. Do not show codes or internal identifiers.`,
        },
    ],

    tools: [
        {
            name: 'lookup_user',
            description: 'lookup_user returns the name, title and manager of the person asking. Takes no input.',
            type: 'subflow',
            subflowId: LOOKUP_USER,
            recordType: 'custom',
            executionMode: 'autopilot',
            displayOutput: false,
            outputTransformationStrategy: 'none',
            preMessage: 'Looking up who is asking...',
            postMessage: 'Requester identified.',
        },
        {
            name: 'check_entitlements',
            description:
                'check_entitlements takes an application name and returns whether the person asking already has access, and since when.',
            type: 'subflow',
            subflowId: CHECK_ENTITLEMENTS,
            recordType: 'custom',
            executionMode: 'autopilot',
            displayOutput: false,
            outputTransformationStrategy: 'none',
            preMessage: 'Checking your existing access...',
            postMessage: 'Existing access checked.',
        },
        {
            name: 'check_application',
            description:
                'check_application takes an application name and returns its GxP classification (validated, not_validated or unclassified) and its system owner and Quality approver.',
            type: 'subflow',
            subflowId: CHECK_APPLICATION,
            recordType: 'custom',
            executionMode: 'autopilot',
            displayOutput: false,
            outputTransformationStrategy: 'none',
            preMessage: 'Checking the application record...',
            postMessage: 'Application classification retrieved.',
        },
        {
            name: 'create_access_request',
            description:
                'create_access_request takes an application name and a business justification and submits an access request for the person asking. The platform picks the approvers. It never provisions access.',
            type: 'subflow',
            subflowId: CREATE_ACCESS_REQUEST,
            recordType: 'custom',
            // Supervised: Studio stops and asks a human before this runs.
            executionMode: 'copilot',
            // The agent's plain-English answer is the output; never show raw tool JSON.
            displayOutput: false,
            outputTransformationStrategy: 'none',
            preMessage: 'Preparing your access request for confirmation...',
            postMessage: 'Access request submitted.',
        },
        {
            name: 'notify_requester',
            description:
                'notify_requester takes a request or incident number and a short message, and posts the message on that ticket for the requester to see.',
            type: 'subflow',
            subflowId: NOTIFY_REQUESTER,
            recordType: 'custom',
            executionMode: 'autopilot',
            displayOutput: false,
            outputTransformationStrategy: 'none',
            preMessage: 'Posting an update on your request...',
            postMessage: 'Update posted.',
        },
    ],

    triggerConfig: [],
})
