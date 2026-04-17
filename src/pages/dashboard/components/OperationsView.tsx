import { cn } from '@/lib/utils';
import { MAP_VEHICLES, LIVE_ACTIVITY_FEED } from '../mockData';
import { MAP_MARKER_STYLES, type MapFilter } from './dashboardTokens';
import { DashCard, SectionWrapper, SectionTitle, RoleKpiTile } from './DashboardPrimitives';

interface OperationsViewProps {
  mapFilter: MapFilter;
  setMapFilter: (f: MapFilter) => void;
  filteredVehicles: typeof MAP_VEHICLES;
  hoveredVehicle: string | null;
  setHoveredVehicle: (id: string | null) => void;
  selectedVehicle: string | null;
  setSelectedVehicle: (id: string | null) => void;
  selectedVehicleData: typeof MAP_VEHICLES[number] | undefined;
}

export function OperationsView({
  mapFilter, setMapFilter, filteredVehicles,
  hoveredVehicle, setHoveredVehicle,
  selectedVehicle, setSelectedVehicle, selectedVehicleData,
}: OperationsViewProps) {
  const filterLabels: Record<MapFilter, string> = { all: 'All', available: 'Available', 'on-trip': 'On Trip', maintenance: 'Maint.', alert: 'Alerts' };
  const chipColors: Record<MapFilter, string> = { all: '#3d6b8e', available: '#22C55E', 'on-trip': '#3d6b8e', maintenance: '#e8622a', alert: '#DC2626' };

  return (
    <div className="flex flex-col" style={{ gap: 'var(--section-gap)' }}>
      <SectionWrapper>
        <div className="grid grid-cols-3 gap-2">
          <RoleKpiTile label="Active Trips" value="44" color="#3d6b8e" bg="bg-[#eef4f8]" />
          <RoleKpiTile label="Idle Vehicles" value="166" color="#e8622a" bg="bg-[#fdeee6]" />
          <RoleKpiTile label="Active Alerts" value="17" color="#DC2626" bg="bg-[#FEECEC]" />
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-10">
          {/* Map */}
          <DashCard variant="blue" important className="lg:col-span-7 p-2">
            <div className="flex items-center justify-between mb-1.5">
              <SectionTitle title="Live Fleet Monitor" variant="blue" className="mb-0" />
              <div className="flex items-center gap-0.5 flex-wrap justify-end">
                {(Object.keys(filterLabels) as MapFilter[]).map((f) => {
                  const active = mapFilter === f;
                  return (
                    <button key={f} onClick={() => setMapFilter(f)}
                      className={cn('px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider border transition-all', active ? 'text-white shadow-sm' : 'bg-white text-[#4f6478] border-[#d4e0ea]')}
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
                <button onClick={() => setSelectedVehicle(null)} className="text-[#6b8299] hover:text-[#1e3448] text-[10px] font-black">✕</button>
              </div>
            )}
            <div className="grid grid-cols-4 gap-1.5 mt-1.5">
              {[['Moving', '302', '#3d6b8e'], ['Idle', '166', '#e8622a'], ['Avg Speed', '48 km/h', '#22C55E'], ['In City %', '64%', '#5a8aad']].map(([label, value, color]) => (
                <div key={label} className="px-2 py-1.5 rounded-[6px] bg-[#f4f8fb] shadow-[0_1px_2px_rgba(37,61,89,0.06)] flex items-center gap-2">
                  <div>
                    <p className="text-[8px] text-[#6b8299] font-black uppercase tracking-widest leading-none">{label}</p>
                    <p className="text-[12px] font-black mt-0.5 leading-none" style={{ color }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </DashCard>

          {/* Live Activity */}
          <div className="flex flex-col gap-3 lg:col-span-3">
            <DashCard variant="blue" className="p-2">
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
            </DashCard>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
