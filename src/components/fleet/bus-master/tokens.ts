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
  /** Table cell padding — aligned with CompactTripsTable (px-3, comfortable rows) */
  cell: 'px-3 py-2',
  /** Slightly shorter header row for denser data tables */
  cellHeader: 'px-3 py-1.5',
  /** Toolbar (Bus List title row) */
  toolbar: 'px-3 py-2',
  /** Filter bar padding */
  filterBar: 'px-3 py-1.5',
  /** Pagination bar */
  paginationBar: 'px-3 py-1.5',
  /** Card radius (match existing glass cards) */
  radius: 'rounded-md',
  /** Table container */
  /** Sum matches BUS_TABLE_COL_WIDTH_PX total (~1216px) for stable table-fixed layout */
  tableMinWidth: 'min-w-[1216px]',
  /** Bus Master / legacy admin: dark header row (aligns with app sidebar navy) */
  tableHeaderNavy:
    'border-b border-[#151b2b] bg-[#1a2333] text-white shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.06)]',
} as const;

export const fleetType = {
  kpiLabel: 'text-[8px] font-medium uppercase leading-none tracking-wider text-slate-400',
  kpiValue: 'text-[15px] font-semibold leading-none tabular-nums text-slate-800',
  tableHead: 'text-[10px] font-medium uppercase tracking-wide text-slate-600',
  bodyPrimary: 'text-[11px] font-medium text-slate-900',
  bodyMuted: 'text-[9px] font-normal uppercase tracking-wide text-slate-500',
  bodyMono: 'text-[10px] font-medium tabular-nums text-slate-800',
  bodyMonoMuted: 'text-[10px] font-normal tabular-nums text-slate-600',
} as const;
