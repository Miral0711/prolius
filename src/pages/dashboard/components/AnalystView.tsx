import {
  Activity, AlertTriangle, Fuel, Gauge, MapPinned, Navigation, ShieldCheck,
  PenTool as Tool, Truck, Users, Wrench, Route, Timer, TrendingUp, TrendingDown,
  CalendarClock, UserCheck, ArrowUpRight, ArrowDownRight, Star,
} from 'lucide-react';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ComposedChart,
  Legend, Line, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';
import {
  dashboardTableHeaderCellClass,
  dashboardTableHeaderRowClass,
} from '@/components/dashboard/GridTable';
import {
  HISTORICAL_SAFETY_DATA, PERFORMANCE_EFFICIENCY_DATA, VIOLATIONS_DATA,
  ALERTS_DONUT, SPEED_VIOLATIONS_DATA, LIVE_ACTIVITY_FEED, TRIP_STATUS_DATA,
  MAP_VEHICLES, DASHBOARD_DRIVERS, DASHBOARD_TRIPS,
} from '../mockData';
import { MAP_MARKER_STYLES, type MapFilter } from './dashboardTokens';
import { DashCard, SectionWrapper, SectionTitle } from './DashboardPrimitives';

interface AnalystViewProps {
  mapFilter: MapFilter;
  setMapFilter: (f: MapFilter) => void;
  filteredVehicles: typeof MAP_VEHICLES;
  hoveredVehicle: string | null;
  setHoveredVehicle: (id: string | null) => void;
  selectedVehicle: string | null;
  setSelectedVehicle: (id: string | null) => void;
  selectedVehicleData: typeof MAP_VEHICLES[number] | undefined;
}

const STATUS_STYLES: Record<string, string> = {
  Completed: 'bg-[#EAF9F0] text-[#22C55E] border-[#22C55E]/20',
  'In Progress': 'bg-[#eef4f8] text-[#3d6b8e] border-[#3d6b8e]/20',
  Delayed: 'bg-[#FEECEC] text-[#DC2626] border-[#DC2626]/20',
};

const TYPE_STYLES: Record<string, string> = {
  Delivery: 'bg-[#fdeee6] text-[#e8622a]',
  Passenger: 'bg-[#eef4f8] text-[#3d6b8e]',
  Logistics: 'bg-[#f0f4f8] text-[#5a8aad]',
};

