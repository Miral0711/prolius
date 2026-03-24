'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Grid layouts matching Overview Dashboard. Same gap/col classes.
 */
const gridPresets = {
  /** Block 2 style: 2 cols on xl, compact gap */
  default: 'grid grid-cols-1 gap-3 xl:grid-cols-2',
  /** Block 3 style: 3 cols, one card can span 2 */
  three: 'grid grid-cols-1 gap-3 xl:grid-cols-3',
  /** KPI stat tiles: 5 cols on xl */
  kpi: 'grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5',
  /** Two columns (e.g. Financial + Action), compact gap */
  two: 'grid grid-cols-1 gap-3 lg:grid-cols-2 items-stretch',
} as const;

export type CardGridPreset = keyof typeof gridPresets;

export interface CardGridProps {
  preset?: CardGridPreset;
  children: React.ReactNode;
  className?: string;
}

export function CardGrid({
  preset = 'default',
  children,
  className,
}: CardGridProps) {
  return <div className={cn(gridPresets[preset], className)}>{children}</div>;
}
