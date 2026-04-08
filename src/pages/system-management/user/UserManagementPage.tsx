import { useMemo, useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { PageLayout, SearchPanel, TableToolbar, TablePagination } from '@/components/shared';
import { FilterDropdown } from '@/components/fleet/bus-master/FilterDropdown';
import {
  DataTable, DataTableBodyScroll, DataTableTable,
  TableCell, TableHeader, TableHeaderCell, TableRow,
} from '@/components/fleet/bus-master/DataTable';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { Input } from '@/components/ui/input';
import { SearchFilterRow } from '@/components/shared/SearchFilterRow';
import { USERS_MOCK, type UserStatus } from './mock-data';

function userStatusBadge(s: UserStatus) {
  if (s === 'Active') return <StatusBadge label="Active" variant="emerald" size="sm" preserveCase />;
  return (
    <button type="button" className="text-xs font-medium text-[#e8622a] underline underline-offset-2 hover:text-[#c94e1e] transition-colors">
      Resend invite
    </button>
  );
}

const REGIONS = ['All regions', 'ICL - Hebburn', 'ICL - West Thurrock', 'ICL - Selby', 'ICL - Newport', 'ICL - Widnes', 'ICL - Port Clarence', 'Industrial Chemicals'];

export default function UserManagementPage() {
  const [region, setRegion] = useState('all');
  const [nameSearch, setNameSearch] = useState('');
  const [tagSearch, setTagSearch] = useState('');
  const [showInactive, setShowInactive] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{ region: string; name: string; tag: string } | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const filtered = useMemo(() => {
    let rows = USERS_MOCK;
    if (activeFilters?.region && activeFilters.region !== 'all') rows = rows.filter(r => r.company === activeFilters.region);
    if (activeFilters?.name) rows = rows.filter(r =>
      `${r.firstName} ${r.lastName}`.toLowerCase().includes(activeFilters.name.toLowerCase()) ||
      r.email.toLowerCase().includes(activeFilters.name.toLowerCase())
    );
    if (activeFilters?.tag) rows = rows.filter(r => r.driverTag.toLowerCase().includes(activeFilters.tag.toLowerCase()));
    if (!showInactive) rows = rows.filter(r => r.status === 'Active' || r.status === 'Resend invite');
    return rows;
  }, [activeFilters, showInactive]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSearch = () => { setPage(1); setActiveFilters({ region, name: nameSearch, tag: tagSearch }); };
  const handleClear = () => { setRegion('all'); setNameSearch(''); setTagSearch(''); setActiveFilters(null); setPage(1); };

  return (
    <PageLayout title="User Management">
      <SearchPanel>
        <SearchFilterRow onSearch={handleSearch} onClear={handleClear}>
          <FilterDropdown
            defaultValue={region}
            widthClassName="min-w-[160px] max-w-[200px]"
            items={REGIONS.map(r => ({ value: r === 'All regions' ? 'all' : r, label: r }))}
          />
          <Input
            placeholder="Search by name or email"
            value={nameSearch}
            onChange={e => setNameSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            className="h-8 w-[200px] border-slate-200 bg-white text-2sm shadow-none placeholder:text-slate-300"
          />
          <Input
            placeholder="Search by driver tag"
            value={tagSearch}
            onChange={e => setTagSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            className="h-8 w-[180px] border-slate-200 bg-white text-2sm shadow-none placeholder:text-slate-300"
          />
          <button type="button" className="ml-auto flex items-center gap-1 text-xs font-medium text-[#3d6b8e] hover:text-[#2e5270] transition-colors">
            Show advanced search <ChevronDown className="h-3 w-3" />
          </button>
        </SearchFilterRow>
      </SearchPanel>

      <DataTable className="min-h-0">
        <TableToolbar
          title="User List"
          showArchived={showInactive}
          onShowArchivedChange={(v) => { setShowInactive(v); setPage(1); }}
          showArchivedLabel="Show inactive users"
          actions={
            <button type="button" className="inline-flex h-8 items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-3 text-2sm font-semibold text-emerald-700 shadow-sm hover:bg-emerald-100">
              <Plus className="h-3.5 w-3.5" />Add new user
            </button>
          }
        />
        <DataTableBodyScroll>
          <DataTableTable className="min-w-[1300px]">
            <colgroup>{[100,100,150,150,180,150,90,110,170,100].map((w, i) => <col key={i} style={{ width: `${w}px` }} />)}</colgroup>
            <TableHeader>
              <tr>
                <TableHeaderCell>First Name</TableHeaderCell>
                <TableHeaderCell>Last Name</TableHeaderCell>
                <TableHeaderCell>Company</TableHeaderCell>
                <TableHeaderCell>Username</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Job Title</TableHeaderCell>
                <TableHeaderCell>Driver Tag</TableHeaderCell>
                <TableHeaderCell>Mobile Number</TableHeaderCell>
                <TableHeaderCell>Last Login Web</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </tr>
            </TableHeader>
            <tbody className="bg-white">
              {paged.length === 0 ? (
                <TableRow><TableCell colSpan={10} align="center" className="py-10 text-2sm text-slate-500">No users found.</TableCell></TableRow>
              ) : paged.map(row => (
                <TableRow key={row.id}>
                  <TableCell><span className="text-2sm font-medium text-slate-800">{row.firstName}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-700">{row.lastName}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.company}</span></TableCell>
                  <TableCell><span className="text-2sm text-[#2e5f8a]">{row.username}</span></TableCell>
                  <TableCell><span className="text-2sm text-[#2e5f8a]">{row.email}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-600">{row.jobTitle}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-500">{row.driverTag || '—'}</span></TableCell>
                  <TableCell><span className="text-2sm tabular-nums text-slate-600">{row.mobileNumber || '—'}</span></TableCell>
                  <TableCell><span className="text-2sm text-slate-500">{row.lastLoginWeb}</span></TableCell>
                  <TableCell>{userStatusBadge(row.status)}</TableCell>
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
