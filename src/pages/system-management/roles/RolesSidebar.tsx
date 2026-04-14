import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RoleListItem } from './RoleListItem';
import type { Role } from './types';

interface RolesSidebarProps {
  roles: Role[];
  activeRoleId: string;
  onSelectRole: (id: string) => void;
  onCreateRole: () => void;
}

type FilterType = 'all' | 'system' | 'custom';

export function RolesSidebar({ roles, activeRoleId, onSelectRole, onCreateRole }: RolesSidebarProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = roles.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || r.type === filter;
    return matchesSearch && matchesFilter;
  });

  const filterBtnClass = (f: FilterType) =>
    cn(
      'rounded px-2 py-0.5 text-[11px] font-medium transition-colors',
      filter === f
        ? 'bg-[#3d6b8e] text-white'
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700',
    );

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-md border border-[#d4e0ea] bg-white shadow-sm">
      {/* Header */}
      <div className="shrink-0 border-b border-[#d4e0ea] px-3 py-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-[0.06em] text-slate-700">Roles</h3>
          <button
            type="button"
            onClick={onCreateRole}
            className="inline-flex h-6 items-center gap-1 rounded border border-emerald-200 bg-emerald-50 px-2 text-[11px] font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
          >
            <Plus className="h-3 w-3" />
            New
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="shrink-0 border-b border-[#d4e0ea] px-3 py-2">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search roles…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-7 w-full rounded border border-[#c8d8e4] bg-[#f4f8fb] pl-6 pr-2 text-xs text-slate-700 placeholder:text-slate-400 focus:border-[#3d6b8e] focus:outline-none focus:ring-2 focus:ring-[#3d6b8e]/10"
          />
        </div>
        {/* Filter pills */}
        <div className="mt-1.5 flex gap-1">
          <button type="button" className={filterBtnClass('all')} onClick={() => setFilter('all')}>All</button>
          <button type="button" className={filterBtnClass('system')} onClick={() => setFilter('system')}>System</button>
          <button type="button" className={filterBtnClass('custom')} onClick={() => setFilter('custom')}>Custom</button>
        </div>
      </div>

      {/* Role list */}
      <div className="min-h-0 flex-1 overflow-y-auto p-1.5">
        {filtered.length === 0 ? (
          <p className="py-6 text-center text-xs text-slate-400">No roles found.</p>
        ) : (
          <div className="flex flex-col gap-0.5">
            {filtered.map((role) => (
              <RoleListItem
                key={role.id}
                role={role}
                isActive={role.id === activeRoleId}
                onClick={() => onSelectRole(role.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer count */}
      <div className="shrink-0 border-t border-[#d4e0ea] px-3 py-1.5">
        <span className="text-[11px] text-slate-400">
          {filtered.length} of {roles.length} roles
        </span>
      </div>
    </div>
  );
}
