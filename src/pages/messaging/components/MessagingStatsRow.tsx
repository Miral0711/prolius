import { MessagingStatCard } from './MessagingStatCard';
import { STATS_MOCK } from '../mock-data';

export function MessagingStatsRow() {
  const stats = [
    { label: 'Today',      value: STATS_MOCK.today },
    { label: 'Yesterday',  value: STATS_MOCK.yesterday },
    { label: 'This Month', value: STATS_MOCK.thisMonth },
    { label: 'Last Month', value: STATS_MOCK.lastMonth },
    { label: 'This Year',  value: STATS_MOCK.thisYear },
    { label: 'All Time',   value: STATS_MOCK.allTime },
  ];

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-bold uppercase tracking-[0.02rem] text-slate-800">Statistics</h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <MessagingStatCard key={s.label} label={s.label} value={s.value} />
        ))}
      </div>
    </div>
  );
}
