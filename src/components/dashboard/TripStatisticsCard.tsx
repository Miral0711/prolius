import { DashboardCard } from './DashboardCard';

export function TripStatisticsCard() {
  return (
    <DashboardCard>
      <h3 className="mb-1 text-xs font-semibold text-slate-800">
        Trip Statistics
      </h3>
      <div className="grid grid-cols-2 gap-1">
        <div>
          <p className="text-[11px] text-slate-500">Total Trips Today</p>
          <p className="text-sm font-semibold text-slate-800">156</p>
        </div>
        <div>
          <p className="text-[11px] text-slate-500">Completed</p>
          <p className="text-sm font-semibold text-slate-800">142</p>
        </div>
        <div>
          <p className="text-[11px] text-slate-500">In Progress</p>
          <p className="text-sm font-semibold text-slate-800">19</p>
        </div>
        <div>
          <p className="text-[11px] text-slate-500">On Trips Rate</p>
          <p className="text-sm font-semibold text-emerald-600">96.2%</p>
        </div>
        <div>
          <p className="text-[11px] text-slate-500">Total Revenue</p>
          <p className="text-xs font-semibold text-slate-800">243 km</p>
        </div>
        <div>
          <p className="text-[11px] text-slate-500">Efficiency</p>
          <p className="text-xs font-semibold text-slate-800">3.2 km/L</p>
        </div>
      </div>
    </DashboardCard>
  );
}
