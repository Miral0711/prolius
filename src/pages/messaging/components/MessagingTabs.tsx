import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, History, Users, FileText } from 'lucide-react';

export type MessagingTab = 'send' | 'history' | 'groups' | 'templates';

interface MessagingTabsProps {
  value: MessagingTab;
  onChange: (v: MessagingTab) => void;
}

export function MessagingTabs({ value, onChange }: MessagingTabsProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as MessagingTab)}>
      <TabsList variant="line" size="md" className="w-full justify-start">
        <TabsTrigger value="send" className="flex items-center gap-1.5">
          <Send className="h-3.5 w-3.5" />
          Send Message
        </TabsTrigger>
        <TabsTrigger value="history" className="flex items-center gap-1.5">
          <History className="h-3.5 w-3.5" />
          History
        </TabsTrigger>
        <TabsTrigger value="groups" className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" />
          Manage Groups
        </TabsTrigger>
        <TabsTrigger value="templates" className="flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5" />
          Manage Templates
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
