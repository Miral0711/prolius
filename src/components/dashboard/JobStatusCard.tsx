import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { AnalyticsCard } from './AnalyticsCard';
import { ChartPanel } from './ChartPanel';

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

export function JobStatusCard() {
  return (
    <AnalyticsCard title="Job Status Pipeline (7 Days)">
      <ChartPanel height={130}>
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            data={JOB_STATUS_DATA}
            margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
          >
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
      <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        <div className="rounded-md bg-slate-50 px-2.5 py-1.5">
          <p className="text-[10px] font-medium uppercase text-slate-500">
            Booking
          </p>
          <p className="text-sm font-semibold text-slate-800">328</p>
        </div>
        <div className="rounded-md bg-slate-50 px-2.5 py-1.5">
          <p className="text-[11px] text-slate-500">Completed</p>
          <p className="text-sm font-semibold text-emerald-600">289</p>
        </div>
        <div className="rounded-md bg-slate-50 px-2.5 py-1.5">
          <p className="text-xs text-slate-500">Cancelled</p>
          <p className="text-sm font-semibold text-rose-600">22</p>
        </div>
        <div className="rounded-md bg-slate-50 px-2.5 py-1.5">
          <p className="text-[11px] text-slate-500">Total</p>
          <p className="text-sm font-semibold text-slate-800">350</p>
        </div>
      </div>
    </AnalyticsCard>
  );
}
