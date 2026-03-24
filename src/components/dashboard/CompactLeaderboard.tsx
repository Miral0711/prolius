import { Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
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

const LEADERBOARD_TABLE_LAYOUT = 'repeat(7, minmax(0, 1fr))';

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
      header: '#',
      align: 'center',
      render: (d) => (
        <span
          className={`inline-flex h-5 w-5 items-center justify-center rounded-[4px] text-[10px] font-semibold shadow-sm
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
        <div className="flex items-center justify-center gap-2 min-w-0 max-w-full">
          <div className="h-6 w-6 rounded-md bg-slate-100 flex items-center justify-center border border-white shadow-sm shrink-0">
            <span className="text-[9px] font-semibold text-slate-600">
              {d.name[0]}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-slate-700 truncate tracking-tight">
            {d.name}
          </span>
        </div>
      ),
    },
    {
      key: 'trips',
      header: 'Trips',
      align: 'center',
      render: (d) => (
        <span className="text-[10px] font-medium text-slate-600 tabular-nums">
          {d.trips}
        </span>
      ),
    },
    {
      key: 'revenue',
      header: 'Revenue',
      align: 'center',
      render: (d) => (
        <span className="text-[11px] font-semibold text-emerald-600 tabular-nums">
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
          <span className="text-[10px] font-semibold text-blue-600 tabular-nums">
            {d.efficiency}
          </span>
          <span className="text-[7.5px] font-medium text-slate-400 uppercase tracking-widest">
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
          <span className="text-[10px] font-semibold text-amber-600 tabular-nums">
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
        <span className="text-[10px] font-semibold text-emerald-600 tabular-nums">
          {d.onTime}
        </span>
      ),
    },
  ];

  return (
    <div
      className={cn(
        'flex h-[400px] flex-col overflow-hidden rounded-md border border-slate-200/60 bg-white shadow-sm',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-2 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="h-6 w-6 rounded-md bg-amber-50 flex items-center justify-center border border-amber-100/50">
            <Icon className="h-3.5 w-3.5 text-amber-500" />
          </div>
          <h3 className="text-[11px] font-semibold text-slate-800 uppercase tracking-[0.1em]">
            {title}
          </h3>
        </div>
        <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest leading-none text-right">
          {subtitle}
        </span>
      </div>
      <DataTable
        data={data}
        columns={columns}
        gridCols={LEADERBOARD_TABLE_LAYOUT}
        gap="gap-0"
        minWidth={minWidth}
        rowHeight="min-h-[44px]"
        headerHeight="min-h-[38px]"
        px="px-4"
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200"
      />
    </div>
  );
}
