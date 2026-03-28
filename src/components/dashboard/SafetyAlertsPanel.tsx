import { Cell, Pie, PieChart } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { AnalyticsCard } from './AnalyticsCard';

const SAFETY_ALERT_DATA = [
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
        <div className="flex items-center gap-2">
          <div className="h-16 w-16 shrink-0">
            <ChartContainer config={{}} className="h-full w-full">
              <PieChart>
                <Pie
                  data={SAFETY_ALERT_DATA}
                  dataKey="value"
                  innerRadius={8}
                  outerRadius={22}
                  paddingAngle={2}
                >
                  {SAFETY_ALERT_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
          <div className="min-w-0 flex-1 space-y-1.5">
            {SAFETY_ALERT_DATA.map((item) => (
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
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.02rem] text-slate-500">
          Recent Safety Events
        </p>
        <div className="space-y-1">
          {RECENT_EVENTS.map((e) => (
            <div
              key={e.id}
              className="flex items-center justify-between rounded-md bg-slate-50 px-2 py-0.5 text-2sm"
            >
              <div>
                <p className="font-medium text-slate-700">{e.event}</p>
                <p className="text-slate-500">{e.vehicle}</p>
              </div>
              <span className="text-slate-500">{e.time}</span>
            </div>
          ))}
        </div>
      </div>
    </AnalyticsCard>
  );
}


