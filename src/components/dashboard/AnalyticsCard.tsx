import { type LucideIcon, type ReactNode } from 'lucide-react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

/**
 * Two usage modes:
 * 1. KPI mode  — pass `label`, `value`, `icon` (no children)
 * 2. Panel mode — pass `title` + `children` (acts as a titled card wrapper)
 */
export type AnalyticsCardProps =
  | {
      /** KPI mode */
      label: string;
      value: string | number;
      sub?: string;
      icon: LucideIcon;
      color?: string;
      bg?: string;
      className?: string;
      title?: never;
      children?: never;
      action?: never;
    }
  | {
      /** Panel / chart-wrapper mode */
      title: string;
      children: ReactNode;
      action?: ReactNode;
      className?: string;
      label?: never;
      value?: never;
      sub?: never;
      icon?: never;
      color?: never;
      bg?: never;
    };

export function AnalyticsCard(props: AnalyticsCardProps) {
  const baseClass = cn(
    'rounded-lg border border-white/60 bg-white/70 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:shadow-md',
    props.className,
  );

  // Panel / chart-wrapper mode
  if ('title' in props && props.title !== undefined) {
    return (
      <div className={cn(baseClass, 'p-3 flex flex-col gap-2')}>
        <div className="flex items-center justify-between gap-2 shrink-0">
          <h3 className={typography.cardTitle}>{props.title}</h3>
          {props.action && <div className="shrink-0">{props.action}</div>}
        </div>
        {props.children}
      </div>
    );
  }

  // KPI mode
  const { label, value, sub, icon: Icon, color = 'text-slate-600', bg = 'bg-slate-100' } = props;
  return (
    <div className={cn(baseClass, 'p-2 flex flex-col gap-2')}>
      <div
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded-lg shadow-xs border border-white/40',
          bg,
        )}
      >
        <Icon className={cn('h-3.5 w-3.5', color)} />
      </div>
      <div>
        <p className={cn(typography.kpi, 'leading-none', color)}>{value}</p>
        <p className={cn('mt-1 truncate tracking-tight', typography.label, 'text-slate-700')}>{label}</p>
        {sub && (
          <p className={cn('truncate tracking-tighter mt-0.5', typography.meta, 'text-slate-400')}>{sub}</p>
        )}
      </div>
    </div>
  );
}
