import { cn } from '@/lib/utils';
import { 
  Camera, 
  History, 
  Navigation, 
  Power, 
  X,
  Activity,
  Radio,
  Eye,
  Cpu,
  MapPin,
  Bell
} from 'lucide-react';
import { BusLiveVehicle } from '@/data/bus-live-tracking-mock-data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toAbsoluteUrl } from '@/lib/helpers';
import { ScrollArea } from '@/components/ui/scroll-area';

interface VehicleDetailsDrawerProps {
  vehicle: BusLiveVehicle | null;
  onClose: () => void;
}

function PanelHeader({ title, icon: Icon, extra }: { title: string; icon?: any; extra?: string }) {
  return (
    <div className="flex items-center justify-between gap-1 mb-2 px-1 border-b border-slate-100 pb-1.5 mt-2 first:mt-0">
      <div className="flex items-center gap-1.5">
          {Icon && <Icon className="h-3 w-3 text-blue-500" />}
        <h3 className="text-[10px] font-medium text-slate-700 uppercase tracking-wider leading-none truncate">{title}</h3>
      </div>
      {extra && <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-tighter shrink-0">{extra}</span>}
    </div>
  );
}

function GridRow({ label, value, status, theme = 'light', icon: Icon }: { 
  label: string; 
  value: string | number; 
  status?: 'online' | 'offline' | 'warn' | 'active';
  theme?: 'light' | 'soft' ;
  icon?: any;
}) {
  return (
    <div className={cn(
      "flex flex-col gap-0.5 px-2 py-1.5 rounded-md border transition-all group",
      theme === 'light' ? "bg-white border-slate-100/60" : "bg-slate-50/50 border-transparent"
    )}>
      <div className="flex items-center gap-1">
        {Icon && <Icon className="h-2 w-2 text-slate-400 group-hover:text-blue-500 transition-colors" />}
        <span className="text-[7px] font-medium text-slate-400 uppercase tracking-widest leading-none truncate">{label}</span>
      </div>
      <div className="flex items-center gap-1.5 min-w-0">
        {status && (
          <div className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0 shadow-[0_0_4px_rgba(0,0,0,0.1)]",
            status === 'online' || status === 'active' ? 'bg-emerald-500' : 
            status === 'offline' ? 'bg-slate-300' : 'bg-rose-500'
          )} />
        )}
        <span className="text-[10px] font-semibold text-slate-700 truncate leading-none">{value || '--'}</span>
      </div>
    </div>
  );
}

