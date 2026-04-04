import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { AnalyticsCard } from './AnalyticsCard';
import { ChartPanel } from './ChartPanel';
import { MetricGrid, type MetricItem } from './MetricGrid';

const JOB_STATUS_DATA = [
  { day: 'Mon', booking: 45, completed: 38, cancelled: 3 },
  { day: 'Tue', booking: 52, completed: 48, cancelled: 2 },
  { day: 'Wed', booking: 48, completed: 42, cancelled: 4 },
  { day: 'Thu', booking: 55, completed: 50, cancelled: 2 },
  { day: 'Fri', booking: 62, completed: 55, cancelled: 5 },
  { day: 'Sat', booking: 38, completed: 32, cancelled: 4 },
  { day: 'Sun', booking: 28, completed: 24, cancelled: 2 },
];

const chartConfig: ChartConfig = {
  booking: { label: 'Booking', color: '#3b82f6' },
  completed: { label: 'Completed', color: '#10b981' },
  cancelled: { label: 'Cancelled', color: '#ef4444' },
};

const JOB_SUMMARY: MetricItem[] = [
  { label: 'Booking', value: '328' },
  { label: 'Completed', value: '289', valueColor: 'text-emerald-600' },
  { label: 'Cancelled', value: '22', valueColor: 'text-rose-600' },
  { label: 'Total', value: '350' },
];

export function JobStatusCard() {
  return (
    <AnalyticsCard title="Job Status Pipeline (7 Days)">
      <ChartPanel height={130}>
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart data={JOB_STATUS_DATA} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="booking" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="cancelled" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </ChartPanel>
      <MetricGrid items={JOB_SUMMARY} cols={4} pill className="mt-2" />
    </AnalyticsCard>
  );
}
