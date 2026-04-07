import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'plate' | 'neutral';
}

export function Tag({ className, variant = 'plate', children, ...props }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center truncate rounded border px-1.5 py-0.5 font-mono text-xs font-medium tabular-nums leading-none',
        variant === 'plate' &&
          'border-[#dcedf8]/80 bg-[#e8f0f8]/80 text-[#2e5f8a]',
        variant === 'neutral' && 'border-slate-200/80 bg-slate-50/90 text-slate-800',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}


