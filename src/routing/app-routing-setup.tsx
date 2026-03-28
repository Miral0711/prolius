import AiAlertMonitoringPage from '@/pages/bus-ai-alerts/AiAlertMonitoringPage';
import BusHistoryTrackingPage from '@/pages/bus-tracking/BusHistoryTrackingPage';
import BusLiveTrackingPage from '@/pages/bus-tracking/BusLiveTrackingPage';
import HistoryDvrPage from '@/pages/bus-video-monitoring/HistoryDvrPage';
import LiveDvrMonitoringPage from '@/pages/bus-video-monitoring/LiveDvrMonitoringPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import BusMasterPage from '@/pages/fleet-management/bus/BusMasterPage';
import CreateJobPage from '@/pages/job-dispatching/CreateJobPage';
import ManagerCockpitPage from '@/pages/manager-cockpit';
import ChatPage from '@/pages/messaging/ChatPage';
import { Navigate, Route, Routes, useParams } from 'react-router';
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
        <h1 className="text-xl font-semibold text-[#1F2937] capitalize">
          {title}
        </h1>
        <p className="mt-1 text-[#64748B]">Path: {path || '/'}</p>
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
        <Route path="/messaging/chat" element={<ChatPage />} />
        <Route path="/messaging/*" element={<PlaceholderPage />} />
        <Route path="/taxi-video-monitoring/*" element={<PlaceholderPage />} />
        <Route path="/taxi-alert-monitoring/*" element={<PlaceholderPage />} />
        <Route path="/ads-management/*" element={<PlaceholderPage />} />
        <Route path="/crm/*" element={<PlaceholderPage />} />
        <Route path="/fleet-management/bus" element={<BusMasterPage />} />
        <Route path="/fleet-management/*" element={<PlaceholderPage />} />
        <Route path="/wasl-management/*" element={<PlaceholderPage />} />
        <Route path="/system-management/*" element={<PlaceholderPage />} />
        <Route path="/reports/*" element={<PlaceholderPage />} />
        <Route path="/logout" element={<PlaceholderPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard/overview" replace />} />
    </Routes>
  );
}