export function VehicleDetailsDrawer({ vehicle, onClose }: VehicleDetailsDrawerProps) {
  if (!vehicle) return null;

  return (
    <div className="h-full w-full flex flex-col bg-white overflow-hidden shadow-[-4px_0_24px_rgba(0,0,0,0.02)]">
      {/* 1. Header Section - Extremely Compact */}
      <div className="p-3 border-b border-slate-100 shrink-0 bg-slate-50/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="relative group/avatar">
              <div className="h-9 w-9 rounded-xl bg-white p-0.5 shadow-sm border border-slate-200 overflow-hidden transform transition-transform group-hover/avatar:scale-105">
                <img
                  src={toAbsoluteUrl('/media/avatars/300-11.png')}
                  className="h-full w-full rounded-lg object-cover"
                  alt="Driver"
                />
              </div>
              <div className={cn(
                "absolute -bottom-0.5 -right-0.5 h-3 w-3 border-2 border-white rounded-full shadow-sm",
                vehicle.status === 'Online' ? 'bg-emerald-500' : 'bg-slate-300'
              )} />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <h2 className="text-[12px] font-semibold text-slate-800 leading-none truncate uppercase tracking-tight">
                  {vehicle.driver || 'Driver Unknown'}
                </h2>
                <span className={cn(
                  "px-1.5 py-0.5 rounded text-[8px] font-semibold uppercase tracking-widest leading-none scale-90 origin-left",
                  vehicle.status === 'Online' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                )}>
                  {vehicle.status}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-800 text-white rounded text-[9px] font-medium uppercase tracking-tight">
                  {vehicle.plate}
                </div>
                <div className="flex items-center gap-1 text-[9px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                  R-101 <span className="text-blue-300 mx-0.5">•</span> Trip Active
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-400 hover:text-rose-500 transition-all active:scale-90 border border-transparent hover:border-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Action Bar - Dense */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: Camera, label: 'Cam', variant: 'blue' },
            { icon: History, label: 'Logs', variant: 'slate' },
            { icon: Navigation, label: 'Map', variant: 'emerald' },
            { icon: Power, label: 'Kill', variant: 'rose' }
          ].map((btn, i) => (
            <TooltipProvider key={i}>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <button className={cn(
                    "flex flex-col items-center justify-center gap-1 h-11 rounded-xl border transition-all active:scale-95 shadow-sm group",
                    btn.variant === 'blue' && "bg-blue-600 border-blue-500 text-white hover:bg-blue-700",
                    btn.variant === 'slate' && "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800",
                    btn.variant === 'emerald' && "bg-white border-emerald-100 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700",
                    btn.variant === 'rose' && "bg-white border-rose-100 text-rose-500 hover:bg-rose-50 hover:text-rose-600",
                  )}>
                    <btn.icon className={cn("h-3.5 w-3.5 transition-transform group-hover:scale-110", btn.variant === 'blue' ? "text-white" : "text-slate-400 group-hover:text-current")} />
                    <span className={cn("text-[8px] font-extrabold uppercase tracking-widest leading-none", btn.variant === 'blue' ? "text-white/90" : "text-slate-400 group-hover:text-inherit")}>{btn.label}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-900 border-none text-[10px] font-medium text-white px-3 py-1.5 rounded-lg shadow-xl translate-y-[-4px]">{btn.label} Action</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>

      {/* 2. Scrollable Data Panels */}
      <ScrollArea className="flex-1 p-3">
        <div className="flex flex-col gap-4 pb-4">
          
          {/* A. Vehicle Information */}
          <section>
            <PanelHeader title="Vehicle Information" icon={Activity} />
            <div className="grid grid-cols-2 gap-1.5">
              <GridRow label="Plate No" value={vehicle.plate} />
              <GridRow label="Vehicle Status" value={vehicle.vehicleStatus} status={vehicle.status === 'Online' ? 'online' : 'offline'} />
              <GridRow label="Current Speed" value={`${vehicle.speed} KM/H`} />
              <GridRow label="Engine Status" value={vehicle.engineStatus} status={vehicle.engineStatus === 'On' ? 'online' : 'offline'} />
              <GridRow label="Driver Login" value={vehicle.driverLogin ? 'Logged In' : 'Logged Out'} status={vehicle.driverLogin ? 'online' : 'warn'} />
              <GridRow label="Battery / Volt" value={vehicle.batteryVoltage || '24.8V'} />
            </div>
          </section>

          {/* B. Device Information */}
          <section>
            <PanelHeader title="Device Information" icon={Cpu} extra={`ver ${vehicle.mdvrVersion}`} />
            <div className="grid grid-cols-2 gap-1.5">
              <GridRow label="Device ID" value={vehicle.deviceId} theme="soft" />
              <GridRow label="MDVR Status" value={vehicle.dvrStatus} status={vehicle.dvrStatus === 'Online' ? 'online' : 'offline'} theme="soft" />
              <GridRow label="IMEI" value="864221045..." theme="soft" />
              <GridRow label="MDVR Version" value={vehicle.mdvrVersion} theme="soft" />
              <GridRow label="SIM ID" value="899661123..." theme="soft" />
              <GridRow label="App Version" value="v2.4.1" theme="soft" />
              <div className="col-span-2">
                <GridRow label="Storage / SD Card" value="128GB / 92% Free Health" theme="soft" />
              </div>
              <div className="col-span-2">
                <GridRow label="Device Time" value={vehicle.gpsTime || '--'} theme="soft" />
              </div>
            </div>
          </section>

          {/* C. Camera / Visual */}
          <section>
            <PanelHeader title="Camera / Visual" icon={Eye} />
            <div className="grid grid-cols-2 gap-1.5">
              <GridRow label="DVR Link" value={vehicle.dvrStatus} status={vehicle.dvrStatus === 'Online' ? 'online' : 'offline'} />
              <GridRow label="Camera 1" value={vehicle.camera1Status} status={vehicle.camera1Status === 'Online' ? 'active' : 'offline'} />
              <GridRow label="Camera 2" value={vehicle.camera2Status} status={vehicle.camera2Status === 'Online' ? 'active' : 'offline'} />
              <GridRow label="Connected Cams" value={vehicle.connectedCameras} />
              <GridRow label="Disconnected" value={vehicle.disconnectedCameras} status={vehicle.disconnectedCameras > 0 ? 'warn' : undefined} />
            </div>
          </section>

          {/* D. GPS & Network */}
          <section>
            <PanelHeader title="GPS & Network" icon={Radio} />
            <div className="grid grid-cols-2 gap-1.5">
              <GridRow label="GPS Status" value={vehicle.lat ? 'Fixed' : 'Searching'} status={vehicle.lat ? 'online' : 'warn'} theme="soft" />
              <GridRow label="Network Type" value="5G / LTE" theme="soft" />
              <GridRow label="Signal Quality" value="Excellent" status="online" theme="soft" />
              <GridRow label="IP Address" value="192.168.1.42" theme="soft" />
              <GridRow label="Satellites" value={`${vehicle.gpsSatellites} Locked`} theme="soft" />
              <GridRow label="Latency" value="24ms" status="online" theme="soft" />
              <div className="col-span-2">
                <GridRow 
                  label="Coordinates" 
                  value={(vehicle.lat !== null && vehicle.lng !== null) ? `${vehicle.lat.toFixed(4)}, ${vehicle.lng.toFixed(4)}` : '--'} 
                  theme="soft" 
                  icon={MapPin} 
                />
              </div>
            </div>
          </section>

          {/* E. Alerts / Ops */}
          <section>
            <PanelHeader title="Alerts & Operations" icon={Bell} />
            <div className="grid grid-cols-2 gap-1.5">
              <div className="col-span-2">
                <GridRow label="Last Alarm" value="None Detected" status="online" />
              </div>
              <GridRow label="Ignition" value={vehicle.engineStatus} />
              <GridRow label="Load" value="Optimal" status="online" />
              <GridRow label="Operator" value={vehicle.driver} />
              <GridRow label="Safety Score" value="98%" status="online" />
              <div className="col-span-2">
                <GridRow label="Terminal Area" value="Depot Zone A / Riyadh Central" />
              </div>
              <div className="col-span-2">
                <GridRow label="Geofence Zone" value="Active Operational Area" status="active" />
              </div>
            </div>
          </section>

        </div>
      </ScrollArea>

      {/* Footer Branding - Subtle */}
      <div className="px-4 py-2 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-[0.2em]">Fleet Intel v4.0</span>
        <div className="flex items-center gap-1.5">
          <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[8px] font-medium text-slate-500 uppercase">Live Stream</span>
        </div>
      </div>
    </div>
  );
}
