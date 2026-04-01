import { useState, type ReactNode } from 'react';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Bell,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Ellipsis,
  Gauge,
  Leaf,
  Menu,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Truck,
} from 'lucide-react';
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { cn } from '@/lib/utils';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { PAGE_SURFACE_FOOTER_PADDING, PageSurface } from '@/components/layout';

type TabOption = { id: string; label: string };
type StatusTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';
type KpiTone = 'fleet' | 'fuel' | 'distance' | 'active' | 'safety';

const DASHBOARD_TOKENS = {
  pageBg: 'bg-[#f1f5f9]',
  sectionSurface: 'rounded-[16px] bg-[#f8fafc]/50 p-2',
  sectionGap: 'gap-2.5',
  cardSurface: 'rounded-[12px] bg-white border border-slate-200/60 shadow-sm',
  cardPadding: 'p-3.5',
  cardRadius: 'rounded-[12px]',
  cardBorder: 'border border-slate-200/60',
  cardShadow: 'shadow-sm',
};

const TOP_TABS: TabOption[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'vehicles', label: 'Vehicles' },
  { id: 'drivers', label: 'Drivers' },
  { id: 'maintenance', label: 'Maintenance' },
];

const ANALYTICS_TABS: TabOption[] = [
  { id: 'fleet-analytics', label: 'Fleet Analytics' },
  { id: 'driver-insights', label: 'Driver Insights' },
  { id: 'recent-activity', label: 'Recent Activity' },
];

const KPI_CARDS = [
  {
    label: 'Fleet Score',
    value: '95.3%',
    sub: 'From 30-day trend score',
    progress: 95,
    topBorder: 'border-t-[#10b981]',
    tone: 'fleet' as KpiTone,
  },
  {
    label: 'Fuel Efficiency',
    value: '4.48 L/km',
    sub: 'Under target by 1.2%',
    progress: 79,
    topBorder: 'border-t-[#3b82f6]',
    tone: 'fuel' as KpiTone,
  },
  {
    label: 'Avg. Daily Distance',
    value: '44.6 km',
    sub: 'Across all active routes',
    progress: 63,
    topBorder: 'border-t-[#3b82f6]',
    tone: 'distance' as KpiTone,
  },
  {
    label: 'Active Vehicles',
    value: '54K',
    sub: '2,151 currently online',
    progress: 88,
    topBorder: 'border-t-[#f59e0b]',
    tone: 'active' as KpiTone,
  },
  {
    label: 'Safety Events',
    value: '95.3%',
    sub: 'Compliant incidents',
    progress: 84,
    topBorder: 'border-t-[#10b981]',
    tone: 'safety' as KpiTone,
  },
];

const LIVE_ROWS = [
  {
    vehicle: 'Ford Transit',
    driver: 'Adam Lowell',
    status: 'Active',
    lastActive: '11 minutes ago',
    location: 'South Quarter',
  },
  {
    vehicle: 'Toyota Hilux',
    driver: 'Ruben Perez',
    status: 'Idle',
    lastActive: '26 minutes ago',
    location: 'Customs Gate',
  },
  {
    vehicle: 'Nissan Leaf',
    driver: 'Emma Brown',
    status: 'Driver Alert',
    lastActive: '36 minutes ago',
    location: 'Northfront',
  },
];

const INSPECTION_ROWS = [
  [
    'Ford Transit',
    'Inspection',
    'Apr 06, 2026',
    'Overdue',
    'Adam Lowell',
    'Brake pad wear',
  ],
  [
    'Toyota Hilux',
    'Engine Service',
    'Apr 09, 2026',
    'Due Soon',
    'Ruben Perez',
    'Oil change + filter',
  ],
  [
    'Nissan Leaf',
    'Safety Service',
    'Apr 12, 2026',
    'Scheduled',
    'Emma Brown',
    'ABS sensor check',
  ],
  [
    'Mercedes Sprinter',
    'Inspection',
    'Apr 15, 2026',
    'Scheduled',
    'Ali Kareem',
    'Tire rotation',
  ],
];

const DRIVER_METRIC_ROWS = [
  ['1221', '16.007', 'Watch', 'Due Soon', 'Overdue'],
  ['2201', '16.048', 'Safety Device', 'Due Soon', 'Overdue'],
  ['2601', '16.002', 'Dispatch Patrol', 'Due Soon', 'On route'],
  ['2001', '16.003', 'Safety Device', 'Out Soon', 'On route'],
];

const DOWNTIME_DATA = [
  { month: 'JAN', value: 58 },
  { month: 'FEB', value: 66 },
  { month: 'MAR', value: 62 },
  { month: 'APR', value: 70 },
  { month: 'MAY', value: 56 },
  { month: 'JUN', value: 52 },
  { month: 'JUL', value: 49 },
  { month: 'AUG', value: 54 },
  { month: 'SEP', value: 61 },
  { month: 'OCT', value: 57 },
  { month: 'NOV', value: 68 },
  { month: 'DEC', value: 63 },
];

