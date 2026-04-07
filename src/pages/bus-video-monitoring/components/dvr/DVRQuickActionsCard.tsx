import React from 'react';
import { Download, ZoomIn, Share2, Flag, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

export const DVRQuickActionsCard: React.FC = () => {
  const actions = [
    { icon: Download, label: 'Export', c: 'text-[#2e5f8a]', bg: 'bg-[#e8f0f8]/50 border-[#dcedf8]/50 hover:bg-blue-100 hover:border-[#d0e2f0] shadow-blue-500/5' },
    { icon: ZoomIn, label: 'Snapshot', c: 'text-violet-600', bg: 'bg-violet-50/50 border-violet-100/50 hover:bg-violet-100 hover:border-violet-200 shadow-violet-500/5' },
    { icon: Share2, label: 'Share', c: 'text-emerald-600', bg: 'bg-emerald-50/50 border-emerald-100/50 hover:bg-emerald-100 hover:border-emerald-200 shadow-emerald-500/5' },
    { icon: Flag, label: 'Report', c: 'text-rose-600', bg: 'bg-rose-50/50 border-rose-100/50 hover:bg-rose-100 hover:border-rose-200 shadow-rose-500/5' },
  ];

  return (
    <div className="rounded-xl border border-white bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] p-2.5 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <LayoutGrid className="h-3.5 w-3.5 text-slate-400" />
        <h2 className={cn(typography.cardTitle, 'leading-none')}>Control Manifest</h2>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              type="button"
              className={cn(
                'flex flex-col items-center justify-center gap-1 rounded-xl border p-1.5 text-2xs font-semibold uppercase tracking-[0.08rem] transition-all hover:translate-y-[-1px] active:translate-y-[0px] shadow-sm',
                action.bg,
                action.c
              )}
            >
              <div className="p-1 rounded-lg bg-white shadow-sm border border-slate-100/50">
                <Icon className="h-3 w-3" />
              </div>
              <span className="leading-none">{action.label}</span>
            </button>
          );
        })}
      </div>
      
      <div className="mt-0.5 flex items-center justify-center py-1 px-3 bg-[#f4f8fb] rounded-lg border border-dashed border-slate-200 group cursor-pointer hover:bg-slate-100 transition-colors">
        <span className="text-2xs font-medium text-slate-400 uppercase tracking-[0.08rem] group-hover:text-slate-600">Advanced Hub</span>
      </div>
    </div>
  );
};


