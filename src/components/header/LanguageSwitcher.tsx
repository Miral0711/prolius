import { toAbsoluteUrl } from '@/lib/helpers';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center gap-1.5 rounded-lg px-2 py-1 transition-all duration-200 ease-in-out",
        "hover:bg-slate-100/60 bg-transparent",
        "active:scale-95"
      )}
    >
      <div className="flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200/50 shadow-sm">
        <img
          src={toAbsoluteUrl('/media/flags/united-kingdom.svg')}
          alt="English"
          className="h-full w-full object-cover"
        />
      </div>
      <span className="text-[12px] font-medium text-slate-700 leading-none">EN</span>
      <ChevronDown className="h-3 w-3 text-slate-400 opacity-60" />
    </button>
  );
}
