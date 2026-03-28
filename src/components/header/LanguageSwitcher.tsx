import { toAbsoluteUrl } from '@/lib/helpers';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  return (
    <button
      type="button"
      className={cn(
        'flex items-center gap-1.5 rounded-lg px-1.5 py-0.5 transition-all duration-200 ease-in-out',
        'bg-transparent hover:bg-slate-100/60',
        'active:scale-95',
      )}
    >
      <div className="flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200/50 shadow-sm">
        <img
          src={toAbsoluteUrl('/media/flags/united-kingdom.svg')}
          alt="English"
          className="h-full w-full object-cover"
        />
      </div>
      <span className="text-xs font-medium leading-none text-slate-700">EN</span>
      <ChevronDown className="h-3 w-3 text-slate-400 opacity-60" />
    </button>
  );
}


