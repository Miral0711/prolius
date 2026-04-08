import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

export interface PanelCardProps {
  /** Card title shown in the header strip */
  title?: string;
  /** Right-side header content (actions, badges, etc.) */
  headerRight?: ReactNode;
  /** Card body content */
  children: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Extra classes on the root element */
  className?: string;
  /** Extra classes on the body/content area */
  contentClassName?: string;
  /**
   * Visual style:
   * - `default`  — white card with border + shadow (fleet/admin pages)
   * - `glass`    — glassmorphism (dashboard widgets)
   * - `flat`     — no shadow, minimal border (nested panels)
   */
  variant?: 'default' | 'glass' | 'flat';
  /** Remove default padding from the content area */
  noPadding?: boolean;
}

const ROOT_VARIANTS: Record<NonNullable<PanelCardProps['variant']>, string> = {
  default: 'rounded-lg border border-[#e8eef4] bg-white shadow-[0_1px_8px_rgba(61,107,142,0.07)]',
  glass:   'rounded-lg border border-white/60 bg-white/70 shadow-sm backdrop-blur-md',
  flat:    'rounded-lg border border-slate-200 bg-white',
};

/**
 * Unified card wrapper — replaces DashboardCard, DetailPanel, ChartCard,
 * DataTableCard, AnalyticsCard (panel mode), and SectionCard.
 *
 * Usage:
 *   <PanelCard title="Fleet Status" headerRight={<Button>…</Button>}>
 *     …content…
 *   </PanelCard>
 */
export function PanelCard({
  title,
  headerRight,
  children,
  footer,
  className,
  contentClassName,
  variant = 'default',
  noPadding = false,
}: PanelCardProps) {
  const hasHeader = title != null || headerRight != null;

  return (
    <div className={cn('flex flex-col overflow-hidden', ROOT_VARIANTS[variant], className)}>
      {hasHeader && (
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-100 px-3 py-2">
          {title && <h3 className={typography.cardTitle}>{title}</h3>}
          {headerRight && <div className="flex shrink-0 items-center gap-2">{headerRight}</div>}
        </div>
      )}
      <div className={cn('flex min-h-0 flex-1 flex-col', !noPadding && 'p-3', contentClassName)}>
        {children}
      </div>
      {footer && (
        <div className="shrink-0 border-t border-slate-100 px-3 py-2">{footer}</div>
      )}
    </div>
  );
}
