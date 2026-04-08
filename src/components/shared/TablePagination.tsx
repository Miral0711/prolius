import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DataTableFooter } from '@/components/fleet/bus-master/DataTable';

export interface TablePaginationProps {
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (p: number) => void;
  onPageSizeChange: (s: number) => void;
  pageSizeOptions?: number[];
  className?: string;
}

function buildPageNumbers(page: number, totalPages: number): (number | '…')[] {
  const nums: (number | '…')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) nums.push(i);
  } else {
    nums.push(1);
    if (page > 3) nums.push('…');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      nums.push(i);
    }
    if (page < totalPages - 2) nums.push('…');
    nums.push(totalPages);
  }
  return nums;
}

const BTN =
  'rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40';

export function TablePagination({
  page,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  className,
}: TablePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const showingFrom = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingTo = Math.min(page * pageSize, totalCount);
  const pageNumbers = buildPageNumbers(page, totalPages);

  return (
    <DataTableFooter
      className={cn('flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between', className)}
    >
      {/* Left: page size + count */}
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span>Show</span>
          <Select
            value={String(pageSize)}
            onValueChange={(v) => { onPageSizeChange(Number(v)); onPageChange(1); }}
          >
            <SelectTrigger className="h-7 w-[60px] border-slate-200 bg-white px-2 text-xs font-medium shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((n) => (
                <SelectItem key={n} value={String(n)}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>entries</span>
        </div>
        {totalCount > 0 && (
          <p className="text-xs text-slate-500">
            Viewing{' '}
            <span className="font-medium tabular-nums text-slate-700">{showingFrom}</span>
            {' – '}
            <span className="font-medium tabular-nums text-slate-700">{showingTo}</span>
            {' of '}
            <span className="font-medium tabular-nums text-slate-700">{totalCount}</span>
          </p>
        )}
      </div>

      {/* Right: page buttons */}
      <div className="flex shrink-0 flex-wrap items-center justify-end gap-0.5">
        <button type="button" disabled={page === 1 || totalCount === 0} onClick={() => onPageChange(1)} className={BTN}>«</button>
        <button type="button" disabled={page === 1 || totalCount === 0} onClick={() => onPageChange(page - 1)} className={BTN}>Previous</button>
        {totalCount === 0 ? (
          <button type="button" disabled className="flex h-6 min-w-[1.5rem] items-center justify-center rounded border border-[#2e5f8a] bg-[#2e5f8a] px-0.5 text-xs font-medium text-white shadow-sm">1</button>
        ) : (
          pageNumbers.map((p, i) =>
            p === '…' ? (
              <span key={`e-${i}`} className="px-0.5 text-xs font-medium text-slate-400">…</span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={cn(
                  'flex h-6 min-w-[1.5rem] items-center justify-center rounded border px-0.5 text-xs font-medium transition-all',
                  p === page
                    ? 'border-[#2e5f8a] bg-[#2e5f8a] text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
                )}
              >{p}</button>
            )
          )
        )}
        <button type="button" disabled={page === totalPages || totalCount === 0} onClick={() => onPageChange(page + 1)} className={BTN}>Next</button>
        <button type="button" disabled={page === totalPages || totalCount === 0} onClick={() => onPageChange(totalPages)} className={BTN}>»</button>
      </div>
    </DataTableFooter>
  );
}
