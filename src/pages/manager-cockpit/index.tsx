import React from 'react';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Battery,
  Bell,
  Car,
  CheckCircle,
  Clock,
  Database,
  DollarSign,
  FileText,
  Fuel,
  GaugeIcon,
  LogIn,
  Map,
  MapPin,
  Minus,
  Package,
  Route,
  Server,
  Shield,
  ShieldCheck,
  Timer,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';
import { AppCard } from '@/components/ui/app-card';
import { StatusBadge, type StatusVariant } from '@/components/dashboard/StatusBadge';
import { StatCard } from '@/components/dashboard/StatCard';
import { AnalyticsCard } from '@/components/dashboard/AnalyticsCard';
import { PageSurface } from '@/components/layout';

/* ─── HELPERS ─────────────────────────────────────────────────────── */

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn(
      'rounded-md border border-white bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)]',
      className,
    )}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap">{children}</p>
      <div className="h-px flex-1 bg-slate-200/60" />
    </div>
  );
}

function CardHead({ icon, title, children }: { icon: React.ReactNode; title: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2 mb-2.5">
      <div className="flex items-center gap-1.5">
        {icon}
        <p className="text-[11px] font-semibold text-slate-700">{title}</p>
      </div>
      {children && <div className="flex items-center gap-1.5">{children}</div>}
    </div>
  );
}

function Pill({ children, color = 'slate' }: { children: React.ReactNode; color?: string }) {
  const map: Record<string, string> = {
    emerald: 'bg-emerald-100 text-emerald-700',
    rose:    'bg-rose-100 text-rose-700',
    amber:   'bg-amber-100 text-amber-700',
    indigo:  'bg-indigo-100 text-indigo-700',
    blue:    'bg-blue-100 text-blue-700',
    slate:   'bg-slate-100 text-slate-600',
    violet:  'bg-violet-100 text-violet-700',
  };
  return (
    <span className={cn('rounded-full px-1.5 py-0.5 text-[9px] font-medium', map[color] ?? map.slate)}>
      {children}
    </span>
  );
}



/* ─── DATA ───────────────────────────────────────────────────────── */

