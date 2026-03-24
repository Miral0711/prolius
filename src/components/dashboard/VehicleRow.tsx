import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface VehicleRowProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  /** Denser row padding for compact lists (e.g. Bus Live Tracking) */
  dense?: boolean;
}

/**
 * Demo-aligned vehicle list row. Same spacing and border logic; no custom layout system.
 */
export function VehicleRow({
  children,
  selected,
  onClick,
  className,
  dense,
}: VehicleRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full flex items-center justify-between gap-3 rounded-lg border text-left transition-all duration-150 ease-out',
        dense ? 'px-3 py-2.5 min-h-[44px] gap-2' : 'px-4 py-4 min-h-[52px]',
        'hover:bg-gray-50',
        selected
          ? 'border-l-4 border-l-green-600 border-gray-200 bg-green-50'
          : 'border-l-transparent border-gray-200',
        className,
      )}
    >
      {children}
    </button>
  );
}
