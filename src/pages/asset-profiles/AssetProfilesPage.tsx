import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, FilePen, Plus } from 'lucide-react';
import { PageLayout, SearchPanel, SearchBar, TableToolbar, TablePagination } from '@/components/shared';
import {
  DataTable, DataTableBodyScroll, DataTableTable,
  TableCell, TableHeader, TableHeaderCell, TableRow,
} from '@/components/fleet/bus-master/DataTable';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { cn } from '@/lib/utils';
import { ASSET_PROFILES_MOCK, type ProfileStatus } from './mock-data';

const COL_WIDTHS = ['140px', '100px', '120px', '130px', '140px', '80px', '100px', '90px', '110px', '70px'];

function profileStatusBadge(s: ProfileStatus) {
  return <StatusBadge label={s} variant={s === 'Active' ? 'emerald' : 'slate'} size="sm" preserveCase />;
}

export default function AssetProfilesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const filtered = useMemo(() => {
    if (!search.trim()) return ASSET_PROFILES_MOCK;
    const q = search.toLowerCase();
    return ASSET_PROFILES_MOCK.filter(r => r.type.toLowerCase().includes(q) || r.manufacturer.toLowerCase().includes(q));
  }, [search]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <PageLayout title="Asset Profiles">
      <SearchPanel>
        <SearchBar
          value={search}
          onChange={setSearch}
          onSearch={() => setPage(1)}
          onClear={() => { setSearch(''); setPage(1); }}
          placeholder="Search by asset profile type"
        />
      </SearchPanel>

      <DataTable className="min-h-0">
        <TableToolbar
          title="Asset Profiles"
          showArchived={showArchived}
          onShowArchivedChange={(v) => { setShowArchived(v); setPage(1); }}
          showArchivedLabel="Show archived asset profiles"
          actions={
            <button type="button" onClick={() => navigate('/asset-management/profiles/add')} className="inline-flex h-8 items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-3 text-2sm font-semibold text-emerald-700 shadow-sm hover:bg-emerald-100">
              <Plus className="h-3.5 w-3.5" />Add asset profile
            </button>
          }
        />
        <DataTableBodyScroll>
          <DataTableTable className="min-w-[1080px]">
            <colgroup>{[140,100,120,130,140,80,100,90,110,70].map((w, i) => <col key={i} style={{ width: `${w}px` }} />)}</colgroup>
            <TableHeader>
              <tr>
                <TableHeaderCell>Type</TableHeaderCell>
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell>Sub Category</TableHeaderCell>
                <TableHeaderCell>Manufacturer</TableHeaderCell>
                <TableHeaderCell>Model</TableHeaderCell>
                <TableHeaderCell>Fuel Type</TableHeaderCell>
                <TableHeaderCell>Engine Type</TableHeaderCell>
                <TableHeaderCell align="center">Asset Count</TableHeaderCell>
                <TableHeaderCell>Profile Status</TableHeaderCell>
                <TableHeaderCell align="center">Details</TableHeaderCell>
              </tr>
            </TableHeader>
            <tbody className="bg-white">
              {paged.length === 0 ? (
                <TableRow><TableCell colSpan={10} align="center" className="py-10 text-2sm text-slate-500">No asset profiles found.</TableCell></TableRow>
              ) : paged.map(row => (
                <TableRow key={row.id}>
                  <TableCell><span className="text-2sm font-medium text-slate-800">{row.type}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.category}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.subCategory}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.manufacturer}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.model}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-500">{row.fuelType}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-500">{row.engineType}</span></TableCell>
                  <TableCell align="center">
                    {row.assetCount > 0
                      ? <span className="font-mono text-2sm font-semibold text-[#2e5f8a]">{row.assetCount}</span>
                      : <span className="text-2sm text-slate-400">0</span>}
                  </TableCell>
                  <TableCell>{profileStatusBadge(row.profileStatus)}</TableCell>
                  <TableCell align="center">
                    <div className="flex items-center justify-center gap-0.5">
                      <button type="button" onClick={() => navigate(`/asset-management/profiles/${row.id}`)} className="flex h-6 w-6 items-center justify-center rounded-sm border border-slate-200 bg-white text-[#2e5f8a] hover:bg-[#e8f0f8]"><Eye className="h-3.5 w-3.5" /></button>
                      <button type="button" onClick={() => navigate(`/asset-management/profiles/${row.id}/edit`)} className="flex h-6 w-6 items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"><FilePen className="h-3.5 w-3.5" /></button>
                    </div>
                  </TableCell>
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
