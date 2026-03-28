import { useMemo, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { PageSurface, PAGE_SURFACE_FOOTER_PADDING } from '@/components/layout';
import {
  BUS_LIVE_VEHICLES,
  DUMMY_MAP_CENTER,
} from '@/data/bus-live-tracking-mock-data';
import { typography } from '@/lib/typography';

// Tracking Components
import { FleetMap, type BusLiveMapMarker } from '@/components/tracking/FleetMap';
import { VehicleListDrawer } from '@/components/tracking/VehicleListDrawer';
import { VehicleDetailsDrawer } from '@/components/tracking/VehicleDetailsDrawer';
import { TrackingKpiCards } from '@/components/tracking/TrackingKpiCards';
import { DrawerToggleButton } from '@/components/tracking/DrawerToggleButton';

export default function BusLiveTrackingPage() {
  // State: Both panels open for a balanced "production hub" feel
  const [selectedId, setSelectedId] = useState<number>(BUS_LIVE_VEHICLES[0]?.id || 0);
  const [isListOpen, setIsListOpen] = useState(true); 
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);

  // Memoized Data
  const vehicles = useMemo(() => BUS_LIVE_VEHICLES, []);
  
  const selectedVehicle = useMemo(
    () => vehicles.find((v) => v.id === selectedId) || null,
    [selectedId, vehicles]
  );

  const mapVehicles = useMemo((): BusLiveMapMarker[] => 
    vehicles.map(v => ({
      id: v.id,
      lat: v.lat ?? DUMMY_MAP_CENTER.lat,
      lng: v.lng ?? DUMMY_MAP_CENTER.lng,
      label: v.plate,
      status: v.status as any,
      speed: v.speed,
      engineStatus: v.engineStatus
    })), [vehicles]
  );

  // Stable viewport: do not tie center to selection — avoids flyTo/remount feel when changing plate.
  const mapCenter = useMemo(() => DUMMY_MAP_CENTER, []);

  // Handlers
  const handleSelectVehicle = useCallback((id: number) => {
    setSelectedId(id);
    setIsDetailsOpen(true);
  }, []);

  const toggleList = useCallback(() => setIsListOpen(prev => !prev), []);
  const toggleDetails = useCallback(() => setIsDetailsOpen(prev => !prev), []);
  const closeDetails = useCallback(() => {
    setIsDetailsOpen(false);
    setSelectedId(0);
  }, []);

  return (
    <PageSurface
      padding={PAGE_SURFACE_FOOTER_PADDING}
      fill
      sectionGap="none"
      className="bg-slate-50"
    >
      <PageSurface.Body className="min-h-0 flex-1 overflow-hidden">
      <div className="relative flex h-full min-h-0 w-full flex-1 overflow-hidden">
        
        {/* Left Sidebar - Fleet Resource Panel */}
        <aside className={cn(
          "relative h-full border-r border-slate-200 bg-white/80 backdrop-blur-xl z-[40] transition-all duration-500 ease-in-out shrink-0 overflow-hidden",
          isListOpen ? "w-[300px] opacity-100 visible" : "w-0 opacity-0 invisible"
        )}>
          <div className="w-[300px] h-full overflow-hidden">
            <VehicleListDrawer 
              vehicles={vehicles}
              onClose={() => setIsListOpen(false)}
              selectedId={selectedId}
              onSelect={handleSelectVehicle}
            />
          </div>
        </aside>

        {/* MAP AREA - Central Operational Theatre */}
        <main className="flex-1 min-w-0 h-full relative overflow-hidden bg-slate-100">
           {/* Map Component - Edge to Edge in this area */}
           <div className="absolute inset-0 w-full h-full">
              <FleetMap 
                  center={mapCenter}
                  vehicles={mapVehicles}
                  selectedId={selectedId}
                  onSelectVehicle={handleSelectVehicle}
              />
           </div>

           {/* Overlays within the map area */}
           <div className="absolute left-2 right-2 top-2 z-[45] pointer-events-none">
              <TrackingKpiCards className="pointer-events-auto" />
           </div>

           {/* Floating Legend */}
           <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[30] pointer-events-none">
              <div className="flex items-center gap-4 px-4 py-2 bg-white/95 backdrop-blur-md border border-slate-200/60 shadow-xl rounded-full">
                  {[
                    { color: 'bg-emerald-500', label: 'Online' },
                    { color: 'bg-amber-400', label: 'Idling' },
                    { color: 'bg-rose-500', label: 'Alarm' },
                    { color: 'bg-slate-400', label: 'Offline' },
                  ].map((st, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={cn("h-2 w-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]", st.color)} />
                      <span className={cn(typography.meta, 'leading-none text-slate-500')}>
                        {st.label}
                      </span>
                    </div>
                  ))}
              </div>
           </div>

           {/* Drawer Toggles (Floating) */}
           <DrawerToggleButton 
             side="left"
             isOpen={isListOpen} 
             onClick={toggleList} 
             className="top-20 left-0 rounded-l-none shadow-md" 
           />
           <DrawerToggleButton 
             side="right"
             isOpen={isDetailsOpen && !!selectedVehicle} 
             onClick={toggleDetails}
             className="top-20 right-0 rounded-r-none shadow-md"
           />
        </main>

        {/* Right Panel - Vehicle Telemetry */}
        <aside className={cn(
          "relative h-full border-l border-slate-200 bg-white/80 backdrop-blur-xl z-[40] transition-all duration-500 ease-in-out shrink-0 overflow-hidden",
          (isDetailsOpen && !!selectedVehicle) ? "w-[330px] opacity-100 visible" : "w-0 opacity-0 invisible"
        )}>
           <div className="w-[330px] h-full overflow-hidden">
             <VehicleDetailsDrawer 
               vehicle={selectedVehicle}
               onClose={closeDetails}
             />
           </div>
        </aside>

      </div>
      </PageSurface.Body>
      <PageSurface.Footer />
    </PageSurface>
  );
}


