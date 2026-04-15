import { useState, useMemo } from 'react';
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileDown,
  FileText,
  Plus,
  RefreshCw,
  Search,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
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
} from '@/components/fleet/bus-master/DataTable';
import { TablePagination } from '@/components/shared/TablePagination';
import { fleetSurface, fleetType } from '@/components/fleet/bus-master/tokens';
import { FleetToolbarButton } from '@/components/fleet/bus-master/FleetToolbarButton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

/* ─── Types ──────────────────────────────────────────────────────────────── */
type MaintenanceType = 'Preventive' | 'Corrective' | 'Emergency' | 'Scheduled' | 'Inspection';
type MaintenancePriority = 'Critical' | 'High' | 'Medium' | 'Low';
type MaintenanceStatus =
  | 'Scheduled'
  | 'In Progress'
  | 'Completed'
  | 'Overdue'
  | 'Cancelled'
  | 'Pending Parts';
type VehicleType = 'Bus' | 'Minibus' | 'Van' | 'Truck';
type ActiveTab = 'upcoming' | 'active' | 'history';

interface UpcomingService {
  id: string;
  vehicle: string;
  plate: string;
  vehicleType: VehicleType;
  serviceType: MaintenanceType;
  dueDate: string;
  odometer: string;
  workshop: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
}

interface ActiveMaintenance {
  id: string;
  vehicle: string;
  plate: string;
  issue: string;
  maintenanceType: MaintenanceType;
  startDate: string;
  expectedCompletion: string;
  technician: string;
  workshop: string;
  costEstimate: string;
  status: MaintenanceStatus;
}

interface MaintenanceHistory {
  serviceId: string;
  vehicle: string;
  plate: string;
  serviceType: MaintenanceType;
  completedDate: string;
  workshop: string;
  downtime: string;
  finalCost: string;
  notes: string;
}

/* ─── Mock Data ──────────────────────────────────────────────────────────── */
const MOCK_UPCOMING: UpcomingService[] = [
  { id: 'SVC-001', vehicle: 'Bus 14', plate: 'HSA1098', vehicleType: 'Bus', serviceType: 'Preventive', dueDate: '2026-04-18', odometer: '85,000 km', workshop: 'Al-Rashid Auto Center', priority: 'High', status: 'Scheduled' },
  { id: 'SVC-002', vehicle: 'Bus 07', plate: 'XSA4247', vehicleType: 'Bus', serviceType: 'Scheduled', dueDate: '2026-04-20', odometer: '62,500 km', workshop: 'Depot B Workshop', priority: 'Medium', status: 'Scheduled' },
  { id: 'SVC-003', vehicle: 'Van 03', plate: 'KSA0001', vehicleType: 'Van', serviceType: 'Inspection', dueDate: '2026-04-15', odometer: '99,100 km', workshop: 'Workshop 1, Riyadh', priority: 'Critical', status: 'Overdue' },
  { id: 'SVC-004', vehicle: 'Bus 22', plate: 'ASA8887', vehicleType: 'Bus', serviceType: 'Preventive', dueDate: '2026-04-22', odometer: '143,200 km', workshop: 'Service Center, Jeddah', priority: 'High', status: 'Scheduled' },
  { id: 'SVC-005', vehicle: 'Minibus 11', plate: 'KSA0002', vehicleType: 'Minibus', serviceType: 'Scheduled', dueDate: '2026-04-25', odometer: '47,800 km', workshop: 'Depot A Workshop', priority: 'Low', status: 'Scheduled' },
  { id: 'SVC-006', vehicle: 'Bus 31', plate: 'AVI001', vehicleType: 'Bus', serviceType: 'Inspection', dueDate: '2026-04-12', odometer: '55,600 km', workshop: 'Depot A Workshop', priority: 'Critical', status: 'Overdue' },
  { id: 'SVC-007', vehicle: 'Truck 02', plate: 'TRK0021', vehicleType: 'Truck', serviceType: 'Preventive', dueDate: '2026-04-28', odometer: '210,000 km', workshop: 'Al-Ghamdi Fleet Services', priority: 'Medium', status: 'Scheduled' },
  { id: 'SVC-008', vehicle: 'Bus 18', plate: 'AVI00123', vehicleType: 'Bus', serviceType: 'Scheduled', dueDate: '2026-04-30', odometer: '30,200 km', workshop: 'Depot A Workshop', priority: 'Low', status: 'Scheduled' },
];

