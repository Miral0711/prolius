import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface SectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * Demo-aligned section card. Uses Card + CardHeader + CardTitle + CardContent.
 */
export function SectionCard({
  title,
  description,
  children,
  actions,
  className,
  contentClassName,
}: SectionCardProps) {
  return (
    <Card
      className={cn(
        'flex flex-col min-h-0 bg-white border border-gray-200 rounded-xl shadow-sm',
        className,
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between gap-2.5 pb-2 shrink-0 border-b border-gray-200">
        <CardTitle className={typography.cardTitle}>{title}</CardTitle>
        {actions != null && (
          <div className="flex items-center gap-2.5">{actions}</div>
        )}
      </CardHeader>
      <CardContent className={cn('min-h-0', contentClassName)}>
        {description != null && description !== '' && (
          <p className={cn(typography.body, 'text-gray-500 mb-4')}>{description}</p>
        )}
        {children}
      </CardContent>
    </Card>
  );
}


