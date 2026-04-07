'use client';

import { useEffect, useState, useMemo } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { type RoutePoint, MOCK_HISTORY_EVENTS } from '@/data/bus-history-mock-data';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

export interface BusHistoryMapCardProps {
  route: RoutePoint[];
  playbackIndex: number;
  onPlaybackChange: (index: number) => void;
  className?: string;
  height?: number | string;
}

const speedColors = {
  normal: '#10b981',   // Emerald
  moderate: '#f59e0b', // Amber
  overspeed: '#ef4444', // Red
  stop: '#3b82f6'      // Blue
};

const getSpeedColor = (speed: number) => {
  if (speed > 80) return speedColors.overspeed;
  if (speed > 50) return speedColors.moderate;
  return speedColors.normal;
};

// Custom Icon Helpers
const createIcon = (color: string, iconHtml?: string) => {
  // @ts-ignore
  return L.divIcon({
    className: 'custom-map-marker',
    html: `<div style="width:12px;height:12px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 0 8px rgba(0,0,0,0.08);display:flex;align-items:center;justify-content:center;">
      ${iconHtml || ''}
    </div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

// @ts-ignore
const vehicleIcon = L.divIcon({
  className: 'route-vehicle-marker',
  html: `<div style="width:24px;height:24px;border-radius:50%;background:#2563eb;border:2px solid #fff;box-shadow:0 0 12px rgba(37,99,235,0.4);display:flex;align-items:center;justify-content:center;transform:rotate(-45deg);">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>
  </div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export function BusHistoryMapCard({
  route,
  playbackIndex,
  onPlaybackChange,
  className = '',
  height = '100%',
}: BusHistoryMapCardProps) {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => setMounted(true), []);

  const center: [number, number] = route.length > 0 ? [route[0].lat, route[0].lng] : [24.7136, 46.6753];

  const segments = useMemo(() => {
    if (route.length < 2) return [];
    const res: { positions: [number, number][]; color: string }[] = [];
    for (let i = 0; i < route.length - 1; i++) {
      res.push({
        positions: [
          [route[i].lat, route[i].lng],
          [route[i+1].lat, route[i+1].lng]
        ],
        color: getSpeedColor(route[i].speed)
      });
    }
    return res;
  }, [route]);

  useEffect(() => {
    let interval: any;
    if (isPlaying && playbackIndex < route.length - 1) {
      interval = setInterval(() => {
        onPlaybackChange(playbackIndex + 1);
      }, 1000 / (playbackSpeed * 2)); // Doubled base speed for smoother operational feel
    } else if (playbackIndex >= route.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackIndex, route.length, playbackSpeed, onPlaybackChange]);

  if (!mounted) {
    return (
      <div
        className={cn(
          'flex w-full items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white/40 backdrop-blur-xl',
          typography.meta,
          'text-slate-500',
          className,
        )}
        style={{ height }}
      >
        Initialising Analytics Map...
      </div>
    );
  }

  const currentPoint = route[playbackIndex] || route[0];
  const progressPercent = (playbackIndex / (route.length - 1)) * 100;

  return (
    <div
      className={cn(
        'relative flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-2xl',
        className,
      )}
    >
        <div className="relative min-h-0 min-w-0 w-full flex-1 overflow-hidden">
        <MapContainer
          // @ts-ignore
          center={center}
          // @ts-ignore
          zoom={15}
          className="h-full min-h-0 w-full min-w-0 overflow-hidden"
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          <Polyline 
            positions={route.map(p => [p.lat, p.lng])} 
            pathOptions={{ color: '#cbd5e1', weight: 4, opacity: 0.4 }} 
          />

          {segments.map((seg, i) => (
            <Polyline 
              key={i}
              positions={seg.positions}
              pathOptions={{ color: seg.color, weight: 6, opacity: 0.9 }}
            />
          ))}

          {/* Critical Event Markers */}
          {MOCK_HISTORY_EVENTS.map((ev, i) => {
             // Find matching route point by timestamp (approx)
             const pt = route.find(p => p.timestamp.includes(ev.time.split(' ')[0]));
             if (!pt) return null;
             
             let iconColor = '#94a3b8';
             if (ev.type === 'Overspeed') iconColor = speedColors.overspeed;
             if (ev.type.includes('stopped')) iconColor = speedColors.stop;
             if (ev.type.includes('started')) iconColor = '#10b981';

             return (
               <Marker 
                 key={i}
                 // @ts-ignore
                 position={[pt.lat, pt.lng]}
                 // @ts-ignore
                 icon={createIcon(iconColor)}
               >
                 <Popup>
                   <div className="min-w-[140px] space-y-1 p-0.5">
                     <p className={cn(typography.body, 'font-medium text-slate-800 tracking-tight')}>
                       {ev.type}
                     </p>
                     <p className={cn(typography.meta, 'font-mono not-italic tabular-nums text-slate-500')}>
                       {ev.time}
                     </p>
                     <p className={cn(typography.meta, 'text-slate-500')}>{ev.location}</p>
                   </div>
                 </Popup>
               </Marker>
             );
          })}

          {currentPoint && (
            <Marker 
              // @ts-ignore
              position={[currentPoint.lat, currentPoint.lng] as [number, number]} 
              // @ts-ignore
              icon={vehicleIcon}
              // @ts-ignore
              zIndexOffset={2000}
            >
              <Popup>
                <div className="min-w-[100px] space-y-1.5 p-0.5 text-center">
                  <div className={cn(typography.meta, 'border-b border-slate-100 pb-1 font-mono not-italic text-[#2e5f8a] tabular-nums')}>
                    {currentPoint.timestamp}
                  </div>
                  <div className={cn(typography.kpi, 'tabular-nums text-slate-800')}>
                    {currentPoint.speed}{' '}
                    <span className={cn(typography.caption, 'font-normal text-slate-500')}>KM/H</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>

        {/* Integrated Floating Legend - Anchored */}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5 p-1 rounded-lg bg-white/95 backdrop-blur-xl border border-white/60 shadow-md z-[1000]">
            {[
              { label: 'Idle', color: speedColors.stop },
              { label: 'Normal', color: speedColors.normal },
              { label: 'Warn', color: speedColors.moderate },
              { label: 'Risk', color: speedColors.overspeed },
            ].map((l, i) => (
              <div key={i} className="flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors cursor-default">
                <div className="h-1.5 w-1.5 rounded-full shadow-inner" style={{ backgroundColor: l.color }} />
                <span className={cn(typography.meta, 'leading-none text-slate-600')}>{l.label}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Advanced Playback Console - Integrated */}
      <div className="flex h-[52px] w-full min-w-0 shrink-0 items-center gap-4 border-t border-slate-100 bg-[#f4f8fb]/95 px-4 backdrop-blur-2xl z-[1000]">
        
        {/* Actions Group */}
        <div className="flex items-center gap-2 shrink-0">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all rounded-lg"
            onClick={() => {
              onPlaybackChange(0);
              setIsPlaying(false);
            }}
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
          <Button 
            size="icon" 
            className={cn(
               "h-9 w-9 rounded-lg shadow-md transition-all active:scale-95",
               isPlaying ? "bg-slate-800 hover:bg-slate-900 shadow-slate-200" : "bg-[#2e5f8a] hover:bg-blue-700 shadow-blue-100"
            )}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-white ml-0.5" />}
          </Button>
        </div>

        {/* Timeline Engine */}
        <div className="flex-1 flex flex-col gap-1 relative py-1">
          <div className="flex justify-between items-center mb-0.5">
            <div className="flex items-center gap-2">
               <span className={cn(typography.meta, 'rounded border border-[#dcedf8]/50 bg-[#e8f0f8] px-1.5 py-0.5 font-mono leading-none not-italic text-[#2e5f8a] tabular-nums')}>
                 {route[playbackIndex]?.timestamp || '00:00:00'}
               </span>
               {hoverIndex !== null && (
                  <span className={cn(typography.meta, 'leading-none not-italic text-slate-500')}>
                    Seek: {route[hoverIndex]?.timestamp}
                  </span>
               )}
            </div>
            <span className={cn(typography.meta, 'font-mono leading-none not-italic text-slate-500 tabular-nums')}>
              {route[route.length - 1]?.timestamp}
            </span>
          </div>

          <div className="relative h-4 group cursor-pointer flex items-center">
            {/* Base Track */}
            <div className="absolute inset-0 h-1.5 my-auto bg-slate-100/60 rounded-full w-full border border-slate-200/30" />
            
            {/* Active Progress */}
            <div 
              className="absolute inset-0 h-1.5 my-auto bg-[#2e5f8a] rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(37,99,235,0.2)]" 
              style={{ width: `${progressPercent}%` }}
            />

            {/* Event Snap Markers on Slider */}
            {MOCK_HISTORY_EVENTS.map((ev, i) => {
               const idx = route.findIndex(p => p.timestamp.includes(ev.time.split(' ')[0]));
               if (idx === -1) return null;
               const pos = (idx / (route.length - 1)) * 100;
               return (
                  <div 
                    key={i} 
                    className={cn(
                       "absolute top-1/2 -translate-y-1/2 w-1.5 h-3 rounded-full border-2 border-white shadow-sm z-10",
                       ev.type === 'Overspeed' ? 'bg-rose-500' : 'bg-[#2e5f8a]'
                    )}
                    style={{ left: `${pos}%` }}
                  />
               );
            })}

            <input 
              type="range"
              min={0}
              max={route.length - 1}
              value={playbackIndex}
              onMouseMove={(e) => {
                 const rect = e.currentTarget.getBoundingClientRect();
                 const x = e.clientX - rect.left;
                 const idx = Math.floor((x / rect.width) * (route.length - 1));
                 setHoverIndex(idx);
              }}
              onMouseLeave={() => setHoverIndex(null)}
              onChange={(e) => onPlaybackChange(parseInt(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            
            {/* Professional Thumb */}
            <div 
              className="absolute h-4 w-4 bg-white border-2 border-blue-600 rounded-full shadow-lg z-10 transition-all pointer-events-none flex items-center justify-center"
              style={{ left: `calc(${progressPercent}% - 8px)` }}
            >
               <div className="h-1 w-1 bg-[#2e5f8a] rounded-full" />
            </div>
          </div>
        </div>

        {/* Speed Engine Selector */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-100/60 rounded-lg border border-slate-200/40 shrink-0">
           <span className={cn(typography.caption, 'px-1.5 font-normal tracking-tight text-slate-500')}>
             Spd
           </span>
          {[1, 2, 4, 8].map((s) => (
            <button
              key={s}
              onClick={() => setPlaybackSpeed(s)}
              className={cn(
                typography.caption,
                'h-7 min-w-[28px] rounded px-1.5 font-medium transition-all tracking-tight',
                playbackSpeed === s ? "border border-slate-100 bg-white text-[#2e5f8a] shadow-sm" : "text-slate-400 hover:text-slate-700"
              )}
            >
              x{s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


