import type { ElementType } from 'react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

export type InfoRowStatus = 'online' | 'offline' | 'warn' | 'active';

export interface InfoGridRowProps {
  label: string;
  value: string | number | null | undefined;
  status?: InfoRowStatus;
  /** 'light' = white bg, 'soft' = slate-50 bg */
  theme?: 'light' | 'soft';
  icon?: ElementType;
  className?: string;
}

const STATUS_DOT: Record<InfoRowStatus, string> = {
  online: 'bg-emerald-500',
  active: 'bg-emerald-500',
  offline: 'bg-slate-300',
  warn: 'bg-rose-500',
};

/**
 * Compact label/value row used in detail drawers and info panels.
 * Replaces the local GridRow in VehicleDetailsDrawer and similar components.
 */
export function InfoGridRow({ label, value, status, theme = 'light', icon: Icon, className }: InfoGridRowProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-0.5 rounded-md border px-2 py-1.5 transition-all group',
        theme === 'light' ? 'border-slate-100/60 bg-white' : 'border-transparent bg-slate-50/50',
        className,
      )}
    >
      <div className="flex items-center gap-1">
        {Icon && (
          <Icon className="h-2 w-2 text-slate-400 transition-colors group-hover:text-[#2e5f8a]" />
        )}
        <span className={cn(typography.caption, 'truncate font-normal leading-tight tracking-tight text-slate-500')}>
          {label}
        </span>
      </div>
      <div className="flex min-w-0 items-center gap-1.5">
        {status && (
          <div
            className={cn(
              'h-1.5 w-1.5 shrink-0 rounded-full shadow-[0_0_4px_rgba(0,0,0,0.1)]',
              STATUS_DOT[status],
            )}
          />
        )}
        <span className={cn(typography.body, 'truncate font-medium leading-tight text-slate-800')}>
          {value ?? '--'}
        </span>
      </div>
    </div>
  );
}
