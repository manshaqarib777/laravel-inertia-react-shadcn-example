import ThemeToggle from '@/components/theme-toggle';
import LanguageToggle from '@/components/language-toggle';
import { cn } from '@/lib/utils';
import { MobileSidebar } from '@/components/MobileSidebar';
import { UserNav } from '@/components/UserNav';
import { User } from '@/Pages/User/User/lib/schema';

type HeaderProps = {
  user: User; // Accepting user as a prop
};

export default function Header({ user }: HeaderProps) {
  return (
    <header className="sticky inset-x-0 top-0 w-full">
      <nav className="flex items-center justify-between px-4 py-2 md:justify-end">
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
          {/* Pass the user object to the UserNav component */}
          <UserNav user={user} />
        </div>
      </nav>
    </header>
  );
}
