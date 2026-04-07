import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type ERTab = 'dashboard' | 'issues';

interface EarnedRecognitionTabsProps {
  value: ERTab;
  onChange: (v: ERTab) => void;
}

export function EarnedRecognitionTabs({ value, onChange }: EarnedRecognitionTabsProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as ERTab)}>
      <TabsList variant="default" size="sm">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="issues">Reported Issues</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
