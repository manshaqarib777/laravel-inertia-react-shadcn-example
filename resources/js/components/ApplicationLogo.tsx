import { ImgHTMLAttributes } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { fullUrl } from '@/utils/utils';

export default function ApplicationLogo({
    width = 500, // default width
    height = 300, // default height
    ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
    const { theme } = useTheme();

    // Set the correct logo based on the active theme
    const logoSrc = fullUrl(theme === 'light' ? '/logo-light.svg' : '/logo-dark.svg');

    return (
        <img
            {...props}
            src={logoSrc}
            alt="Application Logo"
            width={width}
            height={height}
        />
    );
}
