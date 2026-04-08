import { useMemo, useState } from 'react';
import { Download, Eye, RefreshCw, Settings } from 'lucide-react';
import { PageLayout, SearchPanel, SearchBar, TableToolbar, TablePagination } from '@/components/shared';
import { FilterDropdown } from '@/components/fleet/bus-master/FilterDropdown';
import {
  DataTable, DataTableBodyScroll, DataTableTable,
  TableCell, TableHeader, TableHeaderCell, TableRow,
} from '@/components/fleet/bus-master/DataTable';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { REPORTS_MOCK, REPORT_TYPES } from './mock-data';

const COL_WIDTHS = ['200px', '1fr', '120px', '160px', '100px'];

type ReportTab = 'reports' | 'downloads';

export default function ReportsPage() {
  const [tab, setTab] = useState<ReportTab>('reports');
  const [nameSearch, setNameSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [activeFilters, setActiveFilters] = useState<{ name: string; type: string } | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const filtered = useMemo(() => {
    let rows = REPORTS_MOCK;
    if (activeFilters?.name) rows = rows.filter(r => r.name.toLowerCase().includes(activeFilters.name.toLowerCase()));
    if (activeFilters?.type && activeFilters.type !== 'all') rows = rows.filter(r => r.reportType === activeFilters.type);
    return rows;
  }, [activeFilters]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSearch = () => { setPage(1); setActiveFilters({ name: nameSearch, type: typeFilter }); };
  const handleClear = () => { setNameSearch(''); setTypeFilter('all'); setActiveFilters(null); setPage(1); };

  return (
    <PageLayout title="Reports">
      {/* Tab bar */}
      <div className="shrink-0 rounded-md border border-[#d4e0ea] bg-white px-3 pt-2 shadow-sm">
        <Tabs value={tab} onValueChange={v => setTab(v as ReportTab)}>
          <TabsList variant="line" size="md" className="w-full justify-start">
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="downloads">Downloads</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Search bar */}
      <SearchPanel>
        <SearchBar
          value={nameSearch}
          onChange={setNameSearch}
          onSearch={handleSearch}
          onClear={handleClear}
          placeholder="Search by name"
          extra={
            <FilterDropdown
              defaultValue={typeFilter}
              widthClassName="min-w-[160px] max-w-[200px]"
              items={REPORT_TYPES.map(t => ({ value: t === 'All Types' ? 'all' : t, label: t }))}
            />
          }
        />
      </SearchPanel>

      {/* Table */}
      <DataTable className="min-h-0">
        <TableToolbar title={tab === 'reports' ? 'Reports' : 'Downloads'} showExportButtons={tab === 'reports'} />

        <DataTableBodyScroll>
          <DataTableTable style={{ minWidth: '700px' }}>
            {tab === 'reports' ? (
              <>
                <colgroup>
                  <col style={{ width: '200px' }} />
                  <col />
                  <col style={{ width: '120px' }} />
                  <col style={{ width: '170px' }} />
                  <col style={{ width: '116px' }} />
                </colgroup>
                <TableHeader>
                  <tr>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Description</TableHeaderCell>
                    <TableHeaderCell>Report Type</TableHeaderCell>
                    <TableHeaderCell>Last Generated</TableHeaderCell>
                    <TableHeaderCell align="center">Actions</TableHeaderCell>
                  </tr>
                </TableHeader>
                <tbody className="bg-white">
                  {paged.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" className="py-10 text-2sm text-slate-500">
                        No reports match your filters.
                      </TableCell>
                    </TableRow>
                  ) : paged.map(row => (
                    <TableRow key={row.id}>
                      <TableCell><span className="text-2sm font-medium text-slate-800">{row.name}</span></TableCell>
                      <TableCell className="max-w-none"><span className="text-2sm text-slate-600">{row.description}</span></TableCell>
                      <TableCell><span className="text-2sm text-slate-600">{row.reportType}</span></TableCell>
                      <TableCell><span className="text-2sm tabular-nums text-slate-500">{row.lastGenerated || '—'}</span></TableCell>
                      <TableCell align="center">
                        <div className="flex items-center justify-center gap-0.5">
                          <button type="button" title="Run report" className="flex h-6 w-6 items-center justify-center rounded-sm border border-slate-200 bg-white text-[#2e5f8a] hover:bg-[#e8f0f8]"><Eye className="h-3.5 w-3.5" /></button>
                          <button type="button" title="Download" className="flex h-6 w-6 items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"><Download className="h-3.5 w-3.5" /></button>
                          <button type="button" title="Schedule" className="flex h-6 w-6 items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"><RefreshCw className="h-3.5 w-3.5" /></button>
                          <button type="button" title="Settings" className="flex h-6 w-6 items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"><Settings className="h-3.5 w-3.5" /></button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </>
            ) : (
              <>
                <colgroup>
                  <col />
                  <col style={{ width: '160px' }} />
                  <col style={{ width: '180px' }} />
                  <col style={{ width: '180px' }} />
                  <col style={{ width: '80px' }} />
                </colgroup>
                <TableHeader>
                  <tr>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Report Type</TableHeaderCell>
                    <TableHeaderCell>Date Range</TableHeaderCell>
                    <TableHeaderCell>Generated On</TableHeaderCell>
                    <TableHeaderCell align="center">Actions</TableHeaderCell>
                  </tr>
                </TableHeader>
                <tbody className="bg-white">
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-2sm text-slate-400">No records to view</TableCell>
                  </TableRow>
                </tbody>
              </>
            )}
          </DataTableTable>
        </DataTableBodyScroll>

        <TablePagination
          page={page}
          pageSize={pageSize}
          totalCount={tab === 'reports' ? filtered.length : 0}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
        />
      </DataTable>
    </PageLayout>
  );
}
