import { X } from 'lucide-react';
import { FilterDropdown } from '@/components/fleet/bus-master/FilterDropdown';
import { FleetToolbarButton } from '@/components/fleet/bus-master/FleetToolbarButton';
import { Input } from '@/components/ui/input';
import { CREATED_BY_OPTIONS } from '../mock-data';

export interface QuickSearchState {
  assetNumber: string;
  defectId: string;
  createdBy: string;
}

interface AssetDefectsQuickSearchProps {
  state: QuickSearchState;
  onChange: (s: QuickSearchState) => void;
  onSearch: () => void;
  onClear: () => void;
  assetNumberOptions: string[];
}

export function AssetDefectsQuickSearch({
  state,
  onChange,
  onSearch,
  onClear,
  assetNumberOptions,
}: AssetDefectsQuickSearchProps) {
  const set = (key: keyof QuickSearchState) => (val: string) =>
    onChange({ ...state, [key]: val });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterDropdown
        defaultValue={state.assetNumber || 'all'}
        widthClassName="min-w-[160px] max-w-[200px]"
        items={[
          { value: 'all', label: 'All Asset Numbers' },
          ...assetNumberOptions.map((a) => ({ value: a, label: a })),
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
