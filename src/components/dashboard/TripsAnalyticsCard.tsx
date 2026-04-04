import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { AnalyticsCard } from './AnalyticsCard';
import { ChartPanel } from './ChartPanel';
import { MetricGrid, type MetricItem } from './MetricGrid';

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

const TRIPS_SUMMARY: MetricItem[] = [
  { label: 'Total Rev', value: 'SAR 125,932' },
  { label: 'Total Trips', value: '344,550' },
  { label: 'Avg Trip', value: '42 min' },
  { label: 'Week Rev', value: 'SAR 28,450' },
];

export function TripsAnalyticsCard() {
  return (
    <AnalyticsCard title="Drivers On Trip (7 Days)">
      <ChartPanel height={200}>
        <ChartContainer config={chartConfig} className="h-full w-full">
          <LineChart data={DRIVERS_ON_TRIP_DATA} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
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
      <MetricGrid items={TRIPS_SUMMARY} cols={4} pill className="mt-1.5" />
    </AnalyticsCard>
  );
}
