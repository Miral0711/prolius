import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { AnalyticsCard } from './AnalyticsCard';

export interface DataTableCardProps {
  title: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function DataTableCard({
  title,
  children,
  action,
  className,
}: DataTableCardProps) {
  return (
    <AnalyticsCard title={title} action={action} className={className}>
      <div className="overflow-x-auto">{children}</div>
    </AnalyticsCard>
  );
}
