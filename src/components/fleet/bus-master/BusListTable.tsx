import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Bus,
  Eye,
  FileDown,
  FileSpreadsheet,
  Pencil,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  StatusBadge,
  type StatusVariant,
} from '@/components/dashboard/StatusBadge';
import { cn } from '@/lib/utils';
import {
  BUS_LIST_TABLE_COLUMN_COUNT,
  BUS_TABLE_COL_WIDTH_PX,
} from './bus-table-cols';
import type { ActionButtonItem } from './ActionButtonGroup';
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
} from './DataTable';
import { MetadataCell } from './MetadataCell';
import { PowerBadge } from './PowerBadge';
import { RowActionMenu, type RowMenuEntry } from './RowActionMenu';

export interface BusListTableRow {
  id: number;
  companyName: string;
  plateNo: string;
  seqNo: number;
  mdtId: string;
  subStart: string;
  subEnd: string;
  tariff: string;
  wasl: 'Enable' | 'Disable';
  status: 'Active' | 'Out of Service' | 'Maintenance';
  power: 'Enable' | 'Disable';
}

export interface BusListTableProps {
  rows: BusListTableRow[];
  selectedIds: Set<number>;
  onToggleRow: (id: number) => void;
  onToggleAll: () => void;
  /** Total entries in the full dataset (for “Showing x–y of z”). */
  totalEntryCount: number;
  /** Inclusive start index for the current page (default 1). */
  showingFrom?: number;
  /** Inclusive end index (defaults to `rows.length`). */
  showingTo?: number;
  /** Extra items in the row overflow menu. */
  getRowMenuEntries?: (row: BusListTableRow) => RowMenuEntry[];
  /** Table card title (default: Bus List). */
  title?: string;
  /** Icon next to the title (default: Bus). */
  titleIcon?: LucideIcon;
  /** Replace default Excel / PDF toolbar buttons. */
  toolbarActions?: ReactNode;
  /** Override default View / Edit / Delete icon row actions. */
  primaryRowActions?: ActionButtonItem[];
  /** Shown when `rows` is empty (default: short placeholder copy). */
  emptyState?: ReactNode;
  /** Optional hook for tests / analytics. */
  dataTestId?: string;
  className?: string;
}

function busStatusVariant(
  status: BusListTableRow['status'],
): StatusVariant {
  if (status === 'Active') return 'emerald';
  if (status === 'Maintenance') return 'amber';
  return 'rose';
}

function waslVariant(wasl: BusListTableRow['wasl']): StatusVariant {
  return wasl === 'Enable' ? 'emerald' : 'rose';
}

/** Default View / Edit / Delete actions — import to extend or pass `primaryRowActions`. */
export const DEFAULT_BUS_LIST_PRIMARY_ROW_ACTIONS: ActionButtonItem[] = [
  {
    icon: Eye,
    label: 'View details',
    variant: 'info',
  },
  {
    icon: Pencil,
    label: 'Edit bus',
    variant: 'default',
  },
  {
    icon: Trash2,
    label: 'Delete',
    variant: 'danger',
  },
];

const DEFAULT_TOOLBAR_ACTIONS = (
  <>
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-8 gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 text-2sm font-semibold text-blue-700 shadow-sm hover:border-blue-300 hover:bg-blue-100 hover:text-blue-800"
    >
      <FileSpreadsheet className="h-3.5 w-3.5" />
      Excel
    </Button>
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-8 gap-1.5 rounded-md border border-rose-200 bg-rose-50 px-3 text-2sm font-semibold text-rose-700 shadow-sm hover:border-rose-300 hover:bg-rose-100 hover:text-rose-800"
    >
      <FileDown className="h-3.5 w-3.5" />
      PDF
    </Button>
  </>
);

/**
 * Fleet “Bus List” grid: selection, company/plate/MDT columns, WASL/Status/Power tags, row actions.
 * Reusable across pages — pass `rows`, selection state, and callbacks.
 * Optional: `primaryRowActions`, `emptyState`, `toolbarActions`, `title`.
 */
