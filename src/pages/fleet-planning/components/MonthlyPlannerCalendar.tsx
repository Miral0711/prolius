import { cn } from '@/lib/utils';
import { getEventCountForDate, dateHasConflict } from '../mock-data';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function toDateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

interface MonthlyPlannerCalendarProps {
  year: number;
  month: number; // 0-indexed
  selectedDate: string | null; // YYYY-MM-DD
  onSelectDate: (date: string) => void;
}

export function MonthlyPlannerCalendar({
  year,
  month,
  selectedDate,
  onSelectDate,
}: MonthlyPlannerCalendarProps) {
  const today = new Date();
  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Build grid cells: 6 rows × 7 cols = 42 cells
  const cells: { day: number; currentMonth: boolean; dateStr: string }[] = [];

  // Leading days from prev month
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    cells.push({ day: d, currentMonth: false, dateStr: toDateStr(prevYear, prevMonth, d) });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, currentMonth: true, dateStr: toDateStr(year, month, d) });
  }

  // Trailing days from next month
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    cells.push({ day: d, currentMonth: false, dateStr: toDateStr(nextYear, nextMonth, d) });
  }

  return (
    <div className="flex flex-col gap-0">
      {/* Weekday header */}
      <div className="grid grid-cols-7 border-b border-slate-300">
        {WEEKDAYS.map((wd) => (
          <div
            key={wd}
            className="py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-400"
          >
            {wd}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {cells.map((cell, idx) => {
          const isToday = cell.dateStr === todayStr && cell.currentMonth;
          const isSelected = cell.dateStr === selectedDate && cell.currentMonth;
          const eventCount = cell.currentMonth ? getEventCountForDate(cell.dateStr) : 0;
          const hasConflict = cell.currentMonth ? dateHasConflict(cell.dateStr) : false;
          const isWeekend = idx % 7 === 0 || idx % 7 === 6;

          return (
            <button
              key={idx}
              onClick={() => cell.currentMonth && onSelectDate(cell.dateStr)}
              disabled={!cell.currentMonth}
              className={cn(
                'group relative flex min-h-[72px] flex-col items-start gap-0.5 border-b border-r border-slate-300 p-1.5 text-left transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
                cell.currentMonth
                  ? 'cursor-pointer hover:bg-slate-50'
                  : 'cursor-default',
                isWeekend && cell.currentMonth && 'bg-[#f4f8fb]/50',
                isSelected && 'bg-[#e8f0f8] hover:bg-[#e8f0f8]',
                !cell.currentMonth && 'opacity-35',
              )}
            >
              {/* Day number */}
              <span
                className={cn(
                  'flex size-6 items-center justify-center rounded-full text-xs font-medium',
                  isSelected ? 'bg-[#2e5f8a] text-white' : 'text-slate-700',
                )}
              >
                {cell.day}
              </span>

              {/* Event count badge */}
              {eventCount > 0 && (
                <span className="mt-0.5 rounded px-1 py-px text-[10px] font-medium leading-tight bg-[#e8f0f8] text-[#2e5f8a] border border-[#dcedf8]">
                  {eventCount} event{eventCount > 1 ? 's' : ''}
                </span>
              )}
              {/* Conflict indicator */}
              {hasConflict && (
                <span className="mt-0.5 rounded px-1.5 py-px text-[10px] font-bold leading-tight bg-red-500 text-white">
                  ⚠ conflict
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
