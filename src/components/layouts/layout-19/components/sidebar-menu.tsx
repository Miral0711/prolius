'use client';

import { useCallback, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { MENU_SIDEBAR } from '@/config/layout-19.config';
import type { MenuItem } from '@/config/types';
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

export function SidebarMenu() {
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

  const itemRowClass =
    'flex h-10 items-center gap-3 rounded-sm px-3 text-[14px] font-medium text-slate-700 transition-colors ' +
    'hover:bg-white/18 ' +
    'data-[selected=true]:bg-white/22 data-[selected=true]:text-slate-900 data-[selected=true]:border-l-2 data-[selected=true]:border-l-slate-400/80 ' +
    '[&_svg]:size-4 [&_svg]:shrink-0';

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
            'mb-0.5 mt-1.5 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-500 leading-tight',
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
      <div className="space-y-1">
        {MENU_SIDEBAR.map((group, groupIndex) => (
          <div key={groupIndex}>
            <div className="mb-0.5 mt-1.5 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-500 leading-tight">
              {group.title}
            </div>
            <div className="space-y-0.5">
              {group.children?.map((child, childIndex) => {
                const hasChildren = child.children && child.children.length > 0;
                const itemKey = `g${groupIndex}-c${childIndex}`;

                if (hasChildren) {
                  return (
                    <div
                      key={childIndex}
                      ref={(el) => {
                        if (el) itemRefsRef.current.set(itemKey, el);
                      }}
                      onMouseEnter={() =>
                        openFlyout(
                          itemKey,
                          child.title ?? '',
                          child.children ?? [],
                        )
                      }
                      onMouseLeave={scheduleClose}
                      data-slot="sidebar-parent"
                      className="cursor-default"
                    >
                      <div className={itemRowClass} data-selected={false}>
                        <span className="flex w-9 shrink-0 justify-center">
                          {child.icon ? <child.icon /> : null}
                        </span>
                        <span className="truncate">{child.title}</span>
                      </div>
                    </div>
                  );
                }

                const isActive = matchPath(child.path ?? '');
                return (
                  <Link
                    key={childIndex}
                    to={child.path || '#'}
                    className={itemRowClass}
                    data-selected={isActive ? 'true' : undefined}
                  >
                    <span className="flex w-9 shrink-0 justify-center">
                      {child.icon ? <child.icon /> : null}
                    </span>
                    <span className="truncate">{child.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {flyout && (
        <SidebarFlyout
          visible={!!flyout}
          top={flyout.top}
          left={flyout.left}
          title={flyout.title}
          items={flyout.items}
          onMouseEnter={clearCloseTimer}
          onMouseLeave={scheduleClose}
        />
      )}
    </>
  );
}
