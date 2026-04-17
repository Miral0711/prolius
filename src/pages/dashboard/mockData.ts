/**
 * Centralized mock data for the fleet dashboard.
 * Replace with API calls when backend is ready.
 */

import type { ActivityItem } from '@/components/dashboard/ActivityFeed';
import type { TransactionItem } from '@/components/dashboard/TransactionsCard';

export const KPI_ITEMS = [
  {
    title: 'Total Fleet',
    value: '427',
    subValue: '96 in active',
    accent: 'blue' as const,
  },
  {
    title: 'On Trip',
    value: '98',
    subValue: '92 active',
    accent: 'violet' as const,
  },
  {
    title: 'Available',
    value: '329',
    subValue: '329 active',
    accent: 'emerald' as const,
  },
  {
    title: 'Offline',
    value: '0',
    subValue: '0 inactive',
    accent: 'slate' as const,
  },
  {
    title: "Today's Revenue",
    value: 'SAR 35',
    subValue: 'MTD SAR 62',
    accent: 'emerald' as const,
  },
  {
    title: 'Trips Today',
    value: '3',
    subValue: '427 selected',
    accent: 'blue' as const,
  },
  {
    title: 'Utilization',
    value: '23%',
    subValue: 'Avg fleet use',
    accent: 'violet' as const,
  },
  {
    title: 'Avg KMP',
    value: 'SAR 12',
    subValue: 'Per trip today',
    accent: 'cyan' as const,
  },
  {
    title: 'Alerts',
    value: '17',
    subValue: 'Active now',
    accent: 'amber' as const,
  },
  {
    title: 'Drivers Status',
    value: '24%',
    subValue: 'In Trip Drivers',
    accent: 'amber' as const,
  },
  {
    title: 'Safety',
    value: '17',
    subValue: 'All alerts',
    accent: 'cyan' as const,
  },
];

export const RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    actor: 'Ahmed M.',
    action: 'Completed trip Riyadh → Jeddah',
    time: '15 min ago',
  },
  {
    id: '2',
    actor: 'Sarah L.',
    action: 'Started trip to Dammam',
    time: '32 min ago',
  },
  {
    id: '3',
    actor: 'Omar K.',
    action: 'Vehicle TR-8412 arrived at depot',
    time: '1 hr ago',
  },
  {
    id: '4',
    actor: 'Fatima A.',
    action: 'Completed maintenance check',
    time: '2 hr ago',
  },
];

export const RECENT_TRANSACTIONS: TransactionItem[] = [
  { id: 'TR-7702244', amount: 'SAR 3,036' },
  { id: 'TR-7703411', amount: 'SAR 2,025' },
  { id: 'TR-7702231', amount: 'SAR 2,025' },
  { id: 'TR-7707444', amount: 'SAR 3,411' },
];

export const DRIVERS_ON_TRIP_DATA = [
  { day: 'Mon', drivers: 85 },
  { day: 'Tue', drivers: 92 },
  { day: 'Wed', drivers: 88 },
  { day: 'Thu', drivers: 95 },
  { day: 'Fri', drivers: 98 },
  { day: 'Sat', drivers: 72 },
  { day: 'Sun', drivers: 65 },
];

