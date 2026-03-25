import { useState } from 'react';
import { RECENT_TRIPS, TOP_DRIVERS } from '@/pages/dashboard/mockData';
import {
  AlertTriangle,
  Car,
  CheckCircle,
  Fuel,
  MapPin,
  Route,
  Shield,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { AnalyticsCard } from '@/components/dashboard/AnalyticsCard';
import { CompactActivityFeed } from '@/components/dashboard/CompactActivityFeed';
import { CompactLeaderboard } from '@/components/dashboard/CompactLeaderboard';
import { CompactSummaryWidget } from '@/components/dashboard/CompactSummaryWidget';
import { CompactTripsTable } from '@/components/dashboard/CompactTripsTable';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import {
  FilterChips,
  type FilterChipId,
} from '@/components/dashboard/FilterChips';
import { FleetMapPanel } from '@/components/dashboard/FleetMapPanel';
import { SectionHeader } from '@/components/dashboard/SectionHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { PageSurface } from '@/components/layout';

/* ─── KPI BAR DATA ─────────────────────────────────────────────── */
const KPI_STATS = [
  {
    label: 'All Vehicles',
    value: '450',
    icon: Car,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    glow: '#dbeafe',
  },
  {
    label: 'Available',
    value: '329',
    icon: CheckCircle,
    color: 'text-emerald-600',
    bg: 'bg-emerald-100',
    glow: '#d1fae5',
  },
  {
    label: 'On Trip',
    value: '96',
    icon: MapPin,
    color: 'text-indigo-600',
    bg: 'bg-indigo-100',
    glow: '#e0e7ff',
  },
  {
    label: 'Maintenance',
    value: '17',
    icon: Wrench,
    color: 'text-amber-600',
    bg: 'bg-amber-100',
    glow: '#fef3c7',
  },
  {
    label: 'Alerts',
    value: '8',
    icon: AlertTriangle,
    color: 'text-rose-600',
    bg: 'bg-rose-100',
    glow: '#fee2e2',
  },
  {
    label: 'Active Drivers',
    value: '126',
    icon: Users,
    color: 'text-violet-600',
    bg: 'bg-violet-100',
    glow: '#ede9fe',
  },
  {
    label: 'Fuel Efficiency',
    value: '3.2 km/L',
    icon: Fuel,
    color: 'text-cyan-600',
    bg: 'bg-cyan-100',
    glow: '#cffafe',
  },
  {
    label: 'Utilization',
    value: '95.3%',
    icon: TrendingUp,
    color: 'text-emerald-600',
    bg: 'bg-emerald-100',
    glow: '#d1fae5',
  },
];

/* ─── MAP STATS ─────────────────────────────────────────────────── */
const MAP_STATS = [
  {
    label: 'Active Vehicles',
    value: '425',
    icon: Car,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    label: 'Moving',
    value: '380',
    icon: Route,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    label: 'Idle',
    value: '45',
    icon: Zap,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    label: 'Avg Speed',
    value: '42 km/h',
    icon: TrendingUp,
    color: 'text-slate-700',
    bg: 'bg-slate-50',
  },
  {
    label: 'In City',
    value: '85%',
    icon: MapPin,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
];

/* ─── ANALYTICS CARDS ───────────────────────────────────────────── */
const ANALYTICS_CARDS = [
  {
    label: "Today's Trips",
    value: '156',
    sub: '142 completed',
    icon: Route,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
  },
  {
    label: 'Fleet Utilization',
    value: '95.3%',
    sub: '425 of 450 active',
    icon: TrendingUp,
    color: 'text-emerald-600',
    bg: 'bg-emerald-100',
  },
  {
    label: 'Avg Trip Distance',
    value: '28.4 km',
    sub: 'Per trip today',
    icon: MapPin,
    color: 'text-indigo-600',
    bg: 'bg-indigo-100',
  },
  {
    label: 'Idle Time',
    value: '2.1 hrs',
    sub: 'Fleet average',
    icon: Zap,
    color: 'text-amber-600',
    bg: 'bg-amber-100',
  },
  {
    label: 'Total Distance',
    value: '4,430 km',
    sub: 'Covered today',
    icon: Route,
    color: 'text-slate-600',
    bg: 'bg-slate-100',
  },
  {
    label: 'Fuel Consumption',
    value: '455 L',
    sub: 'Avg 3.2 km/L',
    icon: Fuel,
    color: 'text-cyan-600',
    bg: 'bg-cyan-100',
  },
  {
    label: 'Service Due',
    value: '8',
    sub: 'Next 7 days',
    icon: Wrench,
    color: 'text-amber-600',
    bg: 'bg-amber-100',
  },
  {
    label: 'Maintenance Alerts',
    value: '3 critical',
    sub: '5 warnings',
    icon: AlertTriangle,
    color: 'text-rose-600',
    bg: 'bg-rose-100',
  },
];

/* ─── SAFETY DATA ────────────────────────────────────────────────── */
const SAFETY_DONUT = [
  { name: 'Speed Violations', value: 14, color: '#f59e0b' },
  { name: 'Harsh Braking', value: 9, color: '#ef4444' },
  { name: 'Geofence Exits', value: 6, color: '#8b5cf6' },
  { name: 'Overstay', value: 4, color: '#64748b' },
];

const SPEED_BAR_DATA = [
  { day: 'Mon', v: 3 },
  { day: 'Tue', v: 5 },
  { day: 'Wed', v: 2 },
  { day: 'Thu', v: 7 },
  { day: 'Fri', v: 4 },
  { day: 'Sat', v: 6 },
  { day: 'Sun', v: 3 },
];
const speedConfig: ChartConfig = {
  v: { label: 'Violations', color: '#f59e0b' },
};

/* ─── ACTIVITY FEED ─────────────────────────────────────────────── */
const ACTIVITY_FEED = [
  {
    event: 'Trip Started',
    desc: 'TR-330 headed to Dammam',
    time: 'Just now',
    dot: 'bg-blue-500',
  },
  {
    event: 'Trip Completed',
    desc: 'Ahmed M. arrived at Jeddah',
    time: '2m ago',
    dot: 'bg-emerald-500',
  },
  {
    event: 'Safety Alert Triggered',
    desc: 'Harsh braking — 85A1167',
    time: '6m ago',
    dot: 'bg-rose-500',
  },
  {
    event: 'Vehicle Maintenance',
    desc: 'TR-789 service started',
    time: '15m ago',
    dot: 'bg-amber-500',
  },
  {
    event: 'Driver Assigned',
    desc: 'Omar K. → TR-124',
    time: '22m ago',
    dot: 'bg-slate-400',
  },
  {
    event: 'Trip Started',
    desc: 'TR-8412 headed to Riyadh',
    time: '35m ago',
    dot: 'bg-blue-500',
  },
  {
    event: 'Geofence Exit',
    desc: 'TR-100 left Zone A boundary',
    time: '41m ago',
    dot: 'bg-rose-500',
  },
  {
    event: 'Driver Assigned',
    desc: 'Fatima A. clocked in — TR-550',
    time: '58m ago',
    dot: 'bg-slate-400',
  },
  {
    event: 'Unscheduled Stop',
    desc: 'TR-112 stopped for 8m in Zone D',
    time: '1h 12m',
    dot: 'bg-amber-500',
  },
  {
    event: 'Fuel Low Warning',
    desc: 'Vehicle TR-330 at 12% fuel',
    time: '1h 45m',
    dot: 'bg-rose-500',
  },
  {
    event: 'Shift Started',
    desc: 'Night shift operations online',
    time: '2h ago',
    dot: 'bg-emerald-500',
  },
  {
    event: 'Trip Completed',
    desc: 'Marcus W. arrived at Medina',
    time: '2h 15m',
    dot: 'bg-emerald-500',
  },
];

/* ════════════════════════════════════════════════════════════════ */
export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState<FilterChipId>('all');

  return (
    <PageSurface padding="md" fill sectionGap="md">
      <PageSurface.Body className="min-h-0 flex-1 overflow-hidden">
        <DashboardShell>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {/* ══ 1. KPI BAR ══════════════════════════════════════════════ */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-8">
              {KPI_STATS.map((k) => (
                <StatCard
                  key={k.label}
                  label={k.label}
                  value={k.value}
                  icon={k.icon}
                  color={k.color}
                  bgColor={k.bg}
                />
              ))}
            </div>

            {/* ══ 2. FILTERS ══════════════════════════════════════════════ */}
            <div className="flex items-center gap-2">
              <DashboardCard className="!px-3 !py-1 flex items-center gap-2.5 border-white/60 shadow-sm bg-white/40 rounded-md">
                <span className="shrink-0 text-[9px] font-semibold uppercase tracking-widest text-slate-400">
                  FLT_STATUS:
                </span>
                <FilterChips
                  activeId={activeFilter}
                  onSelect={setActiveFilter}
                />
              </DashboardCard>
              <div className="flex-1 h-px bg-slate-200/50" />
            </div>

            {/* ══ 3. LIVE FLEET MAP ════════════════════════════════════════ */}
            <section className="min-w-0">
              <FleetMapPanel height={430} />
            </section>

            {/* ══ 4. MAP STATS ════════════════════════════════════════════ */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {MAP_STATS.map((s) => (
                <StatCard
                  key={s.label}
                  label={s.label}
                  value={s.value}
                  icon={s.icon}
                  color={s.color}
                  bgColor={s.bg}
                  className="!p-2 shadow-xs border-white/30 rounded-md"
                />
              ))}
            </div>

            <section className="flex min-w-0 flex-col gap-2">
              <SectionHeader
                title="Analytics Overview"
                subtitle="FLT_PERF_DATA"
                className="mb-0"
              />
              <div className="grid min-w-0 grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-8">
                {ANALYTICS_CARDS.map((card) => (
                  <AnalyticsCard
                    key={card.label}
                    label={card.label}
                    value={card.value}
                    sub={card.sub}
                    icon={card.icon}
                    color={card.color}
                    bg={card.bg}
                  />
                ))}
              </div>
            </section>

            {/* ══ 6. SAFETY & ALERTS ══════════════════════════════════════ */}
            <section className="flex min-w-0 flex-col gap-2">
              <SectionHeader
                title="Safety & Alerts"
                subtitle="LIVE_RISK_MONITOR"
                className="mb-0"
              />
              <div className="grid min-w-0 grid-cols-1 gap-x-2 gap-y-2 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-1.5">
                {/* Safety Alerts Distribution — body centers donut + legend */}
                <DashboardCard className="flex flex-col !p-3">
                  <header className="mb-2 shrink-0 flex items-center gap-2">
                    <Shield className="h-4 w-4 shrink-0 text-rose-500" />
                    <p className="text-xs font-semibold text-slate-700">
                      Safety Alerts Distribution
                    </p>
                  </header>
                  <div className="flex min-h-0 flex-1 items-center justify-center">
                    <div className="flex w-full items-center gap-3">
                      <div className="relative h-[88px] w-[88px] shrink-0">
                        <PieChart width={88} height={88}>
                          <Pie
                            data={SAFETY_DONUT}
                            dataKey="value"
                            innerRadius={22}
                            outerRadius={40}
                            paddingAngle={3}
                          >
                            {SAFETY_DONUT.map((e, i) => (
                              <Cell key={i} fill={e.color} />
                            ))}
                          </Pie>
                        </PieChart>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-[13px] font-semibold text-slate-800 leading-none">
                            33
                          </span>
                          <span className="text-[7px] font-medium text-slate-400 uppercase">
                            Alerts
                          </span>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        {SAFETY_DONUT.map((d) => (
                          <div
                            key={d.name}
                            className="flex items-center justify-between gap-1"
                          >
                            <div className="flex min-w-0 items-center gap-1.5">
                              <span
                                className="h-2 w-2 shrink-0 rounded-full"
                                style={{ background: d.color }}
                              />
                              <span className="truncate text-[10px] text-slate-500">
                                {d.name}
                              </span>
                            </div>
                            <span className="shrink-0 text-[10px] font-medium text-slate-700">
                              {d.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </DashboardCard>

                {/* Speed Violations — body fills with bar chart */}
                <DashboardCard className="flex flex-col !p-3">
                  <header className="mb-2 shrink-0 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <Zap className="h-4 w-4 shrink-0 text-amber-500" />
                      <p className="truncate text-xs font-semibold text-slate-800 tracking-tight">
                        Speed Violations
                      </p>
                    </div>
                    <span className="shrink-0 rounded-sm bg-amber-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase text-amber-700 border border-amber-200/50">
                      30 this week
                    </span>
                  </header>
                  <div className="flex min-h-0 flex-1 flex flex-col">
                    <ChartContainer
                      config={speedConfig}
                      className="h-full min-h-[100px] w-full !aspect-auto"
                    >
                      <BarChart
                        data={SPEED_BAR_DATA}
                        margin={{ top: 2, right: 2, left: -24, bottom: 0 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#f1f5f9"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="day"
                          tick={{ fill: '#94a3b8', fontSize: 9 }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          tick={{ fill: '#94a3b8', fontSize: 9 }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar
                          dataKey="v"
                          fill="#f59e0b"
                          radius={[3, 3, 0, 0]}
                          maxBarSize={24}
                        />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </DashboardCard>

                {/* Harsh Braking Events — body fills, content grouped */}
                <DashboardCard className="flex flex-col !p-3">
                  <header className="mb-2 shrink-0 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-rose-500" />
                    <p className="text-xs font-semibold text-slate-700">
                      Harsh Braking Events
                    </p>
                  </header>
                  <div className="flex min-h-0 flex-1 flex flex-col justify-center space-y-2.5">
                    {[
                      {
                        label: 'Critical (>8g)',
                        value: 4,
                        max: 10,
                        color: 'bg-rose-500',
                        text: 'text-rose-600',
                      },
                      {
                        label: 'Warning (5-8g)',
                        value: 7,
                        max: 10,
                        color: 'bg-amber-400',
                        text: 'text-amber-600',
                      },
                      {
                        label: 'Mild (<5g)',
                        value: 9,
                        max: 10,
                        color: 'bg-yellow-300',
                        text: 'text-yellow-600',
                      },
                    ].map((b) => (
                      <div key={b.label}>
                        <div className="mb-0.5 flex justify-between">
                          <span className="text-[10px] font-medium text-slate-500">
                            {b.label}
                          </span>
                          <span className={`text-[10px] font-medium ${b.text}`}>
                            {b.value}
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full transition-all ${b.color}`}
                            style={{ width: `${(b.value / b.max) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </DashboardCard>

                {/* Geofence Violations — compact body so row height is balanced */}
                <DashboardCard className="flex flex-col !p-3">
                  <header className="mb-2 shrink-0 flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-violet-500" />
                    <p className="text-xs font-semibold text-slate-700">
                      Geofence Violations
                    </p>
                  </header>
                  <div className="flex min-h-0 flex-1 flex flex-col justify-center space-y-1.5">
                    {[
                      {
                        zone: 'Zone A — Industrial',
                        exits: 3,
                        bg: 'bg-rose-100',
                        text: 'text-rose-700',
                      },
                      {
                        zone: 'Zone B — Residential',
                        exits: 2,
                        bg: 'bg-amber-100',
                        text: 'text-amber-700',
                      },
                      {
                        zone: 'Zone C — Highway',
                        exits: 1,
                        bg: 'bg-violet-100',
                        text: 'text-violet-700',
                      },
                    ].map((g) => (
                      <div
                        key={g.zone}
                        className="flex items-center justify-between rounded-lg bg-slate-50/80 px-2.5 py-1.5"
                      >
                        <span className="truncate text-[10px] font-semibold text-slate-700">
                          {g.zone}
                        </span>
                        <span
                          className={`ml-2 shrink-0 rounded-sm px-1.5 py-0.5 text-[9px] font-semibold uppercase ${g.bg} ${g.text} border border-white/50`}
                        >
                          {g.exits} exits
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between border-t border-slate-100 pt-1.5 text-[10px]">
                      <span className="text-slate-400">Total this week</span>
                      <span className="font-semibold text-slate-700">
                        6 violations
                      </span>
                    </div>
                  </div>
                </DashboardCard>
              </div>
            </section>

            <section className="grid min-w-0 grid-cols-1 gap-x-2 gap-y-2 xl:grid-cols-4 xl:gap-x-1.5 items-stretch">
              <div className="min-w-0 xl:col-span-3">
                <CompactLeaderboard data={TOP_DRIVERS} />
              </div>
              <div className="min-w-0 xl:col-span-1">
                <CompactActivityFeed data={ACTIVITY_FEED} />
              </div>
            </section>

            {/* ══ 8. RECENT TRIPS & WIDGETS ════════════════════════════════ */}
            <section className="grid min-w-0 grid-cols-1 gap-x-2 gap-y-2 xl:grid-cols-4 xl:gap-x-1.5 items-stretch">
              {/* Left 3/4: Recent Trips Table */}
              <div className="min-w-0 xl:col-span-3">
                <CompactTripsTable data={RECENT_TRIPS} />
              </div>

              {/* Right 1/4: Compact Widgets */}
              <div className="flex min-w-0 flex-col gap-2 xl:col-span-1">
                {/* Widget 1: Trip Status Summary */}
                <CompactSummaryWidget
                  title="Trip Status"
                  icon={Route}
                  iconColorClass="text-blue-500"
                  listData={[
                    {
                      label: 'Completed',
                      value: 142,
                      color: 'bg-emerald-500',
                      textClass: 'text-emerald-700',
                      bgClass: 'bg-emerald-50/60',
                    },
                    {
                      label: 'In Pgrs',
                      value: 96,
                      color: 'bg-blue-500',
                      textClass: 'text-blue-700',
                      bgClass: 'bg-blue-50/60',
                    },
                    {
                      label: 'Delayed',
                      value: 14,
                      color: 'bg-rose-500',
                      textClass: 'text-rose-700',
                      bgClass: 'bg-rose-50/60',
                    },
                  ]}
                />

                {/* Widget 2: Maintenance Snapshot */}
                <CompactSummaryWidget
                  title="Maintenance"
                  icon={Wrench}
                  iconColorClass="text-amber-500"
                  statData={[
                    {
                      label: 'Due This Week',
                      value: 12,
                      sub: 'vehicles',
                      colorClass: 'text-amber-500',
                    },
                    {
                      label: 'In Shop',
                      value: 5,
                      sub: 'active',
                      colorClass: 'text-slate-700',
                    },
                  ]}
                />
              </div>
            </section>
          </div>
        </DashboardShell>
      </PageSurface.Body>
      <PageSurface.Footer />
    </PageSurface>
  );
}