const FLEET_COMPOSITION_DATA = [
  { type: 'Light Duty', active: 38, maintenance: 8, offline: 3 },
  { type: 'Medium Duty', active: 35, maintenance: 10, offline: 4 },
  { type: 'Heavy Duty', active: 31, maintenance: 9, offline: 5 },
  { type: 'Electric', active: 16, maintenance: 6, offline: 2 },
  { type: 'Other', active: 14, maintenance: 4, offline: 2 },
];

const VEHICLE_STATS = [
  ['Total Vehicles', '615', 'Fleet registered'],
  ['Roadworthy Vehicles', '539', '87.6% healthy'],
  ['Vehicles Off Road', '37', '6.0% VOR'],
  ['Vehicles Other', '39', '6.3% mixed'],
];

const VEHICLE_DONUT_DATA = [
  { name: 'Roadworthy', value: 539, color: '#3E5F82' },
  { name: 'Off Road', value: 37, color: '#EB7A45' },
  { name: 'Other', value: 39, color: '#C9D3DB' },
];

const CHECKS_KPI_DATA = [
  {
    label: 'Completed',
    value: '482',
    color: '#10b981',
    bg: '#e9f9ef',
    icon: CheckCircle2,
  },
  {
    label: 'At Risk / Alerts',
    value: '43',
    color: '#ef4444',
    bg: '#fdecec',
    icon: AlertCircle,
  },
  {
    label: 'Upcoming / Checks',
    value: '86',
    color: '#3b82f6',
    bg: '#eaf1ff',
    icon: Activity,
  },
  {
    label: 'Avg Metrics',
    value: '84.6',
    color: '#8b5cf6',
    bg: '#f2ecff',
    icon: Calendar,
  },
];

const SECONDARY_METRICS_DATA = [
  { label: 'Compliance', value: '95.3%' },
  { label: 'Service', value: '1,204' },
  { label: 'Inspection', value: '86' },
  { label: 'Safety Check', value: '312' },
];

const CHECKS_CHART_DATA = [
  { name: 'Completed', value: 482, color: '#10b981' },
  { name: 'Ongoing', value: 86, color: '#3b82f6' },
  { name: 'Pending', value: 133, color: '#f59e0b' },
  { name: 'Alerts', value: 43, color: '#ef4444' },
];

const VOR_DATA = [
  { vehicle: 'Transit', available: 94, offRoad: 10 },
  { vehicle: 'Hilux', available: 88, offRoad: 7 },
  { vehicle: 'Leaf', available: 74, offRoad: 14 },
  { vehicle: 'Sprinter', available: 69, offRoad: 8 },
  { vehicle: 'Actros', available: 52, offRoad: 6 },
];

const INSPECTION_BUCKETS = [
  {
    title: 'Overdue',
    accent: 'text-[#B91C1C] bg-[#FEF2F2]',
    stats: [
      ['ADR', 8],
      ['Annual', 6],
      ['PMI', 9],
      ['Service', 11],
    ],
  },
  {
    title: 'Next 7 days',
    accent: 'text-[#B45309] bg-[#FFFBEB]',
    stats: [
      ['ADR', 12],
      ['Annual', 7],
      ['PMI', 10],
      ['Service', 9],
    ],
  },
  {
    title: '8-14 days',
    accent: 'text-[#15803D] bg-[#F0FDF4]',
    stats: [
      ['ADR', 14],
      ['Annual', 9],
      ['PMI', 12],
      ['Service', 8],
    ],
  },
  {
    title: '15-30 days',
    accent: 'text-[#15803D] bg-[#F0FDF4]',
    stats: [
      ['ADR', 18],
      ['Annual', 11],
      ['PMI', 15],
      ['Service', 12],
    ],
  },
];

const EXPIRE_BUCKETS = [
  {
    title: 'Overdue',
    accent: 'text-[#B91C1C] bg-[#FEF2F2]',
    stats: [
      ['MOT', 4],
      ['Insurance', 5],
      ['Permit', 3],
      ['Road Tax', 7],
    ],
  },
  {
    title: 'Next 7 days',
    accent: 'text-[#B45309] bg-[#FFFBEB]',
    stats: [
      ['MOT', 9],
      ['Insurance', 8],
      ['Permit', 6],
      ['Road Tax', 10],
    ],
  },
  {
    title: '8-14 days',
    accent: 'text-[#15803D] bg-[#F0FDF4]',
    stats: [
      ['MOT', 11],
      ['Insurance', 7],
      ['Permit', 8],
      ['Road Tax', 9],
    ],
  },
  {
    title: '15-30 days',
    accent: 'text-[#15803D] bg-[#F0FDF4]',
    stats: [
      ['MOT', 13],
      ['Insurance', 10],
      ['Permit', 9],
      ['Road Tax', 11],
    ],
  },
];

function Card({
  title,
  right,
  children,
  className,
}: {
  title?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        DASHBOARD_TOKENS.cardSurface,
        DASHBOARD_TOKENS.cardPadding,
        className,
      )}
    >
      {(title || right) && (
        <header className="mb-3 flex items-center justify-between gap-2.5">
          {title ? (
            <h3 className="text-[14px] font-semibold tracking-tight text-slate-700">
              {title}
            </h3>
          ) : (
            <span />
          )}
          {right}
        </header>
      )}
      {children}
    </section>
  );
}

const ShellCard = Card;

function SectionContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn(DASHBOARD_TOKENS.sectionSurface, className)}>
      {children}
    </section>
  );
}

const SectionWrapper = SectionContainer;

function SectionHeader({
  title,
  right,
  className,
}: {
  title: string;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mb-0.5 flex items-center justify-between', className)}>
      <h3 className="text-[15px] font-semibold tracking-tight text-[#274867]">
        {title}
      </h3>
      {right}
    </div>
  );
}

function PillTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: TabOption[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-[11px] border border-slate-200 bg-white p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            'rounded-[8px] px-3 py-1.5 text-xs font-medium text-[#4f647a] transition-all',
            active === tab.id &&
              'bg-[#2f5f90] text-white shadow-[0_6px_14px_-12px_rgba(25,54,87,0.28)]',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

const Tabs = PillTabs;

function MiniSelect({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-8 items-center gap-1.5 rounded-[9px] border border-[#d7e3ef] bg-white px-2.5 text-xs text-[#365068] shadow-[0_8px_18px_-16px_rgba(15,23,42,0.24)]"
    >
      {label}
      <ChevronDown className="h-3.5 w-3.5" />
    </button>
  );
}

const Filters = MiniSelect;

function IconButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded-[9px] border border-[#d7e3ef] bg-white text-[#41566b] shadow-[0_8px_18px_-16px_rgba(15,23,42,0.24)]"
    >
      {children}
    </button>
  );
}

function FilterSelect({ label }: { label: string }) {
  return <Filters label={label} />;
}

function TabGroup(props: {
  tabs: TabOption[];
  active: string;
  onChange: (id: string) => void;
}) {
  return <Tabs {...props} />;
}

function StatusBadge({
  tone,
  children,
}: {
  tone: StatusTone;
  children: ReactNode;
}) {
  const tones: Record<StatusTone, string> = {
    success: 'bg-[#F0FDF4] text-[#15803D]',
    warning: 'bg-[#FFFBEB] text-[#B45309]',
    danger: 'bg-[#FEF2F2] text-[#B91C1C]',
    info: 'bg-cyan-50 text-cyan-700',
    neutral: 'bg-[#edf2f7] text-[#2F4B69]',
  };
  return (
    <span
      className={cn(
        'inline-flex w-fit rounded-full px-2 py-0.5 text-[11px] font-medium',
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

function KpiCard({
  label,
  value,
  sub,
  progress,
  topBorder,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  progress: number;
  topBorder: string;
  tone: KpiTone;
}) {
  const toneStyles: Record<
    KpiTone,
    { icon: ReactNode; iconWrap: string; progress: string; subAccent?: string }
  > = {
    fleet: {
      icon: <ShieldCheck className="h-3.5 w-3.5 text-[#2F5D8A]" />,
      iconWrap: 'bg-[#EEF5FF]',
      progress: 'bg-[#22C55E]',
      subAccent: 'text-[#15803D]',
    },
    fuel: {
      icon: <Leaf className="h-3.5 w-3.5 text-[#DE7440]" />,
      iconWrap: 'bg-[#FFF4ED]',
      progress: 'bg-[#F59E0B]',
    },
    distance: {
      icon: <Gauge className="h-3.5 w-3.5 text-[#0891B2]" />,
      iconWrap: 'bg-[#ECFEFF]',
      progress: 'bg-[#06B6D4]',
    },
    active: {
      icon: <Truck className="h-3.5 w-3.5 text-[#2F5D8A]" />,
      iconWrap: 'bg-[#EEF5FF]',
      progress: 'bg-[#2F5D8A]',
    },
    safety: {
      icon: <AlertTriangle className="h-3.5 w-3.5 text-[#DC2626]" />,
      iconWrap: 'bg-[#FEF2F2]',
      progress: 'bg-[#EF4444]',
      subAccent: 'text-[#B45309]',
    },
  };
  const toneStyle = toneStyles[tone];

  return (
    <ShellCard
      className={cn(
        'flex h-[118px] flex-col border-t-[5px] bg-white p-3',
        DASHBOARD_TOKENS.cardShadow,
        topBorder,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.03em] text-[#355779]">
          {label}
        </p>
        <span
          className={cn(
            'inline-flex h-6 w-6 items-center justify-center rounded-full',
            toneStyle.iconWrap,
          )}
        >
          {toneStyle.icon}
        </span>
      </div>
      <p className="mt-1 text-[24px] leading-none font-bold tracking-tight text-[#18324c]">
        {value}
      </p>
      <p
        className={cn('mt-0.5 text-[11px] text-[#4f6f8e]', toneStyle.subAccent)}
      >
        {sub}
      </p>
      <div className="mt-auto h-1.5 overflow-hidden rounded-full bg-[#e5edf6]">
        <div
          className={cn('h-full rounded-full', toneStyle.progress)}
          style={{ width: `${progress}%` }}
        />
      </div>
    </ShellCard>
  );
}

function MiniStatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div
      className={cn(
        DASHBOARD_TOKENS.cardRadius,
        DASHBOARD_TOKENS.cardBorder,
        'bg-white p-2',
      )}
    >
      <p className="text-[10px] text-[#5e7690]">{label}</p>
      <p className="mt-0.5 text-[19px] leading-none font-semibold text-[#1f3954]">
        {value}
      </p>
      <p className="text-[10px] text-[#6f859a]">{sub}</p>
    </div>
  );
}

function ChartCard({
  title,
  className,
  children,
  right,
}: {
  title: string;
  className?: string;
  children: ReactNode;
  right?: ReactNode;
}) {
  return (
    <ShellCard
      title={title}
      right={right}
      className={cn('border-t-[3px] border-t-[#295b89] p-3', className)}
    >
      {children}
    </ShellCard>
  );
}

function TableCard({
  title,
  right,
  children,
  className,
}: {
  title: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <ShellCard title={title} right={right} className={cn('p-3', className)}>
      {children}
    </ShellCard>
  );
}

function InsightRow({
  label,
  value,
  percent,
}: {
  label: string;
  value: string;
  percent: number;
}) {
  const severityTone =
    percent >= 65 ? 'critical' : percent >= 40 ? 'warning' : 'normal';
  const barClass =
    severityTone === 'critical'
      ? 'bg-[#EF4444]'
      : severityTone === 'warning'
        ? 'bg-[#F59E0B]'
        : 'bg-[#2F5D8A]';

  return (
    <div className="space-y-0.5 border-b border-[rgba(42,72,104,0.1)] pb-1">
      <div className="flex items-center justify-between text-[12px]">
        <span className="text-[#5f7690]">{label}</span>
        <span className="font-medium text-[#1f3954]">{value}</span>
      </div>
      <div className="h-[3px] overflow-hidden rounded-full bg-[#e6eef7]">
        <div
          className={cn('h-[3px] rounded-full', barClass)}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function ScheduleItem({
  task,
  due,
  count,
}: {
  task: string;
  due: string;
  count: string;
}) {
  return (
    <div
      className="flex items-center justify-between rounded-[9px] bg-white px-2 py-1 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.28)] transition-colors hover:bg-[#f1f7fd]"
      style={{ borderLeft: '3px solid #DE7440' }}
    >
      <div>
        <span className="block text-[13px] text-[#35506a]">{task}</span>
        <span className="block text-[10px] text-[#647f97]">Due in {due}</span>
      </div>
      <span className="text-sm font-medium text-[#2F4B69]">{count}</span>
    </div>
  );
}

function ComplianceMiniCard({
  title,
  accent,
  stats,
}: {
  title: string;
  accent: string;
  stats: (string | number)[][];
}) {
  return (
    <ShellCard className="p-2">
      <div
        className={cn(
          'mb-1 inline-flex rounded-full px-1.5 py-0.5 text-[10px] font-medium',
          accent,
        )}
      >
        {title}
      </div>
      <div className="grid grid-cols-2 gap-x-1.5 gap-y-0.5">
        {stats.map(([label, value]) => (
          <div
            key={String(label)}
            className="flex items-center justify-between text-[11px]"
          >
            <span className="text-[#5f7690]">{label}</span>
            <span className="font-medium text-[#1f3954]">{value}</span>
          </div>
        ))}
      </div>
    </ShellCard>
  );
}

function ChartTooltipCard({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-[#d7e3ef] bg-white px-2 py-1.5 text-xs shadow-[0_8px_18px_-16px_rgba(15,23,42,0.24)]">
      <p className="font-medium text-[#2F4B69]">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} className="text-[#5b6f84]">
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const [topTab, setTopTab] = useState('overview');
  const [analyticsTab, setAnalyticsTab] = useState('fleet-analytics');

  return (
    <PageSurface padding={PAGE_SURFACE_FOOTER_PADDING} fill sectionGap="none">
      <PageSurface.Body
        className={cn(
          'min-h-0 flex-1 overflow-hidden',
          DASHBOARD_TOKENS.pageBg,
        )}
      >
        <DashboardShell className="px-3 py-3 lg:px-4 lg:py-4">
          <div
            className={cn(
              'mx-auto flex w-full max-w-[1380px] min-w-0 flex-col pb-1',
              DASHBOARD_TOKENS.sectionGap,
            )}
          >
            <header className="flex items-center justify-between rounded-[10px] bg-white px-4 py-3 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.28)]">
              <div className="flex items-center gap-3">
                <IconButton>
                  <Menu className="h-3.5 w-3.5" />
                </IconButton>
                <h1 className="text-[21px] font-semibold tracking-tight text-[#2F4B69]">
                  Overview
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <IconButton>
                  <Bell className="h-3.5 w-3.5" />
                </IconButton>
                <IconButton>
                  <Settings className="h-3.5 w-3.5" />
                </IconButton>
                <button
                  type="button"
                  className="inline-flex h-8 items-center gap-2 rounded-[9px] border border-[#d7e3ef] bg-white px-2.5 shadow-[0_8px_18px_-16px_rgba(15,23,42,0.24)]"
                >
                  <span className="h-6 w-6 rounded-full bg-gradient-to-br from-[#d9e3ed] to-[#c9d3db]" />
                  <span className="text-xs font-medium text-[#365068]">
                    Roland Anderson
                  </span>
                </button>
                <MiniSelect label="All Regions" />
              </div>
            </header>

            <div className="flex items-center gap-1.5">
              <FilterSelect label="All Regions" />
              <FilterSelect label="Category" />
              <FilterSelect label="Sub Category" />
            </div>

            <div>
              <TabGroup tabs={TOP_TABS} active={topTab} onChange={setTopTab} />
            </div>

            <SectionWrapper>
              <section className="grid min-w-0 grid-cols-5 gap-2.5">
                {KPI_CARDS.map((kpi) => (
                  <KpiCard key={kpi.label} {...kpi} />
                ))}
              </section>
            </SectionWrapper>

            <SectionWrapper>
              <section className="grid min-w-0 grid-cols-12 items-stretch gap-2.5">
                <ShellCard
                  title="Vehicle Statistics"
                  className="col-span-7 h-full p-2.5"
                >
                  <div className="grid grid-cols-[1.5fr_.9fr] gap-2">
                    <div className="grid grid-cols-2 gap-1.5">
                      {VEHICLE_STATS.map(([label, value, sub]) => (
                        <MiniStatCard
                          key={label}
                          label={label}
                          value={value}
                          sub={sub}
                        />
                      ))}
                    </div>
                    <div className="rounded-[10px] bg-white p-1.5 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.28)]">
                      <p className="mb-1 text-[10px] text-[#607b94]">
                        Fleet distribution
                      </p>
                      <div className="h-[132px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={VEHICLE_DONUT_DATA}
                              dataKey="value"
                              innerRadius={32}
                              outerRadius={50}
                              paddingAngle={2}
                            >
                              {VEHICLE_DONUT_DATA.map((entry) => (
                                <Cell key={entry.name} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip content={<ChartTooltipCard />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span
                      className="h-6 w-6 rounded-full"
                      style={{
                        background:
                          'conic-gradient(#22c55e 87.6%, #e2e8f0 87.6%)',
                      }}
                    />
                    <span className="text-[11px] text-[#607b94]">
                      Roadworthy ratio 87.6%
                    </span>
                  </div>
                </ShellCard>

                <ShellCard
                  title="Today's Checks Summary"
                  className="col-span-5 h-full rounded-[18px] border border-slate-200/60 bg-[#f8fafc] p-4 shadow-[0_12px_24px_-18px_rgba(15,23,42,0.25)]"
                >
                  <div className="mb-3.5 grid grid-cols-4 gap-3.5">
                    {CHECKS_KPI_DATA.map((kpi) => (
                      <div
                        key={kpi.label}
                        className="relative flex flex-col gap-1 rounded-[14px] p-3.5 shadow-sm"
                        style={{ backgroundColor: kpi.bg }}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: kpi.color }}
                          />
                          <kpi.icon
                            className="h-3.5 w-3.5"
                            style={{ color: kpi.color }}
                          />
                          <span className="text-[11px] font-medium text-slate-500">
                            {kpi.label}
                          </span>
                        </div>
                        <span className="mt-1 text-[30px] leading-none font-bold text-slate-900">
                          {kpi.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-4 grid grid-cols-4 gap-3.5 border-t border-slate-200/90 pt-3.5">
                    {SECONDARY_METRICS_DATA.map((m) => (
                      <div
                        key={m.label}
                        className="flex flex-col items-center justify-center text-center"
                      >
                        <p className="text-[11px] text-slate-500">{m.label}</p>
                        <p className="mt-0.5 text-[17px] font-semibold text-slate-800 tabular-nums">
                          {m.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 items-center gap-4 rounded-[14px] border border-slate-200/70 bg-white/70 p-3.5">
                    <div className="relative mx-auto h-[180px] w-[180px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={CHECKS_CHART_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={58}
                            outerRadius={84}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                          >
                            {CHECKS_CHART_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip content={<ChartTooltipCard />} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[30px] leading-none font-extrabold text-slate-900">
                          744
                        </span>
                        <span className="mt-1 text-[10px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
                          Total
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pr-1">
                      {CHECKS_CHART_DATA.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-[13px] font-medium text-slate-600">
                              {item.name}
                            </span>
                          </div>
                          <span className="text-[14px] font-semibold text-slate-900 tabular-nums">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ShellCard>
              </section>
            </SectionWrapper>

            <SectionWrapper>
              <section className="grid min-w-0 grid-cols-1 items-stretch gap-2.5 xl:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
                <TableCard
                  title="Live Fleet Monitor"
                  right={<FilterSelect label="Last 30 Days" />}
                  className="h-full bg-[#f8fbff] shadow-[0_16px_34px_-20px_rgba(31,72,116,0.34)]"
                >
                  <div className="mb-1.5 flex items-center gap-1">
                    {[
                      ['Active Vehicles', 'bg-[#3E5F82]'],
                      ['Maintenance', 'bg-[#F59E0B]'],
                      ['Alert', 'bg-[#EF4444]'],
                    ].map(([label, color]) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-medium text-[#35506a]"
                      >
                        <span
                          className={cn('h-1.5 w-1.5 rounded-full', color)}
                        />
                        {label}
                      </span>
                    ))}
                  </div>

                  <div className="relative h-[220px] overflow-hidden rounded-[11px] bg-[#edf5fc] shadow-[0_14px_30px_-20px_rgba(31,72,116,0.3)]">
                    <svg
                      viewBox="0 0 1000 360"
                      className="absolute inset-0 h-full w-full"
                      preserveAspectRatio="none"
                    >
                      <rect
                        x="0"
                        y="0"
                        width="1000"
                        height="360"
                        fill="#f8fafc"
                      />
                      <path
                        d="M-50 120 C150 160, 250 80, 420 120 C550 148, 760 88, 1040 130"
                        stroke="#d5dee8"
                        strokeWidth="16"
                        fill="none"
                        opacity="0.45"
                      />
                      <path
                        d="M-80 210 C140 190, 320 230, 540 210 C720 195, 890 250, 1060 210"
                        stroke="#dde5ee"
                        strokeWidth="12"
                        fill="none"
                        opacity="0.45"
                      />
                    </svg>
                    {[
                      { x: '20%', y: '34%', count: 23, tone: 'bg-[#3E5F82]' },
                      { x: '46%', y: '52%', count: 7, tone: 'bg-[#2F4B69]' },
                      {
                        x: '73%',
                        y: '43%',
                        count: 52,
                        tone: 'bg-[#DE7440]/90',
                      },
                      { x: '62%', y: '26%', count: 6, tone: 'bg-[#EB7A45]' },
                    ].map((point, idx) => (
                      <span
                        key={idx}
                        className={cn(
                          'absolute flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-semibold text-white',
                          point.tone,
                        )}
                        style={{ left: point.x, top: point.y }}
                      >
                        {point.count}
                      </span>
                    ))}
                  </div>

                  <div className="mt-1.5 overflow-hidden rounded-[10px] bg-white shadow-[0_10px_24px_-20px_rgba(15,23,42,0.28)]">
                    <div className="grid grid-cols-[1.3fr_.8fr_1fr_1fr_auto] border-b border-[#dce9f6] bg-[#f3f8fe] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#274867]">
                      <span>Vehicle</span>
                      <span>Status</span>
                      <span>Last Active</span>
                      <span>Location</span>
                      <span className="text-right">Action</span>
                    </div>
                    {LIVE_ROWS.map((row, idx) => (
                      <div
                        key={row.vehicle}
                        className={cn(
                          'grid grid-cols-[1.3fr_.8fr_1fr_1fr_auto] items-center gap-1.5 border-t border-[#e8eff6] px-2 py-1.5 transition-colors hover:bg-[#eef6ff]',
                          idx % 2 === 1 && 'bg-[#f8fbff]',
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <span className="h-5 w-5 rounded-full bg-gradient-to-br from-[#d9e7f4] to-[#c8d9ea]" />
                          <div>
                            <span className="block text-[13px] font-medium text-[#1f3954]">
                              {row.vehicle}
                            </span>
                            <span className="block text-[10px] text-[#607b94]">
                              {row.driver}
                            </span>
                          </div>
                        </div>
                        <StatusBadge
                          tone={
                            row.status === 'Active'
                              ? 'success'
                              : row.status === 'Idle'
                                ? 'warning'
                                : 'danger'
                          }
                        >
                          {row.status}
                        </StatusBadge>
                        <span className="text-[11px] text-[#4f6a83]">
                          {row.lastActive}
                        </span>
                        <span className="text-[11px] text-[#4f6a83]">
                          {row.location}
                        </span>
                        <button
                          type="button"
                          className="ml-auto inline-flex items-center rounded-[8px] border border-[#c9d3db] px-2 py-0.5 text-[11px] text-[#41566b]"
                        >
                          Action
                          <ChevronDown className="ml-1 h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </TableCard>

                <div className="flex min-w-0 h-full flex-col gap-2">
                  <ChartCard title="Health & Maintenance" className="flex-1">
                    <div className="mb-1.5 inline-flex items-center gap-1 rounded-[9px] bg-white p-0.5 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.28)]">
                      <button
                        type="button"
                        className="rounded-[7px] bg-[#edf5fc] px-2 py-1 text-[11px] font-medium text-[#244564]"
                      >
                        Vehicle Health & Compliance
                      </button>
                      <button
                        type="button"
                        className="rounded-[7px] px-2 py-1 text-[11px] font-medium text-[#5b7490]"
                      >
                        Maintenance & Alerts
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        ['Overdue', '68%', 68],
                        ['Vehicles with critical issues', '8% / 62', 8],
                        ['Vehicles with dents/issues', '8% / 42', 8],
                        ['Overdue alerts', '5', 42],
                        ['Open service tasks', '7', 58],
                        ['Total defects last 30 days', '132', 76],
                      ].map(([label, value, percent]) => (
                        <InsightRow
                          key={String(label)}
                          label={String(label)}
                          value={String(value)}
                          percent={Number(percent)}
                        />
                      ))}
                    </div>
                  </ChartCard>

                  <ShellCard
                    title="Upcoming Schedule"
                    right={<FilterSelect label="Resolve by" />}
                    className="flex-1 border-t-[3px] border-t-[#de7440] p-2.5"
                  >
                    <div className="space-y-1">
                      {[
                        ['Inspection', '1 day', '40'],
                        ['Engine Service', '2 days', '132'],
                        ['Safety Service', '3 days', '87'],
                        ['Emission Check', '5 days', '18'],
                      ].map(([task, due, count]) => (
                        <ScheduleItem
                          key={task}
                          task={task}
                          due={due}
                          count={count}
                        />
                      ))}
                    </div>
                  </ShellCard>
                </div>
              </section>
            </SectionWrapper>

            <SectionWrapper>
              <section className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <TabGroup
                    tabs={ANALYTICS_TABS}
                    active={analyticsTab}
                    onChange={setAnalyticsTab}
                  />
                  <div className="flex items-center gap-2">
                    <FilterSelect label="Events" />
                    <button
                      type="button"
                      className="inline-flex h-8 items-center gap-1.5 rounded-[9px] border border-slate-200/80 bg-white px-2.5 text-xs text-slate-600"
                    >
                      <SlidersHorizontal className="h-3.5 w-3.5" />
                      Filter
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 items-stretch gap-2.5">
                  <ChartCard title="Vehicle Downtime Trend" className="h-full">
                    <div className="h-32 rounded-[10px] bg-white p-2 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.28)]">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                          data={DOWNTIME_DATA}
                          margin={{ top: 4, left: -20, right: 6, bottom: -2 }}
                        >
                          <defs>
                            <linearGradient
                              id="downtimeLineFill"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="#2f5f90"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="100%"
                                stopColor="#2f5f90"
                                stopOpacity={0}
                              />
                            </linearGradient>
                            <linearGradient
                              id="downtimeLineSecondaryFill"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="#F59E0B"
                                stopOpacity={0.2}
                              />
                              <stop
                                offset="100%"
                                stopColor="#F59E0B"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            stroke="#d3dde8"
                            strokeDasharray="2 4"
                            strokeOpacity={1}
                            vertical={false}
                          />
                          <XAxis
                            dataKey="month"
                            tick={{ fontSize: 10, fill: '#6a7f93' }}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis hide />
                          <Tooltip content={<ChartTooltipCard />} />
                          <Area
                            type="monotone"
                            dataKey="value"
                            fill="url(#downtimeLineFill)"
                            stroke="none"
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            fill="url(#downtimeLineSecondaryFill)"
                            stroke="none"
                          />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#2f5f90"
                            strokeWidth={2.5}
                            dot={{ r: 2.3, fill: '#3E5F82' }}
                            activeDot={{ r: 3.5, fill: '#2F4B69' }}
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </ChartCard>
                  <ChartCard
                    title="Fleet Composition by Vehicle Type"
                    className="h-full"
                  >
                    <p className="mb-1 text-[11px] text-slate-500">
                      Total output by vehicle category
                    </p>
                    <div className="h-32 rounded-[10px] bg-white p-2 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.28)]">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                          layout="vertical"
                          data={FLEET_COMPOSITION_DATA}
                          margin={{ top: 1, right: 8, left: 10, bottom: 1 }}
                        >
                          <XAxis type="number" hide />
                          <YAxis
                            type="category"
                            dataKey="type"
                            tick={{ fontSize: 10, fill: '#64748b' }}
                            tickLine={false}
                            axisLine={false}
                            width={68}
                          />
                          <Tooltip content={<ChartTooltipCard />} />
                          <Bar
                            dataKey="active"
                            stackId="a"
                            fill="#2f5f90"
                            radius={[3, 0, 0, 3]}
                            barSize={9}
                          />
                          <Bar
                            dataKey="maintenance"
                            stackId="a"
                            fill="#F59E0B"
                            barSize={9}
                          />
                          <Bar
                            dataKey="offline"
                            stackId="a"
                            fill="#06B6D4"
                            radius={[0, 3, 3, 0]}
                            barSize={9}
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </ChartCard>
                </div>
              </section>
            </SectionWrapper>

            <SectionWrapper>
              <TableCard
                title="Vehicles Off Road"
                right={
                  <div className="flex items-center gap-2">
                    <FilterSelect label="Region" />
                    <FilterSelect label="Vehicle" />
                  </div>
                }
              >
                <div className="h-[168px] rounded-[10px] bg-white p-2.5 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.28)]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={VOR_DATA}
                      margin={{ top: 2, right: 8, left: -18, bottom: -2 }}
                    >
                      <CartesianGrid
                        stroke="#e0e8f3"
                        strokeDasharray="2 4"
                        strokeOpacity={0.75}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="vehicle"
                        tick={{ fontSize: 10, fill: '#6a7f93' }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis hide />
                      <Tooltip content={<ChartTooltipCard />} />
                      <Bar
                        dataKey="available"
                        fill="#2f5f90"
                        radius={[4, 4, 0, 0]}
                        barSize={12}
                      />
                      <Bar
                        dataKey="offRoad"
                        fill="#F59E0B"
                        radius={[4, 4, 0, 0]}
                        barSize={12}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TableCard>
            </SectionWrapper>

            <SectionWrapper>
              <section className="space-y-1">
                <SectionHeader title="Upcoming Inspections Summary" />
                <div className="grid grid-cols-4 gap-1.5">
                  {INSPECTION_BUCKETS.map((bucket) => (
                    <ComplianceMiniCard
                      key={bucket.title}
                      title={bucket.title}
                      accent={bucket.accent}
                      stats={bucket.stats}
                    />
                  ))}
                </div>
              </section>
            </SectionWrapper>

            <SectionWrapper>
              <section className="space-y-1">
                <SectionHeader title="Upcoming Expires" />
                <div className="grid grid-cols-4 gap-1.5">
                  {EXPIRE_BUCKETS.map((bucket) => (
                    <ComplianceMiniCard
                      key={bucket.title}
                      title={bucket.title}
                      accent={bucket.accent}
                      stats={bucket.stats}
                    />
                  ))}
                </div>
              </section>
            </SectionWrapper>

            <SectionWrapper>
              <TableCard title="Upcoming Inspections">
                <div className="overflow-hidden rounded-[10px] bg-white shadow-[0_10px_24px_-20px_rgba(15,23,42,0.28)]">
                  <div className="grid grid-cols-[1.1fr_.8fr_.9fr_.75fr_.9fr_1fr] border-b border-[#dce9f6] bg-[#f3f8fe] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#274867]">
                    <span>Vehicle</span>
                    <span>Type</span>
                    <span>Due Date</span>
                    <span>Status</span>
                    <span>Assignee</span>
                    <span>Notes</span>
                  </div>
                  {INSPECTION_ROWS.map((row, idx) => (
                    <div
                      key={row[0]}
                      className={cn(
                        'grid grid-cols-[1.1fr_.8fr_.9fr_.75fr_.9fr_1fr] items-center border-t border-[#e8eff6] px-2 py-1.5 transition-colors hover:bg-[#eef6ff]',
                        idx % 2 === 1 && 'bg-[#f8fbff]',
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-gradient-to-br from-[#d9e3ed] to-[#c9d3db]" />
                        <span className="text-[13px] font-medium text-[#1f3954]">
                          {row[0]}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#4f6a83]">
                        {row[1]}
                      </span>
                      <span className="text-[11px] text-[#4f6a83]">
                        {row[2]}
                      </span>
                      <StatusBadge
                        tone={
                          row[3] === 'Overdue'
                            ? 'danger'
                            : row[3] === 'Due Soon'
                              ? 'warning'
                              : 'info'
                        }
                      >
                        {row[3]}
                      </StatusBadge>
                      <span className="text-[11px] text-[#4f6a83]">
                        {row[4]}
                      </span>
                      <span className="text-[11px] text-[#4f6a83]">
                        {row[5]}
                      </span>
                    </div>
                  ))}
                </div>
              </TableCard>

              <section className="grid grid-cols-2 items-stretch gap-2.5">
                <TableCard title="Top Drivers">
                  <div className="overflow-hidden rounded-[10px] bg-white shadow-[0_10px_24px_-20px_rgba(15,23,42,0.28)]">
                    <div className="grid grid-cols-5 border-b border-[#dce9f6] bg-[#f3f8fe] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#274867]">
                      <span>ID</span>
                      <span>Type</span>
                      <span>Ref</span>
                      <span>Status</span>
                      <span>Action</span>
                    </div>
                    {DRIVER_METRIC_ROWS.map((row, idx) => (
                      <div
                        key={row[0]}
                        className={cn(
                          'grid grid-cols-5 items-center border-t border-[#e8eff6] px-2 py-1.5 transition-colors hover:bg-[#eef6ff]',
                          idx % 2 === 1 && 'bg-[#f8fbff]',
                        )}
                      >
                        <span className="text-[13px] font-medium text-[#2a4762]">
                          {row[0]}
                        </span>
                        <span className="text-[11px] text-[#4f6a83]">
                          {row[2]}
                        </span>
                        <span className="text-[11px] text-[#4f6a83]">
                          {row[1]}
                        </span>
                        <StatusBadge tone={idx < 3 ? 'warning' : 'neutral'}>
                          {row[3]}
                        </StatusBadge>
                        <span className="text-[11px] text-[#4f6a83]">
                          {row[4]}
                        </span>
                      </div>
                    ))}
                  </div>
                </TableCard>
                <TableCard
                  title="Top Drivers"
                  right={<Ellipsis className="h-4 w-4 text-[#8aa2b8]" />}
                >
                  <div className="space-y-1">
                    {[
                      ['Adam Smith', '8,322 mi', '97%', '4'],
                      ['Emma Brown', '7,002 mi', '97%', '4'],
                      ['Joha Davis', '5,525 mi', '97%', '4'],
                      ['Sarah Wilson', '4,325 mi', '97%', '4'],
                    ].map(([name, distance, safety, count]) => (
                      <div
                        key={name}
                        className="flex items-center justify-between rounded-[9px] bg-white px-2 py-1 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.28)]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="h-6 w-6 rounded-full bg-gradient-to-br from-[#d9e3ed] to-[#c9d3db]" />
                          <span className="text-[13px] font-medium text-[#2a4762]">
                            {name}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-[#607b94]">
                            {distance}
                          </p>
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-[11px] font-semibold text-[#2a4762]">
                              {safety}
                            </span>
                            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-100 px-1.5 text-[10px] font-semibold text-blue-700">
                              {count}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TableCard>
              </section>
            </SectionWrapper>
          </div>
        </DashboardShell>
      </PageSurface.Body>
      <PageSurface.Footer className="hidden" />
    </PageSurface>
  );
}
