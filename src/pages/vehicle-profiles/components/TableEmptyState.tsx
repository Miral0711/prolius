import { FileSearch } from 'lucide-react';

interface TableEmptyStateProps {
  colSpan: number;
  message?: string;
}

export function TableEmptyState({
  colSpan,
  message = 'No information available',
}: TableEmptyStateProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="border-b border-r border-slate-200/70 first:border-l">
        <div className="flex flex-col items-center justify-center gap-2 py-14">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-[#f4f8fb]">
            <FileSearch className="h-5 w-5 text-slate-400" />
          </div>
          <p className="text-sm font-medium text-slate-500">{message}</p>
          <p className="text-xs text-slate-400">Try adjusting your search or filters</p>
        </div>
      </td>
    </tr>
  );
}
