import AiAlertMonitoringPage from '@/pages/bus-ai-alerts/AiAlertMonitoringPage';
import VehicleChecksPage from '@/pages/vehicle-checks/VehicleChecksPage';
import VehicleDefectsPage from '@/pages/vehicle-defects/VehicleDefectsPage';
import ReportedIncidentsPage from '@/pages/reported-incidents/ReportedIncidentsPage';
import VehicleProfilesPage from '@/pages/vehicle-profiles/VehicleProfilesPage';
import AssetDefectsPage from '@/pages/asset-defects/AssetDefectsPage';
import EarnedRecognitionPage from '@/pages/earned-recognition/EarnedRecognitionPage';
import FleetPlanningPage from '@/pages/fleet-planning/FleetPlanningPage';
import BusHistoryTrackingPage from '@/pages/bus-tracking/BusHistoryTrackingPage';
import BusLiveTrackingPage from '@/pages/bus-tracking/BusLiveTrackingPage';
import HistoryDvrPage from '@/pages/bus-video-monitoring/HistoryDvrPage';
import LiveDvrMonitoringPage from '@/pages/bus-video-monitoring/LiveDvrMonitoringPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import BusMasterPage from '@/pages/fleet-management/bus/BusMasterPage';
import CreateJobPage from '@/pages/job-dispatching/CreateJobPage';
import ManagerCockpitPage from '@/pages/manager-cockpit';
import MessagingPage from '@/pages/messaging/MessagingPage';
import SettingsPage from '@/pages/settings/SettingsPage';
import { Navigate, Route, Routes, useParams, Link } from 'react-router';
import { PageSurface } from '@/components/layout';
import { Layout19 } from '@/components/layouts/layout-19';

function PlaceholderPage() {
  const { '*': splat } = useParams();
  const path = splat ? `/${splat}` : '';
  const title =
    path.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') ?? 'Page';
  return (
    <PageSurface padding="md">
      <PageSurface.Body>
        <h1 className="text-xl font-semibold text-[#1F2937] capitalize">{title}</h1>
        <p className="mt-2 text-sm text-[#64748B]">
          For this page's UI refer to this link:{' '}
          <Link
            to="/fleet-planning"
            className="font-medium text-[#3d6b8e] underline underline-offset-2 hover:text-[#2e5270]"
          >
            fleet-planning
          </Link>
        </p>
      </PageSurface.Body>
    </PageSurface>
  );
}

export function AppRoutingSetup() {
  return (
    <Routes>
      <Route element={<Layout19 />}>
        <Route path="/dashboard/overview" element={<DashboardPage />} />
        <Route
          path="/dashboard"
          element={<Navigate to="/dashboard/overview" replace />}
        />
        <Route path="/dashboard/*" element={<PlaceholderPage />} />
        <Route path="/manager-cockpit" element={<ManagerCockpitPage />} />
        <Route
          path="/bus-tracking"
          element={<Navigate to="/bus-tracking/live" replace />}
        />
        <Route path="/bus-tracking/live" element={<BusLiveTrackingPage />} />
        <Route
          path="/bus-tracking/history"
          element={<BusHistoryTrackingPage />}
        />
        <Route path="/bus-tracking/*" element={<PlaceholderPage />} />
        <Route path="/bus-driver-list" element={<PlaceholderPage />} />
        <Route path="/bus-route-planning" element={<PlaceholderPage />} />
        <Route
          path="/bus-video-monitoring/live-dvr"
          element={<LiveDvrMonitoringPage />}
        />
        <Route
          path="/bus-video-monitoring/history-dvr"
          element={<HistoryDvrPage />}
        />
        <Route path="/bus-video-monitoring/*" element={<PlaceholderPage />} />
        <Route
          path="/bus-alert-monitoring"
          element={<Navigate to="/bus-alert-monitoring/overview" replace />}
        />
        <Route
          path="/bus-alert-monitoring/overview"
          element={<AiAlertMonitoringPage />}
        />
        <Route
          path="/bus-alert-monitoring/ai-alerts"
          element={<AiAlertMonitoringPage />}
        />
        <Route path="/bus-alert-monitoring/*" element={<PlaceholderPage />} />
        <Route path="/taxi-tracking/*" element={<PlaceholderPage />} />
        <Route path="/job-dispatching" element={<CreateJobPage />} />
        <Route path="/job-dispatching/create-job" element={<CreateJobPage />} />
        <Route path="/job-dispatching/*" element={<PlaceholderPage />} />
        <Route path="/shift-management/*" element={<PlaceholderPage />} />
        <Route
          path="/messaging"
          element={<Navigate to="/messaging/chat" replace />}
        />
        <Route path="/messaging/chat" element={<MessagingPage />} />
        <Route path="/messaging/*" element={<MessagingPage />} />
        <Route path="/taxi-video-monitoring/*" element={<PlaceholderPage />} />
        <Route path="/taxi-alert-monitoring/*" element={<PlaceholderPage />} />
        <Route path="/ads-management/*" element={<PlaceholderPage />} />
        <Route path="/crm/*" element={<PlaceholderPage />} />
        <Route path="/fleet-management/bus" element={<BusMasterPage />} />
        <Route path="/fleet-management/*" element={<PlaceholderPage />} />
        <Route path="/fleet-planning" element={<FleetPlanningPage />} />
        <Route path="/vehicle-checks" element={<VehicleChecksPage />} />
        <Route path="/vehicle-defects" element={<VehicleDefectsPage />} />
        <Route path="/reported-incidents" element={<ReportedIncidentsPage />} />
        <Route path="/vehicle-profiles" element={<VehicleProfilesPage />} />
        <Route path="/vehicle-search" element={<PlaceholderPage />} />
        <Route path="/asset-checks" element={<PlaceholderPage />} />
        <Route path="/asset-defects" element={<AssetDefectsPage />} />
        <Route path="/asset-profiles" element={<PlaceholderPage />} />
        <Route path="/asset-search" element={<PlaceholderPage />} />
        <Route path="/workshops" element={<PlaceholderPage />} />
        <Route path="/earned-recognition" element={<EarnedRecognitionPage />} />
        <Route path="/wasl-management/*" element={<PlaceholderPage />} />
        <Route path="/system-management/settings" element={<SettingsPage />} />
        <Route path="/system-management/*" element={<PlaceholderPage />} />
        <Route path="/reports/overview" element={<PlaceholderPage />} />
        <Route path="/reports/*" element={<PlaceholderPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/logout" element={<PlaceholderPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard/overview" replace />} />
    </Routes>
  );
}


