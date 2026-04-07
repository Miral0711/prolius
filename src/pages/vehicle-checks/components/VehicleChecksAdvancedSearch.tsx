import { X } from 'lucide-react';
import { FilterDropdown } from '@/components/fleet/bus-master/FilterDropdown';
import { FleetToolbarButton } from '@/components/fleet/bus-master/FleetToolbarButton';
import { Input } from '@/components/ui/input';
import {
  CHECK_RESULTS,
  CHECK_TYPES,
  CREATED_BY_OPTIONS,
  DIVISIONS,
  REGIONS,
  VEHICLE_STATUSES,
  VEHICLE_TYPES,
} from '../mock-data';

export interface AdvancedSearchState {
  registration: string;
  createdBy: string;
  checkType: string;
  vehicleType: string;
  vehicleStatus: string;
  checkResult: string;
  dateFrom: string;
  dateTo: string;
  region: string;
  division: string;
}

interface VehicleChecksAdvancedSearchProps {
  state: AdvancedSearchState;
  onChange: (s: AdvancedSearchState) => void;
  onSearch: () => void;
  onClear: () => void;
}

export function VehicleChecksAdvancedSearch({
  state,
  onChange,
  onSearch,
  onClear,
}: VehicleChecksAdvancedSearchProps) {
  const set = (key: keyof AdvancedSearchState) => (val: string) =>
    onChange({ ...state, [key]: val });

  return (
    <div className="flex flex-col gap-2">
      {/* Row 1 */}
      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Registration..."
          value={state.registration}
          onChange={(e) => set('registration')(e.target.value)}
          className="h-8 w-[160px] border-slate-200 bg-white text-2sm shadow-none"
        />
        <FilterDropdown
          defaultValue={state.createdBy || 'all'}
          widthClassName="min-w-[160px] max-w-[200px]"
          items={CREATED_BY_OPTIONS.map((u) => ({
            value: u === 'All Users' ? 'all' : u,
            label: u,
          }))}
        />
        <FilterDropdown
          defaultValue={state.checkType || 'all'}
          widthClassName="min-w-[160px] max-w-[200px]"
          items={[
            { value: 'all', label: 'All Check Types' },
            ...CHECK_TYPES.map((t) => ({ value: t, label: t })),
          ]}
        />
        <FilterDropdown
          defaultValue={state.vehicleType || 'all'}
          widthClassName="min-w-[140px] max-w-[180px]"
          items={[
            { value: 'all', label: 'All Vehicle Types' },
            ...VEHICLE_TYPES.map((t) => ({ value: t, label: t })),
          ]}
        />
        <FilterDropdown
          defaultValue={state.vehicleStatus || 'all'}
          widthClassName="min-w-[150px] max-w-[190px]"
          items={[
            { value: 'all', label: 'All Statuses' },
            ...VEHICLE_STATUSES.map((s) => ({ value: s, label: s })),
          ]}
        />
      </div>

      {/* Row 2 */}
      <div className="flex flex-wrap items-center gap-2">
        <FilterDropdown
          defaultValue={state.checkResult || 'all'}
          widthClassName="min-w-[160px] max-w-[200px]"
          items={[
            { value: 'all', label: 'All Results' },
            ...CHECK_RESULTS.map((r) => ({ value: r, label: r })),
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
          widthClassName="min-w-[160px] max-w-[200px]"
          items={DIVISIONS.map((d) => ({
            value: d === 'All Divisions' ? 'all' : d,
            label: d,
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
    </div>
  );
}
