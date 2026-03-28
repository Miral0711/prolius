import { CalendarDays, ChevronRight, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { DashboardCard } from './DashboardCard';

const MOCK_ALERTS = [
  { id: 'TR-789', text: 'Scheduled Due in 2 days', icon: CalendarDays },
  { id: 'TR-790', text: 'Oil Change Overdue by 3 days', icon: Wrench },
];

export function MaintenanceAlertsPanel() {
  return (
    <DashboardCard className="flex min-h-0 flex-col overflow-hidden">
      <h3 className={cn(typography.cardTitle, 'mb-1 shrink-0')}>
        Maintenance Alerts
      </h3>
      <div className="min-h-0 flex-1 space-y-0 overflow-hidden [&>div+div]:border-t [&>div+div]:border-slate-100">
        {MOCK_ALERTS.map((alert) => {
          const Icon = alert.icon;
          return (
            <div
              key={alert.id}
              className="flex items-center gap-2 py-1 first:pt-0"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-amber-100 text-amber-600">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-slate-700">{alert.text}</p>
              </div>
              <ChevronRight className="h-3 w-3 shrink-0 text-slate-400" />
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
}


