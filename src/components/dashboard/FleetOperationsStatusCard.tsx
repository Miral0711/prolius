import { Cell, Pie, PieChart } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { DashboardCard } from './DashboardCard';

const FLEET_HEALTH_DATA = [
  { name: 'Healthy', value: 398, color: '#10b981' },
  { name: 'Maintenance Due', value: 21, color: '#f59e0b' },
  { name: 'Critical', value: 8, color: '#ef4444' },
];

const SAFETY_ALERT_DATA = [
  { name: 'Overspeed', value: 8, color: '#f59e0b' },
  { name: 'Idle', value: 4, color: '#64748b' },
  { name: 'Accident', value: 2, color: '#ef4444' },
  { name: 'Critical', value: 3, color: '#dc2626' },
];

export function FleetOperationsStatusCard() {
  return (
    <DashboardCard className="flex min-h-0 flex-col overflow-hidden">
      <h3 className={cn(typography.cardTitle, 'mb-1.5 shrink-0')}>
        Fleet Operations Status
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="mb-1 text-2sm font-medium text-slate-600">
            Fleet Health
          </p>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 shrink-0">
              <ChartContainer config={{}} className="h-full w-full">
                <PieChart>
                  <Pie
                    data={FLEET_HEALTH_DATA}
                    dataKey="value"
                    innerRadius={8}
                    outerRadius={18}
                    paddingAngle={2}
                  >
                    {FLEET_HEALTH_DATA.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </div>
            <div className="min-w-0 flex-1 space-y-0.5">
              {FLEET_HEALTH_DATA.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-1"
                >
                  <span className="text-2sm text-slate-600">
                    {item.name}
                  </span>
                  <span className="text-2sm font-medium text-slate-700">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="mb-1 text-2sm font-medium text-slate-600">
            Safety Alerts
          </p>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 shrink-0">
              <ChartContainer config={{}} className="h-full w-full">
                <PieChart>
                  <Pie
                    data={SAFETY_ALERT_DATA}
                    dataKey="value"
                    innerRadius={8}
                    outerRadius={18}
                    paddingAngle={2}
                  >
                    {SAFETY_ALERT_DATA.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </div>
            <div className="min-w-0 flex-1 space-y-0.5">
              {SAFETY_ALERT_DATA.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-1"
                >
                  <span className="text-2sm text-slate-600">
                    {item.name}
                  </span>
                  <span className="text-2sm font-medium text-slate-700">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}


