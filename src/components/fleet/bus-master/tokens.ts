/**
 * 8px grid spacing scale for fleet / SaaS data surfaces.
 * Use these class fragments with cn() — avoids one-off spacing.
 */
export const fleetSurface = {
  /** Section gap between KPI row, filter bar, table */
  sectionGap: 'gap-2',
  /** KPI grid gap */
  kpiGap: 'gap-2',
  /** Filter bar internal gap */
  barGap: 'gap-2',
  /** Between action icons */
  actionGap: 'gap-1',
  /**
   * Table cell padding — aligned with dashboard `GridTable` / Top Drivers:
   * `px-3` horizontal, body `py-2.5`, header `py-3`.
   */
  cell: 'px-3 py-2.5',
  cellHeader: 'px-3 py-3',
  /** Toolbar (Bus List title row) */
  toolbar: 'px-3 py-2',
  /** Filter bar padding */
  filterBar: 'px-3 py-1.5',
  /** Pagination bar */
  paginationBar: 'px-3 py-1',
  /** Card radius (match existing glass cards) */
  radius: 'rounded-md',
  /** Table container */
  /** Sum matches BUS_TABLE_COL_WIDTH_PX total for stable table-fixed layout */
  tableMinWidth: 'min-w-[1176px]',
  /** Bus Master / legacy admin: dark header row (aligns with app sidebar navy) */
  tableHeaderNavy:
    'border-b border-[#151b2b] bg-[#1a2333] text-white shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.06)]',
  /**
   * Light grid lines (Bus List / structured data tables).
   * Unified color for vertical + horizontal rules; `first:border-l` closes the left edge.
   */
  tableGridCell: 'border-b border-r border-slate-200/70 first:border-l',
  tableGridHeaderCell: 'border-r border-slate-200/70 first:border-l',
} as const;

export const fleetType = {
  kpiLabel: 'text-2xs font-medium uppercase leading-none tracking-wider text-slate-400',
  kpiValue: 'text-sm font-semibold leading-none tabular-nums text-slate-800',
  tableHead: 'text-xs font-medium uppercase tracking-wide text-slate-600',
  bodyPrimary: 'text-2sm font-medium text-slate-900',
  bodyMuted: 'text-2xs font-normal uppercase tracking-wide text-slate-500',
  bodyMono: 'text-xs font-medium tabular-nums text-slate-800',
  bodyMonoMuted: 'text-xs font-normal tabular-nums text-slate-600',
} as const;
