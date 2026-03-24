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
