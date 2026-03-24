import { DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DashboardCard } from './DashboardCard';

export interface TransactionItem {
  id: string;
  amount: string;
}

export interface TransactionsCardProps {
  items: TransactionItem[];
  title?: string;
  className?: string;
}

export function TransactionsCard({
  items,
  title = 'Recent Transactions',
  className,
}: TransactionsCardProps) {
  return (
    <DashboardCard className={cn('', className)}>
      {title && (
        <h3 className="mb-1.5 text-xs font-semibold text-slate-800">{title}</h3>
      )}
      <div className="space-y-1">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-md bg-slate-50 px-2 py-1.5"
          >
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              <span className="text-xs font-medium text-slate-700">
                {item.id}
              </span>
            </div>
            <span className="text-xs font-semibold text-emerald-600">
              {item.amount}
            </span>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
