import { type ElementType, type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface IconActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ElementType;
  badge?: string | number;
  isActive?: boolean;
}

export const IconActionButton = forwardRef<HTMLButtonElement, IconActionButtonProps>(
  ({ icon: Icon, badge, isActive, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'relative flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 ease-in-out',
          'hover:bg-slate-100/60 active:scale-95',
          'text-slate-500 hover:text-slate-800',
          isActive && 'bg-slate-100 text-slate-900',
          className,
        )}
        {...props}
      >
        <Icon className="h-4 w-4 stroke-[1.6]" />
        {badge !== undefined && (
          <span className="absolute right-1 top-1 flex h-3 min-w-[14px] items-center justify-center rounded-full bg-rose-500 px-0.5 text-2xs font-semibold text-white shadow-sm ring-2 ring-white">
            {badge}
          </span>
        )}
      </button>
    );
  }
);

IconActionButton.displayName = 'IconActionButton';


