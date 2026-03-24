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
          "relative flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 ease-in-out",
          "hover:bg-slate-100/60 active:scale-95",
          "text-slate-500 hover:text-slate-800",
          isActive && "bg-slate-100 text-slate-900",
          className
        )}
        {...props}
      >
        <Icon className="h-[18px] w-[18px] stroke-[1.6]" />
        {badge !== undefined && (
          <span className="absolute right-1.5 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-rose-500 text-[9px] font-semibold text-white ring-2 ring-white shadow-sm">
            {badge}
          </span>
        )}
      </button>
    );
  }
);

IconActionButton.displayName = 'IconActionButton';
