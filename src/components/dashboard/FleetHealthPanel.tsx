import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { DashboardCard } from './DashboardCard';
import { PieChartWidget, type PieChartSlice } from './PieChartWidget';

const FLEET_HEALTH_DATA: PieChartSlice[] = [
  { name: 'Healthy', value: 398, color: '#10b981' },
  { name: 'Maintenance Due', value: 21, color: '#f59e0b' },
  { name: 'Critical', value: 8, color: '#ef4444' },
];

export function FleetHealthPanel() {
  return (
    <DashboardCard className="flex min-h-0 flex-col overflow-hidden">
      <h3 className={cn(typography.cardTitle, 'mb-1.5 shrink-0')}>Fleet Health</h3>
      <PieChartWidget data={FLEET_HEALTH_DATA} size={48} />
    </DashboardCard>
  );
}
