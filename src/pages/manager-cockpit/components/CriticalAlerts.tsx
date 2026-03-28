import { AlertTriangle, Battery, Car, MapPin, PhoneOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DataCard } from '@/components/ui/data-card';
import { CARD_SHADOW_TILE } from '@/components/ui/stat-tile';

const alerts = [
  {
    label: 'SOS Alerts',
    sub: 'Driver/passenger distress signals',
    value: 0,
    icon: AlertTriangle,
    iconTint: 'rose' as const,
  },
  {
    label: 'Accident Alerts',
    sub: 'G-Sensor impact detection',
    value: 0,
    icon: Car,
    iconTint: 'rose' as const,
  },
  {
    label: 'Geofence Breaches',
    sub: 'Unauthorized zone exits',
    value: 0,
    icon: MapPin,
    iconTint: 'amber' as const,
  },
  {
    label: 'Missed VoIP Calls',
    sub: 'Unanswered dispatch calls',
    value: 0,
    icon: PhoneOff,
    iconTint: 'slate' as const,
  },
  {
    label: 'Low Voltage',
    sub: 'Battery below 12V threshold',
    value: 3,
    icon: Battery,
    iconTint: 'amber' as const,
  },
];

const ICON_TINT: Record<string, string> = {
  rose: 'bg-rose-100/70 text-rose-600',
  amber: 'bg-amber-100/70 text-amber-600',
  slate: 'bg-slate-100/70 text-slate-600',
};

/** Same base for every alert card: border, radius, padding, shadow. No conditional shadow/ring/elevation. */
const ALERT_CARD_BASE =
  'rounded-lg border border-white/50 bg-white/50 border-l-4 px-3 py-2 min-h-[52px] flex items-center justify-between gap-2 ' +
  CARD_SHADOW_TILE;

/** Severity shown only via color: left border, icon, value text. Same DOM structure for all cards. */
export function CriticalAlerts({ sectionLead }: { sectionLead?: boolean }) {
  return (
    <DataCard title="Critical Alerts" sectionLead={sectionLead}>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5 items-stretch overflow-visible">
        {alerts.map((a, i) => {
          const Icon = a.icon;
          const hasAlert = a.value > 0;
          const iconClass = hasAlert
            ? 'bg-rose-50/80 text-rose-500'
            : (ICON_TINT[a.iconTint] ?? ICON_TINT.slate);
          const borderColor = hasAlert
            ? 'border-l-red-300/60'
            : 'border-l-slate-300/60';
          const valueColor = hasAlert ? 'text-red-500' : 'text-slate-700';
          return (
            <div key={i} className={cn(ALERT_CARD_BASE, borderColor)}>
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <div
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                    iconClass,
                  )}
                >
                  <Icon className="h-3 w-3" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium uppercase tracking-[0.02rem] text-slate-500 leading-none">
                    {a.label}
                  </p>
                  <p className="truncate text-xs text-slate-500 leading-none">
                    {a.sub}
                  </p>
                </div>
              </div>
              <span
                className={cn(
                  'text-lg font-semibold leading-none shrink-0',
                  valueColor,
                )}
              >
                {a.value}
              </span>
            </div>
          );
        })}
      </div>
    </DataCard>
  );
}


