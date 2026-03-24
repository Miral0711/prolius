import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { DashboardCard } from './DashboardCard';

const trendData = [
  { day: 'Mon', value: 420 },
  { day: 'Tue', value: 428 },
  { day: 'Wed', value: 432 },
  { day: 'Thu', value: 425 },
  { day: 'Fri', value: 438 },
  { day: 'Sat', value: 445 },
  { day: 'Sun', value: 450 },
];

const chartConfig: ChartConfig = {
  value: { label: 'Active', color: '#3b82f6' },
};

export function FleetOverviewCard() {
  return (
    <DashboardCard>
      <h3 className="mb-1 text-xs font-semibold text-slate-800">
        Fleet Overview
      </h3>
      <div className="grid grid-cols-2 gap-1">
        <div>
          <p className="text-[11px] text-slate-500">Total Vehicles</p>
          <p className="text-sm font-semibold text-slate-800">450</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Active</p>
          <p className="text-sm font-semibold text-slate-800">425</p>
        </div>
        <div className="col-span-2">
          <p className="text-[11px] text-slate-500">Utilization Rate</p>
          <div className="mt-0.5 flex items-center gap-1">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: '95.3%' }}
              />
            </div>
            <span className="text-xs font-medium text-emerald-600">95.3%</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-500">Total Drivers</p>
          <p className="text-sm font-semibold text-slate-800">126</p>
        </div>
      </div>
      <div className="mt-1 h-8">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 10 }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 10 }} hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="value"
              type="monotone"
              stroke="#3b82f6"
              fill="#93c5fd"
              fillOpacity={0.5}
              strokeWidth={1.5}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </DashboardCard>
  );
}
