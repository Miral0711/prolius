import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { AnalyticsCard } from './AnalyticsCard';
import { ChartPanel } from './ChartPanel';

const REVENUE_BAR_DATA = [
  { month: 'Jan', revenue: 38000 },
  { month: 'Feb', revenue: 42000 },
  { month: 'Mar', revenue: 45231 },
];

const REVENUE_BREAKDOWN = [
  { name: 'Trips', value: 65, color: '#3b82f6' },
  { name: 'Freight', value: 25, color: '#10b981' },
  { name: 'Other', value: 10, color: '#f59e0b' },
];

const barConfig: ChartConfig = {
  revenue: { label: 'Revenue', color: '#10b981' },
};

export function RevenueAnalyticsCard() {
  return (
    <AnalyticsCard title="Revenue & Distance">
      <div className="grid grid-cols-1 gap-1.5 lg:grid-cols-2">
        <div>
          <ChartPanel height={260}>
            <ChartContainer config={barConfig} className="h-full w-full">
              <BarChart
                data={REVENUE_BAR_DATA}
                margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#64748b', fontSize: 10 }}
                />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </ChartPanel>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative h-16 w-16 shrink-0">
            <ChartContainer config={{}} className="h-full w-full">
              <PieChart>
                <Pie
                  data={REVENUE_BREAKDOWN}
                  dataKey="value"
                  innerRadius={12}
                  outerRadius={28}
                  paddingAngle={2}
                >
                  {REVENUE_BREAKDOWN.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-sm font-semibold text-slate-700">100%</span>
            </div>
          </div>
          <div className="min-w-0 flex-1 space-y-1.5">
            {REVENUE_BREAKDOWN.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-slate-600">{item.name}</span>
                <span className="ml-auto text-xs font-medium text-slate-700">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-1 flex flex-wrap gap-2 text-2sm text-slate-500">
        <span>Total KM: 12,450</span>
        <span>Avg Rev/Trip: SAR 146</span>
        <span>MTD Revenue: SAR 62,231</span>
      </div>
    </AnalyticsCard>
  );
}


