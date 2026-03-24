import { cn } from '@/lib/utils';

export type PowerState = 'Enable' | 'Disable';

export interface PowerBadgeProps {
  power: PowerState;
  className?: string;
}

export function PowerBadge({ power, className }: PowerBadgeProps) {
  const isOn = power === 'Enable';
  return (
    <span
      className={cn(
        'inline-flex h-6 shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded border px-2 text-[10px] font-semibold uppercase leading-none tracking-wide',
        isOn
          ? 'border-emerald-200/80 bg-emerald-50 text-emerald-800'
          : 'border-rose-200/80 bg-rose-50 text-rose-800',
        className,
      )}
    >
      <span
        className={cn('h-1.5 w-1.5 shrink-0 rounded-full', isOn ? 'bg-emerald-500' : 'bg-rose-400')}
      />
      {isOn ? 'Enable' : 'Disable'}
    </span>
  );
}
