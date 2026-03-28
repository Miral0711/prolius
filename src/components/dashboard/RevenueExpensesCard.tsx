import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { DashboardCard } from './DashboardCard';

const barData = [
  { month: 'Jan', revenue: 38000, expenses: 12000 },
  { month: 'Feb', revenue: 42000, expenses: 12500 },
  { month: 'Mar', revenue: 45231, expenses: 12450 },
];

const chartConfig: ChartConfig = {
  revenue: { label: 'Revenue', color: '#10b981' },
  expenses: { label: 'Expenses', color: '#f59e0b' },
};

export function RevenueExpensesCard() {
  return (
    <DashboardCard>
      <h3 className={cn(typography.cardTitle, 'mb-1')}>
        Revenue & Expenses
      </h3>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-slate-500">Total Month</p>
          <p className="text-[14px] font-semibold text-slate-800">
            SAR 45,231
            <span className="ml-1 inline-flex items-center text-emerald-600">
              <TrendingUp className="h-3 w-3" /> +12%
            </span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-slate-500">Total Revenue</p>
          <p className="text-[14px] font-semibold text-emerald-600">
            SAR 1,239
            <span className="ml-1 text-emerald-500">+8%</span>
          </p>
        </div>
      </div>
      <div className="mt-1 h-10">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            data={barData}
            margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 10 }} hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>
      <div className="mt-0.5 flex justify-between text-xs font-normal text-slate-500">
        <span>Overall Expenses SAR 12,450</span>
        <span>Fuel Cost SAR 8,231</span>
      </div>
    </DashboardCard>
  );
}


