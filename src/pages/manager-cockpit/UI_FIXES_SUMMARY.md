# Manager Cockpit UI Fixes — Summary

## 1. Issues found and exact changes

### Critical Alerts row (issue 1)

- **Issue:** Only the last alert card appeared to have shadow/elevation; inconsistent card treatment.
- **Root cause:** Tiles used `TOP_TILE_CLASS` plus conditional styling; possible clipping or specificity made shadows inconsistent.
- **Fix:**
  - Introduced a single **`ALERT_CARD_BASE`** in `CriticalAlerts.tsx` used for every alert card: same `rounded-lg`, `border border-white/50`, `bg-white/50`, `px-2 py-1.5`, `min-h-[52px]`, and **`CARD_SHADOW_TILE`** (no conditional shadow).
  - Severity is shown only via **color**: `border-l-4 border-l-red-400/70` and `text-red-600` when `hasAlert`; no extra shadow when count > 0.
  - Set grid to `overflow-visible` so no card’s shadow is clipped.
  - Added `items-stretch` so all alert cards in the row have equal height.

### DVR Camera Status (issue 2)

- **Issue:** White cards/badges blended into the background; low contrast.
- **Fix:**
  - **DVR items:** Replaced `border-white/35 bg-white/22` with **`DVR_ITEM_CLASS`**: `border-slate-200/70`, `bg-white/55`, and **`CARD_SHADOW_TILE`** so each DVR card has the same elevation and clearer separation.
  - **Section container:** Wrapped the DVR grid in a container with `rounded-lg bg-slate-50/40 p-2` to add a light tint and separation from the page background without changing the theme.
  - Kept spacing compact (`gap-2`, `px-2 py-2`).

### Spacing and density (issue 3)

- **Issue:** Unnecessary spacing; layout not data-focused; risk of double spacing and uneven row heights.
- **Fixes:**
  - **Page:** `PageContainer` on Manager Cockpit now uses `className="gap-3"` so section spacing is 12px (single scale).
  - **Sections:** First section grid `gap-3` → `gap-2`; Drivers & Health grid `gap-3` → `gap-2` and added `items-stretch`; Driver wrapper given `min-h-0` to avoid overflow.
  - **Equal heights:** Added `items-stretch` to: Critical Alerts grid, FleetStatus main + Additional Stats grids, DriverOverview grid, OperationalHealth grid, QuickActions grid, and CardGrid preset `two`.
  - **FleetStatus “Additional Stats” tiles:** Same elevation as other tiles via **`CARD_SHADOW_TILE`**; border `border-white/50` and bg `bg-white/40` for consistency.
  - **QuickActions:** Removed `hover:-translate-y-0.5` to avoid layout shift; kept `min-h-[40px]` for touch target; added `hover:shadow-...` and `focus-visible:ring-*` for feedback.
  - **Overflow:** `PageContainer` in `block-section.tsx` now has `min-w-0 overflow-x-hidden` so content doesn’t cause horizontal scroll.

### Layout / consistency

- **Shadow system:** One token **`CARD_SHADOW_TILE`** in `stat-tile.tsx`: `shadow-[0_2px_8px_rgba(31,38,135,0.04),0_1px_4px_rgba(0,0,0,0.03)]`. Used for: all Critical Alert cards, all DVR items, FleetStatus additional-stat tiles, and (via `TOP_TILE_CLASS`) StatTile cockpit tiles. Section-level cards keep existing `sectionLeadGlass` elevation.
- **Spacing scale:** 4/8/12/16 used: `gap-2` (8px), `gap-3` (12px), `p-2` (8px), `p-3` (12px), `mb-1` (4px). Section header uses `mb-1`; section content uses `gap-2`; page uses `gap-3` between sections.
- **Icons:** Alert cards use `h-6 w-6` with icon `h-3 w-3`; QuickActions use `h-6 w-6` and `h-3 w-3`; DataCard header icon `h-3.5 w-3.5`. All icon containers use `items-center` / `justify-center` for alignment.
- **Footer:** Unchanged; still `text-center` and centered.
- **Scroll:** Only main content scrolls; sidebar scroll is independent; `overflow-x-hidden` on page container prevents horizontal scroll.

