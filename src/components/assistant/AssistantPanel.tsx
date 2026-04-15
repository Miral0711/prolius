import { AnimatePresence, motion } from 'motion/react';
import { AssistantHeader } from './AssistantHeader';
import { AssistantHistoryPanel } from './AssistantHistoryPanel';
import { AssistantInput } from './AssistantInput';
import { AssistantMessages } from './AssistantMessages';
import { AssistantQuickPrompts } from './AssistantQuickPrompts';
import type { AssistantMessage, Conversation } from './types';

interface AssistantPanelProps {
  isOpen: boolean;
  isMinimized: boolean;
  isHistoryOpen: boolean;
  messages: AssistantMessage[];
  isTyping: boolean;
  inputValue: string;
  conversations: Conversation[];
  activeId: string;
  onInputChange: (value: string) => void;
  onSend: (value: string) => void;
  onQuickPrompt: (prompt: string) => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleHistory: () => void;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
}

const panelVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 12, scale: 0.97 },
};

function shouldShowQuickPrompts(messages: AssistantMessage[]) {
  return messages.length <= 1;
}

export function AssistantPanel({
  isOpen,
  isMinimized,
  isHistoryOpen,
  messages,
  isTyping,
  inputValue,
  conversations,
  activeId,
  onInputChange,
  onSend,
  onQuickPrompt,
  onClose,
  onMinimize,
  onToggleHistory,
  onSelectConversation,
  onNewChat,
}: AssistantPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="assistant-panel"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed bottom-20 right-5 z-[200] flex flex-col overflow-hidden rounded-xl border border-[#d4e0ea] bg-white shadow-[0_8px_32px_rgba(61,107,142,0.14),0_2px_8px_rgba(61,107,142,0.08)]"
          style={{
            width: isHistoryOpen ? 560 : 360,
            maxHeight: isMinimized ? 'auto' : 520,
            transition: 'width 0.2s ease',
          }}
        >
          {/* Header — always visible */}
          <AssistantHeader
            onClose={onClose}
            onMinimize={onMinimize}
            onToggleHistory={onToggleHistory}
            isHistoryOpen={isHistoryOpen}
          />

          {/* Body — collapses on minimize */}
          <AnimatePresence initial={false}>
            {!isMinimized && (
              <motion.div
                key="panel-body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="flex min-h-0 flex-1 overflow-hidden"
                style={{ maxHeight: 468 }}
              >
                {/* History sidebar */}
                <AssistantHistoryPanel
                  isOpen={isHistoryOpen}
                  conversations={conversations}
                  activeId={activeId}
                  onSelect={onSelectConversation}
                  onNewChat={onNewChat}
                />

                {/* Chat area */}
                <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                  <AssistantMessages messages={messages} isTyping={isTyping} />
                  <AssistantQuickPrompts
                    onSelect={onQuickPrompt}
                    visible={shouldShowQuickPrompts(messages)}
                  />
                  <AssistantInput
                    value={inputValue}
                    onChange={onInputChange}
                    onSend={onSend}
                    disabled={isTyping}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
