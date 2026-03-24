import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { AnalyticsCard } from './AnalyticsCard';
import { ChartPanel } from './ChartPanel';

const DRIVERS_ON_TRIP_DATA = [
  { day: 'Mon', drivers: 85 },
  { day: 'Tue', drivers: 92 },
  { day: 'Wed', drivers: 88 },
  { day: 'Thu', drivers: 95 },
  { day: 'Fri', drivers: 98 },
  { day: 'Sat', drivers: 72 },
  { day: 'Sun', drivers: 65 },
];

const chartConfig: ChartConfig = {
  drivers: { label: 'Drivers on Trip', color: '#3b82f6' },
};

export function TripsAnalyticsCard() {
  return (
    <AnalyticsCard title="Drivers On Trip (7 Days)">
      <ChartPanel height={200}>
        <ChartContainer config={chartConfig} className="h-full w-full">
          <LineChart
            data={DRIVERS_ON_TRIP_DATA}
            margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="drivers"
              type="monotone"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 3 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </ChartPanel>
      <div className="mt-1.5 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        <div className="rounded-md bg-slate-50 px-2.5 py-1.5">
          <p className="text-[11px] text-slate-500">Total Rev</p>
          <p className="text-sm font-semibold text-slate-800">SAR 125,932</p>
        </div>
        <div className="rounded-md bg-slate-50 px-2.5 py-1.5">
          <p className="text-[11px] text-slate-500">Total Trips</p>
          <p className="text-sm font-semibold text-slate-800">344,550</p>
        </div>
        <div className="rounded-md bg-slate-50 px-2.5 py-1.5">
          <p className="text-[11px] text-slate-500">Avg Trip</p>
          <p className="text-sm font-semibold text-slate-800">42 min</p>
        </div>
        <div className="rounded-md bg-slate-50 px-2.5 py-1.5">
          <p className="text-[11px] text-slate-500">Week Rev</p>
          <p className="text-sm font-semibold text-slate-800">SAR 28,450</p>
        </div>
      </div>
    </AnalyticsCard>
  );
}