---

## 2. Files modified

| File                                                         | Changes                                                                                                                                                                     |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/ui/stat-tile.tsx`                            | Added `CARD_SHADOW_TILE`; `TOP_TILE_CLASS` now uses it.                                                                                                                     |
| `src/components/ui/block-section.tsx`                        | `PageContainer`: added `min-w-0 overflow-x-hidden`.                                                                                                                         |
| `src/components/ui/card-grid.tsx`                            | Preset `two`: added `items-stretch`.                                                                                                                                        |
| `src/pages/manager-cockpit/index.tsx`                        | `PageContainer` with `className="gap-3"`; section grids `gap-2`, `items-stretch` on Drivers section; Driver wrapper `min-h-0`.                                              |
| `src/pages/manager-cockpit/components/CriticalAlerts.tsx`    | Replaced per-card mix with `ALERT_CARD_BASE` (same shadow/border/radius/padding for all); severity = left border + value color only; grid `items-stretch overflow-visible`. |
| `src/pages/manager-cockpit/components/DvrCameraStatus.tsx`   | `DVR_ITEM_CLASS` with `CARD_SHADOW_TILE`, `border-slate-200/70`, `bg-white/55`; wrapper `rounded-lg bg-slate-50/40 p-2`.                                                    |
| `src/pages/manager-cockpit/components/FleetStatus.tsx`       | Both grids `items-stretch`; Additional Stats rows use `CARD_SHADOW_TILE`, `border-white/50`, `bg-white/40`.                                                                 |
| `src/pages/manager-cockpit/components/QuickActions.tsx`      | Grid `items-stretch`; link `min-h-[40px]`; removed `hover:-translate-y-0.5`; added hover shadow and focus-visible ring.                                                     |
| `src/pages/manager-cockpit/components/DriverOverview.tsx`    | Grid `items-stretch`.                                                                                                                                                       |
| `src/pages/manager-cockpit/components/OperationalHealth.tsx` | Grid `items-stretch`.                                                                                                                                                       |

---

## 3. Spacing and shadow tokens standardized

- **Shadow**
  - **Tile/card elevation:** `CARD_SHADOW_TILE` = `shadow-[0_2px_8px_rgba(31,38,135,0.04),0_1px_4px_rgba(0,0,0,0.03)]`. Used for every KPI/tile in a row (Critical Alerts, DVR items, FleetStatus extra stats, StatTile via `TOP_TILE_CLASS`). No card in the same row has a different shadow.
  - **Section card:** Existing `sectionLeadGlass` (stronger elevation) unchanged for DataCard when `sectionLead`.

- **Spacing**
  - **Scale:** 4 / 8 / 12 / 16 (Tailwind: 1 / 2 / 3 / 4).
  - **Page:** `gap-3` (12px) between sections.
  - **Section:** `gap-2` (8px) between header and content; section header `mb-1` (4px).
  - **Grids:** `gap-2` (8px) for tile/card grids; `gap-3` for two-column CardGrid.
  - **Cards:** `p-3` (12px) via DataCard `size="sm"`; tile padding `px-2 py-1.5` or `px-2 py-2`.
  - **Lists:** Rows keep `min-h-[36px]` or `min-h-[40px]` for touch targets.

---

## 4. Second pass — alignment and consistency

- **No conditional shadow:** All Critical Alert cards use `ALERT_CARD_BASE`; only color (left border + value) indicates severity.
- **Equal heights:** All relevant grids use `items-stretch` so cards in a row share the same height.
- **Gaps:** Section-to-section 12px; section internal 8px; no mixed margin+padding on the same axis (no double spacing).
- **Overflow:** `overflow-x-hidden` on `PageContainer`; Critical Alerts grid `overflow-visible` so tile shadows are not clipped.
- **Hover/focus:** QuickActions no longer use translate on hover; shadow and focus ring only, so no layout shift.
- **Footer:** Still `text-center`; no changes to layout or centering.
