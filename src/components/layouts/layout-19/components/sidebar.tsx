import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  BarChart3,
  BriefcaseBusiness,
  ChevronRight,
  ClipboardList,
  History,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  Package,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Trophy,
  Truck,
  UserRound,
  Users,
  Wrench,
  Bell,
  ClipboardCheck,
  Boxes,
  ShoppingCart,
  Lock,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLayout } from './context';
import {
  layoutLevel1Flyout,
  layoutNestedSubmenu,
  SIDEBAR_FLYOUT_ITEM_HEIGHT_PX,
} from './sidebar-submenu-position';

/* ═══════════════════════════════════════════════════════════════
   1. TYPES & CONSTANTS
   ═══════════════════════════════════════════════════════════════ */

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ElementType;
  path?: string;
  children?: NavItem[];
}

const SIDEBAR_WIDTH_EXPANDED = 240;
const SIDEBAR_WIDTH_COLLAPSED = 72;
const ITEM_HEIGHT = SIDEBAR_FLYOUT_ITEM_HEIGHT_PX;

/** Cross dead zone between sidebar column and fixed flyout without closing. */
const FLYOUT_CLOSE_DELAY_MS = 220;
/** Brief delay before clearing nested flyout when pointer leaves level-1 panel. */
const SUBMENU_CLOSE_DELAY_MS = 100;

/* ═══════════════════════════════════════════════════════════════
   2. NAV CONFIGURATION
   ═══════════════════════════════════════════════════════════════ */


