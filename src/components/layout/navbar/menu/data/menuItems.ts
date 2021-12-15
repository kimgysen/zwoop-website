import {NavItem} from "@components/layout/navbar/menu/mobile/MobileNavItem";

export const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Feed',
        href: '/feed'
    },
    {
        label: 'User guide',
        href: '/user-guide'
    },
    {
        label: 'Tutorials',
        children: [
            {
                label: 'Tronlink',
                subLabel: 'How to install your TRX wallet',
                href: '#',
            },
            {
                label: 'MS Teams',
                subLabel: 'How to generate a Teams link',
                href: '#',
            },
            {
                label: 'Zoom',
                subLabel: 'How to generate a Zoom link',
                href: '#',
            }
        ]
    },
    {
        label: 'About',
        children: [
            {
                label: 'Technical architecture',
                subLabel: 'Serverless client app using Tronlink, smart contract and decentralized OrbitDb',
                href: '#',
            }
        ],
    },
    {
        label: 'Contact',
        href: '#',
    }
];