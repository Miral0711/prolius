import {
  AlertTriangle,
  BarChart3,
  Bell,
  Boxes,
  BriefcaseBusiness,
  ClipboardCheck,
  ClipboardList,
  History,
  LayoutDashboard,
  Lock,
  MapPin,
  MessageSquare,
  Settings,
  ShieldAlert,
  ShieldCheck,
  ShoppingCart,
  Trophy,
  Truck,
  UserRound,
  Users,
  Wrench,
} from 'lucide-react';
import type { MenuConfig } from '@/config/types';

export const MENU_SIDEBAR: MenuConfig = [
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
    title: 'Tracking & Monitoring',
    icon: MapPin,
    children: [
      { title: 'Live Tracking', path: '/tracking/live', icon: MapPin },
      { title: 'History Tracking', path: '/tracking/history', icon: History },
      { title: 'Alerts', path: '/tracking/alerts', icon: Bell },
      { title: 'Incidents', path: '/tracking/incidents', icon: ShieldAlert },
    ],
  },
  {
    title: 'Vehicle Management',
    icon: Truck,
    children: [
      { title: 'Vehicle Profiles', path: '/vehicle-management/profiles', icon: UserRound },
      { title: 'Vehicle Checks', path: '/vehicle-management/checks', icon: ClipboardList },
      { title: 'Vehicle Defects', path: '/vehicle-management/defects', icon: AlertTriangle },
      { title: 'Inspections', path: '/vehicle-management/inspections', icon: ClipboardCheck },
      { title: 'Maintenance Records', path: '/vehicle-management/maintenance', icon: Wrench },
    ],
  },
  {
    title: 'Asset Management',
    icon: BriefcaseBusiness,
    children: [
      { title: 'Asset Profiles', path: '/asset-management/profiles', icon: BriefcaseBusiness },
      { title: 'Asset Checks', path: '/asset-management/checks', icon: ShieldCheck },
      { title: 'Asset Defects', path: '/asset-management/defects', icon: AlertTriangle },
      { title: 'Inventory', path: '/asset-management/inventory', icon: Boxes },
      { title: 'Suppliers', path: '/asset-management/suppliers', icon: ShoppingCart },
    ],
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
    title: 'User & System Management',
    icon: Users,
    children: [
      { title: 'Users', path: '/system-management/users', icon: Users },
      { title: 'Roles & Permissions', path: '/system-management/roles', icon: Lock },
      { title: 'Settings', path: '/system-management/settings', icon: Settings },
    ],
  },
];

export const MENU_HEADER: MenuConfig = [];