const MOCK_ACTIVE: ActiveMaintenance[] = [
  { id: 'MNT-001', vehicle: 'Bus 09', plate: 'AVI0012', issue: 'Engine oil leak detected during pre-trip check', maintenanceType: 'Corrective', startDate: '2026-04-13', expectedCompletion: '2026-04-16', technician: 'Khalid Al-Otaibi', workshop: 'Al-Rashid Auto Center', costEstimate: 'SAR 2,400', status: 'In Progress' },
  { id: 'MNT-002', vehicle: 'Bus 25', plate: 'HSA1167', issue: 'Brake pads worn below minimum threshold', maintenanceType: 'Corrective', startDate: '2026-04-14', expectedCompletion: '2026-04-15', technician: 'Turki Al-Shehri', workshop: 'Service Center, Dammam', costEstimate: 'SAR 1,800', status: 'In Progress' },
  { id: 'MNT-003', vehicle: 'Bus 33', plate: 'KSA0003', issue: 'Transmission fluid replacement + filter change', maintenanceType: 'Preventive', startDate: '2026-04-12', expectedCompletion: '2026-04-17', technician: 'Omar Al-Ghamdi', workshop: 'Workshop 2, Jeddah', costEstimate: 'SAR 3,200', status: 'Pending Parts' },
  { id: 'MNT-004', vehicle: 'Van 05', plate: 'KSA0004', issue: 'AC compressor failure — full replacement required', maintenanceType: 'Emergency', startDate: '2026-04-15', expectedCompletion: '2026-04-18', technician: 'Nasser Al-Harbi', workshop: 'Depot B Workshop', costEstimate: 'SAR 5,600', status: 'In Progress' },
  { id: 'MNT-005', vehicle: 'Bus 41', plate: 'KSA0005', issue: 'Annual safety inspection + full service', maintenanceType: 'Scheduled', startDate: '2026-04-14', expectedCompletion: '2026-04-16', technician: 'Ahmed Al-Rashid', workshop: 'Al-Rashid Auto Center', costEstimate: 'SAR 4,100', status: 'In Progress' },
];

const MOCK_HISTORY: MaintenanceHistory[] = [
  { serviceId: 'SVC-H001', vehicle: 'Bus 14', plate: 'HSA1098', serviceType: 'Preventive', completedDate: '2026-03-28', workshop: 'Al-Rashid Auto Center', downtime: '6 hrs', finalCost: 'SAR 1,950', notes: 'Oil change, filter replacement, tire rotation completed.' },
  { serviceId: 'SVC-H002', vehicle: 'Bus 07', plate: 'XSA4247', serviceType: 'Corrective', completedDate: '2026-03-25', workshop: 'Depot B Workshop', downtime: '14 hrs', finalCost: 'SAR 3,400', notes: 'Alternator replaced. Battery tested and confirmed healthy.' },
  { serviceId: 'SVC-H003', vehicle: 'Bus 22', plate: 'ASA8887', serviceType: 'Emergency', completedDate: '2026-03-20', workshop: 'Service Center, Jeddah', downtime: '2 days', finalCost: 'SAR 8,750', notes: 'Engine overhaul following coolant system failure on route.' },
  { serviceId: 'SVC-H004', vehicle: 'Minibus 11', plate: 'KSA0002', serviceType: 'Scheduled', completedDate: '2026-03-18', workshop: 'Depot A Workshop', downtime: '4 hrs', finalCost: 'SAR 980', notes: 'Routine 50,000 km service. All checks passed.' },
  { serviceId: 'SVC-H005', vehicle: 'Bus 31', plate: 'AVI001', serviceType: 'Inspection', completedDate: '2026-03-15', workshop: 'Depot A Workshop', downtime: '3 hrs', finalCost: 'SAR 650', notes: 'Annual compliance inspection. Certificate renewed.' },
  { serviceId: 'SVC-H006', vehicle: 'Truck 02', plate: 'TRK0021', serviceType: 'Preventive', completedDate: '2026-03-10', workshop: 'Al-Ghamdi Fleet Services', downtime: '8 hrs', finalCost: 'SAR 2,200', notes: 'Brake system service, suspension check, lubrication.' },
  { serviceId: 'SVC-H007', vehicle: 'Bus 09', plate: 'AVI0012', serviceType: 'Corrective', completedDate: '2026-03-05', workshop: 'Al-Rashid Auto Center', downtime: '1 day', finalCost: 'SAR 4,300', notes: 'Fuel injector cleaning and replacement of 2 injectors.' },
  { serviceId: 'SVC-H008', vehicle: 'Bus 18', plate: 'AVI00123', serviceType: 'Scheduled', completedDate: '2026-02-28', workshop: 'Depot A Workshop', downtime: '5 hrs', finalCost: 'SAR 1,100', notes: '30,000 km service. Spark plugs and air filter replaced.' },
];

