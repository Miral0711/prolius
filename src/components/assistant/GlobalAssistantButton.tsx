import { Bot, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface GlobalAssistantButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function GlobalAssistantButton({ isOpen, onClick }: GlobalAssistantButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'fixed bottom-5 right-5 z-[200] flex size-12 items-center justify-center rounded-xl',
        'shadow-[0_4px_16px_rgba(61,107,142,0.28),0_2px_6px_rgba(61,107,142,0.16)]',
        'transition-colors duration-200',
        isOpen ? 'bg-[#2e5270]' : 'bg-[#3d6b8e]',
      )}
      aria-label={isOpen ? 'Close Prolius Assistant' : 'Open Prolius Assistant'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.span
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <X className="size-5 text-white" />
          </motion.span>
        ) : (
          <motion.span
            key="bot"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Bot className="size-5 text-white" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
