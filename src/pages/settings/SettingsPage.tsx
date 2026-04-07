import { useState } from 'react';
import { PageShell } from '@/components/ui/page-shell';
import { PageSurface, PAGE_SURFACE_FOOTER_PADDING } from '@/components/layout';
import { fleetSurface } from '@/components/fleet/bus-master/tokens';
import { cn } from '@/lib/utils';
import { SettingsTabs, type SettingsTab } from './components/SettingsTabs';
import { DisplaySettingsTab } from './components/DisplaySettingsTab';
import { HmrcCo2Tab } from './components/HmrcCo2Tab';
import { FuelBenefitTab } from './components/FuelBenefitTab';
import { P11dReportTab } from './components/P11dReportTab';
import { InsuranceTab } from './components/InsuranceTab';
import { NotificationsTab } from './components/NotificationsTab';
import { DvsaTab } from './components/DvsaTab';
import { PlaceholderTab } from './components/PlaceholderTab';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('display');

  return (
    <PageShell
      title="Settings"
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
            <div className="shrink-0 rounded-md border border-[#d4e0ea] bg-white px-3 pt-2 shadow-sm">
              <SettingsTabs value={activeTab} onChange={setActiveTab} />
            </div>

            {/* Tab content */}
            <div className="min-h-0 flex-1 overflow-y-auto rounded-md border border-[#d4e0ea] bg-white px-6 py-5 shadow-sm [scrollbar-gutter:stable]">
              {activeTab === 'display' && <DisplaySettingsTab />}
              {activeTab === 'hmrc-co2' && <HmrcCo2Tab />}
              {activeTab === 'fuel-benefit' && <FuelBenefitTab />}
              {activeTab === 'p11d-report' && <P11dReportTab />}
              {activeTab === 'insurance' && <InsuranceTab />}
              {activeTab === 'notifications' && <NotificationsTab />}
              {activeTab === 'dvsa' && <DvsaTab />}
            </div>

          </div>
        </PageSurface.Body>
        <PageSurface.Footer />
      </PageSurface>
    </PageShell>
  );
}
