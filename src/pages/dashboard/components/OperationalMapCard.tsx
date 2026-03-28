'use client';

import { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MOCK_VEHICLES = [
  {
    id: 'SXA0388',
    lat: 25.2048,
    lng: 55.2708,
    status: 'On Trip' as const,
    lastUpdated: '2 min ago',
  },
  {
    id: 'SSA0037',
    lat: 25.198,
    lng: 55.274,
    status: 'Available' as const,
    lastUpdated: '5 min ago',
  },
  {
    id: '85A1167',
    lat: 25.21,
    lng: 55.265,
    status: 'Offline' as const,
    lastUpdated: '1 hr ago',
  },
  {
    id: '115A1167',
    lat: 25.192,
    lng: 55.278,
    status: 'Available' as const,
    lastUpdated: '3 min ago',
  },
  {
    id: 'VH-201',
    lat: 25.206,
    lng: 55.272,
    status: 'On Trip' as const,
    lastUpdated: '1 min ago',
  },
];

const defaultIcon = (color: string) =>
  L.divIcon({
    className: 'operational-marker',
    html: `<span style="width:12px;height:12px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);display:block;"></span>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });

const STATUS_COLOR: Record<string, string> = {
  Available: '#10b981',
  'On Trip': '#8b5cf6',
  Offline: '#64748b',
};

export function OperationalMapCard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex min-h-[200px] h-[240px] max-h-[320px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/40 bg-white/55 backdrop-blur-xl text-slate-500 text-sm">
        Loading map…
      </div>
    );
  }

  return (
    <div className="relative min-h-[200px] h-[240px] max-h-[320px] w-full overflow-hidden rounded-xl border border-white/40 bg-white/55 backdrop-blur-xl">
      <MapContainer
        center={[25.2048, 55.2708]}
        zoom={12}
        className="h-full w-full rounded-xl"
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {MOCK_VEHICLES.map((v) => (
          <Marker
            key={v.id}
            position={[v.lat, v.lng]}
            icon={defaultIcon(STATUS_COLOR[v.status] ?? '#64748b')}
          >
            <Popup>
              <div className="text-left text-xs text-slate-700">
                <p className="font-semibold">Vehicle {v.id}</p>
                <p className="mt-0.5">{v.status}</p>
                <p className="text-slate-500">Updated: {v.lastUpdated}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-2 rounded-xl border border-white/40 bg-white/70 px-2 py-1.5 backdrop-blur-sm">
        <span className="flex items-center gap-1.5 text-2sm text-slate-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> Available
        </span>
        <span className="flex items-center gap-1.5 text-2sm text-slate-600">
          <span className="h-2 w-2 rounded-full bg-violet-500" /> On Trip
        </span>
        <span className="flex items-center gap-1.5 text-2sm text-slate-600">
          <span className="h-2 w-2 rounded-full bg-slate-500" /> Offline
        </span>
      </div>
    </div>
  );
}