/* ─── Config maps ────────────────────────────────────────────────────────── */
const PRIORITY_CFG: Record<MaintenancePriority, { bg: string; text: string; border: string; dot: string }> = {
  Critical: { bg: 'bg-rose-50',    text: 'text-rose-800',    border: 'border-rose-200',    dot: 'bg-rose-500'    },
  High:     { bg: 'bg-amber-50',   text: 'text-amber-900',   border: 'border-amber-200',   dot: 'bg-amber-500'   },
  Medium:   { bg: 'bg-blue-50',    text: 'text-blue-800',    border: 'border-blue-200',    dot: 'bg-blue-400'    },
  Low:      { bg: 'bg-slate-50',   text: 'text-slate-700',   border: 'border-slate-200',   dot: 'bg-slate-400'   },
};

const STATUS_CFG: Record<MaintenanceStatus, { bg: string; text: string; border: string; dot: string }> = {
  Scheduled:       { bg: 'bg-blue-50',    text: 'text-blue-800',    border: 'border-blue-200',    dot: 'bg-blue-400'    },
  'In Progress':   { bg: 'bg-violet-50',  text: 'text-violet-800',  border: 'border-violet-200',  dot: 'bg-violet-500'  },
  Completed:       { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  Overdue:         { bg: 'bg-rose-50',    text: 'text-rose-800',    border: 'border-rose-200',    dot: 'bg-rose-500'    },
  Cancelled:       { bg: 'bg-slate-50',   text: 'text-slate-700',   border: 'border-slate-200',   dot: 'bg-slate-400'   },
  'Pending Parts': { bg: 'bg-amber-50',   text: 'text-amber-900',   border: 'border-amber-200',   dot: 'bg-amber-500'   },
};

const TYPE_CFG: Record<MaintenanceType, { color: string; icon: React.ElementType }> = {
  Preventive:  { color: 'text-blue-500',    icon: RefreshCw     },
  Corrective:  { color: 'text-amber-500',   icon: Wrench        },
  Emergency:   { color: 'text-rose-500',    icon: Zap           },
  Scheduled:   { color: 'text-violet-500',  icon: CalendarClock },
  Inspection:  { color: 'text-emerald-500', icon: CheckCircle2  },
};

/* ─── Atom components ────────────────────────────────────────────────────── */
function PriorityBadge({ priority }: { priority: MaintenancePriority }) {
  const cfg = PRIORITY_CFG[priority];
  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-sm border px-1.5 py-0 text-[10.5px] font-semibold uppercase leading-[1.125rem] tracking-[0.01rem]',
      cfg.bg, cfg.text, cfg.border,
    )}>
      <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', cfg.dot)} />
      {priority}
    </span>
  );
}

function StatusPill({ status }: { status: MaintenanceStatus }) {
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

function TypeBadge({ type }: { type: MaintenanceType }) {
  const cfg = TYPE_CFG[type];
  const Icon = cfg.icon;
  return (
    <div className="flex items-center gap-1.5">
      <Icon className={cn('h-3 w-3 shrink-0', cfg.color)} />
      <span className={fleetType.bodyPrimary}>{type}</span>
    </div>
  );
}

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

function ActionBtn({ icon: Icon, label, tone = 'default', onClick }: {
  icon: React.ElementType; label: string;
  tone?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  onClick?: () => void;
}) {
  const tones = {
    default:  'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
    primary:  'border-[#d0e2f0] bg-[#e8f0f8] text-[#2e5f8a] hover:bg-[#d8ecf8]',
    success:  'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
    warning:  'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100',
    danger:   'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100',
  };
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={cn(
        'inline-flex h-6 w-6 items-center justify-center rounded border transition-colors',
        tones[tone],
      )}
    >
      <Icon className="h-3 w-3" />
    </button>
  );
}

/* ─── Summary strip ─────────────────────────────────────────────────────── */
const SUMMARY_STATS = [
  { label: 'Under Maintenance', value: '18',        dot: 'bg-amber-500',   bg: 'bg-amber-50',   text: 'text-amber-800',   border: 'border-amber-200'   },
  { label: 'Scheduled',         value: '34',        dot: 'bg-blue-400',    bg: 'bg-blue-50',    text: 'text-blue-800',    border: 'border-blue-200'    },
  { label: 'Overdue',           value: '6',         dot: 'bg-rose-500',    bg: 'bg-rose-50',    text: 'text-rose-800',    border: 'border-rose-200'    },
  { label: 'Cost This Month',   value: 'SAR 48.2K', dot: 'bg-violet-500',  bg: 'bg-violet-50',  text: 'text-violet-800',  border: 'border-violet-200'  },
  { label: 'Completed',         value: '127',       dot: 'bg-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' },
  { label: 'Critical Issues',   value: '4',         dot: 'bg-rose-500',    bg: 'bg-rose-50',    text: 'text-rose-800',    border: 'border-rose-200'    },
] as const;

