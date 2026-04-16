import { useState, useMemo } from 'react';
import {
  Activity,
  AlertTriangle,
  Bus,
  Camera,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cpu,
  Globe,
  Info,
  LocateFixed,
  MapPin,
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
  Search,
  Shield,
  User,
  X,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageFooter } from '@/components/shared/PageFooter';

/* ─── Types ──────────────────────────────────────────────────────────────── */
type VehicleStatus = 'Online' | 'Idling' | 'Offline' | 'Alarm' | 'ACC Off';

interface Vehicle {
  id: string;
  plateNo: string;
  driver: string;
  status: VehicleStatus;
  speed: number;
  route: string;
  engineStatus: 'On' | 'Off';
  driverLogin: 'Logged In' | 'Logged Out';
  battery: string;
  deviceId: string;
  imei: string;
  simId: string;
  mdvrStatus: 'Online' | 'Offline';
  mdvrVersion: string;
  appVersion: string;
  storage: string;
  deviceTime: string;
  // Camera
  dvrLink: string;
  cam1: string;
  cam2: string;
  connectedCams: string;
  disconnectedCams: number;
  // GPS & Network
  gpsStatus: string;
  networkType: string;
  signalQuality: string;
  ipAddress: string;
  satellites: string;
  latency: string;
  coordinates: string;
  // Alerts & Operations
  lastAlarm: string;
  ignition: 'On' | 'Off';
  load: string;
  operator: string;
  safetyScore: string;
  terminalArea: string;
  geofenceZone: string;
  x: number;
  y: number;
  groupId: string;
}

interface Group {
  id: string;
  name: string;
}

/* ─── Static data ────────────────────────────────────────────────────────── */
const GROUPS: Group[] = [
  { id: 'g1', name: 'Blitztech Solutions' },
  { id: 'g2', name: 'Maged Ghalab Est' },
];

