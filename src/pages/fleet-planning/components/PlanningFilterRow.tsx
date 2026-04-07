import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterDef {
  key: string;
  placeholder: string;
  options: { value: string; label: string }[];
}

interface PlanningFilterRowProps {
  filters: FilterDef[];
  values: Record<string, string>;
  search: string;
  onFilterChange: (key: string, value: string) => void;
  onSearchChange: (v: string) => void;
  onSearch: () => void;
  onClear: () => void;
  rightActions?: React.ReactNode;
}

export function PlanningFilterRow({
  filters,
  values,
  search,
  onFilterChange,
  onSearchChange,
  onSearch,
  onClear,
  rightActions,
}: PlanningFilterRowProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <Select
            key={f.key}
            value={values[f.key] ?? 'all'}
            onValueChange={(v) => onFilterChange(f.key, v)}
          >
            <SelectTrigger size="sm" className="w-[150px]">
              <SelectValue placeholder={f.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {f.options.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 pointer-events-none" />
          <Input
            variant="sm"
            className="pl-8 w-[180px]"
            placeholder="Search..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          />
        </div>
        <Button size="sm" variant="primary" onClick={onSearch}>
          Search
        </Button>
        <Button size="sm" variant="outline" onClick={onClear}>
          <X className="size-3.5" />
          Clear
        </Button>
      </div>
      {rightActions && (
        <div className="flex items-center gap-1.5">{rightActions}</div>
      )}
    </div>
  );
}
