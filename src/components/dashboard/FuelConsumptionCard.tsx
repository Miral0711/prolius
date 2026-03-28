import { Fuel } from 'lucide-react';
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

const fuelData = [
  { week: 'W1', liters: 420 },
  { week: 'W2', liters: 445 },
  { week: 'W3', liters: 438 },
  { week: 'W4', liters: 455 },
];

const chartConfig: ChartConfig = {
  liters: { label: 'Liters', color: '#06b6d4' },
};

export function FuelConsumptionCard() {
  return (
    <DashboardCard>
      <h3 className={cn(typography.cardTitle, 'mb-1.5')}>
        Fuel Consumption
      </h3>
      <div className="flex items-baseline gap-1.5">
        <span className="text-[14px] font-semibold text-slate-800">455 L</span>
        <span className="text-xs font-normal text-slate-500">Avg 3.2 km/L</span>
      </div>
      <div className="mt-1.5 h-12">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            data={fuelData}
            margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="week" tick={{ fill: '#64748b', fontSize: 10 }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 10 }} hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="liters" fill="#06b6d4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>
    </DashboardCard>
  );
}


