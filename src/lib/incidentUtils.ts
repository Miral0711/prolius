/**
 * incidentUtils.ts
 * Repeated incident detection + trend intelligence.
 * Pure, data-driven, and reusable across any component that works with incident rows.
 */

export interface IncidentForDetection {
  registration: string;
  /** Date string in "DD/MM/YYYY HH:mm" or "DD/MM/YYYY" format */
  date: string;
}

export interface FrequentVehicleInfo {
  /** Number of incidents within the time window */
  count: number;
  /** True when count >= threshold */
  isFrequent: boolean;
}

/**
 * Parses a date string in "DD/MM/YYYY HH:mm" or "DD/MM/YYYY" format to a timestamp (ms).
 */
function parseIncidentDate(dateStr: string): number {
  // "DD/MM/YYYY HH:mm" or "DD/MM/YYYY"
  const [datePart, timePart = '00:00'] = dateStr.trim().split(' ');
  const [day, month, year] = datePart.split('/').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes).getTime();
}

/**
 * Builds a map of registration → FrequentVehicleInfo.
 *
 * For each vehicle, counts how many incidents fall within `windowHours` of
 * the most-recent incident for that vehicle. If count >= `threshold`, marks
 * it as frequent.
 *
 * @param incidents  - All incident rows to analyse (the full unfiltered dataset)
 * @param windowHours - Detection window in hours (default 72)
 * @param threshold   - Min incidents to be "frequent" (default 2)
 */
export function buildFrequentVehicleMap<T extends IncidentForDetection>(
  incidents: T[],
  windowHours = 72,
  threshold = 2,
): Map<string, FrequentVehicleInfo> {
  const windowMs = windowHours * 60 * 60 * 1000;

  // Group timestamps by registration
  const byVehicle = new Map<string, number[]>();
  for (const row of incidents) {
    const ts = parseIncidentDate(row.date);
    const bucket = byVehicle.get(row.registration) ?? [];
    bucket.push(ts);
    byVehicle.set(row.registration, bucket);
  }

  const result = new Map<string, FrequentVehicleInfo>();

  for (const [reg, timestamps] of byVehicle) {
    const sorted = [...timestamps].sort((a, b) => b - a); // newest first
    const latest = sorted[0];
    const count = sorted.filter((ts) => latest - ts <= windowMs).length;
    result.set(reg, { count, isFrequent: count >= threshold });
  }

  return result;
}


/* ─── Trend intelligence ─────────────────────────────────────────────────── */

export type TrendDirection = 'up' | 'down' | 'flat';

export interface IncidentTrend {
  /** Incidents in the current period */
  current: number;
  /** Incidents in the previous period */
  previous: number;
  /** Absolute change (current - previous) */
  delta: number;
  /** Percentage change rounded to 1 decimal. null when previous === 0. */
  pct: number | null;
  direction: TrendDirection;
  /** Human-readable label, e.g. "+3 (+42.9%) vs last week" */
  label: string;
  /** Period description shown in tooltip, e.g. "7 Apr – 13 Apr" */
  currentPeriodLabel: string;
  previousPeriodLabel: string;
}

/** Format a Date as "D MMM" (e.g. "7 Apr") */
function fmtDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

/**
 * Computes incident trend by comparing two equal-length periods ending today.
 *
 * @param incidents  Full unfiltered dataset
 * @param periodDays Length of each period in days (default 7 = weekly)
 * @param referenceDate  Anchor "today" — defaults to actual now, but injectable for tests
 */
export function computeIncidentTrend<T extends IncidentForDetection>(
  incidents: T[],
  periodDays = 7,
  referenceDate: Date = new Date(),
): IncidentTrend {
  const periodMs = periodDays * 24 * 60 * 60 * 1000;
  const refTs = referenceDate.getTime();

  // Current period: (refTs - periodMs, refTs]
  const currentStart = refTs - periodMs;
  // Previous period: (refTs - 2*periodMs, refTs - periodMs]
  const prevStart = refTs - 2 * periodMs;
  const prevEnd   = currentStart;

  let current = 0;
  let previous = 0;

  for (const row of incidents) {
    const ts = parseIncidentDate(row.date);
    if (ts > currentStart && ts <= refTs)  current++;
    if (ts > prevStart   && ts <= prevEnd) previous++;
  }

  const delta = current - previous;
  const pct   = previous === 0 ? null : Math.round((delta / previous) * 1000) / 10;

  let direction: TrendDirection = 'flat';
  if (delta > 0) direction = 'up';
  if (delta < 0) direction = 'down';

  const sign       = delta >= 0 ? '+' : '';
  const pctStr     = pct !== null ? ` (${sign}${pct}%)` : '';
  const periodName = periodDays === 7 ? 'week' : periodDays === 1 ? 'day' : `${periodDays}d`;
  const label      = `${sign}${delta}${pctStr} vs last ${periodName}`;

  const currentPeriodLabel  = `${fmtDate(new Date(currentStart + 1))} – ${fmtDate(new Date(refTs))}`;
  const previousPeriodLabel = `${fmtDate(new Date(prevStart + 1))} – ${fmtDate(new Date(prevEnd))}`;

  return { current, previous, delta, pct, direction, label, currentPeriodLabel, previousPeriodLabel };
}

