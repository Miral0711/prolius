import { Trophy } from 'lucide-react';
import { DashboardCard } from './DashboardCard';
import { TOP_DRIVERS } from '@/pages/dashboard/mockData';

export function TopDriversCard() {
  return (
    <DashboardCard className="!p-0 !rounded-xl overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <Trophy className="h-3.5 w-3.5 text-amber-500" />
          <h3 className="text-xs font-semibold text-slate-800">Top Drivers</h3>
        </div>
        <span className="text-[11px] text-slate-400">This month</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px]">
          <thead>
            <tr className="bg-slate-50/70">
              <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">#</th>
              <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Driver</th>
              <th className="px-3 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500">Trips</th>
              <th className="px-3 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500">Revenue</th>
              <th className="px-3 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500">Avg Duration</th>
              <th className="px-3 py-2 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500">Distance</th>
            </tr>
          </thead>
          <tbody>
            {TOP_DRIVERS.map((d, i) => (
              <tr key={d.rank} className={`border-t border-slate-100 ${i % 2 === 1 ? 'bg-slate-50/30' : ''}`}>
                <td className="px-4 py-2">
                  <span
                    className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium
                      ${d.rank === 1 ? 'bg-amber-100 text-amber-700'
                        : d.rank === 2 ? 'bg-slate-200 text-slate-700'
                        : d.rank === 3 ? 'bg-orange-100 text-orange-700'
                        : 'bg-slate-100 text-slate-500'}`}
                  >
                    {d.rank}
                  </span>
                </td>
                <td className="px-3 py-2 text-xs font-semibold text-slate-800">{d.name}</td>
                <td className="px-3 py-2 text-right text-[11px] text-slate-700">{d.trips}</td>
                <td className="px-3 py-2 text-right text-[11px] font-semibold text-emerald-600">{d.revenue}</td>
                <td className="px-3 py-2 text-right text-[11px] text-slate-500">{d.avgDuration}</td>
                <td className="px-3 py-2 text-right text-[11px] text-slate-500">{d.distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}
