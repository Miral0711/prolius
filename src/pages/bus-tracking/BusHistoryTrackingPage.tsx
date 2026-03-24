import { useState } from 'react';
import {
  MOCK_HISTORY_EVENTS,
  MOCK_HISTORY_ROUTE,
  MOCK_TRIP_SUMMARY,
} from '@/data/bus-history-mock-data';
import {
  Bus,
  Calendar,
  Download,
  FileText,
  History,
  MapPin,
  Search,
  Settings2,
  Share2,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Input } from '@/components/ui/input';
import { PageSurface } from '@/components/layout';
import { PageShell } from '@/components/ui/page-shell';
import { BusHistoryMapCard } from './components/BusHistoryMapCard';

export default function BusHistoryTrackingPage() {
  const [playbackIndex, setPlaybackIndex] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState('KSA-1029');

  return (
    <PageShell
      title="Bus History Tracking"
      hideHeader
      className="flex h-full min-h-0 flex-1 flex-col space-y-0 overflow-hidden bg-transparent pt-0 pb-0"
      contentWrapperClassName="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden p-0"
    >
      <PageSurface padding="md" fill sectionGap="md">
        <PageSurface.Body className="min-h-0 flex-1 overflow-hidden">
        <div className="flex min-h-0 flex-1 items-stretch gap-2.5 overflow-hidden">
        {/* ── LEFT PANEL: FILTERS ──────────────────────────────── */}
        <div className="flex h-full min-h-0 w-[240px] shrink-0 flex-col overflow-hidden">
          <GlassCard className="flex-1 flex flex-col gap-2 p-2 border-white/60 bg-white/80 backdrop-blur-2xl shadow-sm border border-slate-200/40 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 rounded-xl">
            <div className="flex items-center justify-between mb-0.5 px-0.5 mt-0.5">
              <h3 className="text-[9px] font-semibold uppercase tracking-widest text-blue-600">
                Route Inquiry
              </h3>
              <Settings2 className="h-3 w-3 text-slate-300" />
            </div>

            <div className="space-y-2.5">
              {/* Vehicle Section */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Bus className="h-2.5 w-2.5 text-slate-400" />
                  <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-tight">
                    Assets
                  </span>
                </div>
                <div className="relative group">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400 group-focus-within:text-blue-500" />
                  <Input
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    className="h-8 pl-8 bg-white/50 border-slate-100/60 text-[11px] font-medium rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-blue-100"
                    placeholder="Search..."
                  />
                </div>
              </div>

              {/* Timeline Selection */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Calendar className="h-2.5 w-2.5 text-slate-400" />
                  <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-tight">
                    Timeline
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[6.5px] font-semibold text-slate-300 uppercase tracking-widest px-0.5">
                    <span>Range Start</span>
                  </div>
                  <div className="flex gap-1 text-[10px]">
                    <Input
                      type="text"
                      defaultValue="2024-03-24"
                      className="h-7 bg-white/40 border-slate-100/60 text-[10px] font-medium rounded-lg px-2"
                    />
                    <Input
                      type="text"
                      defaultValue="10:00"
                      className="h-7 bg-white/40 border-slate-100/60 text-[10px] font-medium rounded-lg px-2 w-14 shrink-0"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[6.5px] font-semibold text-slate-300 uppercase tracking-widest px-0.5">
                    <span>Range End</span>
                  </div>
                  <div className="flex gap-1 text-[10px]">
                    <Input
                      type="text"
                      defaultValue="2024-03-24"
                      className="h-7 bg-white/40 border-slate-100/60 text-[10px] font-medium rounded-lg px-2"
                    />
                    <Input
                      type="text"
                      defaultValue="12:00"
                      className="h-7 bg-white/40 border-slate-100/60 text-[10px] font-medium rounded-lg px-2 w-14 shrink-0"
                    />
                  </div>
                </div>
              </div>

              {/* View Options */}
              <div className="pt-1 space-y-1">
                <span className="text-[7.5px] font-semibold text-slate-300 uppercase tracking-widest border-b border-slate-50 w-full block pb-0.5 mb-1.5">
                  Controls
                </span>
                {[
                  { label: 'Stops', active: true },
                  { label: 'Idle', active: true },
                  { label: 'Alerts', active: false },
                  { label: 'Zones', active: true },
                ].map((t, i) => (
                  <label
                    key={i}
                    className="flex items-center justify-between cursor-pointer group py-0.5"
                  >
                    <span className="text-[9px] font-medium text-slate-600 uppercase tracking-tight">
                      {t.label}
                    </span>
                    <div
                      className={cn(
                        'h-3 w-5.5 rounded-full transition-colors relative',
                        t.active ? 'bg-blue-600' : 'bg-slate-200',
                      )}
                    >
                      <div
                        className={cn(
                          'absolute top-0.5 h-2 w-2 bg-white rounded-full transition-all',
                          t.active ? 'left-3' : 'left-0.5',
                        )}
                      />
                    </div>
                  </label>
                ))}
              </div>

              <Button className="w-full h-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase text-[8.5px] rounded-lg shadow-md shadow-blue-100/50 mt-1 transition-all active:scale-95 tracking-widest">
                Synchronize Route
              </Button>
            </div>

            {/* Recent History */}
            <div className="mt-2.5 pt-2.5 border-t border-slate-100/40">
              <p className="text-[7.5px] font-semibold text-slate-300 uppercase tracking-widest mb-1.5 px-0.5">
                Recent Inquiries
              </p>
              <div className="space-y-1">
                {[
                  { plate: 'KSA-1029', time: '2h ago' },
                  { plate: 'XSA-4247', time: 'Yesterday' },
                ].map((v, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50/40 border border-slate-100 hover:border-blue-200 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-1.5">
                      <History className="h-2.5 w-2.5 text-slate-300 group-hover:text-blue-500" />
                      <span className="text-[9px] font-semibold text-slate-600 uppercase">
                        {v.plate}
                      </span>
                    </div>
                    <span className="text-[7.5px] font-medium text-slate-300">
                      {v.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* ── CENTER PANEL: MAP PLAYBACK (single card: header + map + playback) ── */}
        <div className="relative flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-2xl">
          {/* Trip Overview Strip - Ultra Compact */}
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100/80 bg-white/80 px-4 py-2 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="flex flex-col min-w-[70px]">
                <span className="text-[7.5px] font-semibold text-slate-400 uppercase tracking-widest mb-0.5">
                  Asset
                </span>
                <span className="text-[11px] font-semibold text-slate-800 uppercase tracking-tighter leading-none">
                  {MOCK_TRIP_SUMMARY.vehicle}
                </span>
              </div>
              <div className="w-px h-6 bg-slate-100/80" />
              <div className="flex flex-col min-w-[80px]">
                <span className="text-[7.5px] font-semibold text-slate-400 uppercase tracking-widest mb-0.5">
                  Operator
                </span>
                <span className="text-[11px] font-semibold text-slate-800 uppercase tracking-tighter leading-none">
                  {MOCK_TRIP_SUMMARY.driver}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-5">
              {[
                {
                  label: 'Start',
                  value: MOCK_TRIP_SUMMARY.startTime.split(' ')[1],
                },
                {
                  label: 'End',
                  value: MOCK_TRIP_SUMMARY.endTime.split(' ')[1],
                },
                {
                  label: 'Duration',
                  value: MOCK_TRIP_SUMMARY.duration,
                  color: 'text-blue-600',
                },
                { label: 'Distance', value: MOCK_TRIP_SUMMARY.distance },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center min-w-[50px]"
                >
                  <span className="text-[7px] font-semibold text-slate-300 uppercase tracking-widest mb-0.5">
                    {stat.label}
                  </span>
                  <span
                    className={cn(
                      'text-[11px] font-semibold tracking-tight leading-none',
                      stat.color || 'text-slate-600',
                    )}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <BusHistoryMapCard
              route={MOCK_HISTORY_ROUTE}
              playbackIndex={playbackIndex}
              onPlaybackChange={setPlaybackIndex}
              className="h-full min-h-0 flex-1 rounded-none border-0 shadow-none"
            />
          </div>
          </div>
        </div>

        {/* ── RIGHT PANEL: full-height shell aligns bottom edge with L/C columns ── */}
        <div className="flex h-full min-h-0 w-[290px] shrink-0 flex-col overflow-hidden">
          <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-2xl">
            <div className="flex shrink-0 justify-end border-b border-slate-100/80 px-2 py-2">
              <div className="flex items-center gap-1 rounded-lg border border-white/40 bg-white/60 p-0.5 shadow-sm backdrop-blur-md">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 gap-1.5 text-[9px] font-semibold uppercase hover:bg-white/80 transition-all"
              >
                <Download className="h-3 w-3" />
                Export
              </Button>
              <div className="w-px h-3 bg-slate-200/60 mx-0.5" />
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 gap-1.5 text-[9px] font-semibold uppercase hover:bg-white/80 transition-all"
              >
                <FileText className="h-3 w-3" />
                Report
              </Button>
              <div className="w-px h-3 bg-slate-200/60 mx-0.5" />
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 gap-1.5 text-[9px] font-semibold uppercase hover:bg-white/80 transition-all"
              >
                <Share2 className="h-3 w-3" />
                Share
              </Button>
              </div>
            </div>
          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-2 pb-2 pr-1 scrollbar-thin scrollbar-thumb-slate-200">
            {/* Speed Analytics Card */}
            <GlassCard className="p-2.5 border-white/60 shadow-sm border border-slate-200/40 bg-white/80 backdrop-blur-xl rounded-xl overflow-hidden relative">
              <div className="flex items-center gap-1.5 mb-2.5 px-0.5">
                <TrendingUp className="h-3 w-3 text-blue-500" />
                <h4 className="text-[8.5px] font-semibold uppercase text-slate-400 tracking-widest">
                  Velocity Profile
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3 px-0.5">
                <div className="flex flex-col gap-0">
                  <span className="text-[7px] font-semibold text-slate-300 uppercase tracking-widest">
                    Average
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[17px] font-semibold text-slate-800 tracking-tighter leading-none">
                      {MOCK_TRIP_SUMMARY.avgSpeed.split(' ')[0]}
                    </span>
                    <span className="text-[7.5px] font-medium text-slate-400 uppercase">
                      km/h
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-0 items-end">
                  <span className="text-[7px] font-semibold text-slate-300 uppercase tracking-widest">
                    Peak
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[17px] font-semibold text-rose-500 tracking-tighter leading-none">
                      {MOCK_TRIP_SUMMARY.maxSpeed.split(' ')[0]}
                    </span>
                    <span className="text-[7.5px] font-medium text-rose-500 uppercase">
                      km/h
                    </span>
                  </div>
                </div>
              </div>

              {/* Speed Histogram / Profile - Informative Mapping */}
              <div className="relative h-14 w-full mb-1 flex items-end gap-[1px] px-1">
                <div
                  className="absolute top-0 left-0 w-full h-[1px] bg-rose-500/10 z-0 border-t border-dashed"
                  style={{ top: '35%' }}
                />
                <span className="absolute top-[35%] right-0 -mt-2 text-[5.5px] font-semibold text-rose-400/60 uppercase tracking-widest">
                  80 Limit
                </span>
                {Array.from({ length: 48 }).map((_, i) => {
                  // Sample roughly from mock route data
                  const routeIdx = Math.floor(
                    (i / 48) * MOCK_HISTORY_ROUTE.length,
                  );
                  const pt = MOCK_HISTORY_ROUTE[routeIdx] || { speed: 0 };
                  const isOverspeed = pt.speed > 80;
                  const hPercent = Math.min((pt.speed / 100) * 100, 100);
                  const isCurrent =
                    i ===
                    Math.floor(
                      (playbackIndex / MOCK_HISTORY_ROUTE.length) * 48,
                    );

                  return (
                    <div
                      key={i}
                      className={cn(
                        'flex-1 rounded-[1px] transition-all duration-300',
                        isCurrent
                          ? 'bg-blue-600 scale-y-110 z-10 shadow-[0_0_10px_rgba(37,99,235,0.5)]'
                          : isOverspeed
                            ? 'bg-rose-500/50'
                            : 'bg-blue-100/40 hover:bg-blue-200/60',
                      )}
                      style={{ height: `${hPercent}%` }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-1 px-1">
                <span className="text-[7.5px] font-semibold text-slate-300 uppercase shrink-0">
                  Start
                </span>
                <div className="flex items-center gap-1">
                  <div className="h-1 w-1 rounded-full bg-rose-400" />
                  <span className="text-[7.5px] font-semibold text-rose-500 uppercase tracking-tighter">
                    {MOCK_TRIP_SUMMARY.overspeedEvents} Violations
                  </span>
                </div>
                <span className="text-[7.5px] font-semibold text-slate-300 uppercase shrink-0">
                  End
                </span>
              </div>
            </GlassCard>

            {/* Stop Analysis Card */}
            <GlassCard className="p-2.5 border-white/60 shadow-sm border border-slate-200/40 bg-white/80 backdrop-blur-xl rounded-xl">
              <div className="flex items-center gap-1.5 mb-2.5 px-0.5">
                <MapPin className="h-3 w-3 text-blue-500" />
                <h4 className="text-[8.5px] font-semibold uppercase text-slate-400 tracking-widest">
                  Stop Metrics
                </h4>
              </div>

              <div className="grid grid-cols-3 gap-1 mb-3">
                {[
                  { val: MOCK_TRIP_SUMMARY.totalStops, label: 'Freq' },
                  { val: '3m', label: 'Idle' },
                  { val: '10m', label: 'Peak' },
                ].map((m, i) => (
                  <div
                    key={i}
                    className="py-1 px-1 bg-slate-50/40 border border-slate-100/40 rounded flex flex-col items-center"
                  >
                    <span className="text-[11px] font-semibold text-slate-700 leading-none mb-0.5">
                      {m.val}
                    </span>
                    <span className="text-[6.5px] font-semibold text-slate-400 uppercase tracking-widest">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5">
                {[
                  {
                    loc: 'Al Nakheel Terminal',
                    time: '10:07',
                    dur: '3m 15s',
                    status: 'Sched',
                  },
                  {
                    loc: 'Airport Access Rd',
                    time: '10:14',
                    dur: '45s',
                    status: 'Flow',
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex flex-col p-2 rounded-xl bg-slate-50/50 border border-slate-100/40 hover:border-blue-100 transition-all cursor-default"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col min-w-0 pr-1.5">
                        <span className="text-[9px] font-semibold text-slate-700 uppercase leading-tight truncate mb-0.5">
                          {s.loc}
                        </span>
                        <span className="text-[7.5px] font-medium text-slate-400 italic">
                          {s.time}
                        </span>
                      </div>
                      <div className="shrink-0 flex flex-col items-end">
                        <span className="text-[9px] font-semibold text-blue-600 leading-none mb-0.5">
                          {s.dur}
                        </span>
                        <span className="text-[6.5px] font-medium bg-blue-100 text-blue-700 px-1 rounded-sm uppercase tracking-tighter">
                          {s.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Refactored Event Timeline */}
            <div className="space-y-2.5 px-1 pb-4">
              <div className="flex items-center gap-2 mb-1.5 px-1">
                <History className="h-3 w-3 text-slate-400" />
                <h4 className="text-[9px] font-semibold uppercase text-slate-400 tracking-widest">
                  Operational Sequence
                </h4>
              </div>
              <div className="relative pl-3.5 border-l border-slate-200/60 space-y-3 ml-2">
                {MOCK_HISTORY_EVENTS.map((ev, i) => (
                  <div key={i} className="relative">
                    <div
                      className={cn(
                        'absolute -left-[19.5px] top-1.5 h-3 w-3 rounded-full border-2 border-[#f8fafc] shadow-sm z-10 flex items-center justify-center transition-colors',
                        ev.type === 'Overspeed'
                          ? 'bg-rose-500'
                          : ev.type === 'Vehicle stopped'
                            ? 'bg-blue-500'
                            : ev.type === 'Trip started'
                              ? 'bg-emerald-500'
                              : 'bg-slate-400',
                      )}
                    />
                    <div className="flex flex-col px-3 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-white/60 shadow-sm hover:shadow-md transition-all cursor-default">
                      <div className="flex items-start justify-between mb-0.5">
                        <span
                          className={cn(
                            'text-[9px] font-semibold uppercase tracking-tight',
                            ev.type === 'Overspeed'
                              ? 'text-rose-600'
                              : 'text-slate-800',
                          )}
                        >
                          {ev.type}
                        </span>
                        <span className="text-[8px] font-semibold text-slate-300 font-mono tracking-tighter leading-none">
                          {ev.time.split(' ')[0]}
                        </span>
                      </div>
                      <p className="text-[9px] font-medium text-slate-400 leading-tight mb-2 truncate">
                        {ev.description}
                      </p>
                      <div className="flex items-center gap-1 pt-1.5 border-t border-slate-50/50">
                        <MapPin className="h-2 w-2 text-slate-300" />
                        <span className="text-[7.5px] font-semibold text-slate-300 uppercase tracking-tighter truncate leading-none">
                          {ev.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
        </div>
        </PageSurface.Body>
        <PageSurface.Footer />
      </PageSurface>
    </PageShell>
  );
}
