import * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { fleetSurface } from './tokens';

export type ActionIconVariant = 'default' | 'danger' | 'warning' | 'info' | 'success';

const variantClasses: Record<ActionIconVariant, string> = {
  default: 'text-slate-500 hover:bg-slate-50 hover:text-slate-800',
  danger: 'text-rose-600 hover:bg-rose-50/90 hover:text-rose-700',
  warning: 'text-amber-600 hover:bg-amber-50/90 hover:text-amber-800',
  info: 'text-blue-600 hover:bg-blue-50/90 hover:text-blue-700',
  success: 'text-emerald-600 hover:bg-emerald-50/90 hover:text-emerald-700',
};

export interface ActionButtonItem {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: ActionIconVariant;
}

export interface ActionButtonGroupProps {
  items: ActionButtonItem[];
  className?: string;
  /** Tighter row of icons (Bus Master dense action column) */
  dense?: boolean;
}

export function ActionButtonGroup({ items, className, dense }: ActionButtonGroupProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <div
        className={cn(
          'inline-flex items-center justify-center',
          dense ? 'gap-0.5' : fleetSurface.actionGap,
          className,
        )}
      >
        {items.map((item, i) => (
          <ActionIconButton key={i} dense={dense} {...item} />
        ))}
      </div>
    </TooltipProvider>
  );
}

function ActionIconButton({
  icon: Icon,
  label,
  onClick,
  variant = 'default',
  dense,
}: ActionButtonItem & { dense?: boolean }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={onClick}
          className={cn(
            'flex shrink-0 items-center justify-center rounded border border-slate-200/90 bg-white',
            'transition-colors duration-150 hover:border-slate-300 active:bg-slate-100/70',
            dense ? 'h-6 w-6 rounded-sm' : 'h-8 w-8 rounded-md',
            variantClasses[variant],
          )}
        >
          <Icon className={dense ? 'h-3 w-3' : 'h-4 w-4'} aria-hidden />
        </button>
      </TooltipTrigger>
      <TooltipContent className="border-none bg-slate-900 px-2 py-1 text-[9px] font-medium text-white">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
