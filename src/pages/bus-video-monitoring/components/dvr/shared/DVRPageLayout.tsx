import React from 'react';
import { cn } from '@/lib/utils';
import {
  PageSurface,
  type PageSurfacePadding,
  type PageSurfaceSectionGap,
} from '@/components/layout';
import { PageShell } from '@/components/ui/page-shell';

interface DVRPageLayoutProps {
  title: string;
  subtitle?: string;
  leftPanel: React.ReactNode;
  centerPanel: React.ReactNode;
  rightPanel?: React.ReactNode;
  className?: string;
  /** Extra classes on the main horizontal row (columns + gap) */
  gridClassName?: string;
  /** Fixed width of the left column (device list / sidebar) */
  leftColumnClassName?: string;
  /** Fixed width of the right column when present */
  rightColumnClassName?: string;
  /** Outer inset inside app shell (default 16px) */
  padding?: PageSurfacePadding;
  /** Gap between body row and footer (default md) */
  sectionGap?: PageSurfaceSectionGap;
}

export const DVRPageLayout: React.FC<DVRPageLayoutProps> = ({
  title,
  subtitle,
  leftPanel,
  centerPanel,
  rightPanel,
  className,
  gridClassName,
  leftColumnClassName,
  rightColumnClassName,
  padding = 'md',
  sectionGap = 'md',
}) => {
  return (
    <PageShell
      title={title}
      subtitle={subtitle}
      hideHeader
      className={cn(
        'flex h-full min-h-0 flex-1 flex-col space-y-0 overflow-hidden bg-transparent pt-0 pb-0 max-w-none',
        className,
      )}
      contentWrapperClassName="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden p-0"
    >
      <PageSurface padding={padding} fill sectionGap={sectionGap}>
        <PageSurface.Body className="min-h-0 flex-1 overflow-hidden">
          <div
            className={cn(
              'flex min-h-0 flex-1 items-stretch gap-2.5 overflow-hidden',
              gridClassName,
            )}
          >
            <div
              className={cn(
                'flex min-h-0 w-[280px] shrink-0 flex-col overflow-hidden self-stretch',
                leftColumnClassName,
              )}
            >
              {leftPanel}
            </div>

            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
              {centerPanel}
            </div>

            {rightPanel != null ? (
              <div
                className={cn(
                  'flex min-h-0 w-[280px] shrink-0 flex-col overflow-hidden self-stretch',
                  rightColumnClassName,
                )}
              >
                {rightPanel}
              </div>
            ) : null}
          </div>
        </PageSurface.Body>
        <PageSurface.Footer />
      </PageSurface>
    </PageShell>
  );
};
