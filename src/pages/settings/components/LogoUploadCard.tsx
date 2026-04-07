import { useRef } from 'react';
import { ImageIcon, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

interface LogoUploadCardProps {
  previewUrl: string | null;
  onFileChange: (file: File) => void;
}

export function LogoUploadCard({ previewUrl, onFileChange }: LogoUploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileChange(file);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Preview area */}
      <div
        className={cn(
          'flex h-[110px] w-[160px] items-center justify-center rounded-md border border-[#d4e0ea] bg-[#f4f8fb] shadow-sm overflow-hidden',
        )}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Logo preview"
            className="max-h-full max-w-full object-contain p-2"
          />
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-slate-300">
            <ImageIcon className="h-8 w-8" />
            <span className={cn(typography.caption, 'text-slate-400')}>No logo</span>
          </div>
        )}
      </div>

      {/* Change button */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="inline-flex w-[160px] items-center justify-center gap-1.5 rounded-md border border-[#d4e0ea] bg-[#f4f8fb] px-3 py-1.5 text-xs font-medium text-[#3d6b8e] shadow-sm hover:bg-[#eef4f8] transition-colors"
      >
        <Upload className="h-3.5 w-3.5" />
        Change image
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif"
        className="sr-only"
        onChange={handleChange}
      />

      <p className={cn(typography.caption, 'text-slate-400 leading-snug max-w-[200px]')}>
        Optimum image dimensions: 150px × 150px (jpg, png or gif)
      </p>
    </div>
  );
}
