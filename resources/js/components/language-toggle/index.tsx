import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function LocaleToggle() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: any) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng); // Persist the selected language
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className="rounded-full w-8 h-8 bg-background mr-2"
                    variant="outline"
                    size="icon"
                >
                    <span className="sr-only">Switch Language</span>
                    <span className="w-[1.2rem] h-[1.2rem]">🌐</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('fr')}>Français</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
