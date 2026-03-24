import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface DetailPanelProps {
  title: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * Demo-aligned detail panel. Card + CardHeader + CardTitle + CardContent.
 */
export function DetailPanel({
  title,
  children,
  className,
  contentClassName,
}: DetailPanelProps) {
  return (
    <Card
      className={cn(
        'flex flex-col overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm',
        className,
      )}
    >
      <CardHeader className="shrink-0 pb-2 border-b border-gray-200">
        <CardTitle className="text-base font-semibold leading-none tracking-tight text-gray-900">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent
        className={cn('flex-1 min-h-0 overflow-y-auto', contentClassName)}
      >
        {children}
      </CardContent>
    </Card>
  );
}
