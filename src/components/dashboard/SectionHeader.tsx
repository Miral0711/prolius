import { typography } from '@/lib/typography';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center gap-4 mb-2.5 group', className)}>
      <div className="flex flex-col">
        <h2
          className={cn(
            typography.denseCaps,
            'text-[10px] tracking-[0.2em] text-slate-400 group-hover:text-slate-500 transition-colors',
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <span className="text-[9px] font-normal text-slate-300 uppercase tracking-tighter -mt-0.5">
            {subtitle}
          </span>
        )}
      </div>
      <div className="flex-1 h-px bg-slate-200/50 group-hover:bg-slate-300/50 transition-colors" />
    </div>
  );
}
