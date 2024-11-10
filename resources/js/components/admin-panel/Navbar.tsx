import { UserNav } from '@/components/UserNav';
import { SheetMenu } from '@/components/admin-panel/SheetMenu';
import ThemeToggle from '@/components/theme-toggle';
import LanguageToggle from '@/components/language-toggle';
import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { User } from '@/Pages/User/User/lib/schema';

interface NavbarProps {
    user: User; // Accepting user as a prop
    title: string | undefined;
}

export function Navbar({ user, title }: NavbarProps) {
    const { subscriptionStatus, subscriptionName, subscriptionDaysLeft } =
        usePage<PageProps>().props;
    const { t } = useTranslation();

    return (
        <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
            <div className="mx-4 sm:mx-8 flex h-14 items-center">
                <div className="flex items-center space-x-4 lg:space-x-0">
                    <SheetMenu />
                    <h1 className="font-bold hidden sm:block">{title}</h1>
                </div>
                <div className="flex flex-1 items-center gap-2 justify-end">
                    <ThemeToggle />
                    <LanguageToggle />
                    <UserNav user={user} />
                </div>
            </div>
        </header>
    );
}
