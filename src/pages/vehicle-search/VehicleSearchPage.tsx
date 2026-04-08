import { useMemo, useState } from 'react';
import { Eye, Plus } from 'lucide-react';
import { PageLayout, SearchPanel, TableToolbar, TablePagination } from '@/components/shared';
import { FilterDropdown } from '@/components/fleet/bus-master/FilterDropdown';
import { SearchModeTabs, type SearchMode } from '@/pages/vehicle-checks/components/SearchModeTabs';
import { SearchFilterRow, FilterSeparator } from '@/components/shared/SearchFilterRow';
import {
  DataTable, DataTableBodyScroll, DataTableTable,
  TableCell, TableHeader, TableHeaderCell, TableRow,
} from '@/components/fleet/bus-master/DataTable';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { VEHICLE_SEARCH_MOCK, VEHICLE_STATUSES, type VehicleStatus } from './mock-data';

const COL_WIDTHS = ['100px', '110px', '110px', '80px', '100px', '110px', '100px', '180px', '100px', '70px'];

function vehicleStatusBadge(s: VehicleStatus, vorDays?: number) {
  if (s === 'Roadworthy') return <StatusBadge label="Roadworthy" variant="emerald" size="sm" preserveCase />;
  if (s === 'Roadworthy (with defects)') return <StatusBadge label="Roadworthy (with defects)" variant="amber" size="sm" preserveCase />;
  return <StatusBadge label={vorDays ? `VOR (${vorDays} days)` : 'VOR'} variant="rose" size="sm" preserveCase />;
}

export default function VehicleSearchPage() {
  const [searchMode, setSearchMode] = useState<SearchMode>('quick');
  const [regFilter, setRegFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showArchived, setShowArchived] = useState(false);
  const [activeFilter, setActiveFilter] = useState<{ reg: string; status: string } | null>(null);
  const [checkedFilter, setCheckedFilter] = useState<'all' | 'today' | 'not-today'>('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const filtered = useMemo(() => {
    let rows = VEHICLE_SEARCH_MOCK;
    if (activeFilter?.reg && activeFilter.reg !== 'all') rows = rows.filter(r => r.registration === activeFilter.reg);
    if (activeFilter?.status && activeFilter.status !== 'all') rows = rows.filter(r => r.vehicleStatus === activeFilter.status);
    if (checkedFilter === 'today') rows = rows.filter(r => r.checkedToday);
    if (checkedFilter === 'not-today') rows = rows.filter(r => !r.checkedToday);
    return rows;
  }, [activeFilter, checkedFilter]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSearch = () => { setPage(1); setActiveFilter({ reg: regFilter, status: statusFilter }); };
  const handleClear = () => { setRegFilter('all'); setStatusFilter('all'); setActiveFilter(null); setPage(1); };

  return (
    <PageLayout title="Vehicle Search">
      <SearchPanel>
        <div className="flex flex-col gap-2">
          <SearchModeTabs value={searchMode} onChange={(m) => { setSearchMode(m); handleClear(); }} />
          <SearchFilterRow onSearch={handleSearch} onClear={handleClear}>
            <FilterDropdown
              defaultValue={regFilter}
              widthClassName="min-w-[160px] max-w-[200px]"
              items={[{ value: 'all', label: 'Vehicle registration' }, ...VEHICLE_SEARCH_MOCK.map(r => ({ value: r.registration, label: r.registration }))]}
            />
            <FilterSeparator />
            <FilterDropdown
              defaultValue={statusFilter}
              widthClassName="min-w-[180px] max-w-[220px]"
              items={VEHICLE_STATUSES.map(s => ({ value: s === 'All Statuses' ? 'all' : s, label: s }))}
            />
            <FilterSeparator />
            <FilterDropdown
              defaultValue="all"
              widthClassName="min-w-[130px] max-w-[160px]"
              items={[{ value: 'all', label: 'Last name' }]}
            />
            <div className="ml-1 flex items-center gap-1">
              {(['all', 'today', 'not-today'] as const).map((v) => (
                <button key={v} type="button" onClick={() => setCheckedFilter(v)}
                  className={cn('h-8 rounded-md border px-3 text-xs font-medium transition-colors',
                    checkedFilter === v ? 'border-[#3d6b8e] bg-[#3d6b8e] text-white' : 'border-[#d4e0ea] bg-white text-slate-600 hover:bg-[#eef4f8]')}>
                  {v === 'all' ? 'All' : v === 'today' ? 'Checked today' : 'Not checked today'}
                </button>
              ))}
            </div>
          </SearchFilterRow>
        </div>
      </SearchPanel>

      <DataTable className="min-h-0">
        <TableToolbar
          title="Vehicle List"
          subtitle="(All Regions)"
          showArchived={showArchived}
          onShowArchivedChange={(v) => { setShowArchived(v); setPage(1); }}
          showArchivedLabel="Show archived vehicles"
          actions={
            <button type="button" className="inline-flex h-8 items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-3 text-2sm font-semibold text-emerald-700 shadow-sm hover:bg-emerald-100">
              <Plus className="h-3.5 w-3.5" />Add vehicle
            </button>
          }
        />
        <DataTableBodyScroll>
          <DataTableTable className="min-w-[1060px]">
            <colgroup>{[100,110,110,80,100,110,100,180,100,70].map((w, i) => <col key={i} style={{ width: `${w}px` }} />)}</colgroup>
            <TableHeader>
              <tr>
                <TableHeaderCell>Registration</TableHeaderCell>
                <TableHeaderCell>Region</TableHeaderCell>
                <TableHeaderCell>Type</TableHeaderCell>
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell>Sub Category</TableHeaderCell>
                <TableHeaderCell>Manufacturer</TableHeaderCell>
                <TableHeaderCell>Model</TableHeaderCell>
                <TableHeaderCell>Vehicle Status</TableHeaderCell>
                <TableHeaderCell>Checked Today</TableHeaderCell>
                <TableHeaderCell align="center">Details</TableHeaderCell>
              </tr>
            </TableHeader>
            <tbody className="bg-white">
              {paged.length === 0 ? (
                <TableRow><TableCell colSpan={10} align="center" className="py-10 text-2sm text-slate-500">No vehicles match your filters.</TableCell></TableRow>
              ) : paged.map(row => (
                <TableRow key={row.id}>
                  <TableCell><span className="font-mono text-2sm font-semibold text-[#2e5f8a]">{row.registration}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.region}</span></TableCell>
                  <TableCell><span className="text-2sm text-[#2e5f8a]">{row.type}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.category}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.subCategory}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.manufacturer}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.model}</span></TableCell>
                  <TableCell>{vehicleStatusBadge(row.vehicleStatus, row.vorDays)}</TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.checkedToday ? 'Yes' : 'No'}</span></TableCell>
                  <TableCell align="center"><button type="button" className="flex h-6 w-6 items-center justify-center rounded-sm border border-slate-200 bg-white text-[#2e5f8a] hover:bg-[#e8f0f8]"><Eye className="h-3.5 w-3.5" /></button></TableCell>
                </TableRow>
              ))}
            </tbody>
          </DataTableTable>
        </DataTableBodyScroll>
        <TablePagination page={page} pageSize={pageSize} totalCount={filtered.length} onPageChange={setPage} onPageSizeChange={(s) => { setPageSize(s); setPage(1); }} />
      </DataTable>
    </PageLayout>
  );
}
