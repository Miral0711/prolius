import { AlertTriangle, Route } from 'lucide-react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { DataCard } from '@/components/ui/data-card';

export function RecentActivity({ sectionLead }: { sectionLead?: boolean }) {
  return (
    <DataCard title="Recent Activity" sectionLead={sectionLead}>
      <div className="divide-y divide-slate-200/30 pt-0">
        <div className="flex min-h-[32px] items-center justify-between gap-2 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/70"
              aria-hidden
            />
            <h2 className={cn(typography.cardTitle, 'leading-tight')}>
              Critical Alerts (Last 2 Hours)
            </h2>
          </div>
          <div className="flex flex-1 min-w-0 items-center justify-between rounded-lg border border-white/35 bg-white/50 px-2 py-1.5">
            <span className="text-sm text-slate-700 leading-tight">
              No critical alerts
            </span>
          </div>
        </div>
        <div className="flex min-h-[32px] items-center justify-between gap-2 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400/70"
              aria-hidden
            />
            <h2 className={cn(typography.cardTitle, 'leading-tight')}>
              Recent Trips
            </h2>
          </div>
          <div className="flex flex-1 min-w-0 items-center justify-between rounded-lg border border-white/35 bg-white/50 px-2 py-1.5">
            <span className="text-sm text-slate-700 leading-tight">
              No recent trips
            </span>
          </div>
        </div>
      </div>
    </DataCard>
  );
}


