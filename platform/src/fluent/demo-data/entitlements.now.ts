import { Record } from '@servicenow/sdk/core'
import { sarahUser } from './users.now'
import { etmfApp } from './applications.now'

// Sarah's existing access. Deliberately none for Tableau or LIMS.
Record({
    $id: Now.ID['entitlement-sarah-etmf'],
    $meta: { installMethod: 'demo' },
    table: 'x_snc_helix_core_entitlement',
    data: {
        user: sarahUser,
        application: etmfApp,
        granted_on: '2025-11-03',
        active: true,
    },
})
