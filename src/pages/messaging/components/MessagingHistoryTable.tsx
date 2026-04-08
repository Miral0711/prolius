import { BarChart2, Eye } from 'lucide-react';
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
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-bold uppercase tracking-[0.02rem] text-slate-800">History</h3>

      <DataTable className="min-h-0">
        <TableToolbar title={`${totalCount} message${totalCount !== 1 ? 's' : ''} sent`} showExportButtons={false} />

        <DataTableBodyScroll>
          <DataTableTable className="min-w-[770px]">
            <colgroup>
              {[140, 150, 200, 100, 100, 80].map((w, i) => <col key={i} style={{ width: `${w}px` }} />)}
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
                  <TableCell colSpan={6} align="center" className="py-10 text-2sm text-slate-500">
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

        <TablePagination
          page={page}
          pageSize={pageSize}
          totalCount={totalCount}
          onPageChange={onPageChange}
          onPageSizeChange={(s) => { onPageSizeChange(s); onPageChange(1); }}
          pageSizeOptions={[10, 25, 50]}
        />
      </DataTable>
    </div>
  );
}
