import { useState, useCallback } from 'react';

export interface UseSearchFilterReturn<TFilters> {
  activeFilters: TFilters | null;
  applyFilters: (filters: TFilters) => void;
  clearFilters: () => void;
}

/**
 * Manages "committed" filter state — filters only apply when the user
 * explicitly clicks Search, not on every keystroke.
 */
export function useSearchFilter<TFilters>(): UseSearchFilterReturn<TFilters> {
  const [activeFilters, setActiveFilters] = useState<TFilters | null>(null);

  const applyFilters = useCallback((filters: TFilters) => {
    setActiveFilters(filters);
  }, []);

  const clearFilters = useCallback(() => {
    setActiveFilters(null);
  }, []);

  return { activeFilters, applyFilters, clearFilters };
}
