import React from 'react';
import { Search, Calendar, Clock, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DVRFiltersToolbarProps {
  channels: string[];
  selectedChannel: string;
  onChannelChange: (val: string) => void;
  speeds: string[];
  selectedSpeed: string;
  onSpeedChange: (val: string) => void;
  onRefresh: () => void;
}

export const DVRFiltersToolbar: React.FC<DVRFiltersToolbarProps> = ({
  channels,
  selectedChannel,
  onChannelChange,
  speeds,
  selectedSpeed,
  onSpeedChange,
  onRefresh,
}) => {
  return (
    <div className="rounded-xl border border-white bg-white/80 backdrop-blur-sm shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] p-2.5 mb-3">
      <div className="flex items-center gap-2.5 flex-wrap">
        {/* Channel Selector */}
        <div className="relative group">
          <select
            value={selectedChannel}
            onChange={e => onChannelChange(e.target.value)}
            className="h-8 min-w-[140px] rounded-xl border border-slate-200 bg-slate-50/50 pl-8 pr-7 text-xs font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
          >
            {channels.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <Search className="h-3 w-3 text-slate-400" />
          </div>
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </div>
        </div>

        {/* Date Selector Display */}
        <div className="h-8 px-2.5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-600 shadow-sm">
          <Calendar className="h-3 w-3 text-slate-400" />
          <span>Mar 12, 2026</span>
        </div>

        {/* Time Range Display */}
        <div className="h-8 px-2.5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white text-xs font-mono font-medium text-slate-600 shadow-sm">
          <Clock className="h-3 w-3 text-slate-400" />
          <span>07:00 – 17:00</span>
        </div>

        {/* Playback Speed Segmented Control */}
        <div className="flex items-center gap-0.5 h-8 rounded-xl border border-slate-200 bg-slate-50/50 p-1">
          {speeds.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => onSpeedChange(s)}
              className={cn(
                'rounded-lg px-2.5 h-full text-2xs font-semibold tracking-tight transition-all',
                selectedSpeed === s 
                  ? 'bg-[#2e5f8a] text-white shadow-sm' 
                  : 'text-slate-500 hover:bg-white hover:text-slate-700'
              )}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex-1 min-w-[4px]" />

        {/* Primary Action */}
        <button
          type="button"
          onClick={onRefresh}
          className="flex h-8 items-center gap-2 rounded-xl bg-slate-900 px-3.5 text-xs font-medium text-white shadow-sm hover:bg-slate-800 transition-all hover:translate-y-[-1px] active:translate-y-[0px]"
        >
          <Search className="h-3 w-3 text-blue-400" /> Refresh Analysis
        </button>
      </div>
    </div>
  );
};


