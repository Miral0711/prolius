import { cn } from '@/lib/utils';

export type StatusVariant =
  | 'available'
  | 'emerald'
  | 'on-trip'
  | 'blue'
  | 'offline'
  | 'slate'
  | 'maintenance'
  | 'amber'
  | 'alert'
  | 'rose'
  | 'neutral'
  | 'pending'
  | 'violet';

const VARIANT_STYLES: Record<StatusVariant, string> = {
  available: 'bg-emerald-50 text-emerald-800 border-emerald-200/70',
  emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200/70',
  'on-trip': 'bg-blue-50 text-blue-800 border-blue-200/70',
  blue: 'bg-blue-50 text-blue-800 border-blue-200/70',
  offline: 'bg-slate-50 text-slate-700 border-slate-200/70',
  slate: 'bg-slate-50 text-slate-700 border-slate-200/70',
  maintenance: 'bg-amber-50 text-amber-900 border-amber-200/70',
  amber: 'bg-amber-50 text-amber-900 border-amber-200/70',
  alert: 'bg-rose-50 text-rose-800 border-rose-200/70',
  rose: 'bg-rose-50 text-rose-800 border-rose-200/70',
  neutral: 'bg-slate-50 text-slate-700 border-slate-200/70',
  pending: 'bg-violet-50 text-violet-800 border-violet-200/70',
  violet: 'bg-violet-50 text-violet-800 border-violet-200/70',
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
  /** Compact pill for dense data tables (fleet / admin) */
  size?: 'default' | 'sm';
  className?: string;
}

export function StatusBadge({
  label,
  variant = 'neutral',
  withDot = false,
  preserveCase = false,
  size = 'default',
  className,
}: StatusBadgeProps) {
  const dotClass = VARIANT_DOT[variant] ?? 'bg-slate-400';

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center gap-0.5 rounded-sm border font-semibold shadow-xs transition-colors',
        size === 'default' &&
          'min-h-[1.125rem] px-1.5 py-0 text-[11px] leading-none tracking-[0.01rem]',
        size === 'sm' &&
          'h-4.5 min-h-[1rem] gap-1 px-1.25 py-0 text-[10px] leading-none tracking-[0.01rem]',
        preserveCase ? 'normal-case' : 'uppercase',
        VARIANT_STYLES[variant],
        className,
      )}
    >
      {withDot && (
        <span
          className={cn('h-1.5 w-1.5 shrink-0 rounded-full', dotClass)}
          aria-hidden
        />
      )}
      {label}
    </span>
  );
}


