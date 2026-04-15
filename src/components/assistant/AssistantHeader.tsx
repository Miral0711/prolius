import { Bot, Minus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AssistantHistoryButton } from './AssistantHistoryButton';

interface AssistantHeaderProps {
  onClose: () => void;
  onMinimize: () => void;
  onToggleHistory: () => void;
  isHistoryOpen: boolean;
}

export function AssistantHeader({
  onClose,
  onMinimize,
  onToggleHistory,
  isHistoryOpen,
}: AssistantHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-[#d4e0ea] bg-white px-4 py-3">
      <div className="flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-[#3d6b8e]">
          <Bot className="size-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Prolius Assistant</p>
          <div className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-500">Online</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <AssistantHistoryButton isActive={isHistoryOpen} onClick={onToggleHistory} />

        <button
          onClick={onMinimize}
          className={cn(
            'flex size-7 items-center justify-center rounded-md text-slate-400',
            'transition-colors hover:bg-slate-100 hover:text-slate-600',
          )}
          aria-label="Minimize"
        >
          <Minus className="size-3.5" />
        </button>
        <button
          onClick={onClose}
          className={cn(
            'flex size-7 items-center justify-center rounded-md text-slate-400',
            'transition-colors hover:bg-slate-100 hover:text-slate-600',
          )}
          aria-label="Close"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
