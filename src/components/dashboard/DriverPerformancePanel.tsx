import { TOP_DRIVERS } from '@/pages/dashboard/mockData';
import { AnalyticsCard } from './AnalyticsCard';
import { DataTableCard } from './DataTableCard';
import { PieChartWidget, type PieChartSlice } from './PieChartWidget';
import { SimpleTable, type SimpleTableColumn } from './SimpleTable';
import { MetricGrid, type MetricItem } from './MetricGrid';
import type { LeaderboardItem } from './CompactLeaderboard';

export interface DriverAvailabilityItem extends PieChartSlice {}

export interface DriverMetricItem {
  label: string;
  value: string;
}

const DEFAULT_AVAILABILITY_DATA: DriverAvailabilityItem[] = [
  { name: 'Available', value: 45, color: '#10b981' },
  { name: 'On Duty', value: 52, color: '#3b82f6' },
  { name: 'Offline', value: 29, color: '#64748b' },
];

const DEFAULT_SUMMARY_METRICS: MetricItem[] = [
  { label: 'Total Drivers', value: '126' },
  { label: 'Avg Duty Hours', value: '8.2 hr' },
  { label: 'Avg Shift', value: '6.5 hr' },
];

const DRIVER_COLUMNS: SimpleTableColumn<LeaderboardItem>[] = [
  { key: 'rank', header: '#', cellClassName: 'text-slate-600', render: (d) => d.rank },
  { key: 'name', header: 'Driver', cellClassName: 'font-medium text-slate-800', render: (d) => d.name },
  { key: 'trips', header: 'Trips', align: 'right', cellClassName: 'text-slate-700', render: (d) => d.trips },
  { key: 'revenue', header: 'Revenue', align: 'right', cellClassName: 'font-medium text-emerald-600', render: (d) => d.revenue },
  { key: 'avgDuration', header: 'Avg Duration', align: 'right', cellClassName: 'text-slate-600', render: (d) => d.avgDuration },
  { key: 'distance', header: 'Distance', align: 'right', cellClassName: 'text-slate-600', render: (d) => d.distance },
];

export interface DriverPerformancePanelProps {
  availabilityData?: DriverAvailabilityItem[];
  topDrivers?: LeaderboardItem[];
  summaryMetrics?: MetricItem[];
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
        <PieChartWidget data={availabilityData} size={64} />
        <div className="mt-1.5 border-t border-slate-100 pt-1.5">
          <MetricGrid items={summaryMetrics} cols={3} />
        </div>
      </AnalyticsCard>

      <DataTableCard title={topDriversTitle}>
        <SimpleTable
          data={topDrivers}
          columns={DRIVER_COLUMNS}
          rowKey={(d) => d.rank}
          minWidth={500}
        />
      </DataTableCard>
    </div>
  );
}
