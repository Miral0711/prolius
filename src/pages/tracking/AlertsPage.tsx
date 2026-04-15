import { useState, useMemo } from 'react';
import {
  AlertTriangle,
  Bell,
  BellOff,
  Bus,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  FileDown,
  Filter,
  Flame,
  Gauge,
  Info,
  MapPin,
  RefreshCw,
  Repeat2,
  Search,
  Shield,
  ShieldAlert,
  User,
  X,
  Zap,
} from 'lucide-react';
import { groupAndEnrichAlerts, type EnrichedAlert } from '@/lib/alertUtils';
import { cn } from '@/lib/utils';
import { PageLayout } from '@/components/shared/PageLayout';
import {
  DataTable,
  DataTableBodyScroll,
  DataTableTable,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
  DataTableToolbar,
  DataTableFooter,
} from '@/components/fleet/bus-master/DataTable';
import { TablePagination } from '@/components/shared/TablePagination';
import { fleetSurface, fleetType } from '@/components/fleet/bus-master/tokens';

/* ─── Types ──────────────────────────────────────────────────────────────── */
// Re-export from alertUtils so the rest of the file can use short names
type Severity    = import('@/lib/alertUtils').Severity;
type AlertStatus = import('@/lib/alertUtils').AlertStatus;
type AlertType   = import('@/lib/alertUtils').AlertType;
type Alert       = EnrichedAlert;

/* ─── Mock data ──────────────────────────────────────────────────────────── */
/**
 * RAW_ALERTS — individual alert events as they arrive from the system.
 * groupAndEnrichAlerts() will:
 *   1. Group by (vehicle, alertType) within a 60-min window
 *   2. Collapse each group into one representative row (most recent)
 *   3. Attach repeatCount, isRecurring, groupedAlertIds
 *   4. Compute priorityScore = severityWeight*10 + minutesSinceTriggered + repeatCount*5
 *   5. Sort descending by priorityScore
 *
 * Vehicles XSA4247 and HSA1098 intentionally have multiple Overspeed events
 * within the window to demonstrate repeat detection.
 */
