import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { fleetSurface } from '@/components/fleet/bus-master/tokens';

export interface SearchPanelProps {
  children: ReactNode;
  className?: string;
}

/**
 * Consistent search/filter bar wrapper used across all list pages.
 * Provides the white card with border, padding, and shadow.
 */
export function SearchPanel({ children, className }: SearchPanelProps) {
  return (
    <div
      className={cn(
        'max-w-full shrink-0 rounded-md border border-slate-200/90 bg-white shadow-sm',
        fleetSurface.filterBar,
        className,
      )}
    >
      {children}
    </div>
  );
}
