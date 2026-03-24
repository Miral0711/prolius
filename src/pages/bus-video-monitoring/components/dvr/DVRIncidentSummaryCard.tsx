import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IncidentStat {
  label: string;
  value: string;
  count: number;
  color: 'rose' | 'amber' | 'blue' | 'violet';
  icon: any;
}

interface DVRIncidentSummaryCardProps {
  stats: IncidentStat[];
}

export const DVRIncidentSummaryCard: React.FC<DVRIncidentSummaryCardProps> = ({ stats }) => {
  return (
    <div className="rounded-xl border border-white bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] p-2.5 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Activity className="h-3.5 w-3.5 text-slate-400" />
        <h2 className="text-[10px] font-semibold text-slate-800 uppercase tracking-widest leading-none">Incident Summary</h2>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const colors = {
            rose: 'bg-rose-50 text-rose-500 border-rose-100/50',
            amber: 'bg-amber-50 text-amber-500 border-amber-100/50',
            blue: 'bg-blue-50 text-blue-500 border-blue-100/50',
            violet: 'bg-violet-50 text-violet-500 border-violet-100/50',
          };
          
          return (
            <div 
              key={idx} 
              className={cn(
                "flex flex-col p-2 rounded-xl border transition-all hover:shadow-sm group",
                colors[stat.color]
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <Icon className="h-2.5 w-2.5 opacity-80" />
                <span className="text-[13px] font-semibold tabular-nums leading-none tracking-tight">{stat.count}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8.5px] font-medium uppercase tracking-tight opacity-70 leading-none truncate">{stat.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-0.5 pt-2 border-t border-slate-50">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
             <span className="text-[8px] font-medium text-slate-400 uppercase tracking-widest leading-none">Global Score</span>
             <span className="text-[11px] font-semibold text-slate-800 tracking-tight leading-none">88.4%</span>
          </div>
          <div className="h-6 w-6 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin-slow flex items-center justify-center">
            <ShieldCheck className="h-3 w-3 text-emerald-500 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
