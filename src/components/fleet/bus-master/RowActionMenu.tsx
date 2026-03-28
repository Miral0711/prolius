import type { LucideIcon } from 'lucide-react';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ActionButtonGroup, type ActionButtonItem } from './ActionButtonGroup';

const MENU_ICON = 'mr-2 h-3.5 w-3.5 shrink-0 text-slate-500';

export type RowMenuEntry =
  | {
      kind: 'item';
      id: string;
      icon: LucideIcon;
      label: string;
      onSelect?: () => void;
      destructive?: boolean;
    }
  | { kind: 'separator'; id: string };

export interface RowActionMenuProps {
  primaryActions: ActionButtonItem[];
  menuEntries: RowMenuEntry[];
  menuAriaLabel?: string;
  className?: string;
}

/**
 * Primary icon actions + overflow menu — keeps rows uncluttered.
 * Use for fleet tables where only View / Edit / Delete stay visible.
 */
export function RowActionMenu({
  primaryActions,
  menuEntries,
  menuAriaLabel = 'More row actions',
  className,
}: RowActionMenuProps) {
  return (
    <div className={cn('flex min-w-0 items-center justify-end gap-0.5', className)}>
      <ActionButtonGroup items={primaryActions} dense />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              'flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border border-slate-200/90 bg-white',
              'text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30',
            )}
            aria-label={menuAriaLabel}
          >
            <MoreHorizontal className="h-3.5 w-3.5" aria-hidden />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          {menuEntries.map(entry =>
            entry.kind === 'separator' ? (
              <DropdownMenuSeparator key={entry.id} className="my-1" />
            ) : (
              <DropdownMenuItem
                key={entry.id}
                className={cn(
                  'cursor-pointer text-sm',
                  entry.destructive && 'text-rose-600 focus:text-rose-600',
                )}
                onSelect={() => entry.onSelect?.()}
              >
                <entry.icon className={MENU_ICON} />
                {entry.label}
              </DropdownMenuItem>
            ),
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}


