import type { ReactNode } from 'react';
import { CarFront, MapPin, RotateCcw, Search, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input, InputAddon, InputGroup as BaseInputGroup } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch, SwitchIndicator, SwitchWrapper } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function PageContainer({ children }: { children: ReactNode }) {
  return <div className="flex h-full min-h-0 flex-col">{children}</div>;
}

export function PageContentShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-2 p-0.5">
      {children}
    </div>
  );
}

export function SectionCard({
  title,
  children,
  className,
  contentClassName,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <Card className={cn('flex min-h-0 flex-col rounded-lg border-[#d7e4f3] bg-[#fbfdff] shadow-[0_10px_22px_-18px_rgba(37,99,235,0.35)]', className)}>
      <CardHeader className="min-h-10 border-b border-[#e2ebf7] px-3 py-2.5">
        <CardTitle className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500/80" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={cn('min-h-0 p-3', contentClassName)}>{children}</CardContent>
    </Card>
  );
}

export function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{title}</h3>
      <div className="h-px flex-1 bg-gradient-to-r from-blue-200/80 to-slate-200/40" />
    </div>
  );
}

export function FormField({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn('flex flex-col gap-1', className)}>
      <span className="text-[11px] font-medium text-slate-600/90">{label}</span>
      {children}
    </label>
  );
}

export function FormInput({
  label,
  placeholder,
  className,
}: {
  label: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <FormField label={label} className={className}>
      <Input variant="md" placeholder={placeholder} className="h-8.5 rounded-md border-[#d9e4f2] bg-white/90 text-[12px] text-slate-700 placeholder:text-slate-400/90" />
    </FormField>
  );
}

export function SelectDropdown({
  label,
  placeholder,
  options,
}: {
  label: string;
  placeholder: string;
  options: string[];
}) {
  return (
    <FormField label={label}>
      <Select>
        <SelectTrigger size="md" className="h-8.5 rounded-md border-[#d9e4f2] bg-white/90 text-[12px] text-slate-700 data-[placeholder]:text-slate-400/90">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
}

export function InputGroup({
  label,
  countryCode,
  placeholder,
}: {
  label: string;
  countryCode: string;
  placeholder?: string;
}) {
  return (
    <FormField label={label}>
      <BaseInputGroup>
        <InputAddon variant="md" className="rounded-s-md rounded-e-none border-[#d9e4f2] bg-[#f3f7fd] text-[12px] text-slate-600">
          {countryCode}
        </InputAddon>
        <Input variant="md" placeholder={placeholder} className="h-8.5 rounded-s-none border-[#d9e4f2] bg-white/90 text-[12px] text-slate-700 placeholder:text-slate-400/90" />
      </BaseInputGroup>
    </FormField>
  );
}

export function ToggleSwitch({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-medium text-slate-600/90">{label}</span>
      <SwitchWrapper className="w-fit" permanent>
        <Switch defaultChecked size="md" shape="square" className="h-8.5 w-28 rounded-md border border-[#d8e3f1] bg-[#eef4fb]">
          <SwitchIndicator state="off" className="text-[11px] font-semibold text-slate-600/90">
            Meter
          </SwitchIndicator>
          <SwitchIndicator state="on" className="text-[11px] font-semibold text-white">
            Fixed
          </SwitchIndicator>
        </Switch>
      </SwitchWrapper>
    </div>
  );
}

export function StatField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[#dbe6f3] bg-[#f5f9ff] px-2.5 py-2">
      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500/90">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-slate-700">{value}</p>
    </div>
  );
}

export function EmptyState({
  icon = 'map',
  title,
  description,
}: {
  icon?: 'map' | 'taxi';
  title: string;
  description: string;
}) {
  const Icon = icon === 'taxi' ? CarFront : MapPin;

  return (
    <div className="flex h-full min-h-0 items-center justify-center">
      <div className="flex max-w-[260px] flex-col items-center gap-2 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[#dbe6f3] bg-[#f4f8fe]">
          <Icon className="h-4 w-4 text-slate-500/90" />
        </div>
        <p className="text-sm font-semibold text-slate-700">{title}</p>
        <p className="text-xs leading-relaxed text-slate-500/90">{description}</p>
      </div>
    </div>
  );
}

