import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { DashboardCard } from './DashboardCard';
import { CardHeader } from './CardHeader';
import { SimpleTable, type SimpleTableColumn } from './SimpleTable';
import { TOP_DRIVERS } from '@/pages/dashboard/mockData';
import type { LeaderboardItem } from './CompactLeaderboard';

/** Rank badge colors by position */
function RankBadge({ rank }: { rank: number }) {
  const cls =
    rank === 1 ? 'bg-amber-100 text-amber-700'
    : rank === 2 ? 'bg-slate-200 text-slate-700'
    : rank === 3 ? 'bg-orange-100 text-orange-700'
    : 'bg-slate-100 text-slate-500';
  return (
    <span className={cn('inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium', cls)}>
      {rank}
    </span>
  );
}

const COLUMNS: SimpleTableColumn<LeaderboardItem>[] = [
  { key: 'rank', header: '#', render: (d) => <RankBadge rank={d.rank} /> },
  { key: 'name', header: 'Driver', cellClassName: 'text-slate-800', render: (d) => d.name },
  { key: 'trips', header: 'Trips', align: 'right', cellClassName: 'text-slate-700', render: (d) => d.trips },
  { key: 'revenue', header: 'Revenue', align: 'right', cellClassName: 'text-emerald-600', render: (d) => d.revenue },
  { key: 'avgDuration', header: 'Avg Duration', align: 'right', cellClassName: 'text-slate-500', render: (d) => d.avgDuration },
  { key: 'distance', header: 'Distance', align: 'right', cellClassName: 'text-slate-500', render: (d) => d.distance },
];

export function TopDriversCard() {
  return (
    <DashboardCard className="!p-0 !rounded-lg overflow-hidden">
      <CardHeader
        title="Top Drivers"
        icon={Trophy}
        iconWrapperClassName="bg-amber-50 border-amber-100/50"
        iconClassName="text-amber-500"
        trailing={<span className={cn(typography.meta, 'text-slate-400')}>This month</span>}
        className="px-4 py-3 border-b border-slate-100"
      />
      <SimpleTable
        data={TOP_DRIVERS}
        columns={COLUMNS}
        rowKey={(d) => d.rank}
        striped
        minWidth={480}
      />
    </DashboardCard>
  );
}
