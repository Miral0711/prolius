'use client';

import { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export type BusLiveMapMarker = {
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

const defaultIcon = (color: string) =>
  L.divIcon({
    className: 'bus-live-marker',
    html: `<span style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.25);display:block;"></span>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

export interface BusLiveMapCardProps {
  center: { lat: number; lng: number };
  marker: BusLiveMapMarker | null;
  className?: string;
  /** Pixel height or '100%' to fill container */
  height?: number | string;
}

export function BusLiveMapCard({
  center,
  marker,
  className = '',
  height = 280,
}: BusLiveMapCardProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const heightStyle =
    typeof height === 'number'
      ? { height, minHeight: height }
      : { height: height as string, minHeight: 200 };

  if (!mounted) {
    return (
      <div
        className={`flex w-full items-center justify-center overflow-hidden rounded-xl border border-white/40 bg-white/55 backdrop-blur-xl text-slate-500 text-sm ${className}`}
        style={
          typeof height === 'number'
            ? { minHeight: height }
            : { height: height as string, minHeight: 200 }
        }
      >
        Loading map…
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-white/40 bg-white/55 backdrop-blur-xl flex-1 min-h-[200px] p-2.5 ${className}`}
      style={heightStyle}
    >
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        className="h-full w-full rounded-lg overflow-hidden [&_.leaflet-control-zoom]:mt-2 [&_.leaflet-control-zoom]:ml-2"
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {marker && (
          <Marker
            position={[marker.lat, marker.lng]}
            icon={defaultIcon(STATUS_COLOR[marker.status] ?? '#64748b')}
          >
            <Popup>
              <div className="text-left text-xs text-slate-700">
                <p className="font-semibold">{marker.label}</p>
                <p className="mt-0.5">{marker.status}</p>
                {marker.speed != null && (
                  <p className="text-slate-500">Speed: {marker.speed} Km/h</p>
                )}
                {marker.engineStatus && (
                  <p className="text-slate-500">
                    Engine: {marker.engineStatus}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
      <div className="absolute bottom-2 left-12 right-2 flex flex-wrap gap-2 rounded-lg border border-white/40 bg-white/70 px-2 py-1.5 backdrop-blur-sm">
        <span className="flex items-center gap-1.5 text-2sm text-slate-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> Online
        </span>
        <span className="flex items-center gap-1.5 text-2sm text-slate-600">
          <span className="h-2 w-2 rounded-full bg-amber-500" /> Idling
        </span>
        <span className="flex items-center gap-1.5 text-2sm text-slate-600">
          <span className="h-2 w-2 rounded-full bg-red-500" /> Alarm
        </span>
        <span className="flex items-center gap-1.5 text-2sm text-slate-600">
          <span className="h-2 w-2 rounded-full bg-slate-500" /> Offline
        </span>
      </div>
    </div>
  );
}


