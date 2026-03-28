import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

/**
 * Page toolbar. Matches layout-19 pattern:
 * flex flex-wrap justify-between gap-3.5 py-5.
 * Use inside container-fluid for consistent page structure.
 */
function Toolbar({ children }: { children?: ReactNode }) {
  return (
    <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
      {children}
    </div>
  );
}

function ToolbarActions({ children }: { children?: ReactNode }) {
  return <div className="flex items-center gap-3">{children}</div>;
}

function ToolbarHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        className
          ? `flex flex-col justify-center gap-1 ${className}`
          : 'flex flex-col justify-center gap-1'
      }
    >
      {children}
    </div>
  );
}

function ToolbarPageTitle({ children }: { children?: ReactNode }) {
  return (
    <h1 className={cn(typography.pageTitle, 'text-gray-900')}>
      {children}
    </h1>
  );
}

function ToolbarDescription({ children }: { children?: ReactNode }) {
  return (
    <div className={cn('mt-1 flex items-center gap-2', typography.pageSubtitle, 'text-gray-500')}>
      {children}
    </div>
  );
}

export {
  Toolbar,
  ToolbarActions,
  ToolbarHeading,
  ToolbarPageTitle,
  ToolbarDescription,
};


