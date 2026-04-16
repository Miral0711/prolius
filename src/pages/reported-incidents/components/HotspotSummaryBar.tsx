import { Flame, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { HotspotInfo } from '@/lib/incidentUtils';

interface HotspotSummaryBarProps {
  top: HotspotInfo[];
  className?: string;
}

const RANK_STYLE = [
  { medal: 'bg-rose-500',   bar: 'bg-rose-100 border-rose-200 text-rose-800',   count: 'bg-rose-500 text-white'   },
  { medal: 'bg-orange-400', bar: 'bg-orange-50 border-orange-200 text-orange-800', count: 'bg-orange-400 text-white' },
  { medal: 'bg-amber-400',  bar: 'bg-amber-50 border-amber-200 text-amber-800',  count: 'bg-amber-400 text-white'  },
] as const;

export function HotspotSummaryBar({ top, className }: HotspotSummaryBarProps) {
  if (top.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap items-center gap-2 rounded-lg border border-rose-100 bg-rose-50/50 px-3 py-2', className)}>
      {/* Label */}
      <div className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-rose-700">
        <Flame className="h-3.5 w-3.5" />
        Top incident locations
      </div>

      <div className="h-3.5 w-px shrink-0 bg-rose-200" />

      {/* Pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        {top.map((spot) => {
          const s = RANK_STYLE[spot.rank - 1] ?? RANK_STYLE[2];
          return (
            <span
              key={spot.key}
              title={`${spot.count} incident${spot.count !== 1 ? 's' : ''} in ${spot.key}`}
              className={cn(
                'inline-flex cursor-default items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium',
                s.bar,
              )}
            >
              <MapPin className="h-2.5 w-2.5 shrink-0" />
              <span className="max-w-[160px] truncate">{spot.region} · {spot.division}</span>
              <span className={cn('ml-0.5 rounded-full px-1.5 py-px text-[10px] font-bold leading-none', s.count)}>
                {spot.count}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
