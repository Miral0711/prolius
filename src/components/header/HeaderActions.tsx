import { useEffect, useRef, useState } from 'react';
import { Bell, Sun, Clock, Calendar, ChevronDown, LockKeyhole, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { IconActionButton } from './IconActionButton';

interface HeaderActionsProps {
  extraActions?: React.ReactNode;
  className?: string;
}

/* ── live clock ── */
function useLiveClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/* ── divider ── */
const Divider = () => <div className="h-5 w-px bg-slate-200/70 mx-1.5" />;

/* ── widget label ── */
const widgetClass = 'flex items-center gap-1.5 text-xs font-medium text-slate-600';
const iconClass = 'h-3.5 w-3.5 text-slate-400 shrink-0';

/* ── user dropdown ── */
function UserDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#3d6b8e] text-2xs font-semibold text-white shrink-0 select-none">
          S
        </span>
        System
        <ChevronDown className={cn('h-3 w-3 text-slate-400 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 z-50 min-w-[180px] rounded-lg border border-[#d4e0ea] bg-white py-1.5 shadow-[0_8px_24px_rgba(61,107,142,0.12)]">
          <Link
            to="/change-password"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-[#f4f8fb] transition-colors"
          >
            <LockKeyhole className="h-4 w-4 text-slate-400" />
            Change password
          </Link>
          <div className="my-1 border-t border-[#eef4f8]" />
          <Link
            to="/logout"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-[#f4f8fb] transition-colors"
          >
            <LogOut className="h-4 w-4 text-slate-400" />
            Log out
          </Link>
        </div>
      )}
    </div>
  );
}

/* ── main component ── */
export function HeaderActions({ extraActions, className }: HeaderActionsProps) {
  const now = useLiveClock();

  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const dateStr = `${DAY_NAMES[now.getDay()]} ${pad(now.getDate())} ${MONTH_NAMES[now.getMonth()]} ${now.getFullYear()}`;

  return (
    <div className={cn('flex h-full min-h-0 items-center gap-0', className)}>
      {extraActions && (
        <>
          <div className="mr-2 flex items-center gap-1.5">{extraActions}</div>
          <Divider />
        </>
      )}

      {/* Icon buttons */}
      <div className="flex items-center gap-x-0.5">
        <IconActionButton icon={Bell} badge={8} aria-label="Notifications" />
      </div>

      <Divider />

      {/* User dropdown */}
      <UserDropdown />

      <Divider />

      {/* Temperature */}
      <div className={widgetClass}>
        <Sun className={iconClass} />
        <span>19°C</span>
      </div>

      <Divider />

      {/* Clock */}
      <div className={widgetClass}>
        <Clock className={iconClass} />
        <span className="tabular-nums">{timeStr}</span>
      </div>

      <Divider />

      {/* Date */}
      <div className={widgetClass}>
        <Calendar className={iconClass} />
        <span>{dateStr}</span>
      </div>


    </div>
  );
}
