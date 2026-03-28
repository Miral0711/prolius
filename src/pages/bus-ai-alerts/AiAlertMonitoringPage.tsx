import React, { useMemo } from 'react';
import { 
  Download, 
  FileText, 
  RefreshCw, 
  ChevronDown, 
  Activity, 
  ShieldCheck, 
  Zap, 
  History,
  HardDrive,
  MapPin,
  TrendingUp,
  Clock,
  AlertTriangle,
  Brain,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { PageSurface, PAGE_SURFACE_FOOTER_PADDING } from '@/components/layout';
import { PageShell } from '@/components/ui/page-shell';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { 
  AI_ALERT_TYPES, 
  ALERTS_OVER_TIME, 
  ALERT_DISTRIBUTION,
} from '@/data/ai-alert-monitoring-mock-data';

/* ─── SHARED COMPONENTS ────────────────────────────────────────── */

const SectionHeader = ({ title, icon: Icon, extra, action, className }: { title: string; icon?: any; extra?: string; action?: React.ReactNode; className?: string }) => (
  <div className={cn("flex items-center justify-between gap-3 mb-2 px-1", className)}>
    <div className="flex items-center gap-2">
      {Icon && <Icon className="h-4 w-4 text-slate-400" />}
      <h3 className={cn(typography.cardTitle, 'flex items-center gap-2')}>
        {title}
        {extra && <span className="h-1 w-1 rounded-full bg-slate-200" />}
        {extra && <span className="text-xs font-medium text-slate-400 tabular-nums uppercase tracking-[0.04rem]">{extra}</span>}
      </h3>
    </div>
    {action && <div>{action}</div>}
  </div>
);

const AlertKpiCard = ({ alert, count }: { alert: typeof AI_ALERT_TYPES[0]; count: number }) => {
  const Icon = alert.icon;
  const isZero = count === 0;

  return (
    <GlassCard 
      size="sm"
      className={cn(
        "flex flex-col p-3 border-slate-200/60 shadow-sm group relative overflow-hidden h-[82px] justify-between transition-all duration-200 hover:shadow-md hover:-translate-y-[1px] hover:bg-white/90 bg-white"
      )}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="flex items-start justify-between">
          <div className={cn(
            "h-6 w-6 rounded-md flex items-center justify-center shrink-0 transition-all",
            !isZero ? (
              alert.color === 'rose' ? "bg-rose-50 text-rose-500" :
              alert.color === 'amber' ? "bg-amber-50 text-amber-500" :
              alert.color === 'blue' ? "bg-blue-50 text-blue-500" : "bg-slate-50 text-slate-500"
            ) : "bg-slate-50 text-slate-400"
          )}>
            <Icon className="h-3 w-3" />
          </div>
          <p className="text-xl font-semibold text-slate-800 leading-none tabular-nums tracking-tight">{count}</p>
        </div>
        
        <div className="flex flex-col gap-0.5 mt-0.5">
          <p className="text-2sm font-medium text-slate-700 truncate leading-none">{alert.name}</p>
        {!isZero ? (
            <span className="text-2xs font-medium text-rose-500 uppercase tracking-tight flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-rose-500 animate-pulse" /> ACTIVE
            </span>
          ) : (
            <span className="text-2xs font-medium text-slate-400 uppercase tracking-tight flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-slate-200" /> STABLE
            </span>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

const ChartCard = ({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) => (
  <GlassCard className={cn("flex flex-col min-h-[235px] h-full border-slate-200/60 bg-white shadow-sm p-4 transition-all duration-200 hover:shadow-md", className)}>
    <h3 className={cn(typography.cardTitle, 'mb-3 flex items-center gap-2')}>
      <TrendingUp className="h-4 w-4 text-blue-500" />
      {title}
    </h3>
    <div className="flex-1 min-h-0">
      {children}
    </div>
  </GlassCard>
);

const TelemetryPill = ({ icon: Icon, label, value, color, last }: { icon: any; label: string; value: React.ReactNode; color?: string; last?: boolean }) => (
  <div className={cn("flex items-center gap-2 px-3 h-full shrink-0 transition-all group", !last && "border-r border-slate-200")}>
    <div className={cn("h-5.5 w-5.5 rounded-md flex items-center justify-center shadow-sm border border-slate-100", color ? `bg-${color}-50 text-${color}-500` : "bg-white text-slate-400")}>
      <Icon className="h-3 w-3" />
    </div>
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium text-slate-500 leading-none">{label}</span>
      <span className="text-sm font-semibold text-slate-800 leading-none tabular-nums">{value}</span>
    </div>
  </div>
);

/* ─── MAIN PAGE COMPONENT ──────────────────────────────────────── */

export default function AiAlertMonitoringPage() {
  const alertCounts = useMemo(() => {
    return AI_ALERT_TYPES.slice(0, 12).map((type, index) => ({
      ...type,
      count: index > 7 ? 0 : Math.floor(Math.random() * 6) + 2
    }));
  }, []);

  return (
    <PageShell
      title="Bus AI Alert Monitoring"
      subtitle="Real-Time Driver & Vehicle Safety Dashboard"
      hideHeader={true}
      className="max-w-none flex h-full min-h-0 flex-1 flex-col space-y-0"
      contentWrapperClassName="relative flex max-w-none flex-1 flex-col overflow-hidden p-0 min-h-0"
    >
      <PageSurface padding={PAGE_SURFACE_FOOTER_PADDING} fill sectionGap="none">
        <PageSurface.Body className="min-h-0 flex-1 space-y-4 overflow-y-auto">
      {/* ─── PAGE ACTIONS ─── */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <h2 className={typography.cardTitle}>Advanced AI Diagnostics</h2>
          <p className="text-xs text-slate-400 font-medium">Real-time driver & vehicle safety telemetry</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-2 px-3 shadow-sm bg-white hover:bg-slate-50 text-slate-700 font-semibold border-slate-200 text-2sm">
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-2 px-3 shadow-sm bg-white hover:bg-slate-50 text-slate-700 font-semibold border-slate-200 text-2sm">
            <FileText className="h-3.5 w-3.5" /> Report
          </Button>
          <Button size="sm" className="h-8 gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-2sm px-3 shadow-sm">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </Button>
        </div>
      </div>
      {/* ─── SYSTEM STATUS STRIP ─── */}
      <GlassCard size="sm" className="!p-0 h-9 flex items-center bg-white border-slate-200/60 shadow-sm shrink-0">
        <div className="flex-1 flex items-center overflow-x-auto scrollbar-none h-full py-1">
          <TelemetryPill 
            icon={History} 
            label="Fleet Status" 
            value={<span className="text-emerald-600">Live Systems</span>} 
            color="emerald"
          />
          <TelemetryPill 
            icon={ShieldCheck} 
            label="Active Alerts" 
            value={<span className="text-rose-500">32</span>} 
            color="rose"
          />
          <TelemetryPill 
            icon={Brain} 
            label="Cameras Online" 
            value={<span>248 <span className="text-slate-400 font-medium">/ 260</span></span>} 
            color="emerald"
          />
          <TelemetryPill 
            icon={Activity} 
            label="Vehicles Live" 
            value={<span>215 <span className="text-slate-400 font-medium">/ 232</span></span>} 
            color="blue"
          />
          <TelemetryPill 
            icon={Clock} 
            label="Last Updated" 
            value={<span>2 min ago <ChevronDown className="inline h-3 w-3 text-slate-400 ml-1" /></span>} 
            color="emerald"
            last 
          />
        </div>
      </GlassCard>

      {/* ─── MAIN DASHBOARD GRID ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] items-stretch gap-4 flex-1 min-h-0">
        
        {/* LEFT COLUMN: PRIMARY CONTENT */}
        <div className="flex flex-col gap-4 h-full">
          
          {/* CRITICAL AI SAFETY GRID */}
          <section>
            <SectionHeader 
              title="Critical AI Alerts" 
              icon={Zap} 
              action={<a href="#" className="text-2sm font-medium text-blue-600 hover:underline">View All</a>}
            />
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {alertCounts.map((alert) => (
                <AlertKpiCard key={alert.id} alert={alert} count={alert.count} />
              ))}
            </div>
          </section>

          {/* ANALYTICS SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
             <ChartCard title="Alerts Over Time (24h)">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ALERTS_OVER_TIME} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                    <XAxis 
                      dataKey="time" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 9, fill: '#64748b', fontWeight: 500 }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 9, fill: '#64748b', fontWeight: 500 }} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '8px', 
                        fontSize: '11px',
                        fontWeight: 'bold',
                        color: '#0f172a',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="alerts" 
                      stroke="#3b82f6" 
                      fillOpacity={1} 
                      fill="url(#colorAlerts)" 
                      strokeWidth={2} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
             </ChartCard>

             <ChartCard title="Alert Categories">
                <div className="flex h-full items-center gap-4">
                  <div className="relative flex-1 h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ALERT_DISTRIBUTION}
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {ALERT_DISTRIBUTION.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-xl font-semibold text-slate-800">100%</span>
                      <span className="text-2xs font-medium text-slate-400 uppercase tracking-[0.08rem]">Mix</span>
                    </div>
                  </div>
                  <div className="w-[110px] flex flex-col gap-2.5">
                    {ALERT_DISTRIBUTION.map((d, i) => (
                      <div key={i} className="flex items-center justify-between group cursor-default">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="h-2 w-2 rounded-full shrink-0" style={{ background: d.color }} />
                          <span className="text-2sm font-medium text-slate-600 truncate">{d.name}</span>
                        </div>
                        <span className="text-2sm font-semibold text-slate-800 shrink-0">{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
             </ChartCard>
          </div>
        </div>

        {/* RIGHT COLUMN: SECONDARY SUMMARY */}
        <div className="flex flex-col h-full">
          <GlassCard className="flex flex-col border-slate-200/60 bg-white shadow-sm p-4 gap-4 transition-all duration-200 hover:shadow-md h-full">
            
            {/* Driver Behavior Section */}
            <div>
              <h3 className={cn(typography.cardTitle, 'mb-3')}>Driver Behavior</h3>
              <div className="flex flex-col gap-3">
                {[
                  { icon: Activity, label: 'Speeding', value: '14', color: 'text-rose-500' },
                  { icon: AlertTriangle, label: 'Harsh Braking', value: '5', color: 'text-rose-500' },
                  { icon: Zap, label: 'Harsh Accel.', value: '3', color: 'text-rose-500' },
                  { icon: History, label: 'Harsh L-Turn', value: '2', color: 'text-emerald-500' },
                  { icon: History, label: 'Harsh R-Turn', value: '2', color: 'text-blue-500' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                      <item.icon className={cn("h-3 w-3", item.color || "text-slate-400")} />
                      <span className="text-2sm font-medium text-slate-600 truncate">{item.label}</span>
                    </div>
                    <span className="text-sm font-semibold tabular-nums shrink-0 text-slate-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px w-full bg-slate-100" />

            {/* Hardware Health Section */}
            <div>
              <h3 className={cn(typography.cardTitle, 'mb-3')}>Hardware Health</h3>
              <div className="flex flex-col gap-3">
                {[
                  { icon: HardDrive, label: 'SD Card', value: 'Normal', color: 'text-emerald-500', valueColor: 'text-emerald-500' },
                  { icon: ShieldCheck, label: 'DVR Status', value: '✔', color: 'text-emerald-500', valueColor: 'text-emerald-500' },
                  { icon: MapPin, label: 'GPS Signal', value: '✔', color: 'text-amber-500', valueColor: 'text-emerald-500' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                      <item.icon className={cn("h-3 w-3", item.color || "text-slate-400")} />
                      <span className="text-2sm font-medium text-slate-600 truncate">{item.label}</span>
                    </div>
                    <span className={cn("text-sm font-semibold tabular-nums shrink-0", item.valueColor || "text-slate-800")}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px w-full bg-slate-100" />
            
            {/* CTA Section */}
            <div className="mt-auto pt-4">
              <h4 className={cn(typography.cardTitle, 'mb-1.5')}>Weekly Safety Report</h4>
              <p className="text-slate-500 text-xs leading-snug mb-3">
                Synthesize fleet safety trends into a single boardroom-ready report.
              </p>
              <Button className="w-full h-8 bg-blue-600 hover:bg-blue-700 text-white text-2sm font-semibold shadow-sm">
                Generate Report
              </Button>
            </div>

          </GlassCard>
        </div>
      </div>

        </PageSurface.Body>
        <PageSurface.Footer />
      </PageSurface>
    </PageShell>
  );
}


