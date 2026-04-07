import { useState } from 'react';
import { PageShell } from '@/components/ui/page-shell';
import { PageSurface, PAGE_SURFACE_FOOTER_PADDING } from '@/components/layout';
import { fleetSurface } from '@/components/fleet/bus-master/tokens';
import { cn } from '@/lib/utils';
import { EarnedRecognitionTabs, type ERTab } from './components/EarnedRecognitionTabs';
import { DashboardTab } from './components/DashboardTab';
import { ReportedIssuesTab } from './components/ReportedIssuesTab';

export default function EarnedRecognitionPage() {
  const [activeTab, setActiveTab] = useState<ERTab>('dashboard');
  const [selectedYear, setSelectedYear] = useState(2026);

  return (
    <PageShell
      title="Earned Recognition"
      hideHeader
      className="flex h-full min-h-0 flex-1 flex-col space-y-0"
      contentWrapperClassName="relative flex min-h-0 flex-1 flex-col"
    >
      <PageSurface
        padding={PAGE_SURFACE_FOOTER_PADDING}
        fill
        sectionGap="none"
        className="min-h-0 flex-1 bg-[#f0f4f8]"
      >
        <PageSurface.Body className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className={cn('flex min-h-0 flex-1 flex-col', fleetSurface.sectionGap)}>

            {/* Tab bar */}
            <div className="shrink-0 rounded-md border border-slate-200/90 bg-white px-3 pt-2 shadow-sm">
              <EarnedRecognitionTabs value={activeTab} onChange={setActiveTab} />
            </div>

            {/* Tab content */}
            <div className="min-h-0 flex-1 overflow-y-auto rounded-md border border-slate-200/90 bg-transparent px-0 py-0 [scrollbar-gutter:stable]">
              {activeTab === 'dashboard' && (
                <div className="p-4">
                  <DashboardTab
                    selectedYear={selectedYear}
                    onYearChange={setSelectedYear}
                  />
                </div>
              )}
              {activeTab === 'issues' && (
                <ReportedIssuesTab />
              )}
            </div>
          </div>
        </PageSurface.Body>
        <PageSurface.Footer />
      </PageSurface>
    </PageShell>
  );
}
