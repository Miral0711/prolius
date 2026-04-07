import React from 'react';
import { ShieldCheck, Activity, Zap, HardDrive, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

interface DVRSurveillanceHealthCardProps {
  className?: string;
}

export const DVRSurveillanceHealthCard: React.FC<DVRSurveillanceHealthCardProps> = ({ className }) => {
  const healthItems = [
    { 
      label: 'Stream Stability', 
      value: '98.2%', 
      status: 'healthy', 
      icon: Activity, 
      color: 'text-emerald-500', 
      bg: 'bg-emerald-50' 
    },
    { 
      label: 'Camera Synchronization', 
      value: '4/4 Active', 
      status: 'healthy', 
      icon: Zap, 
      color: 'text-[#2e5f8a]', 
      bg: 'bg-[#e8f0f8]' 
    },
    { 
      label: 'Last DVR Upload', 
      value: '2 min ago', 
      status: 'healthy', 
      icon: RefreshCw, 
      color: 'text-violet-500', 
      bg: 'bg-violet-50' 
    },
    { 
      label: 'Storage Buffer', 
      value: '78% Used', 
      status: 'warning', 
      icon: HardDrive, 
      color: 'text-amber-500', 
      bg: 'bg-amber-50' 
    },
  ];

  return (
    <div className={cn(
      "rounded-xl border border-white bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] p-2.5 flex flex-col gap-2 transition-all hover:shadow-md",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-100/50">
            <ShieldCheck className="h-3 w-3 text-emerald-600" />
          </div>
          <h2 className={cn(typography.cardTitle, 'leading-none')}>Surveillance Health</h2>
        </div>
        <span className="text-2xs font-semibold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded-full border border-emerald-100">STABLE</span>
      </div>

      <div className="flex items-center gap-2.5 py-1 border-b border-slate-50">
        <div className="relative h-8.5 w-8.5 shrink-0">
          <svg className="h-full w-full" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-100" strokeWidth="4" />
            <circle cx="18" cy="18" r="16" fill="none" className="stroke-emerald-500" strokeWidth="4" strokeDasharray="94 100" strokeLinecap="round" transform="rotate(-90 18 18)" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xs font-semibold text-slate-800">94%</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-2xs font-semibold text-slate-700 uppercase tracking-tight leading-none">Reliability</span>
          <p className="text-2xs font-medium text-slate-400 leading-tight mt-0.5">Active across all channels.</p>
        </div>
      </div>

      <div className="flex flex-col gap-1.25 flex-1">
        {healthItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center justify-between group">
              <div className="flex items-center gap-2 min-w-0">
                <div className={cn("p-1 rounded-lg transition-all group-hover:scale-110", item.bg)}>
                  <Icon className={cn("h-2.5 w-2.5", item.color)} />
                </div>
                <span className="text-2xs font-medium text-slate-500 uppercase tracking-tight truncate">{item.label}</span>
              </div>
              <span className="text-xs font-semibold text-slate-800 tabular-nums shrink-0">{item.value}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-auto p-1 rounded-lg bg-[#f4f8fb] border border-slate-100 flex items-center justify-center gap-1.5">
         <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
         <span className="text-2xs font-semibold text-slate-400 uppercase tracking-[0.08rem] whitespace-nowrap">Pass: Mar 13, 13:03</span>
      </div>
    </div>
  );
};