const RAW_ALERTS = [
  // ── XSA4247 — 3× Overspeed within 60 min (14:18 → 13:30 → 13:05)
  { id: 'ALT-002', severity: 'Critical' as const, type: 'Accident' as const,        vehicle: 'XSA4247',  driver: 'Khalid Al-Otaibi',  source: 'Sensor', location: 'Dammam Expressway, KM 42',  time: '14:18:05', status: 'Escalated' as const,    description: 'Collision detected via G-force sensor. Impact force exceeded threshold. Emergency services notified.', coordinates: '26.4207° N, 50.0888° E', speed: 0 },
  { id: 'ALT-011', severity: 'High' as const,     type: 'Overspeed' as const,       vehicle: 'XSA4247',  driver: 'Khalid Al-Otaibi',  source: 'GPS',    location: 'Dammam Corniche',           time: '14:05:10', status: 'Active' as const,       description: 'Speed violation: 104 km/h in 60 km/h zone. Third overspeed event in under an hour.', speed: 104 },
  { id: 'ALT-013', severity: 'High' as const,     type: 'Overspeed' as const,       vehicle: 'XSA4247',  driver: 'Khalid Al-Otaibi',  source: 'GPS',    location: 'Dammam Ring Rd',            time: '13:42:20', status: 'Acknowledged' as const, description: 'Speed violation: 95 km/h in 60 km/h zone. Second overspeed event.', speed: 95, acknowledgedBy: 'Dispatch Ctrl' },
  { id: 'ALT-014', severity: 'High' as const,     type: 'Overspeed' as const,       vehicle: 'XSA4247',  driver: 'Khalid Al-Otaibi',  source: 'GPS',    location: 'Dammam Corniche',           time: '13:20:33', status: 'Resolved' as const,     description: 'Speed violation: 98 km/h in 60 km/h zone. Driver warned via in-cab alert.', speed: 98, resolvedAt: '13:25:00' },

  // ── HSA1098 — 2× Overspeed within 60 min (14:32 → 13:55)
  { id: 'ALT-001', severity: 'Critical' as const, type: 'Panic Button' as const,    vehicle: 'HSA1098',  driver: 'Ahmed Al-Rashid',   source: 'MDVR',   location: 'King Fahd Rd, Riyadh',      time: '14:32:10', status: 'Active' as const,       description: 'Driver triggered panic button. Immediate response required. Vehicle stationary at last known GPS fix.', coordinates: '24.7136° N, 46.6753° E', relatedAlerts: ['ALT-009'] },
  { id: 'ALT-015', severity: 'Critical' as const, type: 'Overspeed' as const,       vehicle: 'HSA1098',  driver: 'Ahmed Al-Rashid',   source: 'GPS',    location: 'King Fahd Rd, Riyadh',      time: '14:20:00', status: 'Active' as const,       description: 'Extreme speed: 138 km/h in 100 km/h zone. Second overspeed in under an hour.', speed: 138 },
  { id: 'ALT-012', severity: 'Critical' as const, type: 'Overspeed' as const,       vehicle: 'HSA1098',  driver: 'Ahmed Al-Rashid',   source: 'GPS',    location: 'Northern Ring Rd, Riyadh',  time: '13:55:20', status: 'Resolved' as const,     description: 'Extreme speed violation: 145 km/h in 100 km/h zone. Incident report filed.', speed: 145, resolvedAt: '14:10:00', notes: 'Incident report #IR-2024-089 filed.' },

  // ── Other vehicles — single events
  { id: 'ALT-003', severity: 'High' as const,     type: 'Overspeed' as const,       vehicle: 'ASA8887',  driver: 'Omar Al-Ghamdi',    source: 'GPS',    location: 'Olaya St, Riyadh',          time: '14:25:44', status: 'Active' as const,       description: 'Vehicle exceeded speed limit of 80 km/h. Recorded speed: 112 km/h in a 80 km/h zone.', speed: 112, coordinates: '24.6877° N, 46.7219° E' },
  { id: 'ALT-004', severity: 'High' as const,     type: 'Geofence' as const,        vehicle: 'KSA0001',  driver: 'Faisal Al-Dosari',  source: 'GPS',    location: 'Industrial Zone, Jeddah',   time: '14:10:22', status: 'Acknowledged' as const, description: 'Vehicle exited authorized operational geofence boundary. Last seen heading south on Highway 15.', geofenceZone: 'Jeddah Operational Area', acknowledgedBy: 'Dispatch Ctrl' },
  { id: 'ALT-005', severity: 'High' as const,     type: 'Fatigue' as const,         vehicle: 'HSA1167',  driver: 'Nasser Al-Harbi',   source: 'DMS',    location: 'Makkah Rd, Jeddah',         time: '13:58:30', status: 'Active' as const,       description: 'Driver Monitoring System detected signs of fatigue. Eyes closed for >2 seconds. Alert sent to driver.', coordinates: '21.3891° N, 39.8579° E' },
  { id: 'ALT-006', severity: 'Medium' as const,   type: 'Harsh Braking' as const,   vehicle: 'AVI001',   driver: 'Saad Al-Qahtani',   source: 'Sensor', location: 'Prince Sultan Rd, Riyadh',  time: '13:45:17', status: 'Resolved' as const,     description: 'Harsh braking event detected. Deceleration: -0.8g. No collision detected. Driver coaching recommended.', resolvedAt: '14:05:00', notes: 'Driver briefed via in-cab messaging.' },
  { id: 'ALT-007', severity: 'Medium' as const,   type: 'Idle Timeout' as const,    vehicle: 'AVI0012',  driver: 'Turki Al-Shehri',   source: 'Engine', location: 'Depot Zone B, Riyadh',      time: '13:30:00', status: 'Acknowledged' as const, description: 'Vehicle idling for 45 minutes exceeding 30-minute policy threshold. Engine running, no movement detected.', acknowledgedBy: 'Fleet Mgr' },
  { id: 'ALT-008', severity: 'Medium' as const,   type: 'Maintenance Due' as const, vehicle: 'AVI00123', driver: 'Unassigned',         source: 'System', location: 'Depot Zone B, Riyadh',      time: '13:00:00', status: 'Active' as const,       description: 'Scheduled maintenance overdue by 3 days. Oil change and brake inspection required. Vehicle should be taken off route.' },
  { id: 'ALT-009', severity: 'Low' as const,      type: 'GPS Lost' as const,        vehicle: 'KSA0001',  driver: 'Faisal Al-Dosari',  source: 'GPS',    location: 'Last: King Abdulaziz Rd',   time: '12:55:40', status: 'Resolved' as const,     description: 'GPS signal lost for 8 minutes. Signal restored automatically. No manual intervention required.', resolvedAt: '13:03:55' },
  { id: 'ALT-010', severity: 'Low' as const,      type: 'Low Battery' as const,     vehicle: 'HSA1167',  driver: 'Nasser Al-Harbi',   source: 'Device', location: 'Makkah Rd, Jeddah',         time: '12:40:10', status: 'Acknowledged' as const, description: 'Device battery voltage dropped to 11.5V. Below recommended 12V threshold. Check alternator and battery health.', acknowledgedBy: 'Tech Support' },
];

