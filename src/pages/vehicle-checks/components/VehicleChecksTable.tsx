import { Eye, FileDown, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import {
  DataTable,
  DataTableBodyScroll,
  DataTableFooter,
  DataTableTable,
  DataTableToolbar,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@/components/fleet/bus-master/DataTable';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { VehicleCheckRow, VehicleStatus } from '../mock-data';
import { CheckResultBadge } from './CheckResultBadge';

const COL_WIDTHS = ['120px', '110px', '200px', '130px', '110px', '120px', '140px', '70px'];

function vehicleStatusVariant(s: VehicleStatus) {
  if (s === 'Active') return 'emerald' as const;
  if (s === 'Maintenance') return 'amber' as const;
  return 'rose' as const;
}

interface VehicleChecksTableProps {
  rows: VehicleCheckRow[];
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (p: number) => void;
  onPageSizeChange: (s: number) => void;
  onResetColumns?: () => void;
  onViewDetail?: (row: VehicleCheckRow) => void;
  className?: string;
}

export function VehicleChecksTable({
  rows,
  totalCount,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onResetColumns,
  onViewDetail,
  className,
}: VehicleChecksTableProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const showingFrom = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingTo = Math.min(page * pageSize, totalCount);

  const pageNumbers: (number | '…')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    pageNumbers.push(1);
    if (page > 3) pageNumbers.push('…');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pageNumbers.push(i);
    }
    if (page < totalPages - 2) pageNumbers.push('…');
    pageNumbers.push(totalPages);
  }

  return (
    <DataTable className={cn('min-h-0', className)}>
      {/* Toolbar */}
      <DataTableToolbar>
        <div className="flex min-w-0 items-center gap-2">
          <h3 className="text-sm font-bold uppercase tracking-[0.02rem] text-slate-800">
            Recent Vehicle Checks
            <span className="ml-1.5 text-xs font-normal normal-case text-slate-400">
              (All Regions)
            </span>
          </h3>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {onResetColumns && (
            <button
              type="button"
              onClick={onResetColumns}
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
            >
              Reset Columns
            </button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 rounded-md border border-[#d0e2f0] bg-[#e8f0f8] px-3 text-2sm font-semibold text-[#2e5f8a] shadow-sm hover:border-[#b8d0e8] hover:bg-[#d8ecf8]"
          >
            <FileSpreadsheet className="h-3.5 w-3.5" />
            Excel
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 rounded-md border border-rose-200 bg-rose-50 px-3 text-2sm font-semibold text-rose-700 shadow-sm hover:border-rose-300 hover:bg-rose-100"
          >
            <FileDown className="h-3.5 w-3.5" />
            PDF
          </Button>
        </div>
      </DataTableToolbar>

      {/* Scrollable body */}
      <DataTableBodyScroll>
        <DataTableTable className="min-w-[1000px]">
          <colgroup>
            {COL_WIDTHS.map((w, i) => <col key={i} style={{ width: w }} />)}
          </colgroup>
          <TableHeader>
            <tr>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Registration</TableHeaderCell>
              <TableHeaderCell>Check</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Vehicle Status</TableHeaderCell>
              <TableHeaderCell>Check Result</TableHeaderCell>
              <TableHeaderCell>Created By</TableHeaderCell>
              <TableHeaderCell align="center">Details</TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody className="bg-white">
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" className="py-10 text-2sm text-slate-500">
                  No vehicle checks match your filters.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <span className="text-2sm tabular-nums text-slate-600">{row.date}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-2sm font-semibold tabular-nums text-[#2e5f8a]">
                      {row.registration}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="block truncate text-2sm text-slate-800">{row.check}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-2sm text-slate-600">{row.type}</span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      label={row.vehicleStatus}
                      variant={vehicleStatusVariant(row.vehicleStatus)}
                      size="sm"
                    />
                  </TableCell>
                  <TableCell>
                    <CheckResultBadge result={row.checkResult} />
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
              ))
            )}
          </tbody>
        </DataTableTable>
      </DataTableBodyScroll>

      {/* Footer / Pagination */}
      <DataTableFooter className="flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Show</span>
            <Select
              value={String(pageSize)}
              onValueChange={(v) => { onPageSizeChange(Number(v)); onPageChange(1); }}
            >
              <SelectTrigger className="h-7 w-[60px] border-slate-200 bg-white px-2 text-xs font-medium shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 25, 50, 100].map((n) => (
                  <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>entries</span>
          </div>
          <p className="text-xs text-slate-500">
            Viewing{' '}
            <span className="font-medium tabular-nums text-slate-700">{showingFrom}</span>
            {' – '}
            <span className="font-medium tabular-nums text-slate-700">{showingTo}</span>
            {' of '}
            <span className="font-medium tabular-nums text-slate-700">{totalCount}</span>
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-end gap-0.5">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => onPageChange(1)}
            className="rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
          >
            «
          </button>
          <button
            type="button"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
          >
            Previous
          </button>
          {pageNumbers.map((p, i) =>
            p === '…' ? (
              <span key={`ellipsis-${i}`} className="px-0.5 text-xs font-medium text-slate-400">…</span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={cn(
                  'flex h-6 min-w-[1.5rem] items-center justify-center rounded border px-0.5 text-xs font-medium transition-all',
                  p === page
                    ? 'border-[#2e5f8a] bg-[#2e5f8a] text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
                )}
              >
                {p}
              </button>
            )
          )}
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
          >
            Next
          </button>
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => onPageChange(totalPages)}
            className="rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
          >
            »
          </button>
        </div>
      </DataTableFooter>
    </DataTable>
  );
}
