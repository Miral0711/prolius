import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { BusLiveMapCard } from '@/pages/bus-tracking/components/BusLiveMapCard';
import { DUMMY_MAP_CENTER } from '@/data/bus-live-tracking-mock-data';

interface DVRMapCardProps {
  locationName: string;
  tripInfo: string;
}

export const DVRMapCard: React.FC<DVRMapCardProps> = ({
  locationName,
  tripInfo,
}) => {
  return (
    <div className="rounded-xl border border-white bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] p-2.5 overflow-hidden transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-blue-50">
            <MapPin className="h-3 w-3 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <h2 className={cn(typography.cardTitle, 'leading-none')}>Vehicle Location</h2>
            <span className="text-2xs font-medium text-slate-400 uppercase tracking-tighter mt-1 leading-none">{locationName}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded-lg border border-slate-100">
           <Navigation className="h-2.5 w-2.5 text-slate-400 rotate-45" />
           <span className="text-2xs font-semibold text-slate-600 uppercase tracking-tight leading-none">{tripInfo}</span>
        </div>
      </div>
      
      <div className="rounded-xl overflow-hidden border border-slate-100 h-[120px] relative bg-slate-50 group">
        <BusLiveMapCard 
          center={DUMMY_MAP_CENTER} 
          marker={null} 
          height="100%" 
          className="grayscale-[0.2] transition-all group-hover:grayscale-0" 
        />
        <div className="absolute inset-0 pointer-events-none border-[1.5px] border-white/40 rounded-xl" />
      </div>
    </div>
  );
};


