import { Icons } from '@/components/Icons';
import { User } from '@/Pages/User/User/lib/schema';



export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    currentRoute: string;
    currency: {
        symbol: string;
        code: string;
    };
    subscriptionDaysLeft: string;
    subscriptionName: string;
    subscriptionStatus: boolean;
    team: {
        allow_seats: number | null;
        members: User[]
    };
    teamManager: {
        name: string;
        surname: string;
    } | null;
};
export interface NavItem {
    title: string;
    route?: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icons;
    label?: string;
    description?: string;
}

export interface NavItemWithChildren extends NavItem {
    items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
    items?: NavItemWithChildren[];
}

export interface FooterItem {
    title: string;
    items: {
        title: string;
        href: string;
        external?: boolean;
    }[];
}

export interface Plan {
    id: number;
    price: number;
    trial_days: number;
    features: string;
    frequency: string;
    name: string;
    description: string;
    is_featured: boolean;
    is_team_plan: boolean;
    plan_allow_seat: number;
    type: string;
}

export interface Gateway {
    code: string;
    title: string;
    img: string;
    whiteLogo: boolean;
    data: {
        title: string;
        img: string;
        whiteLogo: boolean;
    };
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

