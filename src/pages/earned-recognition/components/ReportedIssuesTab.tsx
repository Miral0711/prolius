import { Eye } from 'lucide-react';
import { StatusBadge, type StatusVariant } from '@/components/dashboard/StatusBadge';
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

  const pagedRows = useMemo(
    () => REPORTED_ISSUES_MOCK.slice((page - 1) * pageSize, page * pageSize),
    [page, pageSize],
  );

  return (
    <DataTable className="min-h-0">
      <TableToolbar title="Reported Issues" showExportButtons={false} />

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
                <TableCell colSpan={8} align="center" className="py-10 text-2sm text-slate-500">
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

      <TablePagination
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        onPageChange={setPage}
        onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
        pageSizeOptions={[10, 25, 50]}
      />
    </DataTable>
  );
}
