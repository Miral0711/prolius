import { useState, type ReactNode } from 'react';
import { CarFront, MapPin, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  InputGroup as BaseInputGroup,
  Input,
  InputAddon,
} from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export function PageContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex min-h-0 flex-1 flex-col', className)}>
      {children}
    </div>
  );
}

export function PageContentShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex min-h-0 flex-1 flex-col gap-2', className)}>
      {children}
    </div>
  );
}

export function SectionCard({
  title,
  children,
  className,
  contentClassName,
  headerClassName,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
}) {
  return (
    <Card
      className={cn(
        'flex min-h-0 min-w-0 flex-col overflow-hidden rounded-lg border-sky-200/80 bg-[#fbfdff] shadow-[0_10px_22px_-18px_rgba(14,165,233,0.28)]',
        className,
      )}
    >
      <CardHeader
        className={cn(
          'shrink-0 min-h-9 rounded-t-lg border-b border-sky-200/60 bg-gradient-to-r from-sky-50/95 to-transparent px-3 py-2',
          headerClassName,
        )}
      >
        <CardTitle className="flex items-center gap-1.5 text-sm font-semibold text-sky-950">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600 shadow-[0_0_0_2px_rgba(14,165,233,0.25)]" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={cn('p-3', contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}

export function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-0.5 flex items-center gap-1.5">
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sky-800">
        {title}
      </h3>
      <div className="h-px min-w-[1rem] flex-1 bg-gradient-to-r from-sky-300/80 to-sky-100/40" />
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
    <label className={cn('flex flex-col gap-px', className)}>
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
      <Input
        variant="md"
        placeholder={placeholder}
        className="h-8 rounded-md border-[#d9e4f2] bg-white/90 text-[12px] text-slate-700 placeholder:text-slate-400/90"
      />
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
        <SelectTrigger
          size="md"
          className="h-8 rounded-md border-[#d9e4f2] bg-white/90 text-[12px] text-slate-700 data-[placeholder]:text-slate-400/90"
        >
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
        <InputAddon
          variant="md"
          className="h-8 min-h-8 rounded-s-md rounded-e-none border-[#d9e4f2] bg-[#f3f7fd] text-[12px] text-slate-600"
        >
          {countryCode}
        </InputAddon>
        <Input
          variant="md"
          placeholder={placeholder}
          className="h-8 rounded-s-none border-[#d9e4f2] bg-white/90 text-[12px] text-slate-700 placeholder:text-slate-400/90"
        />
      </BaseInputGroup>
    </FormField>
  );
}

/** Meter / Fixed — unified segmented control (same selected style for both options). */
export function ToggleSwitch({ label }: { label: string }) {
  const [fixed, setFixed] = useState(false);

  const segment =
    'flex min-h-0 min-w-0 flex-1 items-center justify-center rounded-[5px] px-2 text-center text-[11px] font-semibold leading-none transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/35 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-100';

  return (
    <div className="flex flex-col gap-px">
      <span className="text-[11px] font-medium text-slate-600/90">{label}</span>
      <div
        role="group"
        aria-label={`${label}: Meter or Fixed`}
        className="grid h-8 w-full max-w-[13.5rem] grid-cols-2 gap-0.5 rounded-md border border-[#d9e4f2] bg-slate-100/70 p-0.5"
      >
        <button
          type="button"
          aria-pressed={!fixed}
          onClick={() => setFixed(false)}
          className={cn(
            segment,
            !fixed
              ? 'bg-sky-600 text-white'
              : 'bg-transparent text-slate-700 hover:bg-slate-200/50',
          )}
        >
          Meter
        </button>
        <button
          type="button"
          aria-pressed={fixed}
          onClick={() => setFixed(true)}
          className={cn(
            segment,
            fixed
              ? 'bg-sky-600 text-white'
              : 'bg-transparent text-slate-700 hover:bg-slate-200/50',
          )}
        >
          Fixed
        </button>
      </div>
    </div>
  );
}

/** Read-only value row — matches `FormInput` / `SelectDropdown` shell (label above, input-height box). */
export function StatField({ label, value }: { label: string; value: string }) {
  return (
    <FormField label={label}>
      <div
        role="status"
        aria-live="polite"
        className="flex h-8 w-full items-center rounded-md border border-[#d9e4f2] bg-white/90 px-2.5 text-[12px] font-normal text-slate-700"
      >
        {value}
      </div>
    </FormField>
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
        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-sky-200/85 bg-sky-50/90">
          <Icon className="h-4 w-4 text-sky-600" />
        </div>
        <p className="text-sm font-semibold text-slate-700">{title}</p>
        <p className="text-xs leading-relaxed text-slate-500/90">
          {description}
        </p>
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
    <Button
      variant="primary"
      size="md"
      className={cn('h-8 rounded-md px-4 text-[12px] font-semibold', className)}
    >
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
    <Button
      variant="outline"
      size="md"
      className={cn(
        'h-8 rounded-md border-[#d7e3f1] bg-white text-[12px] font-semibold text-slate-600',
        className,
      )}
    >
      {children}
    </Button>
  );
}

export function SearchField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <label className="flex flex-col gap-px">
      <span className="text-[11px] font-medium text-slate-600/90">{label}</span>
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-sky-600" />
        <Input
          variant="md"
          placeholder={placeholder}
          className="h-8 rounded-md border-[#d9e4f2] bg-white/90 pl-8 text-[12px] text-slate-700 placeholder:text-slate-400/90"
        />
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
        className="min-h-[36px] resize-none rounded-md border-[#d9e4f2] bg-white/90 py-1.5 leading-snug text-[12px] text-slate-700 placeholder:text-slate-400/90"
      />
    </FormField>
  );
}

export function CardFooterActions({ children }: { children: ReactNode }) {
  return (
    <div className="mt-auto border-t border-sky-200/60 pt-2">
      <div className="flex items-center justify-end gap-2">{children}</div>
    </div>
  );
}

export { RouteMapLeaflet as MapContainer } from './RouteMapLeaflet';
