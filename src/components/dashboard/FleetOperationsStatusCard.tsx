import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { DashboardCard } from './DashboardCard';
import { PieChartWidget, type PieChartSlice } from './PieChartWidget';

const FLEET_HEALTH_DATA: PieChartSlice[] = [
  { name: 'Healthy', value: 398, color: '#10b981' },
  { name: 'Maintenance Due', value: 21, color: '#f59e0b' },
  { name: 'Critical', value: 8, color: '#ef4444' },
];

const SAFETY_ALERT_DATA: PieChartSlice[] = [
  { name: 'Overspeed', value: 8, color: '#f59e0b' },
  { name: 'Idle', value: 4, color: '#64748b' },
  { name: 'Accident', value: 2, color: '#ef4444' },
  { name: 'Critical', value: 3, color: '#dc2626' },
];

export function FleetOperationsStatusCard() {
  return (
    <DashboardCard className="flex min-h-0 flex-col overflow-hidden">
      <h3 className={cn(typography.cardTitle, 'mb-1.5 shrink-0')}>Fleet Operations Status</h3>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className={cn(typography.label, 'text-slate-600 mb-1')}>Fleet Health</p>
          <PieChartWidget data={FLEET_HEALTH_DATA} size={40} />
        </div>
        <div>
          <p className={cn(typography.label, 'text-slate-600 mb-1')}>Safety Alerts</p>
          <PieChartWidget data={SAFETY_ALERT_DATA} size={40} />
        </div>
      </div>
    </DashboardCard>
  );
}
