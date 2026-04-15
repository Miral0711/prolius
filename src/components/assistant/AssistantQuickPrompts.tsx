import { cn } from '@/lib/utils';
import { QUICK_PROMPTS } from './mock-data';

interface AssistantQuickPromptsProps {
  onSelect: (prompt: string) => void;
  visible: boolean;
}

export function AssistantQuickPrompts({ onSelect, visible }: AssistantQuickPromptsProps) {
  if (!visible) return null;

  return (
    <div className="border-t border-[#d4e0ea] px-4 py-3">
      <p className="mb-2 text-xs font-medium text-slate-400">Suggested</p>
      <div className="flex flex-wrap gap-1.5">
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onSelect(prompt)}
            className={cn(
              'rounded-full border border-[#d4e0ea] bg-white px-2.5 py-1 text-xs font-medium text-slate-600',
              'transition-colors hover:border-[#3d6b8e] hover:bg-[#eef4f8] hover:text-[#3d6b8e]',
            )}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
