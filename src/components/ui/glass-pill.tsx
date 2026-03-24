'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/** Glassmorphism pill/badge: elegant rounded-full, soft shadow, subtle pastel variants */
const glassPillBase =
  'inline-flex items-center gap-1.5 rounded-full border border-white/[0.35] ' +
  'bg-white/50 backdrop-blur-md ' +
  'shadow-[0_2px_10px_rgba(0,0,0,0.05)] ' +
  'px-3 py-1.5 text-sm transition-colors';

export interface GlassPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Accent: subtle pastel, not saturated */
  variant?: 'default' | 'success' | 'warning' | 'critical' | 'info';
}

const variantClass = {
  default: 'text-gray-600',
  success: 'bg-emerald-50/90 text-emerald-700/90 border-emerald-200/40',
  warning: 'bg-amber-50/90 text-amber-700/90 border-amber-200/40',
  critical: 'bg-red-50/90 text-red-700/90 border-red-200/40',
  info: 'bg-indigo-50/90 text-indigo-700/90 border-indigo-200/40',
} as const;

function GlassPill({
  className,
  variant = 'default',
  children,
  ...props
}: GlassPillProps) {
  return (
    <span
      className={cn(glassPillBase, variantClass[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}

const GlassBadge = GlassPill;

export { GlassPill, GlassBadge, glassPillBase };
