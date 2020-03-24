import { FuseNavigation } from '../../@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            // {
            //     id       : 'sample',
            //     title    : 'Samples',
            //     translate: 'NAV.SAMPLE.TITLE',
            //     type     : 'item',
            //     icon     : 'email',
            //     url      : '/sample',
            //     badge    : {
            //         title    : '25',
            //         translate: 'NAV.SAMPLE.BADGE',
            //         bg       : '#F44336',
            //         fg       : '#FFFFFF'
            //     }
            // },
            {
                id       : 'usermanagement',
                title    : 'User Management',
                type     : 'item',
                icon     : 'person',
                url      : '/usermanagement',
                // badge    : {
                //     title    : '25',
                //     translate: 'NAV.USERS.BADGE',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }
            },
            {
                id       : 'org-setting',
                title    : 'Property Settings',
                type     : 'item',
                icon     : 'business',
                url      : '/orgsetting',
                // badge    : {
                //     title    : '25',
                //     translate: 'NAV.USERS.BADGE',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }
            },
            {
                id       : 'spraycheck',
                title    : 'Spraycheck',
                type     : 'item',
                icon     : 'alarm_on',
                url      : '/spraycheck',
            },
            {
                id       : 'sprayrun',
                title    : 'Sprayrun',
                type     : 'item',
                icon     : 'opacity',
                url      : '/sprayrun',
            },
            {
                id       : 'spraylog',
                title    : 'Spraylog',
                type     : 'item',
                icon     : 'history',
                url      : '/spraylog',
            },
            {
                id       : 'presets',
                title    : 'Presets',
                type     : 'item',
                icon     : 'collections_bookmark',
                url      : '/presets',
            },
            // {
            //     id       : 'chat',
            //     title    : 'Chat',
            //     type     : 'item',
            //     icon     : 'chat',
            //     url      : '/chat',
            // },
        ]
    }
];
