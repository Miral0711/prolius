import React from 'react';
import { AlertTriangle, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventLogItem {
  time: string;
  type: string;
  cam: string;
  severity: 'high' | 'medium' | 'low';
  pct: number;
  icon: LucideIcon;
  ic: string;
}

interface DVREventLogCardProps {
  events: EventLogItem[];
  selectedEventIndex: number | null;
  onEventSelect: (index: number) => void;
  className?: string;
}

const SevBadge = ({ s }: { s: 'high' | 'medium' | 'low' }) => {
  const styles = {
    high: 'bg-rose-50 text-rose-600 border-rose-100',
    medium: 'bg-amber-50 text-amber-600 border-amber-100',
    low: 'bg-slate-50 text-slate-500 border-slate-200',
  };
  return (
    <span className={cn(
      'rounded-md px-1.5 py-0 text-[8.5px] font-semibold uppercase tracking-wider border shadow-sm inline-block leading-normal',
      styles[s]
    )}>
      {s}
    </span>
  );
};

export const DVREventLogCard: React.FC<DVREventLogCardProps> = ({
  events,
  selectedEventIndex,
  onEventSelect,
  className,
}) => {
  return (
    <div className={cn(
      "rounded-xl border border-white bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] flex flex-col min-h-0 transition-all overflow-hidden",
      className
    )}>
      <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-rose-50">
            <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
          </div>
          <h2 className="text-[10px] font-semibold text-slate-800 uppercase tracking-widest leading-none">Incident Detailed Log</h2>
        </div>
        <span className="text-[9px] font-medium text-slate-400 uppercase tracking-tighter">Total: {events.length}</span>
      </div>

      <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-200 min-h-[260px]">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-slate-100 shadow-sm">
            <tr>
              <th className="px-4 py-2 text-[9px] font-semibold text-slate-400 uppercase tracking-widest leading-none">Time</th>
              <th className="px-4 py-2 text-[9px] font-semibold text-slate-400 uppercase tracking-widest leading-none">Event Description</th>
              <th className="px-4 py-2 text-[9px] font-semibold text-slate-400 uppercase tracking-widest leading-none">Cam</th>
              <th className="px-4 py-2 text-[9px] font-semibold text-slate-400 uppercase tracking-widest leading-none">Severity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {events.map((ev, i) => {
              const Icon = ev.icon;
              const isSelected = selectedEventIndex === i;
              return (
                <tr
                  key={i}
                  className={cn(
                    'group cursor-pointer transition-all duration-200 hover:bg-slate-50/80',
                    isSelected ? 'bg-blue-50/80' : ''
                  )}
                  onClick={() => onEventSelect(i)}
                >
                  <td className="px-4 py-2.5">
                    <span className="text-[10px] font-mono font-semibold text-slate-600 group-hover:text-blue-600 transition-colors">{ev.time}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className={cn('p-1 rounded-lg transition-all group-hover:scale-110', isSelected ? 'bg-white shadow-sm' : 'bg-slate-50')}>
                        <Icon className={cn('h-3 w-3', ev.ic)} />
                      </div>
                      <span className="text-[10px] font-medium text-slate-700 truncate max-w-[140px]">{ev.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight">{ev.cam}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <SevBadge s={ev.severity} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {events.length === 0 && (
          <div className="p-8 flex flex-col items-center justify-center gap-2 opacity-50">
            <AlertTriangle className="h-6 w-6 text-slate-300" />
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">No recordings</p>
          </div>
        )}
      </div>
    </div>
  );
};
