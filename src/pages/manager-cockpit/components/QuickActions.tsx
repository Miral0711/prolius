import { Bell, Car, DollarSign, FileText, Map, Users } from 'lucide-react';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';
import { DataCard } from '@/components/ui/data-card';
import { CARD_SHADOW_TILE } from '@/components/ui/stat-tile';

const ACTION_ICON_TINT: Record<number, string> = {
  0: 'bg-slate-100/70 text-slate-600',
  1: 'bg-rose-100/70 text-rose-600',
  2: 'bg-amber-100/70 text-amber-600',
  3: 'bg-emerald-100/70 text-emerald-600',
  4: 'bg-slate-100/70 text-slate-600',
  5: 'bg-emerald-100/70 text-emerald-600',
};
const actions = [
  { label: 'Live Map', path: '/bus-tracking', icon: Map },
  { label: 'Alerts', path: '/bus-alert-monitoring', icon: Bell },
  { label: 'Reports', path: '/reports', icon: FileText },
  { label: 'Drivers', path: '/bus-driver-list', icon: Users },
  { label: 'Fleet', path: '/manager-cockpit', icon: Car },
  { label: 'Revenue', path: '/reports', icon: DollarSign },
];

export function QuickActions() {
  return (
    <DataCard title="Quick Actions">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 items-stretch">
        {actions.map((a, i) => {
          const Icon = a.icon;
          const iconClass = ACTION_ICON_TINT[i] ?? ACTION_ICON_TINT[0];
          return (
            <Link
              key={i}
              to={a.path}
              className={cn(
                'flex min-h-[52px] flex-col items-center justify-center gap-1.5 rounded-lg border border-white/50 bg-white/50 px-3 py-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-slate-400',
                CARD_SHADOW_TILE,
                'hover:shadow-[0_2px_8px_rgba(31,38,135,0.06)]',
              )}
            >
              <div
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                  iconClass,
                )}
              >
                <Icon className="h-3 w-3 text-slate-700" />
              </div>
              <span className="text-center text-[10px] font-medium uppercase tracking-wide text-slate-600 leading-tight">
                {a.label}
              </span>
            </Link>
          );
        })}
      </div>
    </DataCard>
  );
}
