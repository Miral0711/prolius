import { BarChart2, Eye } from 'lucide-react';
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
import type { HistoryRow } from '../mock-data';

// Date | Sender | Template | ViewMsg | Recipients | Report
const COL_WIDTHS = ['140px', '150px', '200px', '100px', '100px', '80px'];
const COL_COUNT = COL_WIDTHS.length;

interface MessagingHistoryTableProps {
  rows: HistoryRow[];
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (p: number) => void;
  onPageSizeChange: (s: number) => void;
  onViewMessage?: (row: HistoryRow) => void;
  onViewReport?: (row: HistoryRow) => void;
}

export function MessagingHistoryTable({
  rows,
  totalCount,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onViewMessage,
  onViewReport,
}: MessagingHistoryTableProps) {
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
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-bold uppercase tracking-[0.02rem] text-slate-800">History</h3>

      <DataTable className="min-h-0">
        <DataTableToolbar>
          <span className="text-xs text-slate-500">
            {totalCount} message{totalCount !== 1 ? 's' : ''} sent
          </span>
        </DataTableToolbar>

        <DataTableBodyScroll>
          <DataTableTable className="min-w-[770px]">
            <colgroup>
              {COL_WIDTHS.map((w, i) => <col key={i} style={{ width: w }} />)}
            </colgroup>
            <TableHeader>
              <tr>
                <TableHeaderCell>Date Sent</TableHeaderCell>
                <TableHeaderCell>Sender</TableHeaderCell>
                <TableHeaderCell>Template Name</TableHeaderCell>
                <TableHeaderCell align="center">View Message</TableHeaderCell>
                <TableHeaderCell align="center">Recipients</TableHeaderCell>
                <TableHeaderCell align="center">Report</TableHeaderCell>
              </tr>
            </TableHeader>
            <tbody className="bg-white">
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={COL_COUNT} align="center" className="py-10 text-2sm text-slate-500">
                    No messages found.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <span className="text-2sm tabular-nums text-slate-600">{row.dateSent}</span>
                    </TableCell>
                    <TableCell>
                      <span className="block truncate text-2sm font-medium text-slate-800">{row.sender}</span>
                    </TableCell>
                    <TableCell>
                      <span className="block truncate text-2sm text-slate-700" title={row.templateName}>
                        {row.templateName}
                      </span>
                    </TableCell>
                    <TableCell align="center" className="max-w-none overflow-visible">
                      <button
                        type="button"
                        onClick={() => onViewMessage?.(row)}
                        className="inline-flex h-7 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 text-xs font-medium text-[#2e5f8a] shadow-sm transition-colors hover:border-blue-300 hover:bg-[#e8f0f8]"
                      >
                        <Eye className="h-3 w-3" />
                        View
                      </button>
                    </TableCell>
                    <TableCell align="center">
                      <span className="font-mono text-2sm font-semibold tabular-nums text-slate-700">
                        {row.recipients}
                      </span>
                    </TableCell>
                    <TableCell align="center" className="max-w-none overflow-visible">
                      {row.hasReport ? (
                        <button
                          type="button"
                          title="View report"
                          onClick={() => onViewReport?.(row)}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:border-[#d0e2f0] hover:bg-[#e8f0f8] hover:text-[#2e5f8a]"
                        >
                          <BarChart2 className="h-3.5 w-3.5" />
                        </button>
                      ) : (
                        <span className="text-xs text-slate-300">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </tbody>
          </DataTableTable>
        </DataTableBodyScroll>

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
                  {[10, 25, 50].map((n) => (
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
            <button type="button" disabled={page === 1} onClick={() => onPageChange(1)}
              className="rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40">«</button>
            <button type="button" disabled={page === 1} onClick={() => onPageChange(page - 1)}
              className="rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40">Previous</button>
            {pageNumbers.map((p, i) =>
              p === '…' ? (
                <span key={`e-${i}`} className="px-0.5 text-xs font-medium text-slate-400">…</span>
              ) : (
                <button key={p} type="button" onClick={() => onPageChange(p)}
                  className={cn(
                    'flex h-6 min-w-[1.5rem] items-center justify-center rounded border px-0.5 text-xs font-medium transition-all',
                    p === page ? 'border-[#2e5f8a] bg-[#2e5f8a] text-white shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
                  )}>{p}</button>
              )
            )}
            <button type="button" disabled={page === totalPages} onClick={() => onPageChange(page + 1)}
              className="rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40">Next</button>
            <button type="button" disabled={page === totalPages} onClick={() => onPageChange(totalPages)}
              className="rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40">»</button>
          </div>
        </DataTableFooter>
      </DataTable>
    </div>
  );
}