const VEHICLES: Vehicle[] = [
  { id: 'v1', plateNo: 'KSA0001', driver: 'xyz',      status: 'Offline', speed: 0,  route: 'Depot A',          engineStatus: 'On',  driverLogin: 'Logged In',  battery: '24.8V', deviceId: '3254', imei: '864221045...', simId: '899661123...', mdvrStatus: 'Offline', mdvrVersion: 'T241008', appVersion: 'v2.4.1', storage: '128GB / 92% Free', deviceTime: '22-10-2024 14:28', dvrLink: 'Offline', cam1: 'Offline', cam2: 'Offline', connectedCams: '--', disconnectedCams: 2, gpsStatus: 'Searching', networkType: '5G / LTE', signalQuality: 'Excellent', ipAddress: '192.168.1.42', satellites: '-1 Locked', latency: '24ms', coordinates: '--', lastAlarm: 'None Detected', ignition: 'On', load: 'Optimal', operator: 'xyz', safetyScore: '98%', terminalArea: 'Depot Zone A / Riyadh Central', geofenceZone: 'Active Operational Area', x: 30, y: 35, groupId: 'g1' },
  { id: 'v2', plateNo: 'AVI001',   driver: '',         status: 'Offline', speed: 0,  route: 'Depot A',          engineStatus: 'Off', driverLogin: 'Logged Out', battery: '12.1V', deviceId: '3255', imei: '864221046...', simId: '899661124...', mdvrStatus: 'Offline', mdvrVersion: 'T241008', appVersion: 'v2.4.1', storage: '64GB / 88% Free',  deviceTime: '22-10-2024 13:10', dvrLink: 'Offline', cam1: 'Offline', cam2: 'Offline', connectedCams: '--', disconnectedCams: 2, gpsStatus: 'No Fix',    networkType: '4G',      signalQuality: 'Poor',      ipAddress: '192.168.1.43', satellites: '0 Locked',  latency: '--',   coordinates: '--', lastAlarm: 'None Detected', ignition: 'Off', load: '--',      operator: '--',  safetyScore: '--',  terminalArea: 'Depot Zone A',                  geofenceZone: 'Inactive',                  x: 48, y: 22, groupId: 'g1' },
  { id: 'v3', plateNo: 'AVI0012',  driver: '',         status: 'Offline', speed: 0,  route: 'Depot B',          engineStatus: 'Off', driverLogin: 'Logged Out', battery: '11.9V', deviceId: '3256', imei: '864221047...', simId: '899661125...', mdvrStatus: 'Offline', mdvrVersion: 'T241008', appVersion: 'v2.4.1', storage: '64GB / 75% Free',  deviceTime: '21-10-2024 22:00', dvrLink: 'Offline', cam1: 'Offline', cam2: 'Offline', connectedCams: '--', disconnectedCams: 2, gpsStatus: 'No Fix',    networkType: '4G',      signalQuality: 'Fair',      ipAddress: '192.168.1.44', satellites: '0 Locked',  latency: '--',   coordinates: '--', lastAlarm: 'None Detected', ignition: 'Off', load: '--',      operator: '--',  safetyScore: '--',  terminalArea: 'Depot Zone B',                  geofenceZone: 'Inactive',                  x: 62, y: 18, groupId: 'g1' },
  { id: 'v4', plateNo: 'AVI00123', driver: '',         status: 'Offline', speed: 0,  route: 'Depot B',          engineStatus: 'Off', driverLogin: 'Logged Out', battery: '12.0V', deviceId: '3257', imei: '864221048...', simId: '899661126...', mdvrStatus: 'Offline', mdvrVersion: 'T241008', appVersion: 'v2.4.1', storage: '64GB / 80% Free',  deviceTime: '21-10-2024 20:45', dvrLink: 'Offline', cam1: 'Offline', cam2: 'Offline', connectedCams: '--', disconnectedCams: 2, gpsStatus: 'No Fix',    networkType: '4G',      signalQuality: 'Fair',      ipAddress: '192.168.1.45', satellites: '0 Locked',  latency: '--',   coordinates: '--', lastAlarm: 'None Detected', ignition: 'Off', load: '--',      operator: '--',  safetyScore: '--',  terminalArea: 'Depot Zone B',                  geofenceZone: 'Inactive',                  x: 75, y: 30, groupId: 'g1' },
  { id: 'v5', plateNo: 'HSA1098',  driver: 'Driver A', status: 'Online',  speed: 42, route: 'Riyadh → Jeddah', engineStatus: 'On',  driverLogin: 'Logged In',  battery: '27.2V', deviceId: '3258', imei: '864221049...', simId: '899661127...', mdvrStatus: 'Online',  mdvrVersion: 'T241008', appVersion: 'v2.4.1', storage: '128GB / 95% Free', deviceTime: '22-10-2024 14:30', dvrLink: 'Online',  cam1: 'Online',  cam2: 'Online',  connectedCams: '2',  disconnectedCams: 0, gpsStatus: 'Fixed',     networkType: '5G / LTE', signalQuality: 'Excellent', ipAddress: '192.168.1.46', satellites: '8 Locked',  latency: '18ms', coordinates: '24.7136° N, 46.6753° E', lastAlarm: 'None Detected', ignition: 'On', load: 'Optimal', operator: 'Driver A', safetyScore: '96%', terminalArea: 'Riyadh Central',               geofenceZone: 'Active Operational Area', x: 22, y: 55, groupId: 'g2' },
  { id: 'v6', plateNo: 'ASA8887',  driver: 'Driver B', status: 'Idling',  speed: 0,  route: 'City Center',      engineStatus: 'On',  driverLogin: 'Logged In',  battery: '26.5V', deviceId: '3259', imei: '864221050...', simId: '899661128...', mdvrStatus: 'Online',  mdvrVersion: 'T241008', appVersion: 'v2.4.1', storage: '128GB / 91% Free', deviceTime: '22-10-2024 14:25', dvrLink: 'Online',  cam1: 'Online',  cam2: 'Offline', connectedCams: '1',  disconnectedCams: 1, gpsStatus: 'Fixed',     networkType: '4G',      signalQuality: 'Good',      ipAddress: '192.168.1.47', satellites: '6 Locked',  latency: '32ms', coordinates: '24.6877° N, 46.7219° E', lastAlarm: 'None Detected', ignition: 'On', load: 'Optimal', operator: 'Driver B', safetyScore: '91%', terminalArea: 'City Center Zone',             geofenceZone: 'Active Operational Area', x: 50, y: 48, groupId: 'g2' },
  { id: 'v7', plateNo: 'XSA4247',  driver: 'Driver C', status: 'Online',  speed: 55, route: 'Dammam → Khobar', engineStatus: 'On',  driverLogin: 'Logged In',  battery: '27.8V', deviceId: '3260', imei: '864221051...', simId: '899661129...', mdvrStatus: 'Online',  mdvrVersion: 'T241008', appVersion: 'v2.4.1', storage: '128GB / 89% Free', deviceTime: '22-10-2024 14:31', dvrLink: 'Online',  cam1: 'Online',  cam2: 'Online',  connectedCams: '2',  disconnectedCams: 0, gpsStatus: 'Fixed',     networkType: '5G / LTE', signalQuality: 'Excellent', ipAddress: '192.168.1.48', satellites: '9 Locked',  latency: '15ms', coordinates: '26.4207° N, 50.0888° E', lastAlarm: 'None Detected', ignition: 'On', load: 'Optimal', operator: 'Driver C', safetyScore: '99%', terminalArea: 'Dammam Industrial Zone',        geofenceZone: 'Active Operational Area', x: 68, y: 62, groupId: 'g2' },
  { id: 'v8', plateNo: 'HSA1167',  driver: 'Driver D', status: 'Offline', speed: 0,  route: 'Service Center',  engineStatus: 'Off', driverLogin: 'Logged Out', battery: '11.5V', deviceId: '3261', imei: '864221052...', simId: '899661130...', mdvrStatus: 'Offline', mdvrVersion: 'T241008', appVersion: 'v2.4.1', storage: '64GB / 70% Free',  deviceTime: '20-10-2024 09:00', dvrLink: 'Offline', cam1: 'Offline', cam2: 'Offline', connectedCams: '--', disconnectedCams: 2, gpsStatus: 'No Fix',    networkType: '4G',      signalQuality: 'Poor',      ipAddress: '192.168.1.49', satellites: '0 Locked',  latency: '--',   coordinates: '--', lastAlarm: 'Low Battery',   ignition: 'Off', load: '--',      operator: 'Driver D', safetyScore: '87%', terminalArea: 'Service Center / Riyadh South', geofenceZone: 'Maintenance Zone',        x: 82, y: 72, groupId: 'g2' },
];

