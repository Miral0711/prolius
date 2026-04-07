import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DateStatus, InspectionDate } from '../planning-table-data';

export interface ColumnDef<T> {
  key: string;
  header: string;
  width?: string;
  sticky?: boolean;
  render: (row: T) => React.ReactNode;
}

interface PlanningDataTableProps<T> {
  columns: ColumnDef<T>[];
  rows: T[];
  getRowKey: (row: T) => number | string;
}

const STATUS_CLASSES: Record<DateStatus, string> = {
  overdue: 'bg-rose-50 text-rose-700 font-medium',
  warning: 'bg-amber-50 text-amber-700 font-medium',
  ok:      'bg-emerald-50 text-emerald-700',
  none:    'text-slate-500',
};

export function DateCell({ date }: { date: InspectionDate }) {
  if (!date.value) return <span className="text-slate-300">—</span>;
  return (
    <span
      className={cn(
        'inline-block rounded px-1.5 py-0.5 text-xs leading-tight tabular-nums',
        STATUS_CLASSES[date.status],
      )}
    >
      {date.value}
    </span>
  );
}

export function PlanningDataTable<T>({
  columns,
  rows,
  getRowKey,
}: PlanningDataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  return (
    <div className="min-h-0 flex-1 overflow-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full min-w-max border-collapse text-xs">
        <thead className="sticky top-0 z-10 bg-[#f4f8fb]">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ minWidth: col.width ?? '120px' }}
                className={cn(
                  'border-b border-slate-200 px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400 whitespace-nowrap select-none',
                  col.sticky && 'sticky left-0 z-20 bg-[#f4f8fb]',
                )}
              >
                <button
                  className="flex items-center gap-1 hover:text-slate-600 transition-colors"
                  onClick={() => toggleSort(col.key)}
                >
                  {col.header}
                  <ArrowUpDown
                    className={cn(
                      'size-3 opacity-40',
                      sortKey === col.key && 'opacity-100 text-[#2e5f8a]',
                    )}
                  />
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={getRowKey(row)}
              className={cn(
                'border-b border-slate-100 transition-colors hover:bg-slate-50/60',
                idx % 2 === 1 && 'bg-[#f4f8fb]/30',
              )}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    'px-3 py-2 whitespace-nowrap',
                    col.sticky && 'sticky left-0 z-10 bg-white',
                    idx % 2 === 1 && col.sticky && 'bg-[#f4f8fb]/30',
                  )}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="py-12 text-center text-sm text-slate-400"
              >
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
