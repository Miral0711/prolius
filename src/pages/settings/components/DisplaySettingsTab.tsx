import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { SettingsFormRow } from './SettingsFormRow';
import { ColorPickerField } from './ColorPickerField';
import { LogoUploadCard } from './LogoUploadCard';

export function DisplaySettingsTab() {
  const [proliusUrl, setProliusUrl] = useState('https://icl.prolius.app');
  const [primaryColor, setPrimaryColor] = useState('#3d6b8e');
  const [logoPreview, setLogoPreview] = useState<string | null>(
    '/media/brand-logos/prolius-logo.svg',
  );

  const handleLogoChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setLogoPreview(url);
  };

  const handleSave = () => {
    // API-ready: replace with actual save call
    console.log('Saving settings:', { proliusUrl, primaryColor, logoPreview });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Instruction text */}
      <p className={cn(typography.body, 'text-slate-500 max-w-2xl')}>
        To preview a new primary colour for the site, select a colour from the palette below and
        click <span className="font-medium text-slate-600">Ok</span>. To apply it as the active
        primary colour, click <span className="font-medium text-slate-600">Save</span>.
      </p>

      {/* Form fields */}
      <div className="flex flex-col gap-5">
        <SettingsFormRow label="Prolius URL" required>
          <Input
            value={proliusUrl}
            onChange={(e) => setProliusUrl(e.target.value)}
            placeholder="https://icl.prolius.app"
            className="max-w-sm"
          />
        </SettingsFormRow>

        <div className="border-t border-[#eef4f8]" />

        <SettingsFormRow label="Primary colour" required>
          <ColorPickerField value={primaryColor} onChange={setPrimaryColor} />
        </SettingsFormRow>

        <div className="border-t border-[#eef4f8]" />

        <SettingsFormRow label="Logo" required>
          <LogoUploadCard previewUrl={logoPreview} onFileChange={handleLogoChange} />
        </SettingsFormRow>
      </div>

      {/* Save action */}
      <div className="border-t border-[#d4e0ea] pt-4">
        <Button variant="primary" size="md" onClick={handleSave} className="min-w-[120px]">
          Save
        </Button>
      </div>
    </div>
  );
}