/* ─── Status config ──────────────────────────────────────────────────────── */
const STATUS_CFG: Record<VehicleStatus, {
  dot: string; text: string; mapColor: string;
  chipBg: string; chipBorder: string; chipText: string;
}> = {
  Online:    { dot: 'bg-emerald-500', text: 'text-emerald-600', mapColor: '#10b981', chipBg: 'bg-emerald-50',  chipBorder: 'border-emerald-200', chipText: 'text-emerald-700' },
  Idling:    { dot: 'bg-amber-400',   text: 'text-amber-600',   mapColor: '#f59e0b', chipBg: 'bg-amber-50',    chipBorder: 'border-amber-200',   chipText: 'text-amber-700'   },
  Offline:   { dot: 'bg-slate-400',   text: 'text-slate-500',   mapColor: '#94a3b8', chipBg: 'bg-slate-50',    chipBorder: 'border-slate-200',   chipText: 'text-slate-600'   },
  Alarm:     { dot: 'bg-rose-500',    text: 'text-rose-600',    mapColor: '#ef4444', chipBg: 'bg-rose-50',     chipBorder: 'border-rose-200',    chipText: 'text-rose-700'    },
  'ACC Off': { dot: 'bg-violet-400',  text: 'text-violet-600',  mapColor: '#8b5cf6', chipBg: 'bg-violet-50',   chipBorder: 'border-violet-200',  chipText: 'text-violet-700'  },
};

const STATUS_BAR_ITEMS = [
  { key: 'Online'   as const, label: 'Online',   count: VEHICLES.filter(v => v.status === 'Online').length   },
  { key: 'Idling'   as const, label: 'Idling',   count: VEHICLES.filter(v => v.status === 'Idling').length   },
  { key: 'ACC Off'  as const, label: 'ACC Off',  count: VEHICLES.filter(v => v.status === 'ACC Off').length  },
  { key: 'Alarm'    as const, label: 'Alarm',    count: VEHICLES.filter(v => v.status === 'Alarm').length    },
  { key: 'Offline'  as const, label: 'Offline',  count: VEHICLES.filter(v => v.status === 'Offline').length  },
];

/* ─── Shared atoms ───────────────────────────────────────────────────────── */
function StatusDot({ status, size = 'sm' }: { status: VehicleStatus; size?: 'xs' | 'sm' }) {
  const cfg = STATUS_CFG[status];
  const pulse = status === 'Online' || status === 'Alarm';
  const dim = size === 'xs' ? 'h-1.5 w-1.5' : 'h-2 w-2';
  return (
    <span className={cn('relative flex shrink-0', dim)}>
      {pulse && <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-50', cfg.dot)} />}
      <span className={cn('relative inline-flex rounded-full', dim, cfg.dot)} />
    </span>
  );
}

/** Single label → value row. `wide` spans full width for long values. */
function DR({
  label, value, valueClass, wide = false,
}: { label: string; value: string; valueClass?: string; wide?: boolean }) {
  return (
    <div className={cn(
      'flex min-h-[26px] items-start justify-between gap-3 border-b border-[#f0f4f8] py-[5px] last:border-0',
      wide && 'flex-col gap-0.5',
    )}>
      <span className="shrink-0 text-[10.5px] leading-snug text-slate-400">{label}</span>
      <span className={cn(
        'text-[10.5px] font-medium leading-snug text-slate-700',
        wide ? 'w-full' : 'text-right',
        valueClass,
      )}>
        {value || '—'}
      </span>
    </div>
  );
}

/** Collapsible section block used inside the detail panel */
function Section({
  icon: Icon, title, meta, defaultOpen = true, children,
}: {
  icon: React.ElementType;
  title: string;
  meta?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#eef4f8] last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center gap-2 px-4 py-2.5 text-left transition-colors hover:bg-[#f8fafc]"
      >
        <Icon className="h-3.5 w-3.5 shrink-0 text-[#3d6b8e]" />
        <span className="flex-1 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-slate-600">
          {title}
        </span>
        {meta && (
          <span className="mr-1 text-[10px] tabular-nums text-slate-400">{meta}</span>
        )}
        <ChevronDown className={cn(
          'h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform duration-200',
          open && 'rotate-180',
        )} />
      </button>
      {open && (
        <div className="px-4 pb-2.5 pt-0">
          {children}
        </div>
      )}
    </div>
  );
}

/* ─── Vehicle list row ───────────────────────────────────────────────────── */
function VehicleRow({
  vehicle, selected, onClick,
}: { vehicle: Vehicle; selected: boolean; onClick: () => void }) {
  const cfg = STATUS_CFG[vehicle.status];
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative flex w-full items-center gap-2.5 border-b border-[#eef4f8] px-3 py-2.5 text-left transition-all duration-150',
        selected
          ? 'bg-[#eef4f8] before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:rounded-r before:bg-[#3d6b8e]'
          : 'hover:bg-[#f7fafc]',
      )}
    >
      {/* Icon */}
      <div className={cn(
        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors',
        selected
          ? 'border-[#3d6b8e]/30 bg-[#3d6b8e]/10'
          : 'border-[#d4e0ea] bg-[#f0f4f8] group-hover:border-[#c0d0dc]',
      )}>
        <Bus className={cn('h-3.5 w-3.5', selected ? 'text-[#3d6b8e]' : 'text-slate-400')} />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className={cn('text-[11.5px] font-semibold leading-tight', selected ? 'text-[#2e5270]' : 'text-slate-800')}>
          {vehicle.plateNo}
        </p>
        <p className="mt-0.5 truncate text-[10px] leading-tight text-slate-400">
          {vehicle.driver || <span className="italic text-slate-300">No driver</span>}
        </p>
      </div>

      {/* Status + speed */}
      <div className="flex shrink-0 flex-col items-end gap-1">
        <div className="flex items-center gap-1">
          <StatusDot status={vehicle.status} size="xs" />
          <span className={cn('text-[10px] font-medium leading-none', cfg.text)}>{vehicle.status}</span>
        </div>
        <span className="text-[10px] tabular-nums leading-none text-slate-400">
          {vehicle.speed > 0 ? `${vehicle.speed} km/h` : '—'}
        </span>
      </div>
    </button>
  );
}

