import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { SettingsFormRow } from './SettingsFormRow';

export function InsuranceTab() {
  const [company, setCompany] = useState('Pen Underwriting');
  const [telephone, setTelephone] = useState('');
  const [policyNumber, setPolicyNumber] = useState('MV23Z0018354');
  const [policyName, setPolicyName] = useState('Motor Insurance');
  const [certFileName, setCertFileName] = useState('Motor Certificate.pdf');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCertFileName(file.name);
  };

  const handleDelete = () => setCertFileName('');

  const handleSave = () => {
    console.log('Saving insurance:', { company, telephone, policyNumber, policyName, certFileName });
  };

  return (
    <div className="flex flex-col gap-6">
      <p className={cn(typography.body, 'text-slate-500 max-w-2xl')}>
        The below insurance information will display in the Report Incident section on the app.
      </p>

      <div className="flex flex-col gap-5">
        <SettingsFormRow label="Insurance company:">
          <Input value={company} onChange={(e) => setCompany(e.target.value)} className="max-w-sm" />
        </SettingsFormRow>

        <div className="border-t border-[#eef4f8]" />

        <SettingsFormRow label="Telephone number:">
          <Input value={telephone} onChange={(e) => setTelephone(e.target.value)} className="max-w-sm" />
        </SettingsFormRow>

        <div className="border-t border-[#eef4f8]" />

        <SettingsFormRow label="Policy number:">
          <Input value={policyNumber} onChange={(e) => setPolicyNumber(e.target.value)} className="max-w-sm" />
        </SettingsFormRow>

        <div className="border-t border-[#eef4f8]" />

        <SettingsFormRow label="Policy name:">
          <Input value={policyName} onChange={(e) => setPolicyName(e.target.value)} className="max-w-sm" />
        </SettingsFormRow>

        <div className="border-t border-[#eef4f8]" />

        <SettingsFormRow label="Upload insurance certificate:">
          <div className="flex items-center gap-2 max-w-sm">
            <input
              readOnly
              value={certFileName}
              placeholder="No file chosen"
              className="h-[34px] flex-1 rounded-md border border-[#c8d8e4] bg-[#f4f8fb] px-3 text-sm text-slate-600 outline-none"
            />
            {certFileName ? (
              <Button variant="outline" size="sm" onClick={handleDelete}>
                Delete
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                Upload
              </Button>
            )}
            <input ref={fileRef} type="file" accept=".pdf,.jpg,.png" className="sr-only" onChange={handleFileChange} />
          </div>
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