/* ─── Hotspot detection ──────────────────────────────────────────────────── */

export interface IncidentForHotspot {
  region: string;
  division: string;
}

export interface HotspotInfo {
  /** Canonical key: "Region · Division" */
  key: string;
  region: string;
  division: string;
  count: number;
  /** Rank 1 = highest count */
  rank: number;
  isHotspot: boolean;
}

/**
 * Groups incidents by region+division, ranks by count descending.
 * Locations whose rank <= `topN` are flagged as hotspots.
 *
 * Returns:
 *  - `map`  — key → HotspotInfo, for O(1) row lookups
 *  - `top`  — sorted array of the top-N entries (for the summary bar)
 */
export function buildHotspotData<T extends IncidentForHotspot>(
  incidents: T[],
  topN = 3,
): { map: Map<string, HotspotInfo>; top: HotspotInfo[] } {
  // Count by key
  const counts = new Map<string, { region: string; division: string; count: number }>();
  for (const row of incidents) {
    const key = `${row.region} · ${row.division}`;
    const entry = counts.get(key) ?? { region: row.region, division: row.division, count: 0 };
    entry.count++;
    counts.set(key, entry);
  }

  // Sort descending by count
  const sorted = [...counts.entries()].sort((a, b) => b[1].count - a[1].count);

  const map = new Map<string, HotspotInfo>();
  const top: HotspotInfo[] = [];

  sorted.forEach(([key, { region, division, count }], idx) => {
    const rank = idx + 1;
    const isHotspot = rank <= topN;
    const info: HotspotInfo = { key, region, division, count, rank, isHotspot };
    map.set(key, info);
    if (isHotspot) top.push(info);
  });

  return { map, top };
}

/* ─── Smart summary ──────────────────────────────────────────────────────── */

export interface IncidentSummaryData {
  /** Incidents whose `date` falls on today (DD/MM/YYYY match) */
  todayCount: number;
  /** Non-archived rows where status is not Resolved, Closed, or Archived */
  unresolvedCount: number;
  /** Distinct registrations flagged as frequent (≥2 incidents in 72 h) */
  frequentVehicleCount: number;
  /**
   * Distinct `createdBy` values whose incidents appear on ≥2 distinct dates
   * within the last 30 days — proxy for high-risk drivers/reporters.
   */
  highRiskDriverCount: number;
  /** Top hotspot location key, e.g. "Riyadh · North Depot (5)" */
  topHotspot: string | null;
  /** Raw count for the top hotspot */
  topHotspotCount: number;
}

const RESOLVED_STATUSES = new Set(['Resolved', 'Closed', 'Archived']);

/**
 * Derives all summary metrics from the full unfiltered dataset in a single pass
 * (plus one secondary pass for frequent-vehicle detection).
 *
 * @param incidents  Full dataset
 * @param referenceDate  Anchor "today" — injectable for tests (default: now)
 */
export function computeIncidentSummary<
  T extends IncidentForDetection & IncidentForHotspot & {
    incidentStatus: string;
    createdBy: string;
    archived: boolean;
  },
>(incidents: T[], referenceDate: Date = new Date()): IncidentSummaryData {
  // "today" as DD/MM/YYYY string
  const todayStr = referenceDate
    .toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
    .replace(/\//g, '/');

  // 30-day window for high-risk driver detection
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
  const windowStart  = referenceDate.getTime() - thirtyDaysMs;

  let todayCount = 0;
  let unresolvedCount = 0;

  // driver → Set of distinct incident dates (DD/MM/YYYY) within 30 days
  const driverDates = new Map<string, Set<string>>();
  // hotspot counts
  const hotspotCounts = new Map<string, number>();

  for (const row of incidents) {
    // today
    const datePart = row.date.split(' ')[0]; // "DD/MM/YYYY"
    if (datePart === todayStr) todayCount++;

    // unresolved (exclude archived rows)
    if (!row.archived && !RESOLVED_STATUSES.has(row.incidentStatus)) unresolvedCount++;

    // high-risk driver window
    const ts = parseIncidentDate(row.date);
    if (ts >= windowStart) {
      const bucket = driverDates.get(row.createdBy) ?? new Set<string>();
      bucket.add(datePart);
      driverDates.set(row.createdBy, bucket);
    }

    // hotspot
    const hKey = `${row.region} · ${row.division}`;
    hotspotCounts.set(hKey, (hotspotCounts.get(hKey) ?? 0) + 1);
  }

  // frequent vehicles — reuse existing logic
  const freqMap = buildFrequentVehicleMap(incidents, 72, 2);
  const frequentVehicleCount = [...freqMap.values()].filter((v) => v.isFrequent).length;

  // high-risk drivers: appeared on ≥2 distinct dates in last 30 days
  const highRiskDriverCount = [...driverDates.values()].filter((dates) => dates.size >= 2).length;

  // top hotspot
  let topHotspot: string | null = null;
  let topHotspotCount = 0;
  for (const [key, count] of hotspotCounts) {
    if (count > topHotspotCount) {
      topHotspotCount = count;
      topHotspot = key;
    }
  }

  return {
    todayCount,
    unresolvedCount,
    frequentVehicleCount,
    highRiskDriverCount,
    topHotspot,
    topHotspotCount,
  };
}
