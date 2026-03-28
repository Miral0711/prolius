import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/dashboard/StatusBadge';

export type PowerState = 'Enable' | 'Disable';

export interface PowerBadgeProps {
  power: PowerState;
  className?: string;
}

/** Power column — same pill system as WASL / Status (emerald = enable, rose = disable). */
export function PowerBadge({ power, className }: PowerBadgeProps) {
  const on = power === 'Enable';
  return (
    <StatusBadge
      label={power}
      variant={on ? 'emerald' : 'rose'}
      withDot
      preserveCase
      size="sm"
      className={cn('whitespace-nowrap', className)}
    />
  );
}


