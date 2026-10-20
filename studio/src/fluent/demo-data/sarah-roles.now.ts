import { Record } from '@servicenow/sdk/core'
import { accessRequesterRole } from '../security/roles.now'

// Record() does not apply platform defaults, so state must be set explicitly:
// a role assignment without state 'active' grants nothing.

// Sarah Chen is created by the core app (x_snc_helix_core, key 'user-sarah-chen');
// same sys_id on every instance the core app is installed on.
const SARAH = 'f55f2b62e2194ce6815dce9725a81c4c'

Record({
    $id: Now.ID['sarah-role-access-requester'],
    $meta: { installMethod: 'demo' },
    table: 'sys_user_has_role',
    data: { user: SARAH, role: accessRequesterRole, state: 'active' },
})

// Needed to open the Now Assist panel (platform role, resolved by name).
Record({
    $id: Now.ID['sarah-role-now-assist-panel'],
    $meta: { installMethod: 'demo' },
    table: 'sys_user_has_role',
    data: { user: SARAH, role: Now.ref('sys_user_role', { name: 'now_assist_panel_user' }), state: 'active' },
})
