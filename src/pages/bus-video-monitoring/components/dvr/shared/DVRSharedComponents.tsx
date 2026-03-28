import React from 'react';
import { Calendar, ChevronRight, Clock, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

/**
 * DVR / archive surfaces — semantic roles aligned with dashboard `typography`
 * (`src/lib/typography.ts`, `src/styles/typography.css`).
 */
export const dvrTypography = {
  /** All DVR section chrome titles (sidebar, map, telemetry) — one token */
  sectionTitle: typography.sectionTitle,
  sectionSubtitle: cn(typography.meta, 'text-gray-400 tracking-normal'),
  /** @deprecated Use sectionTitle — same utility, kept for imports */
  panelHeading: typography.sectionTitle,
  fieldLabel: cn(typography.body, 'text-gray-400 tracking-normal'),
  value: cn('text-sm font-medium tabular-nums text-gray-800 tracking-normal'),
  valueTight: cn('text-sm font-medium tabular-nums text-gray-800 tracking-tight'),
  metadata: cn(typography.body, 'text-gray-500 tracking-normal'),
  control: cn('text-xs font-medium tracking-normal'),
  legend: cn(typography.body, 'text-gray-400 tracking-normal'),
  /** Dark video chrome — same hierarchy as light panels */
  videoTitle: cn('text-sm font-medium text-white tracking-normal'),
  videoTag: cn('text-xs font-medium text-white/60 tracking-normal'),
  videoMeta: cn('text-xs font-normal text-white/45 tabular-nums tracking-normal'),
  videoMetaStrong: cn('text-xs font-medium text-white/75 tabular-nums tracking-normal'),
  videoTimecode: cn('text-xs font-medium text-white/65 tabular-nums tracking-normal'),
} as const;

/** Short label for the channel switcher (title case, compact). */
export function formatDvrChannelChipLabel(channel: string): string {
  const t = channel.trim();
  if (/^all channels$/i.test(t)) return 'All';
  const head = t.split(/\s*[–-]\s*/)[0].trim();
  return head.replace(/^CAM\b/i, 'Cam');
}

interface PageSectionCardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const PageSectionCard: React.FC<PageSectionCardProps> = ({
  children,
  className,
  noPadding = false,
}) => (
  <div
    className={cn(
      'bg-white border border-slate-200/50 shadow-sm rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:border-blue-200/20',
      !noPadding && 'p-3',
      className,
    )}
  >
    {children}
  </div>
);

/* ─── 2. SECTION TITLE ─────────────────────────────────────────── */
interface SectionTitleProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  icon: Icon,
  title,
  subtitle,
  className,
}) => (
  <div className={cn('flex items-center gap-2 mb-3', className)}>
    {Icon && (
      <div className="h-6 w-6 rounded bg-blue-50/50 text-blue-500 flex items-center justify-center border border-blue-100/30">
        <Icon className="h-3 w-3" />
      </div>
    )}
    <div className="flex flex-col">
      <h3 className={cn(dvrTypography.sectionTitle, 'mb-0.5 leading-none')}>
        {title}
      </h3>
      {subtitle && (
        <p className={cn(dvrTypography.sectionSubtitle, 'leading-none')}>
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

/* ─── 3. STAT MINI CARD ────────────────────────────────────────── */
interface StatMiniCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
  /** Extra room + line-height for value row (e.g. GPS strip where flex parents can clip tight metrics). */
  comfortableMetrics?: boolean;
}

export const StatMiniCard: React.FC<StatMiniCardProps> = ({
  label,
  value,
  unit,
  icon: Icon,
  className,
  comfortableMetrics = false,
}) => (
  <div
    className={cn(
      'p-2.5 bg-slate-50/50 border border-slate-200/40 rounded-lg transition-all hover:bg-white hover:border-blue-100/60 group',
      comfortableMetrics && 'min-h-[4.25rem] pb-3 pt-2.5',
      className,
    )}
  >
    <p
      className={cn(
        dvrTypography.fieldLabel,
        'mb-1 flex items-center gap-1 group-hover:text-gray-500 transition-colors',
        comfortableMetrics && 'mb-1.5',
      )}
    >
      {Icon && <Icon className="h-2.5 w-2.5 shrink-0" />} {label}
    </p>
    <div
      className={cn(
        'flex items-baseline gap-1',
        comfortableMetrics && 'min-h-[1.35rem] items-end pb-px',
      )}
    >
      <span
        className={cn(
          dvrTypography.value,
          comfortableMetrics ? 'leading-snug' : 'leading-none',
        )}
      >
        {value}
      </span>
      {unit && (
        <span
          className={cn(
            dvrTypography.fieldLabel,
            comfortableMetrics ? 'leading-snug' : 'leading-none',
          )}
        >
          {unit}
        </span>
      )}
    </div>
  </div>
);

/* ─── 4. STAT BADGE (NEW) ─────────────────────────────────────── */
export const StatBadge = ({
  label,
  value,
  color = 'blue',
  className,
}: {
  label: string;
  value: string | number;
  color?: string;
  className?: string;
}) => {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    slate: 'bg-slate-50 text-slate-600 border-slate-200',
  };

  return (
    <div
      className={cn(
        'px-2 py-1 rounded-md border flex flex-col items-center justify-center min-w-0',
        colors[color] || colors.blue,
        className,
      )}
    >
      <span className={cn(dvrTypography.fieldLabel, 'leading-none mb-1')}>
        {label}
      </span>
      <span className="text-sm font-medium leading-none">{value}</span>
    </div>
  );
};

/* ─── 5. FILTER INPUT ─────────────────────────────────────────── */
interface FilterInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  /** One row: label + field (helps narrow grid columns). */
  inline?: boolean;
}

