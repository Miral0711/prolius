import { X } from 'lucide-react';
import { FilterDropdown } from '@/components/fleet/bus-master/FilterDropdown';
import { FleetToolbarButton } from '@/components/fleet/bus-master/FleetToolbarButton';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ALLOCATED_TO_OPTIONS,
  CREATED_BY_OPTIONS,
  DEFECT_CATEGORIES,
  DEFECT_STATUSES,
  DIVISIONS,
  REGIONS,
} from '../mock-data';

export interface AdvancedSearchState {
  assetNumber: string;
  defectId: string;
  createdBy: string;
  category: string;
  defect: string;
  allocatedTo: string;
  defectStatus: string;
  dateFrom: string;
  dateTo: string;
  region: string;
  division: string;
  archived: boolean;
}

interface AssetDefectsAdvancedSearchProps {
  state: AdvancedSearchState;
  onChange: (s: AdvancedSearchState) => void;
  onSearch: () => void;
  onClear: () => void;
}

export function AssetDefectsAdvancedSearch({
  state,
  onChange,
  onSearch,
  onClear,
}: AssetDefectsAdvancedSearchProps) {
  const set = (key: keyof AdvancedSearchState) => (val: string | boolean) =>
    onChange({ ...state, [key]: val });

  return (
    <div className="flex flex-col gap-2">
      {/* Row 1 */}
      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Asset number..."
          value={state.assetNumber}
          onChange={(e) => set('assetNumber')(e.target.value)}
          className="h-8 w-[150px] border-slate-200 bg-white text-2sm shadow-none placeholder:font-normal placeholder:text-slate-300"
        />
        <Input
          placeholder="Defect ID..."
          value={state.defectId}
          onChange={(e) => set('defectId')(e.target.value)}
          className="h-8 w-[140px] border-slate-200 bg-white text-2sm shadow-none placeholder:font-normal placeholder:text-slate-300"
        />
        <FilterDropdown
          defaultValue={state.createdBy || 'all'}
          widthClassName="min-w-[155px] max-w-[195px]"
          items={CREATED_BY_OPTIONS.map((u) => ({
            value: u === 'All Users' ? 'all' : u,
            label: u,
          }))}
        />
        <FilterDropdown
          defaultValue={state.category || 'all'}
          widthClassName="min-w-[155px] max-w-[195px]"
          items={[
            { value: 'all', label: 'All Categories' },
            ...DEFECT_CATEGORIES.map((c) => ({ value: c, label: c })),
          ]}
        />
        <Input
          placeholder="Defect description..."
          value={state.defect}
          onChange={(e) => set('defect')(e.target.value)}
          className="h-8 w-[185px] border-slate-200 bg-white text-2sm shadow-none placeholder:font-normal placeholder:text-slate-300"
        />
        <FilterDropdown
          defaultValue={state.allocatedTo || 'all'}
          widthClassName="min-w-[145px] max-w-[185px]"
          items={ALLOCATED_TO_OPTIONS.map((a) => ({
            value: a === 'All Workshops' ? 'all' : a,
            label: a,
          }))}
        />
      </div>

      {/* Row 2 */}
      <div className="flex flex-wrap items-center gap-2">
        <FilterDropdown
          defaultValue={state.defectStatus || 'all'}
          widthClassName="min-w-[155px] max-w-[195px]"
          items={[
            { value: 'all', label: 'All Statuses' },
            ...DEFECT_STATUSES.map((s) => ({ value: s, label: s })),
          ]}
        />
        <div className="flex items-center gap-1.5">
          <Input
            type="date"
            value={state.dateFrom}
            onChange={(e) => set('dateFrom')(e.target.value)}
            className="h-8 w-[140px] border-slate-200 bg-white text-2sm shadow-none"
          />
          <span className="text-xs text-slate-400">–</span>
          <Input
            type="date"
            value={state.dateTo}
            onChange={(e) => set('dateTo')(e.target.value)}
            className="h-8 w-[140px] border-slate-200 bg-white text-2sm shadow-none"
          />
        </div>
        <FilterDropdown
          defaultValue={state.region || 'all'}
          widthClassName="min-w-[140px] max-w-[180px]"
          items={REGIONS.map((r) => ({
            value: r === 'All Regions' ? 'all' : r,
            label: r,
          }))}
        />
        <FilterDropdown
          defaultValue={state.division || 'all'}
          widthClassName="min-w-[155px] max-w-[195px]"
          items={DIVISIONS.map((d) => ({
            value: d === 'All Divisions' ? 'all' : d,
            label: d,
          }))}
        />
        <label className="flex cursor-pointer items-center gap-1.5">
          <Checkbox
            checked={state.archived}
            onCheckedChange={(v) => set('archived')(Boolean(v))}
            size="sm"
            className="border-slate-300"
          />
          <span className="text-xs font-medium text-slate-600">Show archived</span>
        </label>
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
    </div>
  );
}
