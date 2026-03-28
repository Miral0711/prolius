import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RowExpandToggleProps {
  expanded: boolean;
  onToggle: () => void;
  ariaLabel?: string;
  className?: string;
}

export function RowExpandToggle({
  expanded,
  onToggle,
  ariaLabel = 'Show row details',
  className,
}: RowExpandToggleProps) {
  return (
    <button
      type="button"
      onClick={e => {
        e.stopPropagation();
        onToggle();
      }}
      className={cn(
        'flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-transparent text-slate-500',
        'transition-colors hover:border-slate-200 hover:bg-slate-50 hover:text-slate-800',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/25',
        className,
      )}
      aria-expanded={expanded}
      aria-label={ariaLabel}
    >
      <ChevronRight
        className={cn('h-4 w-4 transition-transform duration-200', expanded && 'rotate-90')}
        aria-hidden
      />
    </button>
  );
}


