import type { ReactNode, ElementType } from 'react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

export interface CardHeaderProps {
  title: string;
  /** Icon component (LucideIcon or any React element type) */
  icon?: ElementType;
  iconClassName?: string;
  iconWrapperClassName?: string;
  /** Right-side content: subtitle text, badge, or any node */
  trailing?: ReactNode;
  className?: string;
  /** Show a live pulse dot before the title */
  live?: boolean;
}

/**
 * Reusable card header strip.
 * Used by CompactLeaderboard, CompactSummaryWidget, CompactActivityFeed, TopDriversCard.
 */
export function CardHeader({
  title,
  icon: Icon,
  iconClassName,
  iconWrapperClassName,
  trailing,
  className,
  live = false,
}: CardHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between border-b border-slate-100/50 px-3 py-2 bg-slate-50/40 shrink-0',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {live && (
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
        )}
        {Icon && (
          <div
            className={cn(
              'flex h-6 w-6 items-center justify-center rounded-md border border-white/50',
              iconWrapperClassName ?? 'bg-slate-100',
            )}
          >
            <Icon className={cn('h-3.5 w-3.5 text-slate-500', iconClassName)} />
          </div>
        )}
        <h3 className={typography.cardTitle}>{title}</h3>
      </div>
      {trailing != null && (
        <div className="flex items-center gap-2 shrink-0">{trailing}</div>
      )}
    </div>
  );
}
