import { cn } from '@/lib/utils';

type ChipId = 'all-contracts' | 'all-types' | 'all-events';

interface Chip {
  id: ChipId;
  label: string;
}

const CHIPS: Chip[] = [
  { id: 'all-contracts', label: 'All contracts' },
  { id: 'all-types', label: 'All types' },
  { id: 'all-events', label: 'All events' },
];

interface PlanningFilterChipsProps {
  active: ChipId;
  onChange: (id: ChipId) => void;
}

export function PlanningFilterChips({ active, onChange }: PlanningFilterChipsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {CHIPS.map((chip) => {
        const isActive = chip.id === active;
        return (
          <button
            key={chip.id}
            onClick={() => onChange(chip.id)}
            className={cn(
              'rounded-md border px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              isActive
                ? 'border-[#d0e2f0] bg-[#e8f0f8] text-[#2e5f8a]'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
            )}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
