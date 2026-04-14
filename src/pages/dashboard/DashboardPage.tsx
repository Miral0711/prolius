import { useState, type ReactNode } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Fuel,
  Gauge,
  MapPinned,
  Navigation,
  ShieldCheck,
  Star,
  PenTool as Tool,
  Truck,
  Users,
  Wrench,
  Route,
  Timer,
  TrendingUp,
  TrendingDown,
  CalendarClock,
  Zap,
  MapPin,
  CheckCircle2,
  Clock,
  AlertCircle,
  Lightbulb,
  ChevronRight,
  PlayCircle,
  UserCheck,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';
import {
  dashboardTableHeaderCellClass,
  dashboardTableHeaderRowClass,
} from '@/components/dashboard/GridTable';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const TOKENS = {
  pageBg: 'bg-[#f0f4f8]',
  sectionBg: 'bg-transparent',
  cardBg: 'bg-white',
  cardRadius: 'rounded-[8px]',
  cardShadow: 'shadow-[0_1px_8px_rgba(61,107,142,0.07)]',
  strongShadow: 'shadow-[0_2px_12px_rgba(61,107,142,0.10)]',
  cardBorder: 'border border-[#e8eef4]',
  titleColor: 'text-[#1e3448]',
  valueColor: 'text-[#1e3448]',
  labelColor: 'text-[#4f6478]',
  subLabelColor: 'text-[#6b8299]',
};

const SEMANTIC_COLORS = {
  blue: {
    main: '#3d6b8e',
    soft: 'bg-[#eef4f8]',
    border: 'border-[#3d6b8e]/15',
    accent: 'text-[#3d6b8e]',
    iconBg: 'bg-[#dce8f0]',
  },
  green: {
    main: '#22C55E',
    soft: 'bg-[#22C55E]/05',
    border: 'border-[#22C55E]/10',
    accent: 'text-[#22C55E]',
    iconBg: 'bg-[#22C55E]/10',
  },
  orange: {
    main: '#e8622a',
    soft: 'bg-[#fdeee6]',
    border: 'border-[#e8622a]/18',
    accent: 'text-[#e8622a]',
    iconBg: 'bg-[#fdeee6]',
  },
  secondaryBlue: {
    main: '#5a8aad',
    soft: 'bg-[#eef4f8]',
    border: 'border-[#5a8aad]/15',
    accent: 'text-[#5a8aad]',
    iconBg: 'bg-[#dce8f0]',
  },
  red: {
    main: '#DC2626',
    soft: 'bg-[#FEECEC]',
    border: 'border-[#DC2626]/18',
    accent: 'text-[#DC2626]',
    iconBg: 'bg-[#FEECEC]',
  },
};

