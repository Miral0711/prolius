import { useState } from 'react';
import { PageLayout } from '@/components/shared';
import { MessagingTabs, type MessagingTab } from './components/MessagingTabs';
import { SendMessageTab } from './components/SendMessageTab';
import { MessagingHistoryTab } from './components/MessagingHistoryTab';
import { ManageGroupsTab } from './components/ManageGroupsTab';
import { ManageTemplatesTab } from './components/ManageTemplatesTab';

export default function MessagingPage() {
  const [activeTab, setActiveTab] = useState<MessagingTab>('send');

  return (
    <PageLayout title="Messaging">
      {/* Tab bar card */}
      <div className="shrink-0 rounded-md border border-[#d4e0ea] bg-white px-3 pt-2 shadow-sm">
        <MessagingTabs value={activeTab} onChange={setActiveTab} />
      </div>

      {/* Tab content */}
      <div className="min-h-0 flex-1 overflow-y-auto rounded-md border border-[#d4e0ea] bg-white px-4 py-4 shadow-sm [scrollbar-gutter:stable]">
        {activeTab === 'send' && <SendMessageTab />}
        {activeTab === 'history' && <MessagingHistoryTab />}
        {activeTab === 'groups' && <ManageGroupsTab />}
        {activeTab === 'templates' && <ManageTemplatesTab />}
      </div>
    </PageLayout>
  );
}
