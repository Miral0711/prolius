/**
 * Fixed column widths for Bus Master `table-fixed` layout.
 * Rebalanced to keep spacing more even across columns, similar to compact dashboard tables.
 */
export const BUS_TABLE_COL_WIDTH_PX = [
  52, // expand + checkbox
  170, // company
  100, // plate
  72, // seq
  100, // mdt
  170, // subscription range
  100, // tariff
  100, // wasl
  112, // status
  100, // power
  140, // actions
] as const;

export const BUS_TABLE_TOTAL_PX = BUS_TABLE_COL_WIDTH_PX.reduce((a, b) => a + b, 0);
