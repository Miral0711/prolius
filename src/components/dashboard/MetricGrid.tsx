import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

export interface MetricItem {
  label: string;
  value: string | number;
  /** Tailwind color class for the value. Default: text-slate-800 */
  valueColor?: string;
  /** Span full width in the grid */
  fullWidth?: boolean;
}

export interface MetricGridProps {
  items: MetricItem[];
  cols?: 2 | 3 | 4;
  className?: string;
  /** Use bg-slate-50 pill style (used in JobStatusCard / TripsAnalyticsCard) */
  pill?: boolean;
}

const COLS_CLASS: Record<NonNullable<MetricGridProps['cols']>, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-4',
};

/**
 * Reusable metric stat grid.
 * Used by TripStatisticsCard, FleetOverviewCard, JobStatusCard, TripsAnalyticsCard.
 */
export function MetricGrid({ items, cols = 2, className, pill = false }: MetricGridProps) {
  return (
    <div className={cn('grid gap-1', COLS_CLASS[cols], className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            item.fullWidth && 'col-span-full',
            pill && 'rounded-md bg-slate-50 px-2.5 py-1.5',
          )}
        >
          <p className={cn(typography.label, 'text-slate-500')}>{item.label}</p>
          <p className={cn('text-[14px] font-semibold leading-snug', item.valueColor ?? 'text-slate-800')}>
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
