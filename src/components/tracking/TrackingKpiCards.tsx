import { cn } from '@/lib/utils';
import {
  Wifi,
  Clock,
  Power,
  AlertTriangle,
  ShieldAlert,
  WifiOff,
  Bus,
} from 'lucide-react';
import { StripKpiCard, type StripKpiTint } from '@/components/ui/strip-kpi-card';
import type { LucideIcon } from 'lucide-react';

const KPI_ITEMS: {
  label: string;
  value: number;
  icon: LucideIcon;
  tint: StripKpiTint;
}[] = [
  { label: 'Online', value: 342, icon: Wifi, tint: 'emerald' },
  { label: 'Idling', value: 12, icon: Clock, tint: 'blue' },
  { label: 'ACC Off', value: 84, icon: Power, tint: 'amber' },
  { label: 'Alarm', value: 5, icon: AlertTriangle, tint: 'rose' },
  { label: 'Over Error', value: 3, icon: ShieldAlert, tint: 'violet' },
  { label: 'Offline', value: 45, icon: WifiOff, tint: 'slate' },
  { label: 'Total', value: 491, icon: Bus, tint: 'indigo' },
];

interface TrackingKpiCardsProps {
  className?: string;
}

export function TrackingKpiCards({ className }: TrackingKpiCardsProps) {
  return (
    <div className={cn('grid grid-cols-7 gap-2.5', className)}>
      {KPI_ITEMS.map((k, i) => (
        <StripKpiCard
          key={i}
          label={k.label}
          value={k.value}
          icon={k.icon}
          tint={k.tint}
        />
      ))}
    </div>
  );
}
