import { cn } from '@/lib/utils';

export type StatusVariant =
  | 'available' | 'emerald'
  | 'on-trip' | 'blue'
  | 'offline' | 'slate'
  | 'maintenance' | 'amber'
  | 'alert' | 'rose'
  | 'neutral'
  | 'pending' | 'violet';

const VARIANT_STYLES: Record<StatusVariant, string> = {
  available: 'bg-emerald-100/80 text-emerald-700 border-emerald-200/50',
  emerald:   'bg-emerald-100/80 text-emerald-700 border-emerald-200/50',
  'on-trip': 'bg-blue-100/80 text-blue-700 border-blue-200/50',
  blue:      'bg-blue-100/80 text-blue-700 border-blue-200/50',
  offline:   'bg-slate-100/80 text-slate-600 border-slate-200/50',
  slate:     'bg-slate-100/80 text-slate-600 border-slate-200/50',
  maintenance: 'bg-amber-100/80 text-amber-700 border-amber-200/50',
  amber:       'bg-amber-100/80 text-amber-700 border-amber-200/50',
  alert:     'bg-rose-100/80 text-rose-700 border-rose-200/50',
  rose:      'bg-rose-100/80 text-rose-700 border-rose-200/50',
  neutral:   'bg-slate-100/80 text-slate-600 border-slate-200/50',
  pending:   'bg-violet-100/80 text-violet-700 border-violet-200/50',
  violet:    'bg-violet-100/80 text-violet-700 border-violet-200/50',
};

const VARIANT_DOT: Partial<Record<StatusVariant, string>> = {
  available: 'bg-emerald-500',
  emerald: 'bg-emerald-500',
  'on-trip': 'bg-blue-500',
  blue: 'bg-blue-500',
  offline: 'bg-slate-400',
  slate: 'bg-slate-400',
  maintenance: 'bg-amber-500',
  amber: 'bg-amber-500',
  alert: 'bg-rose-500',
  rose: 'bg-rose-500',
  neutral: 'bg-slate-400',
  pending: 'bg-violet-500',
  violet: 'bg-violet-500',
};

export interface StatusBadgeProps {
  label: string;
  variant?: StatusVariant;
  /** Leading status dot (WASL-style) */
  withDot?: boolean;
  /** Sentence case label (e.g. WASL Enable / Disable) */
  preserveCase?: boolean;
  className?: string;
}

export function StatusBadge({
  label,
  variant = 'neutral',
  withDot = false,
  preserveCase = false,
  className,
}: StatusBadgeProps) {
  const dotClass = VARIANT_DOT[variant] ?? 'bg-slate-400';

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center gap-0.5 rounded-sm border px-1.5 py-0.5 text-[10px] tracking-tight shadow-xs transition-colors',
        preserveCase ? 'font-semibold' : 'font-semibold uppercase',
        VARIANT_STYLES[variant],
        className,
      )}
    >
      {withDot && (
        <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', dotClass)} aria-hidden />
      )}
      {label}
    </span>
  );
}
