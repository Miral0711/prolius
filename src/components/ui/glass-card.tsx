'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/** Refined glassmorphism card: frosted glass, soft layered shadow, subtle hover */
const glassCardBase =
  'rounded-md border border-white/50 ' +
  'shadow-[0_2px_8px_rgba(31,38,135,0.04),0_1px_4px_rgba(0,0,0,0.03)] ' +
  'transition-all duration-200 ' +
  'hover:bg-white/65 hover:shadow-[0_4px_12px_rgba(31,38,135,0.06)]';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Opacity of the glass surface (0.45–0.60). Default 0.55 */
  opacity?: 0.45 | 0.5 | 0.55 | 0.6;
  /** Backdrop blur: xl (24px) or 2xl (28px). Default 2xl */
  blur?: 'xl' | '2xl';
  /** No padding when true */
  noPadding?: boolean;
  /** Padding: default 16px (p-4), sm 12px (p-3) for denser layout */
  size?: 'default' | 'sm';
}

const opacityMap = {
  0.45: 'bg-white/[0.45]',
  0.5: 'bg-white/50',
  0.55: 'bg-white/55',
  0.6: 'bg-white/60',
} as const;

const blurMap = {
  xl: 'backdrop-blur-xl',
  '2xl': 'backdrop-blur-2xl',
} as const;

function GlassCard({
  className,
  opacity = 0.55,
  blur = '2xl',
  noPadding,
  size = 'default',
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        glassCardBase,
        opacityMap[opacity],
        blurMap[blur],
        !noPadding && (size === 'sm' ? 'p-3' : 'p-4'),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { GlassCard, glassCardBase };
