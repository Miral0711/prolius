import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type SettingsTab =
  | 'display'
  | 'hmrc-co2'
  | 'fuel-benefit'
  | 'p11d-report'
  | 'insurance'
  | 'notifications'
  | 'dvsa';

const TABS: { value: SettingsTab; label: string }[] = [
  { value: 'display', label: 'Display' },
  { value: 'hmrc-co2', label: 'HMRC CO2 %' },
  { value: 'fuel-benefit', label: 'Fuel Benefit' },
  { value: 'p11d-report', label: 'P11D Report' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'notifications', label: 'Notifications' },
  { value: 'dvsa', label: 'DVSA' },
];

interface SettingsTabsProps {
  value: SettingsTab;
  onChange: (v: SettingsTab) => void;
}

export function SettingsTabs({ value, onChange }: SettingsTabsProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as SettingsTab)}>
      <TabsList variant="line" size="md" className="w-full justify-start flex-wrap">
        {TABS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
