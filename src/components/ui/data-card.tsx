'use client';

import * as React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/glass-card';
import { typography } from '@/lib/typography';

/**
 * Card with optional header matching Overview Dashboard card blocks.
 * Compact: header mb-1, h-6, text-sm.
 */
const cardHeaderRowClass = 'mb-1 flex h-6 items-center justify-between';
const cardTitleClass = typography.cardTitle;
const cardHeaderIconClass = 'h-3.5 w-3.5 shrink-0 text-slate-400';

/** List container for data rows — dashboard divide-y style */
export const dataCardListClass = cn('divide-y divide-white/30', typography.body);

/** Single row: primary + secondary */
export const dataCardRowClass =
  'flex items-center justify-between gap-2 py-2 first:pt-0';
export const dataCardRowPrimaryClass = 'min-w-0 truncate text-slate-700';
export const dataCardRowSecondaryClass = cn('shrink-0 text-slate-400', typography.meta);
export const dataCardRowSecondaryBoldClass =
  cn('shrink-0 text-slate-500', typography.label);

export interface DataCardProps {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /** Stronger glass for first card in a section (Manager Cockpit) */
  sectionLead?: boolean;
}

const sectionLeadGlass =
  'bg-white/30 backdrop-blur-xl border-white/30 shadow-[0_10px_30px_rgba(15,23,42,0.10)]';

export function DataCard({
  title,
  right,
  children,
  className,
  sectionLead,
}: DataCardProps) {
  return (
    <GlassCard
      size="sm"
      className={cn(sectionLead && sectionLeadGlass, className)}
    >
      <div className={cardHeaderRowClass}>
        <h3 className={cardTitleClass}>{title}</h3>
        {right !== undefined ? (
          right
        ) : (
          <MoreHorizontal className={cardHeaderIconClass} />
        )}
      </div>
      {children}
    </GlassCard>
  );
}


