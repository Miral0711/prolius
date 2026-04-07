import { useMemo, useState } from 'react';
import { HISTORY_MOCK } from '../mock-data';
import { MessagingStatsRow } from './MessagingStatsRow';
import { MessagingHistoryTable } from './MessagingHistoryTable';

export function MessagingHistoryTab() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const pagedRows = useMemo(
    () => HISTORY_MOCK.slice((page - 1) * pageSize, page * pageSize),
    [page, pageSize],
  );

  return (
    <div className="flex flex-col gap-4">
      <MessagingStatsRow />
      <MessagingHistoryTable
        rows={pagedRows}
        totalCount={HISTORY_MOCK.length}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
        onViewMessage={(row) => console.log('View message:', row)}
        onViewReport={(row) => console.log('View report:', row)}
      />
    </div>
  );
}