// Grouped, scored, sorted — ready to render
const MOCK_ALERTS: Alert[] = groupAndEnrichAlerts(RAW_ALERTS, 60);

/* ─── Config maps ────────────────────────────────────────────────────────── */
const SEVERITY_CFG: Record<Severity, { bg: string; text: string; border: string; dot: string; icon: React.ElementType }> = {
  Critical: { bg: 'bg-rose-50',   text: 'text-rose-700',   border: 'border-rose-200',   dot: 'bg-rose-500',   icon: Flame },
  High:     { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', dot: 'bg-orange-500', icon: ShieldAlert },
  Medium:   { bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200',  dot: 'bg-amber-400',  icon: AlertTriangle },
  Low:      { bg: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-200',   dot: 'bg-blue-400',   icon: Info },
};

const STATUS_CFG: Record<AlertStatus, { bg: string; text: string; border: string; dot: string }> = {
  Active:       { bg: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-200',    dot: 'bg-rose-500'    },
  Acknowledged: { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200',   dot: 'bg-amber-400'   },
  Resolved:     { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  Escalated:    { bg: 'bg-violet-50',  text: 'text-violet-700',  border: 'border-violet-200',  dot: 'bg-violet-500'  },
};

const TYPE_ICON: Record<AlertType, React.ElementType> = {
  'Overspeed':      Gauge,
  'Geofence':       MapPin,
  'Panic Button':   Bell,
  'Harsh Braking':  Zap,
  'Idle Timeout':   Clock,
  'Maintenance Due': Shield,
  'Low Battery':    Zap,
  'GPS Lost':       MapPin,
  'Accident':       AlertTriangle,
  'Fatigue':        User,
};

/* ─── Small atoms ────────────────────────────────────────────────────────── */
function RecurringBadge({ count }: { count: number }) {
  if (count <= 1) return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-sm border border-orange-200 bg-orange-50 px-1.5 py-0 text-[10.5px] font-semibold uppercase leading-[1.125rem] tracking-[0.01rem] text-orange-700">
      <Repeat2 className="h-2.5 w-2.5 shrink-0" />
      ×{count}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: Severity }) {
  const cfg = SEVERITY_CFG[severity];
  const Icon = cfg.icon;
  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-sm border px-1.5 py-0 text-[10.5px] font-semibold uppercase leading-[1.125rem] tracking-[0.01rem]',
      cfg.bg, cfg.text, cfg.border,
    )}>
      <Icon className="h-2.5 w-2.5 shrink-0" />
      {severity}
    </span>
  );
}

function StatusPill({ status }: { status: AlertStatus }) {
  const cfg = STATUS_CFG[status];
  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-sm border px-1.5 py-0 text-[10.5px] font-semibold uppercase leading-[1.125rem] tracking-[0.01rem]',
      cfg.bg, cfg.text, cfg.border,
    )}>
      <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', cfg.dot)} />
      {status}
    </span>
  );
}

