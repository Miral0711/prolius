import { AlertCircle, Clock, LogIn, Users } from 'lucide-react';
import { StatTile } from '@/components/ui/stat-tile';

const driverStats = [
  {
    label: 'Active Drivers',
    value: '522',
    sub: 'total',
    icon: Users,
    tint: 'blue' as const,
  },
  {
    label: 'Logged In',
    value: '356',
    sub: 'now',
    icon: LogIn,
    tint: 'emerald' as const,
  },
  {
    label: 'Active Shifts',
    value: '0',
    sub: 'current',
    icon: Clock,
    tint: 'indigo' as const,
  },
  {
    label: 'Near HOS Limit',
    value: '0',
    sub: 'alerts',
    icon: AlertCircle,
    tint: 'amber' as const,
  },
];

export function DriverOverview() {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 items-stretch min-h-0">
      {driverStats.map((s, i) => (
        <StatTile
          key={i}
          icon={s.icon}
          title={s.label}
          value={s.value}
          sub={s.sub}
          tint={s.tint}
          variant="cockpit"
        />
      ))}
    </div>
  );
}