export const TOP_DRIVERS = [
  {
    rank: 1,
    name: 'Ahmed M.',
    trips: 142,
    revenue: 'SAR 18,450',
    avgDuration: '42 min',
    distance: '2,340 km',
    efficiency: '96%',
    rating: 4.8,
    onTime: '98%',
  },
  {
    rank: 2,
    name: 'Sarah L.',
    trips: 128,
    revenue: 'SAR 15,220',
    avgDuration: '38 min',
    distance: '2,100 km',
    efficiency: '94%',
    rating: 4.9,
    onTime: '95%',
  },
  {
    rank: 3,
    name: 'Omar K.',
    trips: 115,
    revenue: 'SAR 14,100',
    avgDuration: '45 min',
    distance: '1,980 km',
    efficiency: '92%',
    rating: 4.7,
    onTime: '92%',
  },
  {
    rank: 4,
    name: 'Fatima A.',
    trips: 108,
    revenue: 'SAR 12,890',
    avgDuration: '40 min',
    distance: '1,850 km',
    efficiency: '95%',
    rating: 4.6,
    onTime: '96%',
  },
  {
    rank: 5,
    name: 'Khalid R.',
    trips: 98,
    revenue: 'SAR 11,200',
    avgDuration: '48 min',
    distance: '1,720 km',
    efficiency: '90%',
    rating: 4.5,
    onTime: '90%',
  },
  {
    rank: 6,
    name: 'Rami F.',
    trips: 92,
    revenue: 'SAR 10,500',
    avgDuration: '52 min',
    distance: '1,650 km',
    efficiency: '88%',
    rating: 4.4,
    onTime: '93%',
  },
  {
    rank: 7,
    name: 'Leila S.',
    trips: 88,
    revenue: 'SAR 9,800',
    avgDuration: '55 min',
    distance: '1,500 km',
    efficiency: '87%',
    rating: 4.3,
    onTime: '91%',
  },
  {
    rank: 8,
    name: 'Kevin D.',
    trips: 85,
    revenue: 'SAR 9,200',
    avgDuration: '58 min',
    distance: '1,450 km',
    efficiency: '91%',
    rating: 4.8,
    onTime: '94%',
  },
  {
    rank: 9,
    name: 'Marcus W.',
    trips: 82,
    revenue: 'SAR 8,900',
    avgDuration: '62 min',
    distance: '1,400 km',
    efficiency: '89%',
    rating: 4.5,
    onTime: '92%',
  },
  {
    rank: 10,
    name: 'John D.',
    trips: 78,
    revenue: 'SAR 8,500',
    avgDuration: '65 min',
    distance: '1,350 km',
    efficiency: '86%',
    rating: 4.2,
    onTime: '88%',
  },
];

export const RECENT_TRIPS = [
  { 
    id: 'TR-7702244', 
    vehicle: 'TR-8412',  
    driver: 'Ahmed M.',  
    route: 'Riyadh → Jeddah',  
    revenue: 'SAR 3,036', 
    status: 'Completed',
    duration: '14h 20m',
    fuel: '112 L',
    distance: '950 km'
  },
  { 
    id: 'TR-7703411', 
    vehicle: 'SXA0388',  
    driver: 'Sarah L.',  
    route: 'Dammam → Khobar',  
    revenue: 'SAR 2,025', 
    status: 'In Progress',
    duration: '2h 15m',
    fuel: '18 L',
    distance: '120 km'
  },
  { 
    id: 'TR-7702231', 
    vehicle: 'SSA0037',  
    driver: 'Omar K.',   
    route: 'Jeddah → Mecca',   
    revenue: 'SAR 2,025', 
    status: 'Completed',
    duration: '1h 45m',
    fuel: '12 L',
    distance: '85 km'
  },
  { 
    id: 'TR-7707444', 
    vehicle: '85A1167',  
    driver: 'Fatima A.', 
    route: 'Riyadh → Qassim',  
    revenue: 'SAR 3,411', 
    status: 'Completed',
    duration: '4h 30m',
    fuel: '35 L',
    distance: '380 km'
  },
  { 
    id: 'TR-7707445', 
    vehicle: 'VH-201',   
    driver: 'Khalid R.', 
    route: 'Medina → Yanbu',   
    revenue: 'SAR 1,840', 
    status: 'In Progress',
    duration: '3h 10m',
    fuel: '24 L',
    distance: '240 km'
  },
  { 
    id: 'TR-7708100', 
    vehicle: 'TR-777',   
    driver: 'Rami F.',   
    route: 'Jeddah → Taif',    
    revenue: 'SAR 2,210', 
    status: 'Scheduled',
    duration: '2h 50m',
    fuel: '20 L',
    distance: '180 km'
  },
];

// ─── DashboardPage inline data ───────────────────────────────────────────────

