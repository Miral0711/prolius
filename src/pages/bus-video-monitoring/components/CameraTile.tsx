import { 
  Expand, 
  MapPin, 
  MicOff, 
  RefreshCw, 
  Scan, 
  Video, 
  AlertCircle,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CameraTileProps {
  id: string;
  plate: string;
  driver: string;
  location: string;
  isLive?: boolean;
  hasAlert?: boolean;
  alertType?: string;
  className?: string;
}

export function CameraTile({ 
  id, 
  plate, 
  driver, 
  location, 
  isLive = false, 
  hasAlert = false,
  alertType,
  className
}: CameraTileProps) {
  return (
    <div className={cn("group relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl transition-all hover:ring-2 hover:ring-blue-500/50", className)}>
      {/* Video Content Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <Video className="size-16 text-slate-500" strokeWidth={1} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Top Overlay: Camera Info & Status */}
      <div className="absolute top-0 inset-x-0 p-2.5 flex items-start justify-between bg-gradient-to-b from-black/80 to-transparent z-10">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold text-white uppercase tracking-wider">{id}</span>
            <span className="text-[10px] font-medium text-slate-400 opacity-80">&middot; {location}</span>
          </div>
          <p className="text-[9px] font-semibold text-blue-400 uppercase tracking-tighter leading-none">{plate}</p>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <div className={cn(
            "flex items-center gap-1.5 px-1.5 py-0.5 rounded text-[8px] font-semibold uppercase tracking-tight",
            isLive ? "bg-emerald-500 text-white animate-pulse" : "bg-slate-700 text-slate-300"
          )}>
            <div className={cn("h-1 w-1 rounded-full bg-white", isLive && "shadow-[0_0_5px_white]")} />
            {isLive ? 'LIVE' : 'OFFLINE'}
          </div>
          
          {hasAlert && (
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-600 text-white text-[8px] font-semibold uppercase">
              <AlertCircle className="h-2.5 w-2.5" />
              {alertType || 'ALERT'}
            </div>
          )}
        </div>
      </div>

      {/* Center Scanline Effect (on hover) */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      {/* Bottom Overlay: Driver & Operational Context */}
      <div className="absolute bottom-0 inset-x-0 p-2.5 flex items-end justify-between bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 transition-transform duration-300">
        <div className="flex flex-col gap-0.5">
           <div className="flex items-center gap-1 text-slate-300">
             <Clock className="h-2.5 w-2.5 text-blue-400" />
             <span className="text-[9px] font-medium opacity-80">14:42:05 GST</span>
           </div>
           <p className="text-[10px] font-semibold text-white uppercase tracking-tight">{driver}</p>
        </div>

        {/* Hover Controls */}
        <div className="flex gap-1 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-200">
          <TooltipProvider>
            {[
              { icon: Scan, label: 'Snapshot' },
              { icon: MicOff, label: 'Mute' },
              { icon: MapPin, label: 'Track' },
              { icon: RefreshCw, label: 'Switch' },
              { icon: Expand, label: 'Fullscreen', primary: true }
            ].map((btn, i) => (
              <Tooltip key={i} delayDuration={300}>
                <TooltipTrigger asChild>
                  <button className={cn(
                    "h-6 w-6 rounded flex items-center justify-center transition-all bg-black/40 border border-white/10 text-white hover:scale-110",
                    btn.primary ? "bg-blue-600 border-blue-500 hover:bg-blue-500" : "hover:bg-white/20"
                  )}>
                    <btn.icon className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-950 border-slate-800 text-[9px] font-semibold uppercase px-2 py-1">{btn.label}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
