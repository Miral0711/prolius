import { cn } from '@/lib/utils';
import { 
  Wifi, 
  Clock, 
  Power, 
  AlertTriangle, 
  ShieldAlert, 
  WifiOff, 
  Bus 
} from 'lucide-react';

const KPI_ITEMS = [
  { label: 'Online', value: 342, icon: Wifi, tint: 'emerald' },
  { label: 'Idling', value: 12, icon: Clock, tint: 'blue' },
  { label: 'ACC Off', value: 84, icon: Power, tint: 'amber' },
  { label: 'Alarm', value: 5, icon: AlertTriangle, tint: 'rose' },
  { label: 'Over Error', value: 3, icon: ShieldAlert, tint: 'violet' },
  { label: 'Offline', value: 45, icon: WifiOff, tint: 'slate' },
  { label: 'Total', value: 491, icon: Bus, tint: 'indigo' },
];

interface TrackingKpiCardsProps {
  className?: string;
}

export function TrackingKpiCards({ className }: TrackingKpiCardsProps) {
  return (
    <div className={cn("grid grid-cols-7 gap-2.5", className)}>
      {KPI_ITEMS.map((k, i) => (
        <div 
          key={i} 
          className="flex items-center gap-2.5 h-[46px] bg-white/90 backdrop-blur-xl rounded-xl border border-white/60 shadow-md px-3 shrink-0 transition-all hover:bg-white hover:border-blue-200 group/card"
        >
          <div className={cn(
            "h-7 w-7 rounded-lg flex items-center justify-center shrink-0 shadow-inner border border-black/5 transition-transform group-hover/card:scale-105",
            k.tint === 'emerald' && 'bg-emerald-50 text-emerald-500',
            k.tint === 'blue' && 'bg-blue-50 text-blue-500',
            k.tint === 'amber' && 'bg-amber-50 text-amber-500',
            k.tint === 'rose' && 'bg-rose-50 text-rose-500',
            k.tint === 'violet' && 'bg-violet-50 text-violet-500',
            k.tint === 'slate' && 'bg-slate-50 text-slate-500',
            k.tint === 'indigo' && 'bg-indigo-50 text-indigo-500',
          )}>
            <k.icon className="h-3.5 w-3.5" />
          </div>
          <div className="flex flex-col justify-center -space-y-1">
            <span className="text-[14px] font-semibold text-slate-800 tracking-tight leading-tight">{k.value}</span>
            <span className="text-[8px] font-medium text-slate-400 uppercase tracking-wider leading-tight">{k.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
