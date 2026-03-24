import React from 'react';
import { cn } from '@/lib/utils';

interface AppCardProps {
  title: string;
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function AppCard({ title, header, children, className }: AppCardProps) {
  return (
    <div className={cn(
      'flex flex-col rounded-md border border-white bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] overflow-hidden',
      className
    )}>
      <div className="flex items-center justify-between border-b border-slate-100/50 px-4 py-3 bg-slate-50/40">
        <h3 className="text-[10px] font-semibold text-slate-700 uppercase tracking-[0.15em]">{title}</h3>
        {header && <div className="flex items-center gap-1.5">{header}</div>}
      </div>
      <div className="p-4 flex-1">
        {children}
      </div>
    </div>
  );
}
