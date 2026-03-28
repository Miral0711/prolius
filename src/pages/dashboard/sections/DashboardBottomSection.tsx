import { FleetOverviewCard } from '@/components/dashboard/FleetOverviewCard';
import { FuelConsumptionCard } from '@/components/dashboard/FuelConsumptionCard';
import { HourlyActivityCard } from '@/components/dashboard/HourlyActivityCard';
import { JobStatusCard } from '@/components/dashboard/JobStatusCard';
import { RecentActivityCard } from '@/components/dashboard/RecentActivityCard';
import { RegionalDistributionCard } from '@/components/dashboard/RegionalDistributionCard';
import { RevenueExpensesCard } from '@/components/dashboard/RevenueExpensesCard';
import { TripStatisticsCard } from '@/components/dashboard/TripStatisticsCard';

export function DashboardBottomSection() {
  return (
    <>
      <section className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <JobStatusCard />
        <HourlyActivityCard />
      </section>
      <section className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        <FleetOverviewCard />
        <RevenueExpensesCard />
        <TripStatisticsCard />
        <RegionalDistributionCard />
        <RecentActivityCard />
        <FuelConsumptionCard />
      </section>
    </>
  );
}


