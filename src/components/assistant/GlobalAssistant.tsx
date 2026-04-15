import { GlobalAssistantButton } from './GlobalAssistantButton';
import { AssistantPanel } from './AssistantPanel';
import { useAssistant } from './useAssistant';

export function GlobalAssistant() {
  const {
    isOpen,
    isMinimized,
    isHistoryOpen,
    toggle,
    close,
    toggleMinimize,
    toggleHistory,
    conversations,
    activeId,
    messages,
    isTyping,
    inputValue,
    setInputValue,
    sendMessage,
    handleQuickPrompt,
    switchConversation,
    newConversation,
  } = useAssistant();

  const handleToggle = () => {
    toggle();
  };

  return (
    <>
      <AssistantPanel
        isOpen={isOpen}
        isMinimized={isMinimized}
        isHistoryOpen={isHistoryOpen}
        messages={messages}
        isTyping={isTyping}
        inputValue={inputValue}
        conversations={conversations}
        activeId={activeId}
        onInputChange={setInputValue}
        onSend={sendMessage}
        onQuickPrompt={handleQuickPrompt}
        onClose={close}
        onMinimize={toggleMinimize}
        onToggleHistory={toggleHistory}
        onSelectConversation={switchConversation}
        onNewChat={newConversation}
      />
      <GlobalAssistantButton isOpen={isOpen} onClick={handleToggle} />
    </>
  );
}
