import { ActiveTripsPanel } from '@/components/dashboard/ActiveTripsPanel';
import { DriverStatusPanel } from '@/components/dashboard/DriverStatusPanel';
import { FleetHealthPanel } from '@/components/dashboard/FleetHealthPanel';
import { FleetMapPanel } from '@/components/dashboard/FleetMapPanel';
import { MaintenanceAlertsPanel } from '@/components/dashboard/MaintenanceAlertsPanel';

const MAP_HEIGHT = 260;

export function DashboardMapSection() {
  return (
    <section className="grid grid-cols-1 gap-3 xl:grid-cols-12 xl:items-stretch">
      <div className="flex min-w-0 flex-col gap-1.5 xl:col-span-8">
        <FleetMapPanel height={MAP_HEIGHT} />
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 xl:col-span-4 xl:grid-cols-1 xl:content-start">
        <ActiveTripsPanel />
        <MaintenanceAlertsPanel />
        <DriverStatusPanel />
        <FleetHealthPanel />
      </div>
    </section>
  );
}


