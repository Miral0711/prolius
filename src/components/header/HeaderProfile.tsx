import { toAbsoluteUrl } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface HeaderProfileProps {
  name?: string;
  role?: string;
  avatarUrl?: string;
  isOnline?: boolean;
}

export function HeaderProfile({
  name = 'Ahmed Mansour',
  role = 'Administrator',
  avatarUrl = '/media/avatars/300-2.png',
  isOnline = true,
}: HeaderProfileProps) {
  return (
    <div
      role="button"
      className={cn(
        "flex cursor-pointer items-center gap-2.5 rounded-lg pl-1.5 pr-2 py-1 transition-all duration-200 ease-in-out",
        "hover:bg-slate-100/60 active:scale-[0.98]",
        "border border-transparent hover:shadow-sm"
      )}
    >
      <div className="relative flex h-8 w-8 shrink-0 select-none">
        <img
          src={toAbsoluteUrl(avatarUrl)}
          alt={name}
          className="h-full w-full rounded-full border border-white object-cover shadow-sm ring-1 ring-slate-100"
        />
        {isOnline && (
          <span className="absolute -bottom-0.5 -right-0.5 z-10 flex h-3 w-3 items-center justify-center rounded-full bg-white shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse border border-white" />
          </span>
        )}
      </div>

      <div className="flex flex-col items-start justify-center gap-0 tracking-tight leading-tight">
        <span className="text-[13px] font-semibold text-slate-800 leading-tight">
          {name}
        </span>
        <span className="text-[10px] font-semibold text-slate-500/70 leading-tight">
          {role}
        </span>
      </div>

      <ChevronDown className="ml-1 h-3 w-3 text-slate-400 opacity-50" />
    </div>
  );
}
