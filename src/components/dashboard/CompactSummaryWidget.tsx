import React from 'react';
import { DashboardCard } from './DashboardCard';

export interface SummaryListItem {
  label: string;
  value: string | number;
  color: string;
  textClass: string;
  bgClass: string;
}

export interface SummaryStatItem {
  label: string;
  value: string | number;
  sub: string;
  colorClass: string;
}

interface CompactSummaryWidgetProps {
  title: string;
  icon: React.ElementType;
  iconColorClass?: string;
  listData?: SummaryListItem[];
  statData?: SummaryStatItem[];
}

export function CompactSummaryWidget({
  title,
  icon: Icon,
  iconColorClass = 'text-slate-500',
  listData,
  statData,
}: CompactSummaryWidgetProps) {
  return (
    <DashboardCard className="!p-0 border-white/40 shadow-sm flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100/50 px-3 py-2 bg-slate-50/40 shrink-0">
        <div className="flex items-center gap-2">
          <Icon className={`h-3.5 w-3.5 ${iconColorClass}`} />
          <h3 className="text-[10px] font-semibold text-slate-700 uppercase tracking-widest">
            {title}
          </h3>
        </div>
      </div>
      <div
        className={`p-3 flex flex-1 bg-white ${listData ? 'flex-col gap-2 justify-center' : 'items-center justify-between gap-3'}`}
      >
        {listData &&
          listData.map((s) => (
            <div
              key={s.label}
              className={`flex items-center justify-between px-3 py-1.5 rounded-md border border-slate-100/50 ${s.bgClass}`}
            >
              <div className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${s.color}`} />
                <span className="text-[9px] font-medium text-slate-600 uppercase tracking-wider">
                  {s.label}
                </span>
              </div>
              <span className={`text-[10px] font-semibold ${s.textClass}`}>
                {s.value}
              </span>
            </div>
          ))}
        {statData &&
          statData.map((s, index) => (
            <div
              key={s.label}
              className={`flex flex-col gap-1 flex-1 justify-center ${index === 0 && statData.length > 1 ? 'border-r border-slate-100/80 pr-3' : 'pl-1'}`}
            >
              <span className="text-[8px] font-medium text-slate-400 uppercase tracking-widest">
                {s.label}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span
                  className={`text-xl font-semibold leading-none ${s.colorClass}`}
                >
                  {s.value}
                </span>
                <span className="text-[9px] font-medium text-slate-500">
                  {s.sub}
                </span>
              </div>
            </div>
          ))}
      </div>
    </DashboardCard>
  );
}
