import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { PageShell } from '@/components/ui/page-shell';
import { PageSurface, PAGE_SURFACE_FOOTER_PADDING } from '@/components/layout';
import { fleetSurface } from '@/components/fleet/bus-master/tokens';

export interface PageLayoutProps {
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * Standard page wrapper used by every list/table page.
 * Provides: PageShell → PageSurface → scrollable body → footer.
 * Children are rendered inside the flex column with consistent gap.
 */
export function PageLayout({ title, children, className }: PageLayoutProps) {
  return (
    <PageShell
      title={title}
      hideHeader
      className="flex h-full min-h-0 flex-1 flex-col space-y-0"
      contentWrapperClassName="relative flex min-h-0 flex-1 flex-col"
    >
      <PageSurface
        padding={PAGE_SURFACE_FOOTER_PADDING}
        fill
        sectionGap="none"
        className="min-h-0 flex-1 bg-[#f0f4f8]"
      >
        <PageSurface.Body className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className={cn('flex min-h-0 flex-1 flex-col', fleetSurface.sectionGap, className)}>
            {children}
          </div>
        </PageSurface.Body>
        <PageSurface.Footer />
      </PageSurface>
    </PageShell>
  );
}
