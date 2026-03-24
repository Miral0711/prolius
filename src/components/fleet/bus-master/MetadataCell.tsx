import * as React from 'react';
import { cn } from '@/lib/utils';

export interface MetadataCellProps {
  /** Main line (e.g. company or bus name) */
  primary: React.ReactNode;
  /** Secondary line (enterprise, type, route, branch — comma or middot separated) */
  secondary?: React.ReactNode;
  className?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
}

/** Two-line table cell: bold primary + muted secondary (truncate-safe). */
export function MetadataCell({
  primary,
  secondary,
  className,
  primaryClassName,
  secondaryClassName,
}: MetadataCellProps) {
  return (
    <div className={cn('min-w-0 text-left', className)}>
      <div
        className={cn(
          'truncate text-[11px] font-semibold leading-tight text-slate-900',
          primaryClassName,
        )}
      >
        {primary}
      </div>
      {secondary != null && secondary !== '' && (
        <div
          className={cn(
            'mt-0.5 truncate text-[9px] font-medium leading-tight text-slate-500',
            secondaryClassName,
          )}
        >
          {secondary}
        </div>
      )}
    </div>
  );
}
