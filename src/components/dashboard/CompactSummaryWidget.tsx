import React from 'react';
import { typography } from '@/lib/typography';
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
      <div className="flex items-center justify-between border-b border-slate-100/50 px-3 py-1.5 bg-slate-50/40 shrink-0">
        <div className="flex items-center gap-2">
          <Icon className={`h-3.5 w-3.5 ${iconColorClass}`} />
          <h3 className={typography.cardTitle}>
            {title}
          </h3>
        </div>
      </div>
      <div
        className={`px-3 py-2.5 flex flex-1 bg-white ${listData ? 'flex-col gap-1.5 justify-center' : 'items-center justify-between gap-3'}`}
      >
        {listData &&
          listData.map((s) => (
            <div
              key={s.label}
              className={`flex items-center justify-between px-2.5 py-1 rounded-md border border-slate-100/50 ${s.bgClass}`}
            >
              <div className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${s.color}`} />
                <span className="text-[11px] font-normal text-slate-600 uppercase tracking-[0.02rem] leading-none">
                  {s.label}
                </span>
              </div>
              <span className={`text-[11px] font-medium leading-none ${s.textClass}`}>
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
              <span className="text-xs font-normal text-slate-400 uppercase tracking-[0.02rem]">
                {s.label}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span
                  className={`text-xl font-medium leading-none ${s.colorClass}`}
                >
                  {s.value}
                </span>
                <span className="text-xs font-normal text-slate-500">
                  {s.sub}
                </span>
              </div>
            </div>
          ))}
      </div>
    </DashboardCard>
  );
}
