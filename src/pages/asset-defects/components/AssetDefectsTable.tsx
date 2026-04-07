import { Eye, FileDown, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import type { AssetDefectRow } from '../mock-data';
import { AssetDefectStatusBadge } from './AssetDefectStatusBadge';
import { TableEmptyState } from './TableEmptyState';

// Date | AssetNo | DefectID | Category | Defect | AllocatedTo | Status | LastModified | CreatedBy | Details
const COL_WIDTHS = ['118px', '105px', '100px', '115px', '220px', '115px', '120px', '118px', '130px', '64px'];
const COL_COUNT = COL_WIDTHS.length;

interface AssetDefectsTableProps {
  rows: AssetDefectRow[];
  totalCount: number;
  page: number;
  pageSize: number;
  showArchived: boolean;
  onShowArchivedChange: (v: boolean) => void;
  onPageChange: (p: number) => void;
  onPageSizeChange: (s: number) => void;
  onResetColumns?: () => void;
  onViewDetail?: (row: AssetDefectRow) => void;
  className?: string;
}

export function AssetDefectsTable({
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
}: AssetDefectsTableProps) {
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
        <div className="flex min-w-0 items-center gap-3">
          <h3 className="text-sm font-bold uppercase tracking-[0.02rem] text-slate-800">
            Defects List
            <span className="ml-1.5 text-xs font-normal normal-case text-slate-400">
              (All Regions)
            </span>
          </h3>
          <label className="flex cursor-pointer items-center gap-1.5">
            <Checkbox
              checked={showArchived}
              onCheckedChange={(v) => onShowArchivedChange(Boolean(v))}
              size="sm"
              className="border-slate-300"
            />
            <span className="text-xs font-medium text-slate-500">Show archived</span>
          </label>
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
        <DataTableTable className="min-w-[1305px]">
          <colgroup>
            {COL_WIDTHS.map((w, i) => <col key={i} style={{ width: w }} />)}
          </colgroup>
          <TableHeader>
            <tr>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Asset Number</TableHeaderCell>
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
              <TableEmptyState colSpan={COL_COUNT} />
            ) : (
              rows.map((row) => (
                <TableRow key={row.id} className={cn(row.archived && 'opacity-60')}>
                  <TableCell>
                    <span className="text-2sm tabular-nums text-slate-600">{row.date}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-2sm font-semibold tabular-nums text-[#2e5f8a]">
                      {row.assetNumber}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-2sm font-medium tabular-nums text-slate-700">
                      {row.defectId}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-2sm text-slate-600">{row.category}</span>
                  </TableCell>
                  <TableCell>
                    <span className="block truncate text-2sm text-slate-800" title={row.defect}>
                      {row.defect}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="block truncate text-2sm text-slate-600">{row.allocatedTo}</span>
                  </TableCell>
                  <TableCell>
                    <AssetDefectStatusBadge status={row.defectStatus} />
                  </TableCell>
                  <TableCell>
                    <span className="text-2sm tabular-nums text-slate-500">{row.lastModified}</span>
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
          {totalCount > 0 && (
            <p className="text-xs text-slate-500">
              Viewing{' '}
              <span className="font-medium tabular-nums text-slate-700">{showingFrom}</span>
              {' – '}
              <span className="font-medium tabular-nums text-slate-700">{showingTo}</span>
              {' of '}
              <span className="font-medium tabular-nums text-slate-700">{totalCount}</span>
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-end gap-0.5">
          <button
            type="button"
            disabled={page === 1 || totalCount === 0}
            onClick={() => onPageChange(1)}
            className="rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
          >«</button>
          <button
            type="button"
            disabled={page === 1 || totalCount === 0}
            onClick={() => onPageChange(page - 1)}
            className="rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
          >Previous</button>
          {totalCount === 0 ? (
            <button type="button" disabled className="flex h-6 min-w-[1.5rem] items-center justify-center rounded border border-blue-500 bg-[#2e5f8a] px-0.5 text-xs font-medium text-white shadow-sm">1</button>
          ) : (
            pageNumbers.map((p, i) =>
              p === '…' ? (
                <span key={`e-${i}`} className="px-0.5 text-xs font-medium text-slate-400">…</span>
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
                >{p}</button>
              )
            )
          )}
          <button
            type="button"
            disabled={page === totalPages || totalCount === 0}
            onClick={() => onPageChange(page + 1)}
            className="rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
          >Next</button>
          <button
            type="button"
            disabled={page === totalPages || totalCount === 0}
            onClick={() => onPageChange(totalPages)}
            className="rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
          >»</button>
        </div>
      </DataTableFooter>
    </DataTable>
  );
}
