import { Info, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { dvrTypography, LegendItem } from './shared/DVRSharedComponents';

/* ─── 1. TIMELINE MARKER COMPONENT ───────────────────────────── */
export const TimelineMarker = ({
  pct,
  color,
  label,
}: {
  pct: number;
  color: string;
  label: string;
}) => (
  <div
    className="absolute top-0 bottom-0 flex flex-col items-center group cursor-pointer z-20"
    style={{ left: `${pct}%` }}
  >
    <div className={cn('h-full w-1 relative', color)}>
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-slate-900 text-xs font-medium text-white tracking-normal whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all shadow-xl pointer-events-none mb-1">
        {label}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
      </div>
    </div>
  </div>
);

/* ─── 2. PLAYBACK TIMELINE SCRUBBER ─────────────────────────── */
interface PlaybackTimelineProps {
  progress: number;
  onProgressChange: (val: number) => void;
  eventMarkers: any[];
}

export const PlaybackTimeline = ({
  progress,
  onProgressChange,
  eventMarkers,
}: PlaybackTimelineProps) => (
  <div className="relative flex-1 group/slider py-3">
    <div
      className="relative h-1.5 w-full bg-slate-100 rounded-full cursor-pointer hover:h-2 transition-all flex items-center"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        onProgressChange(Math.round(((e.clientX - r.left) / r.width) * 100));
      }}
    >
      {/* Fill Background */}
      <div className="absolute inset-0 rounded-full bg-slate-200/40" />

      {/* Progress Fill */}
      <div
        className="absolute h-full bg-[#2e5f8a] rounded-full transition-all"
        style={{ width: `${progress}%` }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-4 w-4 rounded-full bg-white border-2 border-blue-600 shadow-lg scale-0 group-hover/slider:scale-100 transition-transform z-30" />
      </div>

      {/* Event Markers Overlay */}
      {eventMarkers.map((m, i) => (
        <TimelineMarker key={i} pct={m.pct} color={m.color} label={m.label} />
      ))}
    </div>
  </div>
);

/* ─── 3. PLAYBACK CONTROLS (Unified Single Row) ──────────────── */
interface PlaybackControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  progress: number;
  onProgressChange: (val: number) => void;
  selectedSpeed: string;
  onSpeedChange: (speed: string) => void;
  currentTime: string;
  totalTime: string;
  eventMarkers: any[];
}

export function PlaybackControls({
  isPlaying,
  onTogglePlay,
  progress,
  onProgressChange,
  selectedSpeed,
  onSpeedChange,
  currentTime,
  totalTime,
  eventMarkers,
}: PlaybackControlsProps) {
  const speeds = ['1x', '2x', '4x'];

  return (
    <div className="flex items-center gap-4 w-full">
      {/* 1. Play Toggle */}
      <button
        onClick={onTogglePlay}
        className="h-10 w-10 min-w-[40px] rounded-xl flex items-center justify-center bg-[#2e5f8a] text-white hover:bg-blue-700 transition-all shadow-md active:scale-90"
      >
        {isPlaying ? (
          <Pause className="h-4 w-4 fill-current" />
        ) : (
          <Play className="h-4 w-4 fill-current ml-0.5" />
        )}
      </button>

      {/* 2. Timeline Scrubber */}
      <PlaybackTimeline
        progress={progress}
        onProgressChange={onProgressChange}
        eventMarkers={eventMarkers}
      />

      {/* 3. Time Display */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f4f8fb] border border-slate-200/60 rounded-xl">
        <span
          className={cn(
            dvrTypography.valueTight,
            'font-mono text-gray-800 leading-none',
          )}
        >
          {currentTime}
        </span>
        <span className="text-gray-300 text-xs font-medium">/</span>
        <span
          className={cn(
            dvrTypography.metadata,
            'font-mono leading-none',
          )}
        >
          {totalTime}
        </span>
      </div>

      {/* 4. Speed Selection */}
      <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/40">
        {speeds.map((s) => (
          <button
            key={s}
            onClick={() => onSpeedChange(s)}
            className={cn(
              dvrTypography.control,
              'px-3 h-7 rounded-lg transition-all',
              selectedSpeed === s
                ? 'bg-white text-[#2e5f8a] shadow-sm border border-slate-200'
                : 'text-gray-400 hover:text-gray-600',
            )}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── 4. TIMELINE ANALYTICS ──────────────────────────────────── */
export function DvrTimelineAnalytics() {
  return (
    <div className="mt-3 pt-3 border-t border-slate-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-[#2e5f8a]" />
          <h3 className={cn(dvrTypography.sectionTitle, 'leading-none')}>
            Archive Content Distribution
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <LegendItem label="Normal" color="bg-slate-200" />
          <LegendItem label="Alert" color="bg-amber-400" />
          <LegendItem label="Critical" color="bg-rose-500" />
        </div>
      </div>

      <div className="relative space-y-2">
        <div className="flex h-3 w-full gap-0.5 rounded-full overflow-hidden shadow-inner bg-[#f4f8fb]">
          {Array.from({ length: 24 }).map((_, i) => {
            const colors = [
              'bg-slate-200',
              'bg-slate-200',
              'bg-slate-200',
              'bg-amber-400',
              'bg-slate-200',
              'bg-rose-500',
              'bg-slate-200',
            ];
            const colorClass = colors[i % colors.length];
            return <div key={i} className={cn('h-full flex-1', colorClass)} />;
          })}
        </div>

        <div className="flex justify-between px-1">
          {['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '00:00'].map(
            (t) => (
              <div key={t} className="flex flex-col items-center gap-1">
                <div className="h-1.5 w-px bg-slate-200" />
                <span
                  className={cn(
                    dvrTypography.metadata,
                    'tabular-nums leading-none',
                  )}
                >
                  {t}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}


