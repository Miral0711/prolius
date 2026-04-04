import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { AnalyticsCard } from './AnalyticsCard';
import { PieChartWidget, type PieChartSlice } from './PieChartWidget';

const SAFETY_ALERT_DATA: PieChartSlice[] = [
  { name: 'Overspeed', value: 8, color: '#f59e0b' },
  { name: 'Idle', value: 4, color: '#64748b' },
  { name: 'Accident', value: 2, color: '#ef4444' },
  { name: 'Critical', value: 3, color: '#dc2626' },
];

const RECENT_EVENTS = [
  { id: 1, event: 'Bus Stop Overstay', vehicle: 'SXA0388', time: '11:03 AM' },
  { id: 2, event: 'Sudden Stop', vehicle: 'SSA0037', time: '10:45 AM' },
  { id: 3, event: 'Panic Button', vehicle: '85A1167', time: '10:22 AM' },
  { id: 4, event: 'Over Speeding', vehicle: '115A1167', time: '09:58 AM' },
];

export function SafetyAlertsPanel() {
  return (
    <AnalyticsCard title="Safety Alerts">
      <div className="grid grid-cols-1 gap-1.5 lg:grid-cols-2">
        <PieChartWidget data={SAFETY_ALERT_DATA} size={64} />
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">This Week</span>
            <span className="font-medium text-slate-700">12</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">This Month</span>
            <span className="font-medium text-slate-700">47</span>
          </div>
        </div>
      </div>
      <div className="mt-1.5 border-t border-slate-100 pt-1.5">
        <p className={cn(typography.denseCaps, 'text-slate-500 mb-1')}>Recent Safety Events</p>
        <div className="space-y-1">
          {RECENT_EVENTS.map((e) => (
            <div
              key={e.id}
              className="flex items-center justify-between rounded-md bg-slate-50 px-2 py-0.5"
            >
              <div>
                <p className={cn(typography.tableCell, 'font-medium text-slate-700')}>{e.event}</p>
                <p className={cn(typography.meta, 'text-slate-500')}>{e.vehicle}</p>
              </div>
              <span className={cn(typography.meta, 'text-slate-500')}>{e.time}</span>
            </div>
          ))}
        </div>
      </div>
    </AnalyticsCard>
  );
}
