import { useEffect, useRef } from 'react';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AssistantMessage } from './types';

interface AssistantMessagesProps {
  messages: AssistantMessage[];
  isTyping: boolean;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function AssistantMessages({ messages, isTyping }: AssistantMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4 scrollbar-hide">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={cn('flex gap-2', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
        >
          {msg.role === 'assistant' && (
            <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-[#3d6b8e]">
              <Bot className="size-3.5 text-white" />
            </div>
          )}

          <div
            className={cn(
              'max-w-[82%] rounded-xl px-3 py-2 text-sm leading-relaxed',
              msg.role === 'assistant'
                ? 'rounded-tl-sm bg-[#eef4f8] text-slate-700'
                : 'rounded-tr-sm bg-[#3d6b8e] text-white',
            )}
          >
            {msg.content}
            <p
              className={cn(
                'mt-1 text-[10px]',
                msg.role === 'assistant' ? 'text-slate-400' : 'text-blue-200',
              )}
            >
              {formatTime(msg.timestamp)}
            </p>
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex gap-2">
          <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-[#3d6b8e]">
            <Bot className="size-3.5 text-white" />
          </div>
          <div className="rounded-xl rounded-tl-sm bg-[#eef4f8] px-3 py-2.5">
            <div className="flex items-center gap-1">
              <span className="size-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
              <span className="size-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
              <span className="size-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
