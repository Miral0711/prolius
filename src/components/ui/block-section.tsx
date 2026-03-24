'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/** Section header for dashboard blocks: "BLOCK N: TITLE" + thin separator line. Use inside Section with gap-2 so margins are minimal. */
export function BlockSectionHeader({
  children,
  className,
  titleClassName,
}: {
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={cn('mb-1', className)}>
      <h2
        className={cn(
          'text-[10px] font-semibold uppercase tracking-wide text-gray-600 leading-tight',
          titleClassName,
        )}
      >
        {children}
      </h2>
      <div className="mt-1 h-px bg-white/30 rounded-full" aria-hidden />
    </div>
  );
}

/** Section wrapper: consistent gap (8px) between header and content. No double margins. */
export function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('flex flex-col gap-2', className)}>{children}</div>;
}

/** Alias for design-system usage */
export const SectionHeader = BlockSectionHeader;

/** Page container: consistent outer padding (16px = p-4), max-width, single gap scale (16px = gap-4) between sections. */
export function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[1200px] flex flex-col gap-4 min-w-0 overflow-x-hidden 2xl:max-w-[1320px]',
        className,
      )}
    >
      {children}
    </div>
  );
}
