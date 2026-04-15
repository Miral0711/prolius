export type MessageRole = 'user' | 'assistant';

export interface AssistantMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  preview: string;
  messages: AssistantMessage[];
  createdAt: Date;
  updatedAt: Date;
}
