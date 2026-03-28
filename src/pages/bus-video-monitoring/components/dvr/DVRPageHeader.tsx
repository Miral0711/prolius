import React from 'react';
import { Video } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';
import { typography } from '@/lib/typography';

interface DVRPageHeaderProps {
  vehicleName: string;
  date: string;
  isSystemOnline: boolean;
}

export const DVRPageHeader: React.FC<DVRPageHeaderProps> = ({
  vehicleName,
  date,
  isSystemOnline,
}) => {
  return (
    <header className="flex items-center justify-between shrink-0 mb-3">
      <div className="flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 shadow-sm ring-1 ring-white/20">
          <Video className="h-3.5 w-3.5 text-white" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className={typography.cardTitle}>DVR Control Hub</h1>
            <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-2xs font-medium uppercase text-indigo-600 tracking-[0.04rem] border border-indigo-100/50">
              Analysis Mode
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col items-end leading-none">
              <span className="text-xs font-semibold text-slate-800 tracking-tight">{vehicleName}</span>
              <span className="text-2xs font-medium text-slate-400 uppercase tracking-tighter mt-0.5">Vehicle Unit</span>
            </div>
            <div className="h-5 w-px bg-slate-200/60" />
            <div className="flex flex-col items-end leading-none">
              <span className="text-xs font-medium text-slate-600">{date}</span>
              <span className="text-2xs font-medium text-slate-400 uppercase tracking-tighter mt-0.5">Selected Date</span>
            </div>
          </div>
        </div>
        
        <StatusBadge
          status={isSystemOnline ? 'online' : 'offline'}
          className="shadow-sm hover:border-slate-300 bg-white"
        />
      </div>
    </header>
  );
};


