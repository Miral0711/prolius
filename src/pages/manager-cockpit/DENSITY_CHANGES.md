# Manager Cockpit density changes (before → after)

Same approach as Dashboard: single spacing scale (4/8/12/16), PageContainer + Section, compact cards and lists.

## Page & layout

| Item                  | Before                                               | After                                         |
| --------------------- | ---------------------------------------------------- | --------------------------------------------- |
| Page wrapper          | PageShell (space-y-4, custom header)                 | PageContainer + Section; header row gap-2     |
| Section spacing       | BlockSectionHeader !mt-0 / mt-6 mb-2, div gap-4 pt-0 | Section (gap-2); BlockSectionHeader mb-1 only |
| Between sections      | Implicit from mt-6 + gap-4                           | PageContainer gap-4                           |
| Content grids         | gap-4, pt-0                                          | gap-3                                         |
| CardGrid preset "two" | gap-4 lg:gap-4                                       | gap-3 lg:gap-3 (in preset)                    |

## Page header

| Item      | Before                             | After                           |
| --------- | ---------------------------------- | ------------------------------- |
| Title     | text-2xl font-semibold (PageShell) | text-xl lg:text-2xl font-medium |
| Subtitle  | mt-0.5 text-xs lg:text-sm          | mt-0.5 text-xs leading-tight    |
| Date pill | px-3 py-1.5, gap-2, icons 3.5/4    | px-2 py-1, gap-1.5, icons 3/3   |

## Shared UI (DataCard, StatTile)

| Item                              | Before                                    | After                                     |
| --------------------------------- | ----------------------------------------- | ----------------------------------------- |
| DataCard header                   | mb-2 h-7, text-sm font-semibold, icon h-4 | mb-1 h-6, text-sm font-medium, icon h-3.5 |
| DataCard padding                  | className p-3 (overrides GlassCard)       | GlassCard size="sm" (p-3)                 |
| TOP_TILE_CLASS (StatTile cockpit) | p-3 min-h-[84px]                          | px-2 py-1.5 min-h-[52px]                  |
| StatTile default                  | min-h-[70px] p-2                          | min-h-[52px] px-2 py-1.5                  |
| StatTile glow                     | -left-5 -top-5 h-12 w-12 blur-xl          | -left-4 -top-4 h-8 w-8 blur-lg            |
| StatTile icon (cockpit)           | h-8 w-8, icon h-4                         | h-6 w-6, icon h-3                         |
| StatTile icon (default)           | h-6 w-6, icon h-3                         | h-5 w-5, icon h-2.5                       |
| StatTile value (cockpit)          | text-2xl                                  | text-lg                                   |
| StatTile value (default)          | text-xl                                   | text-sm                                   |
| StatTile label/sub                | text-[11px] / text-xs, Dot h-2            | text-[10px] leading-none, Dot h-1.5       |

## CriticalAlerts

| Item         | Before                                   | After                                         |
| ------------ | ---------------------------------------- | --------------------------------------------- |
| Grid         | gap-4                                    | gap-2                                         |
| Tile content | gap-3, h-8 w-8 icon, text-[11px]/text-xs | gap-2, h-6 w-6 icon, text-[10px] leading-none |
| Value        | text-2xl                                 | text-lg                                       |

## FleetStatus

| Item                      | Before                                | After                                |
| ------------------------- | ------------------------------------- | ------------------------------------ |
| Grids                     | gap-4, gap-3                          | gap-2                                |
| "Additional Stats" header | !mt-3 !mb-2                           | mt-2 mb-1                            |
| Extra stat row            | min-h-[40px] h-10 p-2.5, h-8 w-8 icon | min-h-[36px] py-2 px-2, h-6 w-6 icon |
| Right label               | text-sm                               | text-xs                              |

## FinancialSnapshot

| Item             | Before          | After               |
| ---------------- | --------------- | ------------------- |
| Main block       | px-3 py-3       | px-2 py-2           |
| Today value      | text-xl         | text-lg             |
| Sub grid         | mt-2, px-3 py-2 | mt-1.5, px-2 py-1.5 |
| Week/Month value | text-lg         | text-base           |

## ActionQueue

| Item      | Before      | After                    |
| --------- | ----------- | ------------------------ |
| Container | space-y-2   | flex flex-col gap-2      |
| Rows      | px-3 py-2   | min-h-[36px] px-2 py-1.5 |
| Badge     | px-2 py-0.5 | px-1.5 py-0.5            |
| Icon      | h-4 w-4     | h-3.5 w-3.5              |

## DriverOverview

| Item         | Before            | After           |
| ------------ | ----------------- | --------------- |
| Wrapper card | p-4               | p-3             |
| Grid         | gap-2 (unchanged) | gap-2 + min-h-0 |

## RecentActivity

| Item         | Before        | After                      |
| ------------ | ------------- | -------------------------- |
| Card         | className p-4 | DataCard default (size sm) |
| Inner        | p-3 pt-0      | pt-0 only                  |
| Rows         | py-2          | min-h-[36px] py-2          |
| Label dot    | h-2 w-2       | h-1.5 w-1.5                |
| Label        | text-[11px]   | text-[10px] leading-tight  |
| Content cell | px-3 py-2     | px-2 py-1.5                |

## QuickActions

| Item  | Before              | After                          |
| ----- | ------------------- | ------------------------------ |
| Card  | className p-4       | DataCard default               |
| Grid  | gap-3, p-3 per cell | gap-2, px-2 py-2, min-h-[36px] |
| Icon  | h-8 w-8, icon h-4   | h-6 w-6, icon h-3              |
| Label | gap-2               | gap-1.5                        |

## DvrCameraStatus

| Item         | Before           | After                |
| ------------ | ---------------- | -------------------- |
| Card         | className p-4    | DataCard default     |
| Grid         | gap-3            | gap-2                |
| Cell         | p-3              | px-2 py-2            |
| Status badge | mt-1 px-2 py-0.5 | mt-0.5 px-1.5 py-0.5 |
| Value        | text-lg          | text-base            |
