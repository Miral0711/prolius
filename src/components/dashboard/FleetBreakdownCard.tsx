import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { AnalyticsCard } from './AnalyticsCard';
import { PieChartWidget, type PieChartSlice } from './PieChartWidget';
import { MetricGrid, type MetricItem } from './MetricGrid';

const FLEET_STATUS_DATA: PieChartSlice[] = [
  { name: 'Available', value: 329, color: '#10b981' },
  { name: 'On Trip', value: 96, color: '#3b82f6' },
  { name: 'Offline', value: 2, color: '#64748b' },
];

const FLEET_SUMMARY: MetricItem[] = [
  { label: 'Total Vehicles', value: '427' },
  { label: 'Avg Fuel %', value: '3.2 km/L' },
  { label: 'Due for Service', value: '8', valueColor: 'text-amber-600' },
];

export function FleetBreakdownCard() {
  return (
    <AnalyticsCard title="Fleet Breakdown">
      <PieChartWidget
        data={FLEET_STATUS_DATA}
        size={64}
        centerLabel={{ value: '427', sub: 'Total' }}
      />
      <div className={cn('mt-1.5 border-t border-slate-100 pt-1.5')}>
        <MetricGrid items={FLEET_SUMMARY} cols={3} />
      </div>
    </AnalyticsCard>
  );
}
