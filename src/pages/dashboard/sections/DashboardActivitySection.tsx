import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { TransactionsCard } from '@/components/dashboard/TransactionsCard';
import { RECENT_ACTIVITIES, RECENT_TRANSACTIONS } from '../mockData';

export function DashboardActivitySection() {
  return (
    <section className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      <ActivityFeed items={RECENT_ACTIVITIES} title="Recent Activity" />
      <TransactionsCard
        items={RECENT_TRANSACTIONS}
        title="Recent Transactions"
      />
    </section>
  );
}


