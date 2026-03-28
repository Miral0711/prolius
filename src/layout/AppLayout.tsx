import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Sidebar,
  SIDEBAR_WIDTH_COLLAPSED,
  SIDEBAR_WIDTH_EXPANDED,
} from './Sidebar';

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed
    ? SIDEBAR_WIDTH_COLLAPSED
    : SIDEBAR_WIDTH_EXPANDED;

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <main
        className="flex-1 flex flex-col min-h-0 transition-[padding] duration-200 ease-out"
        style={{ paddingLeft: sidebarWidth }}
      >
        <Outlet />
      </main>
    </div>
  );
}


