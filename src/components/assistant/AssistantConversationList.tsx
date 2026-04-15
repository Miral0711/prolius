import { SquarePen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AssistantConversationItem } from './AssistantConversationItem';
import type { Conversation } from './types';

interface AssistantConversationListProps {
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
  onNewChat: () => void;
}

export function AssistantConversationList({
  conversations,
  activeId,
  onSelect,
  onNewChat,
}: AssistantConversationListProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Header row */}
      <div className="flex items-center justify-between px-3 pb-2 pt-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">History</p>
        <button
          onClick={onNewChat}
          className={cn(
            'flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-[#3d6b8e]',
            'transition-colors hover:bg-[#eef4f8]',
          )}
          title="New chat"
        >
          <SquarePen className="size-3" />
          New chat
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-1.5 pb-3 scrollbar-hide">
        {conversations.length === 0 ? (
          <p className="px-2 py-4 text-center text-xs text-slate-400">No conversations yet</p>
        ) : (
          <div className="flex flex-col gap-0.5">
            {conversations.map((conv) => (
              <AssistantConversationItem
                key={conv.id}
                conversation={conv}
                isActive={conv.id === activeId}
                onClick={() => onSelect(conv.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
