import { UserNav } from '@/Components/UserNav';
import { SheetMenu } from '@/Components/AdminPanel/SheetMenu';
import ThemeToggle from '@/Components/ThemeToggle/ThemeToggle';
import { User } from '@/types';

interface NavbarProps {
    user: User; // Accepting user as a prop
    title: string|undefined;
}

export function Navbar({ user, title }: NavbarProps) {
    return (
        <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
            <div className="mx-4 sm:mx-8 flex h-14 items-center">
                <div className="flex items-center space-x-4 lg:space-x-0">
                    <SheetMenu />
                    <h1 className="font-bold">{title}</h1>
                </div>
                <div className="flex flex-1 items-center gap-2 justify-end">
                    <ThemeToggle />
                    <UserNav user={user} />
                </div>
            </div>
        </header>
    );
}
