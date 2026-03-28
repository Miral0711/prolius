import React from 'react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

/** Light tint + separation — shared by Top Drivers & Recent Trips header rows. */
export const dashboardTableHeaderSurfaceClass =
  'bg-slate-50 border-b border-slate-200/80';

/** Soft lift under header strip (apply once per header container, not per cell). */
export const dashboardTableHeaderLiftShadow =
  'shadow-[0_2px_6px_-2px_rgba(15,23,42,0.07)]';

export const dashboardTableHeaderRowClass = cn(
  dashboardTableHeaderSurfaceClass,
  dashboardTableHeaderLiftShadow,
);

/** Shared header label style — refined presence without heavy UI. */
export const dashboardTableHeaderCellClass =
  cn(typography.tableHeader, 'select-none');

export interface DataTableColumn<T> {
  key: string;
  header: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
  headerClassName?: string;
  render: (item: T, index: number) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  gridCols: string; // e.g. "1fr 2fr 1fr"
  gap?: string;
  minWidth?: number;
  rowHeight?: string;
  headerHeight?: string;
  px?: string;
  className?: string;
  onRowClick?: (item: T) => void;
}

export function DataTable<T>({
  data,
  columns,
  gridCols,
  gap = 'gap-4',
  minWidth = 600,
  rowHeight = 'min-h-[40px]',
  headerHeight = 'min-h-[32px]',
  px = 'px-4',
  className,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className={cn('overflow-x-auto flex-1 bg-white', className)}>
      <div
        className="flex flex-col w-full"
        style={{ minWidth: `${minWidth}px` }}
      >
        {/* Header — sticky with opaque bg so rows never show through while scrolling */}
        <div
          className={cn(
            'sticky top-0 z-20 grid items-stretch',
            dashboardTableHeaderRowClass,
            gap,
            px,
            headerHeight,
          )}
          style={{ gridTemplateColumns: gridCols }}
        >
          {columns.map((col, i) => (
            <div
              key={col.key || i}
              className={cn(
                'flex min-h-0 min-w-0 items-center py-2',
                dashboardTableHeaderCellClass,
                col.align === 'right'
                  ? 'justify-end text-right'
                  : col.align === 'center'
                    ? 'justify-center text-center'
                    : 'justify-start text-left',
                col.headerClassName,
              )}
            >
              {col.header}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="flex flex-col">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  'grid items-center border-b border-slate-100/50 transition-all duration-150 group',
                  onRowClick
                    ? 'cursor-pointer hover:bg-blue-50/30'
                    : 'hover:bg-slate-50/40',
                  gap,
                  px,
                  rowHeight,
                  index % 2 === 1 ? 'bg-slate-50/20' : 'bg-transparent',
                )}
                style={{ gridTemplateColumns: gridCols }}
              >
                {columns.map((col, i) => (
                  <div
                    key={col.key || i}
                    className={cn(
                      'truncate py-2 transition-transform duration-150',
                      typography.tableCell,
                      col.align === 'right'
                        ? 'text-right'
                        : col.align === 'center'
                          ? 'text-center'
                          : 'text-left',
                      col.className,
                    )}
                  >
                    <div className="inline-block w-full align-middle">
                      {col.render(item, index)}
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center py-10 text-slate-400 text-xs font-normal italic">
              No records found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


