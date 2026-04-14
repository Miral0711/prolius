import { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Clock,
  MapPin,
  TrendingUp,
  Download,
  FileText,
  Share2,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Navigation,
  Gauge,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageLayout } from '@/components/shared';
import { PageFooter } from '@/components/shared/PageFooter';
import { PageSurface, PAGE_SURFACE_FOOTER_PADDING } from '@/components/layout';
import { PageShell } from '@/components/ui/page-shell';

/* ─── Types ──────────────────────────────────────────────────────────────── */
type EventType = 'start' | 'overspeed' | 'geofence_exit' | 'stop' | 'geofence_entry' | 'end';

interface TripEvent {
  id: string;
  type: EventType;
  title: string;
  description: string;
  location: string;
  time: string;
}

interface RecentInquiry {
  asset: string;
  when: string;
}

/* ─── Static data ────────────────────────────────────────────────────────── */
const TRIP_EVENTS: TripEvent[] = [
  { id: 'e1', type: 'start',         title: 'Trip started',    description: 'Trip sequence initiated.',    location: 'Main Terminal',      time: '10:00:00' },
  { id: 'e2', type: 'overspeed',     title: 'Overspeed',       description: 'Vehicle exceeded 80km/h limit.', location: 'King Fahd Rd',    time: '10:04:12' },
  { id: 'e3', type: 'geofence_exit', title: 'Geofence exit',   description: 'Exited municipal boundary.',  location: 'Zone B-12',          time: '10:05:45' },
  { id: 'e4', type: 'stop',          title: 'Vehicle stopped', description: 'Scheduled passenger stop.',   location: 'Al Nakheel Stop',    time: '10:07:20' },
  { id: 'e5', type: 'geofence_entry',title: 'Geofence entry',  description: 'Entered airport corridor.',   location: 'Zone C-05',          time: '10:12:30' },
  { id: 'e6', type: 'overspeed',     title: 'Overspeed',       description: 'Vehicle exceeded city limit.', location: 'Airport Access Rd', time: '10:14:05' },
  { id: 'e7', type: 'end',           title: 'Trip ended',      description: 'Trip sequence completed.',    location: 'Airport Terminal',   time: '10:15:00' },
];

const RECENT_INQUIRIES: RecentInquiry[] = [
  { asset: 'KSA-1029', when: '2h ago' },
  { asset: 'XSA-4247', when: 'Yesterday' },
];

const EVENT_CONFIG: Record<EventType, { dot: string; titleColor: string }> = {
  start:          { dot: 'bg-green-500',  titleColor: 'text-slate-800' },
  overspeed:      { dot: 'bg-red-500',    titleColor: 'text-red-600' },
  geofence_exit:  { dot: 'bg-slate-400',  titleColor: 'text-slate-800' },
  stop:           { dot: 'bg-blue-500',   titleColor: 'text-slate-800' },
  geofence_entry: { dot: 'bg-slate-400',  titleColor: 'text-slate-800' },
  end:            { dot: 'bg-green-500',  titleColor: 'text-slate-800' },
};

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors',
        checked ? 'bg-[#3d6b8e]' : 'bg-slate-200',
      )}
    >
      <span
        className={cn(
          'pointer-events-none absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform',
          checked ? 'translate-x-4' : 'translate-x-0.5',
        )}
      />
    </button>
  );
}

function VelocityBar({ value, max, isViolation }: { value: number; max: number; isViolation?: boolean }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex h-10 items-end gap-px">
      {Array.from({ length: 20 }).map((_, i) => {
        const barPct = ((i + 1) / 20) * 100;
        const active = barPct <= pct;
        return (
          <div
            key={i}
            className={cn(
              'w-1.5 rounded-sm transition-all',
              active
                ? isViolation && barPct > 80
                  ? 'bg-red-400'
                  : 'bg-[#3d6b8e]'
                : 'bg-slate-100',
            )}
            style={{ height: `${30 + (i / 19) * 70}%` }}
          />
        );
      })}
    </div>
  );
}

