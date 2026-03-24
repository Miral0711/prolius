import { DataTableCard } from './DataTableCard';

const RECENT_TRIPS = [
  {
    id: 'TR-7702244',
    vehicle: 'TR-8412',
    driver: 'Ahmed M.',
    route: 'Riyadh → Jeddah',
    revenue: 'SAR 3,036',
  },
  {
    id: 'TR-7703411',
    vehicle: 'SXA0388',
    driver: 'Sarah L.',
    route: 'Dammam → Khobar',
    revenue: 'SAR 2,025',
  },
  {
    id: 'TR-7702231',
    vehicle: 'SSA0037',
    driver: 'Omar K.',
    route: 'Jeddah → Mecca',
    revenue: 'SAR 2,025',
  },
  {
    id: 'TR-7707444',
    vehicle: '85A1167',
    driver: 'Fatima A.',
    route: 'Riyadh → Qassim',
    revenue: 'SAR 3,411',
  },
  {
    id: 'TR-7707445',
    vehicle: 'VH-201',
    driver: 'Khaled R.',
    route: 'Medina → Yanbu',
    revenue: 'SAR 1,840',
  },
];

export function ActivityFeedPanel() {
  return (
    <DataTableCard title="Recent Trips">
      <table className="w-full min-w-[500px] text-sm">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="pb-1.5 text-left text-[11px] font-medium text-slate-500">
              Trip ID
            </th>
            <th className="pb-1.5 text-left text-xs font-medium text-slate-500">
              Vehicle
            </th>
            <th className="pb-1.5 text-left text-xs font-medium text-slate-500">
              Driver
            </th>
            <th className="pb-1.5 text-left text-xs font-medium text-slate-500">
              Route
            </th>
            <th className="pb-1.5 text-right text-xs font-medium text-slate-500">
              Revenue
            </th>
          </tr>
        </thead>
        <tbody>
          {RECENT_TRIPS.map((trip) => (
            <tr
              key={trip.id}
              className="border-b border-slate-100 last:border-0"
            >
              <td className="py-2 text-[11px] font-medium text-slate-800">
                {trip.id}
              </td>
              <td className="py-2 text-xs text-slate-600">{trip.vehicle}</td>
              <td className="py-2 text-xs text-slate-700 font-medium">
                {trip.driver}
              </td>
              <td className="py-2 text-xs text-slate-500">{trip.route}</td>
              <td className="py-2 text-right text-xs font-semibold text-emerald-600">
                {trip.revenue}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DataTableCard>
  );
}
