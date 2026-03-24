import { useState } from 'react';
import {
  LocateFixed,
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
  Bus,
} from 'lucide-react';
import { VehicleMapMarker, type VehicleStatus } from './VehicleMapMarker';

/* ─── Vehicle data for dummy map ────────────────────────────────── */
interface DummyVehicle {
  id: string;
  driver: string;
  speed: string;
  route: string;
  status: VehicleStatus;
  x: number; // percent left
  y: number; // percent top
}

export { type VehicleStatus };

const VEHICLES: DummyVehicle[] = [
  { id: 'TR-8412', driver: 'Ahmed M.',  speed: '62 km/h', route: 'Riyadh → Jeddah',  status: 'On Trip',     x: 22, y: 30 },
  { id: 'SXA0388', driver: 'Sarah L.',  speed: '0 km/h',  route: 'Depot A',           status: 'Available',   x: 45, y: 20 },
  { id: 'SSA0037', driver: 'Omar K.',   speed: '54 km/h', route: 'Dammam → Khobar',  status: 'On Trip',     x: 65, y: 45 },
  { id: '85A1167', driver: 'Fatima A.', speed: '0 km/h',  route: 'Service Center',   status: 'Maintenance', x: 78, y: 25 },
  { id: 'VH-201',  driver: 'Khalid R.', speed: '71 km/h', route: 'Jeddah → Mecca',   status: 'On Trip',     x: 35, y: 60 },
  { id: 'TR-105',  driver: 'Nadia S.',  speed: '0 km/h',  route: 'Emergency Stop',   status: 'Alert',       x: 55, y: 70 },
  { id: 'VH-310',  driver: 'Bilal T.',  speed: '0 km/h',  route: 'Depot B',          status: 'Available',   x: 15, y: 62 },
  { id: 'SXA0910', driver: 'Layla Q.',  speed: '48 km/h', route: 'Medina → Yanbu',   status: 'On Trip',     x: 82, y: 60 },
  { id: 'TR-777',  driver: 'Rami F.',   speed: '0 km/h',  route: 'Oil Change',       status: 'Maintenance', x: 28, y: 80 },
  { id: 'VH-099',  driver: 'Jasim A.',  speed: '0 km/h',  route: 'Panic Alert',      status: 'Alert',       x: 70, y: 78 },
];

const STATUS_META: Record<VehicleStatus, { color: string; ring: string; label: string; pulse: boolean }> = {
  Available:   { color: '#10b981', ring: 'rgba(16,185,129,0.25)',  label: 'text-emerald-700 bg-emerald-100', pulse: false },
  'On Trip':   { color: '#3b82f6', ring: 'rgba(59,130,246,0.25)', label: 'text-blue-700 bg-blue-100',       pulse: true  },
  Maintenance: { color: '#f59e0b', ring: 'rgba(245,158,11,0.25)', label: 'text-amber-700 bg-amber-100',     pulse: false },
  Alert:       { color: '#ef4444', ring: 'rgba(239,68,68,0.30)',   label: 'text-rose-700 bg-rose-100',       pulse: true  },
};



