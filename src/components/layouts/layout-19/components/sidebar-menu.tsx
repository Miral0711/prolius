'use client';

import { useCallback, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { MENU_SIDEBAR } from '@/config/layout-19.config';
import type { MenuItem } from '@/config/types';
import {
  AlertTriangle,
  BarChart3,
  BriefcaseBusiness,
  ClipboardList,
  LayoutDashboard,
  MessageSquare,
  Search,
  ShieldAlert,
  ShieldCheck,
  Settings,
  Trophy,
  Truck,
  UserRound,
  Users,
  Wrench,
} from 'lucide-react';
import {
  AccordionMenu,
  AccordionMenuGroup,
  AccordionMenuItem,
  AccordionMenuLabel,
  AccordionMenuSub,
  AccordionMenuSubContent,
  AccordionMenuSubTrigger,
} from '@/components/ui/accordion-menu';
import { useLayout } from './context';
import { SidebarFlyout } from './sidebar-flyout';

const FLYOUT_CLOSE_DELAY_MS = 120;

const SIDEBAR_ITEMS: MenuItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard/overview',
    icon: LayoutDashboard,
  },
  {
    title: 'Fleet Planning',
    path: '/fleet-planning',
    icon: Truck,
  },
  {
    title: 'Vehicle Checks',
    path: '/vehicle-checks',
    icon: ClipboardList,
  },
  {
    title: 'Vehicle Defects',
    path: '/vehicle-defects',
    icon: AlertTriangle,
  },
  {
    title: 'Reported Incidents',
    path: '/reported-incidents',
    icon: ShieldAlert,
  },
  {
    title: 'Vehicle Profiles',
    path: '/vehicle-profiles',
    icon: UserRound,
  },
  {
    title: 'Vehicle Search',
    path: '/vehicle-search',
    icon: Search,
  },
  {
    title: 'Asset Checks',
    path: '/asset-checks',
    icon: ShieldCheck,
  },
  {
    title: 'Asset Defects',
    path: '/asset-defects',
    icon: AlertTriangle,
  },
  {
    title: 'Asset Profiles',
    path: '/asset-profiles',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Asset Search',
    path: '/asset-search',
    icon: Search,
  },
  {
    title: 'Workshops',
    path: '/workshops',
    icon: Wrench,
  },
  {
    title: 'Messaging',
    path: '/messaging/chat',
    icon: MessageSquare,
  },
  {
    title: 'Earned Recognition',
    path: '/earned-recognition',
    icon: Trophy,
  },
  {
    title: 'Reports',
    path: '/reports/overview',
    icon: BarChart3,
  },
  {
    title: 'User Management',
    path: '/system-management/user',
    icon: Users,
  },
  {
    title: 'Settings',
    path: '/system-management/settings',
    icon: Settings,
  },
];

const itemRowClass =
  'flex h-10 items-center gap-3 rounded-md px-3 text-xs font-medium text-slate-700 transition-colors ' +
  'hover:bg-white/18 ' +
  'data-[selected=true]:bg-white/22 data-[selected=true]:text-slate-900 data-[selected=true]:border-l-2 data-[selected=true]:border-l-slate-400/80 ' +
  '[&_svg]:size-4 [&_svg]:shrink-0';