export function AnalystView({
  mapFilter, setMapFilter, filteredVehicles,
  hoveredVehicle, setHoveredVehicle,
  selectedVehicle, setSelectedVehicle, selectedVehicleData,
}: AnalystViewProps) {
  const filterLabels: Record<MapFilter, string> = { all: 'All', available: 'Available', 'on-trip': 'On Trip', maintenance: 'Maint.', alert: 'Alerts' };
  const chipColors: Record<MapFilter, string> = { all: '#3d6b8e', available: '#22C55E', 'on-trip': '#3d6b8e', maintenance: '#e8622a', alert: '#DC2626' };

  return (
    <>
      {/* SECTION 2: Live Fleet Monitor */}
      <SectionWrapper>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-10">
          <DashCard variant="blue" important className="lg:col-span-7 p-2 h-full">
            <div className="flex items-center justify-between mb-1.5">
              <SectionTitle title="Live Fleet Monitor" variant="blue" className="mb-0" />
              <div className="flex items-center gap-0.5 flex-wrap justify-end">
                {(Object.keys(filterLabels) as MapFilter[]).map((f) => {
                  const active = mapFilter === f;
                  return (
                    <button key={f} onClick={() => setMapFilter(f)}
                      className={cn('px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider border transition-all', active ? 'text-white shadow-sm' : 'bg-white text-[#4f6478] border-[#d4e0ea] hover:border-[#3d6b8e]/40')}
                      style={active ? { backgroundColor: chipColors[f], borderColor: chipColors[f] } : {}}>
                      {filterLabels[f]}
                    </button>
                  );
                })}
              </div>
            </div>
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
              <div className="absolute right-3 top-3 z-10 flex items-center gap-2 rounded-full bg-white px-2 py-1 shadow-sm">
                <MapPinned className="h-3 w-3 text-[#3d6b8e]" />
                <span className="text-[9px] font-black text-[#4f6478] uppercase tracking-widest">Active View</span>
              </div>
              <div className="absolute right-2 bottom-2 z-10 bg-white/90 backdrop-blur-sm rounded-[6px] px-1.5 py-1 shadow-sm border border-[#e8eef4] flex flex-col gap-0.5">
                {Object.entries(MAP_MARKER_STYLES).map(([key, s]) => (
                  <div key={key} className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full border border-white shadow-sm" style={{ backgroundColor: s.color }} />
                    <span className="text-[7px] font-bold text-[#4f6478] uppercase tracking-wider">{s.label}</span>
                  </div>
                ))}
              </div>
              {filteredVehicles.map((vehicle) => {
                const styles = MAP_MARKER_STYLES[vehicle.status];
                const isHovered = hoveredVehicle === vehicle.id;
                const isSelected = selectedVehicle === vehicle.id;
                return (
                  <div key={vehicle.id} className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                    style={{ left: vehicle.left, top: vehicle.top }}
                    onMouseEnter={() => setHoveredVehicle(vehicle.id)}
                    onMouseLeave={() => setHoveredVehicle(null)}
                    onClick={() => setSelectedVehicle(selectedVehicle === vehicle.id ? null : vehicle.id)}>
                    <div className={cn('absolute -inset-1 rounded-full animate-pulse', styles.halo)} />
                    <div className={cn('relative h-4 w-4 rounded-full border-[2px] border-white shadow-[0_4px_10px_rgba(15,23,42,0.2)] transition-transform', styles.dot, (isHovered || isSelected) && 'scale-125')}>
                      <div className={cn('absolute -inset-1 rounded-full border', styles.ring)} />
                    </div>
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
            {selectedVehicleData && (
              <div className="mt-1.5 p-2 rounded-[8px] bg-[#eef4f8] border border-[#d4e0ea] flex items-center gap-3">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: MAP_MARKER_STYLES[selectedVehicleData.status].color }} />
                <div className="flex-1 grid grid-cols-4 gap-2">
                  <div><p className="text-[8px] text-[#6b8299] uppercase tracking-widest font-black">Vehicle</p><p className="text-[10px] font-black text-[#1e3448]">{selectedVehicleData.id}</p></div>
                  <div><p className="text-[8px] text-[#6b8299] uppercase tracking-widest font-black">Status</p><p className="text-[10px] font-black" style={{ color: MAP_MARKER_STYLES[selectedVehicleData.status].color }}>{MAP_MARKER_STYLES[selectedVehicleData.status].label}</p></div>
                  <div><p className="text-[8px] text-[#6b8299] uppercase tracking-widest font-black">Driver</p><p className="text-[10px] font-black text-[#1e3448]">{selectedVehicleData.driver}</p></div>
                  <div><p className="text-[8px] text-[#6b8299] uppercase tracking-widest font-black">Speed</p><p className="text-[10px] font-black text-[#1e3448]">{selectedVehicleData.speed}</p></div>
                </div>
                <button onClick={() => setSelectedVehicle(null)} className="text-[#6b8299] hover:text-[#1e3448] text-[10px] font-black">x</button>
              </div>
            )}
          </DashCard>
          <div className="flex flex-col gap-3 lg:col-span-3">
            <DashCard variant="secondaryBlue" className="p-2 shadow-sm">
              <SectionTitle title="Health & Compliance" variant="secondaryBlue" />
              <div className="space-y-1.5">
                {[
                  { label: 'Roadworthy', val: '84%', pct: 84, color: '#22C55E' },
                  { label: 'Off Road', val: '9%', pct: 9, color: '#3d6b8e' },
                  { label: 'Under Inspection', val: '7%', pct: 7, color: '#5a8aad' },
                ].map(({ label, val, pct, color }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between text-[10px] mb-0.5">
                      <span className="font-bold text-[#4f6478]">{label}</span>
                      <span className="font-black tracking-tight" style={{ color }}>{val}</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#dce8f0] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
                    </div>
                  </div>
                ))}
              </div>
            </DashCard>
            <DashCard variant="green" className="p-2 shadow-sm">
              <SectionTitle title="Efficiency Summary" variant="green" />
              <div className="grid grid-cols-2 gap-1">
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
                    <div className="h-1 w-full bg-[#dce8f0] rounded-full overflow-hidden mt-0.5">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                    </div>
                  </div>
                ))}
              </div>
            </DashCard>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[['Moving', '302', '#3d6b8e'], ['Idle', '166', '#e8622a'], ['Avg Speed', '48 km/h', '#22C55E'], ['In City %', '64%', '#5a8aad']].map(([label, value, color]) => (
            <div key={label} className="px-2.5 py-1.5 rounded-[6px] bg-white border border-[#e2eaf2] shadow-[0_1px_4px_rgba(61,107,142,0.06)] flex items-center gap-2 hover:shadow-[0_3px_10px_rgba(61,107,142,0.10)] hover:border-[#c8d8e8] hover:translate-y-[-1px] transition-all duration-200">
              <div>
                <p className="text-[8px] text-[#6b8299] font-bold uppercase tracking-[0.6px] leading-none">{label}</p>
                <p className="text-[12px] font-black mt-0.5 leading-none tabular-nums" style={{ color }}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* SECTION 3: Analytics Overview Strip */}
      <SectionWrapper>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Today's Trips", value: '142', icon: Route, color: '#3d6b8e', bg: '#dce8f0', trend: '+12', up: true },
            { label: 'Avg Trip Dist.', value: '38.4 km', icon: Navigation, color: '#5a8aad', bg: '#dce8f0', trend: '+2.1', up: true },
            { label: 'Idle Time', value: '2.4 h', icon: Timer, color: '#e8622a', bg: '#fdeee6', trend: '-0.3h', up: false },
            { label: 'Total Distance', value: '5,452 km', icon: Activity, color: '#3d6b8e', bg: '#dce8f0', trend: '+340', up: true },
          ].map(({ label, value, icon: Icon, color, bg, trend, up }) => (
            <div key={label} className="bg-white rounded-[6px] border border-[#e2eaf2] shadow-[0_1px_6px_rgba(61,107,142,0.07)] px-2.5 py-2 flex items-center gap-2 hover:translate-y-[-1px] hover:shadow-[0_4px_14px_rgba(61,107,142,0.11)] hover:border-[#c8d8e8] transition-all duration-200 cursor-default">
              <div className="w-6 h-6 rounded-[4px] flex items-center justify-center shrink-0" style={{ backgroundColor: bg }}>
                <Icon className="w-3 h-3" style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-bold text-[#6b8299] uppercase tracking-[0.5px] leading-none mb-0.5 truncate">{label}</p>
                <p className="text-[13px] font-black text-[#1e3448] leading-none tabular-nums">{value}</p>
              </div>
              <div className="flex items-center gap-0.5 shrink-0">
                {up ? <TrendingUp className="w-2.5 h-2.5 text-[#22C55E]" /> : <TrendingDown className="w-2.5 h-2.5 text-[#DC2626]" />}
                <span className="text-[9px] font-bold" style={{ color: up ? '#22C55E' : '#DC2626' }}>{trend}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Fuel Consumed', value: '1,840 L', icon: Fuel, color: '#e8622a', bg: '#fdeee6', trend: '-60L', up: false },
            { label: 'Service Due', value: '14', icon: CalendarClock, color: '#DC2626', bg: '#FEECEC', trend: '+2', up: false },
            { label: 'Maint. Alerts', value: '8', icon: Wrench, color: '#e8622a', bg: '#fdeee6', trend: '-3', up: false },
          ].map(({ label, value, icon: Icon, color, bg, trend, up }) => (
            <div key={label} className="bg-white rounded-[6px] border border-[#e2eaf2] shadow-[0_1px_6px_rgba(61,107,142,0.07)] px-2.5 py-2 flex items-center gap-2 hover:translate-y-[-1px] hover:shadow-[0_4px_14px_rgba(61,107,142,0.11)] hover:border-[#c8d8e8] transition-all duration-200 cursor-default">
              <div className="w-6 h-6 rounded-[4px] flex items-center justify-center shrink-0" style={{ backgroundColor: bg }}>
                <Icon className="w-3 h-3" style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-bold text-[#6b8299] uppercase tracking-[0.5px] leading-none mb-0.5 truncate">{label}</p>
                <p className="text-[13px] font-black text-[#1e3448] leading-none tabular-nums">{value}</p>
              </div>
              <div className="flex items-center gap-0.5 shrink-0">
                {up ? <TrendingUp className="w-2.5 h-2.5 text-[#22C55E]" /> : <TrendingDown className="w-2.5 h-2.5 text-[#DC2626]" />}
                <span className="text-[9px] font-bold" style={{ color: up ? '#22C55E' : '#DC2626' }}>{trend}</span>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* SECTION 4: Historical Safety */}
      <SectionWrapper>
        <DashCard variant="orange" className="p-3">
          <SectionTitle title="Historical Safety & Risk Analysis" variant="orange" />
          <div className="h-[148px] bg-white rounded-[8px] p-1 border border-transparent">
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
        </DashCard>
      </SectionWrapper>

      {/* SECTION 5: Maintenance / Inspections / Expiries */}
      <SectionWrapper>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <DashCard variant="orange" className="p-2 flex flex-col gap-1.5">
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
            <div className="flex flex-col gap-1">
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
          </DashCard>
          <DashCard variant="secondaryBlue" className="p-2 flex flex-col gap-1.5">
            <SectionTitle title="Upcoming Inspections" variant="secondaryBlue" className="mb-0" />
            <div className="flex flex-col gap-1">
              {[
                { time: '08:30', vehicle: 'VH-141', task: 'Pre-trip check' },
                { time: '10:15', vehicle: 'VH-207', task: 'Brake review' },
                { time: '13:00', vehicle: 'VH-080', task: 'Annual fitness' },
              ].map((item) => (
                <div key={item.vehicle} className="flex items-center gap-2 px-2 py-1.5 rounded-[6px] bg-[#f4f8fb] border-l-2 border-l-[#5a8aad] hover:bg-[#eef4f8] transition-colors cursor-default">
                  <span className="text-[9px] font-black text-[#5a8aad] w-9 shrink-0">{item.time}</span>
                  <span className="text-[9px] font-black text-[#1e3448] shrink-0">{item.vehicle}</span>
                  <span className="text-[9px] font-medium text-[#6b8299] truncate">{item.task}</span>
                </div>
              ))}
            </div>
          </DashCard>
          <DashCard variant="blue" className="p-2 flex flex-col gap-1.5">
            <SectionTitle title="Upcoming Expiries" variant="blue" className="mb-0" />
            <div className="flex flex-col gap-1">
              {[
                { vehicle: 'VH-058', doc: 'Insurance', days: 4, urgent: true },
                { vehicle: 'VH-221', doc: 'Permit', days: 6, urgent: false },
                { vehicle: 'VH-099', doc: 'Emission cert', days: 9, urgent: false },
              ].map((item) => (
                <div key={item.vehicle} className="flex items-center gap-2 px-2 py-1.5 rounded-[6px] bg-[#f4f8fb] border-l-2 border-l-[#3d6b8e] hover:bg-[#eef4f8] transition-colors cursor-default">
                  <span className="text-[9px] font-black text-[#1e3448] shrink-0">{item.vehicle}</span>
                  <span className="text-[9px] font-medium text-[#6b8299] flex-1 truncate">{item.doc}</span>
                  <span className={cn('text-[8px] font-black px-1.5 py-0.5 rounded-full shrink-0', item.urgent ? 'bg-[#FEECEC] text-[#DC2626]' : 'bg-[#eef4f8] text-[#5a8aad]')}>{item.days}d</span>
                </div>
              ))}
            </div>
          </DashCard>
        </div>
      </SectionWrapper>

      {/* SECTION 6: Performance & Violations */}
      <SectionWrapper>
          <DashCard variant="green" className="p-3">
            <SectionTitle title="Fleet Performance & Efficiency Trends" variant="green" />
            <div className="h-[148px] rounded-[8px] border border-transparent bg-white p-1">
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
          </DashCard>
          <DashCard variant="orange" className="p-3">
            <SectionTitle title="Regulatory Violations & Geofence Breaches" variant="orange" />
            <div className="h-[148px] rounded-[8px] border border-transparent bg-white p-1">
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
          </DashCard>
      </SectionWrapper>

      {/* SECTION 8: Safety and Alerts */}
      <SectionWrapper>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <DashCard variant="red" className="lg:col-span-4 p-2">
            <SectionTitle title="Alerts Distribution" variant="red" />
            <div className="flex items-center gap-2">
              <div className="relative shrink-0">
                <ResponsiveContainer width={90} height={90}>
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
          </DashCard>
          <DashCard variant="orange" className="lg:col-span-5 p-2">
            <div className="flex items-center justify-between mb-1.5">
              <SectionTitle title="Speed Violations" variant="orange" className="mb-0" />
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[8px] font-bold text-[#4f6478] uppercase tracking-wider"><span className="w-1.5 h-1.5 rounded-sm bg-[#e8622a] inline-block" /> Daily</span>
                <span className="flex items-center gap-1 text-[8px] font-bold text-[#4f6478] uppercase tracking-wider"><span className="w-1.5 h-1.5 rounded-sm bg-[#3d6b8e] inline-block" /> Weekly</span>
              </div>
            </div>
            <div className="h-[110px]">
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
          </DashCard>
          <DashCard variant="secondaryBlue" className="lg:col-span-3 p-2">
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
          </DashCard>
        </div>
      </SectionWrapper>

      {/* SECTION 9: Tables + Operation Panel */}
      <SectionWrapper>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-stretch">
          <div className="flex flex-col gap-3 lg:col-span-8 min-h-0 h-full">
            {/* Drivers Table */}
            <DashCard variant="green" className="p-0 overflow-hidden">
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
                    {DASHBOARD_DRIVERS.map((d, i) => (
                      <tr key={d.name} className={cn('group transition-colors duration-150 border-b border-[#f0f4f8] hover:bg-[#f4f8fb]', i % 2 === 1 && 'bg-[#fafcfd]')}>
                        <td className="h-[36px] px-3 align-middle">
                          <div className={cn('w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black border',
                            d.rank === 1 && 'bg-amber-50 text-amber-600 border-amber-200',
                            d.rank === 2 && 'bg-slate-100 text-slate-500 border-slate-200',
                            d.rank === 3 && 'bg-orange-50 text-orange-500 border-orange-200',
                            d.rank > 3 && 'bg-[#eef4f8] text-[#5a8aad] border-[#d4e0ea]',
                          )}>{d.rank}</div>
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
                            : <span className="inline-flex items-center gap-0.5 text-[#DC2626] text-[8px] font-black"><ArrowDownRight className="w-3 h-3" />Down</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DashCard>

            {/* Trips Table */}
            <DashCard variant="blue" className="p-0 overflow-hidden">
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
                    {DASHBOARD_TRIPS.map((t, i) => (
                      <tr key={t.id} className={cn('group transition-colors duration-150 border-b border-[#f0f4f8] hover:bg-[#f4f8fb]', i % 2 === 1 && 'bg-[#fafcfd]')}>
                        <td className="h-[36px] px-3 align-middle">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#2e4258]">
                            <div className="w-1 h-1 rounded-full bg-[#3d6b8e]" />{t.id}
                          </div>
                        </td>
                        <td className="h-[36px] px-3 align-middle text-[10px] font-medium text-[#2e4258]">{t.route}</td>
                        <td className="h-[36px] px-3 align-middle text-[10px] font-medium text-[#4f6478]">{t.dur}</td>
                        <td className="h-[36px] px-3 align-middle">
                          <span className={cn('px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider border', STATUS_STYLES[t.status] ?? 'bg-slate-100 text-slate-500 border-slate-200')}>{t.status}</span>
                        </td>
                        <td className="h-[36px] px-3 align-middle">
                          <span className={cn('px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider', TYPE_STYLES[t.type] ?? 'bg-slate-100 text-slate-500')}>{t.type}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DashCard>

            {/* Quick Actions */}
            <DashCard variant="blue" className="p-2.5">
              <SectionTitle title="Quick Actions" variant="blue" className="mb-0" />
              <div className="grid grid-cols-3 gap-1.5 mt-1.5">
                {[
                  { label: 'Create Trip', icon: Route, color: '#3d6b8e', bg: 'bg-[#dce8f0]', hover: 'hover:bg-[#3d6b8e]', to: '/trips/new' },
                  { label: 'Assign Driver', icon: UserCheck, color: '#22C55E', bg: 'bg-[#22C55E]/10', hover: 'hover:bg-[#22C55E]', to: '/drivers/assign' },
                  { label: 'Add Vehicle', icon: Truck, color: '#5a8aad', bg: 'bg-[#dce8f0]', hover: 'hover:bg-[#5a8aad]', to: '/fleet/add' },
                  { label: 'Raise Alert', icon: AlertTriangle, color: '#DC2626', bg: 'bg-[#FEECEC]', hover: 'hover:bg-[#DC2626]', to: '/tracking/alerts/new' },
                  { label: 'Schedule Maint.', icon: CalendarClock, color: '#e8622a', bg: 'bg-[#fdeee6]', hover: 'hover:bg-[#e8622a]', to: '/maintenance/schedule' },
                  { label: 'View Reports', icon: TrendingUp, color: '#3d6b8e', bg: 'bg-[#dce8f0]', hover: 'hover:bg-[#3d6b8e]', to: '/reports' },
                ].map(({ label, icon: Icon, color, bg, hover, to }) => (
                  <Link key={label} to={to} className={cn('group flex flex-col items-center justify-center gap-1.5 px-2 py-2.5 rounded-[8px] border border-[#e8eef4] bg-white transition-all duration-200 cursor-pointer hover:border-transparent hover:shadow-[0_4px_12px_rgba(61,107,142,0.15)] hover:translate-y-[-1px]', hover, 'hover:text-white')}>
                    <div className={cn('w-7 h-7 rounded-[6px] flex items-center justify-center transition-all duration-200', bg, 'group-hover:bg-white/20')}>
                      <Icon className="w-3.5 h-3.5 transition-colors duration-200" style={{ color }} />
                    </div>
                    <span className="text-[9px] font-black text-[#4f6478] uppercase tracking-wider text-center leading-tight transition-colors duration-200 group-hover:text-white">{label}</span>
                  </Link>
                ))}
              </div>
            </DashCard>

            {/* Pending Tasks */}
            <DashCard variant="orange" className="p-2.5 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-1.5">
                <SectionTitle title="Pending Tasks" variant="orange" className="mb-0" />
                <span className="text-[8px] font-black text-white bg-[#e8622a] px-1.5 py-0.5 rounded-full">10</span>
              </div>
              <div className="flex flex-col gap-1.5 flex-1 justify-between">
                {[
                  { icon: ShieldCheck, label: 'Inspections due today', count: 3, color: '#3d6b8e', bg: 'bg-[#eef4f8]', text: 'text-[#3d6b8e]', border: 'border-[#3d6b8e]/15' },
                  { icon: UserCheck, label: 'Vehicles awaiting driver assignment', count: 2, color: '#e8622a', bg: 'bg-[#fdeee6]', text: 'text-[#e8622a]', border: 'border-[#e8622a]/15' },
                  { icon: Wrench, label: 'Maintenance jobs pending', count: 4, color: '#5a8aad', bg: 'bg-[#eef4f8]', text: 'text-[#5a8aad]', border: 'border-[#5a8aad]/15' },
                  { icon: AlertTriangle, label: 'Unresolved alert escalations', count: 1, color: '#DC2626', bg: 'bg-[#FEECEC]', text: 'text-[#DC2626]', border: 'border-[#DC2626]/15' },
                ].map(({ icon: Icon, label, count, color, bg, text, border }) => (
                  <div key={label} className={cn('flex items-center gap-2.5 px-2.5 py-2 rounded-[7px] border cursor-default hover:brightness-95 transition-all', bg, border)}>
                    <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 bg-white/60">
                      <Icon className="w-3 h-3" style={{ color }} />
                    </div>
                    <span className="text-[10px] font-medium text-[#2e4258] flex-1 leading-tight">{label}</span>
                    <span className={cn('text-[11px] font-black shrink-0', text)}>{count}</span>
                  </div>
                ))}
              </div>
            </DashCard>
          </div>

          {/* Right: Operation Panel */}
          <div className="flex flex-col gap-3 lg:col-span-4 h-full">
            <DashCard variant="blue" className="p-2">
              <div className="flex items-center justify-between mb-1">
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
            </DashCard>

            <DashCard variant="green" className="p-2">
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
            </DashCard>

            <DashCard variant="orange" className="p-2">
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
            </DashCard>

            <DashCard variant="secondaryBlue" className="p-2">
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
            </DashCard>

            <DashCard variant="orange" className="p-2">
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
            </DashCard>

            <DashCard variant="secondaryBlue" className="p-2 flex-1">
              <SectionTitle title="System Status" variant="secondaryBlue" />
              <div className="flex flex-col gap-1">
                {[
                  { label: 'GPS Connectivity', value: '92%', dot: 'bg-[#22C55E]', text: 'text-[#22C55E]' },
                  { label: 'API Status', value: 'Healthy', dot: 'bg-[#22C55E]', text: 'text-[#22C55E]' },
                  { label: 'Data Sync', value: 'Real-time', dot: 'bg-[#3d6b8e]', text: 'text-[#3d6b8e]' },
                  { label: 'Active Systems', value: 'OK', dot: 'bg-[#22C55E]', text: 'text-[#22C55E]' },
                ].map(({ label, value, dot, text }) => (
                  <div key={label} className="flex items-center justify-between px-2 py-1.5 rounded-[6px] bg-[#f4f8fb] border border-[#e8eef4]">
                    <div className="flex items-center gap-1.5">
                      <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dot)} />
                      <span className="text-[9px] font-semibold text-[#4f6478] uppercase tracking-wider">{label}</span>
                    </div>
                    <span className={cn('text-[9px] font-black', text)}>{value}</span>
                  </div>
                ))}
              </div>
            </DashCard>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