/* ─── Map placeholder (Leaflet would mount here) ─────────────────────────── */
function MapArea({ playing }: { playing: boolean }) {
  return (
    <div className="relative flex-1 overflow-hidden bg-[#e8eef4]">
      {/* Legend */}
      <div className="absolute left-3 top-3 z-10 flex items-center gap-3 rounded-md border border-[#d4e0ea] bg-white/90 px-3 py-1.5 text-xs shadow-sm backdrop-blur-sm">
        {[
          { color: 'bg-slate-400', label: 'Idle' },
          { color: 'bg-green-500', label: 'Normal' },
          { color: 'bg-yellow-400', label: 'Warn' },
          { color: 'bg-red-500', label: 'Risk' },
        ].map(({ color, label }) => (
          <span key={label} className="flex items-center gap-1 text-slate-600">
            <span className={cn('h-2 w-2 rounded-full', color)} />
            {label}
          </span>
        ))}
      </div>

      {/* SVG mock route */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 380" preserveAspectRatio="xMidYMid slice">
        {/* Background grid lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 35} x2="600" y2={i * 35} stroke="#d4e0ea" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 35} y1="0" x2={i * 35} y2="380" stroke="#d4e0ea" strokeWidth="0.5" />
        ))}

        {/* Route segments */}
        <polyline points="80,300 120,260 160,220 200,190 240,160" stroke="#22c55e" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="240,160 280,130 310,110 340,95" stroke="#ef4444" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="340,95 380,80 420,70 460,65 500,60" stroke="#22c55e" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        {/* Stop markers */}
        <circle cx="80" cy="300" r="6" fill="#22c55e" stroke="white" strokeWidth="2" />
        <circle cx="240" cy="160" r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
        <circle cx="340" cy="95" r="6" fill="#ef4444" stroke="white" strokeWidth="2" />
        <circle cx="500" cy="60" r="6" fill="#22c55e" stroke="white" strokeWidth="2" />

        {/* Bus icon */}
        {playing ? (
          <g transform="translate(310,110)">
            <circle r="10" fill="#3d6b8e" stroke="white" strokeWidth="2" />
            <text x="0" y="4" textAnchor="middle" fill="white" fontSize="10">▶</text>
          </g>
        ) : (
          <g transform="translate(310,110)">
            <circle r="10" fill="#3d6b8e" stroke="white" strokeWidth="2" />
            <text x="0" y="4" textAnchor="middle" fill="white" fontSize="8">🚌</text>
          </g>
        )}
      </svg>

      {/* Playback bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 border-t border-[#d4e0ea] bg-white/95 px-4 py-2 backdrop-blur-sm">
        <button className="rounded-full p-1 text-slate-500 hover:bg-slate-100">
          <RotateCcw className="h-4 w-4" />
        </button>
        <button className="rounded-full bg-[#3d6b8e] p-1.5 text-white hover:bg-[#2e5270]">
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <span className="text-xs font-mono text-slate-600">10:00:00</span>
        <div className="relative flex-1">
          <div className="h-1.5 rounded-full bg-slate-200">
            <div className="h-full w-1/3 rounded-full bg-[#3d6b8e]" />
          </div>
        </div>
        <span className="text-xs font-mono text-slate-600">10:15:00</span>
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <span>Spd</span>
          {['x1', 'x2', 'x4', 'x8'].map((s) => (
            <button key={s} className={cn('rounded px-1 py-0.5 text-[10px]', s === 'x1' ? 'bg-[#3d6b8e] text-white' : 'hover:bg-slate-100 text-slate-500')}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────────── */
export default function HistoryTrackingPage() {
  const [stops, setStops] = useState(true);
  const [idle, setIdle] = useState(true);
  const [alerts, setAlerts] = useState(false);
  const [zones, setZones] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [asset, setAsset] = useState('KSA-1029');
  const [startDate] = useState('2024-03-24');
  const [endDate] = useState('2024-03-24');

  return (
    <PageShell
      title="History Bus Tracking"
      hideHeader
      className="flex h-full min-h-0 flex-1 flex-col space-y-0"
      contentWrapperClassName="relative flex min-h-0 flex-1 flex-col"
    >
      <PageSurface
        padding={PAGE_SURFACE_FOOTER_PADDING}
        fill
        sectionGap="none"
        className="min-h-0 flex-1 bg-[#f0f4f8]"
      >
        <PageSurface.Body className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="flex min-h-0 flex-1 gap-2 overflow-hidden">

            {/* ── Left sidebar ── */}
            <aside className="flex w-44 shrink-0 flex-col gap-2 overflow-y-auto">

              {/* Route inquiry */}
              <div className="rounded-lg border border-[#d4e0ea] bg-white shadow-sm">
                <div className="border-b border-[#d4e0ea] px-3 py-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-[#3d6b8e]">Route Inquiry</span>
                </div>
                <div className="space-y-3 p-3">
                  {/* Asset */}
                  <div>
                    <label className="mb-1 block text-[10px] font-medium text-slate-500">Assets</label>
                    <div className="flex items-center gap-1 rounded border border-[#d4e0ea] bg-[#f8fafc] px-2 py-1">
                      <input
                        value={asset}
                        onChange={(e) => setAsset(e.target.value)}
                        className="min-w-0 flex-1 bg-transparent text-xs text-slate-700 outline-none"
                        placeholder="Asset ID"
                      />
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="mb-1 block text-[10px] font-medium text-slate-500">Timeline</label>
                    <div className="space-y-1.5">
                      <div>
                        <span className="text-[10px] text-slate-400">Range start</span>
                        <div className="mt-0.5 flex items-center justify-between rounded border border-[#d4e0ea] bg-[#f8fafc] px-2 py-1">
                          <span className="text-[11px] text-slate-600">{startDate}</span>
                          <span className="text-[11px] font-medium text-slate-700">10:00</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400">Range end</span>
                        <div className="mt-0.5 flex items-center justify-between rounded border border-[#d4e0ea] bg-[#f8fafc] px-2 py-1">
                          <span className="text-[11px] text-slate-600">{endDate}</span>
                          <span className="text-[11px] font-medium text-slate-700">12:00</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div>
                    <label className="mb-1.5 block text-[10px] font-medium text-slate-500">Controls</label>
                    <div className="space-y-1.5">
                      {[
                        { label: 'Stops',  value: stops,  set: () => setStops(v => !v) },
                        { label: 'Idle',   value: idle,   set: () => setIdle(v => !v) },
                        { label: 'Alerts', value: alerts, set: () => setAlerts(v => !v) },
                        { label: 'Zones',  value: zones,  set: () => setZones(v => !v) },
                      ].map(({ label, value, set }) => (
                        <div key={label} className="flex items-center justify-between">
                          <span className="text-[11px] text-slate-600">{label}</span>
                          <Toggle checked={value} onChange={set} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setPlaying(true)}
                    className="w-full rounded-md bg-[#3d6b8e] py-1.5 text-xs font-semibold text-white hover:bg-[#2e5270] transition-colors"
                  >
                    Synchronize route
                  </button>
                </div>
              </div>

              {/* Recent inquiries */}
              <div className="rounded-lg border border-[#d4e0ea] bg-white px-3 py-2 shadow-sm">
                <p className="mb-2 text-[10px] font-medium text-slate-400">Recent inquiries</p>
                <div className="space-y-1.5">
                  {RECENT_INQUIRIES.map((r) => (
                    <button
                      key={r.asset}
                      onClick={() => setAsset(r.asset)}
                      className="flex w-full items-center justify-between rounded px-1 py-0.5 hover:bg-[#f0f4f8]"
                    >
                      <span className="flex items-center gap-1 text-[11px] text-slate-600">
                        <Circle className="h-2 w-2 fill-slate-300 text-slate-300" />
                        {r.asset}
                      </span>
                      <span className="text-[10px] text-slate-400">{r.when}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* ── Center: trip info bar + map ── */}
            <div className="flex min-w-0 flex-1 flex-col gap-2">

              {/* Trip info bar */}
              <div className="flex shrink-0 items-center gap-6 rounded-lg border border-[#d4e0ea] bg-white px-4 py-2 shadow-sm">
                <div>
                  <p className="text-[10px] text-slate-400">Asset</p>
                  <p className="text-xs font-semibold text-slate-800">KSA-1029</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">Operator</p>
                  <p className="text-xs font-semibold text-slate-800">Ahmed Ali</p>
                </div>
                <div className="flex-1" />
                <div>
                  <p className="text-[10px] text-slate-400">Start</p>
                  <p className="text-xs font-semibold text-slate-800">10:00</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">End</p>
                  <p className="text-xs font-semibold text-slate-800">10:15</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">Duration</p>
                  <p className="text-xs font-semibold text-[#3d6b8e]">15 mins</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">Distance</p>
                  <p className="text-xs font-semibold text-slate-800">8.4 km</p>
                </div>
              </div>

              {/* Map */}
              <div className="flex min-h-0 flex-1 overflow-hidden rounded-lg border border-[#d4e0ea] shadow-sm" onClick={() => setPlaying(p => !p)}>
                <MapArea playing={playing} />
              </div>
            </div>

            {/* ── Right panel ── */}
            <aside className="flex w-52 shrink-0 flex-col gap-2 overflow-y-auto">

              {/* Action buttons */}
              <div className="flex gap-1.5">
                {[
                  { icon: Download, label: 'Export' },
                  { icon: FileText, label: 'Report' },
                  { icon: Share2, label: 'Share' },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="flex flex-1 items-center justify-center gap-1 rounded-md border border-[#d4e0ea] bg-white py-1.5 text-[11px] font-medium text-slate-600 shadow-sm hover:bg-[#f0f4f8] transition-colors"
                  >
                    <Icon className="h-3 w-3" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Velocity profile */}
              <div className="rounded-lg border border-[#d4e0ea] bg-white p-3 shadow-sm">
                <div className="mb-2 flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-[#3d6b8e]" />
                  <span className="text-[11px] font-semibold text-slate-700">Velocity Profile</span>
                </div>
                <div className="mb-1 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400">Average</p>
                    <p className="text-sm font-bold text-slate-800">42 <span className="text-[10px] font-normal text-slate-400">km/h</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400">Peak</p>
                    <p className="text-sm font-bold text-red-500">95 <span className="text-[10px] font-normal text-slate-400">km/h</span></p>
                  </div>
                </div>
                <VelocityBar value={42} max={120} isViolation />
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Start</span>
                  <span className="text-[10px] text-red-500">+2 violations</span>
                  <span className="text-[10px] text-slate-400">End</span>
                </div>
              </div>

              {/* Stop metrics */}
              <div className="rounded-lg border border-[#d4e0ea] bg-white p-3 shadow-sm">
                <div className="mb-2 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#3d6b8e]" />
                  <span className="text-[11px] font-semibold text-slate-700">Stop Metrics</span>
                </div>
                <div className="mb-3 flex gap-4">
                  <div className="text-center">
                    <p className="text-base font-bold text-slate-800">1</p>
                    <p className="text-[10px] text-slate-400">Freq</p>
                  </div>
                  <div className="text-center">
                    <p className="text-base font-bold text-slate-800">3m</p>
                    <p className="text-[10px] text-slate-400">Idle</p>
                  </div>
                  <div className="text-center">
                    <p className="text-base font-bold text-slate-800">10m</p>
                    <p className="text-[10px] text-slate-400">Peak</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Al Nakheel Terminal', time: '10:07', badge: '3m 15s', badgeLabel: 'Sched', badgeColor: 'text-[#3d6b8e]' },
                    { name: 'Airport Access Rd',   time: '10:14', badge: '45s',    badgeLabel: 'Flow',  badgeColor: 'text-orange-500' },
                  ].map((stop) => (
                    <div key={stop.name} className="flex items-start justify-between gap-1">
                      <div>
                        <p className="text-[11px] font-medium text-slate-700">{stop.name}</p>
                        <p className="text-[10px] text-slate-400">{stop.time}</p>
                      </div>
                      <div className="text-right">
                        <p className={cn('text-[11px] font-semibold', stop.badgeColor)}>{stop.badge}</p>
                        <p className={cn('text-[10px]', stop.badgeColor)}>{stop.badgeLabel}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operational sequence */}
              <div className="flex min-h-0 flex-1 flex-col rounded-lg border border-[#d4e0ea] bg-white shadow-sm">
                <div className="flex shrink-0 items-center gap-1.5 border-b border-[#d4e0ea] px-3 py-2">
                  <Clock className="h-3.5 w-3.5 text-[#3d6b8e]" />
                  <span className="text-[11px] font-semibold text-slate-700">Operational Sequence</span>
                </div>
                <div className="flex-1 overflow-y-auto p-2 [scrollbar-gutter:stable]">
                  <div className="relative space-y-2 pl-4">
                    {/* Vertical line */}
                    <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200" />

                    {TRIP_EVENTS.map((event) => {
                      const cfg = EVENT_CONFIG[event.type];
                      return (
                        <div key={event.id} className="relative">
                          {/* Dot */}
                          <span className={cn('absolute -left-4 top-2.5 h-3 w-3 rounded-full border-2 border-white shadow-sm', cfg.dot)} />
                          <div className="rounded-lg border border-[#e8eef4] bg-[#fafcfe] p-2">
                            <div className="flex items-start justify-between gap-1">
                              <p className={cn('text-[11px] font-semibold', cfg.titleColor)}>{event.title}</p>
                              <span className="shrink-0 font-mono text-[10px] text-slate-400">{event.time}</span>
                            </div>
                            <p className="mt-0.5 text-[10px] text-slate-500">{event.description}</p>
                            <p className="mt-1 flex items-center gap-0.5 text-[10px] text-slate-400">
                              <MapPin className="h-2.5 w-2.5" />
                              {event.location}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </PageSurface.Body>

        <PageSurface.Footer>
          <PageFooter />
        </PageSurface.Footer>
      </PageSurface>
    </PageShell>
  );
}