function DR({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex min-h-[24px] items-start justify-between gap-3 border-b border-[#f0f4f8] py-[4px] last:border-0">
      <span className="shrink-0 text-[10.5px] leading-snug text-slate-400">{label}</span>
      <span className={cn('text-right text-[10.5px] font-medium leading-snug text-slate-700', valueClass)}>
        {value || '—'}
      </span>
    </div>
  );
}

function Section({ icon: Icon, title, defaultOpen = true, children }: {
  icon: React.ElementType; title: string; defaultOpen?: boolean; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#eef4f8] last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center gap-2 px-4 py-2 text-left transition-colors hover:bg-[#f8fafc]"
      >
        <Icon className="h-3.5 w-3.5 shrink-0 text-[#3d6b8e]" />
        <span className="flex-1 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-slate-600">{title}</span>
        <ChevronDown className={cn('h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform duration-200', open && 'rotate-180')} />
      </button>
      {open && <div className="px-4 pb-3 pt-0">{children}</div>}
    </div>
  );
}

/* ─── Summary chips ──────────────────────────────────────────────────────── */
interface SummaryChipProps {
  label: string;
  count: number;
  color: string;
  textColor: string;
  borderColor: string;
  dotColor: string;
  active?: boolean;
  onClick?: () => void;
}

function SummaryChip({ label, count, color, textColor, borderColor, dotColor, active, onClick }: SummaryChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold transition-all',
        active
          ? cn(color, textColor, borderColor, 'shadow-sm ring-1', borderColor.replace('border-', 'ring-'))
          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50',
      )}
    >
      <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', active ? dotColor : 'bg-slate-400')} />
      {label}
      <span className={cn(
        'ml-0.5 rounded px-1 py-0 text-[10px] font-bold tabular-nums',
        active ? cn(color, textColor) : 'bg-slate-100 text-slate-600',
      )}>{count}</span>
    </button>
  );
}

