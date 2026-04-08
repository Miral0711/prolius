import type { ElementType } from 'react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

export interface PanelHeaderProps {
  title: string;
  icon?: ElementType;
  extra?: string;
  className?: string;
}

/**
 * Section header strip used inside detail drawers and info panels.
 * Replaces the local PanelHeader in VehicleDetailsDrawer.
 */
export function PanelHeader({ title, icon: Icon, extra, className }: PanelHeaderProps) {
  return (
    <header className={cn('mb-2 border-b border-slate-100 pb-2', className)}>
      <div className="flex flex-nowrap items-baseline justify-between gap-3 px-2">
        <div
          className={cn(
            'min-w-0 flex-1',
            Icon && 'grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-1.5',
          )}
        >
          {Icon && (
            <span className="inline-flex translate-y-0.5 text-[#2e5f8a]" aria-hidden>
              <Icon className="size-3.5" />
            </span>
          )}
          <h3
            className={cn(
              typography.sectionTitle,
              'min-w-0 truncate',
              Icon && 'col-start-2',
            )}
          >
            {title}
          </h3>
        </div>
        {extra && (
          <span
            className={cn(
              typography.meta,
              'max-w-[42%] shrink-0 whitespace-nowrap text-right tabular-nums text-slate-500',
            )}
          >
            {extra}
          </span>
        )}
      </div>
    </header>
  );
}
