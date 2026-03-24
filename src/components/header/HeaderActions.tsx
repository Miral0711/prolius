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
    <div className={cn("flex flex-1 items-center justify-end h-full", className)}>
      {extraActions && (
        <div className="flex items-center gap-1.5 border-r border-slate-200/50 pr-4 mr-4 h-8">
          {extraActions}
        </div>
      )}
      
      <div className="flex items-center gap-x-0.5 sm:gap-x-1 mr-2 sm:mr-4">
        <IconActionButton icon={Bell} badge={8} aria-label="Notifications" />
        <IconActionButton icon={Moon} aria-label="Theme toggle" />
        <IconActionButton icon={Maximize} aria-label="Fullscreen toggle" />
      </div>

      <div className="h-8 w-px bg-slate-200/60 mx-1 sm:mx-2" />

      <div className="flex items-center gap-x-2 sm:gap-x-4 pl-2 sm:pl-4">
        <LanguageSwitcher />
        <div className="h-8 w-px bg-slate-200/60 hidden sm:block" />
        <HeaderProfile 
          name="Ahmad Al-Mansour"
          role="Fleet Operations Admin"
          isOnline={true}
        />
      </div>
    </div>
  );
}
