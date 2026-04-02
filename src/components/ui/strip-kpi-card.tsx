import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type StripKpiTint =
  | 'emerald'
  | 'blue'
  | 'amber'
  | 'rose'
  | 'violet'
  | 'slate'
  | 'indigo';

const TINT_BOX: Record<StripKpiTint, string> = {
  emerald: 'bg-emerald-50 text-emerald-500',
  blue: 'bg-blue-50 text-blue-500',
  amber: 'bg-amber-50 text-amber-500',
  rose: 'bg-rose-50 text-rose-500',
  violet: 'bg-violet-50 text-violet-500',
  slate: 'bg-slate-50 text-slate-500',
  indigo: 'bg-indigo-50 text-indigo-500',
};

export interface StripKpiCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  tint: StripKpiTint;
  className?: string;
}

/**
 * Compact horizontal KPI tile for map overlays and monitoring strips.
 * Shared by Live Bus Tracking and Live DVR Monitoring.
 */
export function StripKpiCard({
  label,
  value,
  icon: Icon,
  tint,
  className,
}: StripKpiCardProps) {
  return (
    <div
      className={cn(
        'group/card flex h-[46px] min-h-[46px] shrink-0 items-center gap-2.5 rounded-lg border border-white/60 bg-white/90 px-3 shadow-md backdrop-blur-xl transition-all hover:border-blue-200 hover:bg-white',
        className,
      )}
    >
      <div
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-black/5 shadow-inner transition-transform group-hover/card:scale-105',
          TINT_BOX[tint],
        )}
      >
        <Icon className="h-3.5 w-3.5" aria-hidden />
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-0.5">
        <span className="text-sm font-semibold leading-none text-gray-800">
          {value}
        </span>
        <span className="text-xs font-medium leading-none text-gray-500">
          {label}
        </span>
      </div>
    </div>
  );
}
