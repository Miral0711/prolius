import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ChartPanelProps {
  children: ReactNode;
  className?: string;
  height?: string | number;
}

export function ChartPanel({
  children,
  className,
  height = 200,
}: ChartPanelProps) {
  const style =
    typeof height === 'number' ? { height: `${height}px` } : { height };

  return (
    <div className={cn('w-full min-w-0', className)} style={style}>
      {children}
    </div>
  );
}


