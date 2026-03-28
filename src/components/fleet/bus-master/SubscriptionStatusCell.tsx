import { cn } from '@/lib/utils';
import {
  subscriptionExpiryContext,
  subscriptionRangeDisplay,
  type SubscriptionExpiryTone,
} from './subscription-utils';

const TONE_CLASS: Record<SubscriptionExpiryTone, string> = {
  ok: 'text-emerald-700',
  warn: 'text-amber-700',
  expired: 'text-rose-700',
  neutral: 'text-slate-500',
};

export interface SubscriptionStatusCellProps {
  startDdMmYy: string;
  endDdMmYy: string;
  className?: string;
}

/** Date range + compact contract / expiry context */
export function SubscriptionStatusCell({
  startDdMmYy,
  endDdMmYy,
  className,
}: SubscriptionStatusCellProps) {
  const range = subscriptionRangeDisplay(startDdMmYy, endDdMmYy);
  const ctx = subscriptionExpiryContext(endDdMmYy);

  return (
    <div className={cn('min-w-0 text-left', className)}>
      <div className="truncate font-mono text-xs font-medium leading-tight text-slate-800">
        {range}
      </div>
      {ctx.line ? (
        <div
          className={cn(
            'mt-0.5 truncate text-2xs font-semibold leading-tight',
            TONE_CLASS[ctx.tone],
          )}
        >
          {ctx.line}
        </div>
      ) : null}
    </div>
  );
}