const dvrFilterLabelClass = cn(
  'ml-0.5 flex min-h-4 shrink-0 items-center gap-1.5 leading-none',
  dvrTypography.fieldLabel,
);

/** Strict equal height + flex shell; native picker sits full-size on top (opacity-0) */
const dvrDateTimeShellClass = cn(
  'relative box-border flex h-10 min-h-10 max-h-10 w-full min-w-0 items-stretch overflow-hidden rounded-lg border border-slate-200/80 bg-slate-50/50',
  'transition-all hover:border-slate-300 hover:bg-white [color-scheme:light]',
  'focus-within:border-blue-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500/10',
);

/** Single shared row: same padding, gap, vertical centering for Date + time overlays */
const dvrOverlayDisplayRowClass =
  'pointer-events-none absolute inset-0 z-[1] flex h-full min-h-0 w-full min-w-0 flex-nowrap items-center justify-center gap-1.5 px-2.5' as const;

const dvrOverlayIconClass = 'size-3.5 shrink-0 text-gray-700' as const;

/** Formatted display from ISO yyyy-mm-dd → DD-MM-YYYY (always 2-digit day/month) */
function formatIsoDateToDvrDisplay(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return '';
  return `${m[3]}-${m[2]}-${m[1]}`;
}

function normalizeTimeDisplay(t: string): string {
  if (!t?.trim()) return '';
  const parts = t.trim().split(':');
  const h = (parts[0] ?? '').padStart(2, '0');
  const min = (parts[1] ?? '').padStart(2, '0');
  return `${h}:${min}`;
}

type DvrOverlayPickerProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'className' | 'size'
> & { className?: string };

function DvrOverlayDateInput({ className, id, ...props }: DvrOverlayPickerProps) {
  const { value, defaultValue, onChange, disabled, ...rest } = props;
  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = React.useState(
    () => (typeof defaultValue === 'string' ? defaultValue : '') || '',
  );
  const current = (isControlled ? String(value ?? '') : uncontrolled) || '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolled(e.target.value);
    onChange?.(e);
  };

  const display = formatIsoDateToDvrDisplay(current);

  return (
    <div
      className={cn(
        dvrDateTimeShellClass,
        'min-w-[7.75rem] shrink-0',
        className,
      )}
    >
      <input
        id={id}
        type="date"
        {...(isControlled
          ? { value: current || '', onChange: handleChange }
          : { defaultValue: defaultValue as string | undefined, onChange: handleChange })}
        disabled={disabled}
        className="absolute inset-0 z-[2] m-0 box-border h-full min-h-0 w-full min-w-0 cursor-pointer border-0 bg-transparent p-0 opacity-0 disabled:cursor-not-allowed"
        {...rest}
      />
      <div className={dvrOverlayDisplayRowClass} aria-hidden>
        <span
          className={cn(
            'inline-flex min-h-0 items-center whitespace-nowrap text-sm font-medium tabular-nums leading-none',
            current ? 'text-gray-800' : 'text-slate-400',
          )}
        >
          {display || 'DD-MM-YYYY'}
        </span>
        <span className="inline-flex size-3.5 shrink-0 items-center justify-center">
          <Calendar
            className={dvrOverlayIconClass}
            aria-hidden
            strokeWidth={1.75}
          />
        </span>
      </div>
    </div>
  );
}

