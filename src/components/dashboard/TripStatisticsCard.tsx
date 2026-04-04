import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { DashboardCard } from './DashboardCard';
import { MetricGrid, type MetricItem } from './MetricGrid';

const TRIP_STATS: MetricItem[] = [
  { label: 'Total Trips Today', value: '156' },
  { label: 'Completed', value: '142' },
  { label: 'In Progress', value: '19' },
  { label: 'On Trips Rate', value: '96.2%', valueColor: 'text-emerald-600' },
  { label: 'Total Revenue', value: '243 km' },
  { label: 'Efficiency', value: '3.2 km/L' },
];

export function TripStatisticsCard() {
  return (
    <DashboardCard>
      <h3 className={cn(typography.cardTitle, 'mb-1')}>Trip Statistics</h3>
      <MetricGrid items={TRIP_STATS} cols={2} />
    </DashboardCard>
  );
}
