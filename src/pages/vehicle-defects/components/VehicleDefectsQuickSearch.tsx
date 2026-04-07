import { X } from 'lucide-react';
import { FilterDropdown } from '@/components/fleet/bus-master/FilterDropdown';
import { FleetToolbarButton } from '@/components/fleet/bus-master/FleetToolbarButton';
import { Input } from '@/components/ui/input';
import { CREATED_BY_OPTIONS } from '../mock-data';

export interface QuickSearchState {
  registration: string;
  defectId: string;
  createdBy: string;
}

interface VehicleDefectsQuickSearchProps {
  state: QuickSearchState;
  onChange: (s: QuickSearchState) => void;
  onSearch: () => void;
  onClear: () => void;
  registrationOptions: string[];
}

export function VehicleDefectsQuickSearch({
  state,
  onChange,
  onSearch,
  onClear,
  registrationOptions,
}: VehicleDefectsQuickSearchProps) {
  const set = (key: keyof QuickSearchState) => (val: string) =>
    onChange({ ...state, [key]: val });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterDropdown
        defaultValue={state.registration || 'all'}
        widthClassName="min-w-[160px] max-w-[200px]"
        items={[
          { value: 'all', label: 'All Registrations' },
          ...registrationOptions.map((r) => ({ value: r, label: r })),
        ]}
      />

      <span className="shrink-0 text-xs font-medium text-slate-400">or</span>

      <Input
        placeholder="Enter Defect ID..."
        value={state.defectId}
        onChange={(e) => set('defectId')(e.target.value)}
        className="h-8 w-[160px] border-slate-200 bg-white text-2sm shadow-none placeholder:font-normal placeholder:text-slate-300 focus-visible:border-[#2e5f8a]/50 focus-visible:ring-2 focus-visible:ring-[#2e5f8a]/10"
      />

      <span className="shrink-0 text-xs font-medium text-slate-400">or</span>

      <FilterDropdown
        defaultValue={state.createdBy || 'all'}
        widthClassName="min-w-[160px] max-w-[200px]"
        items={CREATED_BY_OPTIONS.map((u) => ({
          value: u === 'All Users' ? 'all' : u,
          label: u,
        }))}
      />

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
