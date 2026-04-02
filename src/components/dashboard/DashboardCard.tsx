import { cn } from '@/lib/utils';

/** Glassmorphism enterprise card — consistent across all dashboard widgets */
export function DashboardCard({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'rounded-lg border border-white/60 bg-white/70 p-3',
        'shadow-[0_2px_16px_-4px_rgba(0,0,0,0.08)]',
        'backdrop-blur-[12px]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}


