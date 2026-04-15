import { AlertTriangle, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { PlanningCard } from '../mock-data';

interface PlanningEventCardProps {
  card: PlanningCard;
  /** Set of vehicle codes that have a scheduling conflict on this date */
  conflictVehicles?: Set<string>;
}

export function PlanningEventCard({ card, conflictVehicles }: PlanningEventCardProps) {
  const cardHasConflict = conflictVehicles
    ? card.rows.some((r) => conflictVehicles.has(r.vehicleCode))
    : false;

  return (
    <div
      className={cn(
        'rounded-lg bg-white shadow-[0_1px_4px_rgba(0,0,0,0.06)]',
        cardHasConflict
          ? 'border-2 border-red-400 border-l-[5px] border-l-red-500'
          : 'border border-slate-200',
      )}
    >
      {/* Card header */}
      <div
        className={cn(
          'flex items-center justify-between border-b px-3 py-2',
          cardHasConflict ? 'border-b-red-200 bg-red-50' : 'border-b-slate-100',
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[13px] font-semibold text-slate-800 truncate">
            {card.title}{' '}
            <span className="font-normal text-slate-400">({card.count})</span>
          </span>
          {cardHasConflict && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded border border-red-300 bg-red-100 px-2 py-0.5 text-[11px] font-bold text-red-700 leading-tight">
              <AlertTriangle className="size-3 shrink-0" />
              Conflict
            </span>
          )}
        </div>
        <Button variant="ghost" size="icon" className="size-6 shrink-0" aria-label="More options">
          <MoreHorizontal className="size-3.5" />
        </Button>
      </div>

      {/* Card rows */}
      <div className={cn('divide-y divide-slate-100', card.rows.length > 4 && 'max-h-[160px] overflow-y-auto')}>
        {/* Column headers */}
        <div className="grid grid-cols-[110px_1fr] gap-2 px-3 py-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Unit</span>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Description</span>
        </div>
        {card.rows.map((row, i) => {
          const isConflictRow = conflictVehicles?.has(row.vehicleCode) ?? false;
          return (
            <div
              key={i}
              className={cn(
                'grid grid-cols-[110px_1fr] gap-2 px-3 py-1.5 transition-colors',
                isConflictRow ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-slate-50',
              )}
            >
              <div className="flex items-center gap-1 min-w-0">
                {isConflictRow && (
                  <AlertTriangle className="size-3.5 shrink-0 text-red-500" aria-label="Schedule conflict" />
                )}
                <span className={cn('text-xs font-semibold truncate', isConflictRow ? 'text-red-700' : 'text-slate-700')}>
                  {row.vehicleCode}
                </span>
              </div>
              <span className="text-xs text-slate-500 truncate">{row.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
