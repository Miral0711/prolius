import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { PageShell } from '@/components/ui/page-shell';
import { PageSurface, PAGE_SURFACE_FOOTER_PADDING } from '@/components/layout';
import { PanelCard } from '@/components/shared/PanelCard';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ASSET_PROFILE_DETAIL_MOCK } from './mock-data';

const INTERVAL_OPTIONS = ['None', '1 week', '2 weeks', '4 weeks', '6 weeks', '8 weeks', '12 weeks', '3 months', '6 months', '12 months', '18 months', '24 months', '36 months'];
const STATUS_OPTIONS = ['Active', 'Inactive'];
const CATEGORY_OPTIONS = ['Trailers', 'Vehicles', 'Equipment'];
const SUB_CATEGORY_OPTIONS = ['Large trailer', 'Small trailer', 'Semi-trailer'];
const ODOMETER_OPTIONS = ['NA', 'Miles', 'Kilometres'];
const FUEL_OPTIONS = ['NA', 'Diesel', 'Petrol', 'Electric', 'Hybrid'];
const ENGINE_OPTIONS = ['NA', 'Diesel', 'Petrol', 'Electric'];

function FieldSelect({
  label, value, onChange, options, required, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; required?: boolean; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <label className="text-2xs font-medium text-slate-500">
        {label}{required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-full appearance-none rounded-md border border-[#d4e0ea] bg-white px-2.5 pr-7 text-xs text-slate-800 shadow-sm focus:border-[#3d6b8e] focus:outline-none focus:ring-2 focus:ring-[#3d6b8e]/20"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}

function FieldInput({
  label, value, onChange, required, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void;
  required?: boolean; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <label className="text-2xs font-medium text-slate-500">
        {label}{required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-8 rounded-md border border-[#d4e0ea] bg-white px-2.5 text-xs text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-[#3d6b8e] focus:outline-none focus:ring-2 focus:ring-[#3d6b8e]/20"
      />
    </div>
  );
}

function ImageUploadSlot({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-2xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
      <p className="text-2xs text-slate-400">No image uploaded</p>
      <button
        type="button"
        className="h-7 w-full rounded bg-[#3d6b8e] text-2xs font-medium text-white hover:bg-[#2e5270]"
      >
        Select file
      </button>
    </div>
  );
}

function DefectRow({ label }: { label: string }) {
  const [checked, setChecked] = useState(true);
  return (
    <label
      className="flex cursor-pointer items-center gap-1.5 py-[3px] hover:bg-[#f8fafc]"
      onClick={() => setChecked((v) => !v)}
    >
      <span className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border ${checked ? 'border-[#3d6b8e] bg-[#eef4f8]' : 'border-slate-300 bg-white'}`}>
        {checked && (
          <svg className="h-2 w-2 text-[#3d6b8e]" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5.5L4 8L8.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="text-xs leading-tight text-slate-700">{label}</span>
    </label>
  );
}

const EMPTY_FORM = {
  type: '',
  category: '',
  subCategory: '',
  odometerSetting: '',
  manufacturer: '',
  model: '',
  fuelType: '',
  engineType: '',
  co2gkm: '',
  serviceFrequency: '',
  tankTestInterval: '',
  adrTestInterval: '',
  corrosionInspectionInterval: '',
  ladenBrakeTestInterval: '',
  majorWheelServiceInterval: '',
  pmiInterval: '',
  rubberIntegrityTestInterval: '',
};

export default function AssetProfileAddPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const set = (key: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [key]: v }));

  // Use the default defects list from mock
  const defects = ASSET_PROFILE_DETAIL_MOCK.takeOutReturnDefects;
  const half = Math.ceil(defects.length / 2);
  const defectsCol1 = defects.slice(0, half);
  const defectsCol2 = defects.slice(half);

  return (
    <PageShell
      title="Add Asset Profile"
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
        <PageSurface.Body className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <div className="flex flex-col gap-2 pb-2">

            {/* Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/dashboard/overview" className="text-2sm text-[#3d6b8e] hover:underline">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/asset-management/profiles" className="text-2sm text-[#3d6b8e] hover:underline">Asset Profiles</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-2sm text-slate-600">Add</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* ── Main 70/30 layout ── */}
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1fr_260px]">

              {/* ── LEFT: Form ── */}
              <PanelCard noPadding>
                <div className="border-b border-slate-100 px-3 py-2">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.8px] text-[#1e3448]">Add Asset Profile</h3>
                </div>

                <div className="p-3">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <FieldInput  label="Type"         value={form.type}         onChange={set('type')}         required placeholder="Enter type" />
                    <FieldSelect label="Category"     value={form.category}     onChange={set('category')}     options={CATEGORY_OPTIONS}     required placeholder="Select" />

                    <FieldSelect label="Sub category"     value={form.subCategory}     onChange={set('subCategory')}     options={SUB_CATEGORY_OPTIONS} required placeholder="Select" />
                    <FieldSelect label="Odometer setting" value={form.odometerSetting} onChange={set('odometerSetting')} options={ODOMETER_OPTIONS}      required placeholder="Select" />

                    <FieldInput  label="Manufacturer" value={form.manufacturer} onChange={set('manufacturer')} required placeholder="Enter manufacturer" />
                    <FieldInput  label="Model"        value={form.model}        onChange={set('model')}        required placeholder="Enter model" />

                    <FieldSelect label="Fuel type"   value={form.fuelType}   onChange={set('fuelType')}   options={FUEL_OPTIONS}   placeholder="Select" />
                    <FieldSelect label="Engine type" value={form.engineType} onChange={set('engineType')} options={ENGINE_OPTIONS} placeholder="Select" />

                    <FieldInput  label="CO2 (g/km)"       value={form.co2gkm}          onChange={set('co2gkm')}          placeholder="e.g. 120" />
                    <FieldSelect label="Service frequency" value={form.serviceFrequency} onChange={set('serviceFrequency')} options={INTERVAL_OPTIONS} required placeholder="Select" />

                    <FieldSelect label="Tank test interval"    value={form.tankTestInterval}    onChange={set('tankTestInterval')}    options={INTERVAL_OPTIONS} placeholder="Select" />
                    <FieldSelect label="ADR test interval"     value={form.adrTestInterval}     onChange={set('adrTestInterval')}     options={INTERVAL_OPTIONS} placeholder="Select" />

                    <FieldSelect label="Corrosion inspection"  value={form.corrosionInspectionInterval}  onChange={set('corrosionInspectionInterval')}  options={INTERVAL_OPTIONS} placeholder="Select" />
                    <FieldSelect label="Laden brake test"      value={form.ladenBrakeTestInterval}       onChange={set('ladenBrakeTestInterval')}       options={INTERVAL_OPTIONS} placeholder="Select" />

                    <FieldSelect label="Major wheel service"   value={form.majorWheelServiceInterval}    onChange={set('majorWheelServiceInterval')}    options={INTERVAL_OPTIONS} placeholder="Select" />
                    <FieldInput  label="PMI interval"          value={form.pmiInterval}                  onChange={set('pmiInterval')}                  placeholder="e.g. 6 weeks" />

                    <FieldSelect label="Rubber integrity test" value={form.rubberIntegrityTestInterval}  onChange={set('rubberIntegrityTestInterval')}  options={['none', ...INTERVAL_OPTIONS]} placeholder="Select" />
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="flex items-center justify-end gap-2 border-t border-[#eef4f8] px-3 py-2.5">
                  <button
                    type="button"
                    onClick={() => navigate('/asset-management/profiles')}
                    className="h-8 min-w-[88px] rounded-md border border-[#d4e0ea] bg-white px-4 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/asset-management/profiles')}
                    className="h-8 min-w-[88px] rounded-md bg-[#3d6b8e] px-4 text-xs font-semibold text-white hover:bg-[#2e5270]"
                  >
                    Save
                  </button>
                </div>
              </PanelCard>

              {/* ── RIGHT: Images + Defects ── */}
              <div className="flex flex-col gap-2">

                {/* Images 2×2 */}
                <PanelCard title="Add Asset Profile Images">
                  <div className="grid grid-cols-2 gap-2">
                    <ImageUploadSlot label="Front view" />
                    <ImageUploadSlot label="Back view" />
                    <ImageUploadSlot label="Left view" />
                    <ImageUploadSlot label="Right view" />
                  </div>
                </PanelCard>

                {/* Take Out / Return Defects — 2-col scrollable */}
                <PanelCard title="Take Out / Return Defects" noPadding>
                  <div className="max-h-[340px] overflow-y-auto px-3 py-2">
                    <div className="grid grid-cols-2 gap-x-3">
                      <div>{defectsCol1.map((d) => <DefectRow key={d} label={d} />)}</div>
                      <div>{defectsCol2.map((d) => <DefectRow key={d} label={d} />)}</div>
                    </div>
                  </div>
                </PanelCard>

                {/* Ad-hoc Defects */}
                <PanelCard title="Ad-hoc Defects" noPadding>
                  <div className="flex min-h-[56px] items-center justify-center text-xs text-slate-400">
                    No ad-hoc defects defined.
                  </div>
                </PanelCard>

              </div>
            </div>

          </div>
        </PageSurface.Body>
        <PageSurface.Footer />
      </PageSurface>
    </PageShell>
  );
}
