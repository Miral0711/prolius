import { useEffect, useState, memo } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { Button } from '@/components/ui/button';
import { Maximize2, Layers, Crosshair, ZoomIn, ZoomOut } from 'lucide-react';

export type BusLiveMapMarker = {
  id: number;
  lat: number;
  lng: number;
  label: string;
  status: 'Online' | 'Offline' | 'Alarm' | 'Idling';
  speed?: number;
  engineStatus?: string;
};

const STATUS_COLOR: Record<BusLiveMapMarker['status'], string> = {
  Online: '#10b981',
  Offline: '#64748b',
  Alarm: '#ef4444',
  Idling: '#eab308',
};

const getVehicleIcon = (color: string, isSelected: boolean) =>
  L.divIcon({
    className: 'bus-live-marker',
    html: `<div style="
      width:${isSelected ? '28px' : '20px'};
      height:${isSelected ? '28px' : '20px'};
      border-radius:50%;
      background:${color};
      border:3px solid #fff;
      box-shadow:0 4px 12px rgba(0,0,0,0.2);
      display:flex;
      align-items:center;
      justify-content:center;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      ${isSelected ? 'transform: scale(1.1); z-index: 1000;' : ''}
    ">
      ${isSelected ? '<div style="width:7px; height:7px; background:white; border-radius:50%; box-shadow: 0 0 5px rgba(255,255,255,0.8);"></div>' : ''}
    </div>`,
    iconSize: isSelected ? [28, 28] : [20, 20],
    iconAnchor: isSelected ? [14, 14] : [10, 10],
  });

/** Resize / layout only — never flyTo on prop changes (selection updates stay smooth). */
const MapResizeHandler = () => {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);

    const observer = new ResizeObserver(() => {
      map.invalidateSize();
    });

    observer.observe(map.getContainer());

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [map]);

  return null;
};

// Memoized Marker component to prevent re-renders
const VehicleMarker = memo(({ marker, isSelected, onClick }: { 
  marker: BusLiveMapMarker; 
  isSelected: boolean;
  onClick: (id: number) => void;
}) => {
  const MarkerAny = Marker as any;
  const PopupAny = Popup as any;

  return (
    <MarkerAny
      position={[marker.lat, marker.lng]}
      icon={getVehicleIcon(STATUS_COLOR[marker.status] ?? '#64748b', isSelected)}
      eventHandlers={{
        click: () => onClick(marker.id),
      }}
    >
      <PopupAny className="custom-popup" offset={[0, -10]}>
        <div className="p-1 min-w-[130px]">
          <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-1.5">
             <div className={cn("h-2 w-2 rounded-full", marker.status === 'Online' ? 'bg-emerald-500' : 'bg-slate-400')} />
             <p className={cn(typography.body, 'truncate font-medium text-slate-800 tracking-tight')}>{marker.label}</p>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center gap-2">
              <span className={cn(typography.meta, 'text-slate-500')}>Velocity</span>
              <span className={cn(typography.body, 'font-medium text-slate-800 tabular-nums')}>{marker.speed || 0} KM/H</span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className={cn(typography.meta, 'text-slate-500')}>Engine</span>
              <span className={cn(typography.body, 'font-medium', marker.engineStatus === 'On' ? 'text-emerald-600' : 'text-slate-500')}>{marker.engineStatus || 'Off'}</span>
            </div>
          </div>
        </div>
      </PopupAny>
    </MarkerAny>
  );
});

VehicleMarker.displayName = 'VehicleMarker';

export interface FleetMapProps {
  center: { lat: number; lng: number };
  vehicles: BusLiveMapMarker[];
  selectedId: number;
  onSelectVehicle: (id: number) => void;
  className?: string;
}

export function FleetMap({
  center,
  vehicles,
  selectedId,
  onSelectVehicle,
  className = '',
}: FleetMapProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className={cn('flex h-full w-full items-center justify-center bg-slate-50 animate-pulse', typography.meta, 'text-slate-400')}>
        Initializing Dynamic Map Layer...
      </div>
    );
  }

  const MapContainerAny = MapContainer as any;

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <MapContainerAny
        center={[center.lat, center.lng]}
        zoom={13}
        className="h-full w-full z-0 [&_.leaflet-control-zoom]:hidden"
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer 
           url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" 
        />
        
        {vehicles.map((v) => (
          <VehicleMarker 
            key={v.id} 
            marker={v} 
            isSelected={v.id === selectedId}
            onClick={onSelectVehicle}
          />
        ))}

        <MapResizeHandler />
      </MapContainerAny>

      {/* Structured Utilities Overlay */}
      <div className="absolute top-[86px] right-4 flex flex-col gap-2 z-[30]">
        <GlassButton icon={Layers} />
        <GlassButton icon={Maximize2} />
        <GlassButton icon={Crosshair} />
      </div>

      <div className="absolute bottom-[24px] right-4 flex flex-col gap-2 z-[30]">
        <GlassButton icon={ZoomIn} className="rounded-b-none border-b-0" />
        <GlassButton icon={ZoomOut} className="rounded-t-none" />
      </div>
    </div>
  );
}

function GlassButton({ icon: Icon, className }: { icon: any; className?: string }) {
  return (
    <Button 
      size="icon" 
      variant="ghost" 
      className={cn(
        "h-9 w-9 rounded-lg bg-white/90 backdrop-blur-xl border border-white/60 hover:bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] text-slate-500 hover:text-blue-600 transition-all hover:scale-105 active:scale-95 group",
        className
      )}
    >
      <Icon className="h-4 w-4 transition-transform group-hover:rotate-3" />
    </Button>
  );
}


