import { Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  dashboardTableHeaderCellClass,
  dashboardTableHeaderLiftShadow,
  dashboardTableHeaderSurfaceClass,
} from './GridTable';
import { StatusBadge, type StatusVariant } from './StatusBadge';

export interface TripItem {
  id: string;
  vehicle: string;
  driver: string;
  route: string;
  revenue: string;
  status: string;
  duration: string;
  fuel: string;
  distance: string;
}

interface CompactTripsTableProps {
  data: TripItem[];
  title?: string;
  subtitle?: string;
}

const STATUS_MAPPING: Record<string, StatusVariant> = {
  Completed: 'available',
  'In Progress': 'on-trip',
  Scheduled: 'offline',
};

const COL_WIDTHS = Array(7).fill(`${100 / 7}%`);

/** Matches DataTable header: tint + border on cells; lift shadow once on `<thead>`. */
const TH_BASE = cn(
  dashboardTableHeaderCellClass,
  dashboardTableHeaderSurfaceClass,
  'px-3 py-3',
);
const TD_BASE = 'px-3 py-0 align-middle h-[42px]';

export function CompactTripsTable({
  data,
  title = 'Recent Trips',
  subtitle,
}: CompactTripsTableProps) {
  const displaySubtitle = subtitle || `${data.length} ACTIVE_RUNS`;

  return (
    <div className="flex flex-col h-full rounded-md border border-slate-200/60 bg-white shadow-sm overflow-hidden min-w-0">
      {/* Card header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2 bg-slate-50/10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-blue-50 flex items-center justify-center border border-blue-100/50">
            <Truck className="h-3.5 w-3.5 text-blue-600" />
          </div>
          <h3 className="text-[11px] font-semibold text-slate-800 uppercase tracking-[0.1em]">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">
            {displaySubtitle}
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        </div>
      </div>

      {/* Table — table-fixed + colgroup = deterministic column widths */}
      <div className="overflow-hidden flex-1">
        <table className="w-full table-fixed border-collapse">
          <colgroup>
            {COL_WIDTHS.map((w, i) => (
              <col key={i} style={{ width: w }} />
            ))}
          </colgroup>
          <thead
            className={cn('sticky top-0 z-20', dashboardTableHeaderLiftShadow)}
          >
            <tr>
              <th className={cn(TH_BASE, 'text-center')}>Trip ID</th>
              <th className={cn(TH_BASE, 'text-center')}>Driver</th>
              <th className={cn(TH_BASE, 'text-center')}>Route</th>
              <th className={cn(TH_BASE, 'text-center')}>Duration / Dist.</th>
              <th className={cn(TH_BASE, 'text-center')}>Revenue</th>
              <th className={cn(TH_BASE, 'text-center')}>Fuel</th>
              <th className={cn(TH_BASE, 'text-center')}>Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/70">
            {data.map((trip, idx) => (
              <tr
                key={trip.id}
                className={cn(
                  'transition-colors duration-150 group hover:bg-blue-50/30',
                  idx % 2 === 1 ? 'bg-slate-50/20' : 'bg-transparent',
                )}
              >
                {/* Trip ID */}
                <td className={cn(TD_BASE, 'text-center')}>
                  <div className="flex flex-col items-center leading-tight overflow-hidden">
                    <span className="text-[11px] font-semibold text-slate-800 tabular-nums truncate">
                      {trip.id}
                    </span>
                    <span className="text-[8.5px] font-medium text-slate-400 tracking-tighter tabular-nums truncate">
                      {trip.vehicle}
                    </span>
                  </div>
                </td>

                {/* Driver */}
                <td className={cn(TD_BASE, 'text-center')}>
                  <span className="text-[10px] font-semibold text-slate-700 truncate block">
                    {trip.driver}
                  </span>
                </td>

                {/* Route */}
                <td className={cn(TD_BASE, 'text-center')}>
                  <span className="text-[10px] font-medium text-slate-700 truncate block">
                    {trip.route}
                  </span>
                </td>

                {/* Duration / Distance */}
                <td className={cn(TD_BASE, 'text-center')}>
                  <div className="flex items-baseline justify-center gap-1 overflow-hidden">
                    <span className="text-[10px] font-medium text-slate-700 shrink-0">
                      {trip.duration}
                    </span>
                    <span className="text-[9px] text-slate-300 font-semibold shrink-0">
                      ·
                    </span>
                    <span className="text-[9px] font-semibold text-slate-500 truncate">
                      {trip.distance}
                    </span>
                  </div>
                </td>

                {/* Revenue */}
                <td className={cn(TD_BASE, 'text-center')}>
                  <span className="text-[11px] font-semibold text-emerald-600 tabular-nums">
                    {trip.revenue}
                  </span>
                </td>

                {/* Fuel Usage */}
                <td className={cn(TD_BASE, 'text-center')}>
                  <span className="text-[10px] font-medium text-slate-600 tabular-nums">
                    {trip.fuel}
                  </span>
                </td>

                {/* Status */}
                <td className={cn(TD_BASE, 'text-center')}>
                  <div className="flex justify-center">
                    <StatusBadge
                      label={trip.status}
                      variant={STATUS_MAPPING[trip.status] ?? 'neutral'}
                      className="uppercase text-[8px] tracking-tight font-semibold px-2 py-0.5 shadow-sm border-white/40"
                    />
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="py-10 text-center text-slate-400 text-xs font-medium italic"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
