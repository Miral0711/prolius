import { BarChart3, Signal } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { DashboardCard } from './DashboardCard';
import { StatusBadge } from './StatusBadge';

const MOCK_DRIVERS = [
  {
    name: 'Ahmed M.',
    trip: 'TR-330',
    badge: 'On Trip',
    statusVariant: 'on-trip' as const,
    avatar: '/media/avatars/300-2.png',
  },
  {
    name: 'Sarah L.',
    trip: 'TR-331',
    badge: 'On Break',
    statusVariant: 'maintenance' as const,
    avatar: '/media/avatars/300-2.png',
  },
  {
    name: 'Omar K.',
    trip: null,
    badge: 'Available',
    statusVariant: 'available' as const,
    avatar: '/media/avatars/300-2.png',
  },
];

export function DriverStatusPanel() {
  return (
    <DashboardCard className="flex min-h-0 flex-col overflow-hidden">
      <h3 className="mb-1 shrink-0 text-xs font-semibold text-slate-800">
        Driver Status
      </h3>
      <div className="min-h-0 flex-1 space-y-0 overflow-hidden [&>div+div]:border-t [&>div+div]:border-slate-100">
        {MOCK_DRIVERS.map((driver) => (
          <div
            key={driver.name}
            className="flex items-center gap-2 py-1 first:pt-0"
          >
            <img
              src={toAbsoluteUrl(driver.avatar)}
              alt={driver.name}
              className="h-7 w-7 shrink-0 rounded-full border border-slate-200 object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-slate-800">
                {driver.name}
              </p>
              <div className="flex items-center gap-1.5">
                <StatusBadge
                  label={driver.badge}
                  variant={driver.statusVariant}
                />
                {driver.trip && (
                  <span className="text-xs text-slate-500">{driver.trip}</span>
                )}
              </div>
            </div>
            <div className="flex shrink-0 gap-0.5">
              <button
                type="button"
                className="flex h-6 w-6 items-center justify-center rounded text-slate-400 hover:bg-slate-200/70 hover:text-slate-600"
                aria-label="Signal"
              >
                <Signal className="h-3 w-3" />
              </button>
              <button
                type="button"
                className="flex h-6 w-6 items-center justify-center rounded text-slate-400 hover:bg-slate-200/70 hover:text-slate-600"
                aria-label="Chart"
              >
                <BarChart3 className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
