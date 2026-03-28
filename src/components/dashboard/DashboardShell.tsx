import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface DashboardShellProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wrapper for dashboard content. Each child row uses grid-cols-12.
 * Use as the root container for dashboard pages.
 */
export function DashboardShell({ children, className }: DashboardShellProps) {
  return (
    <div
      className={cn(
        'flex min-h-0 w-full min-w-0 flex-1 flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200',
        className,
      )}
    >
      {children}
    </div>
  );
}


