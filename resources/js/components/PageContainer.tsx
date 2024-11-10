import React, { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PageContainer({
  children,
  scrollable: defaultScrollable = false,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  const [isScrollable, setIsScrollable] = useState(defaultScrollable);

  useEffect(() => {
    // Media query to detect mobile screen (max-width: 426px)
    const mediaQuery = window.matchMedia('(min-width: 426px)');

    // Function to update scrollable state based on screen size
    const handleMediaChange = () => {
      setIsScrollable(mediaQuery.matches); // Scrollable on non-mobile screens, false on mobile
    };

    // Set initial value and add listener
    handleMediaChange();
    mediaQuery.addListener(handleMediaChange);

    // Cleanup the listener on component unmount
    return () => mediaQuery.removeListener(handleMediaChange);
  }, []);

  return (
    <>
      {isScrollable ? (
        <ScrollArea className="h-[calc(100dvh)]">
          <div>{children}</div>
        </ScrollArea>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
}
