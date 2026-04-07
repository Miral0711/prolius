import { useState } from 'react';
import { PageShell } from '@/components/ui/page-shell';
import { PageSurface, PAGE_SURFACE_FOOTER_PADDING } from '@/components/layout';
import { fleetSurface } from '@/components/fleet/bus-master/tokens';
import { cn } from '@/lib/utils';
import { MessagingTabs, type MessagingTab } from './components/MessagingTabs';
import { SendMessageTab } from './components/SendMessageTab';
import { MessagingHistoryTab } from './components/MessagingHistoryTab';
import { ManageGroupsTab } from './components/ManageGroupsTab';
import { ManageTemplatesTab } from './components/ManageTemplatesTab';

export default function MessagingPage() {
  const [activeTab, setActiveTab] = useState<MessagingTab>('send');

  return (
    <PageShell
      title="Messaging"
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
          </div>
        </PageSurface.Body>
        <PageSurface.Footer />
      </PageSurface>
    </PageShell>
  );
}
