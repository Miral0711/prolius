import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { AnalyticsCard } from './AnalyticsCard';

export interface ChartCardProps {
  title: string;
  children: ReactNode;
  summary?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function ChartCard({
  title,
  children,
  summary,
  action,
  className,
}: ChartCardProps) {
  return (
    <AnalyticsCard title={title} action={action} className={className}>
      <div className="min-h-0">{children}</div>
      {summary && (
        <div className="mt-3 border-t border-slate-100 pt-3">{summary}</div>
      )}
    </AnalyticsCard>
  );
}