const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard/overview',
  },
  {
    id: 'fleet-planning',
    label: 'Fleet Planning',
    icon: Truck,
    path: '/fleet-planning',
  },
  {
    id: 'tracking',
    label: 'Tracking & Monitoring',
    icon: MapPin,
    children: [
      { id: 'tracking-live', label: 'Live Tracking', icon: MapPin, path: '/tracking/live' },
      { id: 'tracking-history', label: 'History Tracking', icon: History, path: '/tracking/history' },
      { id: 'tracking-alerts', label: 'Alerts', icon: Bell, path: '/tracking/alerts' },
      { id: 'tracking-incidents', label: 'Incidents', icon: ShieldAlert, path: '/tracking/incidents' },
    ],
  },
  {
    id: 'vehicle-management',
    label: 'Vehicle Management',
    icon: Truck,
    children: [
      { id: 'vehicle-profiles', label: 'Vehicle Profiles', icon: UserRound, path: '/vehicle-management/profiles' },
      { id: 'vehicle-checks', label: 'Vehicle Checks', icon: ClipboardList, path: '/vehicle-management/checks' },
      { id: 'vehicle-defects', label: 'Vehicle Defects', icon: AlertTriangle, path: '/vehicle-management/defects' },
      { id: 'vehicle-inspections', label: 'Inspections', icon: ClipboardCheck, path: '/vehicle-management/inspections' },
      { id: 'vehicle-maintenance', label: 'Maintenance Records', icon: Wrench, path: '/vehicle-management/maintenance' },
    ],
  },
  {
    id: 'asset-management',
    label: 'Asset Management',
    icon: BriefcaseBusiness,
    children: [
      { id: 'asset-profiles', label: 'Asset Profiles', icon: BriefcaseBusiness, path: '/asset-management/profiles' },
      { id: 'asset-checks', label: 'Asset Checks', icon: ShieldCheck, path: '/asset-management/checks' },
      { id: 'asset-defects', label: 'Asset Defects', icon: AlertTriangle, path: '/asset-management/defects' },
      { id: 'asset-inventory', label: 'Inventory', icon: Boxes, path: '/asset-management/inventory' },
      { id: 'asset-suppliers', label: 'Suppliers', icon: ShoppingCart, path: '/asset-management/suppliers' },
    ],
  },
  {
    id: 'workshops',
    label: 'Workshops',
    icon: Wrench,
    path: '/workshops',
  },
  {
    id: 'messaging',
    label: 'Messaging',
    icon: MessageSquare,
    path: '/messaging/chat',
  },
  {
    id: 'earned-recognition',
    label: 'Earned Recognition',
    icon: Trophy,
    path: '/earned-recognition',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: BarChart3,
    path: '/reports/overview',
  },
  {
    id: 'system-management',
    label: 'User & System Management',
    icon: Users,
    children: [
      { id: 'system-users', label: 'Users', icon: Users, path: '/system-management/users' },
      { id: 'system-roles', label: 'Roles & Permissions', icon: Lock, path: '/system-management/roles' },
      { id: 'system-settings', label: 'Settings', icon: Settings, path: '/system-management/settings' },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   3. SIDEBAR COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export function Sidebar() {
  const { pathname } = useLocation();
  const { setSidebarCollapsed } = useLayout();
  const [isHovered, setIsHovered] = useState(false);
  const collapsed = !isHovered;

  // Ensure global layout always stays collapsed to prevent main content shifting
  useEffect(() => {
    setSidebarCollapsed(true);
  }, [setSidebarCollapsed]);

  const level1FlyoutRef = useRef<HTMLDivElement | null>(null);
  const flyoutCloseTimerRef = useRef<number | null>(null);
  const subCloseTimerRef = useRef<number | null>(null);

  const cancelFlyoutCloseTimer = useCallback(() => {
    if (flyoutCloseTimerRef.current) {
      clearTimeout(flyoutCloseTimerRef.current);
      flyoutCloseTimerRef.current = null;
    }
  }, []);

  const scheduleFlyoutClose = useCallback(() => {
    cancelFlyoutCloseTimer();
    flyoutCloseTimerRef.current = window.setTimeout(() => {
      setHoveredItem(null);
      setHoveredSubItem(null);
      flyoutCloseTimerRef.current = null;
    }, FLYOUT_CLOSE_DELAY_MS);
  }, [cancelFlyoutCloseTimer]);

  const cancelSubCloseTimer = useCallback(() => {
    if (subCloseTimerRef.current) {
      clearTimeout(subCloseTimerRef.current);
      subCloseTimerRef.current = null;
    }
  }, []);

  const scheduleSubClose = useCallback(() => {
    cancelSubCloseTimer();
    subCloseTimerRef.current = window.setTimeout(() => {
      setHoveredSubItem(null);
      subCloseTimerRef.current = null;
    }, SUBMENU_CLOSE_DELAY_MS);
  }, [cancelSubCloseTimer]);

  useEffect(
    () => () => {
      cancelFlyoutCloseTimer();
      cancelSubCloseTimer();
    },
    [cancelFlyoutCloseTimer, cancelSubCloseTimer],
  );

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredSubItem, setHoveredSubItem] = useState<string | null>(null);
  const [mouseY, setMouseY] = useState(0);
  const [hoveredItemTop, setHoveredItemTop] = useState(0);
  const [subMouseY, setSubMouseY] = useState(0);
  /** Trigger row offset from level-1 flyout top (border box), for caret + layout. */
  const [hoveredSubItemOffsetInFlyout, setHoveredSubItemOffsetInFlyout] =
    useState(0);
  const isActive = useCallback(
    (path?: string) => {
      if (!path) return false;
      return pathname === path || (path !== '/' && pathname.startsWith(path));
    },
    [pathname],
  );

  const isParentActive = useCallback(
    (item: NavItem) => {
      if (isActive(item.path)) return true;
      return (
        item.children?.some((child) => {
          if (isActive(child.path)) return true;
          return child.children?.some((leaf) => isActive(leaf.path));
        }) ?? false
      );
    },
    [isActive],
  );

  const handleMouseEnter = (
    e: React.MouseEvent,
    id: string,
    childrenCount: number = 0,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const vh = window.innerHeight;
    const { flyoutTopPx } = layoutLevel1Flyout(rect.top, childrenCount, vh);

    setMouseY(flyoutTopPx);
    setHoveredItemTop(rect.top);
    setHoveredItem(id);
  };

  /**
   * Positions the nested (second) flyout and its left caret from the **level-1 parent row**
   * only. Must not be driven from the nested panel or leaf links — those rects would move
   * the arrow away from the true parent↔child connection.
   */
  const handleSubRowMouseEnter = (
    e: React.MouseEvent,
    id: string,
    childrenCount: number = 0,
  ) => {
    const triggerRect = e.currentTarget.getBoundingClientRect();
    const vh = window.innerHeight;
    const parentRect = level1FlyoutRef.current?.getBoundingClientRect();

    if (!parentRect) {
      const approxParent = new DOMRect(0, mouseY, 0, 0);
      const { topPx } = layoutNestedSubmenu(
        approxParent,
        triggerRect,
        childrenCount,
        vh,
      );
      setSubMouseY(topPx);
      setHoveredSubItemOffsetInFlyout(triggerRect.top - mouseY);
      setHoveredSubItem(id);
      return;
    }

    const { topPx } = layoutNestedSubmenu(
      parentRect,
      triggerRect,
      childrenCount,
      vh,
    );

    setSubMouseY(topPx);
    setHoveredSubItemOffsetInFlyout(triggerRect.top - parentRect.top);
    setHoveredSubItem(id);
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-[100] flex h-screen flex-col bg-[#1E293B] text-white/85 transition-all duration-300 ease-in-out border-r border-white/5 shadow-[0_16px_30px_-22px_rgba(0,0,0,0.5)] overflow-visible',
        collapsed && 'items-center',
      )}
      style={{
        width: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        cancelFlyoutCloseTimer();
        cancelSubCloseTimer();
        setHoveredItem(null);
        setHoveredSubItem(null);
      }}
    >
      {/* ── Brand Area ───────────────────────────────────────── */}
      <div className="relative w-full flex h-[60px] shrink-0 items-center justify-between px-5 overflow-visible">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex group/logo cursor-pointer px-1"
          >
            <img
              src="/media/brand-logos/prolius-logo.svg"
              alt="Prolius Fleet"
              className="h-[40px] w-auto transition-all duration-300 group-hover/logo:scale-[1.02]"
            />
          </motion.div>
        )}
        {collapsed && (
          <div className="flex items-center justify-center w-full">
            <div className="h-10 w-10 flex items-center justify-center transition-all cursor-pointer group-hover/logo:scale-110">
              <img
                src="/media/brand-logos/fav-icon.png"
                alt="Prolius"
                className="h-8 w-8 object-contain opacity-100 transition-all"
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Custom Scrollbar Hiding Style ── */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="h-px bg-white/10 mx-5 mb-2" />

      {/* ── Navigation: fills space between header and profile; scrolls when list exceeds viewport */}
      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-visible py-1 px-2 scrollbar-hide">
        <nav className="flex flex-col space-y-[2px]">
          {NAV_ITEMS.map((item) => {
            const active = isParentActive(item);
            const Icon = item.icon || Package;
            const hasChildren = item.children && item.children.length > 0;

            return (
              <div
                key={item.id}
                className="relative group/mainitem"
                onMouseEnter={(e) => {
                  cancelFlyoutCloseTimer();
                  handleMouseEnter(e, item.id, item.children?.length ?? 0);
                }}
                onMouseLeave={scheduleFlyoutClose}
              >
                {/* Active Accent Bar */}
                {active && (
                  <div className="absolute left-[-8px] top-1 bottom-1 w-[3px] rounded-r-md bg-[#3B82F6] z-10" />
                )}

                <Link
                  to={item.path || '#'}
                  onClick={(e) => !item.path && e.preventDefault()}
                  className={cn(
                    'flex items-center rounded-md transition-all duration-200 relative',
                    active
                      ? 'bg-[#3B82F6]/20 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
                      : 'text-white/50 hover:bg-white/[0.05] hover:text-white',
                    collapsed
                      ? 'justify-center w-7 h-7'
                      : 'gap-2 px-1.5 w-full',
                  )}
                  style={{ height: `${ITEM_HEIGHT}px` }}
                >
                  <div className="flex h-full w-7 shrink-0 items-center justify-center">
                    <Icon
                      className={cn(
                        'h-[17px] w-[17px] transition-colors',
                        active
                          ? 'text-white'
                          : 'group-hover/mainitem:text-white',
                      )}
                    />
                  </div>
                  {!collapsed && (
                    <span className="text-[13px] leading-normal font-medium tracking-tight flex-1 min-w-0 truncate">
                      {item.label}
                    </span>
                  )}

                  {/* Collapsed Tooltip */}
                  {collapsed && hoveredItem === item.id && !hasChildren && (
                    <div className="fixed left-[84px] px-3 py-2 bg-[#2F4B69] text-white text-xs font-medium rounded-md shadow-2xl border border-white/15 z-[200] pointer-events-none whitespace-nowrap">
                      {item.label}
                    </div>
                  )}
                </Link>

                {/* Level 1 Flyout */}
                <AnimatePresence>
                  {hoveredItem === item.id && hasChildren && (
                    <motion.div
                      ref={level1FlyoutRef}
                      initial={{ opacity: 0, x: -8, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -8, scale: 0.98 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                      className="fixed z-[150] overflow-visible bg-[#1d466b] border border-[#6c8fb0]/30 rounded-md shadow-[0_18px_36px_-18px_rgba(0,0,0,0.55)] p-2 flex flex-col min-w-[140px] max-w-[180px] w-max"
                      style={{
                        left: collapsed
                          ? SIDEBAR_WIDTH_COLLAPSED + 8
                          : SIDEBAR_WIDTH_EXPANDED + 8,
                        top: mouseY,
                      }}
                      onMouseEnter={() => {
                        cancelFlyoutCloseTimer();
                        cancelSubCloseTimer();
                      }}
                      onMouseLeave={(e) => {
                        const rel = e.relatedTarget;
                        if (
                          rel instanceof Node &&
                          e.currentTarget.contains(rel)
                        ) {
                          return;
                        }
                        scheduleSubClose();
                      }}
                    >
                      {/* Bridge L1 → L2: sits past the panel edge only (does not cover rows) */}
                      <div
                        aria-hidden
                        className="pointer-events-auto absolute top-0 left-full z-[153] h-full w-3"
                      />
                      <div
                        className="absolute left-[-6px] w-0 h-0 border-y-[6px] border-y-transparent border-r-[6px] border-r-white/10 z-[151]"
                        style={{
                          top: `${hoveredItemTop - mouseY + (ITEM_HEIGHT - 12) / 2}px`,
                        }}
                      />
                      <div
                        className="absolute left-[-5px] w-0 h-0 border-y-[5px] border-y-transparent border-r-[5px] border-r-[#1a2333] z-[152]"
                        style={{
                          top: `${hoveredItemTop - mouseY + (ITEM_HEIGHT - 10) / 2}px`,
                        }}
                      />

                      <div className="space-y-[2px] px-0.5 overflow-visible">
                        {item.children?.map((sub) => {
                          const subActive = isParentActive(sub);
                          const subHasChildren =
                            sub.children && sub.children.length > 0;
                          if (
                            sub.label === item.label &&
                            sub.path === item.path
                          )
                            return null;

                          return (
                            <div
                              key={sub.id}
                              className="relative group/subcontainer"
                              onMouseEnter={(e) => {
                                cancelSubCloseTimer();
                                handleSubRowMouseEnter(
                                  e,
                                  sub.id,
                                  sub.children?.length ?? 0,
                                );
                              }}
                            >
                              <Link
                                to={sub.path || '#'}
                                onClick={(e) => !sub.path && e.preventDefault()}
                                className={cn(
                                'group/subitem flex items-center justify-between px-1.5 rounded-md text-xs font-medium leading-normal transition-all duration-200',
                                  subActive
                                    ? 'bg-white/18 text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.08)]'
                                    : 'text-white/80 hover:bg-white/12 hover:text-white',
                                )}
                                style={{ height: `${ITEM_HEIGHT}px` }}
                              >
                                <span className="flex min-w-0 flex-1 items-center gap-1.5 truncate pr-2">
                                  {subActive && (
                                    <div className="w-1 h-1 rounded-full bg-[#EB7A45] shadow-[0_0_5px_rgba(235,122,69,0.8)]" />
                                  )}
                                  <span className="min-w-0 truncate leading-normal">
                                    {sub.label}
                                  </span>
                                </span>
                                {subHasChildren && (
                                  <ChevronRight className="h-3 w-3 opacity-20 group-hover/subitem:opacity-80 transition-opacity" />
                                )}
                              </Link>

                              {/* Level 2 Flyout rendered below */}
                            </div>
                          );
                        })}
                      </div>

                      {/* Level 2 Flyouts rendered OUTSIDE the scroll container to prevent clipping */}
                      {item.children?.map((sub) => {
                        const subHasChildren =
                          sub.children && sub.children.length > 0;
                        if (!subHasChildren) return null;
                        return (
                          <AnimatePresence key={`flyout-${sub.id}`}>
                            {hoveredSubItem === sub.id && (
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="absolute bg-[#1d466b] border border-[#6c8fb0]/30 rounded-md shadow-[0_18px_36px_-18px_rgba(0,0,0,0.58)] p-2 flex flex-col z-[155] min-w-[140px] max-w-[180px] w-max"
                                style={{
                                  left: `calc(100% + 8px)`,
                                  top: subMouseY,
                                }}
                                onMouseEnter={() => {
                                  cancelFlyoutCloseTimer();
                                  cancelSubCloseTimer();
                                }}
                              >
                                {/* Bridge back toward L1 to avoid gap flicker */}
                                <div className="pointer-events-auto absolute left-[-20px] top-0 bottom-0 z-[154] w-5 bg-transparent" />

                                {/* Dynamic Pointers */}
                                <div
                                  className="absolute left-[-6px] w-0 h-0 border-y-[6px] border-y-transparent border-r-[6px] border-r-white/10 z-[156]"
                                  style={{
                                    top: `${hoveredSubItemOffsetInFlyout - subMouseY + (ITEM_HEIGHT - 12) / 2}px`,
                                  }}
                                />
                                <div
                                  className="absolute left-[-5px] w-0 h-0 border-y-[5px] border-y-transparent border-r-[5px] border-r-[#1a2333] z-[157]"
                                  style={{
                                    top: `${hoveredSubItemOffsetInFlyout - subMouseY + (ITEM_HEIGHT - 10) / 2}px`,
                                  }}
                                />

                                <div className="space-y-[2px] px-0.5 overflow-visible">
                                  {sub.children?.map((leaf) => (
                                    <Link
                                      key={leaf.id}
                                      to={leaf.path || '#'}
                                      className={cn(
                                      'flex items-center px-1.5 text-xs font-medium leading-normal transition-all rounded-md',
                                        isActive(leaf.path)
                                          ? 'bg-white/18 text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.08)]'
                                          : 'text-white/80 hover:bg-white/12 hover:text-white',
                                      )}
                                      style={{ height: `${ITEM_HEIGHT}px` }}
                                    >
                                      <span className="flex min-w-0 flex-1 items-center gap-1.5 truncate">
                                        {isActive(leaf.path) && (
                                          <div className="w-1 h-1 rounded-full bg-[#EB7A45]" />
                                        )}
                                        <span className="min-w-0 truncate leading-normal">
                                          {leaf.label}
                                        </span>
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </div>

      {/* ── User Profile Footer ───────────────────────────────── */}
      <div className="shrink-0 border-t border-slate-600/40 bg-[#1E293B] p-4">
        <div
          className={cn(
            'flex items-center rounded-md transition-all duration-300 hover:bg-white/5 cursor-pointer group/user p-1',
            collapsed && 'justify-center',
          )}
        >
          <div className="h-8 w-8 rounded-md bg-gradient-to-tr from-blue-600/20 to-white/5 flex items-center justify-center text-xs font-semibold text-white border border-white/10 transition-all group-hover/user:border-blue-500/50 shadow-inner">
            AD
          </div>
          {!collapsed && (
            <div className="flex flex-col ml-3 min-w-0">
              <span className="text-xs font-medium text-white/90 truncate group-hover/user:text-blue-200 transition-colors">
                Admin User
              </span>
              <span className="text-2xs text-white/30 uppercase tracking-tighter truncate font-medium">
                Operations Commander
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
