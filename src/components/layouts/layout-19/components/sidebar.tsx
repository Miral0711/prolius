import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BarChart3,
  Bell,
  BookOpen,
  Bus,
  Camera,
  Car,
  ChevronRight,
  ClipboardList,
  Clock,
  Gauge,
  Globe,
  LayoutDashboard,
  LogOut,
  MapPin,
  MessageSquare,
  Package,
  Settings,
  Shield,
  ShieldAlert,
  Truck,
  Users,
  Video,
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
    children: [
      { id: 'dash-overview', label: 'Overview', path: '/dashboard/overview' },
      { id: 'dash-vehicles', label: 'Vehicles', path: '/dashboard/vehicles' },
      { id: 'dash-drivers', label: 'Drivers', path: '/dashboard/drivers' },
      { id: 'dash-bookings', label: 'Bookings', path: '/dashboard/bookings' },
      { id: 'dash-revenue', label: 'Revenue', path: '/dashboard/revenue' },
      {
        id: 'dash-maintenance',
        label: 'Maintenance',
        path: '/dashboard/maintenance',
      },
      { id: 'dash-safety', label: 'Safety', path: '/dashboard/safety' },
      { id: 'dash-eld', label: 'ELD/HOS', path: '/dashboard/eld-hos' },
      {
        id: 'dash-ai',
        label: 'AI Alerts',
        path: '/bus-alert-monitoring/overview',
      },
      {
        id: 'dash-idling',
        label: 'Idling Reports',
        path: '/dashboard/idling-reports',
      },
      {
        id: 'dash-fuel',
        label: 'Fuel Management',
        path: '/dashboard/fuel-management',
      },
      { id: 'dash-obd', label: 'OBD-II/DTC', path: '/dashboard/obd-dtc' },
    ],
  },
  {
    id: 'cockpit',
    label: 'Manager Cockpit',
    icon: Gauge,
    path: '/manager-cockpit',
  },
  {
    id: 'bus-tracking',
    label: 'Bus Tracking',
    icon: Bus,
    children: [
      { id: 'bus-live', label: 'Live', path: '/bus-tracking/live' },
      { id: 'bus-history', label: 'History', path: '/bus-tracking/history' },
    ],
  },
  {
    id: 'bus-driver',
    label: 'Bus & Driver List',
    icon: Users,
    path: '/bus-driver-list',
  },
  {
    id: 'bus-route',
    label: 'Bus Route Planning',
    icon: MapPin,
    path: '/bus-route-planning',
  },
  {
    id: 'bus-video',
    label: 'Bus Video Monitoring',
    icon: Video,
    children: [
      {
        id: 'bus-dvr-live',
        label: 'Live DVR',
        path: '/bus-video-monitoring/live-dvr',
      },
      {
        id: 'bus-dvr-hist',
        label: 'History DVR',
        path: '/bus-video-monitoring/history-dvr',
      },
    ],
  },
  {
    id: 'bus-alert',
    label: 'Bus Alert Monitoring',
    icon: Bell,
    children: [
      {
        id: 'bus-alert-ov',
        label: 'Overview',
        path: '/bus-alert-monitoring/overview',
      },
      {
        id: 'bus-alert-list',
        label: 'List',
        path: '/bus-alert-monitoring/list',
      },
      {
        id: 'bus-alert-hist',
        label: 'History List',
        path: '/bus-alert-monitoring/history-list',
      },
    ],
  },
  {
    id: 'taxi-tracking',
    label: 'Taxi Tracking',
    icon: Car,
    children: [
      { id: 'taxi-live', label: 'Live', path: '/taxi-tracking/live' },
      { id: 'taxi-history', label: 'History', path: '/taxi-tracking/history' },
    ],
  },
  {
    id: 'job-dispatch',
    label: 'Job Dispatching',
    icon: ClipboardList,
    children: [
      { id: 'job-list', label: 'Job List', path: '/job-dispatching/job-list' },
      {
        id: 'job-create',
        label: 'Create Job',
        path: '/job-dispatching/create-job',
      },
    ],
  },
  {
    id: 'shift-mgmt',
    label: 'Shift Management',
    icon: Clock,
    children: [
      {
        id: 'shift-all',
        label: 'All Shifts',
        path: '/shift-management/all-shifts',
      },
      {
        id: 'shift-create',
        label: 'Create Shift',
        path: '/shift-management/create-shift',
      },
    ],
  },
  {
    id: 'messaging',
    label: 'Messaging',
    icon: MessageSquare,
    children: [
      { id: 'msg-chat', label: 'Chat Interface', path: '/messaging/chat' },
      {
        id: 'msg-single',
        label: 'Single Message',
        path: '/messaging/single-message',
      },
      {
        id: 'msg-groups',
        label: 'Message Groups List',
        path: '/messaging/message-groups',
      },
      {
        id: 'msg-broadcasts',
        label: 'Broadcasts',
        path: '/messaging/broadcasts',
      },
    ],
  },
  {
    id: 'taxi-video',
    label: 'Taxi Video Monitoring',
    icon: Camera,
    children: [
      {
        id: 'taxi-dvr-live',
        label: 'Live DVR',
        path: '/taxi-video-monitoring/live-dvr',
      },
      {
        id: 'taxi-dvr-hist',
        label: 'History DVR',
        path: '/taxi-video-monitoring/history-dvr',
      },
    ],
  },
  {
    id: 'taxi-alert',
    label: 'Taxi Alert Monitoring',
    icon: ShieldAlert,
    children: [
      {
        id: 'taxi-alert-ov',
        label: 'Overview',
        path: '/taxi-alert-monitoring/overview',
      },
      {
        id: 'taxi-alert-list',
        label: 'List',
        path: '/taxi-alert-monitoring/list',
      },
      {
        id: 'taxi-alert-hist',
        label: 'History List',
        path: '/taxi-alert-monitoring/history-list',
      },
    ],
  },
  {
    id: 'ads-mgmt',
    label: 'Ads Management',
    icon: Globe,
    children: [
      {
        id: 'ads-adverts',
        label: 'Advertisements',
        path: '/ads-management/advertisements',
      },
      {
        id: 'ads-offers',
        label: 'Special Offers',
        path: '/ads-management/special-offers',
      },
      { id: 'ads-news', label: 'News', path: '/ads-management/news' },
      { id: 'ads-lang', label: 'Language', path: '/ads-management/language' },
    ],
  },
  {
    id: 'crm',
    label: 'CRM',
    icon: BookOpen,
    children: [
      {
        id: 'crm-app',
        label: 'Passenger App Management',
        path: '/pax-app-management',
      },
      {
        id: 'crm-pass',
        label: 'Passenger Management',
        path: '/crm/passenger-management',
      },
      { id: 'crm-rides', label: 'Ride Types', path: '/crm/ride-types' },
      { id: 'crm-coupons', label: 'Coupons', path: '/crm/coupons' },
      {
        id: 'crm-chauffeur',
        label: 'Chauffeur Rates',
        path: '/crm/chauffeur-rates',
      },
      { id: 'crm-chat', label: 'Passenger Chat', path: '/crm/passenger-chat' },
      {
        id: 'crm-support',
        label: 'Support Tickets',
        path: '/crm/support-tickets',
      },
      { id: 'crm-lost', label: 'Lost & Found', path: '/crm/lost-found' },
      {
        id: 'crm-offers',
        label: 'Special Offers',
        path: '/crm/special-offers',
      },
      {
        id: 'crm-spend',
        label: 'Spending Reports',
        path: '/crm/spending-reports',
      },
    ],
  },
  {
    id: 'fleet-mgmt',
    label: 'Fleet Management',
    icon: Truck,
    children: [
      {
        id: 'fleet-bus',
        label: 'Bus Management',
        path: '/fleet-management/bus',
      },
      {
        id: 'fleet-bus-dr',
        label: 'Bus Drivers',
        path: '/fleet-management/bus-drivers',
      },
      {
        id: 'fleet-taxi',
        label: 'Taxi Management',
        path: '/fleet-management/taxi',
      },
      {
        id: 'fleet-taxi-dr',
        label: 'Taxi Drivers',
        path: '/fleet-management/taxi-drivers',
      },
      {
        id: 'fleet-parts',
        label: 'Inventory Parts',
        path: '/fleet-management/inventory-parts',
      },
      {
        id: 'fleet-supp',
        label: 'Suppliers',
        path: '/fleet-management/suppliers',
      },
      {
        id: 'fleet-mfr',
        label: 'Vehicle Manufacturers',
        path: '/fleet-management/vehicle-manufacturers',
      },
      {
        id: 'fleet-inspect',
        label: 'Vehicle Inspections',
        path: '/fleet-management/vehicle-inspections',
      },
      {
        id: 'fleet-maint',
        label: 'Maintenance Records',
        path: '/fleet-management/maintenance-records',
      },
      {
        id: 'fleet-maint-type',
        label: 'Maintenance Types',
        path: '/fleet-management/maintenance-types',
      },
      {
        id: 'fleet-geo',
        label: 'Geofence Zones',
        path: '/fleet-management/geofence-zones',
      },
    ],
  },
  {
    id: 'wasl-mgmt',
    label: 'WASL Management',
    icon: Shield,
    children: [
      { id: 'wasl-device', label: 'Device', path: '/wasl-management/device' },
      {
        id: 'wasl-company',
        label: 'Company',
        path: '/wasl-management/company',
      },
      { id: 'wasl-bus', label: 'Bus', path: '/wasl-management/bus' },
      { id: 'wasl-taxi', label: 'Taxi', path: '/wasl-management/taxi' },
      {
        id: 'wasl-bus-dr',
        label: 'Bus Drivers',
        path: '/wasl-management/bus-drivers',
      },
      {
        id: 'wasl-taxi-dr',
        label: 'Taxi Drivers',
        path: '/wasl-management/taxi-drivers',
      },
      {
        id: 'wasl-tariff',
        label: 'Tariff Structure',
        path: '/wasl-management/tariff-structure',
      },
      {
        id: 'wasl-trips',
        label: 'Taxi Trips',
        path: '/wasl-management/taxi-trips',
      },
      {
        id: 'wasl-bus-trk',
        label: 'Bus Tracking',
        path: '/wasl-management/bus-tracking',
      },
      {
        id: 'wasl-taxi-trk',
        label: 'Taxi Tracking',
        path: '/wasl-management/taxi-tracking',
      },
      {
        id: 'wasl-version',
        label: 'App Version Monitoring',
        path: '/wasl-management/app-version',
      },
      {
        id: 'wasl-geo',
        label: 'Geofence Zones',
        path: '/wasl-management/geofence-zones',
      },
      {
        id: 'wasl-maint',
        label: 'Maintenance',
        path: '/wasl-management/maintenance',
      },
      {
        id: 'wasl-maint-type',
        label: 'Maintenance Types',
        path: '/wasl-management/maintenance-types',
      },
      {
        id: 'wasl-inspect',
        label: 'Vehicle Inspections',
        path: '/wasl-management/vehicle-inspections',
      },
      {
        id: 'wasl-supp',
        label: 'Suppliers',
        path: '/wasl-management/suppliers',
      },
      {
        id: 'wasl-mfr',
        label: 'Vehicle Manufacturers',
        path: '/wasl-management/vehicle-manufacturers',
      },
    ],
  },
  {
    id: 'system-mgmt',
    label: 'System Management',
    icon: Settings,
    children: [
      {
        id: 'sys-company',
        label: 'Company',
        path: '/system-management/company',
      },
      {
        id: 'sys-roles',
        label: 'Roles and Permission',
        path: '/system-management/roles',
      },
      { id: 'sys-user', label: 'User', path: '/system-management/user' },
      {
        id: 'sys-app',
        label: 'App Management',
        path: '/system-management/app',
      },
      {
        id: 'sys-ads',
        label: 'Ads Management',
        path: '/system-management/ads',
      },
      {
        id: 'sys-tariff',
        label: 'Tariff Update',
        path: '/system-management/tariff-update',
      },
      {
        id: 'sys-group',
        label: 'Group Location',
        path: '/system-management/group-location',
      },
      {
        id: 'sys-holiday',
        label: 'Holiday Management',
        path: '/system-management/holiday',
      },
      {
        id: 'sys-ride',
        label: 'Ride Type Management',
        path: '/system-management/ride-type',
      },
      { id: 'sys-mdm', label: 'MDM', path: '/system-management/mdm' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: BarChart3,
    children: [
      {
        id: 'rpt-data',
        label: 'Data Usage',
        children: [
          {
            id: 'rpt-data-taxi',
            label: 'Taxi',
            path: '/reports/data-usage/taxi',
          },
          { id: 'rpt-data-bus', label: 'Bus', path: '/reports/data-usage/bus' },
        ],
      },
      {
        id: 'rpt-ops',
        label: 'Operations & Trips',
        children: [
          {
            id: 'rpt-ops-job',
            label: 'Job/Booking',
            path: '/reports/operations-trips/job-booking',
          },
          {
            id: 'rpt-ops-taxi',
            label: 'Taxi Trip',
            path: '/reports/operations-trips/taxi-trip',
          },
          {
            id: 'rpt-ops-act',
            label: 'Trip Activity',
            path: '/reports/operations-trips/trip-activity',
          },
          {
            id: 'rpt-ops-class',
            label: 'Trip Classification',
            path: '/reports/operations-trips/trip-classification',
          },
          {
            id: 'rpt-ops-shift',
            label: 'Shift',
            path: '/reports/operations-trips/shift',
          },
        ],
      },
      {
        id: 'rpt-trk',
        label: 'Tracking & Movement',
        children: [
          {
            id: 'rpt-mv',
            label: 'Movement',
            path: '/reports/tracking-movement/movement',
          },
          {
            id: 'rpt-dist',
            label: 'Distance',
            path: '/reports/tracking-movement/distance',
          },
          {
            id: 'rpt-track',
            label: 'Tracking',
            path: '/reports/tracking-movement/tracking',
          },
          {
            id: 'rpt-geo',
            label: 'Geofence',
            path: '/reports/tracking-movement/geofence',
          },
        ],
      },
      {
        id: 'rpt-drv',
        label: 'Drivers',
        children: [
          {
            id: 'rpt-drv-taxi',
            label: 'Taxi Driver',
            path: '/reports/drivers/taxi',
          },
          {
            id: 'rpt-drv-drv',
            label: 'Driver',
            path: '/reports/drivers/driver',
          },
          {
            id: 'rpt-drv-score',
            label: 'Driver Scorecards',
            path: '/reports/drivers/scorecards',
          },
          {
            id: 'rpt-drv-beh',
            label: 'Driver Behaviour',
            path: '/reports/drivers/behaviour',
          },
        ],
      },
      {
        id: 'rpt-fleet',
        label: 'Fleet & Vehicle',
        children: [
          {
            id: 'rpt-fl-alerts',
            label: 'Alerts',
            path: '/reports/fleet-vehicle/alerts',
          },
          {
            id: 'rpt-fl-fuel',
            label: 'Fuel',
            path: '/reports/fleet-vehicle/fuel',
          },
          {
            id: 'rpt-fl-obd',
            label: 'OBD',
            path: '/reports/fleet-vehicle/obd',
          },
          {
            id: 'rpt-fl-maint',
            label: 'Maintenance',
            path: '/reports/fleet-vehicle/maintenance',
          },
          {
            id: 'rpt-fl-parts',
            label: 'Parts / Inventory',
            path: '/reports/fleet-vehicle/parts',
          },
          {
            id: 'rpt-fl-inspect',
            label: 'Vehicle Inspections',
            path: '/reports/fleet-vehicle/inspections',
          },
        ],
      },
      {
        id: 'rpt-rev',
        label: 'Revenue & Payments',
        children: [
          {
            id: 'rpt-rev-taxi',
            label: 'Taxi Revenue',
            path: '/reports/revenue-payments/taxi-revenue',
          },
          {
            id: 'rpt-rev-dash',
            label: 'Revenue Dashboard',
            path: '/reports/revenue-payments/dashboard',
          },
          {
            id: 'rpt-rev-analytics',
            label: 'Advanced Analytics',
            path: '/reports/revenue-payments/analytics',
          },
          {
            id: 'rpt-rev-exp',
            label: 'Expense',
            path: '/reports/revenue-payments/expense',
          },
          {
            id: 'rpt-rev-bill',
            label: 'Billing',
            path: '/reports/revenue-payments/billing',
          },
          {
            id: 'rpt-rev-wallet',
            label: 'Wallet Transactions',
            path: '/reports/revenue-payments/wallet',
          },
          {
            id: 'rpt-rev-disp',
            label: 'Payment Disputes',
            path: '/reports/revenue-payments/disputes',
          },
          {
            id: 'rpt-rev-fare',
            label: 'Fare Adjustments',
            path: '/reports/revenue-payments/fare-adjustments',
          },
        ],
      },
      {
        id: 'rpt-sys',
        label: 'System & Communications',
        children: [
          {
            id: 'rpt-sys-ver',
            label: 'App Version',
            path: '/reports/system-communications/app-version',
          },
          {
            id: 'rpt-sys-logs',
            label: 'Logs',
            path: '/reports/system-communications/logs',
          },
          {
            id: 'rpt-sys-voip',
            label: 'VoIP Calls',
            path: '/reports/system-communications/voip',
          },
        ],
      },
    ],
  },
  { id: 'logout', label: 'Logout', icon: LogOut, path: '/logout' },
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
  const flyoutCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const subCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
  const [flyoutInnerMaxPx, setFlyoutInnerMaxPx] = useState<number | undefined>(
    undefined,
  );
  const [subFlyoutInnerMaxPx, setSubFlyoutInnerMaxPx] = useState<
    number | undefined
  >(undefined);

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
    const { flyoutTopPx, innerMaxHeightPx } = layoutLevel1Flyout(
      rect.top,
      childrenCount,
      vh,
    );

    setMouseY(flyoutTopPx);
    setHoveredItemTop(rect.top);
    setFlyoutInnerMaxPx(innerMaxHeightPx);
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
      const { topPx, innerMaxHeightPx } = layoutNestedSubmenu(
        approxParent,
        triggerRect,
        childrenCount,
        vh,
      );
      setSubMouseY(topPx);
      setHoveredSubItemOffsetInFlyout(triggerRect.top - mouseY);
      setSubFlyoutInnerMaxPx(innerMaxHeightPx);
      setHoveredSubItem(id);
      return;
    }

    const { topPx, innerMaxHeightPx } = layoutNestedSubmenu(
      parentRect,
      triggerRect,
      childrenCount,
      vh,
    );

    setSubMouseY(topPx);
    setHoveredSubItemOffsetInFlyout(triggerRect.top - parentRect.top);
    setSubFlyoutInnerMaxPx(innerMaxHeightPx);
    setHoveredSubItem(id);
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-[100] flex h-screen flex-col bg-[#001e3c] text-white/70 transition-all duration-300 ease-in-out border-r border-white/5 shadow-2xl overflow-visible',
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
              src="/media/brand-logos/triden_white.png"
              alt="Triden Fleet"
              className="h-[40px] w-auto transition-all duration-300 group-hover/logo:scale-[1.02]"
            />
          </motion.div>
        )}
        {collapsed && (
          <div className="flex items-center justify-center w-full">
            <div className="h-10 w-10 flex items-center justify-center transition-all cursor-pointer group-hover/logo:scale-110">
              <img
                src="/media/brand-logos/logo.png"
                alt="Logo"
                className="h-8 w-8 object-contain brightness-0 invert opacity-100 transition-all"
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
                  <div className="absolute left-[-8px] top-1 bottom-1 w-[3px] bg-blue-500 rounded-r-sm shadow-[0_0_8px_rgba(59,130,246,0.3)] z-10" />
                )}

                <Link
                  to={item.path || '#'}
                  onClick={(e) => !item.path && e.preventDefault()}
                  className={cn(
                    'flex items-center rounded-sm transition-all duration-200 relative',
                    active
                      ? 'bg-white/10 text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]'
                      : 'text-white/50 hover:bg-white/[0.05] hover:text-white',
                    collapsed
                      ? 'justify-center w-7 h-7'
                      : 'gap-2 px-1.5 w-full',
                  )}
                  style={{ height: `${ITEM_HEIGHT}px` }}
                >
                  <div className="flex h-[30px] w-7 items-center justify-center shrink-0">
                    <Icon
                      className={cn(
                        'h-[17px] w-[17px] transition-colors',
                        active
                          ? 'text-blue-400'
                          : 'group-hover/mainitem:text-blue-300',
                      )}
                    />
                  </div>
                  {!collapsed && (
                    <span className="text-[13px] leading-tight font-medium tracking-tight flex-1 truncate">
                      {item.label}
                    </span>
                  )}

                  {/* Collapsed Tooltip */}
                  {collapsed && hoveredItem === item.id && !hasChildren && (
                    <div className="fixed left-[84px] px-3 py-2 bg-[#1a1f37] text-white text-xs font-medium rounded-md shadow-2xl border border-white/10 z-[200] pointer-events-none whitespace-nowrap backdrop-blur-md">
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
                      className="fixed z-[150] overflow-visible bg-[#1a2333]/95 border border-white/5 rounded-md shadow-[0_30px_70px_rgba(0,0,0,0.7)] p-2 flex flex-col backdrop-blur-xl min-w-[140px] max-w-[180px] w-max"
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

                      <div
                        className="min-h-0 overflow-y-auto space-y-[2px] scrollbar-hide px-0.5"
                        style={
                          flyoutInnerMaxPx != null
                            ? { maxHeight: `${flyoutInnerMaxPx}px` }
                            : undefined
                        }
                      >
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
                                  'group/subitem flex items-center justify-between px-1.5 rounded-sm text-xs font-medium transition-all duration-200',
                                  subActive
                                    ? 'bg-blue-600/20 text-blue-100 shadow-[inset_0_0_10px_rgba(37,99,235,0.1)]'
                                    : 'text-white/60 hover:bg-white/5 hover:text-white',
                                )}
                                style={{ height: `${ITEM_HEIGHT}px` }}
                              >
                                <span className="flex items-center gap-1.5 truncate pr-2">
                                  {subActive && (
                                    <div className="w-1 h-1 rounded-full bg-blue-400 shadow-[0_0_5px_rgba(96,165,250,0.8)]" />
                                  )}
                                  <span className="truncate">{sub.label}</span>
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
                                className="absolute bg-[#1a2333]/98 border border-white/5 rounded-md shadow-[0_30px_80px_rgba(0,0,0,0.8)] p-2 flex flex-col z-[155] backdrop-blur-2xl min-w-[140px] max-w-[180px] w-max"
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

                                <div
                                  className="min-h-0 overflow-y-auto space-y-[2px] scrollbar-hide px-0.5"
                                  style={
                                    subFlyoutInnerMaxPx != null
                                      ? { maxHeight: `${subFlyoutInnerMaxPx}px` }
                                      : undefined
                                  }
                                >
                                  {sub.children?.map((leaf) => (
                                    <Link
                                      key={leaf.id}
                                      to={leaf.path || '#'}
                                      className={cn(
                                        'flex items-center px-1.5 text-xs font-medium transition-all rounded-sm',
                                        isActive(leaf.path)
                                          ? 'bg-blue-600/20 text-white shadow-[inset_0_0_10px_rgba(37,99,235,0.1)]'
                                          : 'text-white/60 hover:bg-white/5 hover:text-white',
                                      )}
                                      style={{ height: `${ITEM_HEIGHT}px` }}
                                    >
                                      <span className="flex items-center gap-1.5 truncate">
                                        {isActive(leaf.path) && (
                                          <div className="w-1 h-1 rounded-full bg-blue-300" />
                                        )}
                                        <span className="truncate">
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
      <div className="shrink-0 border-t border-white/5 bg-white/[0.01] p-4 backdrop-blur-sm">
        <div
          className={cn(
            'flex items-center rounded-sm transition-all duration-300 hover:bg-white/5 cursor-pointer group/user p-1',
            collapsed && 'justify-center',
          )}
        >
          <div className="h-8 w-8 rounded-sm bg-gradient-to-tr from-blue-600/20 to-white/5 flex items-center justify-center text-xs font-semibold text-white border border-white/10 transition-all group-hover/user:border-blue-500/50 shadow-inner">
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