import {
  Activity,
  AlertTriangle,
  Fuel,
  Gauge,
  Navigation,
  ShieldCheck,
  PenTool as Tool,
  Truck,
  Users,
  PlayCircle,
  CheckCircle2,
  UserCheck,
  Wrench,
  AlertCircle,
} from 'lucide-react';

export const SPARKLINES: Record<string, number[]> = {
  'Total Vehicles': [510, 511, 509, 512, 512, 511, 512],
  'Active Drivers': [118, 122, 119, 125, 121, 124, 126],
  'Vehicles On Trip': [295, 308, 311, 302, 315, 309, 311],
  'Alerts Count': [22, 19, 24, 20, 18, 21, 17],
  'Fuel Efficiency': [8.1, 8.3, 8.0, 8.4, 8.2, 8.5, 8.6],
  'Utilization %': [68, 70, 71, 69, 72, 71, 72],
  'Fleet Availability': [90, 91, 90, 92, 91, 91, 91.4],
  'Vehicles Off Road': [48, 46, 45, 44, 44, 43, 44],
  'Under Maintenance': [41, 40, 39, 38, 39, 39, 39],
  'Avg Distance / Day': [178, 181, 183, 180, 185, 182, 184],
};

export const KPI_DATA = [
  { label: 'Total Vehicles', value: '512', trend: '+2', trendUp: true, tooltip: 'Total registered fleet vehicles', group: 'Operations', icon: Truck, variant: 'blue' },
  { label: 'Active Drivers', value: '126', trend: '+4', trendUp: true, tooltip: 'Drivers currently on duty', group: 'Operations', icon: Users, variant: 'blue' },
  { label: 'Vehicles On Trip', value: '311', trend: '+9', trendUp: true, tooltip: 'Vehicles actively on a trip right now', group: 'Operations', icon: Navigation, variant: 'blue' },
  { label: 'Alerts Count', value: '17', trend: '-4', trendUp: false, tooltip: 'Active alerts — click to view', group: 'Risk', icon: AlertTriangle, variant: 'red', link: '/tracking/alerts' },
  { label: 'Fleet Availability', value: '91.4%', trend: '+0.4%', trendUp: true, tooltip: 'Percentage of fleet available for dispatch', group: 'Performance', icon: ShieldCheck, variant: 'green' },
  { label: 'Utilization %', value: '72%', trend: '+3%', trendUp: true, tooltip: 'Fleet utilization rate today', group: 'Performance', icon: Gauge, variant: 'green' },
  { label: 'Fuel Efficiency', value: '8.6 km/L', trend: '+0.4', trendUp: true, tooltip: 'Average fuel efficiency across fleet today', group: 'Efficiency', icon: Fuel, variant: 'green' },
  { label: 'Vehicles Off Road', value: '44', trend: '-2', trendUp: false, tooltip: 'Vehicles currently off road', group: 'Risk', icon: AlertTriangle, variant: 'orange' },
  { label: 'Under Maintenance', value: '39', trend: '-1', trendUp: false, tooltip: 'Vehicles in maintenance bays', group: 'Risk', icon: Tool, variant: 'orange' },
  { label: 'Avg Distance / Day', value: '184 km', trend: '+6', trendUp: true, tooltip: 'Average distance per vehicle per day', group: 'Efficiency', icon: Activity, variant: 'secondaryBlue' },
];

export const VOR_DATA = [
  { label: 'Engine', category: 12, manufacturer: 9 },
  { label: 'Tyre', category: 7, manufacturer: 5 },
  { label: 'Electrical', category: 9, manufacturer: 8 },
  { label: 'Body', category: 5, manufacturer: 6 },
  { label: 'Brake', category: 11, manufacturer: 7 },
];

