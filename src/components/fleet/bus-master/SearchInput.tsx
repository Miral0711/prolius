import * as React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface SearchInputProps extends Omit<React.ComponentProps<typeof Input>, 'className'> {
  className?: string;
  containerClassName?: string;
}

export function SearchInput({
  className,
  containerClassName,
  ...props
}: SearchInputProps) {
  return (
    <div className={cn('relative min-w-0 flex-1 max-w-[280px]', containerClassName)}>
      <Search
        className="pointer-events-none absolute left-2 top-1/2 z-10 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
        aria-hidden
      />
      <Input
        className={cn(
          'h-8 w-full border-slate-200 bg-white pl-8 text-2sm font-medium text-slate-800 shadow-none',
          'placeholder:font-normal placeholder:text-slate-300',
          'focus-visible:border-blue-500/50 focus-visible:ring-2 focus-visible:ring-blue-500/10',
          className,
        )}
        {...props}
      />
    </div>
  );
}


