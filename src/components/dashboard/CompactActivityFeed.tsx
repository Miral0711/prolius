import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { DashboardCard } from './DashboardCard';
import { CardHeader } from './CardHeader';

export interface ActivityFeedItem {
  event: string;
  desc: string;
  time: string;
  dot: string;
}

interface CompactActivityFeedProps {
  data: ActivityFeedItem[];
  title?: string;
  subtitle?: string;
}

export function CompactActivityFeed({
  data,
  title = 'Live Activity',
  subtitle = 'Auto-sync',
}: CompactActivityFeedProps) {
  return (
    <DashboardCard className="!p-0 flex flex-col border-slate-200/60 shadow-sm overflow-hidden h-[400px] bg-white">
      <CardHeader
        title={title}
        live
        trailing={
          <span className={cn(typography.meta, 'text-slate-400 uppercase tracking-tighter')}>{subtitle}</span>
        }
        className="px-4 py-3"
      />

      <div className="flex-1 overflow-y-auto min-h-0 relative scrollbar-thin scrollbar-thumb-slate-200">
        {/* Continuous timeline line */}
        <div className="absolute left-[20px] top-0 bottom-0 w-px bg-slate-50 z-0" />
        <div className="flex flex-col px-4 py-3 gap-3">
          {data.map((item, i) => (
            <div key={i} className="relative z-10 flex gap-3.5 items-start">
              <div className={cn('mt-1 h-2 w-2 shrink-0 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-100', item.dot)} />
              <div className="min-w-0 flex-1 flex flex-col gap-1">
                <div className="flex justify-between items-start gap-2">
                  <p className={cn(typography.body, 'leading-none text-slate-800 uppercase tracking-tight')}>
                    {item.event}
                  </p>
                  <span className="shrink-0 text-slate-400 uppercase tracking-[0.02rem] text-[10px] leading-none font-normal">
                    {item.time}
                  </span>
                </div>
                <p className={cn(typography.body, 'leading-[1.3] text-slate-500')}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}