function MaintenanceSummaryCards() {
  return (
    <div className="shrink-0 flex flex-wrap items-center gap-1.5">
      {SUMMARY_STATS.map(s => (
        <div
          key={s.label}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold',
            s.bg, s.text, s.border,
          )}
        >
          <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', s.dot)} />
          {s.label}
          <span className={cn('ml-0.5 rounded px-1 py-0 text-[10px] font-bold tabular-nums', s.bg, s.text)}>
            {s.value}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Toolbar / Filters ──────────────────────────────────────────────────── */
interface MaintenanceToolbarProps {
  search: string;
  onSearchChange: (v: string) => void;
  onSearch: () => void;
  onReset: () => void;
  filterType: string;
  onFilterType: (v: string) => void;
  filterStatus: string;
  onFilterStatus: (v: string) => void;
  filterPriority: string;
  onFilterPriority: (v: string) => void;
  filterVehicleType: string;
  onFilterVehicleType: (v: string) => void;
}

function MaintenanceToolbar({
  search, onSearchChange, onSearch, onReset,
  filterType, onFilterType,
  filterStatus, onFilterStatus,
  filterPriority, onFilterPriority,
  filterVehicleType, onFilterVehicleType,
}: MaintenanceToolbarProps) {
  return (
    <div className={cn(
      'flex flex-wrap items-center rounded-md border border-[#d4e0ea] bg-white shadow-sm',
      fleetSurface.filterBar,
      fleetSurface.barGap,
    )}>
      {/* Search */}
      <div className="relative min-w-[180px] flex-1 max-w-[280px]">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 z-10 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" aria-hidden />
        <input
          type="text"
          placeholder="Search vehicle, plate, service ID…"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSearch()}
          className="h-8 w-full rounded-md border border-[#d4e0ea] bg-white pl-8 pr-3 text-xs font-medium text-slate-700 placeholder:font-normal placeholder:text-slate-300 shadow-sm focus:border-[#3d6b8e]/50 focus:outline-none focus:ring-1 focus:ring-[#3d6b8e]/20"
        />
      </div>

      <FilterSelect label="Type"         value={filterType}        onChange={onFilterType}        options={['Preventive','Corrective','Emergency','Scheduled','Inspection']} />
      <FilterSelect label="Status"       value={filterStatus}      onChange={onFilterStatus}      options={['Scheduled','In Progress','Completed','Overdue','Cancelled','Pending Parts']} />
      <FilterSelect label="Priority"     value={filterPriority}    onChange={onFilterPriority}    options={['Critical','High','Medium','Low']} />
      <FilterSelect label="Vehicle Type" value={filterVehicleType} onChange={onFilterVehicleType} options={['Bus','Minibus','Van','Truck']} />

      {/* divider */}
      <div className="h-5 w-px shrink-0 bg-slate-200" />

      <button
        type="button"
        onClick={onReset}
        className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700"
      >
        <X className="h-3.5 w-3.5" />
        Reset
      </button>
      <FleetToolbarButton tone="primary" onClick={onSearch}>
        <Search className="h-3.5 w-3.5" />
        Search
      </FleetToolbarButton>

      {/* push CTAs to the right */}
      <div className="ml-auto flex shrink-0 items-center gap-1.5">
        <div className="h-5 w-px shrink-0 bg-slate-200" />
        <FleetToolbarButton tone="primary">
          <Plus className="h-3.5 w-3.5" />
          Add Record
        </FleetToolbarButton>
        <FleetToolbarButton tone="success">
          <CalendarClock className="h-3.5 w-3.5" />
          Schedule Service
        </FleetToolbarButton>
      </div>
    </div>
  );
}

/* ─── Table toolbar export buttons (shared) ──────────────────────────────── */
function ExportButtons() {
  return (
    <>
      <FleetToolbarButton tone="primary">
        <FileDown className="h-3.5 w-3.5" />
        Excel
      </FleetToolbarButton>
      <FleetToolbarButton tone="danger">
        <FileDown className="h-3.5 w-3.5" />
        PDF
      </FleetToolbarButton>
    </>
  );
}

/* ─── UpcomingServicesTable ──────────────────────────────────────────────── */
function UpcomingServicesTable({ rows }: { rows: UpcomingService[] }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const paged = rows.slice((page - 1) * pageSize, page * pageSize);

  return (
    <DataTable className="flex-1 min-w-0">
      <DataTableToolbar>
        <div className="flex min-w-0 items-center gap-2">
          <h3 className="text-sm font-bold uppercase tracking-[0.02rem] text-slate-800">
            Upcoming Services
            <span className="ml-1.5 text-xs font-normal normal-case text-slate-400">
              {rows.length} record{rows.length !== 1 ? 's' : ''}
            </span>
          </h3>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <ExportButtons />
        </div>
      </DataTableToolbar>

      <DataTableBodyScroll>
        <DataTableTable className="min-w-[1100px]">
          <TableHeader>
            <tr>
              <TableHeaderCell className="w-[90px]">Service ID</TableHeaderCell>
              <TableHeaderCell className="w-[130px]">Vehicle</TableHeaderCell>
              <TableHeaderCell className="w-[120px]">Service Type</TableHeaderCell>
              <TableHeaderCell className="w-[100px]">Due Date</TableHeaderCell>
              <TableHeaderCell className="w-[120px]">Odometer / Usage</TableHeaderCell>
              <TableHeaderCell className="w-[160px]">Assigned Workshop</TableHeaderCell>
              <TableHeaderCell className="w-[90px]">Priority</TableHeaderCell>
              <TableHeaderCell className="w-[110px]">Status</TableHeaderCell>
              <TableHeaderCell className="w-[80px]" align="center">Actions</TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-10 text-center text-xs text-slate-400">No upcoming services found.</td>
              </tr>
            ) : paged.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <span className={cn(fleetType.bodyMono, 'text-[#3d6b8e] font-bold')}>{row.id}</span>
                </TableCell>
                <TableCell>
                  <p className={fleetType.bodyPrimary}>{row.vehicle}</p>
                  <p className={cn(fleetType.bodyMuted, 'mt-0.5')}>{row.plate}</p>
                </TableCell>
                <TableCell><TypeBadge type={row.serviceType} /></TableCell>
                <TableCell>
                  <span className={cn(fleetType.bodyMonoMuted, row.status === 'Overdue' && 'text-rose-600 font-semibold')}>
                    {row.dueDate}
                  </span>
                </TableCell>
                <TableCell><span className={fleetType.bodyMonoMuted}>{row.odometer}</span></TableCell>
                <TableCell>
                  <span className={cn(fleetType.bodyPrimary, 'block max-w-[150px] truncate')} title={row.workshop}>{row.workshop}</span>
                </TableCell>
                <TableCell><PriorityBadge priority={row.priority} /></TableCell>
                <TableCell><StatusPill status={row.status} /></TableCell>
                <TableCell align="center">
                  <div className="flex items-center justify-center gap-1">
                    <ActionBtn icon={FileText} label="View" tone="primary" />
                    <ActionBtn icon={CalendarClock} label="Reschedule" tone="warning" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </DataTableTable>
      </DataTableBodyScroll>

      <TablePagination page={page} pageSize={pageSize} totalCount={rows.length} onPageChange={setPage} onPageSizeChange={s => { setPageSize(s); setPage(1); }} />
    </DataTable>
  );
}

/* ─── ActiveMaintenanceTable ─────────────────────────────────────────────── */
function ActiveMaintenanceTable({ rows }: { rows: ActiveMaintenance[] }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const paged = rows.slice((page - 1) * pageSize, page * pageSize);

  return (
    <DataTable className="flex-1 min-w-0">
      <DataTableToolbar>
        <div className="flex min-w-0 items-center gap-2">
          <h3 className="text-sm font-bold uppercase tracking-[0.02rem] text-slate-800">
            Active Maintenance
            <span className="ml-1.5 text-xs font-normal normal-case text-slate-400">
              {rows.length} record{rows.length !== 1 ? 's' : ''}
            </span>
          </h3>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <ExportButtons />
        </div>
      </DataTableToolbar>

      <DataTableBodyScroll>
        <DataTableTable className="min-w-[1200px]">
          <TableHeader>
            <tr>
              <TableHeaderCell className="w-[90px]">ID</TableHeaderCell>
              <TableHeaderCell className="w-[120px]">Vehicle</TableHeaderCell>
              <TableHeaderCell className="w-[200px]">Issue</TableHeaderCell>
              <TableHeaderCell className="w-[120px]">Type</TableHeaderCell>
              <TableHeaderCell className="w-[100px]">Start Date</TableHeaderCell>
              <TableHeaderCell className="w-[120px]">Exp. Completion</TableHeaderCell>
              <TableHeaderCell className="w-[150px]">Technician / Workshop</TableHeaderCell>
              <TableHeaderCell className="w-[110px]">Cost Estimate</TableHeaderCell>
              <TableHeaderCell className="w-[110px]">Status</TableHeaderCell>
              <TableHeaderCell className="w-[80px]" align="center">Actions</TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-10 text-center text-xs text-slate-400">No active maintenance records found.</td>
              </tr>
            ) : paged.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <span className={cn(fleetType.bodyMono, 'text-[#3d6b8e] font-bold')}>{row.id}</span>
                </TableCell>
                <TableCell>
                  <p className={fleetType.bodyPrimary}>{row.vehicle}</p>
                  <p className={cn(fleetType.bodyMuted, 'mt-0.5')}>{row.plate}</p>
                </TableCell>
                <TableCell>
                  <span className={cn(fleetType.bodyPrimary, 'line-clamp-2 leading-snug')} title={row.issue}>{row.issue}</span>
                </TableCell>
                <TableCell><TypeBadge type={row.maintenanceType} /></TableCell>
                <TableCell><span className={fleetType.bodyMonoMuted}>{row.startDate}</span></TableCell>
                <TableCell><span className={fleetType.bodyMonoMuted}>{row.expectedCompletion}</span></TableCell>
                <TableCell>
                  <p className={fleetType.bodyPrimary}>{row.technician}</p>
                  <p className={cn(fleetType.bodyMuted, 'mt-0.5 max-w-[140px] truncate')} title={row.workshop}>{row.workshop}</p>
                </TableCell>
                <TableCell>
                  <span className={cn(fleetType.bodyMono, 'font-semibold text-slate-800')}>{row.costEstimate}</span>
                </TableCell>
                <TableCell><StatusPill status={row.status} /></TableCell>
                <TableCell align="center">
                  <div className="flex items-center justify-center gap-1">
                    <ActionBtn icon={FileText} label="View" tone="primary" />
                    <ActionBtn icon={CheckCircle2} label="Complete" tone="success" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </DataTableTable>
      </DataTableBodyScroll>

      <TablePagination page={page} pageSize={pageSize} totalCount={rows.length} onPageChange={setPage} onPageSizeChange={s => { setPageSize(s); setPage(1); }} />
    </DataTable>
  );
}

