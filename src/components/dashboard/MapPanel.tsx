import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

export interface MapPanelProps {
  title?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * Demo-aligned map panel. Card + CardContent; optional title can be rendered inside content.
 */
export function MapPanel({
  title,
  children,
  className,
  contentClassName,
}: MapPanelProps) {
  return (
    <Card
      className={cn(
        'flex flex-col overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm',
        className,
      )}
    >
      <CardContent
        className={cn(
          'flex-1 min-h-0 flex flex-col items-center justify-center p-5',
          contentClassName,
        )}
      >
        {title != null && title !== '' && (
          <p className="text-sm font-semibold text-gray-900 mb-2 w-full">
            {title}
          </p>
        )}
        {children}
      </CardContent>
    </Card>
  );
}


