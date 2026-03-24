import { Cell, Pie, PieChart } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { DashboardCard } from './DashboardCard';

const FLEET_HEALTH_DATA = [
  { name: 'Healthy', value: 398, color: '#10b981' },
  { name: 'Maintenance Due', value: 21, color: '#f59e0b' },
  { name: 'Critical', value: 8, color: '#ef4444' },
];

export function FleetHealthPanel() {
  return (
    <DashboardCard className="flex min-h-0 flex-col overflow-hidden">
      <h3 className="mb-1.5 shrink-0 text-xs font-semibold text-slate-800">
        Fleet Health
      </h3>
      <div className="flex items-center gap-2">
        <div className="h-12 w-12 shrink-0">
          <ChartContainer config={{}} className="h-full w-full">
            <PieChart>
              <Pie
                data={FLEET_HEALTH_DATA}
                dataKey="value"
                innerRadius={10}
                outerRadius={22}
                paddingAngle={2}
              >
                {FLEET_HEALTH_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          {FLEET_HEALTH_DATA.map((item) => (
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
    </DashboardCard>
  );
}
