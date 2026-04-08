import { useState } from 'react';
import { PageLayout } from '@/components/shared';
import { SettingsTabs, type SettingsTab } from './components/SettingsTabs';
import { DisplaySettingsTab } from './components/DisplaySettingsTab';
import { HmrcCo2Tab } from './components/HmrcCo2Tab';
import { FuelBenefitTab } from './components/FuelBenefitTab';
import { P11dReportTab } from './components/P11dReportTab';
import { InsuranceTab } from './components/InsuranceTab';
import { NotificationsTab } from './components/NotificationsTab';
import { DvsaTab } from './components/DvsaTab';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('display');

  return (
    <PageLayout title="Settings">
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
    </PageLayout>
  );
}
