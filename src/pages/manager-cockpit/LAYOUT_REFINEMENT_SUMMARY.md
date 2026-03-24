# Manager Cockpit Layout Refinement — Summary

## Root Causes of Misalignment and Shadow Inconsistency

### 1. Shadow/Elevation Inconsistency

- **QuickActions** used `border-white/35 bg-white/22` without `CARD_SHADOW_TILE`, making them visually flatter than other tiles.
- **FleetStatus Additional Stats** used `min-h-[36px]` and `bg-white/40` vs main tiles' `min-h-[52px]` and `bg-white/50`.
- **DVR cards** had different padding (`px-2 py-2`) and no explicit `min-h-[52px]`, causing height mismatch.
- **Critical Alerts** already used `ALERT_CARD_BASE`; padding normalized to `px-3 py-2` for consistency.

### 2. Card Alignment Issues

- **Drivers & Health section**: DriverOverview was wrapped in a one-off custom div with `sectionLeadGlass`, while OperationalHealth had no wrapper. Sibling cards had unequal treatment and height.
- **FleetStatus Additional Stats** tiles used `min-h-[36px]` vs `min-h-[52px]` for main status tiles — different heights in the same logical group.
- **Grids** missing `items-stretch` in some places prevented equal-height rows.

### 3. Vertical Spacing

- **FleetStatus** "Additional Stats" used `mt-2 mb-1`, creating a larger gap than needed between Fleet Status and Additional Stats.
- Reduced to `mt-1.5 mb-0.5` for tighter grouping.

### 4. Card Padding

- Mixed padding: `px-2 py-1.5`, `px-2 py-2`, `px-3 py-2` across tiles.
- Standardized to `px-3 py-2` (12px/8px) via `TILE_PADDING` and `TILE_MIN_HEIGHT` constants.

### 5. DVR Section

- DVR grid lacked `items-stretch` for equal-height cards.
- DVR items lacked `min-h-[52px]` and consistent padding.
- Added `TILE_PADDING`, `TILE_MIN_HEIGHT`, and `items-stretch` to align with other tile rows.

### 6. Layout Integrity

- PageContainer already had `overflow-x-hidden` and `min-w-0`.
- Added `pb-6` to page for proper spacing above fixed FAB.
- Layout provides `px-6` on main for equal left/right padding.

---

## Files Modified

| File                    | Changes                                                                                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `stat-tile.tsx`         | Added `TILE_PADDING`, `TILE_MIN_HEIGHT`; `TOP_TILE_CLASS` now uses `bg-white/50`, `px-3 py-2`; default variant uses shared constants.           |
| `CriticalAlerts.tsx`    | `ALERT_CARD_BASE` uses `px-3 py-2` for consistent padding.                                                                                      |
| `FleetStatus.tsx`       | Additional Stats: `min-h-[52px]`, `bg-white/50`, `TILE_PADDING`, `TILE_MIN_HEIGHT`; BlockSectionHeader `mt-1.5 mb-0.5`.                         |
| `DvrCameraStatus.tsx`   | `DVR_ITEM_CLASS` uses `TILE_PADDING`, `TILE_MIN_HEIGHT`; grid has `items-stretch`.                                                              |
| `DriverOverview.tsx`    | `variant="cockpit"` for StatTile; consistent with FleetStatus.                                                                                  |
| `OperationalHealth.tsx` | `variant="cockpit"` for StatTile.                                                                                                               |
| `QuickActions.tsx`      | `CARD_SHADOW_TILE`, `border-white/50 bg-white/50`, `min-h-[52px]`, `px-3 py-2`.                                                                 |
| `index.tsx`             | Drivers & Health: CardGrid + DataCards for Driver Overview and Operational Health; first section grid `items-stretch`; `pb-6` on PageContainer. |

---

## Standardized Tokens

- **CARD_SHADOW_TILE**: Single elevation for all KPI/tile cards.
- **TILE_PADDING**: `px-3 py-2` (12px horizontal, 8px vertical).
- **TILE_MIN_HEIGHT**: `min-h-[52px]` for all sibling tiles in a row.
- **TOP_TILE_CLASS**: `rounded-lg border border-white/50 bg-white/50 px-3 py-2 min-h-[52px]` + CARD_SHADOW_TILE.

---

## Confirmation

- All Critical Alert cards use the same `ALERT_CARD_BASE`; severity indicated only by color (left border + value).
- All sibling cards in a row use identical shadow, border, radius, padding, and min-height.
- Drivers & Health section uses two DataCards with equal treatment and `items-stretch`.
- Fleet Status and Additional Stats are visually connected with reduced gap.
- DVR cards have consistent elevation, equal height, and alignment.
- Page has single vertical scrollbar, no horizontal scroll, equal left/right padding.
