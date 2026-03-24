import { Activity, Bell, CheckCircle, MapPin } from 'lucide-react';
import { StatTile } from '@/components/ui/stat-tile';

const healthItems = [
  {
    label: 'Alerts Today',
    value: '0',
    sub: 'count',
    icon: Bell,
    tint: 'amber' as const,
  },
  {
    label: 'Job Completion',
    value: '0%',
    sub: 'rate',
    icon: CheckCircle,
    tint: 'emerald' as const,
  },
  {
    label: 'Distance Today',
    value: '0 km',
    sub: 'traveled',
    icon: MapPin,
    tint: 'cyan' as const,
  },
];

export function OperationalHealth() {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 items-stretch">
      {healthItems.map((h, i) => (
        <StatTile
          key={i}
          icon={h.icon}
          title={h.label}
          value={h.value}
          sub={h.sub}
          tint={h.tint}
          variant="cockpit"
        />
      ))}
    </div>
  );
}
