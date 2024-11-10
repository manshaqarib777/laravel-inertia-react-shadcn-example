import { useState, PropsWithChildren, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/admin-panel/Sidebar';
import { useStore } from '@/hooks/useStore';
import { Footer } from '@/components/admin-panel/Footer';
import { useSidebarToggle } from '@/hooks/useSidebarToggle';
import PageContainer from '@/components/PageContainer';
import { Navbar } from '@/components/admin-panel/Navbar';
import { User } from '@/Pages/User/User/lib/schema';

export default function Authenticated({
    user,
    title,
    children,
}: PropsWithChildren<{ user: User; title?: string }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;

    return (
        <div>
            <Sidebar />
            <PageContainer scrollable={true}>
                <main
                    className={cn(
                        'min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300',
                        sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72',
                    )}
                >
                    <Navbar title={title} user={user} />
                    <div className="h-full  p-4 md:px-8">{children}</div>
                </main>
                <footer
                    className={cn(
                        'transition-[margin-left] ease-in-out duration-300',
                        sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72',
                    )}
                >
                    <Footer />
                </footer>
            </PageContainer>
        </div>
    );
}
