import VehicleChecksPage from '@/pages/vehicle-checks/VehicleChecksPage';
import VehicleDefectsPage from '@/pages/vehicle-defects/VehicleDefectsPage';
import ReportedIncidentsPage from '@/pages/reported-incidents/ReportedIncidentsPage';
import VehicleProfilesPage from '@/pages/vehicle-profiles/VehicleProfilesPage';
import AssetDefectsPage from '@/pages/asset-defects/AssetDefectsPage';
import EarnedRecognitionPage from '@/pages/earned-recognition/EarnedRecognitionPage';
import FleetPlanningPage from '@/pages/fleet-planning/FleetPlanningPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import MessagingPage from '@/pages/messaging/MessagingPage';
import SettingsPage from '@/pages/settings/SettingsPage';
import AssetChecksPage from '@/pages/asset-checks/AssetChecksPage';
import AssetProfilesPage from '@/pages/asset-profiles/AssetProfilesPage';
import AssetProfileDetailPage from '@/pages/asset-profiles/AssetProfileDetailPage';
import AssetProfileEditPage from '@/pages/asset-profiles/AssetProfileEditPage';
import AssetProfileAddPage from '@/pages/asset-profiles/AssetProfileAddPage';
import WorkshopsPage from '@/pages/workshops/WorkshopsPage';
import UserManagementPage from '@/pages/system-management/user/UserManagementPage';
import ReportsPage from '@/pages/reports/ReportsPage';
import LiveTrackingPage from '@/pages/tracking/LiveTrackingPage';
import HistoryTrackingPage from '@/pages/tracking/HistoryTrackingPage';
import AlertsPage from '@/pages/tracking/AlertsPage';
import InspectionsPage from '@/pages/vehicle-management/InspectionsPage';
import MaintenanceRecordsPage from '@/pages/vehicle-management/MaintenanceRecordsPage';
import InventoryPage from '@/pages/asset-management/InventoryPage';
import SuppliersPage from '@/pages/asset-management/SuppliersPage';
import RolesPermissionsPage from '@/pages/system-management/RolesPermissionsPage';
import { Navigate, Route, Routes } from 'react-router';
import { Layout19 } from '@/components/layouts/layout-19';

export function AppRoutingSetup() {
  return (
    <Routes>
      <Route element={<Layout19 />}>
        {/* Dashboard */}
        <Route path="/dashboard/overview" element={<DashboardPage />} />
        <Route path="/dashboard" element={<Navigate to="/dashboard/overview" replace />} />

        {/* Fleet Planning */}
        <Route path="/fleet-planning" element={<FleetPlanningPage />} />

        {/* Tracking & Monitoring */}
        <Route path="/tracking/live" element={<LiveTrackingPage />} />
        <Route path="/tracking/history" element={<HistoryTrackingPage />} />
        <Route path="/tracking/alerts" element={<AlertsPage />} />
        <Route path="/tracking/incidents" element={<ReportedIncidentsPage />} />

        {/* Vehicle Management */}
        <Route path="/vehicle-management/profiles" element={<VehicleProfilesPage />} />
        <Route path="/vehicle-management/checks" element={<VehicleChecksPage />} />
        <Route path="/vehicle-management/defects" element={<VehicleDefectsPage />} />
        <Route path="/vehicle-management/inspections" element={<InspectionsPage />} />
        <Route path="/vehicle-management/maintenance" element={<MaintenanceRecordsPage />} />

        {/* Asset Management */}
        <Route path="/asset-management/profiles" element={<AssetProfilesPage />} />
        <Route path="/asset-management/profiles/add" element={<AssetProfileAddPage />} />
        <Route path="/asset-management/profiles/:id" element={<AssetProfileDetailPage />} />
        <Route path="/asset-management/profiles/:id/edit" element={<AssetProfileEditPage />} />
        <Route path="/asset-management/checks" element={<AssetChecksPage />} />
        <Route path="/asset-management/defects" element={<AssetDefectsPage />} />
        <Route path="/asset-management/inventory" element={<InventoryPage />} />
        <Route path="/asset-management/suppliers" element={<SuppliersPage />} />

        {/* Workshops */}
        <Route path="/workshops" element={<WorkshopsPage />} />

        {/* Messaging */}
        <Route path="/messaging" element={<Navigate to="/messaging/chat" replace />} />
        <Route path="/messaging/chat" element={<MessagingPage />} />
        <Route path="/messaging/*" element={<MessagingPage />} />

        {/* Earned Recognition */}
        <Route path="/earned-recognition" element={<EarnedRecognitionPage />} />

        {/* Reports */}
        <Route path="/reports/overview" element={<ReportsPage />} />
        <Route path="/reports/*" element={<ReportsPage />} />

        {/* User & System Management */}
        <Route path="/system-management/users" element={<UserManagementPage />} />
        <Route path="/system-management/roles" element={<RolesPermissionsPage />} />
        <Route path="/system-management/settings" element={<SettingsPage />} />

        {/* Legacy redirects — keep old URLs working */}
        <Route path="/vehicle-checks" element={<Navigate to="/vehicle-management/checks" replace />} />
        <Route path="/vehicle-defects" element={<Navigate to="/vehicle-management/defects" replace />} />
        <Route path="/vehicle-profiles" element={<Navigate to="/vehicle-management/profiles" replace />} />
        <Route path="/vehicle-search" element={<Navigate to="/vehicle-management/profiles" replace />} />
        <Route path="/asset-checks" element={<Navigate to="/asset-management/checks" replace />} />
        <Route path="/asset-defects" element={<Navigate to="/asset-management/defects" replace />} />
        <Route path="/asset-profiles" element={<Navigate to="/asset-management/profiles" replace />} />
        <Route path="/asset-search" element={<Navigate to="/asset-management/profiles" replace />} />
        <Route path="/reported-incidents" element={<Navigate to="/tracking/incidents" replace />} />
        <Route path="/system-management/user" element={<Navigate to="/system-management/users" replace />} />
        <Route path="/settings" element={<Navigate to="/system-management/settings" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard/overview" replace />} />
    </Routes>
  );
}
