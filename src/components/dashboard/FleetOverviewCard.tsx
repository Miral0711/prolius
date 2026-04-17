import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { DashboardCard } from './DashboardCard';
import { MetricGrid, type MetricItem } from './MetricGrid';

export interface FleetTrendPoint {
  day: string;
  value: number;
}

export interface FleetOverviewCardProps {
  title?: string;
  metrics?: MetricItem[];
  trendData?: FleetTrendPoint[];
  utilizationRate?: number;
  utilizationLabel?: string;
}

const DEFAULT_TREND: FleetTrendPoint[] = [
  { day: 'Mon', value: 420 },
  { day: 'Tue', value: 428 },
  { day: 'Wed', value: 432 },
  { day: 'Thu', value: 425 },
  { day: 'Fri', value: 438 },
  { day: 'Sat', value: 445 },
  { day: 'Sun', value: 450 },
];

const DEFAULT_METRICS: MetricItem[] = [
  { label: 'Total Vehicles', value: '450' },
  { label: 'Active', value: '425' },
  { label: 'Total Drivers', value: '126' },
];

const chartConfig: ChartConfig = {
  value: { label: 'Active', color: '#3b82f6' },
};

export function FleetOverviewCard({
  title = 'Fleet Overview',
  metrics = DEFAULT_METRICS,
  trendData = DEFAULT_TREND,
  utilizationRate = 95.3,
  utilizationLabel,
}: FleetOverviewCardProps) {
  const displayLabel = utilizationLabel ?? `${utilizationRate}%`;

  return (
    <DashboardCard>
      <h3 className={cn(typography.cardTitle, 'mb-1')}>{title}</h3>
      <MetricGrid items={metrics} cols={2} />
      {/* Utilization bar */}
      <div className="mt-1">
        <p className={cn(typography.label, 'text-slate-500')}>Utilization Rate</p>
        <div className="mt-0.5 flex items-center gap-1">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${utilizationRate}%` }} />
          </div>
          <span className="text-[14px] font-semibold text-emerald-600">{displayLabel}</span>
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
