import { Star } from 'lucide-react';
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { ANALYTICS_TREND, DASHBOARD_DRIVERS } from '../mockData';
import { DashCard, SectionWrapper, SectionTitle, RoleKpiTile, RoleProgressBar } from './DashboardPrimitives';

export function CEOView() {
  return (
    <div className="flex flex-col" style={{ gap: 'var(--section-gap)' }}>
      <SectionWrapper>
        <div className="grid grid-cols-3 gap-2">
          <RoleKpiTile label="Total Revenue" value="$2.4M" color="#22C55E" bg="bg-[#EAF9F0]" />
          <RoleKpiTile label="Fleet Utilization" value="72%" color="#3d6b8e" bg="bg-[#eef4f8]" />
          <RoleKpiTile label="Active Vehicles" value="311" color="#5a8aad" bg="bg-[#eef4f8]" />
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <DashCard variant="blue" className="p-2.5 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(61,107,142,0.12)] hover:translate-y-[-1px]">
            <SectionTitle title="Monthly Revenue Trend" variant="blue" />
            <div className="h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ANALYTICS_TREND} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#d4e0ea" strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ border: 'none', borderRadius: 8, boxShadow: '0 8px 24px rgba(61,107,142,0.14)', background: '#fff', fontSize: 11, fontWeight: 700, color: '#1e3448', padding: '6px 10px' }} cursor={{ stroke: '#3d6b8e', strokeWidth: 1, strokeDasharray: '4 2' }} />
                  <Area type="monotoneX" dataKey="efficiency" name="Revenue %" stroke="#3d6b8e" strokeWidth={2.5} fill="url(#revenueGrad)" dot={false} activeDot={{ r: 4, fill: '#3d6b8e', strokeWidth: 0 }} />
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3d6b8e" stopOpacity={0.18} />
                      <stop offset="100%" stopColor="#3d6b8e" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </DashCard>

          <DashCard variant="secondaryBlue" className="p-2.5 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(61,107,142,0.12)] hover:translate-y-[-1px]">
            <SectionTitle title="Fleet Health Summary" variant="secondaryBlue" />
            <div className="flex flex-col gap-3 mt-1">
              <RoleProgressBar label="Roadworthy" pct={84} color="#22C55E" />
              <RoleProgressBar label="Off Road" pct={9} color="#3d6b8e" />
              <RoleProgressBar label="Under Inspection" pct={7} color="#5a8aad" />
            </div>
          </DashCard>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <DashCard variant="red" className="p-2.5 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(220,38,38,0.10)] hover:translate-y-[-1px]">
            <div className="flex items-center justify-between mb-2.5">
              <SectionTitle title="Major Alerts" variant="red" className="mb-0" />
              <span className="text-[10px] font-black text-white bg-[#DC2626] px-2.5 py-1 rounded-full shadow-[0_2px_8px_rgba(220,38,38,0.30)] leading-none">17</span>
            </div>
            <div className="flex items-start gap-2 p-2 rounded-[6px] bg-[#FEECEC]/60 border border-[#DC2626]/12">
              <div className="w-1.5 h-1.5 rounded-full bg-[#DC2626] shrink-0 mt-1 animate-pulse" />
              <p className="text-[10px] leading-relaxed text-[#3d2020]">17 active alerts require executive attention. Fleet-wide safety score is <span className="font-black text-[#DC2626]">at risk</span>.</p>
            </div>
          </DashCard>

          <DashCard variant="green" className="p-2.5 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(61,107,142,0.12)] hover:translate-y-[-1px]">
            <SectionTitle title="Top Performing Drivers" variant="green" />
            <div className="flex flex-col divide-y divide-[#f0f4f8]">
              {DASHBOARD_DRIVERS.slice(0, 2).map((d) => (
                <div key={d.name} className="flex items-center gap-2 py-2 first:pt-0 last:pb-0 transition-colors duration-150 hover:bg-[#f4f8fb] rounded-[4px] px-1.5 -mx-1.5 cursor-default">
                  <div className="w-6 h-6 rounded-[5px] flex items-center justify-center text-[9px] font-bold text-[#22C55E] border border-[#22C55E]/25 bg-[#EAF9F0] shrink-0">
                    {d.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <span className="text-[10px] font-semibold text-[#2e4258] flex-1">{d.name}</span>
                  <div className="flex items-center gap-0.5 text-[#e8622a] text-[8px] bg-[#fdeee6] px-1.5 py-0.5 rounded-full border border-[#e8622a]/15 font-bold">
                    {d.rating} <Star className="w-2 h-2 fill-current ml-0.5" />
                  </div>
                  <span className="text-[10px] font-black text-[#22C55E] tabular-nums">{d.perf}%</span>
                </div>
              ))}
            </div>
          </DashCard>
        </div>
      </SectionWrapper>
    </div>
  );
}
