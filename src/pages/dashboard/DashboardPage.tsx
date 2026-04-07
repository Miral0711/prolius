import { useState, type ReactNode } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  Fuel,
  Gauge,
  MapPinned,
  ShieldCheck,
  Star,
  PenTool as Tool,
  Truck,
  Zap,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
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

const KPI_DATA = [
  {
    label: 'Total Vehicles',
    value: '512',
    group: 'Operations',
    icon: Truck,
    variant: 'blue',
  },
  {
    label: 'Active Vehicles',
    value: '468',
    group: 'Operations',
    icon: Zap,
    variant: 'blue',
  },
  {
    label: 'Vehicles Off Road',
    value: '44',
    group: 'Risk',
    icon: AlertTriangle,
    variant: 'orange',
  },
  {
    label: 'Fleet Availability',
    value: '91.4%',
    group: 'Performance',
    icon: ShieldCheck,
    variant: 'green',
  },
  {
    label: 'Vehicles in Use',
    value: '311',
    group: 'Operations',
    icon: Activity,
    variant: 'blue',
  },
  {
    label: 'Idle Vehicles',
    value: '157',
    group: 'Operations',
    icon: Clock,
    variant: 'blue',
  },
  {
    label: 'Under Maintenance',
    value: '39',
    group: 'Risk',
    icon: Tool,
    variant: 'orange',
  },
  {
    label: 'Avg Utilization',
    value: '72%',
    group: 'Performance',
    icon: Gauge,
    variant: 'green',
  },
  {
    label: 'Avg Distance / Day',
    value: '184 km',
    group: 'Efficiency',
    icon: Fuel,
    variant: 'secondaryBlue',
  },
  {
    label: 'Avg Operating Hours',
    value: '8.6 h',
    group: 'Efficiency',
    icon: Clock,
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
  { name: 'Jocel Rett', score: 100, rating: 4.8, perf: 92, trend: 'up' },
  { name: 'Dave Witaen', score: 180, rating: 4.7, perf: 87, trend: 'up' },
  { name: 'Misa Smith', score: 160, rating: 4.5, perf: 82, trend: 'up' },
  { name: 'Frlano Haun', score: 130, rating: 4.2, perf: 76, trend: 'down' },
];

const TRIPS = [
  {
    id: 'TR-105',
    route: 'North Depot - CBD',
    dur: '02:37',
    status: 'Completed',
    type: 'Delivery',
  },
  {
    id: 'VH-089',
    route: 'West Hub - Airport',
    dur: '01:57',
    status: 'In Progress',
    type: 'Passenger',
  },
  {
    id: 'VH-088',
    route: 'South Yard - Port',
    dur: '03:10',
    status: 'Completed',
    type: 'Logistics',
  },
];

const ACTIVITY = [
  {
    title: 'Defect reported',
    desc: 'VH-201 brake pressure warning',
    time: '09:28',
  },
  {
    title: 'Inspection completed',
    desc: '34 vehicles passed morning check',
    time: '08:46',
  },
  {
    title: 'Work order created',
    desc: 'WO-492 tyre replacement batch',
    time: '07:52',
  },
  {
    title: 'Vehicle recovered',
    desc: 'VH-111 moved from VOR to active',
    time: '07:20',
  },
];

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
    <div
      className={cn(
        TOKENS.cardBg,
        TOKENS.cardRadius,
        important ? TOKENS.strongShadow : TOKENS.cardShadow,
        TOKENS.cardBorder,
        styles?.border,
        className,
      )}
    >
      {children}
    </div>
  );
}

function SectionWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        TOKENS.sectionBg,
        // Use a strict grid: no wrapper padding; spacing comes from row/column gaps.
        'rounded-[8px] p-0 flex flex-col gap-3',
        className,
      )}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  title,
  variant = 'blue',
  className,
}: {
  title: string;
  variant?: keyof typeof SEMANTIC_COLORS;
  className?: string;
}) {
  const color = SEMANTIC_COLORS[variant].main;
  return (
    <div className="mb-3 flex items-center gap-2">
      <div
        className="h-3.5 w-[3px] rounded-full opacity-100"
        style={{ backgroundColor: color }}
        aria-hidden
      />
      <h3 className={cn('typo-section-title', className)}>{title}</h3>
    </div>
  );
}

type DashboardFilterValue = 'All' | string;

