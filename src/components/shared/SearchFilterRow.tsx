/**
 * Shared single-row filter layout — matches Reported Incidents pattern.
 * Renders children separated by "or" labels, followed by Search + Clear buttons.
 */
import { Search, X } from 'lucide-react';
import { FleetToolbarButton } from '@/components/fleet/bus-master/FleetToolbarButton';

interface SearchFilterRowProps {
  children: React.ReactNode;
  onSearch: () => void;
  onClear: () => void;
}

export function SearchFilterRow({ children, onSearch, onClear }: SearchFilterRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {children}

      <FleetToolbarButton tone="primary" onClick={onSearch} className="gap-1.5 px-3">
        <Search className="h-3.5 w-3.5" />
        Search
      </FleetToolbarButton>

      <button
        type="button"
        onClick={onClear}
        className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-2sm font-medium text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700"
      >
        <X className="h-3.5 w-3.5" />
        Clear
      </button>
    </div>
  );
}

/** "or" separator between filter fields */
export function FilterSeparator() {
  return <span className="shrink-0 text-xs font-medium text-slate-400">or</span>;
}
