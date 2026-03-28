import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface OperationalDetailItem {
  label: string;
  value: ReactNode;
}

export interface OperationalDetailSection {
  title: string;
  items: OperationalDetailItem[];
}

export interface OperationalDetailPanelProps {
  sections: OperationalDetailSection[];
  /** Short ops note at bottom */
  note?: string;
  className?: string;
}

/** Expandable row content: labeled fields in a calm enterprise grid */
export function OperationalDetailPanel({
  sections,
  note,
  className,
}: OperationalDetailPanelProps) {
  return (
    <div className={cn('px-4 py-3', className)}>
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {sections.map(section => (
          <div key={section.title} className="min-w-0 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.02rem] text-slate-400">
              {section.title}
            </h4>
            <div className="space-y-1.5">
              {section.items.map(row => (
                <div
                  key={row.label}
                  className="grid grid-cols-[minmax(0,7.5rem)_1fr] gap-x-2 gap-y-0.5"
                >
                  <span className="text-xs font-medium text-slate-500">{row.label}</span>
                  <span className="min-w-0 text-2sm font-medium text-slate-800">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {note ? (
        <p className="mt-4 border-t border-slate-200/80 pt-3 text-xs leading-snug text-slate-500">
          {note}
        </p>
      ) : null}
    </div>
  );
}


