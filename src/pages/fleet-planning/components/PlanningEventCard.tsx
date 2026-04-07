import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { PlanningCard } from '../mock-data';

interface PlanningEventCardProps {
  card: PlanningCard;
}

export function PlanningEventCard({ card }: PlanningEventCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      {/* Card header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
        <span className="text-[13px] font-semibold text-slate-800">
          {card.title}{' '}
          <span className="font-normal text-slate-400">({card.count})</span>
        </span>
        <Button variant="ghost" size="icon" className="size-6 shrink-0" aria-label="More options">
          <MoreHorizontal className="size-3.5" />
        </Button>
      </div>

      {/* Card rows — scrollable if many */}
      <div className={cn('divide-y divide-slate-50', card.rows.length > 4 && 'max-h-[160px] overflow-y-auto')}>
        {/* Column headers */}
        <div className="grid grid-cols-[100px_1fr] gap-2 px-3 py-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Unit</span>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Description</span>
        </div>
        {card.rows.map((row, i) => (
          <div key={i} className="grid grid-cols-[100px_1fr] gap-2 px-3 py-1.5 hover:bg-slate-50/60 transition-colors">
            <span className="text-xs font-medium text-slate-700 truncate">{row.vehicleCode}</span>
            <span className="text-xs text-slate-500 truncate">{row.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
