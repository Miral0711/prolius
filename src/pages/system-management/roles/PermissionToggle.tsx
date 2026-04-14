import { cn } from '@/lib/utils';
import { Check, Minus } from 'lucide-react';

interface PermissionToggleProps {
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export function PermissionToggle({ checked, disabled = false, onChange, label }: PermissionToggleProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        'inline-flex h-5 w-5 items-center justify-center rounded transition-colors',
        disabled && 'cursor-not-allowed opacity-40',
        !disabled && checked && 'bg-[#3d6b8e] text-white hover:bg-[#2e5270]',
        !disabled && !checked && 'border border-[#c8d8e4] bg-[#f4f8fb] text-transparent hover:border-[#3d6b8e] hover:bg-[#eef4f8]',
      )}
    >
      {checked ? (
        <Check className="h-3 w-3" strokeWidth={2.5} />
      ) : (
        <Minus className="h-3 w-3 opacity-0" />
      )}
    </button>
  );
}
