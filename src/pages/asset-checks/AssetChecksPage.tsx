import { useMemo, useState } from 'react';
import { Eye } from 'lucide-react';
import { PageLayout, SearchPanel, TableToolbar, TablePagination } from '@/components/shared';
import { FilterDropdown } from '@/components/fleet/bus-master/FilterDropdown';
import { SearchModeTabs, type SearchMode } from '@/pages/vehicle-checks/components/SearchModeTabs';
import { SearchFilterRow, FilterSeparator } from '@/components/shared/SearchFilterRow';
import {
  DataTable, DataTableBodyScroll, DataTableTable,
  TableCell, TableHeader, TableHeaderCell, TableRow,
} from '@/components/fleet/bus-master/DataTable';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { cn } from '@/lib/utils';
import { ASSET_CHECKS_MOCK, ASSET_NUMBERS, CREATED_BY_OPTIONS, type CheckResult } from './mock-data';

const COL_WIDTHS = ['160px', '110px', '120px', '180px', '180px', '120px', '120px', '70px'];

function checkResultBadge(r: CheckResult) {
  return <StatusBadge label={r} variant={r === 'Roadworthy' ? 'emerald' : 'amber'} size="sm" preserveCase />;
}

export default function AssetChecksPage() {
  const [searchMode, setSearchMode] = useState<SearchMode>('quick');
  const [assetFilter, setAssetFilter] = useState('all');
  const [createdByFilter, setCreatedByFilter] = useState('all');
  const [activeFilter, setActiveFilter] = useState<{ asset: string; createdBy: string } | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const filtered = useMemo(() => {
    let rows = ASSET_CHECKS_MOCK;
    if (activeFilter?.asset && activeFilter.asset !== 'all') rows = rows.filter(r => r.assetNumber === activeFilter.asset);
    if (activeFilter?.createdBy && activeFilter.createdBy !== 'all') rows = rows.filter(r => r.createdBy === activeFilter.createdBy);
    return rows;
  }, [activeFilter]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSearch = () => { setPage(1); setActiveFilter({ asset: assetFilter, createdBy: createdByFilter }); };
  const handleClear = () => { setAssetFilter('all'); setCreatedByFilter('all'); setActiveFilter(null); setPage(1); };

  return (
    <PageLayout title="Asset Checks">
      <SearchPanel>
        <div className="flex flex-col gap-2">
          <SearchModeTabs value={searchMode} onChange={(m) => { setSearchMode(m); handleClear(); }} />
          <SearchFilterRow onSearch={handleSearch} onClear={handleClear}>
            <FilterDropdown defaultValue={assetFilter} widthClassName="min-w-[160px] max-w-[200px]"
              items={[{ value: 'all', label: 'Asset number' }, ...ASSET_NUMBERS.map(n => ({ value: n, label: n }))]} />
            <FilterSeparator />
            <FilterDropdown defaultValue={createdByFilter} widthClassName="min-w-[160px] max-w-[200px]"
              items={CREATED_BY_OPTIONS.map(u => ({ value: u === 'All Users' ? 'all' : u, label: u }))} />
          </SearchFilterRow>
        </div>
      </SearchPanel>

      <DataTable className="min-h-0">
        <TableToolbar title="Recent Asset Checks" subtitle="(All Regions)" />
        <DataTableBodyScroll>
          <DataTableTable className="min-w-[1060px]">
            <colgroup>{[160,110,120,180,180,120,120,70].map((w, i) => <col key={i} style={{ width: `${w}px` }} />)}</colgroup>
            <TableHeader>
              <tr>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Asset Number</TableHeaderCell>
                <TableHeaderCell>Check</TableHeaderCell>
                <TableHeaderCell>Type</TableHeaderCell>
                <TableHeaderCell>Asset Status</TableHeaderCell>
                <TableHeaderCell>Check Result</TableHeaderCell>
                <TableHeaderCell>Created By</TableHeaderCell>
                <TableHeaderCell align="center">Details</TableHeaderCell>
              </tr>
            </TableHeader>
            <tbody className="bg-white">
              {paged.length === 0 ? (
                <TableRow><TableCell colSpan={8} align="center" className="py-10 text-2sm text-slate-500">No asset checks match your filters.</TableCell></TableRow>
              ) : paged.map(row => (
                <TableRow key={row.id}>
                  <TableCell><span className="text-2sm tabular-nums text-slate-600">{row.date}</span></TableCell>
                  <TableCell><span className="font-mono text-2sm font-semibold text-[#2e5f8a]">{row.assetNumber}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.check}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.type}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.assetStatus}</span></TableCell>
                  <TableCell>{checkResultBadge(row.checkResult)}</TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.createdBy}</span></TableCell>
                  <TableCell align="center"><button type="button" className="flex h-6 w-6 items-center justify-center rounded-sm border border-slate-200 bg-white text-[#2e5f8a] hover:bg-[#e8f0f8]"><Eye className="h-3.5 w-3.5" /></button></TableCell>
                </TableRow>
              ))}
            </tbody>
          </DataTableTable>
        </DataTableBodyScroll>
        <TablePagination page={page} pageSize={pageSize} totalCount={filtered.length} onPageChange={setPage} onPageSizeChange={(s) => { setPageSize(s); setPage(1); }} pageSizeOptions={[10, 20, 50]} />
      </DataTable>
    </PageLayout>
  );
}
