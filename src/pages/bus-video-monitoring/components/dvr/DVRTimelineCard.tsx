import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

interface TimelineEvent {
  time: string;
  type: string;
  pct: number;
  color: string;
  dot: string;
  label: string;
}

interface DVRTimelineCardProps {
  events: TimelineEvent[];
  progress: number;
  onProgressChange: (val: number) => void;
  hours: string[];
}

export const DVRTimelineCard: React.FC<DVRTimelineCardProps> = ({
  events,
  progress,
  onProgressChange,
  hours,
}) => {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  return (
    <div className="rounded-xl border border-white bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] p-3">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-orange-50">
            <Clock className="h-3 w-3 text-orange-600" />
          </div>
          <h2 className={cn(typography.cardTitle, 'leading-none')}>
            Temporal Analysis Chronology
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            {[
              { label: 'Braking', color: 'bg-rose-500' },
              { label: 'Speeding', color: 'bg-amber-500' },
              { label: 'Signal', color: 'bg-[#2e5f8a]' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1">
                <span className={cn('h-1 w-1 rounded-full', l.color)} />
                <span className="text-2xs font-medium text-slate-400 uppercase tracking-tight">{l.label}</span>
              </div>
            ))}
          </div>
          <div className="h-5 w-px bg-slate-100" />
          <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-[#f4f8fb] p-0.5 shadow-inner">
            <button type="button" className="h-5 w-5 flex items-center justify-center rounded text-sm font-semibold text-slate-400 hover:bg-white hover:text-slate-600 transition-all">−</button>
            <button type="button" className="h-5 w-5 flex items-center justify-center rounded text-sm font-semibold text-slate-400 hover:bg-white hover:text-slate-600 transition-all">+</button>
          </div>
        </div>
      </div>

      <div className="relative px-0.5">
        {/* Time Labels */}
        <div className="flex justify-between text-2xs text-slate-400 font-mono font-medium mb-1.5 opacity-60">
          {hours.map(h => (
            <span key={h} className="w-[1px] flex justify-center">{h}</span>
          ))}
        </div>

        {/* Timeline Tracks */}
        <div
          className="relative w-full h-8 rounded-xl bg-[#f4f8fb] border border-slate-100/60 overflow-visible cursor-pointer group/timeline shadow-inner"
          onClick={e => {
            const r = e.currentTarget.getBoundingClientRect();
            onProgressChange(Math.round(((e.clientX - r.left) / r.width) * 100));
          }}
        >
          {/* Main Background Highlight */}
          <div className="absolute inset-x-3 top-1.5 bottom-1.5 bg-[#2e5f8a]/5 rounded-full" />
          
          {/* Progress Bar (Visual Only) */}
          <div className="absolute top-0 bottom-0 left-0 bg-[#2e5f8a]/5 transition-all duration-300 pointer-events-none" style={{ width: `${progress}%` }} />

          {/* Event Markers */}
          {events.map((ev, i) => (
            <div
              key={i}
              className={cn(
                'absolute top-0 bottom-0 w-2.5 -ml-1.25 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-125 z-10',
                hoveredEvent === i ? 'opacity-100' : 'opacity-80'
              )}
              style={{ left: `${ev.pct}%` }}
              onClick={e => { e.stopPropagation(); onProgressChange(ev.pct); }}
              onMouseEnter={() => setHoveredEvent(i)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              <div className={cn('h-5 w-1 rounded-full shadow-sm', ev.color)} />
              {hoveredEvent === i && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-slate-900 border border-white/10 text-white rounded-xl shadow-2xl whitespace-nowrap z-50 animate-in fade-in zoom-in duration-200">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-2xs font-semibold text-blue-400 uppercase tracking-[0.08rem]">{ev.type}</span>
                    <span className="text-2sm font-mono font-semibold">{ev.time}</span>
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
                </div>
              )}
            </div>
          ))}

          {/* Current Progress Handle */}
          <div className="absolute top-0 bottom-0 w-0.5 bg-[#2e5f8a] z-20 shadow-[0_0_12px_rgba(37,99,235,0.6)]" style={{ left: `${progress}%` }}>
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#2e5f8a] text-white text-2xs font-mono font-semibold px-1 py-0.5 rounded-full shadow-lg">
              {progress}%
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white border-2 border-blue-600 shadow-lg" />
          </div>
        </div>
      </div>

      {/* Summary Row */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        {[
          { label: 'Harsh Braking', value: '2', c: 'bg-rose-50 text-rose-600 border-rose-100' },
          { label: 'Speed Violations', value: '2', c: 'bg-amber-50 text-amber-600 border-amber-100' },
          { label: 'Camera Errors', value: '1', c: 'bg-[#e8f0f8] text-[#2e5f8a] border-[#dcedf8]' },
          { label: 'Geofence Breaches', value: '1', c: 'bg-violet-50 text-violet-600 border-violet-100' },
        ].map(s => (
          <span key={s.label} className={cn('inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-2xs font-semibold border uppercase tracking-tight', s.c)}>
             <span className="h-1 w-1 rounded-full bg-current opacity-70" />
             {s.label}
             <span className="ml-1 opacity-100 bg-white/50 px-1 rounded-md">{s.value}</span>
          </span>
        ))}
      </div>
    </div>
  );
};


