import { Table, ChoiceColumn, ReferenceColumn } from '@servicenow/sdk/core'

// Step 1: the GxP rule lives on the application CI, owned by Quality.
// Classification is a choice, not a boolean, so "not yet classified" is a
// real state. Anything other than 'not_validated' is treated as validated
// (default deny); that logic lives in the platform, never in the prompt.
export const cmdb_ci_business_app = Table({
    augments: 'cmdb_ci_business_app',
    schema: {
        x_snc_helix_core_gxp_classification: ChoiceColumn({
            label: 'GxP classification',
            dropdown: 'dropdown_with_none',
            choices: {
                validated: { label: 'Validated (GxP)', sequence: 10 },
                not_validated: { label: 'Not validated', sequence: 20 },
            },
            hint: 'Owned by Quality. Blank means unclassified and is treated as validated.',
        }),
        x_snc_helix_core_system_owner: ReferenceColumn({
            label: 'System owner',
            referenceTable: 'sys_user',
        }),
        x_snc_helix_core_quality_approver: ReferenceColumn({
            label: 'Quality approver',
            referenceTable: 'sys_user',
        }),
    },
})
