import { Cell, Pie, PieChart } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

export interface PieChartSlice {
  name: string;
  value: number;
  color: string;
}

export interface PieChartWidgetProps {
  data: PieChartSlice[];
  /** Size of the chart container (square). Default: 48 */
  size?: number;
  innerRadius?: number;
  outerRadius?: number;
  /** Optional center label (shown inside donut) */
  centerLabel?: { value: string | number; sub?: string };
  className?: string;
}

/**
 * Reusable donut/pie chart with a legend list.
 * Used by FleetHealthPanel, SafetyAlertsSummary, FleetOperationsStatusCard,
 * SafetyAlertsPanel, FleetBreakdownCard, DriverPerformancePanel.
 */
export function PieChartWidget({
  data,
  size = 48,
  innerRadius,
  outerRadius,
  centerLabel,
  className,
}: PieChartWidgetProps) {
  const ir = innerRadius ?? Math.round(size * 0.21);
  const or = outerRadius ?? Math.round(size * 0.46);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <ChartContainer config={{}} className="h-full w-full">
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={ir} outerRadius={or} paddingAngle={2}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        {centerLabel && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-sm font-semibold text-slate-700 leading-none">{centerLabel.value}</span>
            {centerLabel.sub && (
              <span className={cn(typography.meta, 'text-slate-500 leading-none mt-0.5')}>{centerLabel.sub}</span>
            )}
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
              <span className={cn(typography.meta, 'text-slate-600 truncate')}>{item.name}</span>
            </div>
            <span className={cn(typography.meta, 'font-medium text-slate-700 tabular-nums shrink-0')}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
