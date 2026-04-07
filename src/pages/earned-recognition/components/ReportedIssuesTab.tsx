import { Eye } from 'lucide-react';
import { StatusBadge, type StatusVariant } from '@/components/dashboard/StatusBadge';
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
import { REPORTED_ISSUES_MOCK, type IssueStatus } from '../mock-data';
import { useMemo, useState } from 'react';

const STATUS_VARIANT: Record<IssueStatus, StatusVariant> = {
  Open:           'rose',
  'Under Review': 'amber',
  Resolved:       'emerald',
  Closed:         'slate',
};

const COL_WIDTHS = ['100px', '70px', '70px', '160px', '1fr', '110px', '130px', '70px'];
const COL_COUNT = 8;

export function ReportedIssuesTab() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalCount = REPORTED_ISSUES_MOCK.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const showingFrom = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingTo = Math.min(page * pageSize, totalCount);

  const pagedRows = useMemo(
    () => REPORTED_ISSUES_MOCK.slice((page - 1) * pageSize, page * pageSize),
    [page, pageSize],
  );

  const pageNumbers: (number | '…')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    pageNumbers.push(1);
    if (page > 3) pageNumbers.push('…');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pageNumbers.push(i);
    if (page < totalPages - 2) pageNumbers.push('…');
    pageNumbers.push(totalPages);
  }

  return (
    <DataTable className="min-h-0">
      <DataTableToolbar>
        <h3 className="text-sm font-bold uppercase tracking-[0.02rem] text-slate-800">
          Reported Issues
        </h3>
      </DataTableToolbar>

      <DataTableBodyScroll>
        <DataTableTable className="min-w-[860px]">
          <colgroup>
            {['100px','70px','70px','160px','220px','110px','130px','70px'].map((w, i) => (
              <col key={i} style={{ width: w }} />
            ))}
          </colgroup>
          <TableHeader>
            <tr>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell align="center">Period</TableHeaderCell>
              <TableHeaderCell>Code</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Issue Detail</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Raised By</TableHeaderCell>
              <TableHeaderCell align="center">Details</TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody className="bg-white">
            {pagedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={COL_COUNT} align="center" className="py-10 text-2sm text-slate-500">
                  No reported issues found.
                </TableCell>
              </TableRow>
            ) : (
              pagedRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <span className="text-2sm tabular-nums text-slate-600">{row.date}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="font-mono text-2sm font-semibold tabular-nums text-slate-700">{row.period}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-2sm font-semibold text-slate-800">{row.code}</span>
                  </TableCell>
                  <TableCell>
                    <span className="block truncate text-2sm text-slate-700">{row.description}</span>
                  </TableCell>
                  <TableCell>
                    <span className="block truncate text-2sm text-slate-600" title={row.issueDetail}>
                      {row.issueDetail}
                    </span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      label={row.status}
                      variant={STATUS_VARIANT[row.status]}
                      size="sm"
                      preserveCase
                    />
                  </TableCell>
                  <TableCell>
                    <span className="block truncate text-2sm text-slate-700">{row.raisedBy}</span>
                  </TableCell>
                  <TableCell align="center" className="max-w-none overflow-visible">
                    <button
                      type="button"
                      title="View details"
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

      <DataTableFooter className="flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Show</span>
            <Select
              value={String(pageSize)}
              onValueChange={(v) => { setPageSize(Number(v)); setPage(1); }}
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
          <button type="button" disabled={page === 1} onClick={() => setPage(1)}
            className="rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40">«</button>
          <button type="button" disabled={page === 1} onClick={() => setPage(page - 1)}
            className="rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40">Previous</button>
          {pageNumbers.map((p, i) =>
            p === '…' ? (
              <span key={`e-${i}`} className="px-0.5 text-xs font-medium text-slate-400">…</span>
            ) : (
              <button key={p} type="button" onClick={() => setPage(p)}
                className={cn(
                  'flex h-6 min-w-[1.5rem] items-center justify-center rounded border px-0.5 text-xs font-medium transition-all',
                  p === page ? 'border-[#2e5f8a] bg-[#2e5f8a] text-white shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
                )}>{p}</button>
            )
          )}
          <button type="button" disabled={page === totalPages} onClick={() => setPage(page + 1)}
            className="rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40">Next</button>
          <button type="button" disabled={page === totalPages} onClick={() => setPage(totalPages)}
            className="rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40">»</button>
        </div>
      </DataTableFooter>
    </DataTable>
  );
}
