import { CalendarX } from 'lucide-react';
import { PlanningEventCard } from './PlanningEventCard';
import { detectCalendarConflicts } from '../conflict-detection';
import type { PlanningCard } from '../mock-data';

interface PlanningEventListProps {
  cards: PlanningCard[];
}

export function PlanningEventList({ cards }: PlanningEventListProps) {
  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
        <CalendarX className="size-8 text-slate-300" />
        <p className="text-sm text-slate-400">No planning events for this date</p>
      </div>
    );
  }

  const conflictVehicles = detectCalendarConflicts(cards);

  return (
    <div className="flex flex-col gap-2.5">
      {cards.map((card) => (
        <PlanningEventCard key={card.id} card={card} conflictVehicles={conflictVehicles} />
      ))}
    </div>
  );
}
