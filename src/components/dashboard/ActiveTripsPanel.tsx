import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { DashboardCard } from './DashboardCard';

const MOCK_TRIPS = [
  {
    id: 'TR-330',
    driver: 'Ahmed M.',
    duration: '0:45 hr',
    route: 'Riyadh → Jeddah',
    cost: 'SAR 1,250',
    badge: '141',
  },
  {
    id: 'TR-331',
    driver: 'Sarah L.',
    duration: '1:20 hr',
    route: 'Dammam → Khobar',
    cost: 'SAR 980',
    badge: '150',
  },
];

export function ActiveTripsPanel() {
  return (
    <DashboardCard className="flex min-h-0 flex-col overflow-hidden">
      <h3 className={cn(typography.cardTitle, 'mb-1 shrink-0')}>
        Active Trips
      </h3>
      <div className="min-h-0 flex-1 space-y-0 overflow-hidden [&>div+div]:border-t [&>div+div]:border-slate-100">
        {MOCK_TRIPS.map((trip) => (
          <div
            key={trip.id}
            className="flex items-center gap-2 py-1 first:pt-0"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-slate-800">
                {trip.id}
              </p>
              <p className="truncate text-2sm text-slate-500">
                {trip.driver} · {trip.route}
              </p>
              <p className="text-xs font-medium text-emerald-600">
                {trip.cost}
              </p>
            </div>
            <span className="flex h-7 min-w-[28px] shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">
              {trip.badge}
            </span>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}


