# Dashboard density changes (before → after)

## Container & layout

| Item                                | Before                                                         | After                                                      |
| ----------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------- |
| Page outer padding (layout wrapper) | `px-4 pb-4`, `lg:px-5 lg:pb-5`, `pt: calc(1rem+header+0.5rem)` | `px-3 pb-3`, `lg:px-4 lg:pb-4`, `pt: calc(0.75rem+header)` |
| Main content padding                | `p-3 lg:p-4`                                                   | Unchanged (16px on lg)                                     |
| Page container (Dashboard root)     | `space-y-4` (random margins)                                   | `PageContainer`: `flex flex-col gap-4` (16px scale)        |
| Section spacing                     | `space-y-3` + `BlockSectionHeader mt-6 mb-2`                   | `Section`: `gap-2` (8px); header `mb-1` only               |
| Layout content gap                  | `lg:gap-4`                                                     | `lg:gap-3` (12px)                                          |

## Section headers

| Item                          | Before                            | After                                         |
| ----------------------------- | --------------------------------- | --------------------------------------------- |
| BlockSectionHeader top/bottom | `mt-6 mb-2`                       | `mb-1` (no top; section gap provides spacing) |
| Section label                 | `text-[11px]`, separator `mt-1.5` | `text-[10px] leading-tight`, separator `mt-1` |

## Cards

| Item                     | Before                    | After                                               |
| ------------------------ | ------------------------- | --------------------------------------------------- |
| Card padding (GlassCard) | `p-4` (16px) default only | `size="sm"` → `p-3` (12px); default `p-4` unchanged |
| Chart/operational cards  | `p-3` (12px)              | `size="sm"` → `p-3` (consistent)                    |

## KPI area (MetricCard)

| Item            | Before                        | After                                  |
| --------------- | ----------------------------- | -------------------------------------- |
| Card min-height | `min-h-[70px]`                | `min-h-[52px]`                         |
| Card padding    | `p-2`                         | `px-2 py-1.5`                          |
| Icon container  | `h-6 w-6`, icon `h-3 w-3`     | `h-5 w-5`, icon `h-2.5 w-2.5`          |
| Glow blob       | `h-12 w-12`, `-left-5 -top-5` | `h-8 w-8`, `-left-4 -top-4`, `blur-lg` |
| Title           | `text-[10px] leading-tight`   | `text-[10px] leading-none`             |
| Value           | `text-base`                   | `text-sm`                              |
| Sub line        | `mt-0.5`, dot `h-2 w-2`       | `mt-0.5`, dot `h-1.5 w-1.5`            |

## Charts

| Item                    | Before                            | After                                                              |
| ----------------------- | --------------------------------- | ------------------------------------------------------------------ |
| Chart card header       | `mb-2`, `h-7`, `text-base`        | `mb-1`, `h-6`, `text-sm`                                           |
| Chart plot height       | `h-[200px]`                       | `h-[160px]`                                                        |
| Header icon             | `h-4 w-4`                         | `h-3.5 w-3.5`                                                      |
| Summary row below chart | `mt-2`, `px-3 py-2`, `rounded-xl` | `mt-1.5`, `px-2 py-1.5`, `rounded-lg`, `text-[10px] leading-tight` |

## Map / operational panel

| Item                        | Before                                  | After                                                 |
| --------------------------- | --------------------------------------- | ----------------------------------------------------- |
| Map container               | Fixed `h-[280px]`, `rounded-2xl`        | `min-h-[200px] h-[240px] max-h-[320px]`, `rounded-xl` |
| Pill above map              | `mb-2 px-3 py-1 text-xs`                | `mb-1 px-2 py-0.5 text-[10px] leading-tight`          |
| Safety Pulse / Fleet Status | `mb-2`, `h-7`, `gap-2`, `px-2.5 py-1.5` | `mb-1`, `h-6`, `gap-1.5`, `px-2 py-1`                 |
| Pie chart                   | `h-28 w-28`, inner 24 / outer 44        | `h-24 w-24`, inner 20 / outer 38                      |
| Legend rows                 | `space-y-1.5`, `gap-2`, `h-2 w-2`       | `space-y-1`, `gap-1.5`, `h-1.5 w-1.5`                 |

## Tables / lists (Activity & logs)

| Item                | Before               | After                                        |
| ------------------- | -------------------- | -------------------------------------------- |
| Card header         | `mb-2 h-7 text-base` | `mb-1 h-6 text-sm`                           |
| Row height          | `py-2` only          | `min-h-[36px] py-2` (clickable target ≥36px) |
| Progress bar margin | `mt-1.5`             | `mt-1`                                       |

## Page header

| Item           | Before                            | After                       |
| -------------- | --------------------------------- | --------------------------- |
| Header row gap | `gap-3`                           | `gap-2`                     |
| Title          | `text-2xl lg:text-[28px]/[1.1]`   | `text-xl lg:text-2xl`       |
| Date pill      | `px-3 py-1.5`, icon `h-3.5 w-3.5` | `px-2 py-1`, icon `h-3 w-3` |

## New reusable pieces

- **PageContainer**: `flex flex-col gap-4`, `max-w-[1200px]`, `2xl:max-w-[1320px]`.
- **Section**: `flex flex-col gap-2` (no double margins).
- **GlassCard** `size="sm"`: `p-3` (12px).
- **BlockSectionHeader**: margin trimmed; use inside `Section` for spacing.

## Scroll behavior

- Main content scrolls in layout (`overflow-y-auto` on content area).
- Sidebar scroll is independent.
- No horizontal scroll (content `min-w-0 overflow-x-hidden`).
