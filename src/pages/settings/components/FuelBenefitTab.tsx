import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { SettingsFormRow } from './SettingsFormRow';

export function FuelBenefitTab() {
  const [cashEquivalent, setCashEquivalent] = useState('23');
  const [chargeNonCommercial, setChargeNonCommercial] = useState('45');
  const [chargeCommercial, setChargeCommercial] = useState('56');

  const handleSave = () => {
    console.log('Saving fuel benefit:', { cashEquivalent, chargeNonCommercial, chargeCommercial });
  };

  return (
    <div className="flex flex-col gap-6">
      <p className={cn(typography.body, 'text-slate-500')}>Complete the values below.</p>

      <div className="flex flex-col gap-5">
        <SettingsFormRow label="Fuel benefit cash equivalent (Commercial vehicles):">
          <CurrencyInput value={cashEquivalent} onChange={setCashEquivalent} />
        </SettingsFormRow>

        <div className="border-t border-[#eef4f8]" />

        <SettingsFormRow label="Fuel benefit charge (Non commercial vehicles):">
          <CurrencyInput value={chargeNonCommercial} onChange={setChargeNonCommercial} />
        </SettingsFormRow>

        <div className="border-t border-[#eef4f8]" />

        <SettingsFormRow label="Fuel benefit charge (Commercial vehicles):">
          <CurrencyInput value={chargeCommercial} onChange={setChargeCommercial} />
        </SettingsFormRow>
      </div>

      <div className="border-t border-[#d4e0ea] pt-4">
        <Button variant="primary" size="md" onClick={handleSave} className="min-w-[120px]">
          Save
        </Button>
      </div>
    </div>
  );
}

function CurrencyInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-0 max-w-[220px]">
      <span className="flex h-[34px] items-center rounded-l-md border border-r-0 border-[#c8d8e4] bg-[#eef4f8] px-3 text-sm font-medium text-slate-500 select-none">
        £
      </span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[34px] w-full rounded-r-md border border-[#c8d8e4] bg-[#f4f8fb] px-3 text-sm text-slate-800 outline-none focus:border-[#3d6b8e] focus:ring-2 focus:ring-[#3d6b8e]/10"
      />
    </div>
  );
}
