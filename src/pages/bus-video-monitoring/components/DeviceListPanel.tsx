import { Search, Filter, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { Checkbox } from '@/components/ui/checkbox';

export interface DeviceCompany {
  name: string;
  online: number;
  offline: number;
  totalVehicles: number;
}

interface DeviceListPanelProps {
  search: string;
  onSearchChange: (value: string) => void;
  filteredDevices: DeviceCompany[];
  selectedDevices: Set<string>;
  onToggleDevice: (
    deviceName: string,
    checked: boolean | 'indeterminate',
  ) => void;
  className?: string;
}

function DeviceRow({
  company,
  selected,
  onCheckedChange,
}: {
  company: DeviceCompany;
  selected: boolean;
  onCheckedChange: (checked: boolean | 'indeterminate') => void;
}) {
  return (
    <div
      className={cn(
        'group relative flex flex-col gap-2 p-2.5 rounded-xl border transition-all cursor-pointer mb-2',
        selected 
          ? 'bg-blue-600 border-blue-500 shadow-md' 
          : 'bg-white/50 border-white/40 hover:bg-white shadow-sm'
      )}
      onClick={() => onCheckedChange(!selected)}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Checkbox
            checked={selected}
            onCheckedChange={onCheckedChange}
            size="sm"
            className={cn("shrink-0", selected && "border-white/50 bg-white/20")}
          />
          <span
            className={cn("text-2sm font-semibold uppercase tracking-tight truncate", selected ? "text-white" : "text-slate-800")}
            title={company.name}
          >
            {company.name}
          </span>
        </div>
        <div className={cn("flex items-center gap-1 shrink-0 px-1.5 py-0.5 rounded-md text-2xs font-semibold uppercase", selected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500")}>
          <Monitor className="h-2.5 w-2.5" />
          {company.totalVehicles}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <div className={cn("h-1.5 w-1.5 rounded-full", company.online > 0 ? "bg-emerald-400" : "bg-slate-300")} />
          <span className={cn("text-2xs font-medium", selected ? "text-blue-100" : "text-slate-400")}>{company.online} Online</span>
        </div>
        <div className="flex items-center gap-1">
          <div className={cn("h-1.5 w-1.5 rounded-full", company.offline > 0 ? "bg-rose-400" : "bg-slate-300")} />
          <span className={cn("text-2xs font-medium", selected ? "text-blue-100" : "text-slate-400")}>{company.offline} Offline</span>
        </div>
      </div>
    </div>
  );
}

export function DeviceListPanel({
  search,
  onSearchChange,
  filteredDevices,
  selectedDevices,
  onToggleDevice,
  className,
}: DeviceListPanelProps) {
  return (
    <div
      className={cn(
        'flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-white/30 bg-white/60 p-3 shadow-lg backdrop-blur-xl',
        className,
      )}
    >
      <div className="mb-3 flex shrink-0 items-center justify-between px-1">
        <h3 className={typography.cardTitle}>Device List</h3>
        <span className="text-2xs font-medium text-slate-400">{filteredDevices.length} ENTITIES</span>
      </div>

      <div className="mb-4 shrink-0 space-y-2.5 px-0.5">
        <div className="relative group">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 transition-colors group-focus-within:text-blue-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search fleet, plate, driver..."
            className="w-full h-9 pl-8 pr-8 bg-white/50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
          />
          <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors">
            <Filter className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {['All', 'Online', 'Offline', 'Alert'].map((chip) => (
            <button
              key={chip}
              className={cn(
                "px-2 py-1 rounded-lg text-2xs font-semibold uppercase tracking-tight transition-all",
                chip === 'All' 
                  ? "bg-slate-800 text-white shadow-sm" 
                  : "bg-white/50 text-slate-500 border border-slate-200 hover:bg-white"
              )}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 scrollbar-thin scrollbar-thumb-slate-200">
        {filteredDevices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 opacity-40">
            <Search className="h-8 w-8 text-slate-300 mb-2" />
            <p className="text-xs font-medium uppercase text-slate-400">No records found</p>
          </div>
        ) : (
          <div className="pb-4">
            {filteredDevices.map((company) => (
              <DeviceRow
                key={company.name}
                company={company}
                selected={selectedDevices.has(company.name)}
                onCheckedChange={(checked) =>
                  onToggleDevice(company.name, checked)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


