import { cn } from '@/lib/utils';

const footerVariants = {
  default: 'shrink-0 border-t border-slate-200/60 py-2 text-center',
  subtle:
    'shrink-0 border-t border-slate-100/50 py-1 text-center [&>p]:py-0 [&>p]:text-[8px] [&>p]:leading-none [&>p]:font-medium [&>p]:tracking-wide [&>p]:text-slate-400/75',
} as const;

interface PageFooterProps {
  className?: string;
  variant?: keyof typeof footerVariants;
}

export function PageFooter({
  className,
  variant = 'default',
}: PageFooterProps) {
  return (
    <footer
      className={cn(footerVariants[variant], className)}
    >
      <p className="text-[9px] font-medium text-slate-400 tracking-wide">
        Copyright &copy; 2026 Blitztech Solutions FZE LLC. All rights reserved.
      </p>
    </footer>
  );
}
