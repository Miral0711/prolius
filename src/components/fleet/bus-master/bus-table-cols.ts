/**
 * Fixed column widths for Bus Master `table-fixed` layout.
 * Tuned so text columns get readable width, IDs stay tight, and chip columns match badge width.
 */
export const BUS_TABLE_COL_WIDTH_PX = [
  44, // checkbox
  204, // company name (primary scan column)
  84, // plate no
  58, // seq no
  88, // mdt id
  196, // subscription range
  100, // tariff
  86, // wasl
  108, // status
  86, // power
  122, // actions
] as const;

export const BUS_TABLE_TOTAL_PX = BUS_TABLE_COL_WIDTH_PX.reduce((a, b) => a + b, 0);

/** Column count for `<colgroup>` / empty-state `colSpan` (keeps Bus List table reusable). */
export const BUS_LIST_TABLE_COLUMN_COUNT = BUS_TABLE_COL_WIDTH_PX.length;