function DvrOverlayTimeInput({ className, id, ...props }: DvrOverlayPickerProps) {
  const { value, defaultValue, onChange, disabled, ...rest } = props;
  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = React.useState(
    () => (typeof defaultValue === 'string' ? defaultValue : '') || '',
  );
  const current = (isControlled ? String(value ?? '') : uncontrolled) || '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolled(e.target.value);
    onChange?.(e);
  };

  const display = normalizeTimeDisplay(current);

  return (
    <div className={cn(dvrDateTimeShellClass, className)}>
      <input
        id={id}
        type="time"
        {...(isControlled
          ? { value: current || '', onChange: handleChange }
          : { defaultValue: defaultValue as string | undefined, onChange: handleChange })}
        disabled={disabled}
        className="absolute inset-0 z-[2] m-0 box-border h-full min-h-0 w-full min-w-0 cursor-pointer border-0 bg-transparent p-0 opacity-0 disabled:cursor-not-allowed"
        {...rest}
      />
      <div className={dvrOverlayDisplayRowClass} aria-hidden>
        <span
          className={cn(
            'inline-flex min-h-0 items-center whitespace-nowrap text-sm font-medium tabular-nums leading-none',
            current ? 'text-gray-800' : 'text-slate-400',
          )}
        >
          {display || 'HH:MM'}
        </span>
        <span className="inline-flex size-3.5 shrink-0 items-center justify-center">
          <Clock
            className={dvrOverlayIconClass}
            aria-hidden
            strokeWidth={1.75}
          />
        </span>
      </div>
    </div>
  );
}

