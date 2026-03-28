import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  subValue?: string;
  color?: string;
  bgColor?: string;
  className?: string;
  /** Dense KPI strip: small icon left, label + value stacked — used on Bus Management */
  compact?: boolean;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  subValue,
  color = 'text-slate-600',
  bgColor = 'bg-slate-100',
  className,
  compact = false,
}: StatCardProps) {
  if (compact) {
    return (
      <div
        className={cn(
          'flex h-[38px] flex-1 items-center gap-2 rounded-md border border-white/40 bg-white/70 px-2 py-1',
          'shadow-[0_2px_10px_-4px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all hover:shadow-md',
          className,
        )}
      >
        <div
          className={cn(
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/50 shadow-sm',
            bgColor,
          )}
        >
          <Icon className={cn('h-3 w-3', color)} />
        </div>
        <div className="flex min-w-0 flex-col justify-center gap-0.5">
          <span className="truncate text-xs font-normal uppercase leading-none tracking-[0.04rem] text-black">
            {label}
          </span>
          <span className="text-sm font-medium leading-none tabular-nums text-slate-800">
            {value}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center gap-2 p-2 transition-all hover:bg-white hover:shadow-lg rounded-md border border-white/40 bg-white/70 backdrop-blur-md',
        className,
      )}
    >
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-sm border border-white/50',
          bgColor,
        )}
      >
        <Icon className={cn('h-4 w-4', color)} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-normal uppercase tracking-[0.04rem] text-black mb-0.5">
          {label}
        </p>
        <div className="flex items-baseline gap-1.5">
          <p
            className={cn(
              'text-2sm font-medium leading-none tabular-nums',
              color,
            )}
          >
            {value}
          </p>
          {subValue && (
            <span className="text-2xs font-normal text-slate-400 truncate tracking-tighter">
              {subValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
