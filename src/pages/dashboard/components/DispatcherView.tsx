import { Route, UserCheck } from 'lucide-react';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';
import {
  dashboardTableHeaderCellClass,
  dashboardTableHeaderRowClass,
} from '@/components/dashboard/GridTable';
import { DASHBOARD_TRIPS } from '../mockData';
import { DashCard, SectionWrapper, SectionTitle, RoleKpiTile } from './DashboardPrimitives';

const STATUS_STYLES: Record<string, string> = {
  Completed: 'bg-[#EAF9F0] text-[#22C55E] border-[#22C55E]/20',
  'In Progress': 'bg-[#eef4f8] text-[#3d6b8e] border-[#3d6b8e]/20',
  Delayed: 'bg-[#FEECEC] text-[#DC2626] border-[#DC2626]/20',
};

export function DispatcherView() {
  return (
    <div className="flex flex-col" style={{ gap: 'var(--section-gap)' }}>
      <SectionWrapper>
        <div className="grid grid-cols-3 gap-2">
          <RoleKpiTile label="Available Vehicles" value="166" color="#22C55E" bg="bg-[#EAF9F0]" />
          <RoleKpiTile label="Available Drivers" value="42" color="#3d6b8e" bg="bg-[#eef4f8]" />
          <RoleKpiTile label="Delayed Trips" value="7" color="#DC2626" bg="bg-[#FEECEC]" />
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DashCard variant="blue" className="p-0 overflow-hidden">
              <div className="px-2.5 py-2 bg-white border-b border-[#e8eef4]">
                <SectionTitle title="Dispatch Queue" variant="blue" className="mb-0" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className={dashboardTableHeaderRowClass}>
                      {['Trip ID', 'Route', 'Duration', 'Status', 'Type', 'Action'].map((h) => (
                        <th key={h} className={cn(dashboardTableHeaderCellClass, 'px-3 py-1.5')}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DASHBOARD_TRIPS.map((t, i) => (
                      <tr key={t.id} className={cn('border-b border-[#f0f4f8] hover:bg-[#f4f8fb]', i % 2 === 1 && 'bg-[#fafcfd]')}>
                        <td className="h-[36px] px-3 align-middle text-[10px] font-bold text-[#2e4258]">{t.id}</td>
                        <td className="h-[36px] px-3 align-middle text-[10px] font-medium text-[#2e4258]">{t.route}</td>
                        <td className="h-[36px] px-3 align-middle text-[10px] text-[#4f6478]">{t.dur}</td>
                        <td className="h-[36px] px-3 align-middle">
                          <span className={cn('px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider border', STATUS_STYLES[t.status] ?? 'bg-slate-100 text-slate-500 border-slate-200')}>
                            {t.status}
                          </span>
                        </td>
                        <td className="h-[36px] px-3 align-middle text-[10px] text-[#4f6478]">{t.type}</td>
                        <td className="h-[36px] px-3 align-middle">
                          <button className="px-2 py-0.5 rounded-[4px] text-[8px] font-black uppercase tracking-wider bg-[#3d6b8e] text-white hover:bg-[#2e5270] transition-colors">
                            Assign
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DashCard>
          </div>

          <div className="flex flex-col gap-3">
            <DashCard variant="blue" className="p-2.5">
              <SectionTitle title="Quick Actions" variant="blue" />
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Create Trip', icon: Route, color: '#3d6b8e', bg: 'bg-[#dce8f0]', to: '/trips/new' },
                  { label: 'Assign Driver', icon: UserCheck, color: '#22C55E', bg: 'bg-[#22C55E]/10', to: '/drivers/assign' },
                ].map(({ label, icon: Icon, color, bg, to }) => (
                  <Link key={label} to={to} className="group flex flex-col items-center justify-center gap-2 px-2 py-3.5 rounded-[8px] border border-[#e8eef4] bg-white transition-all hover:border-transparent hover:shadow-md hover:translate-y-[-1px]">
                    <div className={cn('w-8 h-8 rounded-[6px] flex items-center justify-center', bg)}>
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <span className="text-[9px] font-black text-[#4f6478] uppercase tracking-wider text-center">{label}</span>
                  </Link>
                ))}
              </div>
            </DashCard>

            <DashCard variant="red" className="p-2.5">
              <SectionTitle title="Delayed Trips" variant="red" />
              <div className="flex flex-col gap-1">
                {DASHBOARD_TRIPS.filter((t) => t.status === 'Delayed').map((t) => (
                  <div key={t.id} className="flex items-center gap-2 px-2 py-1.5 rounded-[6px] bg-[#FEECEC] border-l-2 border-l-[#DC2626]">
                    <span className="text-[9px] font-black text-[#DC2626] shrink-0">{t.id}</span>
                    <span className="text-[9px] font-medium text-[#2e4258] flex-1 truncate">{t.route}</span>
                    <span className="text-[8px] font-black text-[#DC2626]">{t.dur}</span>
                  </div>
                ))}
              </div>
            </DashCard>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