/* ─── MaintenanceHistoryTable ────────────────────────────────────────────── */
function MaintenanceHistoryTable({ rows }: { rows: MaintenanceHistory[] }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const paged = rows.slice((page - 1) * pageSize, page * pageSize);

  return (
    <DataTable className="flex-1 min-w-0">
      <DataTableToolbar>
        <div className="flex min-w-0 items-center gap-2">
          <h3 className="text-sm font-bold uppercase tracking-[0.02rem] text-slate-800">
            Maintenance History
            <span className="ml-1.5 text-xs font-normal normal-case text-slate-400">
              {rows.length} record{rows.length !== 1 ? 's' : ''}
            </span>
          </h3>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <ExportButtons />
        </div>
      </DataTableToolbar>

      <DataTableBodyScroll>
        <DataTableTable className="min-w-[1100px]">
          <TableHeader>
            <tr>
              <TableHeaderCell className="w-[100px]">Service ID</TableHeaderCell>
              <TableHeaderCell className="w-[130px]">Vehicle</TableHeaderCell>
              <TableHeaderCell className="w-[120px]">Service Type</TableHeaderCell>
              <TableHeaderCell className="w-[110px]">Completed Date</TableHeaderCell>
              <TableHeaderCell className="w-[160px]">Workshop</TableHeaderCell>
              <TableHeaderCell className="w-[90px]">Downtime</TableHeaderCell>
              <TableHeaderCell className="w-[110px]">Final Cost</TableHeaderCell>
              <TableHeaderCell className="w-[200px]">Notes</TableHeaderCell>
              <TableHeaderCell className="w-[70px]" align="center">Actions</TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-10 text-center text-xs text-slate-400">No maintenance history found.</td>
              </tr>
            ) : paged.map(row => (
              <TableRow key={row.serviceId}>
                <TableCell>
                  <span className={cn(fleetType.bodyMono, 'text-[#3d6b8e] font-bold')}>{row.serviceId}</span>
                </TableCell>
                <TableCell>
                  <p className={fleetType.bodyPrimary}>{row.vehicle}</p>
                  <p className={cn(fleetType.bodyMuted, 'mt-0.5')}>{row.plate}</p>
                </TableCell>
                <TableCell><TypeBadge type={row.serviceType} /></TableCell>
                <TableCell><span className={fleetType.bodyMonoMuted}>{row.completedDate}</span></TableCell>
                <TableCell>
                  <span className={cn(fleetType.bodyPrimary, 'block max-w-[150px] truncate')} title={row.workshop}>{row.workshop}</span>
                </TableCell>
                <TableCell><span className={cn(fleetType.bodyMono, 'text-slate-700')}>{row.downtime}</span></TableCell>
                <TableCell>
                  <span className={cn(fleetType.bodyMono, 'font-semibold text-slate-800')}>{row.finalCost}</span>
                </TableCell>
                <TableCell>
                  <span className={cn(fleetType.bodyPrimary, 'line-clamp-2 leading-snug text-slate-500')} title={row.notes}>{row.notes || '—'}</span>
                </TableCell>
                <TableCell align="center">
                  <ActionBtn icon={FileText} label="View Report" tone="primary" />
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </DataTableTable>
      </DataTableBodyScroll>

      <TablePagination page={page} pageSize={pageSize} totalCount={rows.length} onPageChange={setPage} onPageSizeChange={s => { setPageSize(s); setPage(1); }} />
    </DataTable>
  );
}

/* ─── Insights Sidebar ───────────────────────────────────────────────────── */
const COST_TREND = [
  { month: 'Nov', cost: 32400 },
  { month: 'Dec', cost: 38100 },
  { month: 'Jan', cost: 29800 },
  { month: 'Feb', cost: 41500 },
  { month: 'Mar', cost: 41500 },
  { month: 'Apr', cost: 48200 },
];

const ISSUE_TYPES = [
  { label: 'Engine / Drivetrain', count: 38, pct: 30 },
  { label: 'Brakes & Suspension', count: 29, pct: 23 },
  { label: 'Electrical / AC',     count: 24, pct: 19 },
  { label: 'Tires & Wheels',      count: 19, pct: 15 },
  { label: 'Body & Exterior',     count: 17, pct: 13 },
];

const TOP_COST_VEHICLES = [
  { vehicle: 'Bus 22',    plate: 'ASA8887', cost: 'SAR 12,400' },
  { vehicle: 'Bus 09',    plate: 'AVI0012', cost: 'SAR 9,800'  },
  { vehicle: 'Truck 02',  plate: 'TRK0021', cost: 'SAR 8,200'  },
  { vehicle: 'Bus 33',    plate: 'KSA0003', cost: 'SAR 7,600'  },
  { vehicle: 'Van 05',    plate: 'KSA0004', cost: 'SAR 6,900'  },
];

const maxCost = Math.max(...COST_TREND.map(d => d.cost));

function MaintenanceInsights() {
  return (
    <div className="flex flex-col divide-y divide-slate-100 pb-3">
      {/* Cost Trend */}
      <div className="px-3 py-2.5">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Cost Trend (6 mo)</p>
        <div className="flex items-end gap-1" style={{ height: 64 }}>
          {COST_TREND.map(d => {
            const h = Math.round((d.cost / maxCost) * 52);
            const isLatest = d.month === 'Apr';
            return (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-0.5">
                <span className={cn('text-[8.5px] font-semibold tabular-nums leading-none', isLatest ? 'text-[#2e5f8a]' : 'text-slate-400')}>
                  {(d.cost / 1000).toFixed(0)}K
                </span>
                <div className={cn('w-full rounded-t-sm', isLatest ? 'bg-[#3d6b8e]' : 'bg-[#c8dcea]')} style={{ height: h }} />
                <span className="text-[8.5px] font-medium leading-none text-slate-400">{d.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Frequent Issue Types */}
      <div className="px-3 py-2.5">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Frequent Issues</p>
        <div className="flex flex-col gap-1.5">
          {ISSUE_TYPES.map(item => (
            <div key={item.label}>
              <div className="mb-0.5 flex items-center justify-between gap-1">
                <span className="min-w-0 truncate text-[10.5px] font-medium text-slate-600" title={item.label}>{item.label}</span>
                <span className="shrink-0 text-[10px] font-semibold tabular-nums text-slate-500">{item.count}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-[#3d6b8e]/70" style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Cost Vehicles */}
      <div className="px-3 py-2.5">
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Highest Cost</p>
        <div className="flex flex-col divide-y divide-slate-100">
          {TOP_COST_VEHICLES.map((v, i) => (
            <div key={v.vehicle} className="flex items-center gap-2 py-1.5">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[9px] font-bold text-slate-500">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold text-slate-800">{v.vehicle}</p>
                <p className="text-[9.5px] font-medium uppercase tracking-wide text-slate-400">{v.plate}</p>
              </div>
              <span className="shrink-0 text-[11px] font-bold tabular-nums text-[#2e5f8a]">{v.cost}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Completion Rate */}
      <div className="px-3 py-2.5">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Completion Rate</p>
        <div className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
            <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e8eef4" strokeWidth="3.2" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3d6b8e" strokeWidth="3.2" strokeDasharray="87 13" strokeLinecap="round" />
            </svg>
            <span className="absolute text-[12px] font-bold text-slate-800">87%</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-slate-700">On-Time</p>
            <p className="mt-0.5 text-[10px] leading-snug text-slate-400">127 of 146 on schedule</p>
            <span className="mt-1 inline-flex items-center gap-1 rounded-sm border border-emerald-200 bg-emerald-50 px-1.5 py-0 text-[10px] font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              +4% vs last month
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */
export default function MaintenanceRecordsPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('upcoming');
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterVehicleType, setFilterVehicleType] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({ type: '', status: '', priority: '', vehicleType: '' });

  function handleSearch() {
    setAppliedSearch(search);
    setAppliedFilters({ type: filterType, status: filterStatus, priority: filterPriority, vehicleType: filterVehicleType });
  }

  function handleReset() {
    setSearch(''); setFilterType(''); setFilterStatus('');
    setFilterPriority(''); setFilterVehicleType('');
    setAppliedSearch('');
    setAppliedFilters({ type: '', status: '', priority: '', vehicleType: '' });
  }

  const filteredUpcoming = useMemo(() => MOCK_UPCOMING.filter(r => {
    const q = appliedSearch.toLowerCase();
    return (
      (!q || r.vehicle.toLowerCase().includes(q) || r.plate.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)) &&
      (!appliedFilters.type || r.serviceType === appliedFilters.type) &&
      (!appliedFilters.status || r.status === appliedFilters.status) &&
      (!appliedFilters.priority || r.priority === appliedFilters.priority) &&
      (!appliedFilters.vehicleType || r.vehicleType === appliedFilters.vehicleType)
    );
  }), [appliedSearch, appliedFilters]);

  const filteredActive = useMemo(() => MOCK_ACTIVE.filter(r => {
    const q = appliedSearch.toLowerCase();
    return (
      (!q || r.vehicle.toLowerCase().includes(q) || r.plate.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)) &&
      (!appliedFilters.type || r.maintenanceType === appliedFilters.type) &&
      (!appliedFilters.status || r.status === appliedFilters.status)
    );
  }), [appliedSearch, appliedFilters]);

  const filteredHistory = useMemo(() => MOCK_HISTORY.filter(r => {
    const q = appliedSearch.toLowerCase();
    return (
      (!q || r.vehicle.toLowerCase().includes(q) || r.plate.toLowerCase().includes(q) || r.serviceId.toLowerCase().includes(q)) &&
      (!appliedFilters.type || r.serviceType === appliedFilters.type)
    );
  }), [appliedSearch, appliedFilters]);

  return (
    <PageLayout title="Maintenance">
      {/*
        Two-column layout: left = all stacked content, right = sidebar.
        The sidebar starts at the very top, aligned with the filter bar.
      */}
      <div className="flex min-h-0 flex-1 gap-2 overflow-hidden">

        {/* ── Left column: toolbar → chips → tabs → table ── */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2 overflow-hidden">

          {/* Filter bar + CTAs */}
          <MaintenanceToolbar
            search={search} onSearchChange={setSearch} onSearch={handleSearch} onReset={handleReset}
            filterType={filterType} onFilterType={setFilterType}
            filterStatus={filterStatus} onFilterStatus={setFilterStatus}
            filterPriority={filterPriority} onFilterPriority={setFilterPriority}
            filterVehicleType={filterVehicleType} onFilterVehicleType={setFilterVehicleType}
          />

          {/* Summary chips */}
          <MaintenanceSummaryCards />

          {/* Tabs + table */}
          <Tabs value={activeTab} onValueChange={v => setActiveTab(v as ActiveTab)} className="flex min-h-0 flex-1 flex-col">
            <TabsList variant="default" size="sm" className="mb-2 shrink-0 self-start">
              <TabsTrigger value="upcoming">
                <CalendarClock className="h-3.5 w-3.5" />
                Upcoming Services
              </TabsTrigger>
              <TabsTrigger value="active">
                <Wrench className="h-3.5 w-3.5" />
                Active Maintenance
              </TabsTrigger>
              <TabsTrigger value="history">
                <Clock className="h-3.5 w-3.5" />
                Maintenance History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="flex min-h-0 flex-1 flex-col mt-0">
              <UpcomingServicesTable rows={filteredUpcoming} />
            </TabsContent>
            <TabsContent value="active" className="flex min-h-0 flex-1 flex-col mt-0">
              <ActiveMaintenanceTable rows={filteredActive} />
            </TabsContent>
            <TabsContent value="history" className="flex min-h-0 flex-1 flex-col mt-0">
              <MaintenanceHistoryTable rows={filteredHistory} />
            </TabsContent>
          </Tabs>
        </div>

        {/* ── Right column: Insights sidebar, full height, scrolls if needed ── */}
        <div className="hidden w-[232px] shrink-0 overflow-hidden rounded-md border border-[#d4e0ea] bg-white shadow-sm xl:flex xl:flex-col">
          <div className="shrink-0 border-b border-[#d4e0ea] px-3 py-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.06em] text-[#3d6b8e]">Insights</h3>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-gutter:stable]">
            <MaintenanceInsights />
          </div>
        </div>

      </div>
    </PageLayout>
  );
}
