import React from 'react';
import { cn } from '@/lib/utils';
import {
  PAGE_SHELL_VIEWPORT_FILL_CLASSNAME,
  PAGE_SHELL_VIEWPORT_FILL_CONTENT_CLASSNAME,
  PageShell,
} from '@/components/ui/page-shell';
import {
  PageSurface,
  PAGE_SURFACE_FOOTER_PADDING,
  type PageSurfacePadding,
  type PageSurfaceSectionGap,
} from '@/components/layout';

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
  /** Outer inset inside app shell (default matches Live Bus Tracking) */
  padding?: PageSurfacePadding;
  /** Gap between body row and footer (default none for a flush, compact footer) */
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
  padding = PAGE_SURFACE_FOOTER_PADDING,
  sectionGap = 'none',
}) => {
  return (
    <PageShell
      title={title}
      subtitle={subtitle}
      hideHeader
      className={cn(PAGE_SHELL_VIEWPORT_FILL_CLASSNAME, className)}
      contentWrapperClassName={PAGE_SHELL_VIEWPORT_FILL_CONTENT_CLASSNAME}
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


