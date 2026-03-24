import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useLayout } from './context';
import { HeaderMenuMobile } from './header-menu-mobile';
import { SidebarHeader } from './sidebar-header';
import { SidebarMenu } from './sidebar-menu';

export function HeaderLogo() {
  const { pathname } = useLocation();
  const { isMobile } = useLayout();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Close sheet when route changes
  useEffect(() => {
    setIsSheetOpen(false);
  }, [pathname]);

  return (
    <div className="flex items-center gap-2">
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" mode="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="p-0 gap-0 w-[225px]"
            side="left"
            close={false}
          >
            <SheetHeader className="p-0 space-y-0" />
            <SheetBody className="flex flex-col grow p-0 ">
              <SidebarHeader />
              <HeaderMenuMobile />
              <SidebarMenu />
            </SheetBody>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
