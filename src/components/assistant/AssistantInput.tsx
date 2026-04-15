import { useRef } from 'react';
import { SendHorizonal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AssistantInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (value: string) => void;
  disabled?: boolean;
}

export function AssistantInput({ value, onChange, onSend, disabled }: AssistantInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend(value);
    }
  };

  const handleSend = () => {
    onSend(value);
    inputRef.current?.focus();
  };

  return (
    <div className="border-t border-[#d4e0ea] bg-white px-3 py-3">
      <div className="flex items-end gap-2 rounded-lg border border-[#d4e0ea] bg-[#f8fafc] px-3 py-2 focus-within:border-[#3d6b8e] focus-within:ring-1 focus-within:ring-[#3d6b8e]/20 transition-all">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about Prolius..."
          rows={1}
          disabled={disabled}
          className={cn(
            'flex-1 resize-none bg-transparent text-sm text-slate-700 placeholder:text-slate-400',
            'max-h-24 outline-none scrollbar-hide',
            'disabled:opacity-50',
          )}
          style={{ lineHeight: '1.5' }}
        />
        <button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          className={cn(
            'flex size-7 shrink-0 items-center justify-center rounded-md transition-colors',
            value.trim() && !disabled
              ? 'bg-[#3d6b8e] text-white hover:bg-[#2e5270]'
              : 'bg-slate-100 text-slate-300 cursor-not-allowed',
          )}
          aria-label="Send message"
        >
          <SendHorizonal className="size-3.5" />
        </button>
      </div>
      <p className="mt-1.5 text-center text-[10px] text-slate-400">
        Prolius Assistant · Responses are illustrative
      </p>
    </div>
  );
}
