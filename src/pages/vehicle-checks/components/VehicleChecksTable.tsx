import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
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
import type { VehicleCheckRow, VehicleStatus } from '../mock-data';
import { getEscalationStatus, VEHICLE_CHECKS_MOCK } from '../mock-data';
import { CheckResultBadge } from './CheckResultBadge';

const COL_WIDTHS = ['120px', '110px', '200px', '130px', '110px', '120px', '140px', '70px'];

function vehicleStatusVariant(s: VehicleStatus) {
  if (s === 'Active') return 'emerald' as const;
  if (s === 'Maintenance') return 'amber' as const;
  return 'rose' as const;
}

function EscalationIndicator({ status }: { status: ReturnType<typeof getEscalationStatus> }) {
  if (!status) return null;
  const isHighRisk = status === 'high-risk';
  return (
    <span
      title={isHighRisk ? 'High Risk Vehicle' : 'Needs Attention'}
      className={cn(
        'ml-1.5 inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none',
        isHighRisk
          ? 'bg-red-100 text-red-700'
          : 'bg-amber-100 text-amber-700',
      )}
    >
      {isHighRisk ? '⚠ High Risk' : '⚠ Needs Attention'}
    </span>
  );
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
  return (
    <DataTable className={cn('min-h-0', className)}>
      <TableToolbar title="Recent Vehicle Checks" subtitle="(All Regions)" onResetColumns={onResetColumns} />

      {/* Scrollable body */}
      <DataTableBodyScroll>
        <DataTableTable className="min-w-[1000px]">
          <colgroup>
            {[120,110,200,130,110,120,140,70].map((w, i) => <col key={i} style={{ width: `${w}px` }} />)}
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
                  <TableCell><span className="text-2sm tabular-nums text-slate-600">{row.date}</span></TableCell>
                  <TableCell><span className="font-mono text-2sm font-semibold tabular-nums text-[#2e5f8a]">{row.registration}</span></TableCell>
                  <TableCell><span className="block truncate text-2sm text-slate-800">{row.check}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.type}</span></TableCell>
                  <TableCell>
                    <div className="flex flex-wrap items-center gap-x-1">
                      <StatusBadge label={row.vehicleStatus} variant={vehicleStatusVariant(row.vehicleStatus)} size="sm" />
                      <EscalationIndicator status={getEscalationStatus(row, VEHICLE_CHECKS_MOCK)} />
                    </div>
                  </TableCell>
                  <TableCell><CheckResultBadge result={row.checkResult} /></TableCell>
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
