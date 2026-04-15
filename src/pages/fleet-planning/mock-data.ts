import { VEHICLE_ROWS, ASSET_ROWS } from './planning-table-data';
import { detectVehicleConflicts, detectAssetConflicts } from './conflict-detection';
export type { PlanningEvent, PlanningCardRow, PlanningCard } from './planning-types';
import type { PlanningCard } from './planning-types';

// Events per date (YYYY-MM-DD)
export const PLANNING_EVENTS: PlanningEvent[] = [
  { date: '2026-04-01', count: 2 },
  { date: '2026-04-03', count: 5 },
  { date: '2026-04-07', count: 6 }, // 6 cards on Apr 7 (ADR, 2× laden brake, wheel, PMI, PTO)
  { date: '2026-04-08', count: 1 },
  { date: '2026-04-10', count: 4 },
  { date: '2026-04-14', count: 6 },
  { date: '2026-04-15', count: 2 },
  { date: '2026-04-17', count: 3 },
  { date: '2026-04-21', count: 1 },
  { date: '2026-04-22', count: 5 },
  { date: '2026-04-24', count: 2 },
  { date: '2026-04-28', count: 4 },
];

// Cards per date
const CARDS_BY_DATE: Record<string, PlanningCard[]> = {
  '2026-04-07': [
    {
      id: 'adr',
      title: 'ADR',
      count: 1,
      // BUS-0041 also appears in PMI below → conflict
      rows: [{ vehicleCode: 'BUS-0041', description: 'Hazardous goods cert renewal' }],
    },
    {
      id: 'laden-brake-3',
      title: 'Laden brake test',
      count: 3,
      rows: [
        // BUS-0112 also appears in PMI below → conflict
        { vehicleCode: 'BUS-0112', description: 'Rear axle brake check' },
        { vehicleCode: 'BUS-0198', description: 'Full laden brake inspection' },
        { vehicleCode: 'BUS-0204', description: 'Brake pad replacement' },
      ],
    },
    {
      id: 'laden-brake-6',
      title: 'Laden brake test',
      count: 6,
      rows: [
        { vehicleCode: 'BUS-0301', description: 'Brake fluid flush' },
        { vehicleCode: 'BUS-0302', description: 'Caliper inspection' },
        { vehicleCode: 'BUS-0303', description: 'Drum brake service' },
        { vehicleCode: 'BUS-0304', description: 'ABS sensor check' },
        { vehicleCode: 'BUS-0305', description: 'Handbrake adjustment' },
        { vehicleCode: 'BUS-0306', description: 'Brake disc measurement' },
      ],
    },
    {
      id: 'wheel-service',
      title: 'Major wheel service',
      count: 1,
      rows: [{ vehicleCode: 'BUS-0077', description: 'Full wheel alignment & balance' }],
    },
    {
      id: 'pmi',
      title: 'PMI',
      count: 5,
      rows: [
        // BUS-0041 also in ADR above → conflict
        { vehicleCode: 'BUS-0041', description: 'Preventive maintenance inspection' },
        // BUS-0112 also in laden-brake-3 above → conflict
        { vehicleCode: 'BUS-0112', description: 'Engine oil & filter change' },
        { vehicleCode: 'BUS-0033', description: 'Air filter replacement' },
        { vehicleCode: 'BUS-0044', description: 'Coolant level check' },
        { vehicleCode: 'BUS-0055', description: 'Battery terminal inspection' },
      ],
    },
    {
      id: 'pto-service',
      title: 'PTO service',
      count: 1,
      rows: [{ vehicleCode: 'BUS-0088', description: 'Power take-off unit service' }],
    },
  ],
};

const DEFAULT_CARDS: PlanningCard[] = [
  {
    id: 'pmi-default',
    title: 'PMI',
    count: 2,
    rows: [
      { vehicleCode: 'BUS-0011', description: 'Preventive maintenance inspection' },
      { vehicleCode: 'BUS-0022', description: 'Engine oil & filter change' },
    ],
  },
  {
    id: 'wheel-default',
    title: 'Major wheel service',
    count: 1,
    rows: [{ vehicleCode: 'BUS-0077', description: 'Full wheel alignment & balance' }],
  },
];

export function getCardsForDate(dateStr: string): PlanningCard[] {
  return CARDS_BY_DATE[dateStr] ?? DEFAULT_CARDS;
}

export function getEventCountForDate(dateStr: string): number {
  return PLANNING_EVENTS.find((e) => e.date === dateStr)?.count ?? 0;
}

/**
 * Returns true if the cards for a given date contain any vehicle that appears
 * in more than one card (i.e. a scheduling conflict exists on that date),
 * OR if any vehicle/asset row in the planning tables has multiple events on
 * that date.
 */
export function dateHasConflict(dateStr: string): boolean {
  // 1. Check calendar cards (vehicles appearing in multiple cards on same day)
  const cards = getCardsForDate(dateStr);
  const seen: Record<string, number> = {};
  for (const card of cards) {
    for (const row of card.rows) {
      seen[row.vehicleCode] = (seen[row.vehicleCode] ?? 0) + 1;
      if (seen[row.vehicleCode] > 1) return true;
    }
  }

  // 2. Check vehicle planning table rows (same-day events like BUS-0112 on 18/05/2026)
  for (const vRow of VEHICLE_ROWS) {
    const info = detectVehicleConflicts(vRow);
    if (info.conflictDates.includes(dateStr)) return true;
  }

  // 3. Check asset planning table rows
  for (const aRow of ASSET_ROWS) {
    const info = detectAssetConflicts(aRow);
    if (info.conflictDates.includes(dateStr)) return true;
  }

  return false;
}
