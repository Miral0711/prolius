import { useMemo, useState } from 'react';
import { FileText, Plus, Trash2 } from 'lucide-react';
import { PageLayout, SearchPanel, SearchBar, TableToolbar, TablePagination } from '@/components/shared';
import {
  DataTable, DataTableBodyScroll, DataTableTable,
  TableCell, TableHeader, TableHeaderCell, TableRow,
} from '@/components/fleet/bus-master/DataTable';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { WORKSHOPS_MOCK, type WorkshopUserStatus } from './mock-data';

const COL_WIDTHS = ['130px', '110px', '110px', '220px', '130px', '130px', '130px', '80px'];

function statusBadge(s: WorkshopUserStatus) {
  if (s === 'Activated') return <StatusBadge label="Activated" variant="emerald" size="sm" preserveCase />;
  return (
    <button type="button" className="text-xs font-medium text-[#e8622a] underline underline-offset-2 hover:text-[#c94e1e] transition-colors">
      Re-send invite
    </button>
  );
}

export default function WorkshopsPage() {
  const [search, setSearch] = useState('');
  const [showInactive, setShowInactive] = useState(false);
  const [activeSearch, setActiveSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const filtered = useMemo(() => {
    let rows = WORKSHOPS_MOCK;
    if (!showInactive) rows = rows.filter(r => r.status === 'Activated' || r.status === 'Re-send invite');
    if (activeSearch) rows = rows.filter(r => r.company.toLowerCase().includes(activeSearch.toLowerCase()));
    return rows;
  }, [activeSearch, showInactive]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSearch = () => { setPage(1); setActiveSearch(search); };
  const handleClear = () => { setSearch(''); setActiveSearch(''); setPage(1); };

  return (
    <PageLayout title="Workshops">
      <SearchPanel>
        <SearchBar
          value={search}
          onChange={setSearch}
          onSearch={handleSearch}
          onClear={handleClear}
          placeholder="Search by company name"
        />
      </SearchPanel>

      <DataTable className="min-h-0">
        <TableToolbar
          title="Workshop User List"
          showArchived={showInactive}
          onShowArchivedChange={(v) => { setShowInactive(v); setPage(1); }}
          showArchivedLabel="Show inactive users"
          actions={
            <button type="button" className="inline-flex h-8 items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-3 text-2sm font-semibold text-emerald-700 shadow-sm hover:bg-emerald-100">
              <Plus className="h-3.5 w-3.5" />Add workshop user
            </button>
          }
        />
        <DataTableBodyScroll>
          <DataTableTable className="min-w-[1040px]">
            <colgroup>{[130,110,110,220,130,130,130,80].map((w, i) => <col key={i} style={{ width: `${w}px` }} />)}</colgroup>
            <TableHeader>
              <tr>
                <TableHeaderCell>Company</TableHeaderCell>
                <TableHeaderCell>First Name</TableHeaderCell>
                <TableHeaderCell>Last Name</TableHeaderCell>
                <TableHeaderCell>Username/Email</TableHeaderCell>
                <TableHeaderCell>Landline Number</TableHeaderCell>
                <TableHeaderCell>Mobile Number</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell align="center">Actions</TableHeaderCell>
              </tr>
            </TableHeader>
            <tbody className="bg-white">
              {paged.length === 0 ? (
                <TableRow><TableCell colSpan={8} align="center" className="py-10 text-2sm text-slate-500">No workshop users found.</TableCell></TableRow>
              ) : paged.map(row => (
                <TableRow key={row.id}>
                  <TableCell><span className="text-2sm font-medium text-slate-800">{row.company}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-700">{row.firstName}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-700">{row.lastName}</span></TableCell>
                  <TableCell><span className="text-2sm text-[#2e5f8a]">{row.usernameEmail}</span></TableCell>
                  <TableCell><span className="text-2sm tabular-nums text-slate-600">{row.landlineNumber}</span></TableCell>
                  <TableCell><span className="text-2sm tabular-nums text-slate-600">{row.mobileNumber}</span></TableCell>
                  <TableCell>{statusBadge(row.status)}</TableCell>
                  <TableCell align="center">
                    <div className="flex items-center justify-center gap-0.5">
                      <button type="button" className="flex h-6 w-6 items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"><FileText className="h-3.5 w-3.5" /></button>
                      <button type="button" className="flex h-6 w-6 items-center justify-center rounded-sm border border-slate-200 bg-white text-rose-500 hover:bg-rose-50"><Trash2 className="h-3.5 w-3.5" /></button>
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