export const FilterInput: React.FC<FilterInputProps> = ({
  label,
  icon: Icon,
  className,
  type,
  inline = false,
  id: idProp,
  ...props
}) => {
  const autoId = React.useId();
  const fieldId = idProp ?? `dvr-filter-${autoId}`;

  const control =
    type === 'date' ? (
      <DvrOverlayDateInput id={fieldId} {...props} />
    ) : (
      <input
        id={fieldId}
        type={type}
        {...props}
        className={cn(
          'box-border flex h-10 min-h-10 w-full min-w-0 items-center rounded-lg border border-slate-200/80 bg-slate-50/50 py-0 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 transition-all hover:bg-white hover:border-slate-300 [color-scheme:light]',
          'justify-start px-2.5 text-left font-medium leading-normal',
        )}
      />
    );

  if (inline) {
    return (
      <div className={cn('flex min-w-0 items-center gap-1.5', className)}>
        <label
          htmlFor={fieldId}
          className={cn(dvrFilterLabelClass, 'ml-0')}
        >
          {Icon && <Icon className="h-2.5 w-2.5 shrink-0 text-slate-400" />}
          {label}
        </label>
        <div className="relative min-w-0 flex-1 overflow-visible group/input">
          {control}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex min-w-0 flex-col gap-1', className)}>
      <label htmlFor={fieldId} className={dvrFilterLabelClass}>
        {Icon && <Icon className="h-2.5 w-2.5 shrink-0 text-slate-400" />}
        {label}
      </label>
      <div className="relative min-w-0 overflow-visible group/input">
        {control}
      </div>
    </div>
  );
};

/* ─── 6. TIME INPUT ───────────────────────────────────────────── */
export const TimeInput: React.FC<
  FilterInputProps & { position?: 'from' | 'to' }
> = ({
  label,
  icon: Icon,
  position: _position,
  className,
  id: idProp,
  ...props
}) => {
  const autoId = React.useId();
  const fieldId = idProp ?? `dvr-time-${autoId}`;

  return (
    <div
      className={cn(
        'group/input flex min-w-0 w-full flex-col gap-1',
        className,
      )}
    >
      <label htmlFor={fieldId} className={dvrFilterLabelClass}>
        {Icon && <Icon className="h-2.5 w-2.5 shrink-0 text-slate-400" />}
        {label}
      </label>
      <div className="relative min-w-0 overflow-visible">
        <DvrOverlayTimeInput id={fieldId} className="min-w-0" {...props} />
      </div>
    </div>
  );
};

/* ─── 7. CHANNEL CHIP GROUP ───────────────────────────────────── */
interface ChannelChipGroupProps {
  channels: string[];
  selected: string;
  onChange: (val: string) => void;
  label?: string;
  icon?: LucideIcon;
}

export const ChannelChipGroup: React.FC<ChannelChipGroupProps> = ({
  channels,
  selected,
  onChange,
  label,
  icon: Icon,
}) => (
  <div className="space-y-2">
    {label && (
      <label
        className={cn(
          dvrTypography.fieldLabel,
          'flex items-center gap-1.5 ml-0.5',
        )}
      >
        {Icon && <Icon className="h-2.5 w-2.5" />} {label}
      </label>
    )}
    <div className="flex p-1 bg-slate-100/60 border border-slate-200/40 rounded-xl gap-1">
      {channels.map((ch) => (
        <button
          key={ch}
          onClick={() => onChange(ch)}
          className={cn(
            dvrTypography.control,
            'flex-1 px-1.5 py-1.5 rounded-lg transition-all truncate border',
            selected === ch
              ? 'bg-white text-blue-600 border-white shadow-sm ring-1 ring-slate-200/20'
              : 'text-gray-500 border-transparent hover:text-gray-700',
          )}
        >
          {formatDvrChannelChipLabel(ch)}
        </button>
      ))}
    </div>
  </div>
);

/* ─── 8. RECORDING LIST ITEM ──────────────────────────────────── */
interface RecordingListItemProps {
  id: string;
  time: string;
  cam: string;
  icon: LucideIcon;
  active?: boolean;
}

export const RecordingListItem: React.FC<RecordingListItemProps> = ({
  id,
  time,
  cam,
  icon: Icon,
  active,
}) => (
  <div
    className={cn(
      'group p-2.5 flex items-center gap-3 transition-all cursor-pointer rounded-xl border',
      active
        ? 'bg-white border-blue-400 shadow-[0_5px_15px_-3px_rgba(59,130,246,0.15)] ring-1 ring-blue-400/10'
        : 'bg-white border-slate-200/60 hover:border-blue-200/60 hover:bg-slate-50/30',
    )}
  >
    <div
      className={cn(
        'h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-300',
        active
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
          : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500',
      )}
    >
      <Icon className="h-4 w-4" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-0.5">
        <p
          className={cn(
            dvrTypography.valueTight,
            'truncate leading-none',
            active ? 'text-blue-700' : 'text-gray-800',
          )}
        >
          {id}
        </p>
        <span className={cn(dvrTypography.fieldLabel, 'leading-none shrink-0')}>
          {cam}
        </span>
      </div>
      <p
        className={cn(
          dvrTypography.metadata,
          'tabular-nums leading-none mt-1 group-hover:text-gray-600 transition-colors',
        )}
      >
        {time}
      </p>
    </div>
    <ChevronRight
      className={cn(
        'h-3.5 w-3.5 transition-all duration-300',
        active
          ? 'text-blue-500 translate-x-0'
          : 'text-slate-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0',
      )}
    />
  </div>
);

/* ─── 9. ACTION BUTTON ────────────────────────────────────────── */
interface ActionButtonProps {
  label: string;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient';
  onClick?: () => void;
  className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon: Icon,
  variant = 'primary',
  onClick,
  className,
}) => (
  <button
    onClick={onClick}
    className={cn(
      'h-9 px-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 flex-1 shadow-sm',
      dvrTypography.control,
      variant === 'primary' &&
        'bg-[#1e293b] border border-[#1e293b] text-white hover:bg-slate-800 hover:shadow-md',
      variant === 'secondary' &&
        'bg-blue-600 border border-blue-600 text-white hover:bg-blue-700 hover:shadow-md',
      variant === 'outline' &&
        'bg-white border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/20',
      variant === 'gradient' &&
        'bg-gradient-to-r from-blue-600 to-emerald-500 border border-transparent text-white hover:opacity-95 hover:shadow-md hover:shadow-blue-200/50',
      className,
    )}
  >
    {Icon && <Icon className="h-3.5 w-3.5" />}
    {label}
  </button>
);

/* ─── 10. LEGEND ITEM ────────────────────────────────────────── */
interface LegendItemProps {
  label: string;
  color: string;
  className?: string;
}

export const LegendItem: React.FC<LegendItemProps> = ({
  label,
  color,
  className,
}) => (
  <div className={cn('flex items-center gap-1.5', className)}>
    <div className={cn('h-2 w-2 rounded-full shadow-sm', color)} />
    <span className={cn(dvrTypography.legend, 'leading-none')}>{label}</span>
  </div>
);


