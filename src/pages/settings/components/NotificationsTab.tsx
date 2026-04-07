import { useState } from 'react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { SettingsFormRow } from './SettingsFormRow';

interface NotificationToggleProps {
  enabled: boolean;
  onChange: (v: boolean) => void;
}

function NotificationToggle({ enabled, onChange }: NotificationToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={cn(
        'inline-flex h-7 min-w-[84px] items-center justify-center rounded px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3d6b8e] focus-visible:ring-offset-1',
        enabled
          ? 'bg-[#3d6b8e] text-white hover:bg-[#2e5270]'
          : 'bg-slate-200 text-slate-500 hover:bg-slate-300',
      )}
    >
      {enabled ? 'Enabled' : 'Disabled'}
    </button>
  );
}

const INITIAL = {
  vehicleDefect: true,
  assetDefect: false,
  maintenanceReminder: true,
  newTrailer: true,
};

export function NotificationsTab() {
  const [state, setState] = useState(INITIAL);

  const toggle = (key: keyof typeof INITIAL) =>
    setState((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex flex-col gap-5">
      <p className={cn(typography.body, 'text-slate-500 max-w-2xl')}>
        Individual user email notification settings are managed in the{' '}
        <a href="/system-management/user" className="text-[#3d6b8e] underline underline-offset-2 hover:text-[#2e5270]">
          User Management
        </a>{' '}
        area.
      </p>

      <div className="flex flex-col gap-0">
        {[
          { key: 'vehicleDefect' as const, label: 'Vehicle defect email notifications:' },
          { key: 'assetDefect' as const, label: 'Asset defect email notifications:' },
          { key: 'maintenanceReminder' as const, label: 'Maintenance reminder notifications:' },
          { key: 'newTrailer' as const, label: 'New trailer added notifications:' },
        ].map(({ key, label }, i, arr) => (
          <div key={key} className={cn(i !== arr.length - 1 && 'border-b border-[#eef4f8]')}>
            <SettingsFormRow label={label} className="py-3">
              <NotificationToggle enabled={state[key]} onChange={() => toggle(key)} />
            </SettingsFormRow>
          </div>
        ))}
      </div>
    </div>
  );
}
