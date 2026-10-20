import { Record } from '@servicenow/sdk/core'

// Step 2: synthetic personas. The .example domain is reserved and can never
// deliver mail. No passwords: none of these users ever signs in.

export const managerUser = Record({
    $id: Now.ID['user-manager-daniel-okafor'],
    $meta: { installMethod: 'demo' },
    table: 'sys_user',
    data: {
        user_name: 'helix.daniel.okafor',
        first_name: 'Daniel',
        last_name: 'Okafor',
        title: 'Clinical Operations Manager',
        email: 'daniel.okafor@helix.example',
        active: true,
    },
})

export const sarahUser = Record({
    $id: Now.ID['user-sarah-chen'],
    $meta: { installMethod: 'demo' },
    table: 'sys_user',
    data: {
        user_name: 'helix.sarah.chen',
        first_name: 'Sarah',
        last_name: 'Chen',
        title: 'Clinical Research Associate',
        email: 'sarah.chen@helix.example',
        manager: managerUser,
        active: true,
        locked_out: true, // demo start state; reset.py puts it back
    },
})

export const systemOwnerUser = Record({
    $id: Now.ID['user-system-owner-priya-raman'],
    $meta: { installMethod: 'demo' },
    table: 'sys_user',
    data: {
        user_name: 'helix.priya.raman',
        first_name: 'Priya',
        last_name: 'Raman',
        title: 'LIMS System Owner',
        email: 'priya.raman@helix.example',
        active: true,
    },
})

export const qualityApproverUser = Record({
    $id: Now.ID['user-quality-marta-lindqvist'],
    $meta: { installMethod: 'demo' },
    table: 'sys_user',
    data: {
        user_name: 'helix.marta.lindqvist',
        first_name: 'Marta',
        last_name: 'Lindqvist',
        title: 'Quality Assurance Lead, Computer System Validation',
        email: 'marta.lindqvist@helix.example',
        active: true,
    },
})

// Business Application requires an IT application owner. Kept separate from
// the GxP system owner: IT runs the application, the business owns access.
export const itAppOwnerUser = Record({
    $id: Now.ID['user-it-app-owner-jonas-weber'],
    $meta: { installMethod: 'demo' },
    table: 'sys_user',
    data: {
        user_name: 'helix.jonas.weber',
        first_name: 'Jonas',
        last_name: 'Weber',
        title: 'IT Application Owner, R&D Applications',
        email: 'jonas.weber@helix.example',
        active: true,
    },
})
