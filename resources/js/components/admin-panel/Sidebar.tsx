import { Link } from '@inertiajs/react';
import { PanelsTopLeft } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useStore } from '@/hooks/useStore';
import { Menu } from '@/components/admin-panel/Menu';
import { useSidebarToggle } from '@/hooks/useSidebarToggle';
import { SidebarToggle } from '@/components/admin-panel/SidebarToggle';
import ApplicationLogo from '../ApplicationLogo';

export function Sidebar() {
    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;

    return (
        <aside
            className={cn(
                'fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300',
                sidebar?.isOpen === false ? 'w-[90px]' : 'w-72',
            )}
        >
            <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
            <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
                <div className="hidden lg:block">
                    <Link href="/" className="flex items-center justify-center">
                        <ApplicationLogo className="block fill-current text-gray-800" width={200} height={200} />
                    </Link>
                </div>
                <Menu isOpen={sidebar?.isOpen} />
            </div>
        </aside>
    );
}
