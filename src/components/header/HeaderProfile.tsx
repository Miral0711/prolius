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
        'flex cursor-pointer items-center gap-2 rounded-lg border border-transparent py-0.5 pl-1 pr-1.5 transition-all duration-200 ease-in-out',
        'hover:bg-slate-100/60 hover:shadow-sm active:scale-[0.98]',
      )}
    >
      <div className="relative flex h-7 w-7 shrink-0 select-none">
        <img
          src={toAbsoluteUrl(avatarUrl)}
          alt={name}
          className="h-full w-full rounded-full border border-white object-cover shadow-sm ring-1 ring-slate-100"
        />
        {isOnline && (
          <span className="absolute -bottom-px -right-px z-10 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-white shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full border border-white bg-emerald-500 animate-pulse" />
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-col items-start justify-center gap-0 leading-tight tracking-tight">
        <span className="text-xs font-semibold leading-tight text-slate-800">
          {name}
        </span>
        <span className="text-2xs font-medium leading-tight text-slate-500/80">
          {role}
        </span>
      </div>

      <ChevronDown className="ml-0.5 h-3 w-3 shrink-0 text-slate-400 opacity-50" />
    </div>
  );
}


