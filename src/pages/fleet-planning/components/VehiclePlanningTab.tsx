import { useState, useMemo } from 'react';
import { AlertTriangle, Columns2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { VEHICLE_ROWS, type VehicleRow } from '../planning-table-data';
import { hasVehicleConflict } from '../conflict-detection';
import { PlanningFilterRow } from './PlanningFilterRow';
import { PlanningDataTable, DateCell, type ColumnDef } from './PlanningDataTable';
import { PlanningPagination } from './PlanningPagination';

const REGION_OPTIONS = [
  { value: 'all', label: 'All Regions' },
  { value: 'Region A', label: 'Region A' },
  { value: 'Region B', label: 'Region B' },
  { value: 'Region C', label: 'Region C' },
];

const EVENT_OPTIONS = [
  { value: 'all', label: 'All Events' },
  { value: 'adrTest', label: 'ADR Test' },
  { value: 'annualService', label: 'Annual Service' },
  { value: 'cambelChange', label: 'Cambelt Change' },
  { value: 'pmi', label: 'PMI' },
  { value: 'brakeTest', label: 'Brake Test' },
];

const COLUMNS: ColumnDef<VehicleRow>[] = [
  {
    key: 'registration',
    header: 'Registration',
    width: '130px',
    sticky: true,
    render: (r) => (
      <span className="font-medium text-[#2e5f8a] hover:underline cursor-pointer">
        {r.registration}
      </span>
    ),
  },
  { key: 'division',     header: 'Division',        width: '100px', render: (r) => <span className="text-slate-700">{r.division}</span> },
  { key: 'region',       header: 'Region',          width: '100px', render: (r) => <span className="text-slate-700">{r.region}</span> },
  { key: 'location',     header: 'Location',        width: '100px', render: (r) => <span className="text-slate-700">{r.location}</span> },
  { key: 'supplier',     header: 'Supplier',        width: '120px', render: (r) => <span className="text-slate-600">{r.supplier}</span> },
  { key: 'adrTest',      header: 'ADR Test',        width: '120px', render: (r) => <DateCell date={r.adrTest} /> },
  { key: 'annualService',header: 'Annual Service',  width: '130px', render: (r) => <DateCell date={r.annualService} /> },
  { key: 'cambelChange', header: 'Cambelt Change',  width: '130px', render: (r) => <DateCell date={r.cambelChange} /> },
  { key: 'collection',   header: 'Collection',      width: '120px', render: (r) => <DateCell date={r.collection} /> },
  { key: 'pmi',          header: 'PMI',             width: '120px', render: (r) => <DateCell date={r.pmi} /> },
  { key: 'brakeTest',    header: 'Brake Test',      width: '120px', render: (r) => <DateCell date={r.brakeTest} /> },
];

const FILTERS = [
  { key: 'region',    placeholder: 'All Regions',    options: REGION_OPTIONS },
  { key: 'event',     placeholder: 'All Events',     options: EVENT_OPTIONS },
];

export function VehiclePlanningTab() {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({ region: 'all', event: 'all' });
  const [search, setSearch] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string>>({ region: 'all', event: 'all' });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleSearch = () => { setAppliedSearch(search); setAppliedFilters(filterValues); setPage(1); };
  const handleClear = () => {
    const reset = { region: 'all', event: 'all' };
    setFilterValues(reset); setAppliedFilters(reset);
    setSearch(''); setAppliedSearch(''); setPage(1);
  };

  const filtered = useMemo(() => {
    return VEHICLE_ROWS.filter((r) => {
      if (appliedFilters.region !== 'all' && r.region !== appliedFilters.region) return false;
      if (appliedSearch) {
        const q = appliedSearch.toLowerCase();
        if (!r.registration.toLowerCase().includes(q) && !r.location.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [appliedFilters, appliedSearch]);

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const conflictCount = filtered.filter(hasVehicleConflict).length;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">
      {/* Filter row */}
      <div className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <PlanningFilterRow
          filters={FILTERS}
          values={filterValues}
          search={search}
          onFilterChange={(k, v) => setFilterValues((prev) => ({ ...prev, [k]: v }))}
          onSearchChange={setSearch}
          onSearch={handleSearch}
          onClear={handleClear}
          rightActions={
            <>
              <Button variant="outline" size="sm">
                <Columns2 className="size-3.5" />
                Reset columns
              </Button>
              <Button variant="primary" size="sm">
                <Plus className="size-3.5" />
                Add vehicle
              </Button>
            </>
          }
        />
      </div>

      {/* Table card */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
        {/* Section heading */}
        <div className="shrink-0 flex items-center justify-between border-b border-slate-100 px-4 py-2.5">
          <span className="text-[13px] font-semibold text-slate-800">
            Vehicle List{' '}
            <span className={cn('ml-1 text-xs font-normal', appliedFilters.region === 'all' ? 'text-slate-400' : 'text-[#2e5f8a]')}>
              ({appliedFilters.region === 'all' ? 'All Regions' : appliedFilters.region})
            </span>
          </span>
          <div className="flex items-center gap-1.5">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
              {filtered.length} vehicles
            </span>
            {conflictCount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-red-300 bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700">
                <AlertTriangle className="size-3 shrink-0" />
                {conflictCount} conflict{conflictCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Table */}
        <PlanningDataTable
          columns={COLUMNS}
          rows={paginated}
          getRowKey={(r) => r.id}
          isConflict={hasVehicleConflict}
        />

        {/* Pagination */}
        <PlanningPagination
          total={filtered.length}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
}
