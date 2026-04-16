import { TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IncidentTrend } from '@/lib/incidentUtils';

interface IncidentTrendBadgeProps {
  trend: IncidentTrend;
  className?: string;
}

const CFG = {
  up:   { icon: TrendingUp,   pill: 'bg-rose-50 text-rose-700 ring-rose-200',   dot: 'bg-rose-500'   },
  down: { icon: TrendingDown, pill: 'bg-emerald-50 text-emerald-700 ring-emerald-200', dot: 'bg-emerald-500' },
  flat: { icon: Minus,        pill: 'bg-slate-100 text-slate-600 ring-slate-200', dot: 'bg-slate-400'  },
} as const;

export function IncidentTrendBadge({ trend, className }: IncidentTrendBadgeProps) {
  const { icon: Icon, pill } = CFG[trend.direction];
  const sign = trend.delta > 0 ? '+' : '';
  const pctStr = trend.pct !== null ? ` (${sign}${trend.pct}%)` : '';
  const shortLabel = `${sign}${trend.delta}${pctStr} vs last week`;

  const tooltip = [
    `This week (${trend.currentPeriodLabel}): ${trend.current} incidents`,
    `Last week (${trend.previousPeriodLabel}): ${trend.previous} incidents`,
    trend.pct !== null
      ? `${sign}${trend.pct}% change`
      : trend.previous === 0
        ? 'No incidents last week'
        : '',
  ]
    .filter(Boolean)
    .join('\n');

  return (
    <span
      title={tooltip}
      className={cn(
        'inline-flex cursor-default items-center gap-1 rounded-full px-2 py-0.5',
        'text-[11px] font-semibold leading-none ring-1',
        pill,
        className,
      )}
    >
      <Icon className="h-3 w-3 shrink-0" />
      {shortLabel}
    </span>
  );
}
