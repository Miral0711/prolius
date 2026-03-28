import React from 'react';
import { ChevronRight, LucideIcon } from 'lucide-react';
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

/**
 * In-flow picker icon (not absolute) so native text never draws underneath it.
 * Slightly smaller, darker neutral gray — calendar + clock match.
 */
const nativePickerIndicator = [
  '[&::-webkit-calendar-picker-indicator]:ml-2',
  '[&::-webkit-calendar-picker-indicator]:mr-1.5',
  '[&::-webkit-calendar-picker-indicator]:h-3',
  '[&::-webkit-calendar-picker-indicator]:w-3',
  '[&::-webkit-calendar-picker-indicator]:min-h-3',
  '[&::-webkit-calendar-picker-indicator]:min-w-3',
  '[&::-webkit-calendar-picker-indicator]:shrink-0',
  '[&::-webkit-calendar-picker-indicator]:cursor-pointer',
  '[&::-webkit-calendar-picker-indicator]:opacity-100',
  '[&::-webkit-calendar-picker-indicator]:[filter:brightness(0)_saturate(100%)_invert(32%)_sepia(12%)_saturate(480%)_hue-rotate(176deg)_brightness(0.94)_contrast(0.96)]',
].join(' ') as const;

/** Minimal WebKit tweaks — avoid flex/gap on fields-wrapper (breaks 12-03-2026 / 07:00). */
const dateDatetimeEdit = [
  '[&::-webkit-datetime-edit]:m-0 [&::-webkit-datetime-edit]:min-w-0 [&::-webkit-datetime-edit]:flex-1 [&::-webkit-datetime-edit]:p-0',
  '[&::-webkit-datetime-edit]:text-sm [&::-webkit-datetime-edit]:font-normal [&::-webkit-datetime-edit]:text-gray-800',
  '[&::-webkit-datetime-edit]:text-center',
  '[&::-webkit-datetime-edit-fields-wrapper]:m-0 [&::-webkit-datetime-edit-fields-wrapper]:p-0',
  '[&::-webkit-datetime-edit-fields-wrapper]:text-center',
].join(' ') as const;

const timeDatetimeEdit = [
  '[&::-webkit-datetime-edit]:m-0 [&::-webkit-datetime-edit]:min-w-0 [&::-webkit-datetime-edit]:flex-1 [&::-webkit-datetime-edit]:p-0',
  '[&::-webkit-datetime-edit]:text-sm [&::-webkit-datetime-edit]:font-normal [&::-webkit-datetime-edit]:text-gray-800',
  '[&::-webkit-datetime-edit]:text-center',
  '[&::-webkit-datetime-edit-fields-wrapper]:m-0 [&::-webkit-datetime-edit-fields-wrapper]:p-0',
  '[&::-webkit-datetime-edit-fields-wrapper]:text-center',
].join(' ') as const;

const dvrFilterLabelClass = cn(
  'ml-0.5 flex h-[13px] shrink-0 items-center gap-1.5 leading-none',
  dvrTypography.fieldLabel,
);

/** Left inset + right inset for trailing icon (in-flow; no overlap). */
const dvrDateTimeInputPad = 'pl-3 pr-1.5' as const;

export const FilterInput: React.FC<FilterInputProps> = ({
  label,
  icon: Icon,
  className,
  type,
  inline = false,
  ...props
}) => {
  const inputClassName = cn(
    'box-border flex h-10 w-full min-h-10 min-w-0 items-center rounded-lg border border-slate-200/80 bg-slate-50/50 py-0 text-sm leading-normal text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 transition-all hover:bg-white hover:border-slate-300 [color-scheme:light]',
    type === 'date'
      ? cn(
          'justify-center text-center font-normal',
          dvrDateTimeInputPad,
          nativePickerIndicator,
          dateDatetimeEdit,
        )
      : 'justify-start px-2.5 text-left font-medium',
  );

  const control = <input type={type} {...props} className={inputClassName} />;

  if (inline) {
    return (
      <div className={cn('flex min-w-0 items-center gap-1.5', className)}>
        <label className={cn(dvrFilterLabelClass, 'ml-0')}>
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
    <div className={cn('flex min-w-0 flex-col gap-0.5', className)}>
      <label className={dvrFilterLabelClass}>
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
> = ({ label, icon: Icon, position, className, ...props }) => (
  <div
    className={cn(
      'group/input flex min-w-0 w-full flex-col gap-0.5',
      className,
    )}
  >
    <label className={dvrFilterLabelClass}>
      {Icon && <Icon className="h-2.5 w-2.5 shrink-0 text-slate-400" />}
      {label}
    </label>
    <div className="relative min-w-0 overflow-visible">
      <input
        type="time"
        {...props}
        className={cn(
          'box-border flex h-10 w-full min-h-10 min-w-0 items-center justify-center rounded-lg border border-slate-200/80 bg-slate-50/50 py-0 text-center text-sm font-normal leading-normal text-gray-800',
          dvrDateTimeInputPad,
          'focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10',
          'transition-all hover:border-slate-300 hover:bg-white [color-scheme:light]',
          nativePickerIndicator,
          timeDatetimeEdit,
        )}
      />
    </div>
  </div>
);

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


