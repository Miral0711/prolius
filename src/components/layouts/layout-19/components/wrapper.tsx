import { Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header/Header';
import { useLayout } from './context';
import { Sidebar } from './sidebar';

/** Flat page shell background (no gradient / glass) */
const pageBackground =
  'relative h-full min-h-0 w-full min-w-0 bg-[#EEF5FB]';

export function Wrapper() {
  const { isMobile } = useLayout();
  const { pathname } = useLocation();

  /** Main fills viewport below header; inner PageSurface / panels own scroll (same chain as Live Bus Tracking). */
  const isViewportFillMain =
    pathname === '/bus-tracking/live' ||
    pathname === '/bus-tracking/history' ||
    pathname === '/messaging/chat' ||
    pathname === '/bus-video-monitoring/live-dvr' ||
    pathname === '/bus-video-monitoring/history-dvr' ||
    pathname === '/fleet-management/bus' ||
    pathname.startsWith('/job-dispatching') ||
    pathname === '/manager-cockpit' ||
    pathname.startsWith('/bus-alert-monitoring');

  // Example of passing status label specifically for dashboard
  const statusLabel =
    pathname === '/dashboard/overview' ? 'Live Fleet Monitor' : undefined;

  return (
    <div className={cn(pageBackground, 'flex flex-col')}>
      <Header statusLabel={statusLabel} />

      <div
        className={cn(
          'flex flex-1 min-h-0 min-w-0 flex-nowrap overflow-x-hidden transition-[padding-left] duration-300 ease-in-out',
          // Outer page inset comes from PageSurface inside <main>, not from this shell
          'pt-[var(--header-height)]',
          !isMobile && 'lg:ml-[var(--sidebar-width)]',
        )}
      >
        {!isMobile && <Sidebar />}
        <div
          className={cn(
            'flex min-h-0 min-w-0 flex-1 flex-col',
            isViewportFillMain && 'h-full',
          )}
        >
          <main
            role="content"
            className={cn(
              'mb-0 flex min-h-0 w-full min-w-0 flex-1 flex-col scrollbar-hide',
              isViewportFillMain
                ? 'overflow-hidden'
                : 'overflow-x-hidden overflow-y-auto',
            )}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}


