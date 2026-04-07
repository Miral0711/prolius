import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type SearchMode = 'quick' | 'advanced';

interface SearchModeTabsProps {
  value: SearchMode;
  onChange: (v: SearchMode) => void;
}

export function SearchModeTabs({ value, onChange }: SearchModeTabsProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as SearchMode)}>
      <TabsList variant="default" size="sm">
        <TabsTrigger value="quick">Quick Search</TabsTrigger>
        <TabsTrigger value="advanced">Advanced Search</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
