import { Lock, ExternalLink } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
  LOCK_NOTE,
  METRIC_ROWS,
  OPERATOR_ID,
  PERIODS,
  SYSTEM_PROVIDER_ID,
  YEAR_OPTIONS,
} from '../mock-data';

// ── Cell colour logic ─────────────────────────────────────────────────────────
function cellVariant(value: number | null, code: string): string {
  if (value === null) return '';
  if (code === 'M1') {
    if (value >= 100) return 'bg-emerald-500 text-white';
    if (value >= 99)  return 'bg-yellow-400 text-slate-900';
    return 'bg-rose-500 text-white';
  }
  if (value >= 100) return 'bg-emerald-500 text-white';
  if (value >= 95)  return 'bg-yellow-400 text-slate-900';
  return 'bg-rose-500 text-white';
}

function formatValue(value: number | null): string {
  if (value === null) return '–';
  return `${value.toFixed(2)}%`;
}

interface DashboardTabProps {
  selectedYear: number;
  onYearChange: (y: number) => void;
}

export function DashboardTab({ selectedYear, onYearChange }: DashboardTabProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* ── Control bar ── */}
      <div className="flex flex-wrap items-center gap-3 rounded-md border border-slate-200/90 bg-white px-3 py-2 shadow-sm">
        <Select
          value={String(selectedYear)}
          onValueChange={(v) => onYearChange(Number(v))}
        >
          <SelectTrigger className="h-8 w-[100px] border-slate-200 bg-white text-2sm shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {YEAR_OPTIONS.map((y) => (
              <SelectItem key={y} value={String(y)}>{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <p className="flex-1 text-xs text-slate-500">
          <span className="font-medium text-slate-700">Note:</span> {LOCK_NOTE}
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-slate-500">Operator ID:</span>
            <span className="rounded border border-slate-200 bg-[#f4f8fb] px-2 py-0.5 text-xs font-semibold text-slate-800">
              {OPERATOR_ID}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-slate-500">System Provider ID:</span>
            <span className="rounded border border-slate-200 bg-[#f4f8fb] px-2 py-0.5 text-xs font-semibold text-slate-800">
              {SYSTEM_PROVIDER_ID}
            </span>
          </div>
        </div>
      </div>

      {/* ── Dashboard card ── */}
      <div className="flex flex-col overflow-hidden rounded-md border border-slate-200/90 bg-white shadow-sm">
        {/* Card heading */}
        <div className="border-b border-slate-200 px-4 py-2.5">
          <h3 className="text-sm font-bold text-slate-800">DVSA Earned Recognition Dashboard</h3>
        </div>

        {/* Scrollable table */}
        <div className="overflow-x-auto [scrollbar-gutter:stable]">
          <table className="w-full min-w-[900px] border-collapse text-left">
            {/* ── Period header rows ── */}
            <thead>
              {/* Row 1: Reporting period labels */}
              <tr className="border-b border-slate-200 bg-[#f4f8fb]/80">
                <td className="w-[90px] px-3 py-2 text-xs font-medium text-slate-500">Reporting period (00)</td>
                <td className="w-[160px] px-3 py-2 text-xs font-medium text-slate-500" />
                {PERIODS.map((p) => (
                  <td key={p.period} className="px-2 py-2 text-center text-xs font-semibold text-blue-600">
                    {p.period}
                  </td>
                ))}
              </tr>
              {/* Row 2: Year */}
              <tr className="border-b border-slate-100 bg-[#f4f8fb]/40">
                <td className="px-3 py-1.5 text-xs text-slate-500">Year (0000)</td>
                <td className="px-3 py-1.5" />
                {PERIODS.map((p) => (
                  <td key={p.period} className="px-2 py-1.5 text-center text-xs tabular-nums text-slate-600">
                    {p.year}
                  </td>
                ))}
              </tr>
              {/* Row 3: Period status */}
              <tr className="border-b border-slate-200 bg-[#f4f8fb]/40">
                <td className="px-3 py-1.5 text-xs text-slate-500">Period status</td>
                <td className="px-3 py-1.5" />
                {PERIODS.map((p) => (
                  <td key={p.period} className="px-2 py-1.5 text-center">
                    {p.status === 'locked' && (
                      <Lock className="mx-auto h-3.5 w-3.5 text-slate-400" />
                    )}
                    {p.status === 'action' && (
                      <button
                        type="button"
                        className="inline-flex items-center gap-0.5 text-xs font-medium text-blue-600 hover:underline"
                      >
                        Action
                        <ExternalLink className="h-2.5 w-2.5" />
                      </button>
                    )}
                    {(p.status === 'pending' || p.status === null) && (
                      <span className="text-xs text-slate-300">–</span>
                    )}
                  </td>
                ))}
              </tr>
            </thead>

            {/* ── Metric rows ── */}
            <tbody>
              {/* Sub-header before metrics */}
              <tr className="border-b border-slate-200 bg-slate-100/60">
                <td className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-600">Code</td>
                <td className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-600">Description</td>
                {PERIODS.map((p) => (
                  <td key={p.period} className="px-2 py-2" />
                ))}
              </tr>

              {METRIC_ROWS.map((row, idx) => {
                if (row.isGroupHeader) {
                  return (
                    <tr key={`gh-${idx}`} className="border-b border-slate-200 bg-slate-100/60">
                      <td className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-600">Code</td>
                      <td className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-600">Description</td>
                      {PERIODS.map((p) => (
                        <td key={p.period} className="px-2 py-2" />
                      ))}
                    </tr>
                  );
                }

                return (
                  <tr
                    key={row.code}
                    className="border-b border-slate-100 transition-colors hover:bg-slate-50/60"
                  >
                    <td className="px-3 py-2 text-xs font-semibold text-slate-700">{row.code}</td>
                    <td className="px-3 py-2 text-xs text-slate-700">{row.description}</td>
                    {row.values.map((val, i) => (
                      <td key={i} className="px-1 py-1.5 text-center">
                        {val === null ? (
                          <span className="text-xs text-slate-300">–</span>
                        ) : (
                          <span
                            className={cn(
                              'inline-flex min-w-[58px] items-center justify-center rounded-sm px-1.5 py-0.5 text-xs font-semibold tabular-nums',
                              cellVariant(val, row.code),
                            )}
                          >
                            {formatValue(val)}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer note */}
        <div className="border-t border-slate-100 bg-[#f4f8fb]/60 px-4 py-2">
          <p className="text-xs text-slate-400">
            Please note that any changes you make to your reports will be updated the next day.
          </p>
        </div>
      </div>

      {/* Colour legend */}
      <div className="flex flex-wrap items-center gap-4 px-1">
        {[
          { color: 'bg-emerald-500', label: 'Compliant (100%)' },
          { color: 'bg-yellow-400',  label: 'Near threshold' },
          { color: 'bg-rose-500',    label: 'Below threshold' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className={cn('h-3 w-3 rounded-sm', color)} />
            <span className="text-xs text-slate-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
