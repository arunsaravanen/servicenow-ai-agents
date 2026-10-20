import { Table, ReferenceColumn, DateColumn, BooleanColumn } from '@servicenow/sdk/core'

// Step 3: who already has which application. The agent checks this before
// drafting any request, so it never asks for access someone already holds.
export const x_snc_helix_core_entitlement = Table({
    name: 'x_snc_helix_core_entitlement',
    label: 'Application Entitlement',
    display: 'application',
    allowWebServiceAccess: true, // admin-only reads for reset and evals; ACLs in step 6
    actions: { read: true },
    schema: {
        user: ReferenceColumn({ label: 'User', referenceTable: 'sys_user', mandatory: true }),
        application: ReferenceColumn({
            label: 'Application',
            referenceTable: 'cmdb_ci_business_app',
            mandatory: true,
        }),
        granted_on: DateColumn({ label: 'Granted on' }),
        active: BooleanColumn({ label: 'Active', default: 'true' }),
    },
    index: [{ name: 'idx_user_application', unique: true, element: ['user', 'application'] }],
})
