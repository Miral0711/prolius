import { useCallback, useState } from 'react';
import { createNewConversation, getMockResponse, MOCK_CONVERSATIONS } from './mock-data';
import type { Conversation } from './types';

function generateId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/** Derive a short title from the first user message in a conversation. */
function deriveTitle(conv: Conversation): string {
  const firstUser = conv.messages.find((m) => m.role === 'user');
  if (!firstUser) return 'New conversation';
  const text = firstUser.content.trim();
  return text.length > 40 ? text.slice(0, 38) + '…' : text;
}

export function useAssistant() {
  /* ── panel state ─────────────────────────────────────────────────────── */
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  /* ── conversation state ──────────────────────────────────────────────── */
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const fresh = createNewConversation('conv-current');
    return [fresh, ...MOCK_CONVERSATIONS];
  });
  const [activeId, setActiveId] = useState<string>('conv-current');

  /* ── input / typing ──────────────────────────────────────────────────── */
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  /* ── derived ─────────────────────────────────────────────────────────── */
  const activeConversation = conversations.find((c) => c.id === activeId)!;
  const messages = activeConversation?.messages ?? [];

  /* ── panel actions ───────────────────────────────────────────────────── */
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setIsHistoryOpen(false);
  }, []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const toggleMinimize = useCallback(() => setIsMinimized((v) => !v), []);
  const toggleHistory = useCallback(() => setIsHistoryOpen((v) => !v), []);

  /* ── conversation actions ────────────────────────────────────────────── */
  const switchConversation = useCallback((id: string) => {
    setActiveId(id);
    setIsHistoryOpen(false);
    setInputValue('');
  }, []);

  const newConversation = useCallback(() => {
    const id = generateId('conv');
    const conv = createNewConversation(id);
    setConversations((prev) => [conv, ...prev]);
    setActiveId(id);
    setIsHistoryOpen(false);
    setInputValue('');
  }, []);

  /* ── messaging ───────────────────────────────────────────────────────── */
  const sendMessage = useCallback(
    (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || isTyping) return;

      const now = new Date();
      const userMsgId = generateId('msg');

      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id !== activeId) return conv;
          const updated = {
            ...conv,
            updatedAt: now,
            messages: [
              ...conv.messages,
              { id: userMsgId, role: 'user' as const, content: trimmed, timestamp: now },
            ],
          };
          // Auto-title from first user message
          if (conv.title === 'New conversation') {
            updated.title = deriveTitle(updated);
            updated.preview = trimmed.length > 50 ? trimmed.slice(0, 48) + '…' : trimmed;
          }
          return updated;
        }),
      );

      setInputValue('');
      setIsTyping(true);

      setTimeout(() => {
        const replyNow = new Date();
        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.id !== activeId) return conv;
            return {
              ...conv,
              updatedAt: replyNow,
              messages: [
                ...conv.messages,
                {
                  id: generateId('msg'),
                  role: 'assistant' as const,
                  content: getMockResponse(trimmed),
                  timestamp: replyNow,
                },
              ],
            };
          }),
        );
        setIsTyping(false);
      }, 800);
    },
    [isTyping, activeId],
  );

  const handleQuickPrompt = useCallback(
    (prompt: string) => sendMessage(prompt),
    [sendMessage],
  );

  return {
    /* panel */
    isOpen,
    isMinimized,
    isHistoryOpen,
    open,
    close,
    toggle,
    toggleMinimize,
    toggleHistory,
    /* conversations */
    conversations,
    activeId,
    activeConversation,
    messages,
    switchConversation,
    newConversation,
    /* messaging */
    inputValue,
    setInputValue,
    isTyping,
    sendMessage,
    handleQuickPrompt,
  };
}
