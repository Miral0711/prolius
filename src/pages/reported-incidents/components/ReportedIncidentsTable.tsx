import { Eye } from 'lucide-react';
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
import { IncidentStatusBadge } from './IncidentStatusBadge';
import { TableEmptyState } from './TableEmptyState';
import { TableToolbar, TablePagination } from '@/components/shared';

// Date | Reg | IncidentID | IncidentDate | Type | AllocatedTo | Status | CreatedBy | Details
const COL_WIDTHS = ['118px', '100px', '105px', '108px', '145px', '120px', '115px', '135px', '64px'];
const COL_COUNT = COL_WIDTHS.length;

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
      />

      {/* Scrollable body */}
      <DataTableBodyScroll>
        <DataTableTable className="min-w-[1110px]">
          <colgroup>
            {[118,100,105,108,145,120,115,135,64].map((w, i) => <col key={i} style={{ width: `${w}px` }} />)}
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
              rows.map((row) => (
                <TableRow key={row.id} className={cn(row.archived && 'opacity-60')}>
                  <TableCell><span className="text-2sm tabular-nums text-slate-600">{row.date}</span></TableCell>
                  <TableCell><span className="font-mono text-2sm font-semibold tabular-nums text-[#2e5f8a]">{row.registration}</span></TableCell>
                  <TableCell><span className="font-mono text-2sm font-medium tabular-nums text-slate-700">{row.incidentId}</span></TableCell>
                  <TableCell><span className="text-2sm tabular-nums text-slate-600">{row.incidentDate}</span></TableCell>
                  <TableCell><span className="block truncate text-2sm text-slate-800" title={row.incidentType}>{row.incidentType}</span></TableCell>
                  <TableCell><span className="block truncate text-2sm text-slate-600">{row.allocatedTo}</span></TableCell>
                  <TableCell><IncidentStatusBadge status={row.incidentStatus} /></TableCell>
                  <TableCell><span className="block truncate text-2sm text-slate-700">{row.createdBy}</span></TableCell>
                  <TableCell align="center" className="max-w-none overflow-visible">
                    <button type="button" title="View details" onClick={() => onViewDetail?.(row)}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:border-[#d0e2f0] hover:bg-[#e8f0f8] hover:text-[#2e5f8a]">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
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
