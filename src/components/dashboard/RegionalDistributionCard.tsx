import { Cell, Pie, PieChart } from 'recharts';
import { DashboardCard } from './DashboardCard';

const REGION_DATA = [
  { name: 'Central Regions', value: 43, color: '#3b82f6' },
  { name: 'President Regions', value: 20, color: '#10b981' },
  { name: 'Southwest Regions', value: 19, color: '#f59e0b' },
  { name: 'Southeast Regions', value: 10, color: '#8b5cf6' },
  { name: 'Other', value: 8, color: '#94a3b8' },
];

export function RegionalDistributionCard() {
  return (
    <DashboardCard>
      <h3 className="mb-1 text-xs font-semibold text-slate-800">
        Regional Distribution
      </h3>
      <div className="flex items-center gap-1.5">
        <div className="relative h-16 w-16 shrink-0">
          <PieChart width={64} height={64}>
            <Pie
              data={REGION_DATA}
              dataKey="value"
              innerRadius={18}
              outerRadius={28}
              paddingAngle={2}
            >
              {REGION_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
            <span className="text-sm font-semibold text-slate-700">450</span>
            <span className="text-xs text-slate-500">Vehicles</span>
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          {REGION_DATA.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="truncate text-xs text-slate-600">
                {item.name}
              </span>
              <span className="ml-auto text-xs font-medium text-slate-700">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}