export function MapContainer() {
  return (
    <div className="relative h-full min-h-0 overflow-hidden rounded-md border border-[#d6e3f3] bg-[#ebf3fc]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(125,211,252,0.26)_0%,rgba(241,247,255,0.84)_42%,rgba(241,247,255,0.96)_100%)]" />
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-80" viewBox="0 0 800 500" preserveAspectRatio="none" aria-hidden="true">
        <rect x="0" y="0" width="800" height="500" fill="transparent" />
        <path d="M-30 90 C100 125, 190 55, 330 90 S600 160, 835 102" stroke="#d7e5f5" strokeWidth="30" fill="none" strokeLinecap="round" />
        <path d="M-30 235 C150 176, 245 282, 390 245 S620 152, 835 228" stroke="#d4e3f4" strokeWidth="31" fill="none" strokeLinecap="round" />
        <path d="M30 455 C170 395, 270 468, 430 420 S670 352, 840 430" stroke="#dae8f6" strokeWidth="27" fill="none" strokeLinecap="round" />
        <path d="M120 60 L170 96 L145 150 L92 143 L74 98 Z" fill="#e3edf9" />
        <path d="M530 66 L628 78 L654 134 L575 168 L510 122 Z" fill="#deebf8" />
        <path d="M282 288 L360 268 L434 322 L382 386 L300 362 Z" fill="#e4eef9" />
        <path d="M46 120 L228 190 L422 164 L564 222 L742 186" stroke="#b5cde8" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M70 306 L228 258 L356 306 L522 272 L700 328" stroke="#acc8e4" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M88 168 L220 138 L328 182 L462 148 L598 178 L744 152" stroke="#c5d9ef" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeDasharray="1 8" />
        <path d="M210 198 L300 250 L376 242 L460 278 L552 264" stroke="#2f80ed" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <circle cx="210" cy="198" r="7" fill="#1d4ed8" fillOpacity="0.88" />
        <circle cx="552" cy="264" r="7" fill="#0ea5e9" fillOpacity="0.88" />
        <circle cx="300" cy="250" r="3.2" fill="#60a5fa" />
        <circle cx="376" cy="242" r="3.2" fill="#60a5fa" />
        <circle cx="460" cy="278" r="3.2" fill="#60a5fa" />
      </svg>
      <div className="absolute right-2 top-2 flex flex-col gap-1.5">
        <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md border border-blue-200/80 bg-white/95 text-blue-700 shadow-xs">
          <ZoomIn className="h-3.5 w-3.5" />
        </button>
        <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md border border-blue-200/80 bg-white/95 text-blue-700 shadow-xs">
          <ZoomOut className="h-3.5 w-3.5" />
        </button>
        <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md border border-blue-200/80 bg-white/95 text-blue-700 shadow-xs">
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="rounded-md border border-[#dce7f5] bg-white/88 px-4 py-3 text-center shadow-[0_8px_22px_-18px_rgba(30,64,175,0.45)] backdrop-blur-sm">
          <p className="text-sm font-semibold text-slate-700">Select pickup &amp; dropoff to preview route</p>
          <p className="mt-1 text-xs text-slate-500/90">The route will appear on this map</p>
        </div>
      </div>
    </div>
  );
}

export function ButtonPrimary({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Button variant="primary" size="md" className={cn('h-8 rounded-md px-4 text-[12px] font-semibold', className)}>
      {children}
    </Button>
  );
}

export function ButtonSecondary({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Button variant="outline" size="md" className={cn('h-8 rounded-md border-[#d7e3f1] bg-white text-[12px] font-semibold text-slate-600', className)}>
      {children}
    </Button>
  );
}

export function SearchField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11px] font-medium text-slate-600/90">{label}</span>
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400/90" />
        <Input variant="md" placeholder={placeholder} className="h-8.5 rounded-md border-[#d9e4f2] bg-white/90 pl-8 text-[12px] text-slate-700 placeholder:text-slate-400/90" />
      </div>
    </label>
  );
}

export function TripRemarkField() {
  return (
    <FormField label="Trip Remark">
      <Textarea
        variant="md"
        placeholder="Add a short remark"
        rows={2}
        className="min-h-[62px] resize-none rounded-md border-[#d9e4f2] bg-white/90 py-2 text-[12px] text-slate-700 placeholder:text-slate-400/90"
      />
    </FormField>
  );
}

export function CardFooterActions({ children }: { children: ReactNode }) {
  return (
    <div className="mt-auto border-t border-[#dce7f5] pt-2">
      <div className="flex items-center justify-end gap-2">{children}</div>
    </div>
  );
}
