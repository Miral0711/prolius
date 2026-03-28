'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Badge variants matching Overview Dashboard tone pattern (Safety Pulse / status chips).
 * Classes aligned with dashboard: rounded-xl border px-2.5 py-1.5 and text/bg/border tones.
 */
const variantClasses = {
  success: 'text-emerald-600 bg-emerald-50/80 border-emerald-200/60',
  danger: 'text-red-600 bg-red-50/80 border-red-200/60',
  warning: 'text-amber-600 bg-amber-50/80 border-amber-200/60',
  info: 'text-blue-600 bg-blue-50/80 border-blue-200/60',
  neutral: 'text-slate-600 bg-slate-50/80 border-slate-200/60',
} as const;

export type BadgeVariant = keyof typeof variantClasses;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** If true, use pill shape (rounded-full) like table chips; default rounded-xl like dashboard tiles */
  pill?: boolean;
}

export function Badge({
  variant = 'neutral',
  pill = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center border px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        pill && 'rounded-full px-3 py-0.5',
        !pill && 'rounded-sm',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}