// Sparkline data per KPI
const SPARKLINES: Record<string, number[]> = {
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

// Primary KPIs (index 0–5) shown large; Secondary KPIs (index 6–9) shown compact
const KPI_DATA = [
  // ── Primary ──
  {
    label: 'Total Vehicles',
    value: '512',
    trend: '+2',
    trendUp: true,
    tooltip: 'Total registered fleet vehicles',
    group: 'Operations',
    icon: Truck,
    variant: 'blue',
  },
  {
    label: 'Active Drivers',
    value: '126',
    trend: '+4',
    trendUp: true,
    tooltip: 'Drivers currently on duty',
    group: 'Operations',
    icon: Users,
    variant: 'blue',
  },
  {
    label: 'Vehicles On Trip',
    value: '311',
    trend: '+9',
    trendUp: true,
    tooltip: 'Vehicles actively on a trip right now',
    group: 'Operations',
    icon: Navigation,
    variant: 'blue',
  },
  {
    label: 'Alerts Count',
    value: '17',
    trend: '-4',
    trendUp: false,
    tooltip: 'Active alerts — click to view',
    group: 'Risk',
    icon: AlertTriangle,
    variant: 'red',
    link: '/tracking/alerts',
  },
  {
    label: 'Fleet Availability',
    value: '91.4%',
    trend: '+0.4%',
    trendUp: true,
    tooltip: 'Percentage of fleet available for dispatch',
    group: 'Performance',
    icon: ShieldCheck,
    variant: 'green',
  },
  {
    label: 'Utilization %',
    value: '72%',
    trend: '+3%',
    trendUp: true,
    tooltip: 'Fleet utilization rate today',
    group: 'Performance',
    icon: Gauge,
    variant: 'green',
  },
  // ── Secondary ──
  {
    label: 'Fuel Efficiency',
    value: '8.6 km/L',
    trend: '+0.4',
    trendUp: true,
    tooltip: 'Average fuel efficiency across fleet today',
    group: 'Efficiency',
    icon: Fuel,
    variant: 'green',
  },
  {
    label: 'Vehicles Off Road',
    value: '44',
    trend: '-2',
    trendUp: false,
    tooltip: 'Vehicles currently off road',
    group: 'Risk',
    icon: AlertTriangle,
    variant: 'orange',
  },
  {
    label: 'Under Maintenance',
    value: '39',
    trend: '-1',
    trendUp: false,
    tooltip: 'Vehicles in maintenance bays',
    group: 'Risk',
    icon: Tool,
    variant: 'orange',
  },
  {
    label: 'Avg Distance / Day',
    value: '184 km',
    trend: '+6',
    trendUp: true,
    tooltip: 'Average distance per vehicle per day',
    group: 'Efficiency',
    icon: Activity,
    variant: 'secondaryBlue',
  },
];

const VOR_DATA = [
  { label: 'Engine', category: 12, manufacturer: 9 },
  { label: 'Tyre', category: 7, manufacturer: 5 },
  { label: 'Electrical', category: 9, manufacturer: 8 },
  { label: 'Body', category: 5, manufacturer: 6 },
  { label: 'Brake', category: 11, manufacturer: 7 },
];

const ANALYTICS_TREND = [
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

const HISTORICAL_SAFETY_DATA = [
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

const PERFORMANCE_EFFICIENCY_DATA = [
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

const VIOLATIONS_DATA = [
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

const DRIVERS = [
  { rank: 1, name: 'Jocel Rett', score: 100, rating: 4.8, perf: 92, trend: 'up' },
  { rank: 2, name: 'Dave Witaen', score: 180, rating: 4.7, perf: 87, trend: 'up' },
  { rank: 3, name: 'Misa Smith', score: 160, rating: 4.5, perf: 82, trend: 'up' },
  { rank: 4, name: 'Frlano Haun', score: 130, rating: 4.2, perf: 76, trend: 'down' },
];

const TRIPS = [
  { id: 'TR-105', route: 'North Depot - CBD', dur: '02:37', status: 'Completed', type: 'Delivery' },
  { id: 'VH-089', route: 'West Hub - Airport', dur: '01:57', status: 'In Progress', type: 'Passenger' },
  { id: 'VH-088', route: 'South Yard - Port', dur: '03:10', status: 'Completed', type: 'Logistics' },
  { id: 'TR-201', route: 'East Gate - Mall', dur: '00:48', status: 'Delayed', type: 'Passenger' },
  { id: 'VH-312', route: 'Central Hub - Port', dur: '04:15', status: 'In Progress', type: 'Logistics' },
];

const ACTIVITY = [
  { title: 'Defect reported', desc: 'VH-201 brake pressure warning', time: '09:28', type: 'alert' as const },
  { title: 'Inspection completed', desc: '34 vehicles passed morning check', time: '08:46', type: 'maintenance' as const },
  { title: 'Work order created', desc: 'WO-492 tyre replacement batch', time: '07:52', type: 'maintenance' as const },
  { title: 'Vehicle recovered', desc: 'VH-111 moved from VOR to active', time: '07:20', type: 'trip' as const },
];

// ── Part 2 data ──

const SPEED_VIOLATIONS_DATA = [
  { day: 'Mon', daily: 18, weekly: 112 },
  { day: 'Tue', daily: 24, weekly: 118 },
  { day: 'Wed', daily: 21, weekly: 124 },
  { day: 'Thu', daily: 29, weekly: 131 },
  { day: 'Fri', daily: 35, weekly: 142 },
  { day: 'Sat', daily: 14, weekly: 98 },
  { day: 'Sun', daily: 9, weekly: 87 },
];

const ALERTS_DONUT = [
  { name: 'Speeding', value: 38, color: '#DC2626' },
  { name: 'Harsh Braking', value: 27, color: '#e8622a' },
  { name: 'Geofence', value: 19, color: '#3d6b8e' },
  { name: 'Idle Violations', value: 16, color: '#5a8aad' },
];

const LIVE_ACTIVITY_FEED = [
  { icon: PlayCircle, label: 'Trip started', detail: 'VH-312 → Central Hub', time: '2m ago', color: '#3d6b8e' },
  { icon: AlertCircle, label: 'Alert triggered', detail: 'VH-201 speeding 92km/h', time: '5m ago', color: '#DC2626' },
  { icon: Wrench, label: 'Maintenance event', detail: 'WO-493 opened for VH-088', time: '11m ago', color: '#e8622a' },
  { icon: UserCheck, label: 'Driver assigned', detail: 'Ahmed M. → TR-106', time: '18m ago', color: '#22C55E' },
  { icon: PlayCircle, label: 'Trip started', detail: 'SSA-0037 → Airport', time: '22m ago', color: '#3d6b8e' },
  { icon: CheckCircle2, label: 'Trip completed', detail: 'TR-105 North Depot - CBD', time: '31m ago', color: '#22C55E' },
];

const TRIP_STATUS_DATA = [
  { label: 'Completed', value: 98, color: '#22C55E', bg: 'bg-[#EAF9F0]', border: 'border-[#22C55E]/20', text: 'text-[#22C55E]' },
  { label: 'In Progress', value: 44, color: '#3d6b8e', bg: 'bg-[#eef4f8]', border: 'border-[#3d6b8e]/20', text: 'text-[#3d6b8e]' },
  { label: 'Delayed', value: 7, color: '#DC2626', bg: 'bg-[#FEECEC]', border: 'border-[#DC2626]/20', text: 'text-[#DC2626]' },
];

const INTELLIGENCE_INSIGHTS = [
  { icon: '⚠', text: '3 vehicles likely to require maintenance within 48h', level: 'warning' as const },
  { icon: '📉', text: 'Idle time increased by 12% vs last week', level: 'warning' as const },
  { icon: '🚀', text: 'Utilization improved by 5% this month', level: 'positive' as const },
  { icon: '⛽', text: 'Fuel anomaly detected on VH-088 — 18% above avg', level: 'warning' as const },
];

// Map vehicles with status
const MAP_VEHICLES = [
  { id: 'SXA-0388', left: '19%', top: '64%', status: 'available' as const, speed: '0 km/h', driver: 'Ahmed M.' },
  { id: 'SSA-0037', left: '32%', top: '48%', status: 'on-trip' as const, speed: '62 km/h', driver: 'Sarah L.' },
  { id: '85A-1167', left: '46%', top: '58%', status: 'maintenance' as const, speed: '0 km/h', driver: 'N/A' },
  { id: '115A-1167', left: '58%', top: '43%', status: 'alert' as const, speed: '0 km/h', driver: 'Omar K.' },
  { id: 'VH-201', left: '72%', top: '55%', status: 'on-trip' as const, speed: '48 km/h', driver: 'Fatima A.' },
  { id: 'VH-088', left: '66%', top: '70%', status: 'available' as const, speed: '0 km/h', driver: 'Khalid R.' },
];

const MAP_MARKER_STYLES = {
  available: { dot: 'bg-[#22C55E]', halo: 'bg-[#22C55E]/25', ring: 'border-[#22C55E]/40', label: 'Available', color: '#22C55E' },
  'on-trip': { dot: 'bg-[#3d6b8e]', halo: 'bg-[#3d6b8e]/25', ring: 'border-[#3d6b8e]/40', label: 'On Trip', color: '#3d6b8e' },
  maintenance: { dot: 'bg-[#e8622a]', halo: 'bg-[#e8622a]/25', ring: 'border-[#e8622a]/40', label: 'Maintenance', color: '#e8622a' },
  alert: { dot: 'bg-[#DC2626]', halo: 'bg-[#DC2626]/25', ring: 'border-[#DC2626]/40', label: 'Alert', color: '#DC2626' },
} as const;

type MapFilter = 'all' | 'available' | 'on-trip' | 'maintenance' | 'alert';

// Mini sparkline SVG
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 48;
  const h = 20;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  });
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].split(',')[0]} cy={pts[pts.length - 1].split(',')[1]} r="2" fill={color} />
    </svg>
  );
}

function Card({
  children,
  className,
  variant,
  important,
}: {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof SEMANTIC_COLORS;
  important?: boolean;
}) {
  const styles = variant ? SEMANTIC_COLORS[variant] : null;
  return (
    <div className={cn(TOKENS.cardBg, TOKENS.cardRadius, important ? TOKENS.strongShadow : TOKENS.cardShadow, TOKENS.cardBorder, styles?.border, className)}>
      {children}
    </div>
  );
}

function SectionWrapper({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(TOKENS.sectionBg, 'rounded-[8px] p-0 flex flex-col gap-2', className)}>
      {children}
    </div>
  );
}

function SectionTitle({ title, variant = 'blue', className }: { title: string; variant?: keyof typeof SEMANTIC_COLORS; className?: string }) {
  const color = SEMANTIC_COLORS[variant].main;
  return (
    <div className="mb-3 flex items-center gap-2">
      <div className="h-3.5 w-[3px] rounded-full opacity-100" style={{ backgroundColor: color }} aria-hidden />
      <h3 className={cn('typo-section-title', className)}>{title}</h3>
    </div>
  );
}

type DashboardFilterValue = 'All' | string;

