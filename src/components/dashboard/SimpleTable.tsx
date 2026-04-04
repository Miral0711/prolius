import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

export interface SimpleTableColumn<T> {
  key: string;
  header: string;
  align?: 'left' | 'right' | 'center';
  headerClassName?: string;
  cellClassName?: string | ((item: T) => string);
  render: (item: T, index: number) => ReactNode;
}

export interface SimpleTableProps<T> {
  data: T[];
  columns: SimpleTableColumn<T>[];
  minWidth?: number;
  rowKey: (item: T, index: number) => string | number;
  /** Zebra striping on odd rows */
  striped?: boolean;
  className?: string;
}

/**
 * Reusable lightweight table.
 * Replaces raw <table> in ActivityFeedPanel, TopDriversCard, DriverPerformancePanel.
 */
export function SimpleTable<T>({
  data,
  columns,
  minWidth = 480,
  rowKey,
  striped = false,
  className,
}: SimpleTableProps<T>) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full" style={{ minWidth }}>
        <thead>
          <tr className="bg-slate-50/70 border-b border-slate-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  typography.tableHeader,
                  'px-3 py-2 uppercase tracking-[0.04rem] text-slate-500',
                  col.align === 'right' && 'text-right',
                  col.align === 'center' && 'text-center',
                  col.align !== 'right' && col.align !== 'center' && 'text-left',
                  col.headerClassName,
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr
              key={rowKey(item, i)}
              className={cn(
                'border-t border-slate-100 last:border-0',
                striped && i % 2 === 1 && 'bg-slate-50/30',
              )}
            >
              {columns.map((col) => {
                const cellCls =
                  typeof col.cellClassName === 'function'
                    ? col.cellClassName(item)
                    : col.cellClassName;
                return (
                  <td
                    key={col.key}
                    className={cn(
                      typography.tableCell,
                      'px-3 py-2',
                      col.align === 'right' && 'text-right',
                      col.align === 'center' && 'text-center',
                      cellCls,
                    )}
                  >
                    {col.render(item, i)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
