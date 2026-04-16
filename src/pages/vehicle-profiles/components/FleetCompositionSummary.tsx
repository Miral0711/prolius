import { useMemo } from 'react';
import type { VehicleProfileRow } from '../mock-data';

interface FleetCompositionSummaryProps {
  rows: VehicleProfileRow[];
}

export function FleetCompositionSummary({ rows }: FleetCompositionSummaryProps) {
  const { total, breakdown, dominantType, isBalanced } = useMemo(() => {
    const counts: Record<string, number> = {};
    let sum = 0;
    for (const row of rows) {
      counts[row.type] = (counts[row.type] ?? 0) + row.vehicleCount;
      sum += row.vehicleCount;
    }
    // Sort by count descending (highest % first)
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const topPct = sum > 0 && sorted.length > 0 ? Math.round((sorted[0][1] / sum) * 100) : 0;
    const dominant = topPct > 40 ? sorted[0][0] : null;
    return { total: sum, breakdown: sorted, dominantType: dominant, isBalanced: !dominant };
  }, [rows]);

  if (rows.length === 0) return null;

  return (
    <div className="mb-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5">
      {/* Label */}
      <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        Fleet Composition
      </div>

      {/* Main row */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <div className="flex items-center gap-1.5">
          <span className="text-2sm font-semibold text-slate-500">Total Vehicles</span>
          <span className="text-2sm font-bold text-slate-800">{total.toLocaleString()}</span>
        </div>
        <div className="h-4 w-px bg-slate-200" />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {breakdown.map(([type, count], i) => {
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            const isDominant = i === 0 && !!dominantType;
            return (
              <div key={type} className="flex items-center gap-1.5">
                <span className={`text-2sm font-medium ${isDominant ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>
                  {type}
                </span>
                <span
                  className={`rounded px-1.5 py-0.5 text-2sm font-semibold ${
                    isDominant
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Insight line */}
      <div className="mt-1.5 text-[11px] text-slate-400">
        {isBalanced
          ? 'Fleet distribution is balanced'
          : `Fleet is heavily dominated by ${dominantType}`}
      </div>
    </div>
  );
}
