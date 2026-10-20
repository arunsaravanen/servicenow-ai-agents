import { CatalogItem } from '@servicenow/sdk/core'
import { gxpAccessApprovalFlow, standardAccessApprovalFlow } from '../flows/access-approval-flows.now'

// Out-of-box sys_ids, identical on every instance (verified on lab 2026-09-24):
// Service Catalog (sc_catalog) and its Software category (sc_category).
const SERVICE_CATALOG = 'e0d08b13c3330100c8b837659bba8fb4'
const SOFTWARE_CATEGORY = '2809952237b1300054b6a3549dbe5dd4'

// One item per autonomy tier, not per application. The create_access_request
// subflow picks the item from the CI's GxP classification.
export const gxpAccessItem = CatalogItem({
    $id: Now.ID['cat-item-gxp-access'],
    name: 'Validated (GxP) Application Access',
    shortDescription: 'Access to a GxP validated application. Requires system owner and Quality approval.',
    description:
        'Access to validated systems is approved by the system owner and Quality, and provisioned by the application team. Approvers are taken from the application record in the CMDB.',
    catalogs: [SERVICE_CATALOG],
    categories: [SOFTWARE_CATEGORY],
    flow: gxpAccessApprovalFlow,
    hideQuantitySelector: true,
    hideAddToCart: true,
})

export const standardAccessItem = CatalogItem({
    $id: Now.ID['cat-item-standard-access'],
    name: 'Standard Application Access',
    shortDescription: 'Access to a non-validated business application. Requires manager approval.',
    catalogs: [SERVICE_CATALOG],
    categories: [SOFTWARE_CATEGORY],
    flow: standardAccessApprovalFlow,
    hideQuantitySelector: true,
    hideAddToCart: true,
})
