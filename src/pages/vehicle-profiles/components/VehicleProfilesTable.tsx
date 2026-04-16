import { Plus } from 'lucide-react';
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
import type { VehicleProfileRow } from '../mock-data';
import { ProfileStatusBadge } from './ProfileStatusBadge';
import { ProfileRiskTags } from './ProfileRiskTags';
import { TableActionButtons } from './TableActionButtons';
import { TableEmptyState } from './TableEmptyState';
import { TableToolbar, TablePagination } from '@/components/shared';

// Type | Category | SubCategory | Manufacturer | Model | FuelType | EngineType | VehicleCount | Status | Actions
const COL_WIDTHS = ['90px', '140px', '140px', '120px', '130px', '90px', '160px', '100px', '90px', '100px'];
const COL_COUNT = COL_WIDTHS.length;

interface VehicleProfilesTableProps {
  rows: VehicleProfileRow[];
  totalCount: number;
  page: number;
  pageSize: number;
  showArchived: boolean;
  onShowArchivedChange: (v: boolean) => void;
  onPageChange: (p: number) => void;
  onPageSizeChange: (s: number) => void;
  onResetColumns?: () => void;
  onAddProfile?: () => void;
  onView?: (row: VehicleProfileRow) => void;
  onEdit?: (row: VehicleProfileRow) => void;
  onDelete?: (row: VehicleProfileRow) => void;
  className?: string;
}

export function VehicleProfilesTable({
  rows,
  totalCount,
  page,
  pageSize,
  showArchived,
  onShowArchivedChange,
  onPageChange,
  onPageSizeChange,
  onResetColumns,
  onAddProfile,
  onView,
  onEdit,
  onDelete,
  className,
}: VehicleProfilesTableProps) {
  return (
    <DataTable className={cn('min-h-0', className)}>
      <TableToolbar
        title="Vehicle Profiles"
        showArchived={showArchived}
        onShowArchivedChange={onShowArchivedChange}
        onResetColumns={onResetColumns}
        actions={
          <button
            type="button"
            onClick={onAddProfile}
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-3 text-2sm font-semibold text-emerald-700 shadow-sm transition-colors hover:border-emerald-300 hover:bg-emerald-100"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Profile
          </button>
        }
      />

      {/* Scrollable body */}
      <DataTableBodyScroll>
        <DataTableTable className="min-w-[1160px]">
          <colgroup>
            {[90,140,140,120,130,90,160,100,90,100].map((w, i) => <col key={i} style={{ width: `${w}px` }} />)}
          </colgroup>
          <TableHeader>
            <tr>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Sub Category</TableHeaderCell>
              <TableHeaderCell>Manufacturer</TableHeaderCell>
              <TableHeaderCell>Model</TableHeaderCell>
              <TableHeaderCell>Fuel Type</TableHeaderCell>
              <TableHeaderCell>Engine Type</TableHeaderCell>
              <TableHeaderCell align="center">Vehicle Count</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell align="center">Actions</TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody className="bg-white">
            {rows.length === 0 ? (
              <TableEmptyState colSpan={10} />
            ) : (
              rows.map((row) => (
                <TableRow key={row.id} className={cn(row.archived && 'opacity-60')}>
                  <TableCell><span className="text-2sm font-medium text-slate-800">{row.type}</span></TableCell>
                  <TableCell><span className="block truncate text-2sm text-slate-700">{row.category}</span></TableCell>
                  <TableCell><span className="block truncate text-2sm text-slate-600">{row.subCategory}</span></TableCell>
                  <TableCell><span className="text-2sm font-medium text-slate-800">{row.manufacturer}</span></TableCell>
                  <TableCell><span className="block truncate text-2sm text-slate-700">{row.model}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.fuelType}</span></TableCell>
                  <TableCell><span className="block truncate text-2sm text-slate-600">{row.engineType}</span></TableCell>
                  <TableCell align="center">
                    <span className="font-mono text-2sm font-semibold tabular-nums text-[#2e5f8a]">{row.vehicleCount}</span>
                    <ProfileRiskTags vehicleCount={row.vehicleCount} fuelType={row.fuelType} />
                  </TableCell>
                  <TableCell><ProfileStatusBadge status={row.profileStatus} /></TableCell>
                  <TableCell align="center" className="max-w-none overflow-visible">
                    <TableActionButtons onView={() => onView?.(row)} onEdit={() => onEdit?.(row)} onDelete={() => onDelete?.(row)} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </tbody>
        </DataTableTable>
      </DataTableBodyScroll>
      {/* Footer / Pagination */}
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
