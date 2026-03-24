import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './AppLayout';

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  );
}

/**
 * Example React Router config using AppLayout.
 * Mount this inside your Router (e.g. BrowserRouter) or replace
 * the layout in app-routing-setup.tsx with <Route element={<AppLayout />}> and these routes.
 */
export function AppLayoutRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/dashboard/overview"
          element={<PlaceholderPage title="Dashboard" />}
        />
        <Route
          path="/dashboard"
          element={<Navigate to="/dashboard/overview" replace />}
        />
        <Route
          path="/manager-cockpit"
          element={<PlaceholderPage title="Manager Cockpit" />}
        />
        <Route
          path="/bus-tracking"
          element={<Navigate to="/bus-tracking/live" replace />}
        />
        <Route
          path="/bus-tracking/live"
          element={<PlaceholderPage title="Bus Tracking - Live" />}
        />
        <Route
          path="/bus-tracking/history"
          element={<PlaceholderPage title="Bus Tracking - History" />}
        />
        <Route
          path="/bus-driver-list"
          element={<PlaceholderPage title="Bus & Driver List" />}
        />
        <Route
          path="/bus-route-planning"
          element={<PlaceholderPage title="Bus Route Planning" />}
        />
        <Route
          path="/bus-video-monitoring/live-dvr"
          element={<PlaceholderPage title="Bus Video Monitoring" />}
        />
        <Route
          path="/bus-alert-monitoring"
          element={<PlaceholderPage title="Bus Alert Monitoring" />}
        />
        <Route
          path="/taxi-tracking/live"
          element={<PlaceholderPage title="Taxi Tracking" />}
        />
        <Route
          path="/job-dispatching"
          element={<PlaceholderPage title="Job Dispatching" />}
        />
        <Route
          path="/"
          element={<Navigate to="/dashboard/overview" replace />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard/overview" replace />} />
    </Routes>
  );
}
