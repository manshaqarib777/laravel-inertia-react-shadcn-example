import ApplicationLogo from '@/components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col p-10 lg:flex dark:border-r">
                <div className="relative z-20 mt-auto flex items-center justify-center text-lg font-medium">
                    <ApplicationLogo className="w-100 h-100 fill-current text-gray-500" />
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;This library has saved me countless hours of work and helped me
                            deliver stunning designs to my clients faster than ever before.&rdquo;
                        </p>
                        <footer className="text-sm">Sofia Davis</footer>
                    </blockquote>
                </div>
            </div>
            <div className="flex h-full items-center p-4 lg:p-8 bg-primary text-secondary">{children}</div>
        </div>
    );
}