function DashboardLabeledFilterSelect({
  label,
  value,
  onValueChange,
  options,
}: {
  label: string;
  value: DashboardFilterValue;
  onValueChange: (next: string) => void;
  options: Array<{ value: DashboardFilterValue; label: string }>;
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        size="sm"
        className={cn(
          'h-8 px-2.5 rounded-[6px] bg-white flex items-center justify-between gap-2 cursor-pointer',
          'hover:bg-[#f4f8fb] transition-all shadow-[0_1px_2px_rgba(37,61,89,0.05)]',
          'border border-[#d4e0ea]/80 data-[state=open]:bg-[#dce8f0]',
          '[&svg]:transition-transform data-[state=open]:[&svg]:rotate-180',
        )}
      >
        {/* <span className="text-[10px] font-semibold text-[#4f6478] uppercase tracking-wide">
          {label}
        </span> */}
        <SelectValue
          // Hide the selected value text inside the trigger; keep the element
          // in the layout so spacing/height remain unchanged.
          className="text-[10px] font-semibold invisible"
          placeholder="All"
        />
      </SelectTrigger>
      <SelectContent className="rounded-md">
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function DashboardPage() {
  const today = new Date().toLocaleString(undefined, {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const fleetMarkers = [
    { left: '19%', top: '64%', status: 'active' },
    { left: '32%', top: '48%', status: 'idle' },
    { left: '46%', top: '58%', status: 'active' },
    { left: '58%', top: '43%', status: 'alert' },
    { left: '72%', top: '55%', status: 'active' },
    { left: '66%', top: '70%', status: 'idle' },
  ] as const;
  const markerStyles = {
    active: {
      dot: 'bg-[#3d6b8e]',
      halo: 'bg-[#3d6b8e]/30',
      ring: 'border-[#3d6b8e]/40',
    },
    idle: {
      dot: 'bg-[#e8622a]',
      halo: 'bg-[#e8622a]/30',
      ring: 'border-[#e8622a]/40',
    },
    alert: {
      dot: 'bg-[#DC2626]',
      halo: 'bg-[#DC2626]/30',
      ring: 'border-[#DC2626]/40',
    },
  } as const;

  const [vehicleFilter, setVehicleFilter] =
    useState<DashboardFilterValue>('All');
  const [regionFilter, setRegionFilter] = useState<DashboardFilterValue>('All');
  const [categoryFilter, setCategoryFilter] =
    useState<DashboardFilterValue>('All');
  const [subCategoryFilter, setSubCategoryFilter] =
    useState<DashboardFilterValue>('All');

  return (
    <div
      className={cn(
        TOKENS.pageBg,
        // Root container should not force viewport stretching.
        // Padding is for natural breathing room inside layout-19's scrollable <main>.
        'main-container pt-5 px-5 pb-6',
      )}
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-3">
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
              <button
                key={btn.label}
                className={cn(
                  'px-3 py-1.5 rounded-[6px] text-[10px] font-black uppercase tracking-wider transition-all duration-300 shadow-sm',
                  btn.type === 'primary'
                    ? 'bg-[linear-gradient(135deg,#e8622a,#f07a4a)] text-white shadow-[0_8px_20px_-6px_rgba(232,98,42,0.40)] hover:shadow-[0_12px_24px_-8px_rgba(232,98,42,0.50)] hover:scale-[1.03] active:scale-[0.97] border border-[#e8622a]/30'
                    : 'bg-[#eef4f8] text-[#3d6b8e] border border-[#d4e0ea] hover:bg-[#dce8f0] hover:shadow-md',
                )}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </header>

        <SectionWrapper>
          <div className="rounded-[8px] bg-[#eef4f8] p-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              <div>
                <span className="text-[10px] font-semibold text-[#4f6478] uppercase tracking-wide">
                  Vehicle Filter
                </span>
                <DashboardLabeledFilterSelect
                  label="Vehicle Filter"
                  value={vehicleFilter}
                  onValueChange={(v) =>
                    setVehicleFilter(v as DashboardFilterValue)
                  }
                  options={[
                    { value: 'All', label: 'All' },
                    { value: 'VH-001', label: 'VH-001' },
                    { value: 'VH-014', label: 'VH-014' },
                  ]}
                />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-[#4f6478] uppercase tracking-wide">
                  Region Filter
                </span>
                <DashboardLabeledFilterSelect
                  label="Region Filter"
                  value={regionFilter}
                  onValueChange={(v) =>
                    setRegionFilter(v as DashboardFilterValue)
                  }
                  options={[
                    { value: 'All', label: 'All' },
                    { value: 'North', label: 'North' },
                    { value: 'South', label: 'South' },
                  ]}
                />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-[#4f6478] uppercase tracking-wide">
                  Category Filter
                </span>
                <DashboardLabeledFilterSelect
                  label="Category Filter"
                  value={categoryFilter}
                  onValueChange={(v) =>
                    setCategoryFilter(v as DashboardFilterValue)
                  }
                  options={[
                    { value: 'All', label: 'All' },
                    { value: 'Delivery', label: 'Delivery' },
                    { value: 'Logistics', label: 'Logistics' },
                  ]}
                />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-[#4f6478] uppercase tracking-wide">
                  Sub-category Filter
                </span>
                <DashboardLabeledFilterSelect
                  label="Sub-category Filter"
                  value={subCategoryFilter}
                  onValueChange={(v) =>
                    setSubCategoryFilter(v as DashboardFilterValue)
                  }
                  options={[
                    { value: 'All', label: 'All' },
                    { value: 'Route A', label: 'Route A' },
                    { value: 'Route B', label: 'Route B' },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-3">
            {KPI_DATA.map((kpi) => {
              const variant = kpi.variant as keyof typeof SEMANTIC_COLORS;
              const colors = SEMANTIC_COLORS[variant];
              const Icon = kpi.icon;
              return (
                <div
                  key={kpi.label}
                  className={cn(
                    'bg-white',
                    TOKENS.cardRadius,
                    TOKENS.cardShadow,
                    'p-2 flex flex-col justify-between group transition-all duration-300 hover:translate-y-[-1px] relative overflow-hidden min-h-[64px] border border-transparent',
                  )}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{ backgroundColor: colors.main }}
                  />
                  <div className="flex flex-col justify-between h-full">
                    <p className="typo-kpi-label leading-tight">{kpi.label}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="typo-kpi">{kpi.value}</p>
                      <div
                        className={cn(
                          'w-6 h-6 rounded-md flex items-center justify-center transition-all group-hover:scale-105 shadow-[0_1px_3px_rgba(0,0,0,0.06)]',
                          colors.iconBg,
                        )}
                      >
                        <Icon
                          className="w-3.5 h-3.5"
                          style={{ color: colors.main }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-10">
            <Card
              variant="blue"
              important
              className="lg:col-span-7 p-2.5 h-full"
            >
              <SectionTitle title="Live Fleet Monitor" variant="blue" />
              <div className="relative h-[172px] overflow-hidden rounded-[8px] bg-[#e8eef4]">
                <div className="absolute inset-0 bg-[radial-gradient(#c8d5e2_1px,transparent_1px)] bg-[size:15px_15px] opacity-25" />
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                >
                  <rect x="0" y="0" width="100" height="100" fill="#eef4f8" />
                  <g opacity="0.9" fill="#d8e4ed">
                    <rect x="4" y="8" width="12" height="9" rx="1.2" />
                    <rect x="18" y="8" width="10" height="9" rx="1.2" />
                    <rect x="30" y="8" width="12" height="9" rx="1.2" />
                    <rect x="46" y="8" width="14" height="9" rx="1.2" />
                    <rect x="63" y="8" width="11" height="9" rx="1.2" />
                    <rect x="76" y="8" width="16" height="9" rx="1.2" />
                    <rect x="7" y="23" width="11" height="10" rx="1.2" />
                    <rect x="21" y="23" width="14" height="10" rx="1.2" />
                    <rect x="39" y="23" width="10" height="10" rx="1.2" />
                    <rect x="52" y="23" width="15" height="10" rx="1.2" />
                    <rect x="71" y="23" width="10" height="10" rx="1.2" />
                    <rect x="84" y="23" width="9" height="10" rx="1.2" />
                    <rect x="5" y="39" width="15" height="11" rx="1.2" />
                    <rect x="24" y="39" width="12" height="11" rx="1.2" />
                    <rect x="40" y="39" width="12" height="11" rx="1.2" />
                    <rect x="56" y="39" width="11" height="11" rx="1.2" />
                    <rect x="71" y="39" width="17" height="11" rx="1.2" />
                    <rect x="9" y="57" width="13" height="10" rx="1.2" />
                    <rect x="26" y="57" width="9" height="10" rx="1.2" />
                    <rect x="38" y="57" width="14" height="10" rx="1.2" />
                    <rect x="56" y="57" width="15" height="10" rx="1.2" />
                    <rect x="74" y="57" width="17" height="10" rx="1.2" />
                    <rect x="7" y="73" width="11" height="11" rx="1.2" />
                    <rect x="21" y="73" width="13" height="11" rx="1.2" />
                    <rect x="37" y="73" width="10" height="11" rx="1.2" />
                    <rect x="51" y="73" width="16" height="11" rx="1.2" />
                    <rect x="71" y="73" width="20" height="11" rx="1.2" />
                  </g>
                  <g
                    stroke="#f0f4f8"
                    strokeWidth="3.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.95"
                    fill="none"
                  >
                    <path d="M0 18 H100" />
                    <path d="M0 35 H100" />
                    <path d="M0 53 H100" />
                    <path d="M0 70 H100" />
                    <path d="M0 88 H100" />
                    <path d="M16 0 V100" />
                    <path d="M34 0 V100" />
                    <path d="M52 0 V100" />
                    <path d="M69 0 V100" />
                    <path d="M86 0 V100" />
                    <path d="M-4 82 L42 14 L104 2" />
                    <path d="M-3 5 L52 64 L104 99" />
                  </g>
                  <g
                    stroke="#c8d5e2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.8"
                    fill="none"
                  >
                    <path d="M0 26 H100" />
                    <path d="M0 44 H100" />
                    <path d="M0 62 H100" />
                    <path d="M0 79 H100" />
                    <path d="M25 0 V100" />
                    <path d="M43 0 V100" />
                    <path d="M61 0 V100" />
                    <path d="M78 0 V100" />
                  </g>
                </svg>

                <div className="absolute right-3 top-3 z-10 flex items-center gap-2 rounded-full bg-white px-2 py-1 shadow-sm">
                  <MapPinned className="h-3 w-3 text-[#3d6b8e]" />
                  <span className="text-[9px] font-black text-[#4f6478] uppercase tracking-widest">
                    Active View
                  </span>
                </div>

                {fleetMarkers.map((marker) => {
                  const styles = markerStyles[marker.status];
                  return (
                    <div
                      key={`${marker.left}-${marker.top}`}
                      className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2"
                      style={{ left: marker.left, top: marker.top }}
                    >
                      <div
                        className={cn(
                          'absolute -inset-1 rounded-full animate-pulse',
                          styles.halo,
                        )}
                      />
                      <div
                        className={cn(
                          'relative h-4 w-4 rounded-full border-[2px] border-white shadow-[0_4px_10px_rgba(15,23,42,0.2)]',
                          styles.dot,
                        )}
                      >
                        <div
                          className={cn(
                            'absolute -inset-1 rounded-full border',
                            styles.ring,
                          )}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-4 gap-2 mt-1.5">
                {[
                  ['Active Vehicles', '468'],
                  ['Moving Vehicles', '302'],
                  ['Idle Vehicles', '166'],
                  ['Avg Speed', '48 km/h'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="p-2 rounded-[8px] bg-[#f4f8fb] shadow-[0_1px_2px_rgba(37,61,89,0.06)] flex flex-col justify-center min-h-[48px]"
                  >
                    <p className="text-[9px] text-[#6b8299] font-black uppercase tracking-widest">
                      {label}
                    </p>
                    <p className="text-[13px] font-black text-[#1e3448] mt-0.5">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                {[
                  ['Active', 'bg-[#3d6b8e]'],
                  ['Idle', 'bg-[#e8622a]'],
                  ['Alert', 'bg-rose-500'],
                ].map(([label, cls]) => (
                  <div key={label} className="flex items-center gap-2">
                    <span
                      className={cn(
                        'h-2.5 w-2.5 rounded-full border border-white shadow-sm',
                        cls,
                      )}
                    />
                    <span className="text-[9px] font-bold text-[#5d7288] uppercase tracking-wider">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex flex-col gap-3 lg:col-span-3">
              <Card variant="secondaryBlue" className="p-2.5 flex-1 shadow-sm">
                <SectionTitle
                  title="Health & Compliance"
                  variant="secondaryBlue"
                />
                <div className="space-y-1.5">
                  {[
                    ['Roadworthy', '84%', 'text-[#e8622a]', 'bg-[#e8622a]'],
                    ['Off Road', '9%', 'text-[#3d6b8e]', 'bg-[#3d6b8e]'],
                    [
                      'Under Inspection',
                      '7%',
                      'text-[#5a8aad]',
                      'bg-[#5a8aad]',
                    ],
                  ].map(([label, val, color, bg]) => (
                    <div key={label} className="group">
                      <div className="flex items-center justify-between text-[10px] py-1 px-1">
                        <span className="font-bold text-[#4f6478]">
                          {label}
                        </span>
                        <span
                          className={cn('font-black tracking-tight', color)}
                        >
                          {val}
                        </span>
                      </div>
                      <div className="h-1 w-full bg-[#dce8f0] rounded-full overflow-hidden mx-1">
                        <div
                          className={cn('h-full rounded-full', bg)}
                          style={{ width: val }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <Card variant="green" className="flex-1 p-2.5 shadow-sm">
                <SectionTitle title="Efficiency Summary" variant="green" />
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    ['Checked %', '88%', '#e8622a'],
                    ['Not Checked %', '12%', '#3d6b8e'],
                    ['Safe %', '91%', '#22C55E'],
                    ['Unsafe %', '9%', '#DC2626'],
                  ].map(([label, val, barClr]) => (
                    <div
                      key={label}
                      className="p-1.5 rounded-lg bg-white shadow-sm group transition-colors"
                    >
                      <p className="text-[9px] font-black text-[#6b8299] uppercase tracking-widest">
                        {label}
                      </p>
                      <p className="text-[12px] font-black text-[#1e3448] flex items-center justify-between mt-0.5">
                        {val}
                        <span
                          className={cn(
                            'h-1 w-7 rounded-full bg-[#dce8f0] overflow-hidden',
                          )}
                        >
                          <span
                            className="h-full block rounded-full"
                            style={{ width: val, backgroundColor: barClr }}
                          />
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
            <Card variant="orange" className="lg:col-span-12 p-2.5">
              <SectionTitle
                title="Historical Safety & Risk Analysis"
                variant="orange"
              />
              <div className="h-[196px] mt-0 bg-white rounded-[8px] p-1.5 border border-transparent">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={HISTORICAL_SAFETY_DATA}
                    margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
                  >
                    <CartesianGrid
                      vertical={false}
                      stroke="#d4e0ea"
                      strokeDasharray="3 3"
                      opacity={0.4}
                    />
                    <XAxis
                      dataKey="m"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }}
                    />
                    <Tooltip
                      cursor={{ fill: '#eef4f8' }}
                      contentStyle={{
                        border: 'none',
                        borderRadius: 12,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                        background: '#ffffff',
                      }}
                    />
                    <Bar
                      dataKey="low"
                      name="Low Risk"
                      stackId="a"
                      fill="#FED7AA"
                      barSize={32}
                    />
                    <Bar
                      dataKey="med"
                      name="Medium Risk"
                      stackId="a"
                      fill="#e8622a"
                      barSize={32}
                    />
                    <Bar
                      dataKey="high"
                      name="High Risk"
                      stackId="a"
                      fill="#DC2626"
                      barSize={32}
                      radius={[4, 4, 0, 0]}
                    />
                    <Line
                      type="monotone"
                      name="Trend"
                      dataKey="trend"
                      stroke="#3d6b8e"
                      strokeWidth={2}
                      dot={{ r: 4, fill: '#3d6b8e' }}
                    />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      iconType="circle"
                      wrapperStyle={{
                        fontSize: '10px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        paddingBottom: '10px',
                      }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 items-stretch">
            <Card
              variant="orange"
              className="lg:col-span-4 p-2.5 h-full flex flex-col min-h-0"
            >
              <SectionTitle
                title="Maintenance & Alerts"
                variant="orange"
                className="text-base"
              />
              <div className="grid grid-cols-3 gap-1.5 mb-1.5">
                {[
                  ['Scheduled', '23', 'bg-[#eef4f8]'],
                  ['Overdue', '8', 'bg-[#FEECEC]'],
                  ['Workshop', '17', 'bg-[#fdeee6]'],
                ].map(([label, val, bg]) => (
                  <div
                    key={label}
                    className={cn('p-1.5 rounded-[8px] bg-white shadow-sm', bg)}
                  >
                    <p className="text-[9px] font-black text-[#6b8299] uppercase tracking-widest text-center">
                      {label}
                    </p>
                    <p className="text-[13px] font-black text-[#1e3448] text-center mt-0">
                      {val}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-auto space-y-1.5">
                {[
                  ['High priority', '12', 'text-[#DC2626]', '#DC2626'],
                  ['Medium priority', '24', 'text-[#e8622a]', '#e8622a'],
                  ['Low priority', '41', 'text-[#5a8aad]', '#5a8aad'],
                ].map(([label, val, color, barClr]) => (
                  <div key={label} className="space-y-1.5 px-0.5">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-medium text-slate-600 uppercase tracking-widest text-[9px]">
                        {label}
                      </span>
                      <span className={cn('font-black', color)}>{val}</span>
                    </div>
                    <div className="h-1 w-full bg-[#dce8f0] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(parseInt(val) / 50) * 100}%`,
                          backgroundColor: barClr,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card
              variant="secondaryBlue"
              className="lg:col-span-4 p-2.5 h-full flex flex-col min-h-0"
            >
              <SectionTitle
                title="Upcoming Inspections"
                variant="secondaryBlue"
                className="text-base"
              />
              <div className="mt-auto flex flex-col gap-2">
                {[
                  '08:30 VH-141 pre-trip check',
                  '10:15 VH-207 brake review',
                  '13:00 VH-080 annual fitness',
                ].map((item) => (
                  <div
                    key={item}
                    className="px-3 py-2 text-sm font-medium text-slate-700 bg-[#f4f8fb] border border-[#d4e0ea] rounded-md hover:bg-[#eef4f8] transition-colors border-l-2 border-[#3d6b8e]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Card>
            <Card
              variant="blue"
              className="lg:col-span-4 p-2.5 h-full flex flex-col min-h-0"
            >
              <SectionTitle
                title="Upcoming Expiries"
                variant="blue"
                className="text-base"
              />
              <div className="mt-auto flex flex-col gap-2">
                {[
                  'VH-058 insurance in 4 days',
                  'VH-221 permit in 6 days',
                  'VH-099 emission cert in 9 days',
                ].map((item) => (
                  <div
                    key={item}
                    className="px-3 py-2 text-sm font-medium text-slate-700 bg-[#f4f8fb] border border-[#d4e0ea] rounded-md hover:bg-[#eef4f8] transition-colors border-l-2 border-[#3d6b8e]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className="flex flex-col gap-3">
            <Card variant="green" className="p-2.5">
              <SectionTitle
                title="Fleet Performance & Efficiency Trends"
                variant="green"
              />
              <div className="mt-0 h-[196px] rounded-[8px] border border-transparent bg-white p-1.5">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={PERFORMANCE_EFFICIENCY_DATA}
                    margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                  >
                    <CartesianGrid
                      vertical={false}
                      stroke="#d4e0ea"
                      strokeDasharray="3 3"
                    />
                    <XAxis
                      dataKey="m"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                    />
                    <YAxis
                      yAxisId="left"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                    />
                    <Tooltip
                      contentStyle={{
                        border: 'none',
                        borderRadius: 12,
                        boxShadow: '0 12px 24px rgba(0,0,0,0.05)',
                        background: '#fff',
                      }}
                    />
                    <Area
                      yAxisId="left"
                      name="Fuel Efficiency"
                      type="monotone"
                      dataKey="fuel"
                      stroke="#e8622a"
                      strokeWidth={2.2}
                      fill="transparent"
                      dot={{ r: 3, fill: '#e8622a' }}
                    />
                    <Area
                      yAxisId="right"
                      name="System Performance"
                      type="monotone"
                      dataKey="eff"
                      stroke="#3d6b8e"
                      strokeWidth={2.2}
                      fill="transparent"
                      dot={{ r: 3, fill: '#3d6b8e' }}
                    />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      iconType="circle"
                      wrapperStyle={{
                        fontSize: '9px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        paddingBottom: '10px',
                        letterSpacing: '0.05em',
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card variant="orange" className="p-2.5">
              <SectionTitle
                title="Regulatory Violations & Geofence Breaches"
                variant="orange"
              />
              <div className="mt-0 h-[196px] rounded-[8px] border border-transparent bg-white p-1.5">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={VIOLATIONS_DATA}
                    margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
                  >
                    <CartesianGrid
                      vertical={false}
                      stroke="#d4e0ea"
                      strokeDasharray="3 3"
                    />
                    <XAxis
                      dataKey="m"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                    />
                    <Tooltip
                      contentStyle={{
                        border: 'none',
                        borderRadius: 12,
                        boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
                        background: '#fff',
                      }}
                    />
                    <Bar
                      dataKey="tr105"
                      name="Primary"
                      fill="#e8622a"
                      barSize={10}
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="vm002"
                      name="Comparison"
                      fill="#3d6b8e"
                      barSize={10}
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="vh122"
                      name="Anomaly"
                      fill="#DC2626"
                      barSize={10}
                      radius={[2, 2, 0, 0]}
                    />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      iconType="circle"
                      wrapperStyle={{
                        fontSize: '9px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        paddingBottom: '10px',
                        letterSpacing: '0.05em',
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
            <div className="flex flex-col gap-3 lg:col-span-8">
              <Card
                variant="green"
                className="p-0 overflow-hidden flex flex-col flex-1"
              >
                <div className="p-2 bg-white">
                  <SectionTitle
                    title="High Performing Drivers"
                    variant="green"
                  />
                </div>
                <div className="flex-1 min-h-0 overflow-x-auto p-2">
                  <table className="w-full text-left drivers-table">
                    <thead>
                      <tr className={dashboardTableHeaderRowClass}>
                        {[
                          'Driver',
                          'Score',
                          'Rating',
                          'Performance',
                          'Trend',
                        ].map((h) => (
                          <th
                            key={h}
                            className={cn(
                              dashboardTableHeaderCellClass,
                              'px-3 py-2',
                              h === 'Trend' && 'text-center',
                            )}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {DRIVERS.map((d, i) => (
                        <tr
                          key={d.name}
                          className={cn(
                            'group transition-all duration-150 border-b border-slate-100/50 hover:bg-slate-50/40',
                            i % 2 === 1 && 'bg-slate-50/20',
                          )}
                        >
                          <td className="h-[40px] px-3 align-middle">
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  'w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-medium text-[#22C55E] border border-[#22C55E]/20 shadow-sm bg-white',
                                )}
                              >
                                {d.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </div>
                              <span className="text-[11px] font-medium text-[#2e4258]">
                                {d.name}
                              </span>
                            </div>
                          </td>
                          <td className="h-[40px] px-3 align-middle text-[11px] font-medium text-[#2e4258]">
                            {d.score}
                          </td>
                          <td className="h-[40px] px-3 align-middle">
                            <div className="flex items-center gap-1 font-medium text-[#e8622a] text-[9px] bg-[#fdeee6] w-fit px-2 py-0.5 rounded-full border border-[#e8622a]/20">
                              {d.rating}{' '}
                              <Star className="w-2.5 h-2.5 fill-current" />
                            </div>
                          </td>
                          <td className="h-[40px] px-3 align-middle">
                            <div className="flex items-center gap-2 w-20">
                              <div className="flex-1 h-1 bg-[#dce8f0] rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: `${d.perf}%`,
                                    backgroundColor:
                                      d.perf > 85 ? '#22C55E' : '#e8622a',
                                  }}
                                />
                              </div>
                              <span className="text-[9px] font-medium text-[#2e4258]">
                                {d.perf}%
                              </span>
                            </div>
                          </td>
                          <td className="h-[40px] px-3 align-middle text-center">
                            {d.trend === 'up' ? (
                              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500 inline" />
                            ) : (
                              <ArrowDownRight className="w-3.5 h-3.5 text-rose-500 inline" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card
                variant="blue"
                className="p-0 overflow-hidden flex flex-col flex-1"
              >
                <div className="p-2 bg-white">
                  <SectionTitle title="Recent Trips" variant="blue" />
                </div>
                <div className="flex-1 min-h-0 overflow-x-auto p-2">
                  <table className="w-full text-left">
                    <thead>
                      <tr className={dashboardTableHeaderRowClass}>
                        {['Trip', 'Route', 'Duration', 'Status', 'Type'].map(
                          (h) => (
                            <th
                              key={h}
                              className={cn(dashboardTableHeaderCellClass, 'px-3 py-2')}
                            >
                              {h}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {TRIPS.map((t, i) => (
                        <tr
                          key={t.id}
                          className={cn(
                            'group transition-all duration-150 border-b border-slate-100/50 hover:bg-slate-50/40',
                            i % 2 === 1 && 'bg-slate-50/20',
                          )}
                        >
                          <td className="h-[40px] px-3 align-middle">
                            <div className="flex items-center gap-2 font-medium text-[#2e4258] text-[11px]">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#3d6b8e]" />
                              {t.id}
                            </div>
                          </td>
                          <td className="h-[40px] px-3 align-middle text-[11px] font-medium text-[#2e4258]">
                            {t.route}
                          </td>
                          <td className="h-[40px] px-3 align-middle text-[11px] font-medium text-[#2e4258]">
                            {t.dur}
                          </td>
                          <td className="h-[40px] px-3 align-middle">
                            <span
                              className={cn(
                                'px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider border',
                                t.status === 'Completed'
                                  ? 'bg-[#EAF9F0] text-[#22C55E] border-[#22C55E]/20'
                                  : 'bg-[#fdeee6] text-[#e8622a] border-[#e8622a]/20',
                              )}
                            >
                              {t.status}
                            </span>
                          </td>
                          <td className="h-[40px] px-3 align-middle">
                            <span className="px-2 py-0.5 rounded-full bg-[#eef4f8] text-[#5a8aad] text-[9px] font-medium uppercase tracking-widest">
                              {t.type}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-4">
              <Card variant="blue" className="p-2 flex-1">
                <SectionTitle
                  title="Recent Activity"
                  variant="blue"
                  className="text-base"
                />
                <div className="space-y-1 relative">
                  {ACTIVITY.map((item) => (
                    <div key={item.title} className="flex gap-2 relative z-10">
                      <div className="w-2 h-2 rounded-full border-2 border-white shadow-md mt-0.5 shrink-0 bg-[#3d6b8e]" />
                      <div>
                        <h4 className="text-[13px] font-medium text-slate-800 leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-[13px] text-slate-700 font-medium mt-0.5 leading-tight">
                          {item.desc}
                        </p>
                        <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest mt-0.5 block">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="absolute bottom-2 left-[4.5px] top-[10px] w-px bg-[#dce8f0]" />
                </div>
              </Card>

              <Card variant="secondaryBlue" className="p-2 flex-1">
                <SectionTitle title="Workshop Status" variant="secondaryBlue" />
                <div className="space-y-1">
                  {[
                    { l: 'Bay occupancy', p: 78, c: '#22C55E' },
                    { l: 'Turnaround', p: 64, c: '#e8622a' },
                    { l: 'Technician availability', p: 83, c: '#3d6b8e' },
                  ].map((item) => (
                    <div key={item.l} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black text-[#6b8299] uppercase tracking-widest">
                          {item.l}
                        </span>
                        <span className="text-[10px] font-black text-[#1e3448]">
                          {item.p}%
                        </span>
                      </div>
                      <div className="h-1 bg-[#dce8f0] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${item.p}%`,
                            backgroundColor: item.c,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card variant="orange" className="p-2 flex-1">
                <SectionTitle title="Work Orders" variant="orange" />
                <div className="grid grid-cols-3 gap-1 text-center mt-0">
                  {[
                    {
                      label: 'Open',
                      val: '18',
                      clr: 'text-rose-500',
                      bg: 'bg-rose-50',
                      border: 'border-rose-100',
                    },
                    {
                      label: 'Ongoing',
                      val: '27',
                      clr: 'text-orange-500',
                      bg: 'bg-orange-50',
                      border: 'border-orange-100',
                    },
                    {
                      label: 'Done',
                      val: '45',
                      clr: 'text-emerald-500',
                      bg: 'bg-emerald-50',
                      border: 'border-emerald-100',
                    },
                  ].map(({ label, val, clr, bg, border }) => (
                    <div
                      key={label}
                      className={cn(
                        'p-1 rounded-lg shadow-sm border',
                        bg,
                        border,
                      )}
                    >
                      <p className="text-[8px] font-black text-[#6b8299] uppercase tracking-widest">
                        {label}
                      </p>
                      <p className={cn('text-[14px] font-black mt-[1px]', clr)}>
                        {val}
                      </p>
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
