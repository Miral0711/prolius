import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DashboardCard } from './DashboardCard';
import { typography } from '@/lib/typography';

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  time: string;
  icon?: LucideIcon;
}

export interface ActivityFeedProps {
  items: ActivityItem[];
  title?: string;
  className?: string;
}

export function ActivityFeed({
  items,
  title = 'Recent Activity',
  className,
}: ActivityFeedProps) {
  return (
    <DashboardCard className={cn('', className)}>
      {title && (
        <h3 className={cn(typography.cardTitle, 'mb-1.5')}>{title}</h3>
      )}
      <div className="space-y-0">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-start gap-2 py-1.5">
              {Icon && (
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-slate-100 text-slate-600">
                  <Icon className="h-3 w-3" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className={cn(typography.body, 'text-slate-800')}>
                  <span className="font-normal">{item.actor}</span>
                  {' — '}
                  {item.action}
                </p>
                <p className={cn(typography.meta, 'text-[11px] text-slate-500')}>{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
}