/* ─── Filter select ──────────────────────────────────────────────────────── */
function FilterSelect({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="h-8 appearance-none rounded-md border border-[#d4e0ea] bg-white pl-2.5 pr-7 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:border-[#b8cfe0] focus:border-[#3d6b8e] focus:outline-none focus:ring-1 focus:ring-[#3d6b8e]/30"
      >
        <option value="">{label}: All</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

/* ─── Detail panel ───────────────────────────────────────────────────────── */
function AlertDetailPanel({ alert, onClose }: { alert: Alert; onClose: () => void }) {
  const sevCfg = SEVERITY_CFG[alert.severity];
  const staCfg = STATUS_CFG[alert.status];
  const TypeIcon = TYPE_ICON[alert.type];

  return (
    <div className="flex h-full flex-col overflow-hidden border-l border-[#d4e0ea] bg-white shadow-[-4px_0_16px_rgba(61,107,142,0.06)]">
      {/* Header */}
      <div className="shrink-0 border-b border-[#d4e0ea] bg-white px-4 py-3">
        <div className="flex items-start gap-3">
          <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full border', sevCfg.bg, sevCfg.border)}>
            <TypeIcon className={cn('h-4 w-4', sevCfg.text)} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[12.5px] font-bold text-slate-800">{alert.type}</span>
              <SeverityBadge severity={alert.severity} />
              {alert.isRecurring && <RecurringBadge count={alert.repeatCount} />}
            </div>
            <p className="mt-0.5 text-[10.5px] text-slate-400">
              {alert.id} · {alert.time}
              {alert.isRecurring && (
                <span className="ml-1.5 font-medium text-orange-500">Recurring Alert</span>
              )}
            </p>
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
          <StatusPill status={alert.status} />
          <span className={cn('rounded-[4px] border px-2 py-[3px] text-[10.5px] font-bold tracking-wide', 'bg-[#3d6b8e] text-white border-[#3d6b8e]')}>
            {alert.vehicle}
          </span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto [scrollbar-gutter:stable]">
        {/* Description */}
        <div className="border-b border-[#eef4f8] px-4 py-3">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-slate-400 mb-1.5">Description</p>
          <p className="text-[11.5px] leading-relaxed text-slate-700">{alert.description}</p>
        </div>

        <Section icon={Bus} title="Vehicle & Driver">
          <DR label="Vehicle" value={alert.vehicle} />
          <DR label="Driver" value={alert.driver} />
          <DR label="Source" value={alert.source} />
          {alert.speed !== undefined && (
            <DR label="Recorded Speed" value={`${alert.speed} km/h`} valueClass={alert.speed > 100 ? 'text-rose-600 font-semibold' : undefined} />
          )}
          {alert.geofenceZone && <DR label="Geofence Zone" value={alert.geofenceZone} />}
        </Section>

        <Section icon={MapPin} title="Location">
          <DR label="Location" value={alert.location} />
          {alert.coordinates && <DR label="Coordinates" value={alert.coordinates} />}
          <DR label="Time" value={alert.time} />
        </Section>

        <Section icon={Info} title="Workflow" defaultOpen={false}>
          <DR label="Priority Score" value={String(alert.priorityScore)} valueClass="font-bold text-[#3d6b8e]" />
          {alert.isRecurring && (
            <DR label="Repeat Count" value={`${alert.repeatCount}× in last 60 min`} valueClass="text-orange-600 font-semibold" />
          )}
          {alert.isRecurring && alert.groupedAlertIds.length > 1 && (
            <div className="mt-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Grouped Events</p>
              <div className="flex flex-wrap gap-1">
                {alert.groupedAlertIds.map(gid => (
                  <span key={gid} className="inline-flex items-center rounded border border-orange-200 bg-orange-50 px-1.5 py-0.5 text-[10.5px] font-medium text-orange-700">
                    {gid}
                  </span>
                ))}
              </div>
            </div>
          )}
          {alert.acknowledgedBy && <DR label="Acknowledged By" value={alert.acknowledgedBy} />}
          {alert.resolvedAt && <DR label="Resolved At" value={alert.resolvedAt} />}
          {alert.notes && (
            <div className="mt-1.5 rounded-md bg-[#f8fafc] border border-[#eef4f8] px-2.5 py-2">
              <p className="text-[10.5px] leading-relaxed text-slate-600">{alert.notes}</p>
            </div>
          )}
          {alert.relatedAlerts && alert.relatedAlerts.length > 0 && (
            <div className="mt-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Related Alerts</p>
              <div className="flex flex-wrap gap-1">
                {alert.relatedAlerts.map(id => (
                  <span key={id} className="inline-flex items-center gap-1 rounded border border-[#d4e0ea] bg-[#f0f4f8] px-1.5 py-0.5 text-[10.5px] font-medium text-[#3d6b8e]">
                    <ExternalLink className="h-2.5 w-2.5" />
                    {id}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Section>
      </div>

      {/* Action footer */}
      <div className="shrink-0 border-t border-[#d4e0ea] bg-[#f8fafc] px-4 py-2.5">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Actions</p>
        <div className="flex flex-wrap gap-1.5">
          {alert.status === 'Active' && (
            <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-2.5 text-[11px] font-semibold text-amber-700 transition-colors hover:bg-amber-100">
              <Bell className="h-3 w-3" />
              Acknowledge
            </button>
          )}
          {(alert.status === 'Active' || alert.status === 'Acknowledged') && (
            <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 text-[11px] font-semibold text-emerald-700 transition-colors hover:bg-emerald-100">
              <CheckCircle2 className="h-3 w-3" />
              Resolve
            </button>
          )}
          {alert.status !== 'Escalated' && alert.status !== 'Resolved' && (
            <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-violet-200 bg-violet-50 px-2.5 text-[11px] font-semibold text-violet-700 transition-colors hover:bg-violet-100">
              <ShieldAlert className="h-3 w-3" />
              Escalate
            </button>
          )}
          <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-[#d0e2f0] bg-[#e8f0f8] px-2.5 text-[11px] font-semibold text-[#2e5f8a] transition-colors hover:bg-[#d8ecf8]">
            <ExternalLink className="h-3 w-3" />
            View Vehicle
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────────── */
export default function AlertsPage() {
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [activeSummaryChip, setActiveSummaryChip] = useState<string | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  /* ── Derived counts ── */
  const counts = useMemo(() => ({
    total:          MOCK_ALERTS.length,
    critical:       MOCK_ALERTS.filter(a => a.severity === 'Critical').length,
    high:           MOCK_ALERTS.filter(a => a.severity === 'High').length,
    medium:         MOCK_ALERTS.filter(a => a.severity === 'Medium').length,
    low:            MOCK_ALERTS.filter(a => a.severity === 'Low').length,
    unacknowledged: MOCK_ALERTS.filter(a => a.status === 'Active' || a.status === 'Escalated').length,
    resolvedToday:  MOCK_ALERTS.filter(a => a.status === 'Resolved').length,
  }), []);

  /* ── Filtered rows ── */
  const filtered = useMemo(() => {
    let rows = MOCK_ALERTS;
    if (activeSummaryChip === 'critical')       rows = rows.filter(a => a.severity === 'Critical');
    else if (activeSummaryChip === 'high')      rows = rows.filter(a => a.severity === 'High');
    else if (activeSummaryChip === 'medium')    rows = rows.filter(a => a.severity === 'Medium');
    else if (activeSummaryChip === 'low')       rows = rows.filter(a => a.severity === 'Low');
    else if (activeSummaryChip === 'unack')     rows = rows.filter(a => a.status === 'Active' || a.status === 'Escalated');
    else if (activeSummaryChip === 'resolved')  rows = rows.filter(a => a.status === 'Resolved');

    if (severityFilter) rows = rows.filter(a => a.severity === severityFilter);
    if (statusFilter)   rows = rows.filter(a => a.status === statusFilter);
    if (typeFilter)     rows = rows.filter(a => a.type === typeFilter);
    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter(a =>
        a.id.toLowerCase().includes(q) ||
        a.vehicle.toLowerCase().includes(q) ||
        a.driver.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q),
      );
    }
    return rows;
  }, [search, severityFilter, statusFilter, typeFilter, activeSummaryChip]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  function handleChipClick(key: string) {
    setActiveSummaryChip(prev => prev === key ? null : key);
    setPage(1);
  }

  function handleClear() {
    setSearch(''); setSeverityFilter(''); setStatusFilter('');
    setTypeFilter(''); setDateFilter(''); setActiveSummaryChip(null); setPage(1);
  }

  const SUMMARY_CHIPS = [
    { key: 'total',    label: 'Total',           count: counts.total,          color: 'bg-slate-50',   textColor: 'text-slate-700',   borderColor: 'border-slate-300',   dotColor: 'bg-slate-500'   },
    { key: 'critical', label: 'Critical',         count: counts.critical,       color: 'bg-rose-50',    textColor: 'text-rose-700',    borderColor: 'border-rose-300',    dotColor: 'bg-rose-500'    },
    { key: 'high',     label: 'High',             count: counts.high,           color: 'bg-orange-50',  textColor: 'text-orange-700',  borderColor: 'border-orange-300',  dotColor: 'bg-orange-500'  },
    { key: 'medium',   label: 'Medium',           count: counts.medium,         color: 'bg-amber-50',   textColor: 'text-amber-700',   borderColor: 'border-amber-300',   dotColor: 'bg-amber-400'   },
    { key: 'low',      label: 'Low',              count: counts.low,            color: 'bg-blue-50',    textColor: 'text-blue-700',    borderColor: 'border-blue-300',    dotColor: 'bg-blue-400'    },
    { key: 'unack',    label: 'Unacknowledged',   count: counts.unacknowledged, color: 'bg-violet-50',  textColor: 'text-violet-700',  borderColor: 'border-violet-300',  dotColor: 'bg-violet-500'  },
    { key: 'resolved', label: 'Resolved Today',   count: counts.resolvedToday,  color: 'bg-emerald-50', textColor: 'text-emerald-700', borderColor: 'border-emerald-300', dotColor: 'bg-emerald-500' },
  ];

  const SEVERITIES: Severity[] = ['Critical', 'High', 'Medium', 'Low'];
  const STATUSES: AlertStatus[] = ['Active', 'Acknowledged', 'Resolved', 'Escalated'];
  const TYPES: AlertType[] = ['Overspeed', 'Geofence', 'Panic Button', 'Harsh Braking', 'Idle Timeout', 'Maintenance Due', 'Low Battery', 'GPS Lost', 'Accident', 'Fatigue'];

  return (
    <PageLayout title="Alerts">
      {/* ── Filters + summary strip ── */}
      <div className="shrink-0 flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search alerts, vehicles, drivers…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="h-8 w-56 rounded-md border border-[#d4e0ea] bg-white pl-8 pr-3 text-xs text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-[#3d6b8e] focus:outline-none focus:ring-1 focus:ring-[#3d6b8e]/30"
          />
        </div>
        <FilterSelect label="Severity" value={severityFilter} onChange={v => { setSeverityFilter(v); setPage(1); }} options={SEVERITIES} />
        <FilterSelect label="Status"   value={statusFilter}   onChange={v => { setStatusFilter(v);   setPage(1); }} options={STATUSES} />
        <FilterSelect label="Type"     value={typeFilter}     onChange={v => { setTypeFilter(v);     setPage(1); }} options={TYPES} />
        <input
          type="date"
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
          className="h-8 rounded-md border border-[#d4e0ea] bg-white px-2.5 text-xs text-slate-700 shadow-sm focus:border-[#3d6b8e] focus:outline-none focus:ring-1 focus:ring-[#3d6b8e]/30"
        />
        {(search || severityFilter || statusFilter || typeFilter || dateFilter || activeSummaryChip) && (
          <button
            onClick={handleClear}
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
        <div className="ml-auto flex items-center gap-1.5">
          <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#d4e0ea] bg-white px-3 text-xs font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50">
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
          <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#d0e2f0] bg-[#e8f0f8] px-3 text-xs font-semibold text-[#2e5f8a] shadow-sm transition-colors hover:bg-[#d8ecf8]">
            <FileDown className="h-3.5 w-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* Summary chips */}
      <div className="shrink-0 flex flex-wrap items-center gap-1.5">
        {SUMMARY_CHIPS.map(chip => (
          <SummaryChip
            key={chip.key}
            label={chip.label}
            count={chip.count}
            color={chip.color}
            textColor={chip.textColor}
            borderColor={chip.borderColor}
            dotColor={chip.dotColor}
            active={activeSummaryChip === chip.key}
            onClick={() => handleChipClick(chip.key)}
          />
        ))}
      </div>

      {/* ── Main content: table + detail panel ── */}
      <div className={cn('flex min-h-0 flex-1 gap-2', selectedAlert ? 'overflow-hidden' : '')}>
        {/* Table */}
        <DataTable className={cn('flex-1 min-w-0 transition-all duration-200', selectedAlert ? 'w-0' : 'w-full')}>
          <DataTableToolbar>
            <div className="flex min-w-0 items-center gap-2">
              <h3 className="text-sm font-bold uppercase tracking-[0.02rem] text-slate-800">
                Alert Log
                <span className="ml-1.5 text-xs font-normal normal-case text-slate-400">
                  {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                </span>
              </h3>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#d4e0ea] bg-white px-3 text-xs font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50">
                <Filter className="h-3.5 w-3.5" />
                Columns
              </button>
              <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#d0e2f0] bg-[#e8f0f8] px-3 text-xs font-semibold text-[#2e5f8a] shadow-sm transition-colors hover:bg-[#d8ecf8]">
                <Download className="h-3.5 w-3.5" />
                Excel
              </button>
            </div>
          </DataTableToolbar>

          <DataTableBodyScroll>
            <DataTableTable className="min-w-[1100px]">
              <TableHeader>
                <tr>
                  <TableHeaderCell className="w-[90px]">Severity</TableHeaderCell>
                  <TableHeaderCell className="w-[130px]">Alert Type</TableHeaderCell>
                  <TableHeaderCell className="w-[90px]">Vehicle</TableHeaderCell>
                  <TableHeaderCell className="w-[140px]">Driver</TableHeaderCell>
                  <TableHeaderCell className="w-[80px]">Source</TableHeaderCell>
                  <TableHeaderCell className="w-[180px]">Location</TableHeaderCell>
                  <TableHeaderCell className="w-[80px]">Time</TableHeaderCell>
                  <TableHeaderCell className="w-[110px]">Status</TableHeaderCell>
                  <TableHeaderCell className="w-[90px]" align="center">Actions</TableHeaderCell>
                </tr>
              </TableHeader>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-sm text-slate-400">
                      No alerts match the current filters.
                    </td>
                  </tr>
                ) : (
                  paginated.map(alert => {
                    const TypeIcon = TYPE_ICON[alert.type];
                    const isSelected = selectedAlert?.id === alert.id;
                    return (
                      <TableRow
                        key={alert.id}
                        className={cn(isSelected && 'bg-[#eef4f8] ring-1 ring-inset ring-[#3d6b8e]/20')}
                      >
                        <TableCell>
                          <SeverityBadge severity={alert.severity} />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <TypeIcon className="h-3 w-3 shrink-0 text-slate-400" />
                            <span className={fleetType.bodyPrimary}>
                              {alert.type}{alert.isRecurring ? ` (${alert.repeatCount}×)` : ''}
                            </span>
                            {alert.isRecurring && <RecurringBadge count={alert.repeatCount} />}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={cn(fleetType.bodyMono, 'font-bold text-[#3d6b8e]')}>{alert.vehicle}</span>
                        </TableCell>
                        <TableCell>
                          <span className={cn(fleetType.bodyPrimary, 'truncate block max-w-[130px]')} title={alert.driver}>
                            {alert.driver}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={fleetType.bodyMuted}>{alert.source}</span>
                        </TableCell>
                        <TableCell>
                          <span className={cn(fleetType.bodyPrimary, 'truncate block max-w-[170px]')} title={alert.location}>
                            {alert.location}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={fleetType.bodyMonoMuted}>{alert.time}</span>
                        </TableCell>
                        <TableCell>
                          <StatusPill status={alert.status} />
                        </TableCell>
                        <TableCell align="center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => setSelectedAlert(isSelected ? null : alert)}
                              title="View details"
                              className={cn(
                                'flex h-6 w-6 items-center justify-center rounded transition-colors',
                                isSelected
                                  ? 'bg-[#3d6b8e] text-white'
                                  : 'text-slate-400 hover:bg-[#eef4f8] hover:text-[#3d6b8e]',
                              )}
                            >
                              <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                            {alert.status === 'Active' && (
                              <button
                                title="Acknowledge"
                                className="flex h-6 w-6 items-center justify-center rounded text-amber-500 transition-colors hover:bg-amber-50"
                              >
                                <Bell className="h-3.5 w-3.5" />
                              </button>
                            )}
                            {alert.status === 'Resolved' && (
                              <button
                                title="Resolved"
                                className="flex h-6 w-6 items-center justify-center rounded text-emerald-500"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              </button>
                            )}
                            {(alert.status === 'Active' || alert.status === 'Acknowledged') && (
                              <button
                                title="Resolve"
                                className="flex h-6 w-6 items-center justify-center rounded text-slate-400 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                              >
                                <BellOff className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </tbody>
            </DataTableTable>
          </DataTableBodyScroll>

          <TablePagination
            page={page}
            pageSize={pageSize}
            totalCount={filtered.length}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </DataTable>

        {/* Detail panel */}
        {selectedAlert && (
          <div className="w-[320px] shrink-0 overflow-hidden rounded-md border border-[#d4e0ea] shadow-sm">
            <AlertDetailPanel alert={selectedAlert} onClose={() => setSelectedAlert(null)} />
          </div>
        )}
      </div>
    </PageLayout>
  );
}
