import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

interface PlaceholderTabProps {
  label: string;
}

export function PlaceholderTab({ label }: PlaceholderTabProps) {
  return (
    <div className="flex flex-col items-start gap-2 py-4">
      <p className={cn(typography.body, 'text-slate-400')}>
        {label} settings — coming soon.
      </p>
    </div>
  );
}
