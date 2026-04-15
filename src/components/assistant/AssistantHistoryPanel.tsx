import { AnimatePresence, motion } from 'motion/react';
import { AssistantConversationList } from './AssistantConversationList';
import type { Conversation } from './types';

interface AssistantHistoryPanelProps {
  isOpen: boolean;
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
  onNewChat: () => void;
}

export function AssistantHistoryPanel({
  isOpen,
  conversations,
  activeId,
  onSelect,
  onNewChat,
}: AssistantHistoryPanelProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="history-panel"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 200, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="overflow-hidden border-r border-[#d4e0ea] bg-[#f8fafc]"
          style={{ minWidth: 0 }}
        >
          <div className="w-[200px]">
            <AssistantConversationList
              conversations={conversations}
              activeId={activeId}
              onSelect={onSelect}
              onNewChat={onNewChat}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
