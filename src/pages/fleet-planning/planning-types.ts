/** Shared types for Fleet Planning — imported by both mock-data and conflict-detection */

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
