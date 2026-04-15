import { History } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AssistantHistoryButtonProps {
  isActive: boolean;
  onClick: () => void;
}

export function AssistantHistoryButton({ isActive, onClick }: AssistantHistoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex size-7 items-center justify-center rounded-md transition-colors',
        isActive
          ? 'bg-[#dce8f0] text-[#3d6b8e]'
          : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600',
      )}
      aria-label="Conversation history"
      title="History"
    >
      <History className="size-3.5" />
    </button>
  );
}