/* ─── Detail panel ───────────────────────────────────────────────────────── */
type DetailTab = 'info' | 'logs' | 'map' | 'kill';

const DETAIL_TABS: { id: DetailTab; label: string; Icon: React.ElementType }[] = [
  { id: 'info', label: 'Info',  Icon: Info     },
  { id: 'logs', label: 'Logs',  Icon: Clock    },
  { id: 'map',  label: 'Map',   Icon: MapPin   },
  { id: 'kill', label: 'Kill',  Icon: Zap      },
];

function VehicleDetailPanel({ vehicle, onClose }: { vehicle: Vehicle; onClose: () => void }) {
  const [tab, setTab] = useState<DetailTab>('info');
  const cfg = STATUS_CFG[vehicle.status];

  return (
    <div className="flex h-full flex-col overflow-hidden border-l border-[#d4e0ea] bg-white shadow-[-4px_0_16px_rgba(61,107,142,0.06)]">

      {/* ── Identity header (sticky) ─────────────────────────────────────── */}
      <div className="shrink-0 border-b border-[#d4e0ea] bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef4f8] ring-1 ring-[#d4e0ea]">
            <User className="h-[18px] w-[18px] text-[#3d6b8e]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold leading-tight text-slate-800">
                {vehicle.driver || 'Unassigned'}
              </span>
              <span className={cn('flex items-center gap-1 text-[10.5px] font-medium', cfg.text)}>
                <StatusDot status={vehicle.status} size="xs" />
                {vehicle.status}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close panel"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-[#f0f4f8] hover:text-slate-600"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-1.5 pl-[48px]">
          <span className="rounded-[4px] bg-[#3d6b8e] px-2 py-[3px] text-[10.5px] font-bold tracking-wide text-white">
            {vehicle.plateNo}
          </span>
          <span className="text-[10.5px] text-slate-400">R 101</span>
          <span className="rounded-[4px] border border-emerald-200 bg-emerald-50 px-2 py-[3px] text-[10.5px] font-semibold text-emerald-700">
            Trip Active
          </span>
        </div>
      </div>

      {/* ── Tab bar (sticky) ─────────────────────────────────────────────── */}
      <div className="shrink-0 border-b border-[#d4e0ea] bg-[#f8fafc]">
        <div className="flex">
          {DETAIL_TABS.map(({ id, label, Icon }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={cn(
                  'relative flex flex-1 flex-col items-center justify-center gap-[3px] py-2.5 text-[10.5px] font-medium transition-colors',
                  active ? 'bg-white text-[#3d6b8e]' : 'text-slate-400 hover:bg-white/60 hover:text-slate-600',
                )}
              >
                <Icon className="h-[14px] w-[14px]" />
                <span className="leading-none">{label}</span>
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-t-full bg-[#3d6b8e]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Scrollable content ───────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto [scrollbar-gutter:stable]">

        {/* ── INFO tab ── */}
        {tab === 'info' && (
          <div>
            {/* 1. Vehicle Information */}
            <Section icon={Info} title="Vehicle Information" defaultOpen>
              <DR label="Plate No"       value={vehicle.plateNo} />
              <DR label="Vehicle Status" value="No GPS"          valueClass="text-slate-400" />
              <DR label="Current Speed"  value={vehicle.speed > 0 ? `${vehicle.speed} KM/H` : '0 KM/H'} />
              <DR label="Engine Status"  value={vehicle.engineStatus}
                valueClass={vehicle.engineStatus === 'On' ? 'text-emerald-600' : 'text-slate-500'} />
              <DR label="Driver Login"   value={vehicle.driverLogin}
                valueClass={vehicle.driverLogin === 'Logged In' ? 'text-emerald-600' : 'text-slate-500'} />
              <DR label="Battery / Volt" value={vehicle.battery} />
            </Section>

            {/* 2. Device Information */}
            <Section icon={Cpu} title="Device Information" meta={`ver: ${vehicle.mdvrVersion}`} defaultOpen>
              <DR label="Device ID"     value={vehicle.deviceId} />
              <DR label="MDVR Status"   value={vehicle.mdvrStatus}
                valueClass={vehicle.mdvrStatus === 'Online' ? 'text-emerald-600' : 'text-slate-400'} />
              <DR label="IMEI"          value={vehicle.imei} />
              <DR label="MDVR Version"  value={vehicle.mdvrVersion} />
              <DR label="SIM ID"        value={vehicle.simId} />
              <DR label="App Version"   value={vehicle.appVersion} />
              <DR label="Storage / SD Card" value={vehicle.storage} wide />
              <DR label="Device Time"   value={vehicle.deviceTime} />
            </Section>

            {/* 3. Camera / Visual */}
            <Section icon={Camera} title="Camera / Visual" defaultOpen={false}>
              <DR label="DVR Link"         value={vehicle.dvrLink}
                valueClass={vehicle.dvrLink === 'Online' ? 'text-emerald-600' : 'text-slate-400'} />
              <DR label="Camera 1"         value={vehicle.cam1}
                valueClass={vehicle.cam1 === 'Online' ? 'text-emerald-600' : 'text-slate-400'} />
              <DR label="Camera 2"         value={vehicle.cam2}
                valueClass={vehicle.cam2 === 'Online' ? 'text-emerald-600' : 'text-slate-400'} />
              <DR label="Connected Cams"   value={vehicle.connectedCams} />
              <DR label="Disconnected"     value={String(vehicle.disconnectedCams)} />
            </Section>

            {/* 4. GPS & Network */}
            <Section icon={Globe} title="GPS & Network" defaultOpen={false}>
              <DR label="GPS Status"      value={vehicle.gpsStatus}
                valueClass={vehicle.gpsStatus === 'Fixed' ? 'text-emerald-600' : 'text-amber-600'} />
              <DR label="Network Type"    value={vehicle.networkType} />
              <DR label="Signal Quality"  value={vehicle.signalQuality}
                valueClass={vehicle.signalQuality === 'Excellent' ? 'text-emerald-600' : vehicle.signalQuality === 'Good' ? 'text-blue-600' : 'text-amber-600'} />
              <DR label="IP Address"      value={vehicle.ipAddress} />
              <DR label="Satellites"      value={vehicle.satellites} />
              <DR label="Latency"         value={vehicle.latency} />
              <DR label="Coordinates"     value={vehicle.coordinates} wide />
            </Section>

            {/* 5. Alerts & Operations */}
            <Section icon={Shield} title="Alerts & Operations" defaultOpen={false}>
              <DR label="Last Alarm"      value={vehicle.lastAlarm}
                valueClass={vehicle.lastAlarm === 'None Detected' ? 'text-emerald-600' : 'text-rose-600'} />
              <DR label="Ignition"        value={vehicle.ignition}
                valueClass={vehicle.ignition === 'On' ? 'text-emerald-600' : 'text-slate-500'} />
              <DR label="Load"            value={vehicle.load} />
              <DR label="Operator"        value={vehicle.operator} />
              <DR label="Safety Score"    value={vehicle.safetyScore}
                valueClass="text-emerald-600 font-semibold" />
              <DR label="Terminal Area"   value={vehicle.terminalArea} wide />
              <DR label="Geofence Zone"   value={vehicle.geofenceZone} wide />
            </Section>

            {/* Live stream footer */}
            <div className="flex items-center justify-end px-4 py-2.5">
              <button className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-semibold text-[#3d6b8e] transition-colors hover:bg-[#eef4f8]">
                <Activity className="h-3 w-3" />
                Live stream
              </button>
            </div>
          </div>
        )}

        {/* ── LOGS tab ── */}
        {tab === 'logs' && (
          <div className="space-y-1.5 px-4 py-3">
            {[
              { time: '14:32:10', event: 'Engine turned ON',  type: 'info'    },
              { time: '14:28:45', event: 'Speed: 42 KM/H',    type: 'info'    },
              { time: '14:15:00', event: 'Driver logged in',  type: 'success' },
              { time: '13:55:22', event: 'Engine turned OFF', type: 'warning' },
              { time: '13:40:11', event: 'GPS signal lost',   type: 'error'   },
            ].map((log, i) => (
              <div key={i} className="flex items-start gap-2.5 rounded-lg border border-[#eef4f8] bg-[#f8fafc] px-3 py-2">
                <span className="mt-px shrink-0 text-[10px] tabular-nums text-slate-400">{log.time}</span>
                <span className={cn('text-[11px] font-medium leading-snug', {
                  'text-rose-600':    log.type === 'error',
                  'text-amber-600':   log.type === 'warning',
                  'text-emerald-600': log.type === 'success',
                  'text-slate-700':   log.type === 'info',
                })}>{log.event}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── MAP tab ── */}
        {tab === 'map' && (
          <div className="flex flex-col items-center justify-center gap-3 px-4 py-12 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef4f8] ring-1 ring-[#d4e0ea]">
              <MapPin className="h-5 w-5 text-[#3d6b8e]" />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-slate-700">Vehicle on main map</p>
              <p className="mt-1 text-[10.5px] text-slate-400">{vehicle.coordinates || '—'}</p>
            </div>
          </div>
        )}

        {/* ── KILL tab ── */}
        {tab === 'kill' && (
          <div className="flex flex-col items-center justify-center gap-4 px-4 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-rose-200 bg-rose-50">
              <Zap className="h-6 w-6 text-rose-500" />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-slate-700">Remote Engine Kill</p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">
                Send a command to remotely<br />disable the vehicle engine.
              </p>
            </div>
            <button className="rounded-lg bg-rose-600 px-5 py-2 text-[11.5px] font-semibold text-white shadow-sm transition-colors hover:bg-rose-700 active:bg-rose-800">
              Send Kill Command
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Tracking Map ───────────────────────────────────────────────────────── */
function TrackingMap({
  vehicles, selectedId, onSelect,
}: { vehicles: Vehicle[]; selectedId: string | null; onSelect: (id: string) => void }) {
  const [zoom, setZoom] = useState(1);
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredVehicle = vehicles.find(v => v.id === hovered);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#e8eef7]">

      {/* SVG city grid */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* City blocks */}
        {([
          [2,2,16,11],[20,2,17,11],[40,2,17,11],[60,2,17,11],[80,2,17,11],
          [2,17,16,18],[20,17,17,18],[40,17,17,18],[60,17,17,18],[80,17,17,18],
          [2,40,16,14],[20,40,17,14],[40,40,17,14],[60,40,17,14],[80,40,17,14],
          [2,59,16,13],[20,59,17,13],[40,59,17,13],[60,59,17,13],[80,59,17,13],
          [2,77,16,21],[20,77,17,21],[40,77,17,21],[60,77,17,21],[80,77,17,21],
        ] as [number,number,number,number][]).map(([x,y,w,h],i) => (
          <rect key={i} x={`${x}%`} y={`${y}%`} width={`${w}%`} height={`${h}%`} rx="3" fill="#dce5f0" stroke="#c8d5e8" strokeWidth="0.5" />
        ))}
        {/* Major roads */}
        {([[0,15,100,15],[0,38,100,38],[0,57,100,57],[0,76,100,76],[20,0,20,100],[40,0,40,100],[60,0,60,100],[80,0,80,100]] as [number,number,number,number][]).map(([x1,y1,x2,y2],i) => (
          <line key={`r${i}`} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`} stroke="#bfcfe0" strokeWidth="4" />
        ))}
        {/* Minor streets */}
        {([[0,26,100,26],[0,47,100,47],[0,66,100,66],[10,0,10,100],[30,0,30,100],[50,0,50,100],[70,0,70,100],[90,0,90,100]] as [number,number,number,number][]).map(([x1,y1,x2,y2],i) => (
          <line key={`s${i}`} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`} stroke="#c8d5e8" strokeWidth="1.5" />
        ))}
        <line x1="0" y1="38%" x2="100%" y2="38%" stroke="#a3b8d4" strokeWidth="6" opacity="0.5" />
        <ellipse cx="72%" cy="43%" rx="6%" ry="4%" fill="#b8d4e8" opacity="0.5" />
        <text x="72%" y="43.5%" textAnchor="middle" fill="#6b9ab8" fontSize="9" fontFamily="sans-serif">Bay</text>
        <rect x="42%" y="59%" width="16%" height="14%" rx="4" fill="#c6dbb8" opacity="0.7" />
        <text x="50%" y="67%" textAnchor="middle" fill="#5a8a4a" fontSize="9" fontFamily="sans-serif">City Park</text>
      </svg>

      {/* Gradient vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-blue-100/20" />

      {/* Vehicle markers */}
      {vehicles.map(v => {
        const cfg = STATUS_CFG[v.status];
        const isSelected = selectedId === v.id;
        const pulse = v.status === 'Online' || v.status === 'Alarm';
        return (
          <button
            key={v.id}
            onClick={() => onSelect(v.id)}
            onMouseEnter={() => setHovered(v.id)}
            onMouseLeave={() => setHovered(null)}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
            style={{ left: `${v.x}%`, top: `${v.y}%` }}
            aria-label={v.plateNo}
          >
            {/* Pulse ring for selected */}
            {isSelected && (
              <span
                className="absolute inset-0 -m-1.5 rounded-full animate-ping opacity-30"
                style={{ background: cfg.mapColor }}
              />
            )}
            {/* Pulse ring for live */}
            {pulse && !isSelected && (
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-20"
                style={{ background: cfg.mapColor }}
              />
            )}
            <div
              className={cn(
                'relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-white shadow-md transition-all duration-150 group-hover:scale-110',
                isSelected && 'scale-125 shadow-lg',
              )}
              style={{ background: cfg.mapColor }}
            >
              <Bus className="h-3.5 w-3.5 text-white" />
            </div>
            {/* Label on selected */}
            {isSelected && (
              <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800/90 px-2 py-1 text-[10px] font-semibold text-white shadow-lg backdrop-blur-sm">
                {v.plateNo}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800/90" />
              </div>
            )}
          </button>
        );
      })}

      {/* Hover tooltip */}
      {hoveredVehicle && hoveredVehicle.id !== selectedId && (
        <div
          className="pointer-events-none absolute z-30 min-w-[176px] rounded-xl border border-white/70 bg-white/95 p-3 shadow-xl backdrop-blur-md"
          style={{
            left: Math.min(hoveredVehicle.x + 4, 60) + '%',
            top:  Math.max(hoveredVehicle.y - 20, 2) + '%',
          }}
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-[12px] font-semibold text-slate-800">{hoveredVehicle.plateNo}</span>
            <div className="flex items-center gap-1">
              <StatusDot status={hoveredVehicle.status} size="xs" />
              <span className={cn('text-[10px] font-medium', STATUS_CFG[hoveredVehicle.status].text)}>
                {hoveredVehicle.status}
              </span>
            </div>
          </div>
          <div className="space-y-1 text-[11px]">
            {hoveredVehicle.driver && (
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Driver</span>
                <span className="font-medium text-slate-700">{hoveredVehicle.driver}</span>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Speed</span>
              <span className="font-medium text-slate-700 tabular-nums">
                {hoveredVehicle.speed > 0 ? `${hoveredVehicle.speed} km/h` : '—'}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Route</span>
              <span className="max-w-[100px] truncate text-right font-medium text-slate-700">
                {hoveredVehicle.route}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Live badge (top-left) ── */}
      <div className="absolute left-3 top-3 z-20 flex items-center gap-2 rounded-full border border-emerald-200/70 bg-white/95 py-1.5 pl-2.5 pr-3 shadow-sm backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-[11px] font-semibold text-emerald-700">Live</span>
        <span className="text-[11px] text-slate-400">· {vehicles.length} vehicles</span>
      </div>

      {/* ── Legend (top-right) ── */}
      <div className="absolute right-3 top-3 z-20 rounded-xl border border-white/70 bg-white/95 px-3 py-2.5 shadow-sm backdrop-blur-md">
        <p className="mb-1.5 text-[9.5px] font-semibold uppercase tracking-widest text-slate-400">Legend</p>
        <div className="space-y-1.5">
          {(Object.entries(STATUS_CFG) as [VehicleStatus, typeof STATUS_CFG[VehicleStatus]][]).map(([status, cfg]) => (
            <div key={status} className="flex items-center gap-2">
              <span
                className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[4px] border border-white/80 shadow-sm"
                style={{ background: cfg.mapColor }}
              >
                <Bus className="h-2 w-2 text-white" />
              </span>
              <span className="text-[11px] font-medium text-slate-600">{status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Map controls (bottom-left) ── */}
      <div className="absolute bottom-8 left-3 z-20 flex flex-col gap-1">
        {([
          { Icon: Plus,       label: 'Zoom in',  action: () => setZoom(z => Math.min(z + 0.2, 2))   },
          { Icon: Minus,      label: 'Zoom out', action: () => setZoom(z => Math.max(z - 0.2, 0.5)) },
          { Icon: RotateCcw,  label: 'Reset',    action: () => setZoom(1)                            },
          { Icon: LocateFixed,label: 'Locate',   action: () => {}                                    },
        ] as const).map(({ Icon, label, action }) => (
          <button
            key={label}
            onClick={action}
            aria-label={label}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/70 bg-white/95 text-slate-500 shadow-sm backdrop-blur-md transition-colors hover:bg-white hover:text-[#3d6b8e]"
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>

      {/* ── Scale bar ── */}
      <div className="absolute bottom-3 left-3 z-20 flex items-end gap-1">
        <div className="h-2.5 w-10 border-b-2 border-l-2 border-r-2 border-slate-400/50" />
        <span className="text-[9.5px] font-medium text-slate-500">2 km</span>
      </div>

      {/* ── Zoom badge (bottom-right) ── */}
      <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1 rounded-full border border-white/70 bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-slate-500 shadow-sm backdrop-blur-md">
        <Maximize2 className="h-2.5 w-2.5" />
        {Math.round(zoom * 100)}%
      </div>

      {/* ── Copyright ── */}
      <div className="pointer-events-none absolute bottom-1 left-1/2 z-10 -translate-x-1/2 text-[9px] text-slate-400/70">
        © 2026 Blitztech Solutions FZE LLC
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────────── */
export default function LiveTrackingPage() {
  const [search, setSearch]           = useState('');
  const [selectedId, setSelectedId]   = useState<string | null>('v1');
  const [panelOpen, setPanelOpen]     = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['g1', 'g2']));
  const [filterStatus, setFilterStatus] = useState<VehicleStatus | 'All'>('All');

  const selectedVehicle = VEHICLES.find(v => v.id === selectedId) ?? null;

  const filteredVehicles = useMemo(() => VEHICLES.filter(v => {
    const q = search.toLowerCase();
    const matchSearch = !q || v.plateNo.toLowerCase().includes(q) || v.driver.toLowerCase().includes(q);
    const matchStatus = filterStatus === 'All' || v.status === filterStatus;
    return matchSearch && matchStatus;
  }), [search, filterStatus]);

  function toggleGroup(id: string) {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#f0f4f8]">

      {/* ── Status bar ─────────────────────────────────────────────────────── */}
      <div className="flex shrink-0 items-center gap-1.5 overflow-x-auto border-b border-[#d4e0ea] bg-white px-4 py-2 [scrollbar-gutter:stable]">
        {/* "All" chip */}
        <button
          onClick={() => setFilterStatus('All')}
          className={cn(
            'flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold transition-all',
            filterStatus === 'All'
              ? 'border-[#3d6b8e] bg-[#3d6b8e] text-white shadow-sm'
              : 'border-[#d4e0ea] bg-white text-slate-500 hover:border-[#b0c8d8] hover:bg-[#f4f8fb]',
          )}
        >
          All
          <span className={cn(
            'rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums',
            filterStatus === 'All' ? 'bg-white/20 text-white' : 'bg-[#eef4f8] text-slate-600',
          )}>
            {VEHICLES.length}
          </span>
        </button>

        <div className="mx-1 h-4 w-px shrink-0 bg-[#d4e0ea]" />

        {STATUS_BAR_ITEMS.map(item => {
          const cfg = STATUS_CFG[item.key];
          const active = filterStatus === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setFilterStatus(item.key)}
              className={cn(
                'flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium transition-all',
                active
                  ? `${cfg.chipBg} ${cfg.chipBorder} ${cfg.chipText} shadow-sm`
                  : 'border-[#d4e0ea] bg-white text-slate-500 hover:border-[#b0c8d8] hover:bg-[#f4f8fb]',
              )}
            >
              <StatusDot status={item.key} size="xs" />
              {item.label}
              <span className={cn(
                'rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums',
                active ? `${cfg.chipBg} ${cfg.chipText}` : 'bg-[#eef4f8] text-slate-500',
              )}>
                {item.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div className="relative flex min-h-0 flex-1 overflow-hidden">

        {/* ── Left overlay panel ─────────────────────────────────────────── */}
        {/* Backdrop (mobile-style, subtle) */}
        {panelOpen && (
          <div
            className="absolute inset-0 z-10 bg-slate-900/5 lg:hidden"
            onClick={() => setPanelOpen(false)}
          />
        )}

        {/* Panel itself — slides in/out as overlay */}
        <div
          className={cn(
            'absolute inset-y-0 left-0 z-20 flex w-[220px] flex-col bg-white shadow-xl',
            'transition-transform duration-300 ease-in-out',
            panelOpen ? 'translate-x-0' : '-translate-x-full',
          )}
          style={{ borderRight: '1px solid #d4e0ea' }}
        >
          {/* Panel header */}
          <div className="flex shrink-0 items-center gap-2 border-b border-[#d4e0ea] px-3 py-2.5">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#eef4f8]">
              <Bus className="h-3.5 w-3.5 text-[#3d6b8e]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11.5px] font-semibold leading-tight text-slate-700">Fleet Vehicles</p>
              <p className="text-[9.5px] leading-tight text-slate-400">
                {VEHICLES.filter(v => v.status === 'Online').length} online · {VEHICLES.length} total
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="shrink-0 border-b border-[#d4e0ea] px-2.5 py-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search assets…"
                className="h-7 w-full rounded-md border border-[#d4e0ea] bg-[#f4f8fb] pl-6 pr-6 text-[11px] text-slate-700 placeholder:text-slate-300 focus:border-[#3d6b8e] focus:outline-none focus:ring-1 focus:ring-[#3d6b8e]/20"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* Vehicle list */}
          <div className="flex-1 overflow-y-auto [scrollbar-gutter:stable]">
            {GROUPS.map(group => {
              const groupVehicles = filteredVehicles.filter(v => v.groupId === group.id);
              if (groupVehicles.length === 0) return null;
              const expanded = expandedGroups.has(group.id);
              const liveCount = groupVehicles.filter(v => v.status === 'Online').length;
              return (
                <div key={group.id}>
                  {/* Group header */}
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="flex w-full items-center gap-1.5 border-b border-[#eef4f8] bg-[#f8fafc] px-3 py-2 text-left transition-colors hover:bg-[#f0f4f8]"
                  >
                    <span className={cn(
                      'flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded transition-transform',
                      expanded && 'rotate-90',
                    )}>
                      <ChevronRight className="h-3 w-3 text-slate-400" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[10.5px] font-semibold text-slate-600">
                      {group.name}
                    </span>
                    <span className="shrink-0 text-[9.5px] text-slate-400">
                      {liveCount > 0 && <span className="mr-1 text-emerald-500">●</span>}
                      {groupVehicles.length}
                    </span>
                  </button>

                  {/* Vehicles */}
                  {expanded && groupVehicles.map(v => (
                    <VehicleRow
                      key={v.id}
                      vehicle={v}
                      selected={selectedId === v.id}
                      onClick={() => setSelectedId(v.id)}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Toggle handle ──────────────────────────────────────────────── */}
        {/* Visible arrow tab on the right edge of the panel */}
        <button
          onClick={() => setPanelOpen(p => !p)}
          aria-label={panelOpen ? 'Collapse vehicle list' : 'Expand vehicle list'}
          className={cn(
            'absolute top-1/2 z-30 flex h-12 w-5 -translate-y-1/2 items-center justify-center',
            'rounded-r-lg border border-l-0 border-[#d4e0ea] bg-white shadow-md',
            'transition-all duration-300 ease-in-out hover:bg-[#eef4f8] hover:text-[#3d6b8e]',
            'text-slate-400',
          )}
          style={{
            left: panelOpen ? '220px' : '0px',
          }}
        >
          {panelOpen
            ? <ChevronLeft className="h-3.5 w-3.5" />
            : <ChevronRight className="h-3.5 w-3.5" />
          }
        </button>

        {/* ── Map (always full width, panel overlays it) ─────────────────── */}
        <div className="absolute inset-0 z-0">
          <TrackingMap
            vehicles={filteredVehicles}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>

        {/* ── Right detail panel (overlay) ───────────────────────────────── */}
        <div
          className={cn(
            'absolute inset-y-0 right-0 z-20 w-[260px]',
            'transition-transform duration-300 ease-in-out',
            selectedVehicle ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          {selectedVehicle && (
            <VehicleDetailPanel
              vehicle={selectedVehicle}
              onClose={() => setSelectedId(null)}
            />
          )}
        </div>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <PageFooter />
    </div>
  );
}
