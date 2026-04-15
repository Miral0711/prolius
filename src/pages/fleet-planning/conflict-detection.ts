/**
 * Conflict detection for Fleet Planning.
 *
 * A "conflict" occurs when the same vehicle/asset has two or more scheduled
 * events on the exact same date — e.g. an Annual Service AND a Collection on
 * the same day, or a Maintenance + PMI on the same day.
 */

import type { VehicleRow, AssetRow, InspectionDate } from './planning-table-data';
import type { PlanningCard } from './planning-types';

// ─── Vehicle row conflicts ────────────────────────────────────────────────────

const VEHICLE_EVENT_KEYS: (keyof VehicleRow)[] = [
  'adrTest',
  'annualService',
  'cambelChange',
  'collection',
  'pmi',
  'brakeTest',
];

const ASSET_EVENT_KEYS: (keyof AssetRow)[] = [
  'adrTest',
  'annualService',
  'corrosionInspection',
  'electricalInspection',
  'ladenBrakeTest',
  'lolerTest',
];

/** Parse a display date like "15/06/2026" → "2026-06-15" for comparison. */
function normaliseDate(display: string): string {
  if (!display) return '';
  // Already ISO
  if (/^\d{4}-\d{2}-\d{2}$/.test(display)) return display;
  // DD/MM/YYYY
  const parts = display.split('/');
  if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
  return display;
}

function getDateValue(row: VehicleRow | AssetRow, key: string): string {
  const cell = (row as Record<string, unknown>)[key] as InspectionDate | undefined;
  return cell?.value ? normaliseDate(cell.value) : '';
}

export interface ConflictInfo {
  /** ISO dates that have more than one event scheduled */
  conflictDates: string[];
  /** Human-readable list of conflicting event pairs */
  conflictPairs: Array<{ date: string; events: string[] }>;
}

function detectRowConflicts(
  row: VehicleRow | AssetRow,
  keys: string[],
): ConflictInfo {
  // Group event keys by their normalised date
  const byDate: Record<string, string[]> = {};
  for (const key of keys) {
    const date = getDateValue(row, key);
    if (!date) continue;
    if (!byDate[date]) byDate[date] = [];
    byDate[date].push(key);
  }

  const conflictDates: string[] = [];
  const conflictPairs: Array<{ date: string; events: string[] }> = [];

  for (const [date, events] of Object.entries(byDate)) {
    if (events.length > 1) {
      conflictDates.push(date);
      conflictPairs.push({ date, events });
    }
  }

  return { conflictDates, conflictPairs };
}

export function detectVehicleConflicts(row: VehicleRow): ConflictInfo {
  return detectRowConflicts(row, VEHICLE_EVENT_KEYS as string[]);
}

export function detectAssetConflicts(row: AssetRow): ConflictInfo {
  return detectRowConflicts(row, ASSET_EVENT_KEYS as string[]);
}

export function hasVehicleConflict(row: VehicleRow): boolean {
  return detectVehicleConflicts(row).conflictDates.length > 0;
}

export function hasAssetConflict(row: AssetRow): boolean {
  return detectAssetConflicts(row).conflictDates.length > 0;
}

// ─── Calendar card conflicts ──────────────────────────────────────────────────

/**
 * Within a list of PlanningCards for a single date, detect vehicles that
 * appear in more than one card (i.e. scheduled for multiple event types on
 * the same day).
 *
 * Returns a Set of vehicleCodes that are conflicting.
 */
export function detectCalendarConflicts(cards: PlanningCard[]): Set<string> {
  const seen: Record<string, number> = {};
  for (const card of cards) {
    for (const row of card.rows) {
      seen[row.vehicleCode] = (seen[row.vehicleCode] ?? 0) + 1;
    }
  }
  return new Set(Object.entries(seen).filter(([, n]) => n > 1).map(([v]) => v));
}

/**
 * Returns true if any vehicle in this card appears in another card on the
 * same day (i.e. the card contains at least one conflicting vehicle).
 */
export function cardHasConflict(card: PlanningCard, conflictVehicles: Set<string>): boolean {
  return card.rows.some((r) => conflictVehicles.has(r.vehicleCode));
}
