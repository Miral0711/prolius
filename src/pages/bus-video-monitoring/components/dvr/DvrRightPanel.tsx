/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useMemo, useState } from 'react';
import L from 'leaflet';
import {
  Activity,
  Compass,
  Droplets,
  MapPin,
  Minus,
  Plus,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils';
import { dvrTypography, PageSectionCard } from './shared/DVRSharedComponents';

function MapStatOverlayCell({
  icon: Icon,
  label,
  value,
  unit,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div className="flex min-h-0 min-w-0 flex-col items-center justify-center gap-1 px-2 py-2">
      <div className="flex items-center justify-center gap-1">
        <Icon className="h-3 w-3 shrink-0 text-blue-600" aria-hidden />
        <span className={cn(dvrTypography.fieldLabel, 'truncate')}>
          {label}
        </span>
      </div>
      <div className="flex items-baseline justify-center gap-0.5">
        <span className={cn(dvrTypography.value, 'leading-none')}>{value}</span>
        <span className={cn(dvrTypography.fieldLabel, 'leading-none')}>
          {unit}
        </span>
      </div>
    </div>
  );
}

/* ─── 1. GPS TRACK CARD ────────────────────────────────────────── */
const ROUTE_START = { lat: 25.2047, lng: 55.2708 }; // Sheikh Zayed Rd area (dummy demo coordinates)
const ROUTE_END = { lat: 25.2064, lng: 55.2945 };

function bearingDegrees(from: [number, number], to: [number, number]) {
  const [lat1, lon1] = from;
  const [lat2, lon2] = to;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const y = Math.sin(toRad(lon2 - lon1)) * Math.cos(toRad(lat2));
  const x =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.cos(toRad(lon2 - lon1));
  const brng = (Math.atan2(y, x) * 180) / Math.PI;
  return (brng + 360) % 360;
}

const circleMarkerIcon = (color: string) =>
  L.divIcon({
    className: 'gps-circle-marker',
    html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 6px 20px rgba(0,0,0,0.18);"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

const vehicleArrowIcon = (bearing: number) =>
  L.divIcon({
    className: 'gps-vehicle-arrow',
    html: `
      <div style="
        width:34px;height:34px;border-radius:14px;
        background:#2563eb;border:2px solid rgba(255,255,255,0.95);
        box-shadow:0 12px 30px rgba(37,99,235,0.35);
        display:flex;align-items:center;justify-content:center;
        transform: rotate(${bearing}deg);
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z"/>
        </svg>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });

const routeArrowIcon = (bearing: number) =>
  L.divIcon({
    className: 'gps-route-arrow',
    html: `
      <div style="
        width:20px;height:20px;border-radius:8px;
        background:#3b82f6;border:2px solid rgba(255,255,255,0.95);
        box-shadow:0 10px 22px rgba(37,99,235,0.28);
        display:flex;align-items:center;justify-content:center;
        transform: rotate(${bearing}deg);
      ">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z"/>
        </svg>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

export const GpsTrackCard = () => {
  const [mounted, setMounted] = useState(false);
  const [leafletMap, setLeafletMap] = useState<any>(null);

  const [route, setRoute] = useState<[number, number][]>([]);
  const [distanceKm, setDistanceKm] = useState(3.2);
  const [vehicleIdx, setVehicleIdx] = useState(0);

  const start = useMemo<[number, number]>(
    () => [ROUTE_START.lat, ROUTE_START.lng],
    [],
  );
  const end = useMemo<[number, number]>(
    () => [ROUTE_END.lat, ROUTE_END.lng],
    [],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch a route that follows real roads (OSRM) and draw it on satellite/hybrid tiles.
  useEffect(() => {
    if (!mounted) return;

    let cancelled = false;
    const run = async () => {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${ROUTE_START.lng},${ROUTE_START.lat};${ROUTE_END.lng},${ROUTE_END.lat}?overview=full&geometries=geojson&steps=false`;
        const res = await fetch(url);
        const json = await res.json();
        const coords = json?.routes?.[0]?.geometry?.coordinates as
          | [number, number][]
          | undefined;
        const distM = json?.routes?.[0]?.distance as number | undefined;
        if (!coords || coords.length < 2) return;

        if (!cancelled) {
          const decoded = coords.map(
            ([lng, lat]) => [lat, lng] as [number, number],
          );
          setRoute(decoded);
          setDistanceKm(distM ? distM / 1000 : 3.2);
        }
      } catch {
        // Fallback to a straight-ish line if OSRM tiles/routes aren't reachable.
        if (!cancelled) setRoute([start, end]);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [mounted, start, end]);

  useEffect(() => {
    if (route.length < 2) return;
    setVehicleIdx(0);

    const durationMs = 18000;
    const intervalMs = 180;
    const t0 = Date.now();

    const id = window.setInterval(() => {
      const t = (Date.now() - t0) / durationMs;
      const idx = Math.floor(t * (route.length - 1));
      setVehicleIdx(Math.min(idx, route.length - 1));
      if (idx >= route.length - 1) window.clearInterval(id);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [route]);

  const center = route.length ? route[Math.floor(route.length / 2)] : start;

  const vehiclePos = route[vehicleIdx] ?? start;

  const vehicleBearing = useMemo(() => {
    if (route.length < 2) return 0;
    const i0 = Math.max(0, vehicleIdx - 3);
    const i1 = Math.min(route.length - 1, vehicleIdx + 3);
    return bearingDegrees(route[i0], route[i1]);
  }, [route, vehicleIdx]);

  const directionArrowIdxs = useMemo(() => {
    if (route.length < 3) return [];
    const count = 7;
    const last = route.length - 1;
    const idxs: number[] = [];
    for (let i = 1; i <= count; i++) {
      idxs.push(Math.floor((i / (count + 1)) * last));
    }
    return idxs;
  }, [route.length]);

  const startIcon = useMemo(() => circleMarkerIcon('#22c55e'), []);
  const endIcon = useMemo(() => circleMarkerIcon('#ef4444'), []);

  return (
    <div
      className={cn(
        'flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:border-blue-200/30 hover:shadow-md',
      )}
    >
      {/* Header — compact, vertically centered row */}
      <div className="flex shrink-0 items-center justify-between gap-2 px-3 pb-1.5 pt-2">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-blue-100/60 bg-blue-50/80 text-blue-600">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
          </div>
          <div className="min-w-0 flex flex-col gap-0 leading-none">
            <h3 className={cn(dvrTypography.sectionTitle, 'leading-none')}>
              GPS Track
            </h3>
            <p className={cn(dvrTypography.sectionSubtitle, 'mt-px leading-tight')}>
              Route awareness
            </p>
          </div>
        </div>
        <div
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-blue-200/40 bg-blue-50/90 px-2 py-0.5 backdrop-blur-sm"
          title="Live position updating"
        >
          <span
            className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.22)]"
            aria-hidden
          />
          <span className={cn(dvrTypography.control, 'text-blue-700')}>
            Active track
          </span>
        </div>
      </div>

      {/* Map — primary focus; min height preserved; no internal scroll */}
      <div className="relative min-h-[360px] flex-1 overflow-hidden border-y border-slate-100/80 bg-slate-200/40 group/map">
        {!mounted || route.length < 2 ? (
          <div
            className={cn(
              dvrTypography.metadata,
              'absolute inset-0 z-[400] flex items-center justify-center bg-white/50 backdrop-blur-sm',
            )}
          >
            Loading route…
          </div>
        ) : null}

        <MapContainer
          center={center}
          zoom={13.8}
          whenCreated={(m: any) => setLeafletMap(m)}
          className="absolute inset-0 z-0 h-full w-full"
          scrollWheelZoom={false}
          dragging={true}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            opacity={1}
          />
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
            opacity={0.35}
          />
          <Polyline
            positions={route}
            pathOptions={{ color: '#1d4ed8', weight: 8, opacity: 0.18 }}
          />
          <Polyline
            positions={route}
            pathOptions={{
              color: '#3b82f6',
              weight: 4.5,
              opacity: 0.92,
              dashArray: '10,10',
            }}
          />
          {directionArrowIdxs.map((i) => {
            const i0 = Math.max(0, i - 2);
            const i1 = Math.min(route.length - 1, i + 2);
            const brng = bearingDegrees(route[i0], route[i1]);
            const icon = routeArrowIcon(brng);
            return (
              <Marker
                key={i}
                position={route[i] as [number, number]}
                icon={icon}
                zIndexOffset={1500}
              />
            );
          })}
          <Marker position={start} icon={startIcon} zIndexOffset={1600} />
          <Marker position={end} icon={endIcon} zIndexOffset={1600} />
          <Marker
            position={vehiclePos as [number, number]}
            icon={vehicleArrowIcon(vehicleBearing)}
            zIndexOffset={2000}
          />
        </MapContainer>

        {/* Context chips — top of map (keeps bottom clear for stat strip) */}
        <div className="pointer-events-none absolute left-3 top-3 z-[500] flex max-w-[calc(100%-5rem)] flex-col gap-1.5">
          <div className="flex items-center gap-2 rounded-lg border border-white/60 bg-white/85 px-2.5 py-1.5 shadow-md backdrop-blur-md">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            <span className={cn(dvrTypography.valueTight, 'truncate')}>
              Sheikh Zayed Rd, Dubai
            </span>
          </div>
          <div className="w-fit rounded-lg border border-slate-200/80 bg-slate-900/88 px-2.5 py-1 shadow-md backdrop-blur-md">
            <span className={cn(dvrTypography.control, 'text-white')}>
              {distanceKm.toFixed(1)} km covered
            </span>
          </div>
        </div>

        <div className="absolute right-3 top-3 z-[500]">
          <div className="flex flex-col gap-1 rounded-xl border border-white/60 bg-white/80 p-1 shadow-lg backdrop-blur-xl">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-100 bg-white text-slate-700 shadow-sm transition-all hover:bg-blue-50 hover:text-blue-600"
              onClick={() => {
                const z = leafletMap?.getZoom?.() ?? 0;
                leafletMap?.setZoom?.(Math.min(19, z + 1));
              }}
              aria-label="Zoom in"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-100 bg-white text-slate-700 shadow-sm transition-all hover:bg-blue-50 hover:text-blue-600"
              onClick={() => {
                const z = leafletMap?.getZoom?.() ?? 0;
                leafletMap?.setZoom?.(Math.max(3, z - 1));
              }}
              aria-label="Zoom out"
            >
              <Minus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Flat stats row — flush with map, no floating card */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[550] border-t border-slate-200/50 bg-white"
          aria-label="Current track metrics"
        >
          <div className="grid grid-cols-3 divide-x divide-slate-200/40">
            <MapStatOverlayCell
              icon={Activity}
              label="Speed"
              value="64"
              unit="km/h"
            />
            <MapStatOverlayCell
              icon={Compass}
              label="Altitude"
              value="12.5"
              unit="m"
            />
            <MapStatOverlayCell
              icon={MapPin}
              label="Bearing"
              value={vehicleBearing.toFixed(0)}
              unit="°"
            />
          </div>
        </div>
      </div>

      {/* Coordinates — flat metadata row */}
      <div className="flex h-9 shrink-0 items-center justify-center gap-2 border-t border-slate-200/50 bg-slate-50/50 px-3">
        <MapPin className="h-3 w-3 shrink-0 text-blue-600" aria-hidden />
        <span className={cn(dvrTypography.fieldLabel, 'shrink-0')}>
          Coordinates
        </span>
        <span className={cn(dvrTypography.value, 'min-w-0 truncate')}>
          25.20° N, 55.27° E
        </span>
      </div>
    </div>
  );
};

/* ─── MAIN RIGHT PANEL ASSEMBLY ────────────────────────────────── */
interface DvrRightPanelProps {
  className?: string;
}

function TelemetryMetricRow({
  icon: Icon,
  iconBg,
  label,
  pct,
  fillClass,
}: {
  icon: LucideIcon;
  iconBg: string;
  label: string;
  pct: number;
  fillClass: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-1">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <div
            className={cn(
              'flex h-5 w-5 shrink-0 items-center justify-center rounded-md',
              iconBg,
            )}
          >
            <Icon className="h-3 w-3" aria-hidden />
          </div>
          <span className={cn(dvrTypography.fieldLabel, 'truncate')}>
            {label}
          </span>
        </div>
        <span className={cn(dvrTypography.value, 'shrink-0')}>{pct}%</span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn('h-full rounded-full', fillClass)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function DvrRightPanel({ className }: DvrRightPanelProps) {
  return (
    <div
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden',
        className,
      )}
    >
      <GpsTrackCard />

      <PageSectionCard
        noPadding
        className="shrink-0 rounded-xl border-slate-200/60 px-3 py-2 shadow-sm"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 border-b border-slate-100/80 pb-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-amber-100/60 bg-amber-50/80 text-amber-600">
              <Zap className="h-3.5 w-3.5" aria-hidden />
            </div>
            <div>
              <h3 className={cn(dvrTypography.sectionTitle, 'leading-none')}>
                Live Telemetry
              </h3>
              <p className={cn(dvrTypography.sectionSubtitle, 'leading-tight')}>
                Engine & route
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 pt-0.5">
            <TelemetryMetricRow
              icon={Activity}
              iconBg="bg-blue-50 text-blue-600"
              label="Engine load"
              pct={45}
              fillClass="bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.35)]"
            />
            <TelemetryMetricRow
              icon={Droplets}
              iconBg="bg-emerald-50 text-emerald-600"
              label="Fuel level"
              pct={78}
              fillClass="bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.35)]"
            />
            <TelemetryMetricRow
              icon={Compass}
              iconBg="bg-blue-50 text-blue-600"
              label="Route progress"
              pct={62}
              fillClass="bg-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.35)]"
            />
          </div>
        </div>
      </PageSectionCard>
    </div>
  );
}