function LegacySidebarMenu() {
  const { pathname } = useLocation();
  const { isMobile } = useLayout();
  const [flyout, setFlyout] = useState<{
    top: number;
    left: number;
    title: string;
    items: MenuItem[];
  } | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const itemRefsRef = useRef<Map<string, HTMLDivElement>>(new Map());

  const matchPath = useCallback(
    (path: string): boolean =>
      path === pathname || (path.length > 1 && pathname.startsWith(path)),
    [pathname],
  );

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(
      () => setFlyout(null),
      FLYOUT_CLOSE_DELAY_MS,
    );
  }, [clearCloseTimer]);

  const SIDEBAR_WIDTH_PX = 240;

  const openFlyout = useCallback(
    (key: string, title: string, items: MenuItem[]) => {
      clearCloseTimer();
      const el = itemRefsRef.current.get(key);
      if (!el) {
        setFlyout({ top: 0, left: SIDEBAR_WIDTH_PX, title, items });
        return;
      }
      const rect = el.getBoundingClientRect();
      setFlyout({
        top: rect.top,
        left: SIDEBAR_WIDTH_PX,
        title,
        items,
      });
    },
    [clearCloseTimer],
  );

  // Kept for legacy layout; new SidebarMenu renders a simpler flat list.
  // eslint-disable-next-line unused-vars
  const legacyItemRowClass = itemRowClass;

  if (isMobile) {
    const renderChild = (
      child: MenuItem,
      groupKey: number,
      childKey: number,
    ) => {
      const hasNested = child.children && child.children.length > 0;
      const subValue = `group-${groupKey}-sub-${childKey}`;

      if (hasNested) {
        return (
          <AccordionMenuSub key={childKey} value={subValue}>
            <AccordionMenuSubTrigger
              className={`${itemRowClass} [&_svg]:size-4 [&_svg]:shrink-0`}
            >
              <span className="w-9 flex justify-center shrink-0">
                {child.icon ? <child.icon /> : null}
              </span>
              <span className="truncate">{child.title}</span>
            </AccordionMenuSubTrigger>
            <AccordionMenuSubContent type="multiple" parentValue={subValue}>
              {child.children!.map((nest, nestKey) => (
                <AccordionMenuItem
                  key={nestKey}
                  value={nest.path || '#'}
                  asChild
                >
                  <Link to={nest.path || '#'} className={itemRowClass}>
                    <span className="w-9 flex justify-center shrink-0">
                      {nest.icon ? <nest.icon /> : null}
                    </span>
                    <span className="truncate">{nest.title}</span>
                  </Link>
                </AccordionMenuItem>
              ))}
            </AccordionMenuSubContent>
          </AccordionMenuSub>
        );
      }

      return (
        <AccordionMenuItem key={childKey} value={child.path || '#'} asChild>
          <Link to={child.path || '#'} className={itemRowClass}>
            <span className="w-9 flex justify-center shrink-0">
              {child.icon ? <child.icon /> : null}
            </span>
            <span className="truncate">{child.title}</span>
          </Link>
        </AccordionMenuItem>
      );
    };

    return (
      <AccordionMenu
        selectedValue={pathname}
        matchPath={matchPath}
        type="multiple"
        className="space-y-1"
        classNames={{
          separator: '-mx-2 mb-1',
          label:
            'mb-0.5 mt-1.5 px-3 py-1 text-xs font-normal uppercase tracking-[0.02rem] text-slate-500 leading-tight',
          item: itemRowClass,
          group: '',
          subTrigger: itemRowClass,
        }}
      >
        {MENU_SIDEBAR.map((group, groupIndex) => (
          <AccordionMenuGroup key={groupIndex}>
            <AccordionMenuLabel>{group.title}</AccordionMenuLabel>
            {group.children?.map((child, childIndex) =>
              renderChild(child, groupIndex, childIndex),
            )}
          </AccordionMenuGroup>
        ))}
      </AccordionMenu>
    );
  }

  return (
    <>
      {/* Legacy component kept for reference only. */}
    </>
  );
}

export function SidebarMenu() {
  const { pathname } = useLocation();

  const matchPath = (path?: string): boolean => {
    if (!path) return false;
    return path === pathname || (path.length > 1 && pathname.startsWith(path));
  };

  return (
    <div className="space-y-1">
      {SIDEBAR_ITEMS.map((item) => {
        const isActive = matchPath(item.path);
        const Icon = item.icon;

        return (
          <Link
            key={item.path || item.title}
            to={item.path || '#'}
            className={itemRowClass}
            data-selected={isActive ? 'true' : undefined}
          >
            <span className="w-9 flex justify-center shrink-0">
              {Icon ? <Icon /> : null}
            </span>
            <span className="truncate">{item.title}</span>
          </Link>
        );
      })}
    </div>
  );
}


