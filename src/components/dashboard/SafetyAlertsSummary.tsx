import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { DashboardCard } from './DashboardCard';
import { PieChartWidget, type PieChartSlice } from './PieChartWidget';

const SAFETY_ALERT_DATA: PieChartSlice[] = [
  { name: 'Overspeed', value: 8, color: '#f59e0b' },
  { name: 'Idle', value: 4, color: '#64748b' },
  { name: 'Accident', value: 2, color: '#ef4444' },
  { name: 'Critical', value: 3, color: '#dc2626' },
];

export function SafetyAlertsSummary() {
  return (
    <DashboardCard className="flex min-h-0 flex-col overflow-hidden">
      <h3 className={cn(typography.cardTitle, 'mb-1.5 shrink-0')}>Safety Alerts Summary</h3>
      <PieChartWidget data={SAFETY_ALERT_DATA} size={48} />
    </DashboardCard>
  );
}
