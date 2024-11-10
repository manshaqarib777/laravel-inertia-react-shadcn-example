import { Tag, Users, Bookmark, SquarePen, LayoutGrid, LucideIcon, User, Wallet, Building } from 'lucide-react';

// Submenu type
type Submenu = {
    href: string;
    label: string;
    active?: boolean;
};

// Menu type
type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon;
    submenus?: Submenu[];
};

// Group type for menu groups
type Group = {
    groupLabel: string;
    menus: Menu[];
};

// Helper function to check if the current route belongs to the resource and set active accordingly
function isResourceRouteActive(currentRoute: string, resource: string): boolean {
    const resourceRoutes = [
        `${resource}.index`,
        `${resource}.create`,
        `${resource}.edit`,
        `${resource}.show`,
    ];

    // If the currentRoute matches any resource route, return true
    return resourceRoutes.includes(currentRoute);
}

// Helper function to get the active state for specific submenus
function getActiveRouteForSubmenu(
    currentRoute: string,
    resource: string,
    action: string,
): boolean {
    const resourceRoute = `${resource}.${action}`;
    return currentRoute === resourceRoute;
}

// Generic getMenuList function with user type
export function getMenuList(currentRoute: string): Group[] {

    return [
        {
            groupLabel: '',
            menus: [
                {
                    href: route('dashboard.index'),
                    label: 'Dashboard',
                    active: isResourceRouteActive(currentRoute, 'dashboard'),
                    icon: LayoutGrid,
                    submenus: [],
                },
            ],
        },
        {
            groupLabel: 'User',
            menus: [
                {
                    href: route("dashboard.user.employees.index"),
                    label: 'Employees Management',
                    active: isResourceRouteActive(currentRoute, 'dashboard.user.employees'),
                    icon: Users,
                },
                // {
                //     href: "#",
                //     label: 'Finance',
                //     active: isResourceRouteActive(currentRoute, 'dashboard.admin.finance'),
                //     icon: Wallet,
                //     submenus: [
                //         {
                //             href: "#",
                //             active: getActiveRouteForSubmenu(
                //                 currentRoute,
                //                 'dashboard.admin.finance.plans',
                //                 'index',
                //             ),
                //             label: 'Membership Plans',
                //         },
                //         {
                //             href: "#",
                //             active: getActiveRouteForSubmenu(
                //                 currentRoute,
                //                 'dashboard.admin.finance.paymentGateways',
                //                 'index',
                //             ),
                //             label: 'Payment Gateways',
                //         },
                //     ],
                // },
                {
                    href: route('dashboard.profile.edit'),
                    label: 'Profile',
                    active: isResourceRouteActive(currentRoute, 'dashboard.profile'),
                    icon: User,
                },
            ],
        },
    ];
}
