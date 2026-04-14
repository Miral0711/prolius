import * as React from 'react';
import { cn } from '@/lib/utils';
import { PageFooter } from '@/components/shared/PageFooter';

/** Outer inset inside the app shell (below header, beside sidebar). px: 8 / 12 / 16 / 20 / 24 */
export const PAGE_SURFACE_PADDING = {
  xs: 'p-2',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
  xl: 'p-6',
} as const;

export type PageSurfacePadding = keyof typeof PAGE_SURFACE_PADDING;

/**
 * Matches full-height pages (`padding="xs"`): use this on any route that renders
 * `PageSurface.Footer` so inset + space below the copyright line match the reference page.
 */
export const PAGE_SURFACE_FOOTER_PADDING: PageSurfacePadding = 'xs';

const PAGE_SURFACE_PAD_X = {
  xs: 'px-2',
  sm: 'px-3',
  md: 'px-4',
  lg: 'px-5',
  xl: 'px-6',
} as const satisfies Record<PageSurfacePadding, string>;

const PAGE_SURFACE_PAD_TOP = {
  xs: 'pt-2',
  sm: 'pt-3',
  md: 'pt-4',
  lg: 'pt-5',
  xl: 'pt-6',
} as const satisfies Record<PageSurfacePadding, string>;

const PAGE_SURFACE_PAD_BOTTOM = {
  xs: 'pb-2',
  sm: 'pb-3',
  md: 'pb-4',
  lg: 'pb-5',
  xl: 'pb-6',
} as const satisfies Record<PageSurfacePadding, string>;

const SECTION_GAP = {
  none: 'gap-0',
  sm: 'gap-1.5',
  md: 'gap-2',
  lg: 'gap-3',
} as const;

export type PageSurfaceSectionGap = keyof typeof SECTION_GAP;

function partitionPageSurfaceChildren(children: React.ReactNode) {
  const rest: React.ReactNode[] = [];
  let body: React.ReactElement | undefined;
  let footer: React.ReactElement | undefined;

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      rest.push(child);
      return;
    }
    if (child.type === PageSurfaceBody) {
      body = child;
      return;
    }
    if (child.type === PageSurfaceFooter) {
      footer = child;
      return;
    }
    rest.push(child);
  });

  return { rest, body, footer };
}

export interface PageSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: PageSurfacePadding;
  /** Use full main height; pair with PageSurface.Body flex-1 + overflow as needed */
  fill?: boolean;
  /** Gap between optional header, body, and footer rows */
  sectionGap?: PageSurfaceSectionGap;
  children: React.ReactNode;
}

function PageSurfaceRoot({
  padding = 'md',
  fill = false,
  sectionGap = 'none',
  className,
  children,
  ...rest
}: PageSurfaceProps) {
  const { rest: otherChildren, body, footer } =
    partitionPageSurfaceChildren(children);
  const hasFooter = footer != null;

  return (
    <div
      className={cn(
        'box-border flex min-h-0 min-w-0 flex-col',
        !hasFooter && PAGE_SURFACE_PADDING[padding],
        hasFooter && 'p-0',
        SECTION_GAP[sectionGap],
        fill && 'h-full min-h-0 min-w-0 flex-1 overflow-hidden',
        className,
      )}
      {...rest}
    >
      {otherChildren}
      {body != null &&
        (hasFooter ? (
          <div
            className={cn(
              'flex min-h-0 min-w-0 flex-1 flex-col',
              PAGE_SURFACE_PAD_X[padding],
              PAGE_SURFACE_PAD_TOP[padding],
            )}
          >
            {body}
          </div>
        ) : (
          body
        ))}
      {footer != null && (
        <div
          className={cn(
            'flex min-w-0 shrink-0 flex-col',
            PAGE_SURFACE_PAD_X[padding],
            PAGE_SURFACE_PAD_BOTTOM[padding],
          )}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

function PageSurfaceHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('flex min-w-0 shrink-0 flex-col', className)}>
      {children}
    </div>
  );
}

function PageSurfaceBody({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('flex min-h-0 min-w-0 flex-col', className)}>
      {children}
    </div>
  );
}

PageSurfaceBody.displayName = 'PageSurfaceBody';

export interface PageSurfaceFooterProps {
  className?: string;
  /** Omit to render the shared compact app `PageFooter` */
  children?: React.ReactNode;
}

function PageSurfaceFooter({ className, children }: PageSurfaceFooterProps) {
  return (
    <div className={cn('flex min-h-0 min-w-0 w-full shrink-0 flex-col', className)}>
      {children ?? <PageFooter />}
    </div>
  );
}

PageSurfaceFooter.displayName = 'PageSurfaceFooter';

export const PageSurface = Object.assign(PageSurfaceRoot, {
  Header: PageSurfaceHeader,
  Body: PageSurfaceBody,
  Footer: PageSurfaceFooter,
});
