import { Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { DataTable, type DataTableColumn } from './GridTable';

export interface LeaderboardItem {
  rank: number;
  name: string;
  trips: string | number;
  revenue: string;
  avgDuration: string;
  distance: string;
  efficiency: string;
  rating: number;
  onTime: string;
}

interface CompactLeaderboardProps {
  data: LeaderboardItem[];
  title?: string;
  subtitle?: string;
  scoreLabel?: string;
  minWidth?: number;
  className?: string;
  icon?: LucideIcon;
}

/** Driver column is text-only (no avatars); numeric columns share equal space */
const LEADERBOARD_TABLE_LAYOUT =
  'minmax(52px, 0.75fr) minmax(100px, 1.35fr) repeat(5, minmax(0, 1fr))';

export function CompactLeaderboard({
  data,
  title = 'Top Drivers',
  subtitle = 'OCT_2026',
  scoreLabel = 'score',
  minWidth = 760,
  className,
  icon: Icon = Trophy,
}: CompactLeaderboardProps) {
  const columns: DataTableColumn<LeaderboardItem>[] = [
    {
      key: 'rank',
      header: 'Rank',
      align: 'center',
      render: (d) => (
        <span
          className={`inline-flex h-5 w-5 items-center justify-center rounded-[4px] text-xs font-medium shadow-sm
          ${
            d.rank === 1
              ? 'bg-amber-100 text-amber-700 ring-1 ring-amber-200'
              : d.rank === 2
                ? 'bg-slate-200 text-slate-700 ring-1 ring-slate-300'
                : d.rank === 3
                  ? 'bg-orange-100 text-orange-700 ring-1 ring-orange-200'
                  : 'bg-slate-50 text-slate-400 ring-1 ring-slate-100 shadow-none'
          }`}
        >
          {d.rank}
        </span>
      ),
    },
    {
      key: 'driver',
      header: 'Driver',
      align: 'center',
      render: (d) => (
        <span className={cn(typography.tableCell, 'text-slate-700 truncate tracking-tight block w-full')}>
          {d.name}
        </span>
      ),
    },
    {
      key: 'trips',
      header: 'Trips',
      align: 'center',
      render: (d) => (
        <span className={cn(typography.tableCell, 'text-slate-600 tabular-nums')}>
          {d.trips}
        </span>
      ),
    },
    {
      key: 'revenue',
      header: 'Revenue',
      align: 'center',
      render: (d) => (
        <span className={cn(typography.tableCell, 'text-emerald-600 tabular-nums')}>
          {d.revenue}
        </span>
      ),
    },
    {
      key: 'efficiency',
      header: 'Efficiency',
      align: 'center',
      render: (d) => (
        <div className="flex flex-col items-center leading-[1.1]">
          <span className={cn(typography.tableCell, 'text-blue-600 tabular-nums')}>
            {d.efficiency}
          </span>
          <span className="text-2xs font-normal text-slate-400 uppercase tracking-[0.08rem]">
            {scoreLabel}
          </span>
        </div>
      ),
    },
    {
      key: 'rating',
      header: 'Rating',
      align: 'center',
      render: (d) => (
        <div className="flex items-center justify-center gap-1">
          <span className={cn(typography.tableCell, 'text-amber-600 tabular-nums')}>
            {d.rating}
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_4px_rgba(251,191,36,0.5)]" />
        </div>
      ),
    },
    {
      key: 'onTime',
      header: 'On-Time',
      align: 'center',
      render: (d) => (
        <span className={cn(typography.tableCell, 'text-emerald-600 tabular-nums')}>
          {d.onTime}
        </span>
      ),
    },
  ];

  return (
    <div
      className={cn(
        'flex h-[400px] flex-col overflow-hidden rounded-lg border border-slate-200/60 bg-white shadow-sm',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2 bg-slate-50/10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-amber-50 flex items-center justify-center border border-amber-100/50">
            <Icon className="h-3.5 w-3.5 text-amber-500" />
          </div>
          <h3 className={typography.cardTitle}>
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2.5">
          <span className={cn(typography.meta, 'text-slate-400 uppercase tracking-[0.08rem]')}>
            {subtitle}
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        </div>
      </div>
      <DataTable
        data={data}
        columns={columns}
        gridCols={LEADERBOARD_TABLE_LAYOUT}
        gap="gap-0"
        minWidth={minWidth}
        rowHeight="min-h-[32px]"
        headerHeight="min-h-0"
        px="px-3"
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200"
      />
    </div>
  );
}


