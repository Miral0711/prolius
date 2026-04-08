import { useMemo, useState } from 'react';
import { PageLayout, SearchPanel } from '@/components/shared';
import { ASSET_DEFECTS_MOCK } from './mock-data';
import type { AdvancedSearchState } from './components/AssetDefectsAdvancedSearch';
import { AssetDefectsAdvancedSearch } from './components/AssetDefectsAdvancedSearch';
import type { QuickSearchState } from './components/AssetDefectsQuickSearch';
import { AssetDefectsQuickSearch } from './components/AssetDefectsQuickSearch';
import { AssetDefectsTable } from './components/AssetDefectsTable';
import { SearchModeTabs, type SearchMode } from './components/SearchModeTabs';

const EMPTY_QUICK: QuickSearchState = { assetNumber: '', defectId: '', createdBy: '' };

const EMPTY_ADVANCED: AdvancedSearchState = {
  assetNumber: '',
  defectId: '',
  createdBy: '',
  category: '',
  defect: '',
  allocatedTo: '',
  defectStatus: '',
  dateFrom: '',
  dateTo: '',
  region: '',
  division: '',
  archived: false,
};

const ASSET_NUMBERS = [...new Set(ASSET_DEFECTS_MOCK.map((r) => r.assetNumber))];

export default function AssetDefectsPage() {
  const [searchMode, setSearchMode] = useState<SearchMode>('quick');
  const [quickState, setQuickState] = useState<QuickSearchState>(EMPTY_QUICK);
  const [advancedState, setAdvancedState] = useState<AdvancedSearchState>(EMPTY_ADVANCED);
  const [activeFilters, setActiveFilters] = useState<AdvancedSearchState | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredRows = useMemo(() => {
    return ASSET_DEFECTS_MOCK.filter((row) => {
      if (!showArchived && row.archived) return false;
      if (!activeFilters) return true;
      if (activeFilters.assetNumber && row.assetNumber !== activeFilters.assetNumber) return false;
      if (activeFilters.defectId && !row.defectId.toLowerCase().includes(activeFilters.defectId.toLowerCase())) return false;
      if (activeFilters.createdBy && row.createdBy !== activeFilters.createdBy) return false;
      if (activeFilters.category && row.category !== activeFilters.category) return false;
      if (activeFilters.defect && !row.defect.toLowerCase().includes(activeFilters.defect.toLowerCase())) return false;
      if (activeFilters.allocatedTo && row.allocatedTo !== activeFilters.allocatedTo) return false;
      if (activeFilters.defectStatus && row.defectStatus !== activeFilters.defectStatus) return false;
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
        assetNumber: quickState.assetNumber,
        defectId: quickState.defectId,
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
    <PageLayout title="Asset Defects">
      <SearchPanel>
        <div className="flex flex-col gap-2">
          <SearchModeTabs value={searchMode} onChange={handleTabChange} />
          {searchMode === 'quick' ? (
            <AssetDefectsQuickSearch
              state={quickState}
              onChange={setQuickState}
              onSearch={handleSearch}
              onClear={handleClear}
              assetNumberOptions={ASSET_NUMBERS}
            />
          ) : (
            <AssetDefectsAdvancedSearch
              state={advancedState}
              onChange={setAdvancedState}
              onSearch={handleSearch}
              onClear={handleClear}
            />
          )}
        </div>
      </SearchPanel>
      <AssetDefectsTable
        rows={pagedRows}
        totalCount={filteredRows.length}
        page={page}
        pageSize={pageSize}
        showArchived={showArchived}
        onShowArchivedChange={(v) => { setShowArchived(v); setPage(1); }}
        onPageChange={setPage}
        onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
        onResetColumns={() => {}}
        onViewDetail={(row) => console.log('View asset defect:', row)}
      />
    </PageLayout>
  );
}
