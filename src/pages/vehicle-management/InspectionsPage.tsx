import { useState, useMemo } from 'react';
import {
  AlertTriangle,
  Ban,
  Bell,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDot,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Download,
  FileDown,
  FileText,
  Filter,
  Gauge,
  Info,
  Loader2,
  MapPin,
  Milestone,
  Plus,
  RefreshCw,
  Search,
  Shield,
  ShieldCheck,
  User,
  Wrench,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
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

/* ─── Types ──────────────────────────────────────────────────────────────── */
type InspectionType =
  | 'Safety'
  | 'Pre-Trip'
  | 'Post-Trip'
  | 'Maintenance'
  | 'Compliance'
  | 'Annual';

type InspectionResult = 'Passed' | 'Failed' | 'Conditional' | 'Not Started';
type InspectionStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Overdue' | 'Cancelled';

type ChecklistItemStatus = 'Passed' | 'Failed' | 'Needs Attention';

interface ChecklistItem {
  label: string;
  status: ChecklistItemStatus;
}

interface Inspection {
  id: string;
  vehicle: string;
  plate: string;
  type: InspectionType;
  inspector: string;
  scheduledDate: string;
  completedDate: string;
  result: InspectionResult;
  status: InspectionStatus;
  location: string;
  driver: string;
  checklist: string;
  notes: string;
  odometer: string;
  lastServiceDate: string;
  checklistItems: ChecklistItem[];
}

/* ─── Mock data ──────────────────────────────────────────────────────────── */
const MOCK_INSPECTIONS: Inspection[] = [
  {
    id: 'INS-001', vehicle: 'Bus 14', plate: 'HSA1098', type: 'Safety',
    inspector: 'Ahmed Al-Rashid', scheduledDate: '2024-10-22', completedDate: '2024-10-22',
    result: 'Passed', status: 'Completed', location: 'Depot A, Riyadh',
    driver: 'Khalid Al-Otaibi', checklist: 'Safety Checklist v3', notes: 'All items passed. Vehicle in good condition.',
    odometer: '84,210 km', lastServiceDate: '2024-09-15',
    checklistItems: [
      { label: 'Brakes', status: 'Passed' }, { label: 'Lights', status: 'Passed' },
      { label: 'Tires', status: 'Passed' }, { label: 'Mirrors', status: 'Passed' },
      { label: 'Engine', status: 'Passed' }, { label: 'Battery', status: 'Passed' },
      { label: 'Documents', status: 'Passed' },
    ],
  },
  {
    id: 'INS-002', vehicle: 'Bus 07', plate: 'XSA4247', type: 'Pre-Trip',
    inspector: 'Omar Al-Ghamdi', scheduledDate: '2024-10-22', completedDate: '2024-10-22',
    result: 'Conditional', status: 'Completed', location: 'Depot B, Riyadh',
    driver: 'Faisal Al-Dosari', checklist: 'Pre-Trip Standard v2', notes: 'Left rear tire pressure low. Driver advised to monitor.',
    odometer: '61,540 km', lastServiceDate: '2024-08-20',
    checklistItems: [
      { label: 'Brakes', status: 'Passed' }, { label: 'Lights', status: 'Passed' },
      { label: 'Tires', status: 'Needs Attention' }, { label: 'Mirrors', status: 'Passed' },
      { label: 'Engine', status: 'Passed' }, { label: 'Battery', status: 'Passed' },
      { label: 'Documents', status: 'Passed' },
    ],
  },
  {
    id: 'INS-003', vehicle: 'Bus 22', plate: 'ASA8887', type: 'Annual',
    inspector: 'Nasser Al-Harbi', scheduledDate: '2024-10-20', completedDate: '2024-10-21',
    result: 'Failed', status: 'Completed', location: 'Service Center, Jeddah',
    driver: 'Saad Al-Qahtani', checklist: 'Annual Compliance v5', notes: 'Brake pads worn below minimum threshold. Engine oil leak detected. Vehicle grounded pending repair.',
    odometer: '142,800 km', lastServiceDate: '2024-07-10',
    checklistItems: [
      { label: 'Brakes', status: 'Failed' }, { label: 'Lights', status: 'Passed' },
      { label: 'Tires', status: 'Needs Attention' }, { label: 'Mirrors', status: 'Passed' },
      { label: 'Engine', status: 'Failed' }, { label: 'Battery', status: 'Passed' },
      { label: 'Documents', status: 'Passed' },
    ],
  },
  {
    id: 'INS-004', vehicle: 'Bus 03', plate: 'KSA0001', type: 'Maintenance',
    inspector: 'Turki Al-Shehri', scheduledDate: '2024-10-23', completedDate: '',
    result: 'Not Started', status: 'Scheduled', location: 'Workshop 1, Riyadh',
    driver: 'Unassigned', checklist: 'Maintenance Checklist v4', notes: '',
    odometer: '98,320 km', lastServiceDate: '2024-06-30',
    checklistItems: [
      { label: 'Brakes', status: 'Passed' }, { label: 'Lights', status: 'Passed' },
      { label: 'Tires', status: 'Passed' }, { label: 'Mirrors', status: 'Passed' },
      { label: 'Engine', status: 'Passed' }, { label: 'Battery', status: 'Passed' },
      { label: 'Documents', status: 'Passed' },
    ],
  },
  {
    id: 'INS-005', vehicle: 'Bus 31', plate: 'AVI001', type: 'Compliance',
    inspector: 'Faisal Al-Dosari', scheduledDate: '2024-10-18', completedDate: '',
    result: 'Not Started', status: 'Overdue', location: 'Depot A, Riyadh',
    driver: 'Ahmed Al-Rashid', checklist: 'Compliance Checklist v2', notes: 'Inspection overdue by 4 days. Escalated to fleet manager.',
    odometer: '55,100 km', lastServiceDate: '2024-09-01',
    checklistItems: [
      { label: 'Brakes', status: 'Passed' }, { label: 'Lights', status: 'Passed' },
      { label: 'Tires', status: 'Passed' }, { label: 'Mirrors', status: 'Passed' },
      { label: 'Engine', status: 'Passed' }, { label: 'Battery', status: 'Passed' },
      { label: 'Documents', status: 'Needs Attention' },
    ],
  },
  {
    id: 'INS-006', vehicle: 'Bus 09', plate: 'AVI0012', type: 'Post-Trip',
    inspector: 'Khalid Al-Otaibi', scheduledDate: '2024-10-22', completedDate: '',
    result: 'Not Started', status: 'In Progress', location: 'Depot B, Riyadh',
    driver: 'Omar Al-Ghamdi', checklist: 'Post-Trip Standard v2', notes: '',
    odometer: '73,450 km', lastServiceDate: '2024-10-01',
    checklistItems: [
      { label: 'Brakes', status: 'Passed' }, { label: 'Lights', status: 'Passed' },
      { label: 'Tires', status: 'Passed' }, { label: 'Mirrors', status: 'Passed' },
      { label: 'Engine', status: 'Needs Attention' }, { label: 'Battery', status: 'Passed' },
      { label: 'Documents', status: 'Passed' },
    ],
  },
  {
    id: 'INS-007', vehicle: 'Bus 18', plate: 'AVI00123', type: 'Safety',
    inspector: 'Saad Al-Qahtani', scheduledDate: '2024-10-21', completedDate: '2024-10-21',
    result: 'Passed', status: 'Completed', location: 'Depot A, Riyadh',
    driver: 'Nasser Al-Harbi', checklist: 'Safety Checklist v3', notes: 'Routine safety check. No issues found.',
    odometer: '29,870 km', lastServiceDate: '2024-10-05',
    checklistItems: [
      { label: 'Brakes', status: 'Passed' }, { label: 'Lights', status: 'Passed' },
      { label: 'Tires', status: 'Passed' }, { label: 'Mirrors', status: 'Passed' },
      { label: 'Engine', status: 'Passed' }, { label: 'Battery', status: 'Passed' },
      { label: 'Documents', status: 'Passed' },
    ],
  },
  {
    id: 'INS-008', vehicle: 'Bus 25', plate: 'HSA1167', type: 'Annual',
    inspector: 'Turki Al-Shehri', scheduledDate: '2024-10-24', completedDate: '',
    result: 'Not Started', status: 'Scheduled', location: 'Service Center, Dammam',
    driver: 'Faisal Al-Dosari', checklist: 'Annual Compliance v5', notes: '',
    odometer: '118,600 km', lastServiceDate: '2024-05-22',
    checklistItems: [
      { label: 'Brakes', status: 'Passed' }, { label: 'Lights', status: 'Passed' },
      { label: 'Tires', status: 'Passed' }, { label: 'Mirrors', status: 'Passed' },
      { label: 'Engine', status: 'Passed' }, { label: 'Battery', status: 'Passed' },
      { label: 'Documents', status: 'Passed' },
    ],
  },
  {
    id: 'INS-009', vehicle: 'Bus 11', plate: 'KSA0002', type: 'Pre-Trip',
    inspector: 'Ahmed Al-Rashid', scheduledDate: '2024-10-22', completedDate: '2024-10-22',
    result: 'Passed', status: 'Completed', location: 'Depot C, Jeddah',
    driver: 'Turki Al-Shehri', checklist: 'Pre-Trip Standard v2', notes: 'All clear.',
    odometer: '47,200 km', lastServiceDate: '2024-09-28',
    checklistItems: [
      { label: 'Brakes', status: 'Passed' }, { label: 'Lights', status: 'Passed' },
      { label: 'Tires', status: 'Passed' }, { label: 'Mirrors', status: 'Passed' },
      { label: 'Engine', status: 'Passed' }, { label: 'Battery', status: 'Passed' },
      { label: 'Documents', status: 'Passed' },
    ],
  },
  {
    id: 'INS-010', vehicle: 'Bus 33', plate: 'KSA0003', type: 'Maintenance',
    inspector: 'Omar Al-Ghamdi', scheduledDate: '2024-10-19', completedDate: '',
    result: 'Not Started', status: 'Overdue', location: 'Workshop 2, Jeddah',
    driver: 'Unassigned', checklist: 'Maintenance Checklist v4', notes: 'Overdue by 3 days. Awaiting workshop slot.',
    odometer: '201,400 km', lastServiceDate: '2024-04-15',
    checklistItems: [
      { label: 'Brakes', status: 'Needs Attention' }, { label: 'Lights', status: 'Passed' },
      { label: 'Tires', status: 'Needs Attention' }, { label: 'Mirrors', status: 'Passed' },
      { label: 'Engine', status: 'Needs Attention' }, { label: 'Battery', status: 'Failed' },
      { label: 'Documents', status: 'Passed' },
    ],
  },
  {
    id: 'INS-011', vehicle: 'Bus 05', plate: 'KSA0004', type: 'Compliance',
    inspector: 'Nasser Al-Harbi', scheduledDate: '2024-10-22', completedDate: '2024-10-22',
    result: 'Passed', status: 'Completed', location: 'Depot A, Riyadh',
    driver: 'Saad Al-Qahtani', checklist: 'Compliance Checklist v2', notes: 'All compliance documents valid.',
    odometer: '33,900 km', lastServiceDate: '2024-10-10',
    checklistItems: [
      { label: 'Brakes', status: 'Passed' }, { label: 'Lights', status: 'Passed' },
      { label: 'Tires', status: 'Passed' }, { label: 'Mirrors', status: 'Passed' },
      { label: 'Engine', status: 'Passed' }, { label: 'Battery', status: 'Passed' },
      { label: 'Documents', status: 'Passed' },
    ],
  },
  {
    id: 'INS-012', vehicle: 'Bus 41', plate: 'KSA0005', type: 'Safety',
    inspector: 'Khalid Al-Otaibi', scheduledDate: '2024-10-23', completedDate: '',
    result: 'Not Started', status: 'Cancelled', location: 'Depot B, Riyadh',
    driver: 'Ahmed Al-Rashid', checklist: 'Safety Checklist v3', notes: 'Cancelled — vehicle out of service for unrelated repair.',
    odometer: '88,750 km', lastServiceDate: '2024-08-05',
    checklistItems: [
      { label: 'Brakes', status: 'Passed' }, { label: 'Lights', status: 'Passed' },
      { label: 'Tires', status: 'Passed' }, { label: 'Mirrors', status: 'Passed' },
      { label: 'Engine', status: 'Passed' }, { label: 'Battery', status: 'Passed' },
      { label: 'Documents', status: 'Passed' },
    ],
  },
];

/* ─── Config maps ────────────────────────────────────────────────────────── */
const RESULT_CFG: Record<InspectionResult, { bg: string; text: string; border: string; icon: React.ElementType }> = {
  Passed:      { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: CheckCircle2 },
  Failed:      { bg: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-200',    icon: AlertTriangle },
  Conditional: { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200',   icon: Info },
  'Not Started': { bg: 'bg-slate-50', text: 'text-slate-500',   border: 'border-slate-200',   icon: CircleDot },
};

const STATUS_CFG: Record<InspectionStatus, { bg: string; text: string; border: string; dot: string }> = {
  Scheduled:   { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200',    dot: 'bg-blue-400'    },
  'In Progress': { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200',  dot: 'bg-violet-500'  },
  Completed:   { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  Overdue:     { bg: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-200',    dot: 'bg-rose-500'    },
  Cancelled:   { bg: 'bg-slate-50',   text: 'text-slate-500',   border: 'border-slate-200',   dot: 'bg-slate-400'   },
};

const CHECKLIST_ITEM_CFG: Record<ChecklistItemStatus, { text: string; dot: string; icon: React.ElementType }> = {
  Passed:          { text: 'text-emerald-600', dot: 'bg-emerald-500', icon: CheckCircle2 },
  Failed:          { text: 'text-rose-600',    dot: 'bg-rose-500',    icon: AlertTriangle },
  'Needs Attention': { text: 'text-amber-600', dot: 'bg-amber-400',   icon: Info },
};

const TYPE_ICON: Record<InspectionType, React.ElementType> = {
  Safety:      Shield,
  'Pre-Trip':  ClipboardCheck,
  'Post-Trip': ClipboardList,
  Maintenance: Wrench,
  Compliance:  ShieldCheck,
  Annual:      CalendarDays,
};

/* ─── Reusable atoms ─────────────────────────────────────────────────────── */

/** InspectionResultBadge */
function InspectionResultBadge({ result }: { result: InspectionResult }) {
  const cfg = RESULT_CFG[result];
  const Icon = cfg.icon;
  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-sm border px-1.5 py-0 text-[10.5px] font-semibold uppercase leading-[1.125rem] tracking-[0.01rem]',
      cfg.bg, cfg.text, cfg.border,
    )}>
      <Icon className="h-2.5 w-2.5 shrink-0" />
      {result}
    </span>
  );
}

/** InspectionStatusPill */
function InspectionStatusPill({ status }: { status: InspectionStatus }) {
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

/** ChecklistStatusItem */
function ChecklistStatusItem({ item }: { item: ChecklistItem }) {
  const cfg = CHECKLIST_ITEM_CFG[item.status];
  const Icon = cfg.icon;
  return (
    <div className="flex items-center justify-between gap-2 border-b border-[#f0f4f8] py-[4px] last:border-0">
      <span className="text-[10.5px] text-slate-600">{item.label}</span>
      <span className={cn('inline-flex items-center gap-1 text-[10.5px] font-semibold', cfg.text)}>
        <Icon className="h-2.5 w-2.5 shrink-0" />
        {item.status}
      </span>
    </div>
  );
}

/** FilterSelect */
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

/** DR — detail row */
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

/** Collapsible section */
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

/* ─── InspectionsSummaryStrip ────────────────────────────────────────────── */
interface SummaryChipProps {
  label: string; count: number;
  color: string; textColor: string; borderColor: string; dotColor: string;
  active?: boolean; onClick?: () => void;
}

function SummaryChip({ label, count, color, textColor, borderColor, dotColor, active, onClick }: SummaryChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold transition-all',
        active
          ? cn(color, textColor, borderColor, 'shadow-sm')
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

/* ─── InspectionDetailsPanel ─────────────────────────────────────────────── */
function InspectionDetailsPanel({ inspection, onClose }: { inspection: Inspection; onClose: () => void }) {
  const TypeIcon = TYPE_ICON[inspection.type];
  const resCfg = RESULT_CFG[inspection.result];

  return (
    <div className="flex h-full flex-col overflow-hidden border-l border-[#d4e0ea] bg-white shadow-[-4px_0_16px_rgba(61,107,142,0.06)]">
      {/* Header */}
      <div className="shrink-0 border-b border-[#d4e0ea] bg-white px-4 py-3">
        <div className="flex items-start gap-3">
          <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full border', resCfg.bg, resCfg.border)}>
            <TypeIcon className={cn('h-4 w-4', resCfg.text)} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[12.5px] font-bold text-slate-800">{inspection.type} Inspection</span>
            </div>
            <p className="mt-0.5 text-[10.5px] text-slate-400">{inspection.id} · {inspection.scheduledDate}</p>
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
          <InspectionResultBadge result={inspection.result} />
          <InspectionStatusPill status={inspection.status} />
          <span className="rounded-[4px] border border-[#3d6b8e] bg-[#3d6b8e] px-2 py-[3px] text-[10.5px] font-bold tracking-wide text-white">
            {inspection.plate}
          </span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto [scrollbar-gutter:stable]">
        <Section icon={Info} title="Inspection Details">
          <DR label="Inspection ID"    value={inspection.id} />
          <DR label="Vehicle"          value={`${inspection.vehicle} · ${inspection.plate}`} />
          <DR label="Driver"           value={inspection.driver} />
          <DR label="Inspector"        value={inspection.inspector} />
          <DR label="Type"             value={inspection.type} />
          <DR label="Location"         value={inspection.location} />
          <DR label="Checklist Used"   value={inspection.checklist} />
          <DR label="Odometer"         value={inspection.odometer} />
          <DR label="Last Service"     value={inspection.lastServiceDate} />
          <DR label="Scheduled Date"   value={inspection.scheduledDate} />
          <DR label="Completed Date"   value={inspection.completedDate} />
        </Section>

        {inspection.notes && (
          <div className="border-b border-[#eef4f8] px-4 py-3">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Notes / Remarks</p>
            <p className="text-[11px] leading-relaxed text-slate-600">{inspection.notes}</p>
          </div>
        )}

        <Section icon={ClipboardCheck} title="Checklist Summary" defaultOpen>
          <div className="mt-0.5">
            {inspection.checklistItems.map(item => (
              <ChecklistStatusItem key={item.label} item={item} />
            ))}
          </div>
        </Section>
      </div>

      {/* Workflow actions */}
      <div className="shrink-0 border-t border-[#d4e0ea] bg-[#f8fafc] px-4 py-2.5">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Workflow Actions</p>
        <div className="flex flex-wrap gap-1.5">
          <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-[#d0e2f0] bg-[#e8f0f8] px-2.5 text-[11px] font-semibold text-[#2e5f8a] transition-colors hover:bg-[#d8ecf8]">
            <FileText className="h-3 w-3" />
            View Report
          </button>
          {inspection.status === 'Scheduled' && (
            <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-violet-200 bg-violet-50 px-2.5 text-[11px] font-semibold text-violet-700 transition-colors hover:bg-violet-100">
              <Loader2 className="h-3 w-3" />
              Mark In Progress
            </button>
          )}
          {(inspection.status === 'In Progress' || inspection.status === 'Scheduled') && (
            <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 text-[11px] font-semibold text-emerald-700 transition-colors hover:bg-emerald-100">
              <CheckCircle2 className="h-3 w-3" />
              Complete
            </button>
          )}
          {inspection.status !== 'Completed' && inspection.status !== 'Cancelled' && (
            <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-2.5 text-[11px] font-semibold text-amber-700 transition-colors hover:bg-amber-100">
              <CalendarClock className="h-3 w-3" />
              Reschedule
            </button>
          )}
          {inspection.status !== 'Cancelled' && inspection.status !== 'Completed' && (
            <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-rose-200 bg-rose-50 px-2.5 text-[11px] font-semibold text-rose-700 transition-colors hover:bg-rose-100">
              <Ban className="h-3 w-3" />
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── EmptyState ─────────────────────────────────────────────────────────── */
function NoInspectionsState() {
  return (
    <tr>
      <td colSpan={9} className="py-14 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef4f8]">
            <ClipboardList className="h-5 w-5 text-[#3d6b8e]" />
          </div>
          <p className="text-sm font-medium text-slate-600">No inspections found</p>
          <p className="text-xs text-slate-400">Try adjusting your filters or search query.</p>
        </div>
      </td>
    </tr>
  );
}

/* ─── InspectionsTable ───────────────────────────────────────────────────── */
interface InspectionsTableProps {
  rows: Inspection[];
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (p: number) => void;
  onPageSizeChange: (s: number) => void;
  selectedId: string | null;
  onSelect: (row: Inspection) => void;
  sortKey: SortKey;
  sortDir: 'asc' | 'desc';
  onSort: (key: SortKey) => void;
}

type SortKey = 'scheduledDate' | 'result' | 'status' | 'type' | 'vehicle';

function SortIcon({ active, dir }: { active: boolean; dir: 'asc' | 'desc' }) {
  return (
    <span className={cn('ml-0.5 inline-flex flex-col gap-[1px]', active ? 'opacity-100' : 'opacity-30')}>
      <span className={cn('block h-0 w-0 border-x-[3px] border-b-[4px] border-x-transparent', active && dir === 'asc' ? 'border-b-[#3d6b8e]' : 'border-b-slate-400')} />
      <span className={cn('block h-0 w-0 border-x-[3px] border-t-[4px] border-x-transparent', active && dir === 'desc' ? 'border-t-[#3d6b8e]' : 'border-t-slate-400')} />
    </span>
  );
}

function SortableHeader({ label, sortKey: key, currentKey, dir, onSort, className }: {
  label: string; sortKey: SortKey; currentKey: SortKey; dir: 'asc' | 'desc';
  onSort: (k: SortKey) => void; className?: string;
}) {
  return (
    <TableHeaderCell className={className}>
      <button
        type="button"
        onClick={() => onSort(key)}
        className="inline-flex items-center gap-0.5 transition-colors hover:text-[#3d6b8e]"
      >
        {label}
        <SortIcon active={currentKey === key} dir={dir} />
      </button>
    </TableHeaderCell>
  );
}

function InspectionsTable({
  rows, totalCount, page, pageSize, onPageChange, onPageSizeChange,
  selectedId, onSelect, sortKey, sortDir, onSort,
}: InspectionsTableProps) {
  return (
    <DataTable className="flex-1 min-w-0">
      <DataTableToolbar>
        <div className="flex min-w-0 items-center gap-2">
          <h3 className="text-sm font-bold uppercase tracking-[0.02rem] text-slate-800">
            Inspection Records
            <span className="ml-1.5 text-xs font-normal normal-case text-slate-400">
              {totalCount} result{totalCount !== 1 ? 's' : ''}
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
          <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-rose-200 bg-rose-50 px-3 text-xs font-semibold text-rose-700 shadow-sm transition-colors hover:bg-rose-100">
            <FileDown className="h-3.5 w-3.5" />
            PDF
          </button>
        </div>
      </DataTableToolbar>

      <DataTableBodyScroll>
        <DataTableTable className="min-w-[1080px]">
          <TableHeader>
            <tr>
              <TableHeaderCell className="w-[90px]">ID</TableHeaderCell>
              <TableHeaderCell className="w-[120px]">Vehicle</TableHeaderCell>
              <SortableHeader label="Type"           sortKey="type"          currentKey={sortKey} dir={sortDir} onSort={onSort} className="w-[110px]" />
              <TableHeaderCell className="w-[140px]">Inspector</TableHeaderCell>
              <SortableHeader label="Scheduled"      sortKey="scheduledDate" currentKey={sortKey} dir={sortDir} onSort={onSort} className="w-[100px]" />
              <TableHeaderCell className="w-[100px]">Completed</TableHeaderCell>
              <SortableHeader label="Result"         sortKey="result"        currentKey={sortKey} dir={sortDir} onSort={onSort} className="w-[110px]" />
              <SortableHeader label="Status"         sortKey="status"        currentKey={sortKey} dir={sortDir} onSort={onSort} className="w-[110px]" />
              <TableHeaderCell className="w-[70px]" align="center">Actions</TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody>
            {rows.length === 0 ? (
              <NoInspectionsState />
            ) : (
              rows.map(row => {
                const TypeIcon = TYPE_ICON[row.type];
                const isSelected = selectedId === row.id;
                return (
                  <InspectionRowActions
                    key={row.id}
                    row={row}
                    TypeIcon={TypeIcon}
                    isSelected={isSelected}
                    onSelect={onSelect}
                  />
                );
              })
            )}
          </tbody>
        </DataTableTable>
      </DataTableBodyScroll>

      <TablePagination
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </DataTable>
  );
}

/* ─── InspectionRowActions ───────────────────────────────────────────────── */
function InspectionRowActions({ row, TypeIcon, isSelected, onSelect }: {
  row: Inspection;
  TypeIcon: React.ElementType;
  isSelected: boolean;
  onSelect: (r: Inspection) => void;
}) {
  return (
    <TableRow className={cn(isSelected && 'bg-[#eef4f8] ring-1 ring-inset ring-[#3d6b8e]/20')}>
      <TableCell>
        <span className={cn(fleetType.bodyMono, 'text-[#3d6b8e] font-bold')}>{row.id}</span>
      </TableCell>
      <TableCell>
        <div>
          <p className={fleetType.bodyPrimary}>{row.vehicle}</p>
          <p className={cn(fleetType.bodyMuted, 'mt-0.5')}>{row.plate}</p>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1.5">
          <TypeIcon className="h-3 w-3 shrink-0 text-slate-400" />
          <span className={fleetType.bodyPrimary}>{row.type}</span>
        </div>
      </TableCell>
      <TableCell>
        <span className={cn(fleetType.bodyPrimary, 'truncate block max-w-[130px]')} title={row.inspector}>
          {row.inspector}
        </span>
      </TableCell>
      <TableCell>
        <span className={fleetType.bodyMonoMuted}>{row.scheduledDate}</span>
      </TableCell>
      <TableCell>
        <span className={cn(fleetType.bodyMonoMuted, !row.completedDate && 'text-slate-300')}>
          {row.completedDate || '—'}
        </span>
      </TableCell>
      <TableCell>
        <InspectionResultBadge result={row.result} />
      </TableCell>
      <TableCell>
        <InspectionStatusPill status={row.status} />
      </TableCell>
      <TableCell align="center">
        <button
          onClick={() => onSelect(row)}
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
      </TableCell>
    </TableRow>
  );
}

/* ─── InspectionsToolbar (page header) ──────────────────────────────────── */
interface InspectionsToolbarProps {
  search: string; onSearchChange: (v: string) => void;
  statusFilter: string; onStatusChange: (v: string) => void;
  typeFilter: string; onTypeChange: (v: string) => void;
  dateFilter: string; onDateChange: (v: string) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

function InspectionsToolbar({
  search, onSearchChange, statusFilter, onStatusChange,
  typeFilter, onTypeChange, dateFilter, onDateChange,
  onClear, hasActiveFilters,
}: InspectionsToolbarProps) {
  const STATUSES: InspectionStatus[] = ['Scheduled', 'In Progress', 'Completed', 'Overdue', 'Cancelled'];
  const TYPES: InspectionType[] = ['Safety', 'Pre-Trip', 'Post-Trip', 'Maintenance', 'Compliance', 'Annual'];

  return (
    <div className="shrink-0 rounded-lg border border-[#e8eef4] bg-white px-4 py-3 shadow-[0_1px_8px_rgba(61,107,142,0.07)]">
      {/* Title row */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className={cn(typography.pageTitle, 'text-slate-800')}>Inspections</h1>
          <p className={cn(typography.pageSubtitle, 'mt-0.5 text-slate-500')}>
            Track, review, and manage scheduled and completed vehicle inspections.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#d4e0ea] bg-white px-3 text-xs font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50">
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
          <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#d0e2f0] bg-[#e8f0f8] px-3 text-xs font-semibold text-[#2e5f8a] shadow-sm transition-colors hover:bg-[#d8ecf8]">
            <FileDown className="h-3.5 w-3.5" />
            Export
          </button>
          <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-3 text-xs font-semibold text-emerald-700 shadow-sm transition-colors hover:bg-emerald-100">
            <Plus className="h-3.5 w-3.5" />
            New Inspection
          </button>
        </div>
      </div>

      {/* Filters row */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search ID, vehicle, inspector…"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            className="h-8 w-52 rounded-md border border-[#d4e0ea] bg-white pl-8 pr-3 text-xs text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-[#3d6b8e] focus:outline-none focus:ring-1 focus:ring-[#3d6b8e]/30"
          />
        </div>
        <FilterSelect label="Status" value={statusFilter} onChange={onStatusChange} options={STATUSES} />
        <FilterSelect label="Type"   value={typeFilter}   onChange={onTypeChange}   options={TYPES} />
        <input
          type="date"
          value={dateFilter}
          onChange={e => onDateChange(e.target.value)}
          className="h-8 rounded-md border border-[#d4e0ea] bg-white px-2.5 text-xs text-slate-700 shadow-sm focus:border-[#3d6b8e] focus:outline-none focus:ring-1 focus:ring-[#3d6b8e]/30"
        />
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────────── */
export default function InspectionsPage() {
  const [search, setSearch]             = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter]     = useState('');
  const [dateFilter, setDateFilter]     = useState('');
  const [activeChip, setActiveChip]     = useState<string | null>(null);
  const [selected, setSelected]         = useState<Inspection | null>(null);
  const [page, setPage]                 = useState(1);
  const [pageSize, setPageSize]         = useState(10);
  const [sortKey, setSortKey]           = useState<SortKey>('scheduledDate');
  const [sortDir, setSortDir]           = useState<'asc' | 'desc'>('desc');

  /* counts */
  const counts = useMemo(() => ({
    total:      MOCK_INSPECTIONS.length,
    passed:     MOCK_INSPECTIONS.filter(i => i.result === 'Passed').length,
    failed:     MOCK_INSPECTIONS.filter(i => i.result === 'Failed').length,
    pending:    MOCK_INSPECTIONS.filter(i => i.status === 'Scheduled' || i.status === 'In Progress').length,
    overdue:    MOCK_INSPECTIONS.filter(i => i.status === 'Overdue').length,
    dueToday:   MOCK_INSPECTIONS.filter(i => i.scheduledDate === '2024-10-22').length,
  }), []);

  /* filtered + sorted */
  const filtered = useMemo(() => {
    let rows = MOCK_INSPECTIONS;

    if (activeChip === 'passed')   rows = rows.filter(i => i.result === 'Passed');
    else if (activeChip === 'failed')  rows = rows.filter(i => i.result === 'Failed');
    else if (activeChip === 'pending') rows = rows.filter(i => i.status === 'Scheduled' || i.status === 'In Progress');
    else if (activeChip === 'overdue') rows = rows.filter(i => i.status === 'Overdue');
    else if (activeChip === 'dueToday') rows = rows.filter(i => i.scheduledDate === '2024-10-22');

    if (statusFilter) rows = rows.filter(i => i.status === statusFilter);
    if (typeFilter)   rows = rows.filter(i => i.type === typeFilter);
    if (dateFilter)   rows = rows.filter(i => i.scheduledDate === dateFilter);
    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter(i =>
        i.id.toLowerCase().includes(q) ||
        i.vehicle.toLowerCase().includes(q) ||
        i.plate.toLowerCase().includes(q) ||
        i.inspector.toLowerCase().includes(q) ||
        i.type.toLowerCase().includes(q),
      );
    }

    return [...rows].sort((a, b) => {
      let av = a[sortKey as keyof Inspection] as string;
      let bv = b[sortKey as keyof Inspection] as string;
      av = av ?? ''; bv = bv ?? '';
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [search, statusFilter, typeFilter, dateFilter, activeChip, sortKey, sortDir]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  }

  function handleChip(key: string) {
    setActiveChip(prev => prev === key ? null : key);
    setPage(1);
  }

  function handleClear() {
    setSearch(''); setStatusFilter(''); setTypeFilter('');
    setDateFilter(''); setActiveChip(null); setPage(1);
  }

  function handleSelect(row: Inspection) {
    setSelected(prev => prev?.id === row.id ? null : row);
  }

  const hasActiveFilters = !!(search || statusFilter || typeFilter || dateFilter || activeChip);

  const CHIPS = [
    { key: 'total',    label: 'Total',      count: counts.total,    color: 'bg-slate-50',   textColor: 'text-slate-700',   borderColor: 'border-slate-300',   dotColor: 'bg-slate-500'   },
    { key: 'passed',   label: 'Passed',     count: counts.passed,   color: 'bg-emerald-50', textColor: 'text-emerald-700', borderColor: 'border-emerald-300', dotColor: 'bg-emerald-500' },
    { key: 'failed',   label: 'Failed',     count: counts.failed,   color: 'bg-rose-50',    textColor: 'text-rose-700',    borderColor: 'border-rose-300',    dotColor: 'bg-rose-500'    },
    { key: 'pending',  label: 'Pending',    count: counts.pending,  color: 'bg-violet-50',  textColor: 'text-violet-700',  borderColor: 'border-violet-300',  dotColor: 'bg-violet-500'  },
    { key: 'overdue',  label: 'Overdue',    count: counts.overdue,  color: 'bg-amber-50',   textColor: 'text-amber-700',   borderColor: 'border-amber-300',   dotColor: 'bg-amber-400'   },
    { key: 'dueToday', label: 'Due Today',  count: counts.dueToday, color: 'bg-blue-50',    textColor: 'text-blue-700',    borderColor: 'border-blue-300',    dotColor: 'bg-blue-400'    },
  ];

  return (
    <PageLayout title="Inspections">
      {/* Toolbar / header */}
      <InspectionsToolbar
        search={search}           onSearchChange={v => { setSearch(v); setPage(1); }}
        statusFilter={statusFilter} onStatusChange={v => { setStatusFilter(v); setPage(1); }}
        typeFilter={typeFilter}   onTypeChange={v => { setTypeFilter(v); setPage(1); }}
        dateFilter={dateFilter}   onDateChange={v => { setDateFilter(v); setPage(1); }}
        onClear={handleClear}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Summary strip */}
      <div className="shrink-0 flex flex-wrap items-center gap-1.5">
        {CHIPS.map(chip => (
          <SummaryChip
            key={chip.key}
            label={chip.label}
            count={chip.count}
            color={chip.color}
            textColor={chip.textColor}
            borderColor={chip.borderColor}
            dotColor={chip.dotColor}
            active={activeChip === chip.key}
            onClick={() => handleChip(chip.key)}
          />
        ))}
      </div>

      {/* Main content: table + detail panel */}
      <div className="flex min-h-0 flex-1 gap-2 overflow-hidden">
        <InspectionsTable
          rows={paginated}
          totalCount={filtered.length}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={s => { setPageSize(s); setPage(1); }}
          selectedId={selected?.id ?? null}
          onSelect={handleSelect}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={handleSort}
        />

        {selected && (
          <div className="w-[320px] shrink-0 overflow-hidden rounded-md border border-[#d4e0ea] shadow-sm">
            <InspectionDetailsPanel inspection={selected} onClose={() => setSelected(null)} />
          </div>
        )}
      </div>
    </PageLayout>
  );
}
