import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

interface SettingsFormRowProps {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingsFormRow({
  label,
  required,
  hint,
  children,
  className,
}: SettingsFormRowProps) {
  return (
    <div className={cn('grid grid-cols-[200px_1fr] items-start gap-x-6 gap-y-1', className)}>
      <div className="pt-2">
        <label className={cn(typography.label, 'text-slate-700')}>
          {label}
          {required && <span className="ml-0.5 text-[#e8622a]">*</span>}
        </label>
        {hint && (
          <p className={cn(typography.meta, 'mt-1 text-slate-400 leading-snug')}>{hint}</p>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}
