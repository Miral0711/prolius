import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Conversation } from './types';

interface AssistantConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

function relativeTime(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const mins = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  return `${days}d ago`;
}

export function AssistantConversationItem({
  conversation,
  isActive,
  onClick,
}: AssistantConversationItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors',
        isActive ? 'bg-[#eef4f8]' : 'hover:bg-slate-50',
      )}
    >
      <div
        className={cn(
          'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md transition-colors',
          isActive ? 'bg-[#3d6b8e] text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-[#dce8f0] group-hover:text-[#3d6b8e]',
        )}
      >
        <MessageSquare className="size-3" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-1">
          <p
            className={cn(
              'truncate text-xs font-medium',
              isActive ? 'text-[#2e5270]' : 'text-slate-700',
            )}
          >
            {conversation.title}
          </p>
          <span className="shrink-0 text-[10px] text-slate-400">
            {relativeTime(conversation.updatedAt)}
          </span>
        </div>
        {conversation.preview && (
          <p className="mt-0.5 truncate text-[11px] text-slate-400">{conversation.preview}</p>
        )}
      </div>

      {isActive && (
        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#3d6b8e]" />
      )}
    </button>
  );
}