export const ANALYTICS_TREND = [
  { m: 'Jan', efficiency: 74, utilization: 68 },
  { m: 'Feb', efficiency: 76, utilization: 71 },
  { m: 'Mar', efficiency: 72, utilization: 69 },
  { m: 'Apr', efficiency: 78, utilization: 73 },
  { m: 'May', efficiency: 80, utilization: 75 },
  { m: 'Jun', efficiency: 75, utilization: 72 },
  { m: 'Jul', efficiency: 79, utilization: 74 },
  { m: 'Aug', efficiency: 82, utilization: 77 },
  { m: 'Sep', efficiency: 78, utilization: 73 },
  { m: 'Oct', efficiency: 84, utilization: 79 },
  { m: 'Nov', efficiency: 81, utilization: 76 },
  { m: 'Dec', efficiency: 86, utilization: 81 },
];

export const HISTORICAL_SAFETY_DATA = [
  { m: 'Jan', low: 35, med: 25, high: 15, trend: 55 },
  { m: 'Feb', low: 40, med: 28, high: 18, trend: 62 },
  { m: 'Mar', low: 38, med: 30, high: 20, trend: 58 },
  { m: 'Apr', low: 45, med: 25, high: 22, trend: 65 },
  { m: 'May', low: 42, med: 22, high: 15, trend: 60 },
  { m: 'Jun', low: 48, med: 32, high: 25, trend: 70 },
  { m: 'Jul', low: 35, med: 28, high: 18, trend: 52 },
  { m: 'Aug', low: 40, med: 35, high: 20, trend: 64 },
  { m: 'Sep', low: 38, med: 25, high: 15, trend: 56 },
  { m: 'Oct', low: 45, med: 38, high: 28, trend: 75 },
  { m: 'Nov', low: 42, med: 22, high: 18, trend: 58 },
  { m: 'Dec', low: 40, med: 28, high: 22, trend: 62 },
];

export const PERFORMANCE_EFFICIENCY_DATA = [
  { m: 'Jan', fuel: 20, eff: 40 },
  { m: 'Feb', fuel: 65, eff: 35 },
  { m: 'Mar', fuel: 45, eff: 50 },
  { m: 'Apr', fuel: 70, eff: 65 },
  { m: 'May', fuel: 68, eff: 80 },
  { m: 'Jun', fuel: 62, eff: 55 },
  { m: 'Jul', fuel: 72, eff: 85 },
  { m: 'Aug', fuel: 68, eff: 90 },
  { m: 'Sep', fuel: 70, eff: 88 },
  { m: 'Oct', fuel: 95, eff: 75 },
  { m: 'Nov', fuel: 92, eff: 85 },
  { m: 'Dec', fuel: 75, eff: 110 },
];

export const VIOLATIONS_DATA = [
  { m: 'Jan', tr105: 45, vm002: 25, vh122: 15 },
  { m: 'Feb', tr105: 58, vm002: 30, vh122: 20 },
  { m: 'Mar', tr105: 52, vm002: 22, vh122: 18 },
  { m: 'Apr', tr105: 60, vm002: 35, vh122: 25 },
  { m: 'May', tr105: 62, vm002: 28, vh122: 22 },
  { m: 'Jun', tr105: 55, vm002: 25, vh122: 18 },
  { m: 'Jul', tr105: 68, vm002: 38, vh122: 20 },
  { m: 'Aug', tr105: 65, vm002: 32, vh122: 25 },
  { m: 'Sep', tr105: 63, vm002: 30, vh122: 22 },
  { m: 'Oct', tr105: 72, vm002: 35, vh122: 28 },
  { m: 'Nov', tr105: 65, vm002: 28, vh122: 24 },
  { m: 'Dec', tr105: 68, vm002: 32, vh122: 26 },
];

export const DASHBOARD_DRIVERS = [
  { rank: 1, name: 'Jocel Rett', score: 100, rating: 4.8, perf: 92, trend: 'up' },
  { rank: 2, name: 'Dave Witaen', score: 180, rating: 4.7, perf: 87, trend: 'up' },
  { rank: 3, name: 'Misa Smith', score: 160, rating: 4.5, perf: 82, trend: 'up' },
  { rank: 4, name: 'Frlano Haun', score: 130, rating: 4.2, perf: 76, trend: 'down' },
];

