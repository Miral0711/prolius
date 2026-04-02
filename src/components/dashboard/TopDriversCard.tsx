import { Trophy } from 'lucide-react';
import { DashboardCard } from './DashboardCard';
import { TOP_DRIVERS } from '@/pages/dashboard/mockData';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

export function TopDriversCard() {
  return (
    <DashboardCard className="!p-0 !rounded-lg overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <Trophy className="h-3.5 w-3.5 text-amber-500" />
          <h3 className={typography.cardTitle}>Top Drivers</h3>
        </div>
        <span className={cn(typography.meta, 'text-slate-400')}>This month</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px]">
          <thead>
            <tr className="bg-slate-50/70">
              <th className={cn('px-4 py-2 text-left uppercase tracking-[0.04rem] text-slate-500', typography.tableHeader)}>#</th>
              <th className={cn('px-3 py-2 text-left uppercase tracking-[0.04rem] text-slate-500', typography.tableHeader)}>Driver</th>
              <th className={cn('px-3 py-2 text-right uppercase tracking-[0.04rem] text-slate-500', typography.tableHeader)}>Trips</th>
              <th className={cn('px-3 py-2 text-right uppercase tracking-[0.04rem] text-slate-500', typography.tableHeader)}>Revenue</th>
              <th className={cn('px-3 py-2 text-right uppercase tracking-[0.04rem] text-slate-500', typography.tableHeader)}>Avg Duration</th>
              <th className={cn('px-3 py-2 text-right uppercase tracking-[0.04rem] text-slate-500', typography.tableHeader)}>Distance</th>
            </tr>
          </thead>
          <tbody>
            {TOP_DRIVERS.map((d, i) => (
              <tr key={d.rank} className={`border-t border-slate-100 ${i % 2 === 1 ? 'bg-slate-50/30' : ''}`}>
                <td className="px-4 py-2">
                  <span
                    className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium
                      ${d.rank === 1 ? 'bg-amber-100 text-amber-700'
                        : d.rank === 2 ? 'bg-slate-200 text-slate-700'
                        : d.rank === 3 ? 'bg-orange-100 text-orange-700'
                        : 'bg-slate-100 text-slate-500'}`}
                  >
                    {d.rank}
                  </span>
                </td>
                <td className={cn('px-3 py-2 text-slate-800', typography.tableCell)}>{d.name}</td>
                <td className={cn('px-3 py-2 text-right text-slate-700', typography.tableCell)}>{d.trips}</td>
                <td className={cn('px-3 py-2 text-right text-emerald-600', typography.tableCell)}>{d.revenue}</td>
                <td className={cn('px-3 py-2 text-right text-slate-500', typography.tableCell)}>{d.avgDuration}</td>
                <td className={cn('px-3 py-2 text-right text-slate-500', typography.tableCell)}>{d.distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}


