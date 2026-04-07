import { useMemo, useState } from 'react';
import { PageShell } from '@/components/ui/page-shell';
import { PageSurface, PAGE_SURFACE_FOOTER_PADDING } from '@/components/layout';
import { fleetSurface } from '@/components/fleet/bus-master/tokens';
import { cn } from '@/lib/utils';
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
    <PageShell
      title="Vehicle Profiles"
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

            {/* Search bar */}
            <VehicleProfilesSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              onClear={handleClear}
            />

            {/* Table */}
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
          </div>
        </PageSurface.Body>
        <PageSurface.Footer />
      </PageSurface>
    </PageShell>
  );
}
