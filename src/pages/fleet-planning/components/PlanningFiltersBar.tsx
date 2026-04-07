import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

interface PlanningFiltersBarProps {
  selectedDate: string | null;
}

export function PlanningFiltersBar({ selectedDate }: PlanningFiltersBarProps) {
  const displayDate = selectedDate
    ? (() => {
        const [y, m, d] = selectedDate.split('-').map(Number);
        return `${MONTH_NAMES[m - 1]} ${d}, ${y}`;
      })()
    : 'No date selected';

  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-sm font-semibold text-slate-800 truncate">{displayDate}</span>
      <div className="flex items-center gap-1.5 shrink-0">
        <Select defaultValue="all-regions">
          <SelectTrigger size="sm" className="w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-regions">All Regions</SelectItem>
            <SelectItem value="north">North</SelectItem>
            <SelectItem value="south">South</SelectItem>
            <SelectItem value="east">East</SelectItem>
            <SelectItem value="west">West</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" aria-label="Filter settings">
          <SlidersHorizontal className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
