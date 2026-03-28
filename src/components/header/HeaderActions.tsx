import { Bell, Moon, Maximize } from 'lucide-react';
import { IconActionButton } from './IconActionButton';
import { LanguageSwitcher } from './LanguageSwitcher';
import { HeaderProfile } from './HeaderProfile';
import { cn } from '@/lib/utils';

interface HeaderActionsProps {
  extraActions?: React.ReactNode;
  className?: string;
}

export function HeaderActions({ extraActions, className }: HeaderActionsProps) {
  return (
    <div className={cn('flex h-full min-h-0 flex-1 items-center justify-end', className)}>
      {extraActions && (
        <div className="mr-4 flex h-7 items-center gap-1.5 border-r border-slate-200/50 pr-4">
          {extraActions}
        </div>
      )}
      
      <div className="mr-2 flex items-center gap-x-0.5 sm:mr-4 sm:gap-x-1">
        <IconActionButton icon={Bell} badge={8} aria-label="Notifications" />
        <IconActionButton icon={Moon} aria-label="Theme toggle" />
        <IconActionButton icon={Maximize} aria-label="Fullscreen toggle" />
      </div>

      <div className="mx-1 h-7 w-px bg-slate-200/60 sm:mx-2" />

      <div className="flex items-center gap-x-2 pl-2 sm:gap-x-4 sm:pl-4">
        <LanguageSwitcher />
        <div className="hidden h-7 w-px bg-slate-200/60 sm:block" />
        <HeaderProfile 
          name="Ahmad Al-Mansour"
          role="Fleet Operations Admin"
          isOnline={true}
        />
      </div>
    </div>
  );
}


