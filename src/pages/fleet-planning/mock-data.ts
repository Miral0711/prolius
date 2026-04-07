export interface PlanningEvent {
  date: string; // YYYY-MM-DD
  count: number;
}

export interface PlanningCardRow {
  vehicleCode: string;
  description: string;
}

export interface PlanningCard {
  id: string;
  title: string;
  count: number;
  rows: PlanningCardRow[];
}

// Events per date (YYYY-MM-DD)
export const PLANNING_EVENTS: PlanningEvent[] = [
  { date: '2026-04-01', count: 2 },
  { date: '2026-04-03', count: 5 },
  { date: '2026-04-07', count: 3 },
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
      rows: [{ vehicleCode: 'BUS-0041', description: 'Hazardous goods cert renewal' }],
    },
    {
      id: 'laden-brake-3',
      title: 'Laden brake test',
      count: 3,
      rows: [
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
        { vehicleCode: 'BUS-0011', description: 'Preventive maintenance inspection' },
        { vehicleCode: 'BUS-0022', description: 'Engine oil & filter change' },
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
