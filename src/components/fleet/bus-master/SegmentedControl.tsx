import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SegmentedOption {
  id: string;
  label: string;
}

export interface SegmentedControlProps {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  /** When false (default), segments are display-only like the original bar */
  interactive?: boolean;
  className?: string;
}

export function SegmentedControl({
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  interactive = false,
  className,
}: SegmentedControlProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue ?? options[0]?.id ?? '');
  const value = controlledValue ?? uncontrolled;

  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex items-center gap-0.5 rounded-lg border border-slate-200/60 bg-white/40 p-0.5',
        className,
      )}
    >
      {options.map(opt => {
        const selected = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={interactive ? 0 : -1}
            className={cn(
              'rounded-md px-2.5 py-1 text-2xs font-medium uppercase tracking-[0.02rem] transition-colors',
              selected
                ? 'border border-emerald-100 bg-white text-emerald-600 shadow-sm'
                : 'border border-transparent text-slate-500',
              interactive && !selected && 'hover:bg-white/60',
            )}
            onClick={() => {
              if (!interactive) return;
              if (controlledValue === undefined) setUncontrolled(opt.id);
              onValueChange?.(opt.id);
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}


