import { X } from 'lucide-react';
import { FilterDropdown } from '@/components/fleet/bus-master/FilterDropdown';
import { FleetToolbarButton } from '@/components/fleet/bus-master/FleetToolbarButton';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ALLOCATED_TO_OPTIONS,
  CREATED_BY_OPTIONS,
  DIVISIONS,
  INCIDENT_STATUSES,
  INCIDENT_TYPES,
  REGIONS,
} from '../mock-data';

export interface AdvancedSearchState {
  registration: string;
  incidentId: string;
  createdBy: string;
  incidentDate: string;
  incidentType: string;
  allocatedTo: string;
  incidentStatus: string;
  dateFrom: string;
  dateTo: string;
  region: string;
  division: string;
  archived: boolean;
}

interface ReportedIncidentsAdvancedSearchProps {
  state: AdvancedSearchState;
  onChange: (s: AdvancedSearchState) => void;
  onSearch: () => void;
  onClear: () => void;
}

export function ReportedIncidentsAdvancedSearch({
  state,
  onChange,
  onSearch,
  onClear,
}: ReportedIncidentsAdvancedSearchProps) {
  const set = (key: keyof AdvancedSearchState) => (val: string | boolean) =>
    onChange({ ...state, [key]: val });

  return (
    <div className="flex flex-col gap-2">
      {/* Row 1 */}
      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Registration..."
          value={state.registration}
          onChange={(e) => set('registration')(e.target.value)}
          className="h-8 w-[150px] border-slate-200 bg-white text-2sm shadow-none placeholder:font-normal placeholder:text-slate-300"
        />
        <Input
          placeholder="Incident ID..."
          value={state.incidentId}
          onChange={(e) => set('incidentId')(e.target.value)}
          className="h-8 w-[145px] border-slate-200 bg-white text-2sm shadow-none placeholder:font-normal placeholder:text-slate-300"
        />
        <FilterDropdown
          defaultValue={state.createdBy || 'all'}
          widthClassName="min-w-[155px] max-w-[195px]"
          items={CREATED_BY_OPTIONS.map((u) => ({
            value: u === 'All Users' ? 'all' : u,
            label: u,
          }))}
        />
        <Input
          type="date"
          value={state.incidentDate}
          onChange={(e) => set('incidentDate')(e.target.value)}
          className="h-8 w-[145px] border-slate-200 bg-white text-2sm shadow-none"
          title="Incident date"
        />
        <FilterDropdown
          defaultValue={state.incidentType || 'all'}
          widthClassName="min-w-[160px] max-w-[200px]"
          items={[
            { value: 'all', label: 'All Incident Types' },
            ...INCIDENT_TYPES.map((t) => ({ value: t, label: t })),
          ]}
        />
        <FilterDropdown
          defaultValue={state.allocatedTo || 'all'}
          widthClassName="min-w-[145px] max-w-[185px]"
          items={ALLOCATED_TO_OPTIONS.map((a) => ({
            value: a === 'All Teams' ? 'all' : a,
            label: a,
          }))}
        />
      </div>

      {/* Row 2 */}
      <div className="flex flex-wrap items-center gap-2">
        <FilterDropdown
          defaultValue={state.incidentStatus || 'all'}
          widthClassName="min-w-[155px] max-w-[195px]"
          items={[
            { value: 'all', label: 'All Statuses' },
            ...INCIDENT_STATUSES.map((s) => ({ value: s, label: s })),
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
