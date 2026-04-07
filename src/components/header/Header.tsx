import { useLocation } from 'react-router-dom';
import { useMenu } from '@/hooks/use-menu';
import { MENU_SIDEBAR } from '@/config/layout-19.config';
import { HeaderActions } from './HeaderActions';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title?: string;
  statusLabel?: string;
  extraActions?: React.ReactNode;
  className?: string;
}

export function Header({ title, statusLabel, extraActions, className }: HeaderProps) {
  const { pathname } = useLocation();
  const { getCurrentItem } = useMenu(pathname);
  
  // Get title from menu config if not provided
  const currentItem = getCurrentItem(MENU_SIDEBAR);
  const displayTitle = title || currentItem?.title || 'Dashboard';
  
  // Full page scenario (e.g. live tracking)
  const isFullPage = pathname === '/bus-tracking/live' || pathname === '/bus-tracking/history';

  return (
    <header 
      className={cn(
        'fixed z-[50] flex items-center border-b border-[#d4e0ea] bg-white shadow-[0_4px_20px_-4px_rgba(61,107,142,0.08)] transition-all duration-300',
        "h-[var(--header-height)] top-0 end-0",
        isFullPage 
          ? "start-0 lg:start-[var(--sidebar-width)]" 
          : "start-0 lg:start-[var(--sidebar-width)]",
        className
      )}
    >
      <div className="flex h-full min-h-0 w-full items-center justify-between px-4 lg:px-5">
        {/* Left Side: Title & Status */}
        <div className="flex h-full min-h-0 items-center gap-2.5 sm:gap-3">
          <h1 className="text-sm font-semibold uppercase tracking-tight text-slate-900 lg:text-base">
            {displayTitle}
          </h1>
          
          {statusLabel && (
            <div className="hidden items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-px text-2xs font-semibold uppercase tracking-tighter text-emerald-600 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {statusLabel}
            </div>
          )}
        </div>

        {/* Right Side: Actions */}
        <HeaderActions extraActions={extraActions} />
      </div>
    </header>
  );
}


