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

const SECTION_GAP = {
  none: 'gap-0',
  sm: 'gap-1.5',
  md: 'gap-2',
  lg: 'gap-3',
} as const;

export type PageSurfaceSectionGap = keyof typeof SECTION_GAP;

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
  sectionGap = 'md',
  className,
  children,
  ...rest
}: PageSurfaceProps) {
  return (
    <div
      className={cn(
        'box-border flex flex-col',
        PAGE_SURFACE_PADDING[padding],
        SECTION_GAP[sectionGap],
        fill && 'h-full min-h-0 min-w-0 flex-1 overflow-hidden',
        className,
      )}
      {...rest}
    >
      {children}
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

export interface PageSurfaceFooterProps {
  className?: string;
  /** Omit to render default subtle PageFooter */
  children?: React.ReactNode;
}

function PageSurfaceFooter({ className, children }: PageSurfaceFooterProps) {
  return (
    <div className={cn('flex min-w-0 shrink-0 flex-col', className)}>
      {children ?? <PageFooter variant="subtle" />}
    </div>
  );
}

export const PageSurface = Object.assign(PageSurfaceRoot, {
  Header: PageSurfaceHeader,
  Body: PageSurfaceBody,
  Footer: PageSurfaceFooter,
});
