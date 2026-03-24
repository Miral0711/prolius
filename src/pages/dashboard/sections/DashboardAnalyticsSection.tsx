import { FleetBreakdownCard } from '@/components/dashboard/FleetBreakdownCard';
import { RevenueAnalyticsCard } from '@/components/dashboard/RevenueAnalyticsCard';
import { SafetyAlertsPanel } from '@/components/dashboard/SafetyAlertsPanel';
import { TripsAnalyticsCard } from '@/components/dashboard/TripsAnalyticsCard';

export function DashboardAnalyticsSection() {
  return (
    <section className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      <TripsAnalyticsCard />
      <RevenueAnalyticsCard />
      <SafetyAlertsPanel />
      <FleetBreakdownCard />
    </section>
  );
}
