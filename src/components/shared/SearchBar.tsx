import type { ReactNode } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
  onClear: () => void;
  placeholder?: string;
  /** Extra controls rendered after the input (filters, dropdowns, etc.) */
  extra?: ReactNode;
  className?: string;
}

/**
 * Reusable search bar with icon, clear button, and optional extra controls.
 * Triggers search on Enter key or Search button click.
 */
export function SearchBar({
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = 'Search…',
  extra,
  className,
}: SearchBarProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <div className="relative min-w-[220px] flex-1 max-w-[480px]">
        <Search
          className="pointer-events-none absolute left-2.5 top-1/2 z-10 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          className="h-8 w-full border-slate-200 bg-white pl-8 text-2sm shadow-none placeholder:font-normal placeholder:text-slate-300 focus-visible:border-[#2e5f8a]/50 focus-visible:ring-2 focus-visible:ring-[#2e5f8a]/10"
        />
      </div>
      {extra}
      <button
        type="button"
        onClick={onSearch}
        className="flex h-8 w-8 items-center justify-center rounded-md bg-[#3d6b8e] text-white transition-colors hover:bg-[#2e5270]"
        aria-label="Search"
      >
        <Search className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={onClear}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50"
        aria-label="Clear search"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
