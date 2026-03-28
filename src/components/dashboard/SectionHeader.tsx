import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

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
        <h2 className={cn(typography.sectionTitle, 'transition-colors')}>
          {title}
        </h2>
        {subtitle && (
          <span
            className={cn(
              '-mt-0.5 text-xs font-normal text-gray-400 tracking-tight',
            )}
          >
            {subtitle}
          </span>
        )}
      </div>
      <div className="flex-1 h-px bg-slate-200/50 group-hover:bg-slate-300/50 transition-colors" />
    </div>
  );
}


