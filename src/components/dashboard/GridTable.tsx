import React from 'react';
import { cn } from '@/lib/utils';

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
  rowHeight = 'min-h-[48px]', 
  headerHeight = 'min-h-[40px]',
  px = 'px-5',
  className,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className={cn("overflow-x-auto flex-1 bg-white", className)}>
      <div className="flex flex-col w-full" style={{ minWidth: `${minWidth}px` }}>
        {/* Header */}
        <div 
          className={cn(
            "grid items-center bg-slate-50/60 border-b border-slate-200/60 sticky top-0 z-10",
            gap, px, headerHeight
          )}
          style={{ gridTemplateColumns: gridCols }}
        >
          {columns.map((col, i) => (
            <div 
              key={col.key || i}
              className={cn(
                "py-3 text-[10px] font-medium uppercase tracking-[0.1em] text-slate-400 select-none",
                col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                col.headerClassName
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
                  "grid items-center border-b border-slate-100/50 transition-all duration-150 group",
                  onRowClick ? "cursor-pointer hover:bg-blue-50/30" : "hover:bg-slate-50/40",
                  gap, px, rowHeight,
                  index % 2 === 1 ? 'bg-slate-50/20' : 'bg-transparent'
                )}
                style={{ gridTemplateColumns: gridCols }}
              >
                {columns.map((col, i) => (
                  <div 
                    key={col.key || i}
                    className={cn(
                      "truncate py-2.5 transition-transform duration-150",
                      col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                      col.className
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
            <div className="flex items-center justify-center py-10 text-slate-400 text-xs font-medium italic">
              No records found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
