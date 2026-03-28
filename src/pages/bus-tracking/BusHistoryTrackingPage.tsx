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
import { typography } from '@/lib/typography';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Input } from '@/components/ui/input';
import { PageShell } from '@/components/ui/page-shell';
import { PAGE_SURFACE_FOOTER_PADDING, PageSurface } from '@/components/layout';
import { BusHistoryMapCard } from './components/BusHistoryMapCard';

/** Right-panel Export / Report / Share — distinct hierarchy, subtle brand tints */
const HISTORY_TOOLBAR_BTN_PRIMARY = cn(
  'h-7 w-full max-w-full justify-center gap-1.5 rounded-md border border-blue-100/60 bg-blue-50/90 px-2 text-slate-700 shadow-sm transition-all duration-200',
  'hover:border-blue-200/70 hover:bg-blue-100/95 hover:text-slate-900 hover:shadow-md',
  'active:scale-[0.99]',
);

const HISTORY_TOOLBAR_BTN_SECONDARY = cn(
  'h-7 w-full max-w-full justify-center gap-1.5 rounded-md border border-transparent bg-transparent px-2 text-slate-700 transition-all duration-200',
  'hover:border-slate-200/50 hover:bg-blue-50/90 hover:text-slate-900 hover:shadow-sm',
  'active:scale-[0.99]',
);

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
      <PageSurface padding={PAGE_SURFACE_FOOTER_PADDING} fill sectionGap="none">
        <PageSurface.Body className="min-h-0 flex-1 overflow-hidden">
          <div className="flex min-h-0 flex-1 items-stretch gap-2.5 overflow-hidden">
            {/* ── LEFT PANEL: FILTERS ──────────────────────────────── */}
            <div className="flex h-full min-h-0 w-[240px] shrink-0 flex-col overflow-hidden">
              <GlassCard className="flex-1 flex flex-col gap-2 p-2 border-white/60 bg-white/80 backdrop-blur-2xl shadow-sm border border-slate-200/40 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 rounded-xl">
                <div className="flex items-center justify-between mb-0.5 px-0.5 mt-0.5">
                  <h3 className={cn(typography.sectionTitle, 'text-blue-600')}>
                    Route inquiry
                  </h3>
                  <Settings2 className="h-3 w-3 text-slate-300" />
                </div>

                <div className="space-y-2.5">
                  {/* Vehicle Section */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Bus className="h-2.5 w-2.5 text-slate-400" />
                      <span
                        className={cn(
                          typography.caption,
                          'font-normal text-slate-500 tracking-tight',
                        )}
                      >
                        Assets
                      </span>
                    </div>
                    <div className="relative group">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400 group-focus-within:text-blue-500" />
                      <Input
                        value={selectedVehicle}
                        onChange={(e) => setSelectedVehicle(e.target.value)}
                        className={cn(
                          'h-8 pl-8 rounded-lg border-slate-100/60 bg-white/50 shadow-none focus-visible:ring-1 focus-visible:ring-blue-100',
                          typography.body,
                          'font-normal',
                        )}
                        placeholder="Search..."
                      />
                    </div>
                  </div>

                  {/* Timeline Selection */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Calendar className="h-2.5 w-2.5 text-slate-400" />
                      <span
                        className={cn(
                          typography.caption,
                          'font-normal text-slate-500 tracking-tight',
                        )}
                      >
                        Timeline
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div
                        className={cn(
                          typography.caption,
                          'flex items-center justify-between px-0.5 font-normal text-slate-500 tracking-tight',
                        )}
                      >
                        <span>Range start</span>
                      </div>
                      <div className="flex gap-1">
                        <Input
                          type="text"
                          defaultValue="2024-03-24"
                          className={cn(
                            'h-7 rounded-lg border-slate-100/60 bg-white/40 px-2',
                            typography.body,
                            'font-normal',
                          )}
                        />
                        <Input
                          type="text"
                          defaultValue="10:00"
                          className={cn(
                            'h-7 w-14 shrink-0 rounded-lg border-slate-100/60 bg-white/40 px-2',
                            typography.body,
                            'font-normal',
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div
                        className={cn(
                          typography.caption,
                          'flex items-center justify-between px-0.5 font-normal text-slate-500 tracking-tight',
                        )}
                      >
                        <span>Range end</span>
                      </div>
                      <div className="flex gap-1">
                        <Input
                          type="text"
                          defaultValue="2024-03-24"
                          className={cn(
                            'h-7 rounded-lg border-slate-100/60 bg-white/40 px-2',
                            typography.body,
                            'font-normal',
                          )}
                        />
                        <Input
                          type="text"
                          defaultValue="12:00"
                          className={cn(
                            'h-7 w-14 shrink-0 rounded-lg border-slate-100/60 bg-white/40 px-2',
                            typography.body,
                            'font-normal',
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* View Options */}
                  <div className="pt-1 space-y-1">
                    <span
                      className={cn(
                        typography.caption,
                        'mb-1.5 block w-full border-b border-slate-50 pb-0.5 font-normal text-slate-500 tracking-tight',
                      )}
                    >
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
                        <span
                          className={cn(
                            typography.caption,
                            'font-normal text-slate-600 tracking-tight',
                          )}
                        >
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

                  <Button
                    className={cn(
                      'mt-1 inline-flex h-8 w-full shrink-0 items-center justify-center rounded-lg bg-blue-600 px-3 text-center text-white shadow-md shadow-blue-100/50 transition-all hover:bg-blue-700 active:scale-95',
                      typography.caption,
                      'font-medium tracking-tight leading-none',
                    )}
                  >
                    Synchronize route
                  </Button>
                </div>

                {/* Recent History */}
                <div className="mt-2.5 pt-2.5 border-t border-slate-100/40">
                  <p
                    className={cn(
                      typography.caption,
                      'mb-1.5 px-0.5 font-normal text-slate-500 tracking-tight',
                    )}
                  >
                    Recent inquiries
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
                          <span
                            className={cn(
                              typography.body,
                              'font-normal text-slate-700 tracking-tight',
                            )}
                          >
                            {v.plate}
                          </span>
                        </div>
                        <span
                          className={cn(
                            typography.meta,
                            'not-italic text-slate-500',
                          )}
                        >
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
                    <div className="flex min-w-[70px] flex-col">
                      <span
                        className={cn(
                          typography.caption,
                          'mb-0.5 font-normal text-slate-500 tracking-tight',
                        )}
                      >
                        Asset
                      </span>
                      <span
                        className={cn(
                          typography.body,
                          'font-medium leading-none text-slate-800 tracking-tight',
                        )}
                      >
                        {MOCK_TRIP_SUMMARY.vehicle}
                      </span>
                    </div>
                    <div className="h-6 w-px bg-slate-100/80" />
                    <div className="flex min-w-[80px] flex-col">
                      <span
                        className={cn(
                          typography.caption,
                          'mb-0.5 font-normal text-slate-500 tracking-tight',
                        )}
                      >
                        Operator
                      </span>
                      <span
                        className={cn(
                          typography.body,
                          'font-medium leading-none text-slate-800 tracking-tight',
                        )}
                      >
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
                        className="flex min-w-[50px] flex-col items-center"
                      >
                        <span
                          className={cn(
                            typography.caption,
                            'mb-0.5 font-normal text-slate-500 tracking-tight',
                          )}
                        >
                          {stat.label}
                        </span>
                        <span
                          className={cn(
                            typography.body,
                            'font-medium leading-none tracking-tight',
                            stat.color || 'text-slate-700',
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
                <div className="flex w-full min-w-0 shrink-0 items-center border-b border-slate-100/80 px-2 py-2">
                  <div className="flex w-full min-w-0 items-center rounded-lg border border-slate-200/45 bg-slate-50/85 p-0.5 shadow-sm backdrop-blur-md">
                    <div className="flex min-w-0 flex-1 items-center justify-center px-0.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          HISTORY_TOOLBAR_BTN_PRIMARY,
                          typography.caption,
                          'font-medium tracking-tight',
                        )}
                      >
                        <Download className="h-3 w-3 shrink-0 text-blue-600" />
                        Export
                      </Button>
                    </div>
                    <div
                      className="h-3.5 w-px shrink-0 bg-slate-200/80"
                      aria-hidden
                    />
                    <div className="flex min-w-0 flex-1 items-center justify-center px-0.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          HISTORY_TOOLBAR_BTN_SECONDARY,
                          typography.caption,
                          'font-medium tracking-tight',
                        )}
                      >
                        <FileText className="h-3 w-3 shrink-0 text-emerald-600/90" />
                        Report
                      </Button>
                    </div>
                    <div
                      className="h-3.5 w-px shrink-0 bg-slate-200/80"
                      aria-hidden
                    />
                    <div className="flex min-w-0 flex-1 items-center justify-center px-0.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          HISTORY_TOOLBAR_BTN_SECONDARY,
                          typography.caption,
                          'font-medium tracking-tight',
                          /* Match velocity card overspeed / violations accent (rose, not default red) */
                          '[&_svg]:shrink-0 [&_svg]:text-rose-600',
                        )}
                      >
                        <Share2 className="h-3 w-3" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-2 pb-2 pr-1 scrollbar-thin scrollbar-thumb-slate-200">
                  {/* Speed Analytics Card */}
                  <GlassCard className="p-2.5 border-white/60 shadow-sm border border-slate-200/40 bg-white/80 backdrop-blur-xl rounded-xl overflow-hidden relative">
                    <div className="mb-2.5 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-1.5 px-0.5">
                      <span
                        className="inline-flex shrink-0 text-blue-500"
                        aria-hidden
                      >
                        <TrendingUp className="size-3.5" />
                      </span>
                      <h4
                        className={cn(
                          typography.sectionTitle,
                          'col-start-2 m-0 min-w-0 text-slate-600',
                        )}
                      >
                        Velocity profile
                      </h4>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3 px-0.5">
                      <div className="flex flex-col gap-0">
                        <span
                          className={cn(
                            typography.caption,
                            'font-normal text-slate-500 tracking-tight',
                          )}
                        >
                          Average
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span
                            className={cn(
                              typography.kpi,
                              'leading-none text-slate-800 tabular-nums tracking-tight',
                            )}
                          >
                            {MOCK_TRIP_SUMMARY.avgSpeed.split(' ')[0]}
                          </span>
                          <span
                            className={cn(typography.meta, 'text-slate-500')}
                          >
                            km/h
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-0 items-end">
                        <span
                          className={cn(
                            typography.caption,
                            'font-normal text-slate-500 tracking-tight',
                          )}
                        >
                          Peak
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span
                            className={cn(
                              typography.kpi,
                              'leading-none text-rose-500 tabular-nums tracking-tight',
                            )}
                          >
                            {MOCK_TRIP_SUMMARY.maxSpeed.split(' ')[0]}
                          </span>
                          <span
                            className={cn(typography.meta, 'text-rose-500/90')}
                          >
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
                      <span
                        className={cn(
                          typography.meta,
                          'absolute top-[35%] right-0 -mt-2 text-rose-400/80',
                        )}
                      >
                        80 limit
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
                      <span
                        className={cn(
                          typography.meta,
                          'shrink-0 text-slate-500',
                        )}
                      >
                        Start
                      </span>
                      <div className="flex items-center gap-1">
                        <div className="h-1 w-1 rounded-full bg-rose-400" />
                        <span
                          className={cn(
                            typography.body,
                            'font-medium tracking-tight text-rose-600',
                          )}
                        >
                          {MOCK_TRIP_SUMMARY.overspeedEvents} violations
                        </span>
                      </div>
                      <span
                        className={cn(
                          typography.meta,
                          'shrink-0 text-slate-500',
                        )}
                      >
                        End
                      </span>
                    </div>
                  </GlassCard>

                  {/* Stop Analysis Card */}
                  <GlassCard className="p-2.5 border-white/60 shadow-sm border border-slate-200/40 bg-white/80 backdrop-blur-xl rounded-xl">
                    <div className="mb-2.5 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-1.5 px-0.5">
                      <span
                        className="inline-flex shrink-0 text-blue-500"
                        aria-hidden
                      >
                        <MapPin className="size-3.5" />
                      </span>
                      <h4
                        className={cn(
                          typography.sectionTitle,
                          'col-start-2 m-0 min-w-0 text-slate-600',
                        )}
                      >
                        Stop metrics
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
                          <span
                            className={cn(
                              typography.body,
                              'mb-0.5 font-medium leading-none text-slate-800 tabular-nums',
                            )}
                          >
                            {m.val}
                          </span>
                          <span
                            className={cn(
                              typography.caption,
                              'font-normal text-slate-500 tracking-tight',
                            )}
                          >
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
                              <span
                                className={cn(
                                  typography.body,
                                  'mb-0.5 truncate font-medium leading-tight text-slate-800 tracking-tight',
                                )}
                              >
                                {s.loc}
                              </span>
                              <span
                                className={cn(
                                  typography.meta,
                                  'not-italic font-normal text-slate-500 tabular-nums',
                                )}
                              >
                                {s.time}
                              </span>
                            </div>
                            <div className="shrink-0 flex flex-col items-end">
                              <span
                                className={cn(
                                  typography.body,
                                  'mb-0.5 font-medium leading-none text-blue-600',
                                )}
                              >
                                {s.dur}
                              </span>
                              <span
                                className={cn(
                                  typography.caption,
                                  'rounded-sm bg-blue-100 px-1 font-medium text-blue-700 tracking-tight',
                                )}
                              >
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
                    <div className="mb-1.5 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-1.5 px-1">
                      <span
                        className="inline-flex shrink-0 text-slate-400"
                        aria-hidden
                      >
                        <History className="size-3.5" />
                      </span>
                      <h4
                        className={cn(
                          typography.sectionTitle,
                          'col-start-2 m-0 min-w-0 text-slate-600',
                        )}
                      >
                        Operational sequence
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
                                  typography.body,
                                  'font-medium leading-tight tracking-tight',
                                  ev.type === 'Overspeed'
                                    ? 'text-rose-600'
                                    : 'text-slate-800',
                                )}
                              >
                                {ev.type}
                              </span>
                              <span
                                className={cn(
                                  typography.meta,
                                  'font-mono leading-none not-italic text-slate-500 tabular-nums',
                                )}
                              >
                                {ev.time.split(' ')[0]}
                              </span>
                            </div>
                            <p
                              className={cn(
                                typography.meta,
                                'mb-2 truncate leading-tight text-slate-500',
                              )}
                            >
                              {ev.description}
                            </p>
                            <div className="flex items-center gap-1 border-t border-slate-50/50 pt-1.5">
                              <MapPin className="h-2 w-2 text-slate-300" />
                              <span
                                className={cn(
                                  typography.meta,
                                  'truncate leading-none text-slate-500',
                                )}
                              >
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
