import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/glass-card';
import { Input } from '@/components/ui/input';
import { Search, Filter, ChevronRight, ChevronDown, Bus, ChevronLeft, MapPin } from 'lucide-react';
import { BusLiveVehicle } from '@/data/bus-live-tracking-mock-data';
import { VehicleListItem } from './VehicleListItem';
import { typography } from '@/lib/typography';

interface VehicleListDrawerProps {
  vehicles: BusLiveVehicle[];
  isOpen: boolean;
  onClose: () => void;
  selectedId: number;
  onSelect: (id: number) => void;
}

export function VehicleListDrawer({ vehicles, onClose, selectedId, onSelect }: Omit<VehicleListDrawerProps, 'isOpen'>) {
  const [search, setSearch] = useState('');
  const [collapsedCompanies, setCollapsedCompanies] = useState<Set<string>>(new Set());

  const groups = useMemo(() => {
    const filtered = vehicles.filter(v => 
      v.plate.toLowerCase().includes(search.toLowerCase()) || 
      v.company.toLowerCase().includes(search.toLowerCase())
    );
    const map = new Map<string, BusLiveVehicle[]>();
    filtered.forEach(v => {
      const list = map.get(v.company) || [];
      list.push(v);
      map.set(v.company, list);
    });
    return Array.from(map.entries());
  }, [vehicles, search]);

  const toggleCompany = (company: string) => {
    setCollapsedCompanies(prev => {
      const next = new Set(prev);
      if (next.has(company)) next.delete(company);
      else next.add(company);
      return next;
    });
  };

  return (
    <div className="h-full w-full">
    <div className="h-full w-full flex flex-col p-3 relative overflow-hidden">
      <div className="flex items-center justify-between mb-3 px-0.5">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <Bus className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <h3 className={cn(typography.pageTitle, 'text-slate-900 leading-tight mb-0.5')}>
                Live Bus Tracking
              </h3>
              <div className="flex items-center gap-1.5">
                <div className="h-1 w-1 rounded-full bg-emerald-500" />
                <p className={cn(typography.pageSubtitle, 'text-slate-500')}>
                   {vehicles.filter(v => v.status === 'Online').length} active / {vehicles.length} total
                </p>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="h-7 w-7 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-100/50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all active:scale-90"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        {/* Search & Filter Group */}
        <div className="flex gap-1.5 mb-2.5 shrink-0">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <Input
              placeholder="Search assets..."
              className={cn(
                "w-full h-9 pl-9 pr-4 bg-slate-100/50 border-transparent hover:border-slate-200 focus:bg-white focus:border-blue-400 transition-all rounded-xl",
                typography.body,
              )}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200/50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all shrink-0">
            <Filter className="h-3 w-3" />
          </button>
        </div>

        {/* Unified Scroll Area */}
        <div className="flex-1 overflow-y-auto pr-1 -mr-1.5 scrollbar-thin scrollbar-thumb-slate-200 space-y-2">
          {groups.map(([company, groupVehicles]) => {
            const isCollapsed = collapsedCompanies.has(company);
            const onlineCount = groupVehicles.filter(v => v.status === 'Online').length;
            
            return (
              <div key={company} className="">
                <button 
                  onClick={() => toggleCompany(company)}
                  className={cn(
                    "w-full flex items-center justify-between p-1.5 rounded-lg transition-all mb-1 border group/btn",
                    isCollapsed 
                      ? "bg-slate-50/50 border-slate-100/50 hover:bg-slate-100" 
                      : "bg-blue-50/20 border-blue-100/40"
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={cn(
                      "h-7 w-7 rounded-lg flex items-center justify-center shrink-0 border transition-all",
                      isCollapsed ? "bg-white border-slate-100 text-slate-400" : "bg-blue-100 border-blue-200 text-blue-600"
                    )}>
                      <MapPin className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex flex-col items-start min-w-0">
                      <span className={cn(typography.body, 'font-medium text-slate-700 truncate tracking-tight')}>
                        {company}
                      </span>
                      <span className={cn(typography.meta, 'text-slate-500 group-hover/btn:text-blue-500 transition-colors')}>
                        {groupVehicles.length} Units • {onlineCount} Live
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                     <span className={cn(typography.meta, 'text-slate-400')}>#{groupVehicles.length}</span>
                     {isCollapsed ? <ChevronRight className="h-4 w-4 text-slate-300" /> : <ChevronDown className="h-4 w-4 text-blue-400" />}
                  </div>
                </button>
                {!isCollapsed && (
                  <div className="space-y-0.5 pl-0.5">
                    {groupVehicles.map(veh => (
                      <VehicleListItem 
                        key={veh.id} 
                        vehicle={veh} 
                        isSelected={selectedId === veh.id} 
                        onClick={onSelect} 
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {groups.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
              <Search className="h-10 w-10 mb-3 text-slate-300" />
              <p className={cn(typography.meta, 'text-slate-500')}>
                No assets matching view
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


