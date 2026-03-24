import { CheckCircle, Package } from 'lucide-react';
import { DataCard } from '@/components/ui/data-card';

export function ActionQueue() {
  return (
    <DataCard
      title="Action Queue"
      right={<Package className="h-3.5 w-3.5 shrink-0 text-slate-400" />}
    >
      <div className="flex flex-col gap-2">
        <div className="flex min-h-[36px] items-center justify-between gap-2 rounded-lg border border-amber-200/60 bg-amber-50/80 px-2 py-1.5 text-amber-600">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium leading-tight">
              1 Low Stock Parts
            </span>
            <span className="rounded border border-amber-200/60 bg-amber-50/80 px-1.5 py-0.5 text-[10px] font-medium uppercase leading-tight">
              STOCK
            </span>
          </div>
          <span className="text-[10px] text-slate-400 shrink-0">
            Reorder needed
          </span>
        </div>
        <div className="flex min-h-[36px] items-center gap-2 rounded-lg border border-emerald-200/60 bg-emerald-50/80 px-2 py-1.5">
          <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
          <span className="text-sm text-slate-700 leading-tight">
            Status: All Clear – No Pending Actions
          </span>
        </div>
      </div>
    </DataCard>
  );
}
