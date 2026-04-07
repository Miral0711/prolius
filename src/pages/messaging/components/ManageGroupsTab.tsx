import { useState } from 'react';
import { Search, Users, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface Group {
  id: number;
  name: string;
  memberCount: number;
}

const MOCK_GROUPS: Group[] = [
  { id: 1, name: 'Riyadh Drivers',        memberCount: 24 },
  { id: 2, name: 'Jeddah Operations',     memberCount: 18 },
  { id: 3, name: 'Eastern Province Team', memberCount: 11 },
  { id: 4, name: 'Night Shift Crew',      memberCount: 32 },
  { id: 5, name: 'Workshop Staff',        memberCount: 9  },
];

interface FormState {
  groupName: string;
  recipientSearch: string;
  usersSelected: boolean;
}

const EMPTY: FormState = { groupName: '', recipientSearch: '', usersSelected: false };

export function ManageGroupsTab() {
  const [groups, setGroups] = useState<Group[]>(MOCK_GROUPS);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);

  const set = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleAdd = () => {
    if (!form.groupName.trim()) return;
    const next: Group = { id: Date.now(), name: form.groupName.trim(), memberCount: 0 };
    setGroups((g) => [...g, next]);
    setForm(EMPTY);
  };

  const handleClear = () => {
    setForm(EMPTY);
    setSelectedGroupId(null);
  };

  const handleSelectGroup = (g: Group) => {
    setSelectedGroupId(g.id);
    setForm((f) => ({ ...f, groupName: g.name }));
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Instruction */}
      <p className="text-xs text-slate-500">
        Create a new group or choose an existing group to view/edit. Division groups are automatically created and available to select when sending a message.
      </p>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.4fr]">
        {/* ── LEFT: Created groups list ── */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-slate-600">Created groups</span>

          {groups.length === 0 ? (
            <div className="flex items-center justify-center rounded-md border border-dashed border-slate-200 bg-white py-8 text-xs text-slate-400">
              No groups created yet
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-slate-100 overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
              {groups.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => handleSelectGroup(g)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 text-left transition-colors',
                    selectedGroupId === g.id
                      ? 'bg-[#f0f4f8]'
                      : 'hover:bg-slate-50',
                  )}
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-[#f4f8fb]">
                    <Users className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className={cn(
                      'truncate text-2sm font-medium',
                      selectedGroupId === g.id ? 'text-[#2e5f8a]' : 'text-slate-800',
                    )}>
                      {g.name}
                    </span>
                    <span className="text-xs text-slate-400">{g.memberCount} member{g.memberCount !== 1 ? 's' : ''}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: Form ── */}
        <div className="flex flex-col gap-3">
          {/* Group name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">
              Group name <span className="text-rose-500">*</span>
            </label>
            <Input
              placeholder="Enter new group name"
              value={form.groupName}
              onChange={(e) => set('groupName', e.target.value)}
              className="h-8 border-slate-200 bg-white text-2sm shadow-none placeholder:font-normal placeholder:text-slate-300"
            />
          </div>

          {/* Select recipients */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">Select recipients</label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="User search"
                value={form.recipientSearch}
                onChange={(e) => set('recipientSearch', e.target.value)}
                className="h-8 border-slate-200 bg-white pl-8 pr-8 text-2sm shadow-none placeholder:font-normal placeholder:text-slate-300"
              />
              {form.recipientSearch && (
                <button
                  type="button"
                  onClick={() => set('recipientSearch', '')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Users row */}
          <label className={cn(
            'flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2.5 transition-colors',
            form.usersSelected ? 'border-[#d0e2f0] bg-[#e8f0f8]/60' : 'border-slate-200 bg-white hover:bg-slate-50',
          )}>
            <Checkbox
              checked={form.usersSelected}
              onCheckedChange={(v) => set('usersSelected', Boolean(v))}
              size="sm"
              className="border-slate-300"
            />
            <span className="flex-1 text-2sm font-medium text-slate-700">Users</span>
            <span className="shrink-0 rounded-sm border border-slate-200 bg-[#f4f8fb] px-1.5 py-0.5 text-xs font-medium tabular-nums text-slate-500">0</span>
          </label>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleAdd}
              disabled={!form.groupName.trim()}
              className="px-6"
            >
              {selectedGroupId ? 'Update' : 'Add'}
            </Button>
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-5 text-2sm font-medium text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
