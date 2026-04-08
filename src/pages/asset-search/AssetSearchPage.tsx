import { useMemo, useState } from 'react';
import { Eye, FileDown, Plus, X } from 'lucide-react';
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
import { ASSET_SEARCH_MOCK, ASSET_STATUSES, AVAILABILITIES, type AssetStatus, type Availability } from './mock-data';

const COL_WIDTHS = ['110px', '110px', '150px', '90px', '110px', '90px', '170px', '110px', '100px', '70px'];

function assetStatusBadge(s: AssetStatus, vorDays?: number) {
  if (s === 'Roadworthy') return <StatusBadge label="Roadworthy" variant="emerald" size="sm" preserveCase />;
  if (s === 'Roadworthy (with defects)') return <StatusBadge label="Roadworthy (with defects)" variant="amber" size="sm" preserveCase />;
  if (s === 'VOR - Quarantined') return <StatusBadge label={vorDays ? `VOR - Quarantined (${vorDays} days)` : 'VOR - Quarantined'} variant="rose" size="sm" preserveCase />;
  return <StatusBadge label={vorDays ? `VOR (${vorDays} days)` : 'VOR'} variant="rose" size="sm" preserveCase />;
}

function availabilityBadge(a: Availability) {
  if (a === 'Available') return <StatusBadge label="Available" variant="emerald" size="sm" preserveCase />;
  if (a === 'In use') return <StatusBadge label="In use" variant="blue" size="sm" preserveCase />;
  return <StatusBadge label="Out for repair" variant="rose" size="sm" preserveCase />;
}

export default function AssetSearchPage() {
  const [searchMode, setSearchMode] = useState<SearchMode>('quick');
  const [assetFilter, setAssetFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [availFilter, setAvailFilter] = useState('all');
  const [showArchived, setShowArchived] = useState(false);
  const [activeFilter, setActiveFilter] = useState<{ asset: string; status: string; avail: string } | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const filtered = useMemo(() => {
    let rows = ASSET_SEARCH_MOCK;
    if (activeFilter?.asset && activeFilter.asset !== 'all') rows = rows.filter(r => r.assetNumber === activeFilter.asset);
    if (activeFilter?.status && activeFilter.status !== 'all') rows = rows.filter(r => r.assetStatus === activeFilter.status);
    if (activeFilter?.avail && activeFilter.avail !== 'all') rows = rows.filter(r => r.availability === activeFilter.avail);
    return rows;
  }, [activeFilter]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSearch = () => { setPage(1); setActiveFilter({ asset: assetFilter, status: statusFilter, avail: availFilter }); };
  const handleClear = () => { setAssetFilter('all'); setStatusFilter('all'); setAvailFilter('all'); setActiveFilter(null); setPage(1); };

  return (
    <PageLayout title="Asset Search">
      <SearchPanel>
        <div className="flex flex-col gap-2">
          <SearchModeTabs value={searchMode} onChange={(m) => { setSearchMode(m); handleClear(); }} />
          <SearchFilterRow onSearch={handleSearch} onClear={handleClear}>
            <FilterDropdown defaultValue={assetFilter} widthClassName="min-w-[150px] max-w-[190px]"
              items={[{ value: 'all', label: 'Asset number' }, ...ASSET_SEARCH_MOCK.map(r => ({ value: r.assetNumber, label: r.assetNumber }))]} />
            <FilterSeparator />
            <FilterDropdown defaultValue={statusFilter} widthClassName="min-w-[180px] max-w-[220px]"
              items={ASSET_STATUSES.map(s => ({ value: s === 'All Statuses' ? 'all' : s, label: s }))} />
            <FilterSeparator />
            <FilterDropdown defaultValue={availFilter} widthClassName="min-w-[150px] max-w-[190px]"
              items={AVAILABILITIES.map(a => ({ value: a === 'All' ? 'all' : a, label: a }))} />
          </SearchFilterRow>
        </div>
      </SearchPanel>

      <DataTable className="min-h-0">
        <TableToolbar
          title="Asset List"
          subtitle="(All Regions)"
          showArchived={showArchived}
          onShowArchivedChange={(v) => { setShowArchived(v); setPage(1); }}
          showArchivedLabel="Show archived assets"
          actions={
            <button type="button" className="inline-flex h-8 items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-3 text-2sm font-semibold text-emerald-700 shadow-sm hover:bg-emerald-100">
              <Plus className="h-3.5 w-3.5" />Add asset
            </button>
          }
        />
        <DataTableBodyScroll>
          <DataTableTable className="min-w-[1180px]">
            <colgroup>{[110,110,150,90,110,90,170,110,100,70].map((w, i) => <col key={i} style={{ width: `${w}px` }} />)}</colgroup>
            <TableHeader>
              <tr>
                <TableHeaderCell>Asset Number</TableHeaderCell>
                <TableHeaderCell>Region</TableHeaderCell>
                <TableHeaderCell>Type</TableHeaderCell>
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell>Sub Category</TableHeaderCell>
                <TableHeaderCell>Ownership</TableHeaderCell>
                <TableHeaderCell>Asset Status</TableHeaderCell>
                <TableHeaderCell>Availability</TableHeaderCell>
                <TableHeaderCell>Checked Today</TableHeaderCell>
                <TableHeaderCell align="center">Details</TableHeaderCell>
              </tr>
            </TableHeader>
            <tbody className="bg-white">
              {paged.length === 0 ? (
                <TableRow><TableCell colSpan={10} align="center" className="py-10 text-2sm text-slate-500">No assets match your filters.</TableCell></TableRow>
              ) : paged.map(row => (
                <TableRow key={row.id}>
                  <TableCell><span className="font-mono text-2sm font-semibold text-[#2e5f8a]">{row.assetNumber}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.region}</span></TableCell>
                  <TableCell><span className="text-2sm text-[#2e5f8a]">{row.type}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.category}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.subCategory}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.ownership}</span></TableCell>
                  <TableCell>{assetStatusBadge(row.assetStatus, row.vorDays)}</TableCell>
                  <TableCell>{availabilityBadge(row.availability)}</TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.checkedToday ? 'Yes' : 'No'}</span></TableCell>
                  <TableCell align="center">
                    <div className="flex items-center justify-center gap-0.5">
                      <button type="button" className="flex h-6 w-6 items-center justify-center rounded-sm border border-slate-200 bg-white text-[#2e5f8a] hover:bg-[#e8f0f8]"><Eye className="h-3.5 w-3.5" /></button>
                      <button type="button" className="flex h-6 w-6 items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"><FileDown className="h-3.5 w-3.5" /></button>
                      <button type="button" className="flex h-6 w-6 items-center justify-center rounded-sm border border-slate-200 bg-white text-rose-500 hover:bg-rose-50"><X className="h-3.5 w-3.5" /></button>
                    </div>
                  </TableCell>
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
