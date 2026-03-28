import { cn } from '@/lib/utils';

export type MdtHealthState = 'online' | 'degraded' | 'offline';

const HEALTH_LABEL: Record<MdtHealthState, string> = {
  online: 'Device online',
  degraded: 'Degraded link',
  offline: 'No signal',
};

const HEALTH_CLASS: Record<MdtHealthState, string> = {
  online: 'text-emerald-700',
  degraded: 'text-amber-700',
  offline: 'text-rose-700',
};

export interface MdtDeviceCellProps {
  mdtId: string;
  health: MdtHealthState;
  /** e.g. "Last ping 12m ago" */
  lastPingNote?: string;
  className?: string;
}

/** MDT id + textual device health (no icon strip). */
export function MdtDeviceCell({ mdtId, health, lastPingNote, className }: MdtDeviceCellProps) {
  const sub = lastPingNote
    ? `${HEALTH_LABEL[health]} · ${lastPingNote}`
    : HEALTH_LABEL[health];

  return (
    <div className={cn('min-w-0 text-left', className)}>
      <div className="truncate font-mono text-xs font-medium tabular-nums text-slate-800">
        {mdtId}
      </div>
      <div
        className={cn(
          'mt-0.5 truncate text-2xs font-medium leading-tight',
          HEALTH_CLASS[health],
        )}
      >
        {sub}
      </div>
    </div>
  );
}


