import * as React from 'react';
import { cn } from '@/lib/utils';

const tones = {
  primary:
    'border border-blue-200 bg-blue-50 text-blue-700 shadow-sm hover:border-blue-300 hover:bg-blue-100',
  success:
    'border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm hover:border-emerald-300 hover:bg-emerald-100',
  danger:
    'border border-rose-200 bg-rose-50 text-rose-700 shadow-sm hover:border-rose-300 hover:bg-rose-100',
  warning:
    'border border-amber-200 bg-amber-50 text-amber-700 shadow-sm hover:border-amber-300 hover:bg-amber-100',
} as const;

export type FleetToolbarButtonTone = keyof typeof tones;

export interface FleetToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tone: FleetToolbarButtonTone;
}

/** Solid admin-toolbar actions (Bus Master reference: Add / status filters) */
export function FleetToolbarButton({
  tone,
  className,
  children,
  ...props
}: FleetToolbarButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex h-8 shrink-0 items-center justify-center rounded-md px-3 text-2sm font-semibold transition-colors',
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}


