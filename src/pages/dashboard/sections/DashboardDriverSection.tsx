import { DriverPerformancePanel } from '@/components/dashboard/DriverPerformancePanel';

export function DashboardDriverSection() {
  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <DriverPerformancePanel />
    </section>
  );
}