export function BusListTable({
  rows,
  selectedIds,
  onToggleRow,
  onToggleAll,
  totalEntryCount,
  showingFrom = 1,
  showingTo,
  getRowMenuEntries = () => [],
  title = 'Bus List',
  titleIcon: TitleIcon = Bus,
  toolbarActions,
  primaryRowActions = DEFAULT_BUS_LIST_PRIMARY_ROW_ACTIONS,
  emptyState,
  dataTestId,
  className,
}: BusListTableProps) {
  const allSelected = rows.length > 0 && selectedIds.size === rows.length;
  const end = showingTo ?? rows.length;
  const menuFor = getRowMenuEntries;

  return (
    <DataTable className={cn('min-h-0', className)} data-testid={dataTestId}>
      <DataTableToolbar>
        <div className="flex min-w-0 items-center gap-2">
          <TitleIcon className="h-4 w-4 shrink-0 text-slate-600" />
          <h3 className="text-sm font-bold uppercase tracking-[0.02rem] text-slate-800">
            {title}
          </h3>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {toolbarActions ?? DEFAULT_TOOLBAR_ACTIONS}
        </div>
      </DataTableToolbar>

      <DataTableBodyScroll>
        <DataTableTable>
          <colgroup>
            {BUS_TABLE_COL_WIDTH_PX.map((w, i) => (
              <col key={i} style={{ width: w }} />
            ))}
          </colgroup>
          <TableHeader>
            <tr>
              <TableHeaderCell
                align="center"
                className="max-w-none overflow-visible"
              >
                <span className="sr-only">Select all rows</span>
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={onToggleAll}
                  className="mx-auto border-slate-300"
                />
              </TableHeaderCell>
              <TableHeaderCell align="center">Company Name</TableHeaderCell>
              <TableHeaderCell align="center">Plate No</TableHeaderCell>
              <TableHeaderCell align="center">Seq No</TableHeaderCell>
              <TableHeaderCell align="center">MDT ID</TableHeaderCell>
              <TableHeaderCell align="center">Sub. Start &amp; End</TableHeaderCell>
              <TableHeaderCell align="center">Tariff</TableHeaderCell>
              <TableHeaderCell align="center">WASL</TableHeaderCell>
              <TableHeaderCell align="center">Status</TableHeaderCell>
              <TableHeaderCell align="center">Power</TableHeaderCell>
              <TableHeaderCell
                align="center"
                className="max-w-none overflow-visible"
              >
                Actions
              </TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody className="bg-white">
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={BUS_LIST_TABLE_COLUMN_COUNT}
                  align="center"
                  className="py-10 text-2sm text-slate-500"
                >
                  {emptyState ?? 'No buses match your filters.'}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    selectedIds.has(row.id) &&
                      'bg-slate-100/85 hover:bg-slate-100/90',
                  )}
                >
                  <TableCell align="center" className="max-w-none overflow-visible">
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={selectedIds.has(row.id)}
                        onCheckedChange={() => onToggleRow(row.id)}
                        className="border-slate-300"
                      />
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <MetadataCell
                      primary={row.companyName}
                      className="text-center"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <span className="block w-full text-center font-mono text-2sm font-semibold tabular-nums text-blue-700">
                      {row.plateNo}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="font-mono text-2sm font-medium tabular-nums text-slate-800">
                      {row.seqNo}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="block w-full truncate text-center font-mono text-2sm font-medium tabular-nums text-slate-800">
                      {row.mdtId}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="block w-full truncate text-center text-2sm tabular-nums text-slate-700">
                      {row.subStart} – {row.subEnd}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="block w-full truncate text-center text-2sm text-slate-600">
                      {row.tariff}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <div
                      className="flex justify-center"
                      title="WASL integration status"
                    >
                      <StatusBadge
                        label={row.wasl}
                        variant={waslVariant(row.wasl)}
                        withDot
                        preserveCase
                        size="sm"
                      />
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div
                      className="flex justify-center"
                      title="Fleet operations status"
                    >
                      <StatusBadge
                        label={row.status}
                        variant={busStatusVariant(row.status)}
                        size="sm"
                      />
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div
                      className="flex justify-center"
                      title="On-board power / ignition"
                    >
                      <PowerBadge power={row.power} />
                    </div>
                  </TableCell>
                  <TableCell align="center" className="max-w-none overflow-visible">
                    <RowActionMenu
                      className="justify-center"
                      primaryActions={primaryRowActions}
                      menuEntries={menuFor(row)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </tbody>
        </DataTableTable>
      </DataTableBodyScroll>

      <DataTableFooter className="w-full flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Show</span>
            <Select defaultValue="25">
              <SelectTrigger className="h-7 w-[60px] border-slate-200 bg-white px-2 text-xs font-medium shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span>entries</span>
          </div>
          <p className="text-xs text-slate-500">
            Showing{' '}
            <span className="font-medium tabular-nums text-slate-700">
              {showingFrom}
            </span>{' '}
            to{' '}
            <span className="font-medium tabular-nums text-slate-700">{end}</span>{' '}
            of{' '}
            <span className="font-medium tabular-nums text-slate-700">
              {totalEntryCount}
            </span>{' '}
            entries
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-end gap-0.5">
          <button
            type="button"
            className="rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            Previous
          </button>
          {[1, 2, 3, 4, 5].map((p) => (
            <button
              key={p}
              type="button"
              className={cn(
                'flex h-6 min-w-[1.5rem] items-center justify-center rounded border px-0.5 text-xs font-medium transition-all',
                p === 1
                  ? 'border-blue-500 bg-blue-600 text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
              )}
            >
              {p}
            </button>
          ))}
          <span className="px-0.5 text-xs font-medium text-slate-400">
            …
          </span>
          <button
            type="button"
            className="flex h-6 min-w-[1.5rem] items-center justify-center rounded border border-slate-200 bg-white px-0.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            32
          </button>
          <button
            type="button"
            className="rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            Next
          </button>
        </div>
      </DataTableFooter>
    </DataTable>
  );
}


