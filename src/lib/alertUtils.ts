/**
 * alertUtils.ts
 * Alert priority scoring + repeated alert detection.
 * AI-integration-ready: all logic is pure and data-driven.
 */

/* ─── Types ──────────────────────────────────────────────────────────────── */

export type Severity    = 'Critical' | 'High' | 'Medium' | 'Low';
export type AlertStatus = 'Active' | 'Acknowledged' | 'Resolved' | 'Escalated';
export type AlertType   =
  | 'Overspeed' | 'Geofence' | 'Panic Button' | 'Harsh Braking'
  | 'Idle Timeout' | 'Maintenance Due' | 'Low Battery' | 'GPS Lost'
  | 'Accident' | 'Fatigue';

export interface BaseAlert {
  id: string;
  severity: Severity;
  type: AlertType;
  vehicle: string;
  driver: string;
  source: string;
  location: string;
  /** HH:mm:ss — e.g. "14:32:10" */
  time: string;
  status: AlertStatus;
  description: string;
  speed?: number;
  coordinates?: string;
  geofenceZone?: string;
  relatedAlerts?: string[];
  acknowledgedBy?: string;
  resolvedAt?: string;
  notes?: string;
}

/** Alert enriched with computed intelligence fields */
export interface EnrichedAlert extends BaseAlert {
  /** Computed urgency score — higher = more urgent */
  priorityScore: number;
  /** How many times this vehicle+type fired within the detection window */
  repeatCount: number;
  /** True when repeatCount > 1 */
  isRecurring: boolean;
  /** IDs of the other alerts collapsed into this group (most-recent is kept as representative) */
  groupedAlertIds: string[];
}

/* ─── Scoring weights (as specified) ────────────────────────────────────── */

const SEVERITY_WEIGHT: Record<Severity, number> = {
  Critical: 4,
  High:     3,
  Medium:   2,
  Low:      1,
};

/**
 * Priority score formula (as specified):
 *   priorityScore = severityWeight * 10 + minutesSinceTriggered + (repeatCount * 5)
 *
 * `referenceMinutes` is the latest alert time in the dataset (not wall clock),
 * so relative ages stay meaningful regardless of when the page is viewed.
 */
export function computePriorityScore(
  alert: BaseAlert,
  repeatCount: number,
  referenceMinutes: number,
): number {
  const severityPart  = SEVERITY_WEIGHT[alert.severity] * 10;
  const agePart       = Math.max(0, referenceMinutes - parseTimeToMinutes(alert.time));
  const repeatPart    = repeatCount * 5;
  return Math.round(severityPart + agePart + repeatPart);
}

/* ─── Time helpers ───────────────────────────────────────────────────────── */

/** "HH:mm:ss" → total minutes since midnight */
export function parseTimeToMinutes(timeStr: string): number {
  const [h = 0, m = 0, s = 0] = timeStr.split(':').map(Number);
  return h * 60 + m + s / 60;
}

/* ─── Repeat detection ───────────────────────────────────────────────────── */

/**
 * Groups alerts by (vehicle, alertType).
 * Within each group, alerts whose times fall within `windowMinutes` of the
 * most-recent alert in that group are considered repeats.
 *
 * Returns the most-recent alert per group as the representative, enriched with:
 *   - repeatCount  : total occurrences in the window
 *   - isRecurring  : repeatCount > 1
 *   - groupedAlertIds : all alert IDs in the group (including the representative)
 *
 * Alerts outside the window are returned individually (repeatCount = 1).
 */
export function groupAndEnrichAlerts(
  alerts: BaseAlert[],
  windowMinutes = 60,
): EnrichedAlert[] {
  // Reference = latest time in the whole dataset (keeps scores stable)
  const referenceMinutes = Math.max(...alerts.map(a => parseTimeToMinutes(a.time)));

  // Build groups keyed by vehicle::type
  const groupMap = new Map<string, BaseAlert[]>();
  for (const alert of alerts) {
    const key = `${alert.vehicle}::${alert.type}`;
    const bucket = groupMap.get(key) ?? [];
    bucket.push(alert);
    groupMap.set(key, bucket);
  }

  const result: EnrichedAlert[] = [];

  for (const bucket of groupMap.values()) {
    // Sort newest → oldest within each group
    const sorted = [...bucket].sort(
      (a, b) => parseTimeToMinutes(b.time) - parseTimeToMinutes(a.time),
    );

    const latestMinutes = parseTimeToMinutes(sorted[0].time);

    // Partition: within window vs outside window
    const inWindow  = sorted.filter(a => latestMinutes - parseTimeToMinutes(a.time) <= windowMinutes);
    const outWindow = sorted.filter(a => latestMinutes - parseTimeToMinutes(a.time) >  windowMinutes);

    // The most-recent alert represents the whole in-window group
    const representative = inWindow[0];
    const repeatCount    = inWindow.length;

    result.push({
      ...representative,
      repeatCount,
      isRecurring:     repeatCount > 1,
      groupedAlertIds: inWindow.map(a => a.id),
      priorityScore:   computePriorityScore(representative, repeatCount, referenceMinutes),
    });

    // Alerts outside the window are standalone rows
    for (const alert of outWindow) {
      result.push({
        ...alert,
        repeatCount:     1,
        isRecurring:     false,
        groupedAlertIds: [alert.id],
        priorityScore:   computePriorityScore(alert, 1, referenceMinutes),
      });
    }
  }

  // Sort highest priority first
  return result.sort((a, b) => b.priorityScore - a.priorityScore);
}
