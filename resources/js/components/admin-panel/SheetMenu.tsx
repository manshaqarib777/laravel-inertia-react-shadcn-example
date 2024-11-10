import { Link } from '@inertiajs/react';
import { MenuIcon, PanelsTopLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Menu } from '@/components/admin-panel/Menu';
import {
    Sheet,
    SheetHeader,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet';
import ApplicationLogo from '../ApplicationLogo';

export function SheetMenu() {
    return (
        <Sheet>
            <SheetTrigger className="lg:hidden" asChild>
                <Button className="h-8" variant="outline" size="icon">
                    <MenuIcon size={20} />
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
                <SheetTitle>
                    <Link href="/" className="flex items-center justify-center">
                        <ApplicationLogo
                            className="block fill-current text-gray-800"
                            width={150}
                            height={150}
                        />
                    </Link>
                </SheetTitle>
                <Menu isOpen />
                <SheetDescription></SheetDescription>
            </SheetContent>
        </Sheet>
    );
}
