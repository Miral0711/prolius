import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

interface AnalyticsCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: LucideIcon;
  color?: string;
  bg?: string;
  className?: string;
}

export function AnalyticsCard({
  label,
  value,
  sub,
  icon: Icon,
  color = 'text-slate-600',
  bg = 'bg-slate-100',
  className,
}: AnalyticsCardProps) {
  return (
    <div
      className={cn(
        'p-2 flex flex-col gap-2 rounded-lg border border-white/60 bg-white/70 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:shadow-md border-white/40',
        className,
      )}
    >
      <div
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded-lg shadow-xs border border-white/40',
          bg,
        )}
      >
        <Icon className={cn('h-3.5 w-3.5', color)} />
      </div>
      <div>
        <p
          className={cn(typography.kpi, 'leading-none', color)}
        >
          {value}
        </p>
        <p className={cn('mt-1 truncate tracking-tight', typography.label, 'text-slate-700')}>
          {label}
        </p>
        <p className={cn('truncate tracking-tighter mt-0.5', typography.meta, 'text-slate-400')}>
          {sub}
        </p>
      </div>
    </div>
  );
}
