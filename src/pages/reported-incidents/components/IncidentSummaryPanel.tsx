import {
  AlertTriangle,
  Bus,
  CalendarClock,
  MapPin,
  UserX,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { fleetType } from '@/components/fleet/bus-master/tokens';
import type { IncidentSummaryData } from '@/lib/incidentUtils';

/* ─── Accent config — matches fleet page palette ─────────────────────────── */
type Accent = 'blue' | 'amber' | 'rose' | 'slate';

const ACCENT_ICON: Record<Accent, string> = {
  blue:  'bg-[#e8f0f8] text-[#2e5f8a]',
  amber: 'bg-amber-50 text-amber-600',
  rose:  'bg-rose-50 text-rose-600',
  slate: 'bg-slate-100 text-slate-500',
};

const ACCENT_VALUE: Record<Accent, string> = {
  blue:  'text-[#2e5f8a]',
  amber: 'text-amber-700',
  rose:  'text-rose-700',
  slate: 'text-slate-700',
};

const ACCENT_DIVIDER: Record<Accent, string> = {
  blue:  'bg-[#2e5f8a]',
  amber: 'bg-amber-400',
  rose:  'bg-rose-500',
  slate: 'bg-slate-300',
};

/* ─── Single card ────────────────────────────────────────────────────────── */
interface SummaryCardProps {
  label: string;
  value: string | number;
  sub: string;
  icon: React.ElementType;
  accent: Accent;
}

function SummaryCard({ label, value, sub, icon: Icon, accent }: SummaryCardProps) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-md border border-[#d4e0ea] bg-white px-3 py-2 shadow-sm">
      {/* Top accent bar */}
      <div className={cn('h-8 w-0.5 shrink-0 rounded-full', ACCENT_DIVIDER[accent])} />

      {/* Icon */}
      <div className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded', ACCENT_ICON[accent])}>
        <Icon className="h-3.5 w-3.5" />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className={cn(fleetType.kpiLabel, 'mb-0.5 truncate')}>{label}</p>
        <p className={cn(fleetType.kpiValue, 'text-sm leading-none', ACCENT_VALUE[accent])}>{value}</p>
        <p className="mt-0.5 truncate text-[10px] leading-none text-slate-400">{sub}</p>
      </div>
    </div>
  );
}

/* ─── Panel ──────────────────────────────────────────────────────────────── */
interface IncidentSummaryPanelProps {
  data: IncidentSummaryData;
  className?: string;
}

export function IncidentSummaryPanel({ data, className }: IncidentSummaryPanelProps) {
  const topHotspotShort = data.topHotspot
    ? data.topHotspot.length > 20
      ? data.topHotspot.slice(0, 19) + '…'
      : data.topHotspot
    : '—';

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      <SummaryCard
        label="Today's Incidents"
        value={data.todayCount}
        sub="reported today"
        icon={CalendarClock}
        accent="blue"
      />
      <SummaryCard
        label="Unresolved"
        value={data.unresolvedCount}
        sub="open incidents"
        icon={AlertTriangle}
        accent={data.unresolvedCount > 5 ? 'rose' : 'amber'}
      />
      <SummaryCard
        label="Frequent Vehicles"
        value={data.frequentVehicleCount}
        sub="≥2 incidents / 72 h"
        icon={Bus}
        accent={data.frequentVehicleCount > 0 ? 'amber' : 'slate'}
      />
      <SummaryCard
        label="High-Risk Drivers"
        value={data.highRiskDriverCount}
        sub="multi-day incidents"
        icon={UserX}
        accent={data.highRiskDriverCount > 0 ? 'rose' : 'slate'}
      />
      <SummaryCard
        label="Top Hotspot"
        value={topHotspotShort}
        sub={data.topHotspot ? `${data.topHotspotCount} incidents` : 'no data'}
        icon={MapPin}
        accent={data.topHotspotCount >= 4 ? 'rose' : data.topHotspotCount >= 2 ? 'amber' : 'slate'}
      />
    </div>
  );
}
