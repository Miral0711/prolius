import { Cell, Pie, PieChart } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { AnalyticsCard } from './AnalyticsCard';

const FLEET_STATUS_DATA = [
  { name: 'Available', value: 329, color: '#10b981' },
  { name: 'On Trip', value: 96, color: '#3b82f6' },
  { name: 'Offline', value: 2, color: '#64748b' },
];

export function FleetBreakdownCard() {
  return (
    <AnalyticsCard title="Fleet Breakdown">
      <div className="flex items-center gap-2">
        <div className="relative h-16 w-16 shrink-0">
          <ChartContainer config={{}} className="h-full w-full">
            <PieChart>
              <Pie
                data={FLEET_STATUS_DATA}
                dataKey="value"
                innerRadius={12}
                outerRadius={28}
                paddingAngle={2}
              >
                {FLEET_STATUS_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <span className="text-sm font-semibold text-slate-700">427</span>
            <span className="text-xs text-slate-500">Total</span>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="space-y-1">
            {FLEET_STATUS_DATA.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-slate-600">{item.name}</span>
                </div>
                <span className="text-xs font-semibold text-slate-800">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-1 flex flex-wrap gap-2 border-t border-slate-100 pt-1 text-2sm">
            <div>
              <p className="text-slate-500">Total Vehicles</p>
              <p className="font-semibold text-slate-800">427</p>
            </div>
            <div>
              <p className="text-slate-500">Avg Fuel %</p>
              <p className="font-semibold text-slate-800">3.2 km/L</p>
            </div>
            <div>
              <p className="text-slate-500">Due for Service</p>
              <p className="font-semibold text-amber-600">8</p>
            </div>
          </div>
        </div>
      </div>
    </AnalyticsCard>
  );
}


