import type { ReactNode } from 'react';
import { FileDown, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableToolbar } from '@/components/fleet/bus-master/DataTable';
import { cn } from '@/lib/utils';

export interface TableToolbarAction {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  tone?: 'excel' | 'pdf' | 'add' | 'default';
}

export interface TableToolbarProps {
  title: string;
  subtitle?: string;
  /** Show archived checkbox */
  showArchived?: boolean;
  onShowArchivedChange?: (v: boolean) => void;
  showArchivedLabel?: string;
  /** Extra left-side content */
  leftExtra?: ReactNode;
  /** Override right-side actions entirely */
  actions?: ReactNode;
  /** Show default Excel + PDF buttons (default: true) */
  showExportButtons?: boolean;
  onResetColumns?: () => void;
  className?: string;
}

const TONE_CLASS: Record<string, string> = {
  excel: 'h-8 gap-1.5 rounded-md border border-[#d0e2f0] bg-[#e8f0f8] px-3 text-2sm font-semibold text-[#2e5f8a] shadow-sm hover:border-[#b8d0e8] hover:bg-[#d8ecf8]',
  pdf: 'h-8 gap-1.5 rounded-md border border-rose-200 bg-rose-50 px-3 text-2sm font-semibold text-rose-700 shadow-sm hover:border-rose-300 hover:bg-rose-100',
  add: 'inline-flex h-8 items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-3 text-2sm font-semibold text-emerald-700 shadow-sm transition-colors hover:border-emerald-300 hover:bg-emerald-100',
  default: 'inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50',
};

export function TableToolbar({
  title,
  subtitle,
  showArchived,
  onShowArchivedChange,
  showArchivedLabel = 'Show archived',
  leftExtra,
  actions,
  showExportButtons = true,
  onResetColumns,
  className,
}: TableToolbarProps) {
  return (
    <DataTableToolbar className={className}>
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">
        <h3 className="text-sm font-bold uppercase tracking-[0.02rem] text-slate-800">
          {title}
          {subtitle && (
            <span className="ml-1.5 text-xs font-normal normal-case text-slate-400">
              {subtitle}
            </span>
          )}
        </h3>
        {onShowArchivedChange != null && (
          <label className="flex cursor-pointer items-center gap-1.5">
            <Checkbox
              checked={showArchived}
              onCheckedChange={(v) => onShowArchivedChange(Boolean(v))}
              size="sm"
              className="border-slate-300"
            />
            <span className="text-xs font-medium text-slate-500">{showArchivedLabel}</span>
          </label>
        )}
        {leftExtra}
      </div>

      {/* Right */}
      <div className="flex shrink-0 items-center gap-1.5">
        {actions ?? (
          <>
            {onResetColumns && (
              <button type="button" onClick={onResetColumns} className={TONE_CLASS.default}>
                Reset Columns
              </button>
            )}
            {showExportButtons && (
              <>
                <Button type="button" variant="ghost" size="sm" className={TONE_CLASS.excel}>
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  Excel
                </Button>
                <Button type="button" variant="ghost" size="sm" className={TONE_CLASS.pdf}>
                  <FileDown className="h-3.5 w-3.5" />
                  PDF
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </DataTableToolbar>
  );
}

/** Convenience: a single toolbar action button with a preset tone */
export function ToolbarButton({
  tone = 'default',
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { tone?: keyof typeof TONE_CLASS }) {
  return (
    <button type="button" className={cn(TONE_CLASS[tone], className)} {...props}>
      {children}
    </button>
  );
}
