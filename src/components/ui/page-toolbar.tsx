'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Toolbar row for filters/search/actions. Spacing consistent with dashboard sections.
 * Use inside GlassCard or as standalone row; same gap as dashboard card internals.
 */
export interface PageToolbarProps {
  children: React.ReactNode;
  className?: string;
}

export function PageToolbar({ children, className }: PageToolbarProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap justify-between items-center gap-4',
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Left group: filters, search (gap-3 like dashboard) */
export function PageToolbarLeft({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {children}
    </div>
  );
}

/** Right group: buttons */
export function PageToolbarRight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {children}
    </div>
  );
}


