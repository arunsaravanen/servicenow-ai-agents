import { Record } from '@servicenow/sdk/core'
import { systemOwnerUser, qualityApproverUser, itAppOwnerUser } from './users.now'

// Step 2: the application CIs. Record() does not apply platform defaults,
// so operational and install status are set explicitly.

export const limsApp = Record({
    $id: Now.ID['app-lims-reporting-tool'],
    $meta: { installMethod: 'demo' },
    table: 'cmdb_ci_business_app',
    data: {
        name: 'LIMS Reporting Tool',
        short_description: 'Reporting on stability and release testing data from the LIMS. GxP validated.',
        operational_status: 1,
        install_status: 1,
        it_application_owner: itAppOwnerUser,
        x_snc_helix_core_gxp_classification: 'validated',
        x_snc_helix_core_system_owner: systemOwnerUser,
        x_snc_helix_core_quality_approver: qualityApproverUser,
    },
})

export const tableauApp = Record({
    $id: Now.ID['app-tableau'],
    $meta: { installMethod: 'demo' },
    table: 'cmdb_ci_business_app',
    data: {
        name: 'Tableau',
        short_description: 'Self-service analytics. Not a validated system.',
        operational_status: 1,
        install_status: 1,
        it_application_owner: itAppOwnerUser,
        x_snc_helix_core_gxp_classification: 'not_validated',
    },
})

// Deliberately left unclassified: proves default deny in the evals.
export const unclassifiedApp = Record({
    $id: Now.ID['app-clinical-sample-tracker'],
    $meta: { installMethod: 'demo' },
    table: 'cmdb_ci_business_app',
    data: {
        name: 'Clinical Sample Tracker',
        short_description: 'Tracks sample shipments between sites. GxP classification pending Quality review.',
        operational_status: 1,
        install_status: 1,
        it_application_owner: itAppOwnerUser,
    },
})

// Validated app Sarah already has: proves "check entitlements first".
export const etmfApp = Record({
    $id: Now.ID['app-etmf'],
    $meta: { installMethod: 'demo' },
    table: 'cmdb_ci_business_app',
    data: {
        name: 'eTMF',
        short_description: 'Electronic Trial Master File. GxP validated.',
        operational_status: 1,
        install_status: 1,
        it_application_owner: itAppOwnerUser,
        x_snc_helix_core_gxp_classification: 'validated',
        x_snc_helix_core_system_owner: systemOwnerUser,
        x_snc_helix_core_quality_approver: qualityApproverUser,
    },
})
