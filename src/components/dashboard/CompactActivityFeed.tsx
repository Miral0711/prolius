import { DashboardCard } from './DashboardCard';

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
      {/* Fixed Header */}
      <div className="flex items-center justify-between border-b border-slate-100/50 px-4 py-3 bg-slate-50/40 shrink-0">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <h3 className="text-[11px] font-semibold text-slate-700 uppercase tracking-widest">
            {title}
          </h3>
        </div>
        <span className="text-[9px] font-medium text-slate-400 uppercase tracking-tighter">
          {subtitle}
        </span>
      </div>

      {/* Scrollable Activity List */}
      <div className="flex-1 overflow-y-auto min-h-0 relative scrollbar-thin scrollbar-thumb-slate-200">
        {/* Continuous Timeline Line */}
        <div className="absolute left-[20px] top-0 bottom-0 w-px bg-slate-50 z-0" />

        <div className="flex flex-col px-4 py-3 gap-3">
          {data.map((item, i) => (
            <div key={i} className="relative z-10 flex gap-3.5 items-start">
              {/* Status Dot */}
              <div
                className={`mt-1 h-2 w-2 shrink-0 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-100 ${item.dot}`}
              />

              {/* Content area */}
              <div className="min-w-0 flex-1 flex flex-col gap-1">
                <div className="flex justify-between items-start gap-2">
                  <p className="text-[10px] font-semibold leading-none text-slate-800 uppercase tracking-tight">
                    {item.event}
                  </p>
                  <span className="shrink-0 text-[7.5px] font-extrabold text-slate-400 uppercase tracking-tighter">
                    {item.time}
                  </span>
                </div>
                <p className="text-[9px] leading-[1.3] text-slate-500 font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}
