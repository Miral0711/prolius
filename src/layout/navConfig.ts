import type { LucideIcon } from 'lucide-react';
import {
  AlarmClock,
  Bus,
  CalendarDays,
  Car,
  Gauge,
  LayoutDashboard,
  MapPin,
  Users,
  Video,
  Clock,
  MessageSquare,
  Megaphone,
  BookOpen,
  Smartphone,
  Settings,
  ShieldCheck,
  LayoutGrid,
  FileText,
  LogOut,
} from 'lucide-react';

export interface NavSubItem {
  path?: string;
  label: string;
  children?: NavSubItem[];
}

export interface NavItem {
  path?: string;
  label: string;
  icon: LucideIcon;
  children?: NavSubItem[];
}

export const navConfig: NavItem[] = [
  { path: '/dashboard/overview', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/manager-cockpit', label: 'Manager Cockpit', icon: Gauge },
  {
    label: 'Bus Tracking',
    icon: Bus,
    children: [
      { path: '/bus-tracking/live', label: 'Live Tracking' },
      { path: '/bus-tracking/history', label: 'History Playback' },
    ],
  },
  { path: '/bus-driver-list', label: 'Bus & Driver List', icon: Users },
  { path: '/bus-route-planning', label: 'Bus Route Planning', icon: MapPin },
  {
    path: '/bus-video-monitoring/live-dvr',
    label: 'Bus Video Monitoring',
    icon: Video,
  },
  {
    path: '/bus-alert-monitoring',
    label: 'Bus Alert Monitoring',
    icon: AlarmClock,
  },
  { path: '/taxi-tracking/live', label: 'Taxi Tracking', icon: Car },
  { path: '/job-dispatching', label: 'Job Dispatching', icon: CalendarDays },
  { path: '/shift-management', label: 'Shift Management', icon: Clock },
  { path: '/messaging', label: 'Messaging', icon: MessageSquare },
  { path: '/taxi-video-monitoring', label: 'Taxi Video Monitoring', icon: Video },
  { path: '/taxi-alert-monitoring', label: 'Taxi Alert Monitoring', icon: AlarmClock },
  { path: '/ads-management', label: 'Ads Management', icon: Megaphone },
  { path: '/crm', label: 'CRM', icon: BookOpen },
  { path: '/pax-app-management', label: 'Pax App Management', icon: Smartphone },
  { path: '/fleet-management', label: 'Fleet Management', icon: Settings },
  { path: '/wasl-management', label: 'WASL Management', icon: ShieldCheck },
  { path: '/system-management', label: 'System Management', icon: LayoutGrid },
  {
    label: 'Reports',
    icon: FileText,
    children: [
      { path: '/reports/data-usage', label: 'Data Usage' },
      { path: '/reports/operations-trips', label: 'Operations & Trips' },
      {
        label: 'Tracking & Movement',
        children: [
          { path: '/reports/movement', label: 'Movement' },
          { path: '/reports/distance', label: 'Distance' },
          { path: '/reports/tracking', label: 'Tracking' },
          { path: '/reports/geofence', label: 'Geofence' },
        ],
      },
      { path: '/reports/drivers', label: 'Drivers' },
      { path: '/reports/fleet-vehicle', label: 'Fleet & Vehicle' },
      { path: '/reports/revenue-payments', label: 'Revenue & Payments' },
      { path: '/reports/system-communications', label: 'System & Communications' },
    ],
  },
  { path: '/logout', label: 'Logout', icon: LogOut },
];

