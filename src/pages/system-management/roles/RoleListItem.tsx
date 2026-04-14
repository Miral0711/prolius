import { cn } from '@/lib/utils';
import { Users } from 'lucide-react';
import type { Role } from './types';

interface RoleListItemProps {
  role: Role;
  isActive: boolean;
  onClick: () => void;
}

export function RoleListItem({ role, isActive, onClick }: RoleListItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full rounded-md px-3 py-2.5 text-left transition-colors',
        isActive
          ? 'bg-[#eef4f8] ring-1 ring-[#3d6b8e]/20'
          : 'hover:bg-slate-50',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                'truncate text-xs font-semibold',
                isActive ? 'text-[#2e5270]' : 'text-slate-800',
              )}
            >
              {role.name}
            </span>
            <span
              className={cn(
                'shrink-0 rounded-sm border px-1 py-0 text-[9px] font-semibold uppercase tracking-wide',
                role.type === 'system'
                  ? 'border-[#c8d8e4] bg-[#eef4f8] text-[#3d6b8e]'
                  : 'border-violet-200 bg-violet-50 text-violet-700',
              )}
            >
              {role.type}
            </span>
            {role.status === 'disabled' && (
              <span className="shrink-0 rounded-sm border border-slate-200 bg-slate-50 px-1 py-0 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                Off
              </span>
            )}
          </div>
          <p className="mt-0.5 truncate text-[11px] leading-tight text-slate-500">
            {role.description}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-0.5 text-[11px] text-slate-400">
          <Users className="h-3 w-3" />
          <span className="tabular-nums">{role.userCount}</span>
        </div>
      </div>
    </button>
  );
}
