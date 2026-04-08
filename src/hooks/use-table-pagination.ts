import { useState, useMemo } from 'react';

export interface UseTablePaginationOptions {
  defaultPageSize?: number;
}

export interface UseTablePaginationReturn {
  page: number;
  pageSize: number;
  setPage: (p: number) => void;
  setPageSize: (s: number) => void;
  paginate: <T>(rows: T[]) => T[];
  totalPages: (totalCount: number) => number;
  showingFrom: (totalCount: number) => number;
  showingTo: (totalCount: number) => number;
  resetPage: () => void;
}

export function useTablePagination({
  defaultPageSize = 10,
}: UseTablePaginationOptions = {}): UseTablePaginationReturn {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const resetPage = () => setPage(1);

  const paginate = <T>(rows: T[]): T[] =>
    rows.slice((page - 1) * pageSize, page * pageSize);

  const totalPages = (totalCount: number) =>
    Math.max(1, Math.ceil(totalCount / pageSize));

  const showingFrom = (totalCount: number) =>
    totalCount === 0 ? 0 : (page - 1) * pageSize + 1;

  const showingTo = (totalCount: number) =>
    Math.min(page * pageSize, totalCount);

  return {
    page,
    pageSize,
    setPage,
    setPageSize: (s: number) => { setPageSize(s); setPage(1); },
    paginate,
    totalPages,
    showingFrom,
    showingTo,
    resetPage,
  };
}
