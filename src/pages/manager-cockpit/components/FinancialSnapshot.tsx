import { Calendar, DollarSign } from 'lucide-react';
import { DataCard } from '@/components/ui/data-card';

export function FinancialSnapshot({ sectionLead }: { sectionLead?: boolean }) {
  return (
    <DataCard
      title="Financial Snapshot"
      right={<DollarSign className="h-3.5 w-3.5 shrink-0 text-slate-400" />}
      sectionLead={sectionLead}
    >
      <div className="rounded-lg border border-white/35 bg-white/50 px-2 py-2">
        <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-slate-500 leading-tight">
          <Calendar className="h-3 w-3" />
          Today&apos;s Revenue
        </div>
        <p className="mt-0.5 text-lg font-semibold tracking-tight text-slate-800 leading-tight">
          SAR 0
        </p>
        <p className="mt-0.5 text-[10px] text-slate-400/90 leading-tight">
          0 trips · Avg SAR 0
        </p>
      </div>
      <div className="mt-1.5 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg border border-white/35 bg-white/50 px-2 py-1.5">
          <p className="text-[10px] text-slate-500 uppercase tracking-wide leading-tight">
            This Week
          </p>
          <p className="mt-0.5 text-base font-semibold text-slate-700 leading-tight">
            SAR 0
          </p>
        </div>
        <div className="rounded-lg border border-white/35 bg-white/50 px-2 py-1.5">
          <p className="text-[10px] text-slate-500 uppercase tracking-wide leading-tight">
            This Month
          </p>
          <p className="mt-0.5 text-base font-semibold text-slate-700 leading-tight">
            SAR 0
          </p>
        </div>
      </div>
    </DataCard>
  );
}