export const DASHBOARD_TRIPS = [
  { id: 'TR-105', route: 'North Depot - CBD', dur: '02:37', status: 'Completed', type: 'Delivery' },
  { id: 'VH-089', route: 'West Hub - Airport', dur: '01:57', status: 'In Progress', type: 'Passenger' },
  { id: 'VH-088', route: 'South Yard - Port', dur: '03:10', status: 'Completed', type: 'Logistics' },
  { id: 'TR-201', route: 'East Gate - Mall', dur: '00:48', status: 'Delayed', type: 'Passenger' },
  { id: 'VH-312', route: 'Central Hub - Port', dur: '04:15', status: 'In Progress', type: 'Logistics' },
];

export const SPEED_VIOLATIONS_DATA = [
  { day: 'Mon', daily: 18, weekly: 112 },
  { day: 'Tue', daily: 24, weekly: 118 },
  { day: 'Wed', daily: 21, weekly: 124 },
  { day: 'Thu', daily: 29, weekly: 131 },
  { day: 'Fri', daily: 35, weekly: 142 },
  { day: 'Sat', daily: 14, weekly: 98 },
  { day: 'Sun', daily: 9, weekly: 87 },
];

export const ALERTS_DONUT = [
  { name: 'Speeding', value: 38, color: '#DC2626' },
  { name: 'Harsh Braking', value: 27, color: '#e8622a' },
  { name: 'Geofence', value: 19, color: '#3d6b8e' },
  { name: 'Idle Violations', value: 16, color: '#5a8aad' },
];

export const LIVE_ACTIVITY_FEED = [
  { icon: PlayCircle, label: 'Trip started', detail: 'VH-312 → Central Hub', time: '2m ago', color: '#3d6b8e' },
  { icon: AlertCircle, label: 'Alert triggered', detail: 'VH-201 speeding 92km/h', time: '5m ago', color: '#DC2626' },
  { icon: Wrench, label: 'Maintenance event', detail: 'WO-493 opened for VH-088', time: '11m ago', color: '#e8622a' },
  { icon: UserCheck, label: 'Driver assigned', detail: 'Ahmed M. → TR-106', time: '18m ago', color: '#22C55E' },
  { icon: PlayCircle, label: 'Trip started', detail: 'SSA-0037 → Airport', time: '22m ago', color: '#3d6b8e' },
  { icon: CheckCircle2, label: 'Trip completed', detail: 'TR-105 North Depot - CBD', time: '31m ago', color: '#22C55E' },
];

export const TRIP_STATUS_DATA = [
  { label: 'Completed', value: 98, color: '#22C55E', bg: 'bg-[#EAF9F0]', border: 'border-[#22C55E]/20', text: 'text-[#22C55E]' },
  { label: 'In Progress', value: 44, color: '#3d6b8e', bg: 'bg-[#eef4f8]', border: 'border-[#3d6b8e]/20', text: 'text-[#3d6b8e]' },
  { label: 'Delayed', value: 7, color: '#DC2626', bg: 'bg-[#FEECEC]', border: 'border-[#DC2626]/20', text: 'text-[#DC2626]' },
];

export const MAP_VEHICLES = [
  { id: 'SXA-0388', left: '19%', top: '64%', status: 'available' as const, speed: '0 km/h', driver: 'Ahmed M.' },
  { id: 'SSA-0037', left: '32%', top: '48%', status: 'on-trip' as const, speed: '62 km/h', driver: 'Sarah L.' },
  { id: '85A-1167', left: '46%', top: '58%', status: 'maintenance' as const, speed: '0 km/h', driver: 'N/A' },
  { id: '115A-1167', left: '58%', top: '43%', status: 'alert' as const, speed: '0 km/h', driver: 'Omar K.' },
  { id: 'VH-201', left: '72%', top: '55%', status: 'on-trip' as const, speed: '48 km/h', driver: 'Fatima A.' },
  { id: 'VH-088', left: '66%', top: '70%', status: 'available' as const, speed: '0 km/h', driver: 'Khalid R.' },
];
