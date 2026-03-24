'use client';

import * as React from 'react';
import { Dot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/glass-card';

/** Single elevation for all KPI/tile cards in a row — no conditional shadow. */
export const CARD_SHADOW_TILE =
  'shadow-[0_2px_8px_rgba(31,38,135,0.04),0_1px_4px_rgba(0,0,0,0.03)]';

/** Shared tile style for Manager Cockpit top section: compact border, radius, padding, same shadow for all. */
export const TOP_TILE_CLASS =
  'rounded-lg border border-white/50 bg-white/50 px-3 py-2 min-h-[52px] ' +
  CARD_SHADOW_TILE;

/** Standard padding and min-height for all KPI/tile cards in a row. */
export const TILE_PADDING = 'px-3 py-2';
export const TILE_MIN_HEIGHT = 'min-h-[52px]';

/**
 * KPI tint map from Overview Dashboard MetricCard — do not change.
 * iconCircle: soft tint for top-section icon accents only (Manager Cockpit); uses /70 for glass consistency.
 */
export const KPI_TINT: Record<
  string,
  { border: string; glow: string; badge: string; iconCircle: string }
> = {
  blue: {
    border: 'border-l-blue-400/70',
    glow: 'bg-blue-400/20',
    badge: 'bg-blue-500/15 text-blue-600 border-blue-200/60',
    iconCircle: 'bg-slate-100/70 text-slate-600',
  },
  violet: {
    border: 'border-l-violet-400/70',
    glow: 'bg-violet-400/20',
    badge: 'bg-violet-500/15 text-violet-600 border-violet-200/60',
    iconCircle: 'bg-indigo-100/70 text-indigo-600',
  },
  emerald: {
    border: 'border-l-emerald-400/70',
    glow: 'bg-emerald-400/20',
    badge: 'bg-emerald-500/15 text-emerald-600 border-emerald-200/60',
    iconCircle: 'bg-emerald-100/70 text-emerald-600',
  },
  slate: {
    border: 'border-l-slate-400/60',
    glow: 'bg-slate-400/15',
    badge: 'bg-slate-500/15 text-slate-600 border-slate-200/60',
    iconCircle: 'bg-slate-100/70 text-slate-600',
  },
  amber: {
    border: 'border-l-amber-400/70',
    glow: 'bg-amber-400/20',
    badge: 'bg-amber-500/15 text-amber-600 border-amber-200/60',
    iconCircle: 'bg-amber-100/70 text-amber-600',
  },
  cyan: {
    border: 'border-l-cyan-400/70',
    glow: 'bg-cyan-400/20',
    badge: 'bg-cyan-500/15 text-cyan-600 border-cyan-200/60',
    iconCircle: 'bg-slate-100/70 text-slate-600',
  },
  green: {
    border: 'border-l-green-400/70',
    glow: 'bg-green-400/20',
    badge: 'bg-green-500/15 text-green-600 border-green-200/60',
    iconCircle: 'bg-emerald-100/70 text-emerald-600',
  },
  indigo: {
    border: 'border-l-indigo-400/70',
    glow: 'bg-indigo-400/20',
    badge: 'bg-indigo-500/15 text-indigo-600 border-indigo-200/60',
    iconCircle: 'bg-indigo-100/70 text-indigo-600',
  },
  purple: {
    border: 'border-l-purple-400/70',
    glow: 'bg-purple-400/20',
    badge: 'bg-purple-500/15 text-purple-600 border-purple-200/60',
    iconCircle: 'bg-indigo-100/70 text-indigo-600',
  },
  sky: {
    border: 'border-l-sky-400/70',
    glow: 'bg-sky-400/20',
    badge: 'bg-sky-500/15 text-sky-600 border-sky-200/60',
    iconCircle: 'bg-slate-100/70 text-slate-600',
  },
  rose: {
    border: 'border-l-rose-400/70',
    glow: 'bg-rose-400/20',
    badge: 'bg-rose-500/15 text-rose-600 border-rose-200/60',
    iconCircle: 'bg-rose-100/70 text-rose-600',
  },
};

export type StatTileTint = keyof typeof KPI_TINT;

export interface StatTileProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  sub: string;
  tint?: StatTileTint;
  className?: string;
  /** Use 'cockpit' for Manager Cockpit top section (icon circle + KPI hierarchy). */
  /** Use 'compact' for denser KPI rows (Bus Live Tracking). */
  variant?: 'default' | 'cockpit' | 'compact';
}

