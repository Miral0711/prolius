import { useMemo, useState } from 'react';
import { PageShell } from '@/components/ui/page-shell';
import { PageSurface, PAGE_SURFACE_FOOTER_PADDING } from '@/components/layout';
import { fleetSurface } from '@/components/fleet/bus-master/tokens';
import { cn } from '@/lib/utils';
import { VEHICLE_CHECKS_MOCK } from './mock-data';
import type { AdvancedSearchState } from './components/VehicleChecksAdvancedSearch';
import { VehicleChecksAdvancedSearch } from './components/VehicleChecksAdvancedSearch';
import { VehicleChecksQuickSearch } from './components/VehicleChecksQuickSearch';
import { VehicleChecksTable } from './components/VehicleChecksTable';
import { SearchModeTabs, type SearchMode } from './components/SearchModeTabs';

const EMPTY_QUICK = { registration: '', createdBy: '' };
const EMPTY_ADVANCED: AdvancedSearchState = {
  registration: '',
  createdBy: '',
  checkType: '',
  vehicleType: '',
  vehicleStatus: '',
  checkResult: '',
  dateFrom: '',
  dateTo: '',
  region: '',
  division: '',
};

const REGISTRATIONS = [...new Set(VEHICLE_CHECKS_MOCK.map((r) => r.registration))];

export default function VehicleChecksPage() {
  const [searchMode, setSearchMode] = useState<SearchMode>('quick');
  const [quickState, setQuickState] = useState(EMPTY_QUICK);
  const [advancedState, setAdvancedState] = useState<AdvancedSearchState>(EMPTY_ADVANCED);
  const [activeFilters, setActiveFilters] = useState<typeof EMPTY_ADVANCED | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredRows = useMemo(() => {
    if (!activeFilters) return VEHICLE_CHECKS_MOCK;
    return VEHICLE_CHECKS_MOCK.filter((row) => {
      if (activeFilters.registration && row.registration !== activeFilters.registration) return false;
      if (activeFilters.createdBy && row.createdBy !== activeFilters.createdBy) return false;
      if (activeFilters.checkType && row.type !== activeFilters.checkType) return false;
      if (activeFilters.vehicleStatus && row.vehicleStatus !== activeFilters.vehicleStatus) return false;
      if (activeFilters.checkResult && row.checkResult !== activeFilters.checkResult) return false;
      if (activeFilters.region && row.region !== activeFilters.region) return false;
      if (activeFilters.division && row.division !== activeFilters.division) return false;
      return true;
    });
  }, [activeFilters]);

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

  return (
    <PageShell
      title="Vehicle Checks"
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
                <SearchModeTabs value={searchMode} onChange={(m) => { setSearchMode(m); handleClear(); }} />

                {searchMode === 'quick' ? (
                  <VehicleChecksQuickSearch
                    state={quickState}
                    onChange={setQuickState}
                    onSearch={handleSearch}
                    onClear={handleClear}
                    registrationOptions={REGISTRATIONS}
                  />
                ) : (
                  <VehicleChecksAdvancedSearch
                    state={advancedState}
                    onChange={setAdvancedState}
                    onSearch={handleSearch}
                    onClear={handleClear}
                  />
                )}
              </div>
            </div>

            {/* Table */}
            <VehicleChecksTable
              rows={pagedRows}
              totalCount={filteredRows.length}
              page={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
              onResetColumns={() => {}}
              onViewDetail={(row) => console.log('View detail:', row)}
            />
          </div>
        </PageSurface.Body>
        <PageSurface.Footer />
      </PageSurface>
    </PageShell>
  );
}
