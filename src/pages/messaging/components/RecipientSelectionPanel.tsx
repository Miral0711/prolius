import { Users, User, FolderOpen } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface RecipientGroup {
  key: string;
  label: string;
  count: number;
  icon: React.ElementType;
}

const GROUPS: RecipientGroup[] = [
  { key: 'users',        label: 'Users',               count: 0, icon: User },
  { key: 'regionGroups', label: 'User region groups',  count: 0, icon: FolderOpen },
  { key: 'created',      label: 'Created groups',      count: 0, icon: Users },
];

interface RecipientSelectionPanelProps {
  selected: Record<string, boolean>;
  onToggle: (key: string) => void;
}

export function RecipientSelectionPanel({ selected, onToggle }: RecipientSelectionPanelProps) {
  return (
    <div className="flex flex-col divide-y divide-slate-100 overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
      {GROUPS.map(({ key, label, count, icon: Icon }) => (
        <label
          key={key}
          className={cn(
            'flex cursor-pointer items-center gap-3 px-3 py-2.5 transition-colors',
            selected[key] ? 'bg-[#e8f0f8]/60' : 'hover:bg-slate-50',
          )}
        >
          <Checkbox
            checked={!!selected[key]}
            onCheckedChange={() => onToggle(key)}
            size="sm"
            className="border-slate-300"
          />
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="text-2sm font-medium text-slate-700">{label}</span>
          </div>
          <span className="shrink-0 rounded-sm border border-slate-200 bg-[#f4f8fb] px-1.5 py-0.5 text-xs font-medium tabular-nums text-slate-500">
            {count}
          </span>
        </label>
      ))}
    </div>
  );
}
