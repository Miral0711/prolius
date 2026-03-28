import { DataTableCard } from './DataTableCard';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

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
      <table className="w-full min-w-[500px]">
        <thead>
          <tr className="border-b border-slate-200">
            <th className={cn('pb-1.5 text-left text-slate-500', typography.tableHeader)}>
              Trip ID
            </th>
            <th className={cn('pb-1.5 text-left text-slate-500', typography.tableHeader)}>
              Vehicle
            </th>
            <th className={cn('pb-1.5 text-left text-slate-500', typography.tableHeader)}>
              Driver
            </th>
            <th className={cn('pb-1.5 text-left text-slate-500', typography.tableHeader)}>
              Route
            </th>
            <th className={cn('pb-1.5 text-right text-slate-500', typography.tableHeader)}>
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
              <td className={cn('py-2 text-slate-800', typography.tableCell)}>
                {trip.id}
              </td>
              <td className={cn('py-2 text-slate-600', typography.tableCell)}>{trip.vehicle}</td>
              <td className={cn('py-2 text-slate-700', typography.tableCell)}>
                {trip.driver}
              </td>
              <td className={cn('py-2 text-slate-500', typography.tableCell)}>{trip.route}</td>
              <td className={cn('py-2 text-right text-emerald-600', typography.tableCell)}>
                {trip.revenue}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DataTableCard>
  );
}


