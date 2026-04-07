import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FleetToolbarButton } from '@/components/fleet/bus-master/FleetToolbarButton';

interface VehicleProfilesSearchBarProps {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
  onClear: () => void;
}

export function VehicleProfilesSearchBar({
  value,
  onChange,
  onSearch,
  onClear,
}: VehicleProfilesSearchBarProps) {
  return (
    <div
      className="flex flex-wrap items-center gap-2 rounded-md border border-slate-200/90 bg-white px-3 py-1.5 shadow-sm"
    >
      <div className="relative min-w-[260px] flex-1 max-w-[480px]">
        <Search
          className="pointer-events-none absolute left-2.5 top-1/2 z-10 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
        <Input
          placeholder="Search by vehicle profile type, manufacturer, model..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          className="h-8 w-full border-slate-200 bg-white pl-8 text-2sm shadow-none placeholder:font-normal placeholder:text-slate-300 focus-visible:border-[#2e5f8a]/50 focus-visible:ring-2 focus-visible:ring-[#2e5f8a]/10"
        />
      </div>

      <FleetToolbarButton tone="primary" onClick={onSearch} className="px-4">
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
