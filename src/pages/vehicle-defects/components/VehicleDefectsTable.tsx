import { Eye, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DataTable,
  DataTableBodyScroll,
  DataTableTable,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@/components/fleet/bus-master/DataTable';
import { TableToolbar, TablePagination } from '@/components/shared';
import { cn } from '@/lib/utils';
import type { VehicleDefectRow } from '../mock-data';
import { DefectStatusBadge } from './DefectStatusBadge';

// col: Date | Reg | DefectID | Category | Defect | AllocatedTo | Status | LastModified | CreatedBy | Details
const COL_WIDTHS = ['118px', '100px', '100px', '100px', '220px', '120px', '120px', '118px', '130px', '64px'];

interface VehicleDefectsTableProps {
  rows: VehicleDefectRow[];
  totalCount: number;
  page: number;
  pageSize: number;
  showArchived: boolean;
  onShowArchivedChange: (v: boolean) => void;
  onPageChange: (p: number) => void;
  onPageSizeChange: (s: number) => void;
  onResetColumns?: () => void;
  onAddDefect?: () => void;
  onViewDetail?: (row: VehicleDefectRow) => void;
  className?: string;
}

export function VehicleDefectsTable({
  rows,
  totalCount,
  page,
  pageSize,
  showArchived,
  onShowArchivedChange,
  onPageChange,
  onPageSizeChange,
  onResetColumns,
  onAddDefect,
  onViewDetail,
  className,
}: VehicleDefectsTableProps) {
  return (
    <DataTable className={cn('min-h-0', className)}>
      <TableToolbar
        title="Defects List"
        subtitle="(All Regions)"
        showArchived={showArchived}
        onShowArchivedChange={onShowArchivedChange}
        showArchivedLabel="Show archived"
        onResetColumns={onResetColumns}
        actions={
          <button type="button" onClick={onAddDefect}
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-3 text-2sm font-semibold text-emerald-700 shadow-sm transition-colors hover:border-emerald-300 hover:bg-emerald-100">
            <Plus className="h-3.5 w-3.5" />Add Defect
          </button>
        }
      />

      {/* Scrollable body */}
      <DataTableBodyScroll>
        <DataTableTable className="min-w-[1290px]">
          <colgroup>
            {[118,100,100,100,220,120,120,118,130,64].map((w, i) => <col key={i} style={{ width: `${w}px` }} />)}
          </colgroup>
          <TableHeader>
            <tr>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Registration</TableHeaderCell>
              <TableHeaderCell>Defect ID</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Defect</TableHeaderCell>
              <TableHeaderCell>Allocated To</TableHeaderCell>
              <TableHeaderCell>Defect Status</TableHeaderCell>
              <TableHeaderCell>Last Modified</TableHeaderCell>
              <TableHeaderCell>Created By</TableHeaderCell>
              <TableHeaderCell align="center">Details</TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody className="bg-white">
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center" className="py-10 text-2sm text-slate-500">
                  No defects match your filters.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id} className={cn(row.archived && 'opacity-60')}>
                  <TableCell><span className="text-2sm tabular-nums text-slate-600">{row.date}</span></TableCell>
                  <TableCell><span className="font-mono text-2sm font-semibold tabular-nums text-[#2e5f8a]">{row.registration}</span></TableCell>
                  <TableCell><span className="font-mono text-2sm font-medium tabular-nums text-slate-700">{row.defectId}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.category}</span></TableCell>
                  <TableCell><span className="block truncate text-2sm text-slate-800" title={row.defect}>{row.defect}</span></TableCell>
                  <TableCell><span className="block truncate text-2sm text-slate-600">{row.allocatedTo}</span></TableCell>
                  <TableCell><DefectStatusBadge status={row.defectStatus} /></TableCell>
                  <TableCell><span className="text-2sm tabular-nums text-slate-500">{row.lastModified}</span></TableCell>
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

      <TablePagination page={page} pageSize={pageSize} totalCount={totalCount} onPageChange={onPageChange} onPageSizeChange={(s) => { onPageSizeChange(s); onPageChange(1); }} />
    </DataTable>
  );
}