const KPI_BAR = [
  { label: 'Critical Alerts',   value: '3',      delta: '+1',     up: false, icon: AlertTriangle, c: 'text-rose-600',    bg: 'bg-rose-50'    },
  { label: 'Active Vehicles',   value: '147',    delta: '+12',    up: true,  icon: Car,           c: 'text-blue-600',    bg: 'bg-blue-50'    },
  { label: "Today's Revenue",   value: 'SAR 0',  delta: '—',      up: null,  icon: DollarSign,    c: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Active Drivers',    value: '524',    delta: '+5',     up: true,  icon: Users,         c: 'text-violet-600',  bg: 'bg-violet-50'  },
  { label: 'Job Completion',    value: '95.5%',  delta: '+1.8%',  up: true,  icon: CheckCircle,   c: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Fleet Utilization', value: '34.4%',  delta: '+1.2%',  up: true,  icon: TrendingUp,    c: 'text-cyan-600',    bg: 'bg-cyan-50'    },
  { label: 'Avg Trip Time',     value: '28 min', delta: '-2m',    up: true,  icon: Timer,         c: 'text-indigo-600',  bg: 'bg-indigo-50'  },
  { label: 'Speeding Events',   value: '22',     delta: '-4',     up: true,  icon: GaugeIcon,     c: 'text-amber-600',   bg: 'bg-amber-50'   },
];

const ALERT_ROWS = [
  { label: 'Accidents',       count: 55, icon: AlertTriangle, c: 'text-rose-500',  cc: 'text-rose-600',  severity: 'rose'   },
  { label: 'Route Breaches',  count: 40, icon: Route,         c: 'text-rose-500',  cc: 'text-rose-600',  severity: 'rose'   },
  { label: 'Geofence Exits',  count: 36, icon: MapPin,        c: 'text-rose-400',  cc: 'text-rose-600',  severity: 'rose'   },
  { label: 'Speeding',        count: 11, icon: GaugeIcon,     c: 'text-amber-500', cc: 'text-amber-600', severity: 'amber'  },
  { label: 'Low Voltage',     count: 5,  icon: Battery,       c: 'text-amber-500', cc: 'text-amber-600', severity: 'amber'  },
];

const FLEET_ROW1 = [
  { label: 'On Trip',   value: '147', delta: '+0', c: 'text-blue-600',    bg: 'bg-blue-50'    },
  { label: 'Available', value: '0',   delta: '+0', c: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Offline',   value: '427', delta: '+3', c: 'text-slate-600',   bg: 'bg-slate-50'   },
  { label: 'Low Fuel',  value: '0',   delta: '+2', c: 'text-amber-600',   bg: 'bg-amber-50'   },
];



const QUICK_ACTIONS = [
  { label: 'Map',      path: '/bus-tracking',         icon: Map,        c: 'text-indigo-600', bg: 'bg-indigo-50'  },
  { label: 'Alerts',   path: '/bus-alert-monitoring', icon: Bell,       c: 'text-rose-600',   bg: 'bg-rose-50'    },
  { label: 'Reports',  path: '/reports',              icon: FileText,   c: 'text-amber-600',  bg: 'bg-amber-50'   },
  { label: 'Drivers',  path: '/bus-driver-list',      icon: Users,      c: 'text-blue-600',   bg: 'bg-blue-50'    },
  { label: 'Fleet',    path: '/manager-cockpit',      icon: Car,        c: 'text-slate-600',  bg: 'bg-slate-50'   },
  { label: 'Revenue',  path: '/reports',              icon: DollarSign, c: 'text-emerald-600',bg: 'bg-emerald-50' },
];

const DISPATCH_ACTIONS = [
  { label: 'Assign Driver',     icon: Users,    c: 'text-blue-600',  bg: 'bg-blue-50'  },
  { label: 'Start Trip',        icon: Route,    c: 'text-emerald-600',bg:'bg-emerald-50'},
  { label: 'Create Alert',      icon: Bell,     c: 'text-rose-600',  bg: 'bg-rose-50'  },
  { label: 'Schedule Maint.',   icon: Wrench,   c: 'text-amber-600', bg: 'bg-amber-50' },
];

const DRIVER_STATS = [
  { label: 'Drivers On Shift',    value: '356', icon: LogIn,       c: 'text-blue-600',    bg: 'bg-blue-50'    },
  { label: 'Drivers Idle',        value: '168', icon: Clock,       c: 'text-amber-600',   bg: 'bg-amber-50'   },
  { label: 'Near HOS Limit',      value: '12',  icon: AlertCircle, c: 'text-rose-600',    bg: 'bg-rose-50'    },
  { label: 'Driver Utilization',  value: '68%', icon: TrendingUp,  c: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Total Drivers',       value: '522', icon: Users,       c: 'text-violet-600',  bg: 'bg-violet-50'  },
  { label: 'Logged In',           value: '356', icon: CheckCircle, c: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const HEALTH_STATS = [
  { label: 'API Response',      value: '24 ms', pct: 96, icon: Zap,       c: 'text-emerald-600', bg: 'bg-emerald-50', bar: 'bg-emerald-500' },
  { label: 'Dispatch Latency',  value: '2.4s',  pct: 80, icon: Timer,     c: 'text-amber-600',   bg: 'bg-amber-50',   bar: 'bg-amber-400'   },
  { label: 'Route Compliance',  value: '98%',   pct: 98, icon: Route,     c: 'text-blue-600',    bg: 'bg-blue-50',    bar: 'bg-blue-500'    },
  { label: 'Fleet Health Score',value: '92/100',pct: 92, icon: Activity,  c: 'text-violet-600',  bg: 'bg-violet-50',  bar: 'bg-violet-500'  },
];

const FLEET_PERF = [
  { label: 'Avg Trip Time',        value: '28 min', icon: Timer,     c: 'text-indigo-600', bg: 'bg-indigo-50', sub: 'vs 30m target' },
  { label: 'Idle Time',            value: '2.1 hrs',icon: Clock,     c: 'text-amber-600',  bg: 'bg-amber-50',  sub: 'Fleet avg'     },
  { label: 'Fuel Efficiency',      value: '3.2 km/L',icon: Fuel,    c: 'text-cyan-600',   bg: 'bg-cyan-50',   sub: 'Avg today'     },
  { label: 'Trips Completed',      value: '142',    icon: CheckCircle,c:'text-emerald-600',bg: 'bg-emerald-50',sub: 'of 156 total'  },
];

const RISK_ROWS = [
  { label: 'Speed Violations',    value: 14, trend: 'up',   c: 'text-amber-600',  bg: 'bg-amber-50'  },
  { label: 'Harsh Braking',       value: 9,  trend: 'up',   c: 'text-rose-600',   bg: 'bg-rose-50'   },
  { label: 'Geofence Breaches',   value: 6,  trend: 'down', c: 'text-violet-600', bg: 'bg-violet-50' },
  { label: 'Maintenance Overdue', value: 3,  trend: 'same', c: 'text-slate-600',  bg: 'bg-slate-50'  },
];

const SYSTEM_STATUS = [
  { label: 'Primary Server',    status: 'online',   latency: '12 ms', icon: Server,   c: 'text-blue-600',    bg: 'bg-blue-50'    },
  { label: 'API Gateway',       status: 'online',   latency: '24 ms', icon: Activity, c: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Database',          status: 'online',   latency: '8 ms',  icon: Database, c: 'text-violet-600',  bg: 'bg-violet-50'  },
  { label: 'Telemetry Sync',    status: 'degraded', latency: '340 ms',icon: Zap,      c: 'text-amber-600',   bg: 'bg-amber-50'   },
];

const ANOMALY_META = [
  { label: 'Last Anomaly',   value: '2h ago' },
  { label: 'Resolved Today', value: '6'      },
  { label: 'Clause Size',    value: '6'      },
];

const FLOW_META = [
  { label: 'Queue Size',         value: '4'  },
  { label: 'Sync Rate',          value: '98%'},
  { label: 'Pending Events',     value: '6'  },
];

const INTEL_ROWS = [
  { label: 'Asset Turnaround',   value: '+4.2%', trend: 'up',   c: 'text-rose-600'    },
  { label: 'Dispatch Precision', value: '-1.5%', trend: 'down', c: 'text-emerald-600' },
  { label: 'Driver Retention',   value: '+0.8%', trend: 'up',   c: 'text-rose-600'    },
  { label: 'Operational Cost',   value: '-2.4%', trend: 'down', c: 'text-emerald-600' },
];

/* ─── PAGE ───────────────────────────────────────────────────────── */
export function ManagerCockpitPage() {
  return (
    <PageSurface
      padding="md"
      sectionGap="lg"
      className="min-h-0 flex-1 bg-[#eef2f7]"
    >
      <PageSurface.Body className="gap-3">

      {/* ── KPI STRIP (8 cards) ───────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-8">
        {KPI_BAR.map((k) => (
          <StatCard
            key={k.label}
            label={k.label}
            value={k.value}
            icon={k.icon}
            color={k.c}
            bgColor={k.bg}
            className="!p-2 shadow-xs border-white/40"
            subValue={k.delta}
          />
        ))}
      </div>

      {/* ── ALERTS & FLEET STATUS ────────────────────────────────── */}
      <SectionLabel>Alerts &amp; Fleet Status</SectionLabel>
      <div className="grid grid-cols-2 gap-2">
        {/* Control Center Alerts */}
        <AppCard 
          title="Control Center Alerts" 
          header={<StatusBadge label="1 Active" variant="rose" />}
          className="shadow-xs border-rose-100/30"
        >
          <div className="flex flex-col gap-1.5">
            {ALERT_ROWS.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.label} className={cn(
                  'flex items-center justify-between rounded-sm px-2.5 py-2 transition-all hover:bg-white',
                  a.severity === 'rose' ? 'bg-rose-50/60' : 'bg-amber-50/60',
                )}>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={cn('h-1.5 w-1.5 rounded-full shrink-0', a.severity === 'rose' ? 'bg-rose-500' : 'bg-amber-500')} />
                    <Icon className={cn('h-3.5 w-3.5 shrink-0', a.c)} />
                    <span className="truncate text-[10px] font-semibold tracking-tight text-slate-700 uppercase">{a.label}</span>
                  </div>
                  <span className={cn('text-[12px] font-semibold tabular-nums', a.cc)}>{a.count}</span>
                </div>
              );
            })}
            <div className="mt-1 flex items-center justify-between rounded-sm bg-rose-500 border border-rose-600/20 px-3 py-2 text-white shadow-sm ring-1 ring-white/20">
              <span className="text-[10px] font-semibold uppercase tracking-widest">15 Active Total</span>
              <span className="text-[9px] font-semibold px-1.5 py-0.5 bg-white/20 rounded-[2px]">CRITICAL_FLT</span>
            </div>
          </div>
        </AppCard>

        {/* Fleet Realtime Status */}
        <AppCard title="Fleet Realtime Status" className="shadow-xs border-indigo-100/30">
          {/* Row 1: small key tiles */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {FLEET_ROW1.map((s) => (
              <div key={s.label} className={cn('flex flex-col items-center justify-center rounded-sm border border-white/50 py-2.5 transition-all hover:bg-white', s.bg)}>
                <p className={cn('text-lg font-semibold leading-none tabular-nums', s.c)}>{s.value}</p>
                <p className="text-[8px] font-semibold uppercase tracking-tighter text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="h-px w-full bg-slate-100/50 mb-3" />

          {/* Capacity bar */}
          <div className="mb-2">
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-[9px] font-semibold uppercase tracking-widest text-slate-400">allocation_index</span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-blue-600">34.4%</span>
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              </div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-md bg-slate-100/60 p-0.5 border border-slate-200/40">
              <div className="flex h-full rounded-sm overflow-hidden">
                <div className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]" style={{ width: '34.4%' }} />
                <div className="h-full bg-emerald-400 opacity-60 ml-0.5" style={{ width: '12%' }} />
              </div>
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[8px] font-medium text-slate-400 uppercase tracking-tight">avail: 427 units</span>
              <span className="text-[8px] font-medium text-slate-400 uppercase tracking-tight">target: 65% utilization</span>
            </div>
          </div>
        </AppCard>
      </div>

      {/* ── FINANCIAL & OPERATIONS ───────────────────────────────── */}
      <SectionLabel>Financial &amp; Operations</SectionLabel>
      <div className="grid grid-cols-2 gap-2">
        {/* Financial Revenue */}
        <AppCard title="Financial Revenue" header={<StatusBadge label="Stable" variant="emerald" />}>
          <div className="grid grid-cols-2 gap-3">
            {/* Left: daily info */}
            <div className="flex flex-col justify-between rounded-md bg-emerald-50/60 border border-emerald-100/60 p-3 ring-1 ring-white/40">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-widest text-emerald-800">gross_rev</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <p className="text-[28px] font-semibold tracking-tight text-slate-800 leading-none">0</p>
                  <span className="text-[11px] font-semibold text-slate-400">SAR</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 pt-3 mt-3 border-t border-emerald-100">
                {[
                  { label: 'Trips', value: '0/450' },
                  { label: 'Margin', value: '—%'  },
                  { label: 'Weekly', value: '0 K'},
                  { label: 'Monthly',value: '0 M'},
                ].map(s => (
                  <div key={s.label}>
                    <p className="text-[8px] text-slate-400 font-semibold uppercase tracking-tighter">{s.label}</p>
                    <p className="text-[11px] font-semibold text-slate-700 tabular-nums">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: metrics */}
            <div className="flex flex-col gap-1.5">
              {[
                { label: 'Avg Rev / Trip', value: 'SAR 0',  variant: 'emerald' as StatusVariant },
                { label: 'Fuel Cost Est.',  value: 'SAR 320', variant: 'amber' as StatusVariant   },
                { label: 'Profit Margin',   value: '—%',      variant: 'blue' as StatusVariant    },
                { label: 'Pending Pymts',   value: '4 jobs',  variant: 'rose' as StatusVariant    },
              ].map(m => (
                <div key={m.label} className="flex items-center justify-between rounded-sm bg-slate-50/80 px-3 py-2 border border-slate-200/40">
                  <span className="text-[9px] font-semibold uppercase tracking-tight text-slate-500">{m.label}</span>
                  <StatusBadge label={m.value} variant={m.variant} className="border-none shadow-none font-semibold" />
                </div>
              ))}
            </div>
          </div>
        </AppCard>

        {/* Operational Directives */}
        <Card className="p-3">
          <CardHead icon={<Package className="h-3.5 w-3.5 text-amber-500" />} title="Operational Directives">
            <Pill color="emerald">Stable</Pill>
          </CardHead>

          {/* Status flags */}
          <div className="flex gap-2 mb-2.5">
            <div className="flex flex-1 items-center gap-1.5 rounded-sm bg-amber-50 border border-amber-100 px-2 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
              <span className="text-[9px] font-semibold text-amber-800 truncate flex-1">1 Low Stock Item</span>
              <Wrench className="h-3 w-3 text-amber-400 shrink-0" />
            </div>
            <div className="flex flex-1 items-center gap-1.5 rounded-sm bg-emerald-50 border border-emerald-100 px-2 py-1.5">
              <CheckCircle className="h-3 w-3 text-emerald-500 shrink-0" />
              <span className="text-[9px] font-semibold text-emerald-800 truncate">Status: Nominal</span>
            </div>
          </div>

          {/* Main action shortcuts */}
          <div className="grid grid-cols-6 gap-1.5 mb-2.5 pb-2.5 border-b border-slate-100">
            {QUICK_ACTIONS.map((a) => {
              const Icon = a.icon;
              return (
                <Link key={a.label} to={a.path}
                  className="group flex flex-col items-center gap-1 rounded-md border border-slate-100 bg-white p-2 transition-all hover:shadow-md"
                >
                  <div className={cn('flex h-6 w-6 items-center justify-center rounded-sm', a.bg)}>
                    <Icon className={cn('h-3 w-3', a.c)} />
                  </div>
                  <span className="text-[8px] font-semibold text-slate-500 group-hover:text-slate-700">{a.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Quick Dispatch Controls */}
          <p className="text-[8px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Quick Dispatch Controls</p>
          <div className="grid grid-cols-4 gap-1.5">
            {DISPATCH_ACTIONS.map((a) => {
              const Icon = a.icon;
              return (
                <button key={a.label}
                  className="group flex flex-col items-center gap-1 rounded-md border border-slate-100 bg-white py-2 px-1 transition-all hover:shadow-md hover:border-slate-200"
                >
                  <div className={cn('flex h-7 w-7 items-center justify-center rounded-sm', a.bg)}>
                    <Icon className={cn('h-3.5 w-3.5', a.c)} />
                  </div>
                  <span className="text-[7.5px] font-semibold text-slate-500 text-center leading-tight">{a.label}</span>
                </button>
              );
            })}
          </div>
        </Card>
      </div>

      {/* ── DRIVER & HEALTH ──────────────────────────────────────── */}
      <SectionLabel>Driver Resources &amp; Operational Health</SectionLabel>
      <div className="grid grid-cols-2 gap-3">

        {/* Driver Resource Logistics */}
        <Card className="p-3">
          <CardHead icon={<Users className="h-3.5 w-3.5 text-blue-500" />} title="Driver Resource Logistics" />
          <div className="grid grid-cols-3 gap-1.5">
            {DRIVER_STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label}
                  className="flex items-center gap-2 rounded-md border border-slate-100 bg-white px-2.5 py-2 transition-all hover:shadow-sm"
                  style={{ boxShadow: '0 1px 4px -1px rgba(0,0,0,0.04)' }}
                >
                  <div className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-sm', s.bg)}>
                    <Icon className={cn('h-3 w-3', s.c)} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[7px] font-medium uppercase tracking-tight text-slate-400 leading-none mb-0.5">{s.label}</p>
                    <p className={cn('text-[13px] font-semibold leading-none', s.c)}>{s.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Operational Health Index */}
        <Card className="p-3">
          <CardHead icon={<Activity className="h-3.5 w-3.5 text-emerald-500" />} title="Operational Health Index" />
          <div className="flex flex-col gap-1.5">
            {HEALTH_STATS.map((h) => {
              const Icon = h.icon;
              return (
                <div key={h.label} className="flex items-center gap-2.5 rounded-sm bg-slate-50/80 px-2.5 py-1.5">
                  <div className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-sm', h.bg)}>
                    <Icon className={cn('h-3 w-3', h.c)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="truncate text-[9px] font-semibold text-slate-600">{h.label}</span>
                      <span className={cn('shrink-0 ml-2 text-[10px] font-semibold', h.c)}>{h.value}</span>
                    </div>
                    <div className="h-1 w-full rounded-full bg-slate-200 overflow-hidden">
                      <div className={cn('h-full rounded-full', h.bar)} style={{ width: `${h.pct}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* ── FLEET PERFORMANCE SNAPSHOT ───────────────────────────── */}
      <SectionLabel>Fleet Performance Snapshot</SectionLabel>
      <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
        {FLEET_PERF.map((p) => (
          <AnalyticsCard
            key={p.label}
            label={p.label}
            value={p.value}
            sub={p.sub}
            icon={p.icon}
            color={p.c}
            bg={p.bg}
          />
        ))}
      </div>

      {/* ── RISK + SYSTEM MONITOR ─────────────────────────────────── */}
      <SectionLabel>Risk Monitor &amp; System Health</SectionLabel>
      <div className="grid grid-cols-2 gap-3">

        {/* Fleet Risk Monitor */}
        <Card className="p-3">
          <CardHead icon={<Shield className="h-3.5 w-3.5 text-rose-500" />} title="Fleet Risk Monitor">
            <Pill color="amber">4 risks</Pill>
          </CardHead>
          <div className="flex flex-col gap-1">
            {RISK_ROWS.map((r) => (
              <div key={r.label} className="flex items-center justify-between rounded-sm bg-slate-50/80 px-2.5 py-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <div className={cn('h-2 w-2 rounded-full shrink-0', r.trend === 'up' ? 'bg-rose-500' : r.trend === 'down' ? 'bg-emerald-500' : 'bg-slate-300')} />
                  <span className="truncate text-[10px] font-medium text-slate-600">{r.label}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className={cn('text-[11px] font-semibold', r.c)}>{r.value}</span>
                  {r.trend === 'up'   && <ArrowUp className="h-3 w-3 text-rose-400" />}
                  {r.trend === 'down' && <ArrowDown className="h-3 w-3 text-emerald-400" />}
                  {r.trend === 'same' && <Minus className="h-3 w-3 text-slate-300" />}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* System Monitor */}
        <Card className="p-3">
          <CardHead icon={<Server className="h-3.5 w-3.5 text-slate-500" />} title="System Monitor">
            <Pill color="emerald">3/4 Online</Pill>
          </CardHead>
          <div className="flex flex-col gap-1">
            {SYSTEM_STATUS.map((s) => {
              const Icon = s.icon;
              const online = s.status === 'online';
              return (
                <div key={s.label} className={cn(
                  'flex items-center justify-between rounded-sm px-2.5 py-1.5',
                  online ? 'bg-slate-50/80' : 'bg-amber-50/60',
                )}>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={cn('flex h-5 w-5 shrink-0 items-center justify-center rounded-sm', s.bg)}>
                      <Icon className={cn('h-2.5 w-2.5', s.c)} />
                    </div>
                    <span className="truncate text-[10px] font-medium text-slate-600">{s.label}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="text-[9px] text-slate-400 font-mono">{s.latency}</span>
                    <span className={cn(
                      'rounded-full px-1.5 py-0.5 text-[8px] font-semibold uppercase',
                      online ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700',
                    )}>
                      {s.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* ── LOGS, INTEL & MONITORING ─────────────────────────────── */}
      <SectionLabel>Logs, Intelligence &amp; Monitoring</SectionLabel>
      <div className="grid grid-cols-3 gap-3">

        {/* Anomaly Log */}
        <Card className="p-3">
          <CardHead icon={<ShieldCheck className="h-3.5 w-3.5 text-amber-500" />} title="Anomaly Log">
            <Pill color="emerald">Clear</Pill>
          </CardHead>
          <div className="mb-2 flex items-center gap-2 rounded-sm bg-emerald-50 border border-emerald-100 px-2.5 py-2">
            <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-emerald-700">Log Clear</p>
              <p className="text-[8px] text-emerald-600">No active anomalies</p>
            </div>
            <span className="text-[9px] font-semibold text-emerald-600">2% CLEAR</span>
          </div>
          <div className="flex flex-col gap-0.5">
            {ANOMALY_META.map((m) => (
              <div key={m.label} className="flex items-center justify-between rounded-sm bg-slate-50/80 px-2.5 py-1.5">
                <span className="text-[10px] font-medium text-slate-500">{m.label}</span>
                <span className="text-[10px] font-semibold text-slate-700">{m.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Flow Sync */}
        <Card className="p-3">
          <CardHead icon={<Route className="h-3.5 w-3.5 text-blue-500" />} title="Flow Sync">
            <div className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="h-2 w-2 rounded-full bg-slate-200" />
            </div>
          </CardHead>
          <div className="mb-2 flex items-center justify-between rounded-lg bg-blue-50 border border-blue-100 px-2.5 py-2">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {['-0.3s', '-0.15s', '0s'].map(d => (
                  <span key={d} className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: d }} />
                ))}
              </div>
              <span className="text-[9px] font-semibold uppercase text-blue-700">AWAITING SYNC</span>
            </div>
            <span className="text-[8px] text-slate-400">34m ago</span>
          </div>
          <div className="flex flex-col gap-0.5">
            {FLOW_META.map((m) => (
              <div key={m.label} className="flex items-center justify-between rounded-sm bg-slate-50/80 px-2.5 py-1.5">
                <span className="text-[10px] font-medium text-slate-500">{m.label}</span>
                <span className="text-[10px] font-semibold text-slate-700">{m.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Operational Intel */}
        <Card className="p-3">
          <CardHead icon={<TrendingUp className="h-3.5 w-3.5 text-violet-500" />} title="Operational Intel">
            <div className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              <span className="h-2 w-2 rounded-full bg-emerald-200" />
            </div>
          </CardHead>
          <div className="flex flex-col gap-1">
            {INTEL_ROWS.map((r) => (
              <div key={r.label} className="flex items-center justify-between rounded-sm bg-slate-50/80 px-2.5 py-1.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  {r.trend === 'up'   ? <ArrowUp className="h-2.5 w-2.5 shrink-0 text-rose-400" />
                                      : <ArrowDown className="h-2.5 w-2.5 shrink-0 text-emerald-400" />}
                  <span className="truncate text-[10px] font-medium text-slate-600">{r.label}</span>
                </div>
                <span className={cn('shrink-0 ml-2 text-[10px] font-semibold', r.c)}>{r.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      </PageSurface.Body>
      <PageSurface.Footer />
    </PageSurface>
  );
}

export default ManagerCockpitPage;
