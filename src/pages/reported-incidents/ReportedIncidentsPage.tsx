import { useMemo, useState } from 'react';
import { PageShell } from '@/components/ui/page-shell';
import { PageSurface, PAGE_SURFACE_FOOTER_PADDING } from '@/components/layout';
import { fleetSurface } from '@/components/fleet/bus-master/tokens';
import { cn } from '@/lib/utils';
import { REPORTED_INCIDENTS_MOCK } from './mock-data';
import type { AdvancedSearchState } from './components/ReportedIncidentsAdvancedSearch';
import { ReportedIncidentsAdvancedSearch } from './components/ReportedIncidentsAdvancedSearch';
import type { QuickSearchState } from './components/ReportedIncidentsQuickSearch';
import { ReportedIncidentsQuickSearch } from './components/ReportedIncidentsQuickSearch';
import { ReportedIncidentsTable } from './components/ReportedIncidentsTable';
import { SearchModeTabs, type SearchMode } from './components/SearchModeTabs';

const EMPTY_QUICK: QuickSearchState = { registration: '', incidentId: '', createdBy: '' };

const EMPTY_ADVANCED: AdvancedSearchState = {
  registration: '',
  incidentId: '',
  createdBy: '',
  incidentDate: '',
  incidentType: '',
  allocatedTo: '',
  incidentStatus: '',
  dateFrom: '',
  dateTo: '',
  region: '',
  division: '',
  archived: false,
};

const REGISTRATIONS = [...new Set(REPORTED_INCIDENTS_MOCK.map((r) => r.registration))];

export default function ReportedIncidentsPage() {
  const [searchMode, setSearchMode] = useState<SearchMode>('quick');
  const [quickState, setQuickState] = useState<QuickSearchState>(EMPTY_QUICK);
  const [advancedState, setAdvancedState] = useState<AdvancedSearchState>(EMPTY_ADVANCED);
  const [activeFilters, setActiveFilters] = useState<AdvancedSearchState | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredRows = useMemo(() => {
    return REPORTED_INCIDENTS_MOCK.filter((row) => {
      if (!showArchived && row.archived) return false;
      if (!activeFilters) return true;
      if (activeFilters.registration && row.registration !== activeFilters.registration) return false;
      if (activeFilters.incidentId && !row.incidentId.toLowerCase().includes(activeFilters.incidentId.toLowerCase())) return false;
      if (activeFilters.createdBy && row.createdBy !== activeFilters.createdBy) return false;
      if (activeFilters.incidentDate && row.incidentDate !== activeFilters.incidentDate) return false;
      if (activeFilters.incidentType && row.incidentType !== activeFilters.incidentType) return false;
      if (activeFilters.allocatedTo && row.allocatedTo !== activeFilters.allocatedTo) return false;
      if (activeFilters.incidentStatus && row.incidentStatus !== activeFilters.incidentStatus) return false;
      if (activeFilters.region && row.region !== activeFilters.region) return false;
      if (activeFilters.division && row.division !== activeFilters.division) return false;
      return true;
    });
  }, [activeFilters, showArchived]);

  const pagedRows = useMemo(
    () => filteredRows.slice((page - 1) * pageSize, page * pageSize),
    [filteredRows, page, pageSize],
  );

  const handleSearch = () => {
    setPage(1);
    if (searchMode === 'quick') {
      setActiveFilters({
        ...EMPTY_ADVANCED,
        registration: quickState.registration,
        incidentId: quickState.incidentId,
        createdBy: quickState.createdBy,
      });
    } else {
      setActiveFilters(advancedState);
    }
  };

  const handleClear = () => {
    setQuickState(EMPTY_QUICK);
    setAdvancedState(EMPTY_ADVANCED);
    setActiveFilters(null);
    setPage(1);
  };

  const handleTabChange = (m: SearchMode) => {
    setSearchMode(m);
    handleClear();
  };

  return (
    <PageShell
      title="Reported Incidents"
      hideHeader
      className="flex h-full min-h-0 flex-1 flex-col space-y-0"
      contentWrapperClassName="relative flex min-h-0 flex-1 flex-col"
    >
      <PageSurface
        padding={PAGE_SURFACE_FOOTER_PADDING}
        fill
        sectionGap="none"
        className="min-h-0 flex-1 bg-[#f0f4f8]"
      >
        <PageSurface.Body className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className={cn('flex min-h-0 flex-1 flex-col', fleetSurface.sectionGap)}>

            {/* Search panel */}
            <div
              className={cn(
                'max-w-full shrink-0 rounded-md border border-slate-200/90 bg-white shadow-sm',
                fleetSurface.filterBar,
              )}
            >
              <div className="flex flex-col gap-2">
                <SearchModeTabs value={searchMode} onChange={handleTabChange} />

                {searchMode === 'quick' ? (
                  <ReportedIncidentsQuickSearch
                    state={quickState}
                    onChange={setQuickState}
                    onSearch={handleSearch}
                    onClear={handleClear}
                    registrationOptions={REGISTRATIONS}
                  />
                ) : (
                  <ReportedIncidentsAdvancedSearch
                    state={advancedState}
                    onChange={setAdvancedState}
                    onSearch={handleSearch}
                    onClear={handleClear}
                  />
                )}
              </div>
            </div>

            {/* Table */}
            <ReportedIncidentsTable
              rows={pagedRows}
              totalCount={filteredRows.length}
              page={page}
              pageSize={pageSize}
              showArchived={showArchived}
              onShowArchivedChange={(v) => { setShowArchived(v); setPage(1); }}
              onPageChange={setPage}
              onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
              onResetColumns={() => {}}
              onViewDetail={(row) => console.log('View incident:', row)}
            />
          </div>
        </PageSurface.Body>
        <PageSurface.Footer />
      </PageSurface>
    </PageShell>
  );
}
