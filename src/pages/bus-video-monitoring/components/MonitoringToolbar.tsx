import {
  LayoutGrid,
  Map,
  SquareSplitHorizontal,
  Monitor,
  Bell,
  RefreshCw,
  Expand,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export type MonitoringTab = 'video' | 'map' | 'single' | 'alert';

interface MonitoringToolbarProps {
  activeTab: MonitoringTab;
  onTabChange: (tab: MonitoringTab) => void;
}

export function MonitoringToolbar({
  activeTab,
  onTabChange,
}: MonitoringToolbarProps) {
  const tabClass = (active: boolean) =>
    cn(
      'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.03rem] transition-all',
      active
        ? 'bg-blue-600 text-white shadow-md'
        : 'text-slate-500 hover:bg-white hover:text-slate-800'
    );

  return (
    <div className="flex items-center justify-between bg-slate-100/40 p-1 rounded-xl border border-slate-200/50">
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => onTabChange('video')} className={tabClass(activeTab === 'video')}>
          <LayoutGrid className="size-3.5" />
          GRID_VIEW
        </button>
        <button type="button" onClick={() => onTabChange('single')} className={tabClass(activeTab === 'single')}>
          <Monitor className="size-3.5" />
          SINGLE
        </button>
        <button type="button" onClick={() => onTabChange('map')} className={tabClass(activeTab === 'map')}>
          <Map className="size-3.5" />
          MAP_VIEW
        </button>
        <button type="button" onClick={() => onTabChange('alert')} className={tabClass(activeTab === 'alert')}>
          <Bell className="size-3.5" />
          ALERT_MODE
        </button>
      </div>

      <div className="flex items-center gap-2 px-2">
        <div className="flex items-center gap-1.5 border-r border-slate-300 pr-2 mr-1">
          <TooltipProvider>
            {[
              { icon: RefreshCw, label: 'Refresh Feeds' },
              { icon: Expand, label: 'Expand All' },
              { icon: Zap, label: 'Focus Alerts' },
              { icon: SquareSplitHorizontal, label: 'Switch Layout' },
            ].map((action, i) => (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                   <button className="h-7 w-7 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-sm">
                     <action.icon className="h-3.5 w-3.5" />
                   </button>
                </TooltipTrigger>
                <TooltipContent className="text-2xs font-semibold uppercase">{action.label}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
        
        <button className="h-7 px-3 bg-blue-50 text-blue-600 rounded-lg text-2xs font-semibold uppercase border border-blue-200 hover:bg-blue-100 transition-colors">
          LIVE_RECORDS (124)
        </button>
      </div>
    </div>
  );
}


