import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface PrimaryButtonProps extends React.ComponentProps<typeof Button> {}

export function PrimaryButton({ className, children, ...props }: PrimaryButtonProps) {
  return (
    <Button
      className={cn(
        'h-8 shrink-0 gap-1.5 rounded-md bg-[#2e5f8a] px-3 text-xs font-medium text-white',
        'shadow-md shadow-blue-500/20 hover:bg-[#1e4a6e]',
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}


