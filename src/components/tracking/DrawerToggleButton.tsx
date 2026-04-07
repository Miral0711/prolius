import { Button } from '@/components/ui/button';
import { Bus, ChevronRight, ChevronLeft, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DrawerToggleButtonProps {
  onClick: () => void;
  isOpen: boolean;
  side: 'left' | 'right';
  className?: string;
}

export function DrawerToggleButton({ onClick, isOpen, side, className }: DrawerToggleButtonProps) {
  if (isOpen) return null;

  const isLeft = side === 'left';

  return (
    <Button
      onClick={onClick}
      className={cn(
        "absolute top-[68px] h-12 w-10 flex flex-col items-center justify-center gap-1 bg-white/90 backdrop-blur-xl border border-white/40 shadow-[0_8px_25px_rgba(0,0,0,0.08)] text-[#2e5f8a] hover:bg-white transition-all group z-[35]",
        isLeft 
          ? "left-0 rounded-r-xl border-l-0 hover:w-11 pr-1" 
          : "right-0 rounded-l-xl border-r-0 hover:w-11 pl-1",
        className
      )}
    >
      <div className={cn(
        "h-7 w-7 rounded-lg flex items-center justify-center transition-all group-hover:scale-110",
        isLeft ? "bg-[#e8f0f8] text-[#2e5f8a]" : "bg-indigo-50 text-indigo-600"
      )}>
        {isLeft ? <Bus className="h-4 w-4" /> : <Info className="h-4 w-4" />}
      </div>
      {isLeft ? (
        <ChevronRight className="h-3 w-3 text-slate-300 group-hover:text-[#5a8fb8] group-hover:translate-x-0.5 transition-all" />
      ) : (
        <ChevronLeft className="h-3 w-3 text-slate-300 group-hover:text-indigo-400 group-hover:-translate-x-0.5 transition-all" />
      )}
    </Button>
  );
}


