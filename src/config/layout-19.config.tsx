import {
  AlertTriangle,
  Banknote,
  BriefcaseBusiness,
  Car,
  CircleGauge,
  ClipboardList,
  Cpu,
  Fuel,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Trophy,
  Truck,
  UserRound,
  Wrench,
} from 'lucide-react';
import type { MenuConfig } from '@/config/types';

export const MENU_SIDEBAR: MenuConfig = [
  {
    title: 'Dashboard',
    children: [
      { title: 'Overview', path: '/dashboard/overview', icon: CircleGauge },
      { title: 'Vehicles', path: '/dashboard/vehicles', icon: Car },
      { title: 'Drivers', path: '/dashboard/drivers', icon: UserRound },
      {
        title: 'Bookings',
        path: '/dashboard/bookings',
        icon: BriefcaseBusiness,
      },
      { title: 'Revenue', path: '/dashboard/revenue', icon: Banknote },
      { title: 'Maintenance', path: '/dashboard/maintenance', icon: Wrench },
      { title: 'Safety', path: '/dashboard/safety', icon: ShieldCheck },
      { title: 'ELD/HOS', path: '/dashboard/eld-hos', icon: CircleGauge },
      { title: 'AI Alerts', path: '/bus-alert-monitoring/overview', icon: AlertTriangle },
      {
        title: 'Idling Reports',
        path: '/dashboard/idling-reports',
        icon: CircleGauge,
      },
      {
        title: 'Fuel Management',
        path: '/dashboard/fuel-management',
        icon: Fuel,
      },
      { title: 'OBD-II/DTC', path: '/dashboard/obd-dtc', icon: Cpu },
    ],
  },
  {
    title: 'Fleet Planning',
    children: [{ title: 'Fleet Planning', path: '/fleet-planning', icon: Truck }],
  },
  {
    title: 'Vehicle Checks',
    children: [{ title: 'Vehicle Checks', path: '/vehicle-checks', icon: ClipboardList }],
  },
  {
    title: 'Vehicle Defects',
    children: [{ title: 'Vehicle Defects', path: '/vehicle-defects', icon: AlertTriangle }],
  },
  {
    title: 'Reported Incidents',
    children: [{ title: 'Reported Incidents', path: '/reported-incidents', icon: ShieldAlert }],
  },
  {
    title: 'Vehicle Profiles',
    children: [{ title: 'Vehicle Profiles', path: '/vehicle-profiles', icon: UserRound }],
  },
  {
    title: 'Vehicle Search',
    children: [{ title: 'Vehicle Search', path: '/vehicle-search', icon: Search }],
  },
  {
    title: 'Asset Checks',
    children: [{ title: 'Asset Checks', path: '/asset-checks', icon: ShieldCheck }],
  },
  {
    title: 'Asset Defects',
    children: [{ title: 'Asset Defects', path: '/asset-defects', icon: AlertTriangle }],
  },
  {
    title: 'Asset Profiles',
    children: [{ title: 'Asset Profiles', path: '/asset-profiles', icon: BriefcaseBusiness }],
  },
  {
    title: 'Asset Search',
    children: [{ title: 'Asset Search', path: '/asset-search', icon: Search }],
  },
  {
    title: 'Workshops',
    children: [{ title: 'Workshops', path: '/workshops', icon: Wrench }],
  },
  {
    title: 'Earned Recognition',
    children: [{ title: 'Earned Recognition', path: '/earned-recognition', icon: Trophy }],
  },
  {
    title: 'Manager Cockpit',
    children: [{ title: 'Manager Cockpit', path: '/manager-cockpit' }],
  },
  {
    title: 'Bus Tracking',
    children: [
      { title: 'Live Bus Tracking', path: '/bus-tracking/live' },
      { title: 'History Bus Tracking', path: '/bus-tracking/history' },
    ],
  },
  {
    title: 'Bus & Driver List',
    children: [{ title: 'Overview', path: '/bus-driver-list' }],
  },
  {
    title: 'Bus Route Planning',
    children: [{ title: 'Overview', path: '/bus-route-planning' }],
  },
  {
    title: 'Bus Video Monitoring',
    children: [
      { title: 'Live DVR Monitoring', path: '/bus-video-monitoring/live-dvr' },
      { title: 'History DVR Monitoring', path: '/bus-video-monitoring/history-dvr' },
    ],
  },
  {
    title: 'Bus Alert Monitoring',
    children: [
      { title: 'Overview', path: '/bus-alert-monitoring/overview' },
      { title: 'List', path: '/bus-alert-monitoring/list' },
      { title: 'History List', path: '/bus-alert-monitoring/history-list' },
    ],
  },
  {
    title: 'Taxi Tracking',
    children: [
      { title: 'Live', path: '/taxi-tracking/live' },
      { title: 'History', path: '/taxi-tracking/history' },
    ],
  },
  {
    title: 'Job Dispatching',
    children: [
      { title: 'Job List', path: '/job-dispatching/job-list' },
      { title: 'Create Job', path: '/job-dispatching/create-job' },
    ],
  },
  {
    title: 'Shift Management',
    children: [
      { title: 'All Shifts', path: '/shift-management/all-shifts' },
      { title: 'Create Shift', path: '/shift-management/create-shift' },
    ],
  },
  {
    title: 'Messaging',
    children: [
      { title: 'Chat Interface', path: '/messaging/chat' },
      { title: 'Single Message', path: '/messaging/single-message' },
      { title: 'Message Groups List', path: '/messaging/message-groups' },
      { title: 'Broadcasts', path: '/messaging/broadcasts' },
    ],
  },
  {
    title: 'Taxi Video Monitoring',
    children: [
      { title: 'Live DVR', path: '/taxi-video-monitoring/live-dvr' },
      { title: 'History DVR', path: '/taxi-video-monitoring/history-dvr' },
    ],
  },
  {
    title: 'Taxi Alert Monitoring',
    children: [
      { title: 'Overview', path: '/taxi-alert-monitoring/overview' },
      { title: 'List', path: '/taxi-alert-monitoring/list' },
      { title: 'History List', path: '/taxi-alert-monitoring/history-list' },
    ],
  },
  {
    title: 'Ads Management',
    children: [
      { title: 'Advertisements', path: '/ads-management/advertisements' },
      { title: 'Special Offers', path: '/ads-management/special-offers' },
      { title: 'News', path: '/ads-management/news' },
      { title: 'Language', path: '/ads-management/language' },
    ],
  },
  {
    title: 'CRM',
    children: [
      { title: 'Passenger App Management', path: '/crm/passenger-app' },
      { title: 'Passenger Management', path: '/crm/passenger-management' },
      { title: 'Ride Types', path: '/crm/ride-types' },
      { title: 'Coupons', path: '/crm/coupons' },
      { title: 'Chauffeur Rates', path: '/crm/chauffeur-rates' },
      { title: 'Passenger Chat', path: '/crm/passenger-chat' },
      { title: 'Support Tickets', path: '/crm/support-tickets' },
      { title: 'Lost & Found', path: '/crm/lost-found' },
      { title: 'Special Offers', path: '/crm/special-offers' },
      { title: 'Spending Reports', path: '/crm/spending-reports' },
    ],
  },
  {
    title: 'Fleet Management',
    children: [
      { title: 'Bus Management', path: '/fleet-management/bus' },
      { title: 'Bus Drivers', path: '/fleet-management/bus-drivers' },
      { title: 'Taxi Management', path: '/fleet-management/taxi' },
      { title: 'Taxi Drivers', path: '/fleet-management/taxi-drivers' },
      { title: 'Inventory Parts', path: '/fleet-management/inventory-parts' },
      { title: 'Suppliers', path: '/fleet-management/suppliers' },
      {
        title: 'Vehicle Manufacturers',
        path: '/fleet-management/vehicle-manufacturers',
      },
      {
        title: 'Vehicle Inspections',
        path: '/fleet-management/vehicle-inspections',
      },
      {
        title: 'Maintenance Records',
        path: '/fleet-management/maintenance-records',
      },
      {
        title: 'Maintenance Types',
        path: '/fleet-management/maintenance-types',
      },
      { title: 'Geofence Zones', path: '/fleet-management/geofence-zones' },
    ],
  },
  {
    title: 'WASL Management',
    children: [
      { title: 'Device', path: '/wasl-management/device' },
      { title: 'Company', path: '/wasl-management/company' },
      { title: 'Bus', path: '/wasl-management/bus' },
      { title: 'Taxi', path: '/wasl-management/taxi' },
      { title: 'Bus Drivers', path: '/wasl-management/bus-drivers' },
      { title: 'Taxi Drivers', path: '/wasl-management/taxi-drivers' },
      { title: 'Tariff Structure', path: '/wasl-management/tariff-structure' },
      { title: 'Taxi Trips', path: '/wasl-management/taxi-trips' },
      { title: 'Bus Tracking', path: '/wasl-management/bus-tracking' },
      { title: 'Taxi Tracking', path: '/wasl-management/taxi-tracking' },
      { title: 'App Version Monitoring', path: '/wasl-management/app-version' },
      { title: 'Geofence Zones', path: '/wasl-management/geofence-zones' },
      { title: 'Maintenance', path: '/wasl-management/maintenance' },
      {
        title: 'Maintenance Types',
        path: '/wasl-management/maintenance-types',
      },
      {
        title: 'Vehicle Inspections',
        path: '/wasl-management/vehicle-inspections',
      },
      { title: 'Suppliers', path: '/wasl-management/suppliers' },
      {
        title: 'Vehicle Manufacturers',
        path: '/wasl-management/vehicle-manufacturers',
      },
    ],
  },
  {
    title: 'System Management',
    children: [
      { title: 'Company', path: '/system-management/company' },
      { title: 'Roles and Permission', path: '/system-management/roles' },
      { title: 'User Management', path: '/system-management/user' },
      { title: 'App Management', path: '/system-management/app' },
      { title: 'Ads Management', path: '/system-management/ads' },
      { title: 'Tariff Update', path: '/system-management/tariff-update' },
      { title: 'Group Location', path: '/system-management/group-location' },
      { title: 'Holiday Management', path: '/system-management/holiday' },
      { title: 'Ride Type Management', path: '/system-management/ride-type' },
      { title: 'MDM', path: '/system-management/mdm' },
      { title: 'Settings', path: '/system-management/settings' },
    ],
  },
  {
    title: 'Reports',
    children: [
      { title: 'Reports', path: '/reports/overview' },
      { title: 'Data Usage — Taxi', path: '/reports/data-usage/taxi' },
      { title: 'Data Usage — Bus', path: '/reports/data-usage/bus' },
      { title: 'Job/Booking', path: '/reports/operations-trips/job-booking' },
      { title: 'Taxi Trip', path: '/reports/operations-trips/taxi-trip' },
      { title: 'Trip Activity', path: '/reports/operations-trips/trip-activity' },
      { title: 'Trip Classification', path: '/reports/operations-trips/trip-classification' },
      { title: 'Shift', path: '/reports/operations-trips/shift' },
      { title: 'Movement', path: '/reports/tracking-movement/movement' },
      { title: 'Distance', path: '/reports/tracking-movement/distance' },
      { title: 'Tracking', path: '/reports/tracking-movement/tracking' },
      { title: 'Geofence', path: '/reports/tracking-movement/geofence' },
      { title: 'Taxi Driver', path: '/reports/drivers/taxi' },
      { title: 'Driver', path: '/reports/drivers/driver' },
      { title: 'Driver Scorecards', path: '/reports/drivers/scorecards' },
      { title: 'Driver Behaviour', path: '/reports/drivers/behaviour' },
      { title: 'Alerts', path: '/reports/fleet-vehicle/alerts' },
      { title: 'Fuel', path: '/reports/fleet-vehicle/fuel' },
      { title: 'OBD', path: '/reports/fleet-vehicle/obd' },
      { title: 'Maintenance', path: '/reports/fleet-vehicle/maintenance' },
      { title: 'Parts / Inventory', path: '/reports/fleet-vehicle/parts' },
      { title: 'Vehicle Inspections', path: '/reports/fleet-vehicle/inspections' },
      { title: 'Taxi Revenue', path: '/reports/revenue-payments/taxi-revenue' },
      { title: 'Revenue Dashboard', path: '/reports/revenue-payments/dashboard' },
      { title: 'Advanced Analytics', path: '/reports/revenue-payments/analytics' },
      { title: 'Expense', path: '/reports/revenue-payments/expense' },
      { title: 'Billing', path: '/reports/revenue-payments/billing' },
      { title: 'Wallet Transactions', path: '/reports/revenue-payments/wallet' },
      { title: 'Payment Disputes', path: '/reports/revenue-payments/disputes' },
      { title: 'Fare Adjustments', path: '/reports/revenue-payments/fare-adjustments' },
      { title: 'App Version', path: '/reports/system-communications/app-version' },
      { title: 'Logs', path: '/reports/system-communications/logs' },
      { title: 'VoIP Calls', path: '/reports/system-communications/voip' },
    ],
  },
  {
    title: 'Settings',
    children: [{ title: 'Settings', path: '/settings', icon: Settings }],
  },
  {
    title: 'Logout',
    children: [{ title: 'Sign Out', path: '/logout' }],
  },
];

export const MENU_HEADER: MenuConfig = [];


