import { Eye, Pencil, Trash2 } from 'lucide-react';

interface TableActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TableActionButtons({ onView, onEdit, onDelete }: TableActionButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-1">
      <button
        type="button"
        title="View"
        onClick={onView}
        className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:border-[#d0e2f0] hover:bg-[#e8f0f8] hover:text-[#2e5f8a]"
      >
        <Eye className="h-3 w-3" />
      </button>
      <button
        type="button"
        title="Edit"
        onClick={onEdit}
        className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600"
      >
        <Pencil className="h-3 w-3" />
      </button>
      <button
        type="button"
        title="Delete"
        onClick={onDelete}
        className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
      >
        <Trash2 className="h-3 w-3" />
      </button>
    </div>
  );
}