export function FleetMapPanel({ height = 420 }: { height?: number | string }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const hoveredVehicle = VEHICLES.find((v) => v.id === hovered);

  return (
    <div
      className="relative w-full overflow-hidden rounded-md border border-white/40 shadow-sm"
      style={{ height }}
    >
      {/* ── MAP BACKGROUND ─────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[#e8eef7]">
        {/* City block grid */}
        <svg
          className="absolute inset-0 h-full w-full opacity-60 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* City blocks (light rectangles) */}
          {[
            [2, 2, 16, 11], [20, 2, 17, 11], [40, 2, 17, 11], [60, 2, 17, 11], [80, 2, 17, 11],
            [2, 17, 16, 18], [20, 17, 17, 18], [40, 17, 17, 18], [60, 17, 17, 18], [80, 17, 17, 18],
            [2, 40, 16, 14], [20, 40, 17, 14], [40, 40, 17, 14], [60, 40, 17, 14], [80, 40, 17, 14],
            [2, 59, 16, 13], [20, 59, 17, 13], [40, 59, 17, 13], [60, 59, 17, 13], [80, 59, 17, 13],
            [2, 77, 16, 21], [20, 77, 17, 21], [40, 77, 17, 21], [60, 77, 17, 21], [80, 77, 17, 21],
          ].map(([x, y, w, h], i) => (
            <rect key={i} x={`${x}%`} y={`${y}%`} width={`${w}%`} height={`${h}%`}
              rx="3" fill="#dce5f0" stroke="#c8d5e8" strokeWidth="0.5" />
          ))}

          {/* Major roads (thick) */}
          {[
            [0, 15, 100, 15], [0, 38, 100, 38], [0, 57, 100, 57], [0, 76, 100, 76],
            [20, 0, 20, 100],  [40, 0, 40, 100],  [60, 0, 60, 100], [80, 0, 80, 100],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={`road-${i}`} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
              stroke="#bfcfe0" strokeWidth="4" />
          ))}

          {/* Minor streets (thin) */}
          {[
            [0, 26, 100, 26],[0, 47, 100, 47],[0, 66, 100, 66],
            [10, 0, 10, 100],[30, 0, 30, 100],[50, 0, 50, 100],[70, 0, 70, 100],[90, 0, 90, 100],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={`st-${i}`} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
              stroke="#c8d5e8" strokeWidth="1.5" strokeDasharray="none" />
          ))}

          {/* Highway accent line */}
          <line x1="0" y1="38%" x2="100%" y2="38%" stroke="#a3b8d4" strokeWidth="6" opacity="0.5" />
          
          {/* Water feature */}
          <ellipse cx="72%" cy="43%" rx="6%" ry="4%" fill="#b8d4e8" opacity="0.5" />
          <text x="72%" y="43.5%" textAnchor="middle" fill="#6b9ab8" fontSize="9" fontFamily="sans-serif">Bay</text>

          {/* Park areas */}
          <rect x="42%" y="59%" width="16%" height="14%" rx="4" fill="#c6dbb8" opacity="0.7" />
          <text x="50%" y="67%" textAnchor="middle" fill="#5a8a4a" fontSize="9" fontFamily="sans-serif">City Park</text>
        </svg>

        {/* Subtle gradient vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-blue-100/20 pointer-events-none" />
      </div>

      {/* ── VEHICLE MARKERS ────────────────────────────────────── */}
      {VEHICLES.map((v) => (
        <VehicleMapMarker
          key={v.id}
          id={v.id}
          status={v.status}
          isHovered={hovered === v.id}
          onMouseEnter={() => setHovered(v.id)}
          onMouseLeave={() => setHovered(null)}
          style={{ left: `${v.x}%`, top: `${v.y}%` }}
        />
      ))}

      {/* ── HOVER TOOLTIP ─────────────────────────────────────── */}
      {hoveredVehicle && (
        <div
          className="pointer-events-none absolute z-20 min-w-[190px] rounded-md border border-white/60 bg-white shadow-xl backdrop-blur-md p-3"
          style={{
            left: Math.min(hoveredVehicle.x + 3, 65) + '%',
            top: Math.max(hoveredVehicle.y - 18, 2) + '%',
          }}
        >
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-800">{hoveredVehicle.id}</span>
            <span className={`rounded-sm px-1.5 py-0.5 text-[9px] font-semibold ${STATUS_META[hoveredVehicle.status].label}`}>
              {hoveredVehicle.status}
            </span>
          </div>
          <div className="space-y-0.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Driver</span>
              <span className="font-medium text-slate-700">{hoveredVehicle.driver}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Speed</span>
              <span className="font-medium text-slate-700">{hoveredVehicle.speed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Route</span>
              <span className="font-medium text-slate-700 max-w-[110px] truncate text-right">{hoveredVehicle.route}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── MAP LEGEND (top-right) ─────────────────────────────── */}
      <div className="absolute right-3 top-3 z-20 flex flex-col gap-1.5 rounded-md border border-white/60 bg-white/90 px-3 py-2.5 shadow-sm backdrop-blur-md">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">Fleet Legend</p>
        {(Object.entries(STATUS_META) as [VehicleStatus, typeof STATUS_META[VehicleStatus]][]).map(([status, meta]) => (
          <div key={status} className="flex items-center gap-2">
            <span className="block h-3 w-3 rounded-[3px] border border-white shadow-sm flex items-center justify-center" style={{ background: meta.color }}>
              <Bus className="h-2 w-2 text-white" />
            </span>
            <span className="text-[11px] font-semibold text-slate-700">{status}</span>
          </div>
        ))}
      </div>

      {/* ── MAP CONTROLS (left-bottom) ─────────────────────────── */}
      <div className="absolute bottom-3 left-3 z-20 flex flex-col gap-1">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.2, 2))}
          className="flex h-7 w-7 items-center justify-center rounded-sm border border-white/60 bg-white/90 shadow-sm backdrop-blur-md text-slate-600 hover:bg-white transition-colors"
          aria-label="Zoom in"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z - 0.2, 0.5))}
          className="flex h-7 w-7 items-center justify-center rounded-sm border border-white/60 bg-white/90 shadow-sm backdrop-blur-md text-slate-600 hover:bg-white transition-colors"
          aria-label="Zoom out"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => setZoom(1)}
          className="flex h-7 w-7 items-center justify-center rounded-sm border border-white/60 bg-white/90 shadow-sm backdrop-blur-md text-slate-600 hover:bg-white transition-colors"
          aria-label="Reset"
        >
          <RotateCcw className="h-3 w-3" />
        </button>
        <button
          className="flex h-7 w-7 items-center justify-center rounded-sm border border-white/60 bg-white/90 shadow-sm backdrop-blur-md text-blue-600 hover:bg-white transition-colors"
          aria-label="Locate"
        >
          <LocateFixed className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ── SCALE INDICATOR ───────────────────────────────────── */}
      <div className="absolute bottom-4 right-14 z-20 flex items-end gap-1">
        <div className="h-3 w-12 border-b-2 border-l-2 border-r-2 border-slate-500/40" />
        <span className="text-[9px] text-slate-500 font-medium">2 km</span>
      </div>

      {/* ── ZOOM BADGE ────────────────────────────────────────── */}
      <div className="absolute bottom-3 right-3 z-20 rounded-md border border-white/60 bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-slate-500 shadow-sm backdrop-blur-md">
        <Maximize2 className="inline-block h-3 w-3 mr-1" />
        {Math.round(zoom * 100)}%
      </div>

      {/* ── "LIVE" badge ─────────────────────────────────────── */}
      <div className="absolute left-3 top-3 z-20 flex items-center gap-2 rounded-md border border-emerald-200/60 bg-white/90 pl-2.5 pr-3 py-1.5 shadow-sm backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-[10px] font-semibold text-emerald-700">Live Tracking</span>
        <span className="text-[9px] text-slate-400 ml-0.5">• {VEHICLES.length} vehicles</span>
      </div>
    </div>
  );
}
