import {
  AlertTriangle,
  Car,
  CheckCircle,
  Gauge,
  MapPin,
  Shield,
  TrendingUp,
  Wallet,
  WifiOff,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router';
import { KpiCard } from './KpiCard';
import type { KpiCardProps } from './KpiCard';

export interface FleetStatusCardItem extends Pick<KpiCardProps, 'title' | 'value' | 'subValue' | 'accent'> {
  icon?: LucideIcon;
}

const DEFAULT_FLEET_KPIS: FleetStatusCardItem[] = [
  {
    title: 'Total Fleet',
    value: '427',
    subValue: '96 in active',
    icon: Car,
    accent: 'blue' as const,
  },
  {
    title: 'On Trip',
    value: '98',
    subValue: '92 active',
    icon: MapPin,
    accent: 'violet' as const,
  },
  {
    title: 'Available',
    value: '329',
    subValue: '329 active',
    icon: CheckCircle,
    accent: 'emerald' as const,
  },
  {
    title: 'Offline',
    value: '0',
    subValue: '0 inactive',
    icon: WifiOff,
    accent: 'slate' as const,
  },
  {
    title: "Today's Revenue",
    value: 'SAR 35',
    subValue: 'MTD SAR 62',
    icon: Wallet,
    accent: 'emerald' as const,
  },
  {
    title: 'Trips Today',
    value: '3',
    subValue: '427 selected',
    icon: TrendingUp,
    accent: 'blue' as const,
  },
  {
    title: 'Utilization',
    value: '23%',
    subValue: 'Avg fleet use',
    icon: Gauge,
    accent: 'violet' as const,
  },
  {
    title: 'Avg KMP',
    value: 'SAR 12',
    subValue: 'Per trip today',
    icon: TrendingUp,
    accent: 'cyan' as const,
  },
  {
    title: 'Alerts',
    value: '17',
    subValue: 'Active now',
    icon: AlertTriangle,
    accent: 'amber' as const,
  },
  {
    title: 'Device Status',
    value: '24%',
    subValue: 'UTM of devices',
    icon: Gauge,
    accent: 'amber' as const,
  },
  {
    title: 'Safety',
    value: '17',
    subValue: 'All alerts',
    icon: Shield,
    accent: 'cyan' as const,
  },
];

export interface FleetStatusCardAction {
  to: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
}

export interface FleetStatusCardProps {
  kpis?: FleetStatusCardItem[];
  action?: FleetStatusCardAction;
  className?: string;
}

const DEFAULT_ACTION: FleetStatusCardAction = {
  to: '/bus-tracking/live',
  title: 'Open Map',
  subtitle: 'Live Tracking',
  icon: MapPin,
};

export function FleetStatusCard({
  kpis = DEFAULT_FLEET_KPIS,
  action = DEFAULT_ACTION,
  className,
}: FleetStatusCardProps = {}) {
  const ActionIcon = action.icon ?? MapPin;

  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ${className ?? ''}`}>
      {kpis.map((kpi) => (
        <KpiCard key={kpi.title} {...kpi} />
      ))}
      <Link
        to={action.to}
        className="col-span-2 flex flex-col items-center justify-center rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50/30 sm:col-span-1"
      >
        <ActionIcon className="mb-2 h-8 w-8 text-blue-500" />
        <span className="text-sm font-medium text-slate-700">{action.title}</span>
        {action.subtitle ? (
          <span className="text-xs text-slate-500">{action.subtitle}</span>
        ) : null}
      </Link>
    </div>
  );
}


