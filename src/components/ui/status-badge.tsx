import * as React from 'react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

type StatusKind = 'online' | 'offline';

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  status: StatusKind;
  /**
   * Optional custom label. Defaults to capitalized status.
   */
  label?: string;
  /**
   * Show leading dot indicator.
   * Defaults to true.
   */
  showDot?: boolean;
}

/** Reusable online/offline pill used across monitoring surfaces. */
export function StatusBadge({
  status,
  label,
  showDot = true,
  className,
  ...rest
}: StatusBadgeProps) {
  const isOnline = status === 'online';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-sm border px-2 py-0',
        'min-h-[1.125rem]',
        'uppercase tracking-[0.02rem]',
        'text-[11px] leading-none font-medium',
        isOnline
          ? 'border-emerald-200 bg-emerald-50/80 text-emerald-700'
          : 'border-slate-200 bg-slate-50/80 text-slate-600',
        className,
      )}
      {...rest}
    >
      {showDot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300',
          )}
        />
      )}
      <span className={cn(typography.caption)}>{label ?? (isOnline ? 'Online' : 'Offline')}</span>
    </span>
  );
}



