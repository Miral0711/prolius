'use client';

import * as React from 'react';
import { typography } from '@/lib/typography';
import { cn } from '@/lib/utils';

/**
 * Page shell: gradient frame + optional title row. Put primary layout and outer
 * inset in `PageSurface` (`@/components/layout`) inside `contentWrapperClassName` / children so
 * footer and body share one padding system.
 */
const pageContainerClass = 'relative mx-auto w-full space-y-1.5';

/** Full-viewport child under app header; used by Create Job, Messaging, and similar full-height pages. */
export const PAGE_SHELL_VIEWPORT_FILL_CLASSNAME =
  'flex h-full min-h-0 flex-1 flex-col space-y-0 overflow-hidden bg-transparent pt-0 pb-0 max-w-none';

export const PAGE_SHELL_VIEWPORT_FILL_CONTENT_CLASSNAME =
  'relative flex h-full min-h-0 flex-1 flex-col overflow-hidden p-0';

const pageBgClass =
  'pointer-events-none absolute -inset-[1px] -z-10 overflow-hidden rounded-[28px]';

const pageHeaderRowClass =
  'relative flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-between';

const pageTitleClass = cn(
  typography.pageTitle,
  'text-slate-900',
);
const pageSubtitleClass = cn(
  typography.pageSubtitle,
  'mt-0.5 text-[#7b82a9] opacity-60',
);

export interface PageShellProps {
  title: string;
  subtitle?: string;
  rightActions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /** Optional class for the page title (h1) */
  titleClassName?: string;
  /** Optional class for the subtitle (p) */
  subtitleClassName?: string;
  /** Optional class for the wrapper div that contains children (e.g. flex-1 min-h-0 for fill layout) */
  contentWrapperClassName?: string;
  /** Whether to hide the default header row (title/subtitle/actions) */
  hideHeader?: boolean;
  /** Whether to hide only the title h1 while keeping subtitle/actions */
  hideTitle?: boolean;
}

export function PageShell({
  title,
  subtitle,
  rightActions,
  children,
  className,
  titleClassName,
  subtitleClassName,
  contentWrapperClassName,
  hideHeader = false,
  hideTitle = false,
}: PageShellProps) {
  return (
    <div className={cn(pageContainerClass, className)}>
      <div className={pageBgClass} aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_10%_20%,rgba(255,182,193,0.25),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_85%_15%,rgba(221,160,221,0.2),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_85%,rgba(173,216,230,0.22),transparent_45%)]" />
      </div>

      {!hideHeader && (
        <div className={pageHeaderRowClass}>
          <div>
            {!hideTitle && (
              <h1 className={cn(pageTitleClass, titleClassName)}>{title}</h1>
            )}
            {subtitle != null && (
              <p className={cn(pageSubtitleClass, subtitleClassName)}>
                {subtitle}
              </p>
            )}
          </div>
          {rightActions != null && (
            <div className="self-start lg:self-auto">{rightActions}</div>
          )}
        </div>
      )}

      <div className={cn('relative', contentWrapperClassName)}>{children}</div>
    </div>
  );
}

export {
  pageContainerClass,
  pageBgClass,
  pageHeaderRowClass,
  pageTitleClass,
  pageSubtitleClass,
};


