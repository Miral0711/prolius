import { ReactNode } from 'react';
import {
  AlertTriangle,
  Car,
  CheckCircle,
  MapPin,
  Wrench,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type FilterChipId =
  | 'all'
  | 'available'
  | 'on-trip'
  | 'maintenance'
  | 'alerts';

export interface FilterChipItem {
  id: FilterChipId;
  label: string;
  count?: ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  theme: 'blue' | 'emerald' | 'amber' | 'rose' | 'slate';
  isCloseAction?: boolean;
}

const DEFAULT_CHIPS: FilterChipItem[] = [
  { id: 'all', label: 'All Vehicles', count: 450, icon: Car, theme: 'blue' },
  {
    id: 'available',
    label: 'Available',
    count: 15,
    icon: CheckCircle,
    theme: 'amber',
  },
  {
    id: 'on-trip',
    label: 'On Trip',
    count: 92,
    icon: MapPin,
    theme: 'emerald',
  },
  {
    id: 'maintenance',
    label: 'Maintenance',
    count: 8,
    icon: Wrench,
    theme: 'rose',
  },
  {
    id: 'alerts',
    label: 'Alerts',
    count: <X className="h-3 w-3" />,
    icon: AlertTriangle,
    theme: 'rose',
    isCloseAction: true,
  },
];

const themeStyles = {
  blue: {
    active: 'bg-blue-50 border-blue-200 text-blue-700',
    idle: 'bg-transparent text-slate-600 hover:bg-slate-50',
    icon: 'text-blue-500',
    badgeActive: 'bg-blue-100 text-blue-700',
    badgeIdle: 'bg-blue-50 text-blue-600',
  },
  emerald: {
    active: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    idle: 'bg-transparent text-slate-600 hover:bg-slate-50',
    icon: 'text-emerald-500',
    badgeActive: 'bg-emerald-100 text-emerald-700',
    badgeIdle: 'bg-emerald-50 text-emerald-600',
  },
  amber: {
    active: 'bg-amber-50 border-amber-200 text-amber-700',
    idle: 'bg-transparent text-slate-600 hover:bg-slate-50',
    icon: 'text-amber-500',
    badgeActive: 'bg-amber-100 text-amber-700',
    badgeIdle: 'bg-amber-50 text-amber-600',
  },
  rose: {
    active: 'bg-rose-50 border-rose-200 text-rose-700',
    idle: 'bg-transparent text-rose-600 hover:bg-slate-50',
    icon: 'text-rose-500',
    badgeActive: 'bg-rose-100 text-rose-700',
    badgeIdle: 'bg-rose-100 text-rose-600',
  },
  slate: {
    active: 'bg-slate-100 border-slate-300 text-slate-800',
    idle: 'bg-transparent text-slate-600 hover:bg-slate-50',
    icon: 'text-slate-500',
    badgeActive: 'bg-slate-200 text-slate-700',
    badgeIdle: 'bg-slate-100 text-slate-500',
  },
};

export function FilterChips({
  chips = DEFAULT_CHIPS,
  activeId = 'all',
  onSelect,
}: {
  chips?: FilterChipItem[];
  activeId?: FilterChipId;
  onSelect?: (id: FilterChipId) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1 text-[13px]">
      {chips.map((chip) => {
        const Icon = chip.icon;
        const isActive = chip.id === activeId;
        const styles = themeStyles[chip.theme] || themeStyles.slate;

        return (
          <button
            key={chip.id}
            type="button"
            onClick={() => onSelect?.(chip.id)}
            className={cn(
              'group flex items-center gap-1.5 rounded-sm border px-3 py-1.5 font-medium transition-all duration-200 uppercase tracking-tight text-[10px]',
              isActive ? styles.active : cn('border-transparent', styles.idle),
              chip.isCloseAction &&
                'bg-rose-100 border-rose-100 text-rose-700 hover:bg-rose-200 hover:text-rose-800 rounded-sm',
            )}
          >
            {Icon && (
              <Icon
                className={cn(
                  'h-3.5 w-3.5 shrink-0 transition-colors',
                  styles.icon,
                )}
              />
            )}
            <span>{chip.label}</span>
            {chip.count != null && (
              <span
                className={cn(
                  'ml-0.5 flex items-center justify-center min-w-[18px] h-[18px] rounded px-1 text-[9px] font-semibold transition-colors',
                  isActive ? styles.badgeActive : styles.badgeIdle,
                  chip.isCloseAction && 'bg-rose-500 text-white rounded p-0.5',
                )}
              >
                {chip.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
