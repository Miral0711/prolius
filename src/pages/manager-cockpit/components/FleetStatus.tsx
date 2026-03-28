import {
  Camera,
  Car,
  CheckCircle,
  Fuel,
  Gauge,
  GaugeIcon,
  TrendingUp,
  WifiOff,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BlockSectionHeader } from '@/components/ui/block-section';
import { DataCard } from '@/components/ui/data-card';
import {
  CARD_SHADOW_TILE,
  StatTile,
  TILE_MIN_HEIGHT,
  TILE_PADDING,
} from '@/components/ui/stat-tile';

const statusItems = [
  {
    label: 'On Trip',
    value: '147',
    sub: 'active',
    icon: Gauge,
    tint: 'violet' as const,
  },
  {
    label: 'Available',
    value: '0',
    sub: 'ready',
    icon: CheckCircle,
    tint: 'emerald' as const,
  },
  {
    label: 'Offline',
    value: '427',
    sub: 'total',
    icon: WifiOff,
    tint: 'slate' as const,
  },
  {
    label: 'Low Fuel',
    value: '0',
    sub: 'alerts',
    icon: Fuel,
    tint: 'amber' as const,
  },
];

const EXTRA_STAT_ICON: Record<string, string> = {
  zap: 'bg-amber-100/70 text-amber-600',
  camera: 'bg-slate-100/70 text-slate-600',
  gauge: 'bg-rose-100/70 text-rose-600',
  trending: 'bg-emerald-100/70 text-emerald-600',
};
const extraStats = [
  {
    label: 'Engine Status',
    value: '299 ON / 128 OFF',
    icon: Zap,
    iconKey: 'zap' as const,
  },
  {
    label: 'DVR Online',
    value: '182 / 427',
    icon: Camera,
    iconKey: 'camera' as const,
  },
  {
    label: 'Speeding Now',
    value: '22',
    icon: GaugeIcon,
    iconKey: 'gauge' as const,
  },
  {
    label: 'Utilization Rate',
    value: '34.4%',
    icon: TrendingUp,
    iconKey: 'trending' as const,
  },
];

export function FleetStatus() {
  return (
    <DataCard
      title="Fleet Status"
      right={<span className="text-xs text-[#5f6790]">(427 Total)</span>}
    >
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
        {statusItems.map((s, i) => (
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
      <BlockSectionHeader className="mt-1.5 mb-0.5">
        Additional Stats
      </BlockSectionHeader>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
        {extraStats.map((s, i) => {
          const Icon = s.icon;
          const iconClass =
            EXTRA_STAT_ICON[s.iconKey] ?? EXTRA_STAT_ICON.camera;
          return (
            <div
              key={i}
              className={cn(
                'flex items-center gap-2 rounded-lg border border-white/50 bg-white/50',
                TILE_PADDING,
                TILE_MIN_HEIGHT,
                CARD_SHADOW_TILE,
              )}
            >
              <div
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                  iconClass,
                )}
              >
                <Icon className="h-3 w-3" />
              </div>
              <span className="min-w-0 flex-1 truncate text-xs uppercase tracking-[0.02rem] text-slate-500 leading-tight">
                {s.label}
              </span>
              <span className="shrink-0 text-sm font-semibold text-slate-700 leading-tight">
                {s.value}
              </span>
            </div>
          );
        })}
      </div>
    </DataCard>
  );
}


