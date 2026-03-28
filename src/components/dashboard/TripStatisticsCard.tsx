import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { DashboardCard } from './DashboardCard';

export function TripStatisticsCard() {
  return (
    <DashboardCard>
      <h3 className={cn(typography.cardTitle, 'mb-1')}>
        Trip Statistics
      </h3>
      <div className="grid grid-cols-2 gap-1">
        <div>
          <p className="text-xs font-medium text-slate-500">Total Trips Today</p>
          <p className="text-[14px] font-semibold text-slate-800">156</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">Completed</p>
          <p className="text-[14px] font-semibold text-slate-800">142</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">In Progress</p>
          <p className="text-[14px] font-semibold text-slate-800">19</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">On Trips Rate</p>
          <p className="text-[14px] font-semibold text-emerald-600">96.2%</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">Total Revenue</p>
          <p className="text-[14px] font-semibold text-slate-800">243 km</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">Efficiency</p>
          <p className="text-[14px] font-semibold text-slate-800">3.2 km/L</p>
        </div>
      </div>
    </DashboardCard>
  );
}


