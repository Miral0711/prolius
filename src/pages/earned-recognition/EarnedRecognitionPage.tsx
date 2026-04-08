import { useState } from 'react';
import { PageLayout } from '@/components/shared';
import { EarnedRecognitionTabs, type ERTab } from './components/EarnedRecognitionTabs';
import { DashboardTab } from './components/DashboardTab';
import { ReportedIssuesTab } from './components/ReportedIssuesTab';

export default function EarnedRecognitionPage() {
  const [activeTab, setActiveTab] = useState<ERTab>('dashboard');
  const [selectedYear, setSelectedYear] = useState(2026);

  return (
    <PageLayout title="Earned Recognition">
      {/* Tab bar */}
      <div className="shrink-0 rounded-md border border-slate-200/90 bg-white px-3 pt-2 shadow-sm">
        <EarnedRecognitionTabs value={activeTab} onChange={setActiveTab} />
      </div>

      {/* Tab content */}
      <div className="min-h-0 flex-1 overflow-y-auto rounded-md border border-slate-200/90 bg-transparent [scrollbar-gutter:stable]">
        {activeTab === 'dashboard' && (
          <div className="p-4">
            <DashboardTab selectedYear={selectedYear} onYearChange={setSelectedYear} />
          </div>
        )}
        {activeTab === 'issues' && <ReportedIssuesTab />}
      </div>
    </PageLayout>
  );
}
