import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  dashboardTableHeaderCellClass,
  dashboardTableHeaderRowClass,
} from '@/components/dashboard/GridTable';
import { DASHBOARD_DRIVERS, DASHBOARD_TRIPS } from '../mockData';
import { DashCard, SectionWrapper, SectionTitle, RoleKpiTile, RoleProgressBar } from './DashboardPrimitives';

const STATUS_STYLES: Record<string, string> = {
  Completed: 'bg-[#EAF9F0] text-[#22C55E] border-[#22C55E]/20',
  'In Progress': 'bg-[#eef4f8] text-[#3d6b8e] border-[#3d6b8e]/20',
  Delayed: 'bg-[#FEECEC] text-[#DC2626] border-[#DC2626]/20',
};

export function ManagerView() {
  return (
    <div className="flex flex-col" style={{ gap: 'var(--section-gap)' }}>
      <SectionWrapper>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <RoleKpiTile label="Active Vehicles" value="311" color="#3d6b8e" bg="bg-[#eef4f8]" />
          <RoleKpiTile label="Drivers on Duty" value="126" color="#22C55E" bg="bg-[#EAF9F0]" />
          <RoleKpiTile label="Delayed Trips" value="7" color="#DC2626" bg="bg-[#FEECEC]" />
          <RoleKpiTile label="Inspections Due" value="3" color="#e8622a" bg="bg-[#fdeee6]" />
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {/* Driver Performance Table */}
          <DashCard variant="green" className="p-0 overflow-hidden">
            <div className="px-2.5 py-2 bg-white border-b border-[#e8eef4]">
              <SectionTitle title="Driver Performance" variant="green" className="mb-0" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className={dashboardTableHeaderRowClass}>
                    {['Rank', 'Driver', 'Score', 'Perf', 'Trend'].map((h) => (
                      <th key={h} className={cn(dashboardTableHeaderCellClass, 'px-3 py-1.5')}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DASHBOARD_DRIVERS.map((d, i) => (
                    <tr key={d.name} className={cn('border-b border-[#f0f4f8] hover:bg-[#f4f8fb]', i % 2 === 1 && 'bg-[#fafcfd]')}>
                      <td className="h-[34px] px-3 align-middle">
                        <div className={cn('w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black border',
                          d.rank === 1 ? 'bg-amber-50 text-amber-600 border-amber-200' : d.rank === 2 ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-[#eef4f8] text-[#5a8aad] border-[#d4e0ea]'
                        )}>{d.rank}</div>
                      </td>
                      <td className="h-[34px] px-3 align-middle text-[10px] font-medium text-[#2e4258]">{d.name}</td>
                      <td className="h-[34px] px-3 align-middle text-[10px] font-bold text-[#2e4258]">{d.score}</td>
                      <td className="h-[34px] px-3 align-middle">
                        <div className="flex items-center gap-1 w-20">
                          <div className="flex-1 h-1 bg-[#dce8f0] rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${d.perf}%`, backgroundColor: d.perf >= 90 ? '#22C55E' : '#3d6b8e' }} />
                          </div>
                          <span className="text-[9px] font-bold text-[#2e4258]">{d.perf}%</span>
                        </div>
                      </td>
                      <td className="h-[34px] px-3 align-middle">
                        {d.trend === 'up'
                          ? <span className="inline-flex items-center gap-0.5 text-[#22C55E] text-[8px] font-black"><ArrowUpRight className="w-3 h-3" />Up</span>
                          : <span className="inline-flex items-center gap-0.5 text-[#DC2626] text-[8px] font-black"><ArrowDownRight className="w-3 h-3" />Down</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashCard>

          {/* Recent Trips Table */}
          <DashCard variant="blue" className="p-0 overflow-hidden">
            <div className="px-2.5 py-2 bg-white border-b border-[#e8eef4]">
              <SectionTitle title="Recent Trips" variant="blue" className="mb-0" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className={dashboardTableHeaderRowClass}>
                    {['ID', 'Route', 'Dur', 'Status'].map((h) => (
                      <th key={h} className={cn(dashboardTableHeaderCellClass, 'px-3 py-1.5')}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DASHBOARD_TRIPS.map((t, i) => (
                    <tr key={t.id} className={cn('border-b border-[#f0f4f8] hover:bg-[#f4f8fb]', i % 2 === 1 && 'bg-[#fafcfd]')}>
                      <td className="h-[34px] px-3 align-middle text-[10px] font-bold text-[#2e4258]">{t.id}</td>
                      <td className="h-[34px] px-3 align-middle text-[10px] font-medium text-[#2e4258]">{t.route}</td>
                      <td className="h-[34px] px-3 align-middle text-[10px] text-[#4f6478]">{t.dur}</td>
                      <td className="h-[34px] px-3 align-middle">
                        <span className={cn('px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider border', STATUS_STYLES[t.status] ?? 'bg-slate-100 text-slate-500 border-slate-200')}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashCard>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <DashCard variant="secondaryBlue" className="p-2.5">
            <SectionTitle title="Upcoming Inspections" variant="secondaryBlue" />
            <div className="flex flex-col gap-1">
              {[
                { time: '08:30', vehicle: 'VH-141', task: 'Pre-trip check' },
                { time: '10:15', vehicle: 'VH-207', task: 'Brake review' },
                { time: '13:00', vehicle: 'VH-080', task: 'Annual fitness' },
              ].map((item) => (
                <div key={item.vehicle} className="flex items-center gap-2 px-2 py-1.5 rounded-[6px] bg-[#f4f8fb] border-l-2 border-l-[#5a8aad]">
                  <span className="text-[9px] font-black text-[#5a8aad] w-9 shrink-0">{item.time}</span>
                  <span className="text-[9px] font-black text-[#1e3448] shrink-0">{item.vehicle}</span>
                  <span className="text-[9px] font-medium text-[#6b8299] truncate">{item.task}</span>
                </div>
              ))}
            </div>
          </DashCard>
          <DashCard variant="secondaryBlue" className="p-2.5">
            <SectionTitle title="Fleet Availability" variant="secondaryBlue" />
            <div className="flex flex-col gap-2 mt-1">
              <RoleProgressBar label="Vehicle availability" pct={84} color="#5a8aad" />
            </div>
          </DashCard>
        </div>
      </SectionWrapper>
    </div>
  );
}
