import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { AnalyticsCard } from './AnalyticsCard';
import { ChartPanel } from './ChartPanel';

const HOURLY_DATA = [
  { hour: '6', activity: 12 },
  { hour: '8', activity: 45 },
  { hour: '10', activity: 78 },
  { hour: '12', activity: 92 },
  { hour: '14', activity: 85 },
  { hour: '16', activity: 95 },
  { hour: '18', activity: 88 },
  { hour: '20', activity: 52 },
  { hour: '22', activity: 28 },
];

const chartConfig: ChartConfig = {
  activity: { label: 'Activity', color: '#06b6d4' },
};

export function HourlyActivityCard() {
  return (
    <AnalyticsCard title="Hourly Activity">
      <ChartPanel height={120}>
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            data={HOURLY_DATA}
            margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="hour" tick={{ fill: '#64748b', fontSize: 10 }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 10 }} hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="activity" fill="#06b6d4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </ChartPanel>
      <div className="mt-1 flex justify-between text-[11px]">
        <div>
          <span className="text-slate-500">Peak Hour: </span>
          <span className="font-medium text-slate-700">4:00 PM</span>
        </div>
        <div>
          <span className="text-slate-500">Peak Trips: </span>
          <span className="font-medium text-slate-700">95</span>
        </div>
      </div>
    </AnalyticsCard>
  );
}
