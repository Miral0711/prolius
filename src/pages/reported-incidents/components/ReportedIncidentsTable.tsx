import { AlertTriangle, Eye, MapPin } from 'lucide-react';
import {
  DataTable,
  DataTableBodyScroll,
  DataTableTable,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@/components/fleet/bus-master/DataTable';
import { cn } from '@/lib/utils';
import type { ReportedIncidentRow } from '../mock-data';
import type { FrequentVehicleInfo, HotspotInfo, IncidentTrend } from '@/lib/incidentUtils';
import { IncidentStatusBadge } from './IncidentStatusBadge';
import { IncidentTrendBadge } from './IncidentTrendBadge';
import { TableEmptyState } from './TableEmptyState';
import { TableToolbar, TablePagination } from '@/components/shared';

// Date | Reg | IncidentID | IncidentDate | Type | AllocatedTo | Status | CreatedBy | Details
const COL_WIDTHS = [118, 130, 105, 108, 145, 120, 115, 135, 64];

interface ReportedIncidentsTableProps {
  rows: ReportedIncidentRow[];
  totalCount: number;
  page: number;
  pageSize: number;
  showArchived: boolean;
  onShowArchivedChange: (v: boolean) => void;
  onPageChange: (p: number) => void;
  onPageSizeChange: (s: number) => void;
  onResetColumns?: () => void;
  onViewDetail?: (row: ReportedIncidentRow) => void;
  /** Map of registration → frequent vehicle info, built from the full dataset */
  frequentVehicles?: Map<string, FrequentVehicleInfo>;
  /** Trend data for the toolbar badge */
  trend?: IncidentTrend;
  /** Map of "region · division" → hotspot info */
  hotspots?: Map<string, HotspotInfo>;
  className?: string;
}

export function ReportedIncidentsTable({
  rows,
  totalCount,
  page,
  pageSize,
  showArchived,
  onShowArchivedChange,
  onPageChange,
  onPageSizeChange,
  onResetColumns,
  onViewDetail,
  frequentVehicles,
  trend,
  hotspots,
  className,
}: ReportedIncidentsTableProps) {
  return (
    <DataTable className={cn('min-h-0', className)}>
      <TableToolbar
        title="Incidents List"
        subtitle="(All Regions)"
        showArchived={showArchived}
        onShowArchivedChange={onShowArchivedChange}
        showArchivedLabel="Show archived"
        onResetColumns={onResetColumns}
        leftExtra={trend && <IncidentTrendBadge trend={trend} />}
      />

      {/* Scrollable body */}
      <DataTableBodyScroll>
        <DataTableTable className="min-w-[1140px]">
          <colgroup>
            {COL_WIDTHS.map((w, i) => <col key={i} style={{ width: `${w}px` }} />)}
          </colgroup>
          <TableHeader>
            <tr>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Registration</TableHeaderCell>
              <TableHeaderCell>Incident ID</TableHeaderCell>
              <TableHeaderCell>Incident Date</TableHeaderCell>
              <TableHeaderCell>Incident Type</TableHeaderCell>
              <TableHeaderCell>Allocated To</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Created By</TableHeaderCell>
              <TableHeaderCell align="center">Details</TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody className="bg-white">
            {rows.length === 0 ? (
              <TableEmptyState colSpan={9} />
            ) : (
              rows.map((row) => {
                const freq = frequentVehicles?.get(row.registration);
                const isFrequent = freq?.isFrequent ?? false;

                const locationKey = `${row.region} · ${row.division}`;
                const hotspot = hotspots?.get(locationKey);
                const isHotspot = hotspot?.isHotspot ?? false;

                return (
                  <TableRow
                    key={row.id}
                    className={cn(
                      row.archived && 'opacity-60',
                      isFrequent && !isHotspot && 'bg-amber-50/60 hover:bg-amber-50',
                      isHotspot && !isFrequent && 'bg-rose-50/40 hover:bg-rose-50/70',
                      isFrequent && isHotspot && 'bg-orange-50/60 hover:bg-orange-50',
                    )}
                  >
                    <TableCell>
                      <span className="text-2sm tabular-nums text-slate-600">{row.date}</span>
                    </TableCell>

                    {/* Registration — with frequent indicator */}
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-2sm font-semibold tabular-nums text-[#2e5f8a]">
                            {row.registration}
                          </span>
                          {isFrequent && (
                            <span
                              title={`${freq!.count} incidents in the last 72 hours`}
                              className="inline-flex items-center gap-0.5 rounded-sm bg-amber-100 px-1 py-px text-[10px] font-semibold leading-none text-amber-700 ring-1 ring-amber-200"
                            >
                              <AlertTriangle className="h-2.5 w-2.5 shrink-0" />
                              Frequent
                            </span>
                          )}
                        </div>
                        {isFrequent && (
                          <span className="text-[10px] leading-none text-amber-600">
                            {freq!.count} incidents / 72 h
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="font-mono text-2sm font-medium tabular-nums text-slate-700">{row.incidentId}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-2sm tabular-nums text-slate-600">{row.incidentDate}</span>
                    </TableCell>
                    <TableCell>
                      <span className="block truncate text-2sm text-slate-800" title={row.incidentType}>{row.incidentType}</span>
                    </TableCell>

                    {/* Allocated To — with hotspot badge */}
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="block truncate text-2sm text-slate-600">{row.allocatedTo}</span>
                        {isHotspot && (
                          <span
                            title={`${hotspot!.count} incidents in ${locationKey} (rank #${hotspot!.rank})`}
                            className="inline-flex w-fit items-center gap-0.5 rounded-sm bg-rose-100 px-1 py-px text-[10px] font-semibold leading-none text-rose-700 ring-1 ring-rose-200"
                          >
                            <MapPin className="h-2.5 w-2.5 shrink-0" />
                            Hotspot · {row.region}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <IncidentStatusBadge status={row.incidentStatus} />
                    </TableCell>
                    <TableCell>
                      <span className="block truncate text-2sm text-slate-700">{row.createdBy}</span>
                    </TableCell>
                    <TableCell align="center" className="max-w-none overflow-visible">
                      <button
                        type="button"
                        title="View details"
                        onClick={() => onViewDetail?.(row)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:border-[#d0e2f0] hover:bg-[#e8f0f8] hover:text-[#2e5f8a]"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </tbody>
        </DataTableTable>
      </DataTableBodyScroll>

      <TablePagination
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        onPageChange={onPageChange}
        onPageSizeChange={(s) => { onPageSizeChange(s); onPageChange(1); }}
      />
    </DataTable>
  );
}
