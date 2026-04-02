import { type LucideIcon } from 'lucide-react';
import { typography } from '@/lib/typography';
import { cn } from '@/lib/utils';

export interface KpiCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon?: LucideIcon;
  trend?: { value: string; positive?: boolean };
  accent?: 'blue' | 'emerald' | 'amber' | 'slate' | 'violet' | 'cyan' | 'rose';
  className?: string;
}

const ACCENT_STYLES: Record<NonNullable<KpiCardProps['accent']>, string> = {
  blue: 'border-l-blue-500',
  emerald: 'border-l-emerald-500',
  amber: 'border-l-amber-500',
  slate: 'border-l-slate-400',
  violet: 'border-l-violet-500',
  cyan: 'border-l-cyan-500',
  rose: 'border-l-rose-500',
};

const ICON_COLOR: Record<NonNullable<KpiCardProps['accent']>, string> = {
  blue: 'text-blue-600',
  emerald: 'text-emerald-600',
  amber: 'text-amber-600',
  slate: 'text-slate-600',
  violet: 'text-violet-600',
  cyan: 'text-cyan-600',
  rose: 'text-rose-600',
};

export function KpiCard({
  title,
  value,
  subValue,
  icon: Icon,
  trend,
  accent = 'slate',
  className,
}: KpiCardProps) {
  return (
    <div
      className={cn(
        'flex min-h-0 items-center gap-2 rounded-lg border border-slate-200 bg-white/60 p-2 backdrop-blur-md',
        ACCENT_STYLES[accent],
        'border-l-4',
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <p className={cn(typography.label, 'text-slate-500')}>{title}</p>
        <p className={cn(typography.kpi, 'text-slate-900')}>{value}</p>
        {subValue && (
          <p className={cn(typography.meta, 'text-slate-400')}>{subValue}</p>
        )}
        {trend && (
          <p
            className={cn(
              typography.label,
              trend.positive ? 'text-emerald-600' : 'text-rose-600',
            )}
          >
            {trend.value}
          </p>
        )}
      </div>
      {Icon && (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-slate-100">
          <Icon className={cn('h-3 w-3', ICON_COLOR[accent])} />
        </div>
      )}
    </div>
  );
}
