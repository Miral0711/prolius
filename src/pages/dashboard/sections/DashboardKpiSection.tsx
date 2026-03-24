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
import { Link } from 'react-router';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { KPI_ITEMS } from '../mockData';

const ICON_MAP = {
  'Total Fleet': Car,
  'On Trip': MapPin,
  Available: CheckCircle,
  Offline: WifiOff,
  "Today's Revenue": Wallet,
  'Trips Today': TrendingUp,
  Utilization: Gauge,
  'Avg KMP': TrendingUp,
  Alerts: AlertTriangle,
  'Drivers Status': Gauge,
  Safety: Shield,
} as const;

export function DashboardKpiSection() {
  return (
    <section>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
        {KPI_ITEMS.map((kpi) => (
          <KpiCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            subValue={kpi.subValue}
            icon={ICON_MAP[kpi.title as keyof typeof ICON_MAP]}
            accent={kpi.accent}
          />
        ))}
        <Link
          to="/bus-tracking/live"
          className="col-span-2 flex h-[56px] flex-col items-center justify-center rounded-lg border border-slate-200 bg-white/60 p-2.5 backdrop-blur-md shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50/30 sm:col-span-1 lg:col-span-1"
        >
          <MapPin className="mb-2 h-5 w-5 text-blue-500" />
          <span className="text-sm font-medium text-slate-700">Open Map</span>
          <span className="text-xs text-slate-500">Live Tracking</span>
        </Link>
      </div>
    </section>
  );
}
