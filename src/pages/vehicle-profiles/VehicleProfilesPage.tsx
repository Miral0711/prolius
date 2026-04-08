import { useMemo, useState } from 'react';
import { PageLayout } from '@/components/shared';
import { VEHICLE_PROFILES_MOCK } from './mock-data';
import { VehicleProfilesSearchBar } from './components/VehicleProfilesSearchBar';
import { VehicleProfilesTable } from './components/VehicleProfilesTable';
import type { VehicleProfileRow } from './mock-data';

export default function VehicleProfilesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredRows = useMemo(() => {
    return VEHICLE_PROFILES_MOCK.filter((row) => {
      if (!showArchived && row.archived) return false;
      if (!activeQuery) return true;
      const q = activeQuery.toLowerCase();
      return (
        row.type.toLowerCase().includes(q) ||
        row.category.toLowerCase().includes(q) ||
        row.subCategory.toLowerCase().includes(q) ||
        row.manufacturer.toLowerCase().includes(q) ||
        row.model.toLowerCase().includes(q) ||
        row.fuelType.toLowerCase().includes(q) ||
        row.engineType.toLowerCase().includes(q)
      );
    });
  }, [activeQuery, showArchived]);

  const pagedRows = useMemo(
    () => filteredRows.slice((page - 1) * pageSize, page * pageSize),
    [filteredRows, page, pageSize],
  );

  const handleSearch = () => {
    setActiveQuery(searchQuery);
    setPage(1);
  };

  const handleClear = () => {
    setSearchQuery('');
    setActiveQuery('');
    setPage(1);
  };

  const handleAction = (action: string, row: VehicleProfileRow) =>
    console.log(action, row);

  return (
    <PageLayout title="Vehicle Profiles">
      <VehicleProfilesSearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
        onClear={handleClear}
      />
      <VehicleProfilesTable
        rows={pagedRows}
        totalCount={filteredRows.length}
        page={page}
        pageSize={pageSize}
        showArchived={showArchived}
        onShowArchivedChange={(v) => { setShowArchived(v); setPage(1); }}
        onPageChange={setPage}
        onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
        onResetColumns={() => {}}
        onAddProfile={() => console.log('Add profile')}
        onView={(row) => handleAction('view', row)}
        onEdit={(row) => handleAction('edit', row)}
        onDelete={(row) => handleAction('delete', row)}
      />
    </PageLayout>
  );
}
