// ─── Primitives & Layout ────────────────────────────────────────────────────
export { DashboardCard } from './DashboardCard';

// ─── Shared UI Atoms ────────────────────────────────────────────────────────
export { StatusBadge } from './StatusBadge';
export type { StatusBadgeProps, StatusVariant } from './StatusBadge';
export { CardHeader } from './CardHeader';
export type { CardHeaderProps } from './CardHeader';
export { MetricGrid } from './MetricGrid';
export type { MetricGridProps, MetricItem } from './MetricGrid';
export { PieChartWidget } from './PieChartWidget';
export type { PieChartWidgetProps, PieChartSlice } from './PieChartWidget';
export { SimpleTable } from './SimpleTable';
export type { SimpleTableProps, SimpleTableColumn } from './SimpleTable';

// ─── KPI & Stat Cards ───────────────────────────────────────────────────────
export { KpiCard } from './KpiCard';
export type { KpiCardProps } from './KpiCard';
export { AnalyticsCard } from './AnalyticsCard';
export type { AnalyticsCardProps } from './AnalyticsCard';

// ─── Feed & Activity ────────────────────────────────────────────────────────
export { ActivityFeed } from './ActivityFeed';
export type { ActivityFeedProps, ActivityItem } from './ActivityFeed';
export { RecentActivityCard } from './RecentActivityCard';
export type { RecentActivityCardProps, ActivityEntry } from './RecentActivityCard';
export { TransactionsCard } from './TransactionsCard';
export type { TransactionsCardProps, TransactionItem } from './TransactionsCard';

// ─── Fleet Status ───────────────────────────────────────────────────────────
export { FleetMapPanel } from './FleetMapPanel';
export { FleetBreakdownCard } from './FleetBreakdownCard';
export { FleetHealthPanel } from './FleetHealthPanel';
export { FleetOverviewCard } from './FleetOverviewCard';
export type { FleetOverviewCardProps, FleetTrendPoint } from './FleetOverviewCard';

// ─── Trips & Jobs ───────────────────────────────────────────────────────────
export { ActiveTripsPanel } from './ActiveTripsPanel';
export { TripsAnalyticsCard } from './TripsAnalyticsCard';
export { TripStatisticsCard } from './TripStatisticsCard';
export { JobStatusCard } from './JobStatusCard';
export { HourlyActivityCard } from './HourlyActivityCard';

// ─── Drivers ────────────────────────────────────────────────────────────────
export { DriverStatusPanel } from './DriverStatusPanel';
export { DriverPerformancePanel } from './DriverPerformancePanel';
export type { DriverPerformancePanelProps, DriverAvailabilityItem, DriverMetricItem } from './DriverPerformancePanel';
export { TopDriversCard } from './TopDriversCard';
export type { TopDriversCardProps } from './TopDriversCard';

// ─── Revenue & Finance ──────────────────────────────────────────────────────
export { RevenueAnalyticsCard } from './RevenueAnalyticsCard';
export { RevenueExpensesCard } from './RevenueExpensesCard';
export { FuelConsumptionCard } from './FuelConsumptionCard';

// ─── Safety & Maintenance ───────────────────────────────────────────────────
export { SafetyAlertsPanel } from './SafetyAlertsPanel';
export { MaintenanceAlertsPanel } from './MaintenanceAlertsPanel';

// ─── Regional & Distribution ────────────────────────────────────────────────
export { RegionalDistributionCard } from './RegionalDistributionCard';

// ─── Grid Table (DataTable) ─────────────────────────────────────────────────
export { DataTable } from './GridTable';
export type { DataTableColumn } from './GridTable';
