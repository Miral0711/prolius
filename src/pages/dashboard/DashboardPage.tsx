import { useState } from 'react';
import { PageLayout } from '@/components/shared';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { KPI_DATA, SPARKLINES, MAP_VEHICLES } from './mockData';
import {
  TOKENS,
  SEMANTIC_COLORS,
  DASHBOARD_ROLES,
  type DashboardRole,
  type MapFilter,
} from './components/dashboardTokens';
import { SectionWrapper, Sparkline } from './components/DashboardPrimitives';
import { AnalystView } from './components/AnalystView';
import { CEOView } from './components/CEOView';
import { ManagerView } from './components/ManagerView';
import { OperationsView } from './components/OperationsView';
import { DispatcherView } from './components/DispatcherView';
import { WorkshopView } from './components/WorkshopView';
import { ViewerView } from './components/ViewerView';

type DashboardFilterValue = 'All' | string;

function DashboardLabeledFilterSelect({ label: _label, value, onValueChange, options }: {
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
  const [dashboardRole, setDashboardRole] = useState<DashboardRole>('analyst');

  const filteredVehicles = MAP_VEHICLES.filter(
    (v) => mapFilter === 'all' || v.status === mapFilter,
  );
  const selectedVehicleData = MAP_VEHICLES.find((v) => v.id === selectedVehicle);

  return (
    <PageLayout title="Dashboard">
      <div className={cn(TOKENS.pageBg, 'overflow-y-auto flex-1 min-h-0 [scrollbar-gutter:stable]')}>
        <div className="mx-auto flex w-full max-w-[1600px] flex-col px-5 pt-4 pb-5" style={{ gap: 'var(--section-gap)' }}>

          {/* Header */}
          <header className="flex flex-col gap-1.5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="typo-page-title">{DASHBOARD_ROLES.find((r) => r.value === dashboardRole)?.label ?? 'Dashboard'}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="typo-body">Intelligence Command Core • {today}</p>
                {dashboardRole === 'viewer' && (
                  <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#eef4f8] text-[#5a8aad] border border-[#5a8aad]/20">Read-only view</span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <div className="flex items-center gap-1">
                <span className="text-[9px] font-medium text-[#9ab0c2] uppercase tracking-wider whitespace-nowrap select-none">View as</span>
                <Select value={dashboardRole} onValueChange={(v) => setDashboardRole(v as DashboardRole)}>
                  <SelectTrigger className="h-7 px-2 border border-[#dce8f0] shadow-none bg-[#f4f8fb] rounded-[6px] text-[11px] font-semibold text-[#3d6b8e] w-auto min-w-[120px] focus:ring-0 hover:bg-[#eef4f8] hover:border-[#b8cedd] hover:text-[#2e5270] transition-all duration-150">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-[8px] shadow-[0_8px_24px_rgba(61,107,142,0.14)] border-[#e2eaf2]">
                    {DASHBOARD_ROLES.map((r) => (
                      <SelectItem key={r.value} value={r.value} className="text-[11px] font-medium">{r.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {[
                { label: 'Primary Action', type: 'primary' },
                { label: 'Secondary Act', type: 'secondary' },
                { label: 'Tools', type: 'secondary' },
              ].map((btn) => (
                <button key={btn.label} className={cn('px-2.5 py-1.5 rounded-[6px] text-[10px] font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap', btn.type === 'primary' ? 'bg-[linear-gradient(135deg,#e8622a,#f07a4a)] text-white shadow-[0_3px_10px_-2px_rgba(232,98,42,0.40)] hover:shadow-[0_5px_14px_-2px_rgba(232,98,42,0.50)] hover:scale-[1.02] active:scale-[0.98] border border-[#e8622a]/20' : 'bg-[#f4f8fb] text-[#4f6478] border border-[#dce8f0] hover:bg-[#eef4f8] hover:border-[#b8cedd] hover:text-[#3d6b8e] active:scale-[0.98]')}>
                  {btn.label}
                </button>
              ))}
            </div>
          </header>

          {/* ── SECTION 1: Filters + KPI Row ── */}
          <SectionWrapper>
            <div className="rounded-[6px] bg-[#e8f0f7] border border-[#dce8f0] p-2">
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

            {/* Primary KPI Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {KPI_DATA.slice(0, 6).map((kpi) => {
                const variant = kpi.variant as keyof typeof SEMANTIC_COLORS;
                const colors = SEMANTIC_COLORS[variant];
                const Icon = kpi.icon;
                const sparkData = SPARKLINES[kpi.label];
                const TrendIcon = kpi.trendUp ? TrendingUp : TrendingDown;
                const trendColor = kpi.trendUp ? '#22C55E' : '#DC2626';
                const cardContent = (
                  <div className="bg-white rounded-[6px] border border-[#e2eaf2] shadow-[0_1px_6px_rgba(61,107,142,0.07)] p-3 flex flex-col justify-between group transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(61,107,142,0.13)] hover:border-[#c8d8e8] relative overflow-hidden h-[88px] cursor-default" title={kpi.tooltip}>
                    <div className="absolute top-0 left-0 right-0 h-[2px] group-hover:h-[3px] transition-all duration-200" style={{ backgroundColor: colors.main }} />
                    <div className="flex items-start justify-between">
                      <p className="text-[9px] font-bold text-[#6b8299] uppercase tracking-[0.6px] leading-tight pr-1">{kpi.label}</p>
                      <div className={cn('w-5 h-5 rounded-[4px] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110', colors.iconBg)}>
                        <Icon className="w-3 h-3" style={{ color: colors.main }} />
                      </div>
                    </div>
                    <div className="flex items-end justify-between gap-1">
                      <div>
                        <p className="text-[15px] font-black text-[#1e3448] leading-none tabular-nums">{kpi.value}</p>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          <TrendIcon className="w-2.5 h-2.5" style={{ color: trendColor }} />
                          <span className="text-[9px] font-bold" style={{ color: trendColor }}>{kpi.trend}</span>
                        </div>
                      </div>
                      {sparkData && (
                        <div className="opacity-50 group-hover:opacity-90 transition-opacity">
                          <Sparkline data={sparkData} color={colors.main} />
                        </div>
                      )}
                    </div>
                  </div>
                );
                if (kpi.link) {
                  return <Link key={kpi.label} to={kpi.link} className="block hover:no-underline">{cardContent}</Link>;
                }
                return <div key={kpi.label}>{cardContent}</div>;
              })}
            </div>

            {/* Secondary KPI Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {KPI_DATA.slice(6).map((kpi) => {
                const variant = kpi.variant as keyof typeof SEMANTIC_COLORS;
                const colors = SEMANTIC_COLORS[variant];
                const Icon = kpi.icon;
                const TrendIcon = kpi.trendUp ? TrendingUp : TrendingDown;
                const trendColor = kpi.trendUp ? '#22C55E' : '#DC2626';
                return (
                  <div key={kpi.label} className="bg-white rounded-[6px] border border-[#e2eaf2] shadow-[0_1px_4px_rgba(61,107,142,0.06)] px-2.5 py-2 flex items-center gap-2 cursor-default hover:shadow-[0_4px_12px_rgba(61,107,142,0.11)] hover:translate-y-[-1px] hover:border-[#c8d8e8] transition-all duration-200" title={kpi.tooltip}>
                    <div className={cn('w-6 h-6 rounded-[4px] flex items-center justify-center shrink-0', colors.iconBg)}>
                      <Icon className="w-3 h-3" style={{ color: colors.main }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-bold text-[#6b8299] uppercase tracking-[0.5px] truncate leading-none mb-0.5">{kpi.label}</p>
                      <p className="text-[13px] font-black text-[#1e3448] leading-none tabular-nums">{kpi.value}</p>
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

          {/* ── Role-based content ── */}
          <div key={dashboardRole} className="flex flex-col" style={{ gap: 'var(--section-gap)' }}>
            {dashboardRole === 'analyst' && <AnalystView
              mapFilter={mapFilter}
              setMapFilter={setMapFilter}
              filteredVehicles={filteredVehicles}
              hoveredVehicle={hoveredVehicle}
              setHoveredVehicle={setHoveredVehicle}
              selectedVehicle={selectedVehicle}
              setSelectedVehicle={setSelectedVehicle}
              selectedVehicleData={selectedVehicleData}
            />}
            {dashboardRole === 'ceo' && <CEOView />}
            {dashboardRole === 'manager' && <ManagerView />}
            {dashboardRole === 'operations' && (
              <OperationsView
                mapFilter={mapFilter}
                setMapFilter={setMapFilter}
                filteredVehicles={filteredVehicles}
                hoveredVehicle={hoveredVehicle}
                setHoveredVehicle={setHoveredVehicle}
                selectedVehicle={selectedVehicle}
                setSelectedVehicle={setSelectedVehicle}
                selectedVehicleData={selectedVehicleData}
              />
            )}
            {dashboardRole === 'dispatcher' && <DispatcherView />}
            {dashboardRole === 'workshop' && <WorkshopView />}
            {dashboardRole === 'viewer' && <ViewerView />}
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
