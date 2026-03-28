import React from 'react';
import { Camera, Play, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

interface CameraEvent {
  cam: string;
  event: string;
  severity: 'high' | 'medium' | 'low';
  pct: number;
}

interface DVRCameraEventTableProps {
  events: CameraEvent[];
  onJump: (pct: number) => void;
}

const SevPill = ({ s }: { s: 'high' | 'medium' | 'low' }) => {
  const styles = {
    high: 'bg-rose-500',
    medium: 'bg-amber-500',
    low: 'bg-blue-500',
  };
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn('h-1.5 w-1.5 rounded-full', styles[s])} />
      <span className="text-2xs font-semibold text-slate-500 uppercase tracking-tighter">{s}</span>
    </div>
  );
};

export const DVRCameraEventTable: React.FC<DVRCameraEventTableProps> = ({ events, onJump }) => {
  return (
    <div className="rounded-xl border border-white bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] overflow-hidden transition-all hover:shadow-md">
      <div className="p-2.5 border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="h-3.5 w-3.5 text-slate-400" />
          <h2 className={cn(typography.cardTitle, 'leading-none')}>Camera Alerts</h2>
        </div>
        <AlertCircle className="h-3 w-3 text-slate-200" />
      </div>

      <div className="max-h-[180px] overflow-y-auto scrollbar-thin">
        <table className="w-full text-left">
          <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
            <tr>
              <th className="px-3 py-1.5 text-2xs font-semibold text-slate-400 uppercase tracking-[0.08rem] leading-none">Cam</th>
              <th className="px-3 py-1.5 text-2xs font-semibold text-slate-400 uppercase tracking-[0.08rem] leading-none">Severity</th>
              <th className="px-3 py-1.5 text-2xs font-semibold text-slate-400 uppercase tracking-[0.08rem] leading-none text-right">Jump</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {events.map((ev, i) => (
              <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-3 py-1.5">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-700 uppercase tracking-tight leading-none">{ev.cam}</span>
                    <span className="text-2xs font-medium text-slate-400 leading-none mt-1 truncate max-w-[80px]">{ev.event}</span>
                  </div>
                </td>
                <td className="px-3 py-1.5">
                  <SevPill s={ev.severity} />
                </td>
                <td className="px-3 py-1.5 text-right">
                  <button
                    onClick={() => onJump(ev.pct)}
                    className="h-5.5 w-5.5 inline-flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-blue-100/50"
                  >
                    <Play className="h-2 w-2 ml-0.5 fill-current" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


