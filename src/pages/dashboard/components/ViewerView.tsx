import { cn } from '@/lib/utils';
import {
  dashboardTableHeaderCellClass,
  dashboardTableHeaderRowClass,
} from '@/components/dashboard/GridTable';
import { DASHBOARD_TRIPS } from '../mockData';
import { DashCard, SectionWrapper, SectionTitle, RoleKpiTile, RoleProgressBar } from './DashboardPrimitives';

const STATUS_STYLES: Record<string, string> = {
  Completed: 'bg-[#EAF9F0] text-[#22C55E] border-[#22C55E]/20',
  'In Progress': 'bg-[#eef4f8] text-[#3d6b8e] border-[#3d6b8e]/20',
  Delayed: 'bg-[#FEECEC] text-[#DC2626] border-[#DC2626]/20',
};

export function ViewerView() {
  return (
    <div className="flex flex-col" style={{ gap: 'var(--section-gap)' }}>
      <SectionWrapper>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <RoleKpiTile label="Total Vehicles" value="512" color="#3d6b8e" bg="bg-[#eef4f8]" />
          <RoleKpiTile label="Active Drivers" value="126" color="#22C55E" bg="bg-[#EAF9F0]" />
          <RoleKpiTile label="Vehicles On Trip" value="311" color="#5a8aad" bg="bg-[#eef4f8]" />
          <RoleKpiTile label="Fleet Availability" value="91.4%" color="#22C55E" bg="bg-[#EAF9F0]" />
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <DashCard variant="secondaryBlue" className="p-2.5">
            <SectionTitle title="Fleet Health" variant="secondaryBlue" />
            <div className="flex flex-col gap-2">
              <RoleProgressBar label="Roadworthy" pct={84} color="#22C55E" />
              <RoleProgressBar label="Off Road" pct={9} color="#3d6b8e" />
              <RoleProgressBar label="Under Inspection" pct={7} color="#5a8aad" />
            </div>
          </DashCard>

          <DashCard variant="blue" className="p-0 overflow-hidden">
            <div className="px-2.5 py-2 bg-white border-b border-[#e8eef4]">
              <SectionTitle title="Recent Trips" variant="blue" className="mb-0" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className={dashboardTableHeaderRowClass}>
                    {['Trip ID', 'Route', 'Duration', 'Status'].map((h) => (
                      <th key={h} className={cn(dashboardTableHeaderCellClass, 'px-3 py-1.5')}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DASHBOARD_TRIPS.map((t, i) => (
                    <tr key={t.id} className={cn('border-b border-[#f0f4f8]', i % 2 === 1 && 'bg-[#fafcfd]')}>
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
    </div>
  );
}
