import { cn } from '@/lib/utils';
import { DashCard, SectionWrapper, SectionTitle, RoleKpiTile, RoleProgressBar } from './DashboardPrimitives';

export function WorkshopView() {
  return (
    <div className="flex flex-col" style={{ gap: 'var(--section-gap)' }}>
      <SectionWrapper>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <RoleKpiTile label="Due This Week" value="14" color="#e8622a" bg="bg-[#fdeee6]" />
          <RoleKpiTile label="In Workshop" value="17" color="#3d6b8e" bg="bg-[#eef4f8]" />
          <RoleKpiTile label="Overdue" value="8" color="#DC2626" bg="bg-[#FEECEC]" />
          <RoleKpiTile label="Work Orders Open" value="18" color="#5a8aad" bg="bg-[#eef4f8]" />
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <DashCard variant="orange" className="p-2">
            <SectionTitle title="Work Orders" variant="orange" />
            <div className="grid grid-cols-3 gap-1 text-center">
              {[
                { label: 'Open', val: '18', clr: 'text-rose-500', bg: 'bg-rose-50/80', border: 'border-rose-100' },
                { label: 'Ongoing', val: '27', clr: 'text-orange-500', bg: 'bg-orange-50/80', border: 'border-orange-100' },
                { label: 'Done', val: '45', clr: 'text-emerald-500', bg: 'bg-emerald-50/80', border: 'border-emerald-100' },
              ].map(({ label, val, clr, bg, border }) => (
                <div key={label} className={cn('px-1 py-2 rounded-[6px] border', bg, border)}>
                  <p className="text-[8px] font-bold text-[#6b8299] uppercase tracking-widest">{label}</p>
                  <p className={cn('text-[16px] font-black mt-0.5', clr)}>{val}</p>
                </div>
              ))}
            </div>
          </DashCard>

          <DashCard variant="secondaryBlue" className="p-2">
            <SectionTitle title="Workshop Status" variant="secondaryBlue" />
            <div className="flex flex-col gap-2">
              <RoleProgressBar label="Bay occupancy" pct={78} color="#22C55E" />
              <RoleProgressBar label="Turnaround" pct={64} color="#e8622a" />
              <RoleProgressBar label="Technician availability" pct={83} color="#3d6b8e" />
            </div>
          </DashCard>

          <DashCard variant="secondaryBlue" className="p-2">
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
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <DashCard variant="orange" className="p-2.5">
          <SectionTitle title="Inventory Alerts" variant="orange" />
          <div className="flex flex-col gap-1.5">
            {[
              { label: 'Engine oil stock low', detail: '12 units', color: '#DC2626', bg: 'bg-[#FEECEC]', border: 'border-[#DC2626]/20' },
              { label: 'Brake pads critical', detail: '4 units', color: '#DC2626', bg: 'bg-[#FEECEC]', border: 'border-[#DC2626]/20' },
              { label: 'Tyre stock adequate', detail: '38 units', color: '#22C55E', bg: 'bg-[#EAF9F0]', border: 'border-[#22C55E]/20' },
            ].map(({ label, detail, color, bg, border }) => (
              <div key={label} className={cn('flex items-center justify-between px-2.5 py-1.5 rounded-[6px] border', bg, border)}>
                <span className="text-[10px] font-medium text-[#2e4258]">{label}</span>
                <span className="text-[10px] font-black" style={{ color }}>{detail}</span>
              </div>
            ))}
          </div>
        </DashCard>
      </SectionWrapper>
    </div>
  );
}
