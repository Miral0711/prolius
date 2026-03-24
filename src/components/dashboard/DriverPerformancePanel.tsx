import { TOP_DRIVERS } from '@/pages/dashboard/mockData';
import { Cell, Pie, PieChart } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { AnalyticsCard } from './AnalyticsCard';
import { DataTableCard } from './DataTableCard';
import type { LeaderboardItem } from './CompactLeaderboard';

export interface DriverAvailabilityItem {
  name: string;
  value: number;
  color: string;
}

export interface DriverMetricItem {
  label: string;
  value: string;
}

const DEFAULT_AVAILABILITY_DATA: DriverAvailabilityItem[] = [
  { name: 'Available', value: 45, color: '#10b981' },
  { name: 'On Duty', value: 52, color: '#3b82f6' },
  { name: 'Offline', value: 29, color: '#64748b' },
];

const DEFAULT_SUMMARY_METRICS: DriverMetricItem[] = [
  { label: 'Total Drivers', value: '126' },
  { label: 'Avg Duty Hours', value: '8.2 hr' },
  { label: 'Avg Shift', value: '6.5 hr' },
];

export interface DriverPerformancePanelProps {
  availabilityData?: DriverAvailabilityItem[];
  topDrivers?: LeaderboardItem[];
  summaryMetrics?: DriverMetricItem[];
  availabilityTitle?: string;
  topDriversTitle?: string;
  className?: string;
}

export function DriverPerformancePanel({
  availabilityData = DEFAULT_AVAILABILITY_DATA,
  topDrivers = TOP_DRIVERS,
  summaryMetrics = DEFAULT_SUMMARY_METRICS,
  availabilityTitle = 'Driver Availability',
  topDriversTitle = 'Top Drivers',
  className,
}: DriverPerformancePanelProps = {}) {
  return (
    <div className={`grid grid-cols-1 gap-4 lg:grid-cols-2 ${className ?? ''}`}>
      <AnalyticsCard title={availabilityTitle}>
        <div className="flex items-center gap-2">
          <div className="h-16 w-16 shrink-0">
            <ChartContainer config={{}} className="h-full w-full">
              <PieChart>
                <Pie
                  data={availabilityData}
                  dataKey="value"
                  innerRadius={16}
                  outerRadius={36}
                  paddingAngle={2}
                >
                  {availabilityData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
          <div className="min-w-0 flex-1 space-y-1.5">
            {availabilityData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-2"
              >
                <span className="text-xs text-slate-600">{item.name}</span>
                <span className="text-xs font-medium text-slate-700">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-1.5 flex flex-wrap gap-2 border-t border-slate-100 pt-1.5 text-[11px]">
          {summaryMetrics.map((metric) => (
            <div key={metric.label}>
              <p className="text-slate-500">{metric.label}</p>
              <p className="font-semibold text-slate-800">{metric.value}</p>
            </div>
          ))}
        </div>
      </AnalyticsCard>

      <DataTableCard title={topDriversTitle}>
        <table className="w-full min-w-[500px] text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="pb-1.5 text-left text-[11px] font-medium text-slate-500">
                #
              </th>
              <th className="pb-2 text-left text-xs font-medium text-slate-500">
                Driver
              </th>
              <th className="pb-2 text-right text-xs font-medium text-slate-500">
                Trips
              </th>
              <th className="pb-2 text-right text-xs font-medium text-slate-500">
                Revenue
              </th>
              <th className="pb-2 text-right text-xs font-medium text-slate-500">
                Avg Duration
              </th>
              <th className="pb-2 text-right text-xs font-medium text-slate-500">
                Distance
              </th>
            </tr>
          </thead>
          <tbody>
            {topDrivers.map((d) => (
              <tr
                key={d.rank}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="py-1.5 text-slate-600">{d.rank}</td>
                <td className="py-1.5 text-xs font-medium text-slate-800">
                  {d.name}
                </td>
                <td className="py-1.5 text-right text-xs text-slate-700">
                  {d.trips}
                </td>
                <td className="py-1.5 text-right text-xs font-medium text-emerald-600">
                  {d.revenue}
                </td>
                <td className="py-1.5 text-right text-xs text-slate-600">
                  {d.avgDuration}
                </td>
                <td className="py-1.5 text-right text-xs text-slate-600">
                  {d.distance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTableCard>
    </div>
  );
}
