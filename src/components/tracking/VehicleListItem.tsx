import { cn } from '@/lib/utils';
import { Bus } from 'lucide-react';
import { BusLiveVehicle } from '@/data/bus-live-tracking-mock-data';

interface VehicleListItemProps {
  vehicle: BusLiveVehicle;
  isSelected: boolean;
  onClick: (id: number) => void;
}

export function VehicleListItem({ vehicle, isSelected, onClick }: VehicleListItemProps) {
  return (
    <div 
      onClick={() => onClick(vehicle.id)}
      className={cn(
        "group flex items-center gap-1.5 p-1 rounded-lg border transition-all cursor-pointer relative overflow-hidden",
        isSelected 
          ? "bg-blue-50/50 border-blue-200/60 shadow-sm" 
          : "bg-white/40 hover:bg-white/60 border-transparent hover:border-slate-100"
      )}
    >
      {/* Selection vertical line indicator */}
      {isSelected && <div className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-blue-500 rounded-r-full" />}
      
      <div className={cn(
        "h-7 w-7 rounded-md flex items-center justify-center shrink-0 border transition-all duration-300",
        isSelected ? "bg-white border-blue-100 shadow-sm" : "bg-slate-50 border-slate-50 group-hover:bg-white"
      )}>
        <Bus className={cn("h-3.5 w-3.5 transition-colors", isSelected ? "text-blue-600" : "text-slate-400 group-hover:text-slate-500")} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0 leading-tight">
          <span className={cn("text-[10px] font-semibold tracking-tight uppercase truncate", isSelected ? "text-slate-800" : "text-slate-600")}>
            {vehicle.plate}
          </span>
          <div className="flex gap-1 items-center shrink-0">
            <div className={cn("h-1 w-1 rounded-full blink", 
              vehicle.status === 'Online' ? 'bg-emerald-400' : 
              vehicle.status === 'Idling' ? 'bg-amber-400' : 'bg-rose-400'
            )} />
            <span className="text-[7px] font-semibold text-slate-400 uppercase tracking-tighter">{vehicle.status}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 overflow-hidden leading-tight mt-0">
          <span className={cn("text-[8.5px] font-medium truncate", isSelected ? "text-blue-600" : "text-slate-400")}>
            {vehicle.driver || 'No Driver'}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end shrink-0 leading-tight">
        <span className={cn("text-[9.5px] font-semibold tracking-tight", isSelected ? "text-slate-800" : "text-slate-500")}>
          {vehicle.speed}<span className="text-[7.5px] font-medium opacity-60 ml-0.5">K/H</span>
        </span>
      </div>
    </div>
  );
}
