import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type PlanningTab = 'calendar' | 'vehicle-planning' | 'asset-planning';

interface PlanningTabsProps {
  activeTab: PlanningTab;
  onChange: (tab: PlanningTab) => void;
}

export function PlanningTabs({ activeTab, onChange }: PlanningTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={(v) => onChange(v as PlanningTab)}>
      <TabsList variant="line" size="md">
        <TabsTrigger value="calendar">Calendar</TabsTrigger>
        <TabsTrigger value="vehicle-planning">Vehicle Planning</TabsTrigger>
        <TabsTrigger value="asset-planning">Asset Planning</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
