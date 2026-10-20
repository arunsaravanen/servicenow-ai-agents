import { Table, Acl, StringColumn, ChoiceColumn, ReferenceColumn } from '@servicenow/sdk/core'

// Step 4: the AI audit trail. One row per tool call, written only by the
// app's own server code (the Scripted REST handlers). Nobody edits or
// deletes a row after it is written, admins included.
export const x_snc_helix_core_ai_action = Table({
    name: 'x_snc_helix_core_ai_action',
    label: 'AI Action',
    display: 'number',
    audit: true,
    allowWebServiceAccess: true, // admin-only reads for the Evidence pane and evals
    actions: { read: true },
    autoNumber: { prefix: 'AIA', number: 1000, numberOfDigits: 7 },
    schema: {
        number: StringColumn({
            label: 'Number',
            maxLength: 40,
            readOnly: true,
            // Platform auto-numbering reads this default; autoNumber alone does not set it.
            default: 'javascript:global.getNextObjNumberPadded();',
        }),
        run_id: StringColumn({ label: 'Run ID', maxLength: 64 }),
        run_type: ChoiceColumn({
            label: 'Run type',
            dropdown: 'dropdown_without_none',
            default: 'demo',
            choices: { demo: 'Demo', eval: 'Evaluation' },
        }),
        requested_for: ReferenceColumn({ label: 'Requested for', referenceTable: 'sys_user' }),
        tool_name: ChoiceColumn({
            label: 'Tool',
            dropdown: 'dropdown_with_none',
            choices: {
                lookup_user: 'lookup_user',
                check_entitlements: 'check_entitlements',
                check_application: 'check_application',
                unlock_account: 'unlock_account',
                create_access_request: 'create_access_request',
                notify_requester: 'notify_requester',
            },
        }),
        autonomy_tier: ChoiceColumn({
            label: 'Autonomy tier',
            dropdown: 'dropdown_with_none',
            choices: {
                read: 'Read only',
                tier_1: 'Tier 1: AI acts alone',
                tier_2: 'Tier 2: human approves',
                tier_3: 'Tier 3: red line, humans decide',
            },
        }),
        decision: ChoiceColumn({
            label: 'Decision',
            dropdown: 'dropdown_with_none',
            choices: {
                read: 'Read',
                executed: 'Executed',
                routed_for_approval: 'Routed for approval',
                rejected: 'Rejected by platform',
            },
        }),
        inputs: StringColumn({ label: 'Inputs (redacted)', maxLength: 4000 }),
        result: StringColumn({ label: 'Result', maxLength: 4000 }),
        target_table: StringColumn({ label: 'Target table', maxLength: 80 }),
        target_sys_id: StringColumn({ label: 'Target sys_id', maxLength: 32 }),
        target_display: StringColumn({ label: 'Target', maxLength: 100 }),
        mfa_verified: ChoiceColumn({
            label: 'MFA verified',
            dropdown: 'dropdown_with_none',
            choices: {
                approved_simulated: 'Approved (simulated)',
                denied_simulated: 'Denied (simulated)',
                not_required: 'Not required',
            },
        }),
        confirmed_by: ChoiceColumn({
            label: 'Confirmed by',
            dropdown: 'dropdown_with_none',
            choices: {
                human_presenter: 'Human (presenter)',
                eval_harness: 'Eval harness (not a human)',
                studio_supervised: 'AI Agent Studio (Supervised mode)',
                not_required: 'Not required',
            },
        }),
    },
    index: [{ name: 'idx_run_id', unique: false, element: 'run_id' }],
})

// Immutability. adminOverrides: false means admins do not bypass these.
// Server-side GlideRecord in the app's own handlers is not subject to ACLs,
// so the platform can still append; UI, Table API and imports cannot.
Acl({
    $id: Now.ID['ai-action-create-nobody'],
    type: 'record',
    table: 'x_snc_helix_core_ai_action',
    operation: 'create',
    adminOverrides: false,
    script: 'answer = false;',
    description: 'No interactive or API create on the AI audit trail, admins included.',
})

Acl({
    $id: Now.ID['ai-action-write-nobody'],
    type: 'record',
    table: 'x_snc_helix_core_ai_action',
    operation: 'write',
    adminOverrides: false,
    script: 'answer = false;',
    description: 'No interactive or API write on the AI audit trail, admins included.',
})

Acl({
    $id: Now.ID['ai-action-delete-nobody'],
    type: 'record',
    table: 'x_snc_helix_core_ai_action',
    operation: 'delete',
    adminOverrides: false,
    script: 'answer = false;',
    description: 'No interactive or API delete on the AI audit trail, admins included.',
})

Acl({
    $id: Now.ID['ai-action-read-admin'],
    type: 'record',
    table: 'x_snc_helix_core_ai_action',
    operation: 'read',
    roles: ['admin'],
    description: 'Audit trail readable by admins (Evidence pane, evals).',
})