/**
 * KPI metric tile matching Overview Dashboard MetricCard. Same classes.
 * variant="cockpit": icon circle + KPI hierarchy for Manager Cockpit only.
 */
export function StatTile({
  icon: Icon,
  title,
  value,
  sub,
  tint = 'slate',
  className,
  variant = 'default',
}: StatTileProps) {
  const t = KPI_TINT[tint] ?? KPI_TINT.slate;
  const { border, glow, badge, iconCircle } = t;
  const isCockpit = variant === 'cockpit';
  const isCompact = variant === 'compact';

  const tileClass = isCompact
    ? 'px-2.5 py-1.5 min-h-[40px] rounded-lg border flex-row items-center justify-between gap-2'
    : isCockpit
      ? cn(TOP_TILE_CLASS, 'flex flex-col justify-center')
      : cn(TILE_PADDING, TILE_MIN_HEIGHT);

  const iconSizeClass = isCompact
    ? 'h-5 w-5 rounded border'
    : isCockpit
      ? 'h-6 w-6 rounded-full'
      : 'h-5 w-5 rounded border';
  const iconGlyphClass = isCompact
    ? 'h-2.5 w-2.5'
    : isCockpit
      ? 'h-3 w-3'
      : 'h-2.5 w-2.5';
  const labelClass = isCompact ? 'text-[9px]' : 'text-[10px]';
  const valueClass = isCompact
    ? 'text-lg font-semibold leading-none'
    : isCockpit
      ? 'text-lg leading-none'
      : 'text-sm';

  return (
    <GlassCard
      className={cn(
        'relative overflow-hidden border-l-4',
        isCompact ? 'flex' : 'flex flex-col justify-center',
        tileClass,
        border,
        className,
      )}
      noPadding
    >
      <div
        className={cn(
          'absolute -left-4 -top-4 h-8 w-8 rounded-full blur-lg',
          glow,
        )}
        aria-hidden
      />
      {isCompact ? (
        <>
          <div className="relative flex items-center gap-2 min-w-0">
            <div
              className={cn(
                'flex shrink-0 items-center justify-center',
                iconSizeClass,
                badge,
              )}
            >
              <Icon className={iconGlyphClass} />
            </div>
            <p
              className={cn(
                'truncate font-medium uppercase tracking-wide leading-none',
                labelClass,
                'text-slate-500',
              )}
            >
              {title}
            </p>
          </div>
          <p
            className={cn(
              'font-semibold tracking-tight text-slate-800 shrink-0',
              valueClass,
            )}
          >
            {value}
          </p>
        </>
      ) : (
        <>
          <div className="relative flex items-center gap-1.5">
            <div
              className={cn(
                'flex shrink-0 items-center justify-center',
                iconSizeClass,
                isCockpit ? iconCircle : badge,
              )}
            >
              <Icon className={iconGlyphClass} />
            </div>
            <p
              className={cn(
                'truncate font-medium uppercase tracking-wide leading-none',
                labelClass,
                'text-slate-500',
              )}
            >
              {title}
            </p>
          </div>
          <div className="relative mt-0.5">
            <p
              className={cn(
                'font-semibold tracking-tight text-slate-800',
                valueClass,
              )}
            >
              {value}
            </p>
            <p
              className={cn(
                'mt-0.5 flex items-center gap-0.5 leading-none',
                'text-[10px] text-slate-400/90',
              )}
            >
              <Dot className="h-1.5 w-1.5 shrink-0 text-slate-300" />
              {sub}
            </p>
          </div>
        </>
      )}
    </GlassCard>
  );
}
