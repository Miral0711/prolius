import * as React from 'react';
import { cn } from '@/lib/utils';
import { fleetSurface } from './tokens';

const stickyHeadDefault =
  'sticky top-0 z-20 border-b border-slate-200/70 bg-slate-50 shadow-[0_1px_0_0_rgb(226_232_240)]';

const stickyHeadNavy = cn(
  'sticky top-0 z-20 backdrop-blur-sm',
  fleetSurface.tableHeaderNavy,
);

export interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/** Card-style shell: optional toolbar, scrollable table region, fixed footer */
export function DataTable({ className, children, ...props }: DataTableProps) {
  return (
    <div
      className={cn(
        'flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border border-slate-200/90 bg-white shadow-sm',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface DataTableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function DataTableToolbar({ className, children, ...props }: DataTableToolbarProps) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50/95',
        fleetSurface.toolbar,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface DataTableBodyScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/** Only this region scrolls; thead uses sticky cells */
export function DataTableBodyScroll({ className, children, ...props }: DataTableBodyScrollProps) {
  return (
    <div
      className={cn(
        'min-h-0 flex-1 overflow-auto overscroll-y-contain bg-white [scrollbar-gutter:stable]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface DataTableTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export function DataTableTable({ className, children, ...props }: DataTableTableProps) {
  return (
    <table
      className={cn(
        'w-full border-collapse text-left',
        fleetSurface.tableMinWidth,
        'table-fixed',
        className,
      )}
      {...props}
    >
      {children}
    </table>
  );
}

export function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return <thead className={cn(className)} {...props} />;
}

export function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      className={cn(
        'transition-colors duration-150 even:bg-slate-50/40 hover:bg-blue-50/45',
        className,
      )}
      {...props}
    />
  );
}

export interface TableExpandRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  colSpan: number;
  children: React.ReactNode;
}

/** Full-width detail row below a data row (expandable panels). */
export function TableExpandRow({ colSpan, children, className, ...props }: TableExpandRowProps) {
  return (
    <tr
      className={cn('border-b border-slate-200/70 bg-slate-50/40 last:border-b-0', className)}
      {...props}
    >
      <td
        colSpan={colSpan}
        className="max-w-none overflow-visible border-b border-slate-200/70 p-0 align-top"
      >
        {children}
      </td>
    </tr>
  );
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right';
}

export function TableCell({ className, align = 'left', ...props }: TableCellProps) {
  return (
    <td
      className={cn(
        fleetSurface.cell,
        fleetSurface.tableGridCell,
        'max-w-0 align-middle overflow-hidden',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        align === 'left' && 'text-left',
        className,
      )}
      {...props}
    />
  );
}

export interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right';
  /** `navy` matches Bus Master–style dark header with white labels */
  variant?: 'default' | 'navy';
}

export function TableHeaderCell({
  className,
  align = 'left',
  variant = 'default',
  ...props
}: TableHeaderCellProps) {
  const sticky = variant === 'navy' ? stickyHeadNavy : stickyHeadDefault;

  return (
    <th
      scope="col"
      className={cn(
        sticky,
        fleetSurface.cellHeader,
        variant === 'default' && fleetSurface.tableGridHeaderCell,
        variant === 'navy' && 'border-r border-white/10 first:border-l',
        'max-w-0 align-middle overflow-hidden',
        variant === 'navy' &&
          'text-[10px] font-semibold uppercase tracking-wide text-white/95',
        variant === 'default' &&
          'text-[10px] font-bold uppercase tracking-[0.06em] text-slate-600',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        align === 'left' && 'text-left',
        className,
      )}
      {...props}
    />
  );
}

export interface DataTableFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function DataTableFooter({ className, children, ...props }: DataTableFooterProps) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-between border-t border-slate-200/70 bg-slate-50/60',
        fleetSurface.paginationBar,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