function DashboardLabeledFilterSelect({ label, value, onValueChange, options }: {
  label: string;
  value: DashboardFilterValue;
  onValueChange: (next: string) => void;
  options: Array<{ value: DashboardFilterValue; label: string }>;
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger size="sm" className={cn('h-8 px-2.5 rounded-[6px] bg-white flex items-center justify-between gap-2 cursor-pointer', 'hover:bg-[#f4f8fb] transition-all shadow-[0_1px_2px_rgba(37,61,89,0.05)]', 'border border-[#d4e0ea]/80 data-[state=open]:bg-[#dce8f0]', '[&svg]:transition-transform data-[state=open]:[&svg]:rotate-180')}>
        <SelectValue className="text-[10px] font-semibold invisible" placeholder="All" />
      </SelectTrigger>
      <SelectContent className="rounded-md">
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function DashboardPage() {
  const today = new Date().toLocaleString(undefined, {
    weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  const [vehicleFilter, setVehicleFilter] = useState<DashboardFilterValue>('All');
  const [regionFilter, setRegionFilter] = useState<DashboardFilterValue>('All');
  const [categoryFilter, setCategoryFilter] = useState<DashboardFilterValue>('All');
  const [subCategoryFilter, setSubCategoryFilter] = useState<DashboardFilterValue>('All');
  const [mapFilter, setMapFilter] = useState<MapFilter>('all');
  const [hoveredVehicle, setHoveredVehicle] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const filteredVehicles = MAP_VEHICLES.filter(
    (v) => mapFilter === 'all' || v.status === mapFilter,
  );

  const selectedVehicleData = MAP_VEHICLES.find((v) => v.id === selectedVehicle);

  return (
    <div className={cn(TOKENS.pageBg, 'main-container pt-5 px-5 pb-6')}>
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-2.5">
        {/* Header */}
        <header className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="typo-page-title">Executive Analyst Dashboard</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="typo-body">Intelligence Command Core • {today}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: 'Primary Action', type: 'primary' },
              { label: 'Secondary Act', type: 'secondary' },
              { label: 'Tools', type: 'secondary' },
            ].map((btn) => (
              <button key={btn.label} className={cn('px-3 py-1.5 rounded-[6px] text-[10px] font-black uppercase tracking-wider transition-all duration-300 shadow-sm', btn.type === 'primary' ? 'bg-[linear-gradient(135deg,#e8622a,#f07a4a)] text-white shadow-[0_8px_20px_-6px_rgba(232,98,42,0.40)] hover:shadow-[0_12px_24px_-8px_rgba(232,98,42,0.50)] hover:scale-[1.03] active:scale-[0.97] border border-[#e8622a]/30' : 'bg-[#eef4f8] text-[#3d6b8e] border border-[#d4e0ea] hover:bg-[#dce8f0] hover:shadow-md')}>
                {btn.label}
              </button>
            ))}
          </div>
        </header>

        {/* ── SECTION 1: Filters + Enhanced KPI Row ── */}
        <SectionWrapper>
          <div className="rounded-[8px] bg-[#eef4f8] p-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {[
                { label: 'Vehicle Filter', value: vehicleFilter, onChange: setVehicleFilter, opts: [{ value: 'All', label: 'All' }, { value: 'VH-001', label: 'VH-001' }, { value: 'VH-014', label: 'VH-014' }] },
                { label: 'Region Filter', value: regionFilter, onChange: setRegionFilter, opts: [{ value: 'All', label: 'All' }, { value: 'North', label: 'North' }, { value: 'South', label: 'South' }] },
                { label: 'Category Filter', value: categoryFilter, onChange: setCategoryFilter, opts: [{ value: 'All', label: 'All' }, { value: 'Delivery', label: 'Delivery' }, { value: 'Logistics', label: 'Logistics' }] },
                { label: 'Sub-category Filter', value: subCategoryFilter, onChange: setSubCategoryFilter, opts: [{ value: 'All', label: 'All' }, { value: 'Route A', label: 'Route A' }, { value: 'Route B', label: 'Route B' }] },
              ].map(({ label, value, onChange, opts }) => (
                <div key={label}>
                  <span className="text-[10px] font-semibold text-[#4f6478] uppercase tracking-wide">{label}</span>
                  <DashboardLabeledFilterSelect label={label} value={value} onValueChange={(v) => onChange(v as DashboardFilterValue)} options={opts} />
                </div>
              ))}
            </div>
          </div>

          {/* Primary KPI Row — 6 cards, slightly larger */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {KPI_DATA.slice(0, 6).map((kpi) => {
              const variant = kpi.variant as keyof typeof SEMANTIC_COLORS;
              const colors = SEMANTIC_COLORS[variant];
              const Icon = kpi.icon;
              const sparkData = SPARKLINES[kpi.label];
              const TrendIcon = kpi.trendUp ? TrendingUp : TrendingDown;
              const trendColor = kpi.trendUp ? '#22C55E' : '#DC2626';

              const cardContent = (
                <div
                  className={cn('bg-white', TOKENS.cardRadius, TOKENS.cardShadow, 'p-2.5 flex flex-col justify-between group transition-all duration-300 hover:translate-y-[-1px] relative overflow-hidden min-h-[80px] border border-transparent cursor-default')}
                  title={kpi.tooltip}
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: colors.main }} />
                  <div className="flex items-start justify-between">
                    <p className="typo-kpi-label leading-tight pr-1">{kpi.label}</p>
                    <div className={cn('w-6 h-6 rounded-md flex items-center justify-center shrink-0', colors.iconBg)}>
                      <Icon className="w-3.5 h-3.5" style={{ color: colors.main }} />
                    </div>
                  </div>
                  <div className="flex items-end justify-between mt-1.5 gap-1">
                    <div>
                      <p className="text-[16px] font-black text-[#1e3448] leading-none">{kpi.value}</p>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        <TrendIcon className="w-2.5 h-2.5" style={{ color: trendColor }} />
                        <span className="text-[9px] font-bold" style={{ color: trendColor }}>{kpi.trend}</span>
                      </div>
                    </div>
                    {sparkData && (
                      <div className="opacity-60 group-hover:opacity-100 transition-opacity">
                        <Sparkline data={sparkData} color={colors.main} />
                      </div>
                    )}
                  </div>
                </div>
              );

              if (kpi.link) {
                return (
                  <Link key={kpi.label} to={kpi.link} className="block hover:no-underline">
                    {cardContent}
                  </Link>
                );
              }
              return <div key={kpi.label}>{cardContent}</div>;
            })}
          </div>

          {/* Secondary KPI Row — 4 cards, compact */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {KPI_DATA.slice(6).map((kpi) => {
              const variant = kpi.variant as keyof typeof SEMANTIC_COLORS;
              const colors = SEMANTIC_COLORS[variant];
              const Icon = kpi.icon;
              const TrendIcon = kpi.trendUp ? TrendingUp : TrendingDown;
              const trendColor = kpi.trendUp ? '#22C55E' : '#DC2626';

              return (
                <div
                  key={kpi.label}
                  className={cn('bg-white/70', TOKENS.cardRadius, 'shadow-[0_1px_4px_rgba(61,107,142,0.05)]', 'px-2.5 py-1.5 flex items-center gap-2.5 border border-[#e8eef4]/80 cursor-default hover:bg-white transition-colors')}
                  title={kpi.tooltip}
                >
                  <div className={cn('w-5 h-5 rounded-md flex items-center justify-center shrink-0', colors.iconBg)}>
                    <Icon className="w-3 h-3" style={{ color: colors.main }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-bold text-[#6b8299] uppercase tracking-wide truncate">{kpi.label}</p>
                    <p className="text-[12px] font-black text-[#1e3448] leading-tight">{kpi.value}</p>
                  </div>
                  <div className="flex items-center gap-0.5 shrink-0">
                    <TrendIcon className="w-2.5 h-2.5" style={{ color: trendColor }} />
                    <span className="text-[9px] font-bold" style={{ color: trendColor }}>{kpi.trend}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionWrapper>

        {/* ── SECTION 2: Live Fleet Monitor (enhanced) ── */}
        <SectionWrapper>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-10">
            <Card variant="blue" important className="lg:col-span-7 p-2 h-full">
              <div className="flex items-center justify-between mb-1.5">
                <SectionTitle title="Live Fleet Monitor" variant="blue" className="mb-0" />
                {/* Filter chips — tight */}
                <div className="flex items-center gap-0.5 flex-wrap justify-end">
                  {(['all', 'available', 'on-trip', 'maintenance', 'alert'] as MapFilter[]).map((f) => {
                    const labels: Record<MapFilter, string> = { all: 'All', available: 'Available', 'on-trip': 'On Trip', maintenance: 'Maint.', alert: 'Alerts' };
                    const chipColors: Record<MapFilter, string> = { all: '#3d6b8e', available: '#22C55E', 'on-trip': '#3d6b8e', maintenance: '#e8622a', alert: '#DC2626' };
                    const active = mapFilter === f;
                    return (
                      <button
                        key={f}
                        onClick={() => setMapFilter(f)}
                        className={cn('px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider border transition-all', active ? 'text-white shadow-sm' : 'bg-white text-[#4f6478] border-[#d4e0ea] hover:border-[#3d6b8e]/40')}
                        style={active ? { backgroundColor: chipColors[f], borderColor: chipColors[f] } : {}}
                      >
                        {labels[f]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Map area — taller, less padding */}
              <div className="relative h-[240px] overflow-hidden rounded-[8px] bg-[#e8eef4]">
                <div className="absolute inset-0 bg-[radial-gradient(#c8d5e2_1px,transparent_1px)] bg-[size:15px_15px] opacity-25" />
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                  <rect x="0" y="0" width="100" height="100" fill="#eef4f8" />
                  <g opacity="0.9" fill="#d8e4ed">
                    <rect x="4" y="8" width="12" height="9" rx="1.2" /><rect x="18" y="8" width="10" height="9" rx="1.2" /><rect x="30" y="8" width="12" height="9" rx="1.2" /><rect x="46" y="8" width="14" height="9" rx="1.2" /><rect x="63" y="8" width="11" height="9" rx="1.2" /><rect x="76" y="8" width="16" height="9" rx="1.2" />
                    <rect x="7" y="23" width="11" height="10" rx="1.2" /><rect x="21" y="23" width="14" height="10" rx="1.2" /><rect x="39" y="23" width="10" height="10" rx="1.2" /><rect x="52" y="23" width="15" height="10" rx="1.2" /><rect x="71" y="23" width="10" height="10" rx="1.2" /><rect x="84" y="23" width="9" height="10" rx="1.2" />
                    <rect x="5" y="39" width="15" height="11" rx="1.2" /><rect x="24" y="39" width="12" height="11" rx="1.2" /><rect x="40" y="39" width="12" height="11" rx="1.2" /><rect x="56" y="39" width="11" height="11" rx="1.2" /><rect x="71" y="39" width="17" height="11" rx="1.2" />
                    <rect x="9" y="57" width="13" height="10" rx="1.2" /><rect x="26" y="57" width="9" height="10" rx="1.2" /><rect x="38" y="57" width="14" height="10" rx="1.2" /><rect x="56" y="57" width="15" height="10" rx="1.2" /><rect x="74" y="57" width="17" height="10" rx="1.2" />
                    <rect x="7" y="73" width="11" height="11" rx="1.2" /><rect x="21" y="73" width="13" height="11" rx="1.2" /><rect x="37" y="73" width="10" height="11" rx="1.2" /><rect x="51" y="73" width="16" height="11" rx="1.2" /><rect x="71" y="73" width="20" height="11" rx="1.2" />
                  </g>
                  <g stroke="#f0f4f8" strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" fill="none">
                    <path d="M0 18 H100" /><path d="M0 35 H100" /><path d="M0 53 H100" /><path d="M0 70 H100" /><path d="M0 88 H100" />
                    <path d="M16 0 V100" /><path d="M34 0 V100" /><path d="M52 0 V100" /><path d="M69 0 V100" /><path d="M86 0 V100" />
                    <path d="M-4 82 L42 14 L104 2" /><path d="M-3 5 L52 64 L104 99" />
                  </g>
                  <g stroke="#c8d5e2" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" fill="none">
                    <path d="M0 26 H100" /><path d="M0 44 H100" /><path d="M0 62 H100" /><path d="M0 79 H100" />
                    <path d="M25 0 V100" /><path d="M43 0 V100" /><path d="M61 0 V100" /><path d="M78 0 V100" />
                  </g>
                </svg>

                {/* Active View badge */}
                <div className="absolute right-3 top-3 z-10 flex items-center gap-2 rounded-full bg-white px-2 py-1 shadow-sm">
                  <MapPinned className="h-3 w-3 text-[#3d6b8e]" />
                  <span className="text-[9px] font-black text-[#4f6478] uppercase tracking-widest">Active View</span>
                </div>

                {/* Map Legend (right side) — compact */}
                <div className="absolute right-2 bottom-2 z-10 bg-white/90 backdrop-blur-sm rounded-[6px] px-1.5 py-1 shadow-sm border border-[#e8eef4] flex flex-col gap-0.5">
                  {Object.entries(MAP_MARKER_STYLES).map(([key, s]) => (
                    <div key={key} className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full border border-white shadow-sm" style={{ backgroundColor: s.color }} />
                      <span className="text-[7px] font-bold text-[#4f6478] uppercase tracking-wider">{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Vehicle markers */}
                {filteredVehicles.map((vehicle) => {
                  const styles = MAP_MARKER_STYLES[vehicle.status];
                  const isHovered = hoveredVehicle === vehicle.id;
                  const isSelected = selectedVehicle === vehicle.id;
                  return (
                    <div
                      key={vehicle.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                      style={{ left: vehicle.left, top: vehicle.top }}
                      onMouseEnter={() => setHoveredVehicle(vehicle.id)}
                      onMouseLeave={() => setHoveredVehicle(null)}
                      onClick={() => setSelectedVehicle(selectedVehicle === vehicle.id ? null : vehicle.id)}
                    >
                      <div className={cn('absolute -inset-1 rounded-full animate-pulse', styles.halo)} />
                      <div className={cn('relative h-4 w-4 rounded-full border-[2px] border-white shadow-[0_4px_10px_rgba(15,23,42,0.2)] transition-transform', styles.dot, (isHovered || isSelected) && 'scale-125')}>
                        <div className={cn('absolute -inset-1 rounded-full border', styles.ring)} />
                      </div>
                      {/* Hover tooltip */}
                      {isHovered && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 bg-[#1e3448] text-white rounded-[6px] px-2 py-1.5 shadow-lg whitespace-nowrap pointer-events-none">
                          <p className="text-[9px] font-black uppercase tracking-wider">{vehicle.id}</p>
                          <p className="text-[8px] text-white/70">{styles.label} • {vehicle.speed}</p>
                          <p className="text-[8px] text-white/70">{vehicle.driver}</p>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1e3448]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Selected vehicle mini card */}
              {selectedVehicleData && (
                <div className="mt-1.5 p-2 rounded-[8px] bg-[#eef4f8] border border-[#d4e0ea] flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: MAP_MARKER_STYLES[selectedVehicleData.status].color }} />
                  <div className="flex-1 grid grid-cols-4 gap-2">
                    <div><p className="text-[8px] text-[#6b8299] uppercase tracking-widest font-black">Vehicle</p><p className="text-[10px] font-black text-[#1e3448]">{selectedVehicleData.id}</p></div>
                    <div><p className="text-[8px] text-[#6b8299] uppercase tracking-widest font-black">Status</p><p className="text-[10px] font-black" style={{ color: MAP_MARKER_STYLES[selectedVehicleData.status].color }}>{MAP_MARKER_STYLES[selectedVehicleData.status].label}</p></div>
                    <div><p className="text-[8px] text-[#6b8299] uppercase tracking-widest font-black">Driver</p><p className="text-[10px] font-black text-[#1e3448]">{selectedVehicleData.driver}</p></div>
                    <div><p className="text-[8px] text-[#6b8299] uppercase tracking-widest font-black">Speed</p><p className="text-[10px] font-black text-[#1e3448]">{selectedVehicleData.speed}</p></div>
                  </div>
                  <button onClick={() => setSelectedVehicle(null)} className="text-[#6b8299] hover:text-[#1e3448] text-[10px] font-black">✕</button>
                </div>
              )}

              {/* Bottom strip — compact */}
              <div className="grid grid-cols-4 gap-1.5 mt-1.5">
                {[
                  ['Moving', '302', '#3d6b8e'],
                  ['Idle', '166', '#e8622a'],
                  ['Avg Speed', '48 km/h', '#22C55E'],
                  ['In City %', '64%', '#5a8aad'],
                ].map(([label, value, color]) => (
                  <div key={label} className="px-2 py-1.5 rounded-[6px] bg-[#f4f8fb] shadow-[0_1px_2px_rgba(37,61,89,0.06)] flex items-center gap-2">
                    <div>
                      <p className="text-[8px] text-[#6b8299] font-black uppercase tracking-widest leading-none">{label}</p>
                      <p className="text-[12px] font-black mt-0.5 leading-none" style={{ color }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Right panel: Health & Compliance + Efficiency Summary */}
            <div className="flex flex-col gap-3 lg:col-span-3">
              <Card variant="secondaryBlue" className="p-2.5 shadow-sm">
                <SectionTitle title="Health & Compliance" variant="secondaryBlue" />
                <div className="space-y-2">
                  {[
                    { label: 'Roadworthy', val: '84%', pct: 84, color: '#22C55E', bg: '#22C55E' },
                    { label: 'Off Road', val: '9%', pct: 9, color: '#3d6b8e', bg: '#3d6b8e' },
                    { label: 'Under Inspection', val: '7%', pct: 7, color: '#5a8aad', bg: '#5a8aad' },
                  ].map(({ label, val, pct, color, bg }) => (
                    <div key={label}>
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="font-bold text-[#4f6478]">{label}</span>
                        <span className="font-black tracking-tight" style={{ color }}>{val}</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#dce8f0] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: bg }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card variant="green" className="p-2.5 shadow-sm">
                <SectionTitle title="Efficiency Summary" variant="green" />
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { label: 'Checked %', val: '88%', pct: 88, color: '#22C55E', icon: ShieldCheck },
                    { label: 'Not Checked', val: '12%', pct: 12, color: '#e8622a', icon: AlertTriangle },
                    { label: 'Safe %', val: '91%', pct: 91, color: '#22C55E', icon: ShieldCheck },
                    { label: 'Unsafe %', val: '9%', pct: 9, color: '#DC2626', icon: AlertTriangle },
                  ].map(({ label, val, pct, color, icon: Icon }) => (
                    <div key={label} className="p-1.5 rounded-lg bg-white shadow-sm">
                      <div className="flex items-center gap-1 mb-0.5">
                        <Icon className="w-2.5 h-2.5" style={{ color }} />
                        <p className="text-[9px] font-black text-[#6b8299] uppercase tracking-widest">{label}</p>
                      </div>
                      <p className="text-[13px] font-black" style={{ color }}>{val}</p>
                      <div className="h-1 w-full bg-[#dce8f0] rounded-full overflow-hidden mt-1">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </SectionWrapper>

        {/* ── SECTION 3: Analytics Overview Strip ── */}
        <SectionWrapper>
          {/* Row 1: 4 cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: "Today's Trips", value: '142', icon: Route, color: '#3d6b8e', bg: '#dce8f0', trend: '+12', up: true },
              { label: 'Avg Trip Dist.', value: '38.4 km', icon: Navigation, color: '#5a8aad', bg: '#dce8f0', trend: '+2.1', up: true },
              { label: 'Idle Time', value: '2.4 h', icon: Timer, color: '#e8622a', bg: '#fdeee6', trend: '-0.3h', up: false },
              { label: 'Total Distance', value: '5,452 km', icon: Activity, color: '#3d6b8e', bg: '#dce8f0', trend: '+340', up: true },
            ].map(({ label, value, icon: Icon, color, bg, trend, up }) => (
              <div key={label} className={cn('bg-white rounded-[8px] px-2.5 py-2 border border-[#e8eef4] shadow-[0_1px_4px_rgba(61,107,142,0.05)] flex flex-col gap-0.5 hover:translate-y-[-1px] transition-transform')}>
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-black text-[#6b8299] uppercase tracking-widest leading-tight">{label}</p>
                  <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ backgroundColor: bg }}>
                    <Icon className="w-3 h-3" style={{ color }} />
                  </div>
                </div>
                <p className="text-[13px] font-black text-[#1e3448] leading-none">{value}</p>
                <div className="flex items-center gap-0.5">
                  {up ? <TrendingUp className="w-2.5 h-2.5 text-[#22C55E]" /> : <TrendingDown className="w-2.5 h-2.5 text-[#DC2626]" />}
                  <span className="text-[9px] font-bold" style={{ color: up ? '#22C55E' : '#DC2626' }}>{trend}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Row 2: 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { label: 'Fuel Consumed', value: '1,840 L', icon: Fuel, color: '#e8622a', bg: '#fdeee6', trend: '-60L', up: false },
              { label: 'Service Due', value: '14', icon: CalendarClock, color: '#DC2626', bg: '#FEECEC', trend: '+2', up: false },
              { label: 'Maint. Alerts', value: '8', icon: Wrench, color: '#e8622a', bg: '#fdeee6', trend: '-3', up: false },
            ].map(({ label, value, icon: Icon, color, bg, trend, up }) => (
              <div key={label} className={cn('bg-white rounded-[8px] px-2.5 py-2 border border-[#e8eef4] shadow-[0_1px_4px_rgba(61,107,142,0.05)] flex flex-col gap-0.5 hover:translate-y-[-1px] transition-transform')}>
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-black text-[#6b8299] uppercase tracking-widest leading-tight">{label}</p>
                  <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ backgroundColor: bg }}>
                    <Icon className="w-3 h-3" style={{ color }} />
                  </div>
                </div>
                <p className="text-[13px] font-black text-[#1e3448] leading-none">{value}</p>
                <div className="flex items-center gap-0.5">
                  {up ? <TrendingUp className="w-2.5 h-2.5 text-[#22C55E]" /> : <TrendingDown className="w-2.5 h-2.5 text-[#DC2626]" />}
                  <span className="text-[9px] font-bold" style={{ color: up ? '#22C55E' : '#DC2626' }}>{trend}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* ── SECTION 4: Historical Safety & Risk Analysis ── */}
        <SectionWrapper>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
            <Card variant="orange" className="lg:col-span-12 p-2">
              <SectionTitle title="Historical Safety & Risk Analysis" variant="orange" />
              <div className="h-[155px] bg-white rounded-[8px] p-1 border border-transparent">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={HISTORICAL_SAFETY_DATA} margin={{ top: 6, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid vertical={false} stroke="#d4e0ea" strokeDasharray="3 3" opacity={0.4} />
                    <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} />
                    <Tooltip cursor={{ fill: '#eef4f8' }} contentStyle={{ border: 'none', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.06)', background: '#ffffff' }} />
                    <Bar dataKey="low" name="Low Risk" stackId="a" fill="#FED7AA" barSize={32} />
                    <Bar dataKey="med" name="Medium Risk" stackId="a" fill="#e8622a" barSize={32} />
                    <Bar dataKey="high" name="High Risk" stackId="a" fill="#DC2626" barSize={32} radius={[4, 4, 0, 0]} />
                    <Line type="monotone" name="Trend" dataKey="trend" stroke="#3d6b8e" strokeWidth={2} dot={{ r: 3, fill: '#3d6b8e' }} />
                    <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase', paddingBottom: '6px' }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </SectionWrapper>

        {/* ── SECTION 5: Maintenance & Alerts / Inspections / Expiries ── */}
        <SectionWrapper>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
            {/* Maintenance & Alerts */}
            <Card variant="orange" className="p-2 flex flex-col gap-2">
              <SectionTitle title="Maintenance & Alerts" variant="orange" className="mb-0" />
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: 'Scheduled', val: '23', bg: 'bg-[#eef4f8]', color: '#3d6b8e' },
                  { label: 'Overdue', val: '8', bg: 'bg-[#FEECEC]', color: '#DC2626' },
                  { label: 'Workshop', val: '17', bg: 'bg-[#fdeee6]', color: '#e8622a' },
                ].map(({ label, val, bg, color }) => (
                  <div key={label} className={cn('px-2 py-1.5 rounded-[6px]', bg)}>
                    <p className="text-[8px] font-bold text-[#6b8299] uppercase tracking-widest text-center">{label}</p>
                    <p className="text-[13px] font-black text-center leading-tight" style={{ color }}>{val}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1.5">
                {[
                  { label: 'High priority', val: '12', color: '#DC2626' },
                  { label: 'Medium priority', val: '24', color: '#e8622a' },
                  { label: 'Low priority', val: '41', color: '#5a8aad' },
                ].map(({ label, val, color }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[9px] font-semibold text-[#6b8299] uppercase tracking-widest">{label}</span>
                      <span className="text-[9px] font-black" style={{ color }}>{val}</span>
                    </div>
                    <div className="h-1 w-full bg-[#dce8f0] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(parseInt(val) / 50) * 100}%`, backgroundColor: color }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Upcoming Inspections */}
            <Card variant="secondaryBlue" className="p-2 flex flex-col gap-2">
              <SectionTitle title="Upcoming Inspections" variant="secondaryBlue" className="mb-0" />
              <div className="flex flex-col gap-1">
                {[
                  { time: '08:30', vehicle: 'VH-141', task: 'Pre-trip check' },
                  { time: '10:15', vehicle: 'VH-207', task: 'Brake review' },
                  { time: '13:00', vehicle: 'VH-080', task: 'Annual fitness' },
                ].map((item) => (
                  <div key={item.vehicle} className="flex items-center gap-2 px-2 py-1.5 rounded-[6px] bg-[#f4f8fb] border-l-2 border-l-[#5a8aad] hover:bg-[#eef4f8] transition-colors cursor-default group">
                    <span className="text-[9px] font-black text-[#5a8aad] w-9 shrink-0">{item.time}</span>
                    <span className="text-[9px] font-black text-[#1e3448] shrink-0">{item.vehicle}</span>
                    <span className="text-[9px] font-medium text-[#6b8299] truncate">{item.task}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Upcoming Expiries */}
            <Card variant="blue" className="p-2 flex flex-col gap-2">
              <SectionTitle title="Upcoming Expiries" variant="blue" className="mb-0" />
              <div className="flex flex-col gap-1">
                {[
                  { vehicle: 'VH-058', doc: 'Insurance', days: 4, urgent: true },
                  { vehicle: 'VH-221', doc: 'Permit', days: 6, urgent: false },
                  { vehicle: 'VH-099', doc: 'Emission cert', days: 9, urgent: false },
                ].map((item) => (
                  <div key={item.vehicle} className="flex items-center gap-2 px-2 py-1.5 rounded-[6px] bg-[#f4f8fb] border-l-2 border-l-[#3d6b8e] hover:bg-[#eef4f8] transition-colors cursor-default group">
                    <span className="text-[9px] font-black text-[#1e3448] shrink-0">{item.vehicle}</span>
                    <span className="text-[9px] font-medium text-[#6b8299] flex-1 truncate">{item.doc}</span>
                    <span className={cn('text-[8px] font-black px-1.5 py-0.5 rounded-full shrink-0', item.urgent ? 'bg-[#FEECEC] text-[#DC2626]' : 'bg-[#eef4f8] text-[#5a8aad]')}>
                      {item.days}d
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </SectionWrapper>

        {/* ── SECTION 6: Performance & Efficiency Trends + Violations ── */}
        <SectionWrapper>
          <div className="flex flex-col gap-3">
            <Card variant="green" className="p-2">
              <SectionTitle title="Fleet Performance & Efficiency Trends" variant="green" />
              <div className="h-[155px] rounded-[8px] border border-transparent bg-white p-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={PERFORMANCE_EFFICIENCY_DATA} margin={{ top: 6, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid vertical={false} stroke="#d4e0ea" strokeDasharray="3 3" />
                    <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                    <Tooltip contentStyle={{ border: 'none', borderRadius: 12, boxShadow: '0 12px 24px rgba(0,0,0,0.05)', background: '#fff' }} />
                    <Area yAxisId="left" name="Fuel Efficiency" type="monotone" dataKey="fuel" stroke="#e8622a" strokeWidth={2.2} fill="transparent" dot={{ r: 2.5, fill: '#e8622a' }} />
                    <Area yAxisId="right" name="System Performance" type="monotone" dataKey="eff" stroke="#3d6b8e" strokeWidth={2.2} fill="transparent" dot={{ r: 2.5, fill: '#3d6b8e' }} />
                    <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase', paddingBottom: '6px', letterSpacing: '0.05em' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card variant="orange" className="p-2">
              <SectionTitle title="Regulatory Violations & Geofence Breaches" variant="orange" />
              <div className="h-[155px] rounded-[8px] border border-transparent bg-white p-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={VIOLATIONS_DATA} margin={{ top: 6, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid vertical={false} stroke="#d4e0ea" strokeDasharray="3 3" />
                    <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                    <Tooltip contentStyle={{ border: 'none', borderRadius: 12, boxShadow: '0 8px 16px rgba(0,0,0,0.05)', background: '#fff' }} />
                    <Bar dataKey="tr105" name="Primary" fill="#e8622a" barSize={10} radius={[2, 2, 0, 0]} />
                    <Bar dataKey="vm002" name="Comparison" fill="#3d6b8e" barSize={10} radius={[2, 2, 0, 0]} />
                    <Bar dataKey="vh122" name="Anomaly" fill="#DC2626" barSize={10} radius={[2, 2, 0, 0]} />
                    <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase', paddingBottom: '6px', letterSpacing: '0.05em' }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </SectionWrapper>

        {/* ── SECTION 7: Intelligence Insights Strip ── */}
        <SectionWrapper>
          <div className="flex flex-wrap items-stretch gap-1.5">
            {INTELLIGENCE_INSIGHTS.map((insight, i) => (
              <div
                key={i}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 cursor-default',
                  'hover:shadow-sm hover:translate-y-[-1px]',
                  insight.level === 'positive'
                    ? 'bg-[#EAF9F0] border-[#22C55E]/25 hover:border-[#22C55E]/40'
                    : 'bg-[#fffbf5] border-[#e8622a]/20 hover:border-[#e8622a]/35',
                )}
              >
                <span className="text-[11px] leading-none shrink-0">{insight.icon}</span>
                <p className="text-[9px] font-semibold text-[#2e4258] leading-none">{insight.text}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* ── SECTION 8: Safety and Alerts ── */}
        <SectionWrapper>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-12">
            {/* Alerts Distribution donut */}
            <Card variant="red" className="lg:col-span-4 p-2">
              <SectionTitle title="Alerts Distribution" variant="red" />
              <div className="flex items-center gap-2">
                <div className="relative shrink-0">
                  <ResponsiveContainer width={100} height={100}>
                    <PieChart>
                      <Pie data={ALERTS_DONUT} cx="50%" cy="50%" innerRadius={28} outerRadius={46} paddingAngle={2} dataKey="value" strokeWidth={0}>
                        {ALERTS_DONUT.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ border: 'none', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.06)', background: '#fff', fontSize: 10 }} formatter={(value: number, name: string) => [`${value}`, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <p className="text-[14px] font-black text-[#1e3448] leading-none">100</p>
                      <p className="text-[7px] font-bold text-[#6b8299] uppercase tracking-wider">total</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  {ALERTS_DONUT.map((item) => (
                    <div key={item.name} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-[8px] font-semibold text-[#4f6478] flex-1 truncate">{item.name}</span>
                      <div className="w-12 h-1 bg-[#f0f4f8] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                      </div>
                      <span className="text-[9px] font-black text-[#1e3448] w-4 text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Speed Violations bar chart */}
            <Card variant="orange" className="lg:col-span-5 p-2">
              <div className="flex items-center justify-between mb-1.5">
                <SectionTitle title="Speed Violations" variant="orange" className="mb-0" />
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[8px] font-bold text-[#4f6478] uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-sm bg-[#e8622a] inline-block" /> Daily
                  </span>
                  <span className="flex items-center gap-1 text-[8px] font-bold text-[#4f6478] uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-sm bg-[#3d6b8e] inline-block" /> Weekly
                  </span>
                </div>
              </div>
              <div className="h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SPEED_VIOLATIONS_DATA} margin={{ top: 4, right: 0, left: -28, bottom: 0 }} barGap={2}>
                    <CartesianGrid vertical={false} stroke="#e8eef4" strokeDasharray="3 3" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} />
                    <Tooltip contentStyle={{ border: 'none', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.06)', background: '#fff', fontSize: 10 }} />
                    <Bar dataKey="daily" name="Daily" fill="#e8622a" barSize={7} radius={[2, 2, 0, 0]} />
                    <Bar dataKey="weekly" name="Weekly" fill="#3d6b8e" barSize={7} radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Harsh Driving Events */}
            <Card variant="secondaryBlue" className="lg:col-span-3 p-2">
              <SectionTitle title="Harsh Driving Events" variant="secondaryBlue" />
              <div className="flex flex-col gap-1.5">
                {[
                  { label: 'Critical', value: 12, max: 50, color: '#DC2626', bg: 'bg-[#FEECEC]/60', textColor: 'text-[#DC2626]' },
                  { label: 'Warning', value: 28, max: 50, color: '#e8622a', bg: 'bg-[#fdeee6]/60', textColor: 'text-[#e8622a]' },
                  { label: 'Mild', value: 41, max: 50, color: '#5a8aad', bg: 'bg-[#eef4f8]/60', textColor: 'text-[#5a8aad]' },
                ].map(({ label, value, max, color, bg, textColor }) => (
                  <div key={label} className={cn('px-2 py-1.5 rounded-[6px]', bg)}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-semibold text-[#4f6478] uppercase tracking-widest">{label}</span>
                      <span className={cn('text-[12px] font-black', textColor)}>{value}</span>
                    </div>
                    <div className="h-1 w-full bg-white/70 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(value / max) * 100}%`, backgroundColor: color }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </SectionWrapper>

        {/* ── SECTION 9: Upgraded Tables + Right Operation Panel ── */}
        <SectionWrapper>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-12">
            {/* Left: Tables */}
            <div className="flex flex-col gap-2 lg:col-span-8">
              {/* Drivers Table */}
              <Card variant="green" className="p-0 overflow-hidden">
                <div className="px-2.5 py-2 bg-white border-b border-[#e8eef4]">
                  <SectionTitle title="High Performing Drivers" variant="green" className="mb-0" />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className={dashboardTableHeaderRowClass}>
                        {['Rank', 'Driver', 'Score', 'Rating', 'Performance', 'Trend'].map((h) => (
                          <th key={h} className={cn(dashboardTableHeaderCellClass, 'px-3 py-1.5', h === 'Trend' && 'text-center')}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {DRIVERS.map((d, i) => (
                        <tr key={d.name} className={cn('group transition-colors duration-150 border-b border-[#f0f4f8] hover:bg-[#f4f8fb]', i % 2 === 1 && 'bg-[#fafcfd]')}>
                          <td className="h-[36px] px-3 align-middle">
                            <div className={cn('w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black border',
                              d.rank === 1 && 'bg-amber-50 text-amber-600 border-amber-200',
                              d.rank === 2 && 'bg-slate-100 text-slate-500 border-slate-200',
                              d.rank === 3 && 'bg-orange-50 text-orange-500 border-orange-200',
                              d.rank > 3 && 'bg-[#eef4f8] text-[#5a8aad] border-[#d4e0ea]',
                            )}>
                              {d.rank}
                            </div>
                          </td>
                          <td className="h-[36px] px-3 align-middle">
                            <div className="flex items-center gap-1.5">
                              <div className="w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-bold text-[#22C55E] border border-[#22C55E]/20 bg-white">
                                {d.name.split(' ').map((n) => n[0]).join('')}
                              </div>
                              <span className="text-[10px] font-medium text-[#2e4258]">{d.name}</span>
                            </div>
                          </td>
                          <td className="h-[36px] px-3 align-middle text-[10px] font-bold text-[#2e4258]">{d.score}</td>
                          <td className="h-[36px] px-3 align-middle">
                            <div className="flex items-center gap-0.5 text-[#e8622a] text-[8px] bg-[#fdeee6] w-fit px-1.5 py-0.5 rounded-full border border-[#e8622a]/15 font-medium">
                              {d.rating} <Star className="w-2 h-2 fill-current" />
                            </div>
                          </td>
                          <td className="h-[36px] px-3 align-middle">
                            <div className="flex items-center gap-1.5 w-24">
                              <div className="flex-1 h-1 bg-[#dce8f0] rounded-full overflow-hidden">
                                <div className="h-full rounded-full transition-all" style={{ width: `${d.perf}%`, backgroundColor: d.perf >= 90 ? '#22C55E' : d.perf >= 80 ? '#3d6b8e' : '#e8622a' }} />
                              </div>
                              <span className="text-[9px] font-bold text-[#2e4258] w-7 text-right">{d.perf}%</span>
                            </div>
                          </td>
                          <td className="h-[36px] px-3 align-middle text-center">
                            {d.trend === 'up'
                              ? <span className="inline-flex items-center gap-0.5 text-[#22C55E] text-[8px] font-black"><ArrowUpRight className="w-3 h-3" />Up</span>
                              : <span className="inline-flex items-center gap-0.5 text-[#DC2626] text-[8px] font-black"><ArrowDownRight className="w-3 h-3" />Down</span>
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Trips Table */}
              <Card variant="blue" className="p-0 overflow-hidden">
                <div className="px-2.5 py-2 bg-white border-b border-[#e8eef4]">
                  <SectionTitle title="Recent Trips" variant="blue" className="mb-0" />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className={dashboardTableHeaderRowClass}>
                        {['Trip ID', 'Route', 'Duration', 'Status', 'Type'].map((h) => (
                          <th key={h} className={cn(dashboardTableHeaderCellClass, 'px-3 py-1.5')}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {TRIPS.map((t, i) => {
                        const statusStyles: Record<string, string> = {
                          Completed: 'bg-[#EAF9F0] text-[#22C55E] border-[#22C55E]/20',
                          'In Progress': 'bg-[#eef4f8] text-[#3d6b8e] border-[#3d6b8e]/20',
                          Delayed: 'bg-[#FEECEC] text-[#DC2626] border-[#DC2626]/20',
                        };
                        const typeStyles: Record<string, string> = {
                          Delivery: 'bg-[#fdeee6] text-[#e8622a]',
                          Passenger: 'bg-[#eef4f8] text-[#3d6b8e]',
                          Logistics: 'bg-[#f0f4f8] text-[#5a8aad]',
                        };
                        return (
                          <tr key={t.id} className={cn('group transition-colors duration-150 border-b border-[#f0f4f8] hover:bg-[#f4f8fb]', i % 2 === 1 && 'bg-[#fafcfd]')}>
                            <td className="h-[36px] px-3 align-middle">
                              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#2e4258]">
                                <div className="w-1 h-1 rounded-full bg-[#3d6b8e]" />{t.id}
                              </div>
                            </td>
                            <td className="h-[36px] px-3 align-middle text-[10px] font-medium text-[#2e4258]">{t.route}</td>
                            <td className="h-[36px] px-3 align-middle text-[10px] font-medium text-[#4f6478]">{t.dur}</td>
                            <td className="h-[36px] px-3 align-middle">
                              <span className={cn('px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider border', statusStyles[t.status] ?? 'bg-slate-100 text-slate-500 border-slate-200')}>
                                {t.status}
                              </span>
                            </td>
                            <td className="h-[36px] px-3 align-middle">
                              <span className={cn('px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider', typeStyles[t.type] ?? 'bg-slate-100 text-slate-500')}>
                                {t.type}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Right: Operation Panel — lighter, consistent */}
            <div className="flex flex-col gap-2 lg:col-span-4">
              {/* Live Activity Feed */}
              <Card variant="blue" className="p-2">
                <div className="flex items-center justify-between mb-1.5">
                  <SectionTitle title="Live Activity" variant="blue" className="mb-0" />
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-black text-[#6b8299] uppercase tracking-widest">Live</span>
                  </div>
                </div>
                <div className="flex flex-col gap-0 relative">
                  <div className="absolute left-[6px] top-2 bottom-2 w-px bg-[#e8eef4]" />
                  {LIVE_ACTIVITY_FEED.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex items-start gap-2 pl-1 hover:bg-[#f4f8fb] rounded-[6px] px-1 py-1 transition-colors cursor-default">
                        <div className="w-3 h-3 rounded-full flex items-center justify-center shrink-0 mt-0.5 z-10 bg-white border" style={{ borderColor: item.color }}>
                          <Icon className="w-1.5 h-1.5" style={{ color: item.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <p className="text-[9px] font-bold text-[#2e4258] truncate">{item.label}</p>
                            <span className="text-[8px] text-[#6b8299] font-medium shrink-0">{item.time}</span>
                          </div>
                          <p className="text-[8px] text-[#6b8299] truncate">{item.detail}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Trip Status */}
              <Card variant="green" className="p-2">
                <SectionTitle title="Trip Status" variant="green" />
                <div className="flex flex-col gap-1">
                  {TRIP_STATUS_DATA.map(({ label, value, color, bg, border, text }) => (
                    <div key={label} className={cn('flex items-center justify-between px-2 py-1.5 rounded-[6px] border', bg, border)}>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                        <span className="text-[9px] font-semibold text-[#4f6478] uppercase tracking-wider">{label}</span>
                      </div>
                      <span className={cn('text-[13px] font-black', text)}>{value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Maintenance Panel */}
              <Card variant="orange" className="p-2">
                <SectionTitle title="Maintenance" variant="orange" />
                <div className="flex flex-col gap-1">
                  {[
                    { label: 'Due this week', value: '14', icon: CalendarClock, color: '#e8622a', bg: 'bg-[#fdeee6]/70', border: 'border-[#e8622a]/15', text: 'text-[#e8622a]' },
                    { label: 'In workshop', value: '17', icon: Wrench, color: '#3d6b8e', bg: 'bg-[#eef4f8]/70', border: 'border-[#3d6b8e]/15', text: 'text-[#3d6b8e]' },
                    { label: 'Overdue', value: '8', icon: AlertTriangle, color: '#DC2626', bg: 'bg-[#FEECEC]/70', border: 'border-[#DC2626]/15', text: 'text-[#DC2626]' },
                  ].map(({ label, value, icon: Icon, color, bg, border, text }) => (
                    <div key={label} className={cn('flex items-center justify-between px-2 py-1.5 rounded-[6px] border', bg, border)}>
                      <div className="flex items-center gap-1.5">
                        <Icon className="w-3 h-3" style={{ color }} />
                        <span className="text-[9px] font-semibold text-[#4f6478] uppercase tracking-wider">{label}</span>
                      </div>
                      <span className={cn('text-[13px] font-black', text)}>{value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Workshop Status */}
              <Card variant="secondaryBlue" className="p-2">
                <SectionTitle title="Workshop Status" variant="secondaryBlue" />
                <div className="flex flex-col gap-1.5">
                  {[
                    { l: 'Bay occupancy', p: 78, c: '#22C55E' },
                    { l: 'Turnaround', p: 64, c: '#e8622a' },
                    { l: 'Technician availability', p: 83, c: '#3d6b8e' },
                  ].map((item) => (
                    <div key={item.l}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[9px] font-semibold text-[#6b8299] uppercase tracking-widest">{item.l}</span>
                        <span className="text-[9px] font-black text-[#1e3448]">{item.p}%</span>
                      </div>
                      <div className="h-1 bg-[#dce8f0] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${item.p}%`, backgroundColor: item.c }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Work Orders */}
              <Card variant="orange" className="p-2">
                <SectionTitle title="Work Orders" variant="orange" />
                <div className="grid grid-cols-3 gap-1 text-center">
                  {[
                    { label: 'Open', val: '18', clr: 'text-rose-500', bg: 'bg-rose-50/80', border: 'border-rose-100' },
                    { label: 'Ongoing', val: '27', clr: 'text-orange-500', bg: 'bg-orange-50/80', border: 'border-orange-100' },
                    { label: 'Done', val: '45', clr: 'text-emerald-500', bg: 'bg-emerald-50/80', border: 'border-emerald-100' },
                  ].map(({ label, val, clr, bg, border }) => (
                    <div key={label} className={cn('px-1 py-1.5 rounded-[6px] border', bg, border)}>
                      <p className="text-[8px] font-bold text-[#6b8299] uppercase tracking-widest">{label}</p>
                      <p className={cn('text-[13px] font-black mt-0.5', clr)}>{val}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}
