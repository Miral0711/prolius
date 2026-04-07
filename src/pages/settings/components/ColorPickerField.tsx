import { useRef } from 'react';
import { cn } from '@/lib/utils';

// Preset palette matching brand + common UI colors
const PALETTE = [
  '#3d6b8e', '#2e5270', '#5a8aad', '#1a3a52',
  '#e8622a', '#c94e1e', '#f59e0b', '#10b981',
  '#6366f1', '#8b5cf6', '#ec4899', '#ef4444',
  '#64748b', '#334155', '#0f172a', '#ffffff',
];

interface ColorPickerFieldProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorPickerField({ value, onChange }: ColorPickerFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-3">
      {/* Palette swatches */}
      <div className="flex flex-wrap gap-1.5">
        {PALETTE.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            title={color}
            className={cn(
              'h-7 w-7 rounded-md border-2 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3d6b8e] focus-visible:ring-offset-1',
              value === color
                ? 'border-[#3d6b8e] shadow-md scale-110'
                : 'border-transparent shadow-sm',
              color === '#ffffff' && 'border-[#d4e0ea]',
            )}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Custom color row */}
      <div className="flex items-center gap-2">
        <div
          className="h-8 w-8 shrink-0 cursor-pointer rounded-md border border-[#c8d8e4] shadow-sm"
          style={{ backgroundColor: value }}
          onClick={() => inputRef.current?.click()}
          title="Pick custom colour"
        />
        <input
          ref={inputRef}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
        />
        <span className="font-mono text-xs text-slate-500 uppercase">{value}</span>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="ml-1 rounded border border-[#d4e0ea] bg-[#f4f8fb] px-2.5 py-1 text-xs font-medium text-[#3d6b8e] hover:bg-[#eef4f8] transition-colors"
        >
          Custom…
        </button>
      </div>
    </div>
  );
}
