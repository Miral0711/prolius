'use client';

import { useEffect, useState } from 'react';
import { Route } from 'lucide-react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils';

/** Default view — Riyadh area (aligns with +966 in form). */
const DEFAULT_CENTER: [number, number] = [24.7136, 46.6753];

export function RouteMapLeaflet({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn(
          'flex h-full min-h-[180px] w-full items-center justify-center rounded-md border border-[#d6e3f3] bg-[#ebf3fc] text-xs text-slate-500',
          className,
        )}
      >
        Loading map…
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative h-full min-h-0 w-full overflow-hidden rounded-md border border-[#d6e3f3] bg-[#ebf3fc]',
        className,
      )}
    >
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={12}
        className="z-0 h-full w-full min-h-[180px] rounded-md [&_.leaflet-container]:bg-white [&_.leaflet-tile-pane]:opacity-[0.35] [&_.leaflet-tile-pane]:transition-opacity [&_.leaflet-control-attribution]:max-w-[calc(100%-8px)] [&_.leaflet-control-attribution]:truncate [&_.leaflet-control-attribution]:rounded [&_.leaflet-control-attribution]:border-sky-200/60 [&_.leaflet-control-attribution]:bg-white/90 [&_.leaflet-control-attribution]:text-[9px] [&_.leaflet-control-zoom]:mt-2 [&_.leaflet-control-zoom]:mr-2 [&_.leaflet-control-zoom]:rounded-md [&_.leaflet-control-zoom]:border-sky-200/80 [&_.leaflet-control-zoom]:bg-white/95 [&_.leaflet-control-zoom_a]:text-sky-800"
        scrollWheelZoom
        zoomControl
        attributionControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>

      <div
        className="pointer-events-none absolute inset-0 z-[500] flex items-center justify-center p-6"
        aria-hidden="true"
      >
        <div className="flex max-w-[280px] flex-col items-center gap-2 text-center">
          <Route
            className="h-14 w-14 shrink-0 text-slate-400"
            strokeWidth={1.25}
            aria-hidden
          />
          <p
            className="text-sm font-semibold text-slate-700 [text-shadow:_0_1px_2px_rgb(255_255_255/_0.95),0_0_12px_rgb(255_255_255/_0.6)]"
          >
            Select pickup &amp; dropoff to preview route
          </p>
          <p
            className="text-xs leading-relaxed text-slate-500 [text-shadow:_0_1px_2px_rgb(255_255_255/_0.95),0_0_10px_rgb(255_255_255/_0.5)]"
          >
            The route will appear on this map
          </p>
        </div>
      </div>
    </div>
  );
}
