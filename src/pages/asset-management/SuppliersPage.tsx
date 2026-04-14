import { useState, useMemo } from 'react';
import {
  Award,
  Ban,
  Boxes,
  Building2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Download,
  FileDown,
  Filter,
  Info,
  Mail,
  MapPin,
  Package,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Settings2,
  ShoppingCart,
  Star,
  TrendingUp,
  Truck,
  Wrench,
  X,
  Zap,
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
import { fleetType } from '@/components/fleet/bus-master/tokens';

/* ─── Types ──────────────────────────────────────────────────────────────── */
type SupplierCategory =
  | 'Spare Parts Vendor'
  | 'Equipment Supplier'
  | 'Maintenance Vendor'
  | 'Electrical Supplier'
  | 'Logistics Partner'
  | 'Service Provider';

type SupplierStatus = 'Active' | 'Inactive' | 'Pending Approval' | 'Blacklisted';

interface Supplier {
  id: string;
  supplierId: string;
  name: string;
  companyName: string;
  category: SupplierCategory;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  region: string;
  status: SupplierStatus;
  rating: number; // 1–5
  gstTaxId: string;
  paymentTerms: string;
  leadTimeDays: number;
  contractStart: string;
  contractEnd: string;
  onTimeDelivery: number; // %
  qualityScore: number;   // %
  responseTime: string;
  totalOrders: number;
  suppliedCategories: string[];
  notes: string;
  preferred: boolean;
  joinedDate: string;
}

type SortKey = 'name' | 'category' | 'status' | 'rating' | 'totalOrders';

/* ─── Mock data ──────────────────────────────────────────────────────────── */
const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: 'sup-001', supplierId: 'SUP-0001', name: 'Al-Rashid Auto Parts',
    companyName: 'Al-Rashid Trading Co. LLC', category: 'Spare Parts Vendor',
    contactPerson: 'Mohammed Al-Rashid', phone: '+966 50 123 4567',
    email: 'procurement@alrashid.sa', address: '12 Industrial Zone, Block 4',
    city: 'Riyadh', region: 'Central Region', status: 'Active', rating: 5,
    gstTaxId: 'SA-300123456700003', paymentTerms: 'Net 30', leadTimeDays: 5,
    contractStart: '2023-01-01', contractEnd: '2025-12-31',
    onTimeDelivery: 96, qualityScore: 94, responseTime: '< 4 hrs', totalOrders: 142,
    suppliedCategories: ['Spare Parts', 'Mechanical', 'Consumables'],
    notes: 'Preferred vendor for heavy vehicle spare parts. Consistent quality.',
    preferred: true, joinedDate: '2023-01-01',
  },
  {
    id: 'sup-002', supplierId: 'SUP-0002', name: 'Gulf Tyre Co.',
    companyName: 'Gulf Tyre & Rubber Industries', category: 'Spare Parts Vendor',
    contactPerson: 'Khalid Al-Mansouri', phone: '+966 55 234 5678',
    email: 'sales@gulftyre.sa', address: '88 Commercial District',
    city: 'Jeddah', region: 'Western Region', status: 'Active', rating: 4,
    gstTaxId: 'SA-300234567800004', paymentTerms: 'Net 45', leadTimeDays: 7,
    contractStart: '2023-03-15', contractEnd: '2025-03-14',
    onTimeDelivery: 89, qualityScore: 91, responseTime: '< 8 hrs', totalOrders: 87,
    suppliedCategories: ['Tires', 'Spare Parts'],
    notes: 'Main tyre supplier. Occasional delays on bulk orders.',
    preferred: false, joinedDate: '2023-03-15',
  },
  {
    id: 'sup-003', supplierId: 'SUP-0003', name: 'PowerCell Arabia',
    companyName: 'PowerCell Energy Solutions', category: 'Equipment Supplier',
    contactPerson: 'Sara Al-Otaibi', phone: '+966 54 345 6789',
    email: 'info@powercell.sa', address: '5 Tech Park, Building C',
    city: 'Riyadh', region: 'Central Region', status: 'Active', rating: 4,
    gstTaxId: 'SA-300345678900005', paymentTerms: 'Net 30', leadTimeDays: 10,
    contractStart: '2022-06-01', contractEnd: '2024-05-31',
    onTimeDelivery: 91, qualityScore: 88, responseTime: '< 12 hrs', totalOrders: 54,
    suppliedCategories: ['Batteries', 'Electrical'],
    notes: 'Contract renewal pending. Good quality batteries.',
    preferred: false, joinedDate: '2022-06-01',
  },
  {
    id: 'sup-004', supplierId: 'SUP-0004', name: 'Petromin Corp.',
    companyName: 'Petromin Corporation', category: 'Maintenance Vendor',
    contactPerson: 'Ahmed Al-Zahrani', phone: '+966 56 456 7890',
    email: 'fleet@petromin.sa', address: '200 King Fahd Road',
    city: 'Riyadh', region: 'Central Region', status: 'Active', rating: 5,
    gstTaxId: 'SA-300456789000006', paymentTerms: 'Net 15', leadTimeDays: 3,
    contractStart: '2021-01-01', contractEnd: '2026-12-31',
    onTimeDelivery: 98, qualityScore: 97, responseTime: '< 2 hrs', totalOrders: 310,
    suppliedCategories: ['Fluids / Lubricants', 'Consumables', 'Maintenance'],
    notes: 'Long-term strategic partner. Excellent SLA compliance.',
    preferred: true, joinedDate: '2021-01-01',
  },
  {
    id: 'sup-005', supplierId: 'SUP-0005', name: 'Hikvision ME',
    companyName: 'Hikvision Middle East FZE', category: 'Equipment Supplier',
    contactPerson: 'Li Wei', phone: '+971 4 567 8901',
    email: 'me-sales@hikvision.com', address: 'Dubai Silicon Oasis, Unit 12',
    city: 'Dubai', region: 'UAE', status: 'Active', rating: 4,
    gstTaxId: 'AE-100567890100007', paymentTerms: 'Net 60', leadTimeDays: 14,
    contractStart: '2023-07-01', contractEnd: '2025-06-30',
    onTimeDelivery: 85, qualityScore: 93, responseTime: '< 24 hrs', totalOrders: 38,
    suppliedCategories: ['Cameras / Sensors', 'Electrical'],
    notes: 'Sole supplier for MDVR and camera systems.',
    preferred: false, joinedDate: '2023-07-01',
  },
  {
    id: 'sup-006', supplierId: 'SUP-0006', name: 'Stanley Tools KSA',
    companyName: 'Stanley Black & Decker KSA', category: 'Equipment Supplier',
    contactPerson: 'Faisal Al-Harbi', phone: '+966 50 678 9012',
    email: 'ksa@stanleytools.com', address: '33 Industrial City, Phase 2',
    city: 'Riyadh', region: 'Central Region', status: 'Active', rating: 3,
    gstTaxId: 'SA-300678901200008', paymentTerms: 'Net 30', leadTimeDays: 8,
    contractStart: '2023-09-01', contractEnd: '2024-08-31',
    onTimeDelivery: 82, qualityScore: 85, responseTime: '< 24 hrs', totalOrders: 22,
    suppliedCategories: ['Tools', 'Workshop Equipment'],
    notes: 'Contract up for renewal. Evaluate alternatives.',
    preferred: false, joinedDate: '2023-09-01',
  },
  {
    id: 'sup-007', supplierId: 'SUP-0007', name: 'SafeGuard Arabia',
    companyName: 'SafeGuard Safety Solutions', category: 'Service Provider',
    contactPerson: 'Nora Al-Qahtani', phone: '+966 53 789 0123',
    email: 'orders@safeguard.sa', address: '7 Safety Zone, Block B',
    city: 'Dammam', region: 'Eastern Province', status: 'Pending Approval',
    rating: 3, gstTaxId: 'SA-300789012300009', paymentTerms: 'Net 30', leadTimeDays: 12,
    contractStart: '2024-01-01', contractEnd: '2024-12-31',
    onTimeDelivery: 78, qualityScore: 80, responseTime: '< 48 hrs', totalOrders: 15,
    suppliedCategories: ['Safety Equipment', 'Consumables'],
    notes: 'New vendor. Awaiting compliance documentation.',
    preferred: false, joinedDate: '2024-01-01',
  },
  {
    id: 'sup-008', supplierId: 'SUP-0008', name: 'Schneider Electric KSA',
    companyName: 'Schneider Electric Saudi Arabia', category: 'Electrical Supplier',
    contactPerson: 'Pierre Dubois', phone: '+966 11 890 1234',
    email: 'ksa.sales@schneider-electric.com', address: 'King Abdullah Financial District',
    city: 'Riyadh', region: 'Central Region', status: 'Active', rating: 5,
    gstTaxId: 'SA-300890123400010', paymentTerms: 'Net 45', leadTimeDays: 6,
    contractStart: '2022-01-01', contractEnd: '2025-12-31',
    onTimeDelivery: 95, qualityScore: 96, responseTime: '< 6 hrs', totalOrders: 76,
    suppliedCategories: ['Electrical', 'Safety Equipment'],
    notes: 'Reliable electrical components supplier.',
    preferred: true, joinedDate: '2022-01-01',
  },
  {
    id: 'sup-009', supplierId: 'SUP-0009', name: 'Gates Arabia',
    companyName: 'Gates Industrial Corporation', category: 'Spare Parts Vendor',
    contactPerson: 'Omar Al-Shehri', phone: '+966 55 901 2345',
    email: 'arabia@gates.com', address: '45 Auto Parts Market',
    city: 'Jeddah', region: 'Western Region', status: 'Inactive', rating: 2,
    gstTaxId: 'SA-300901234500011', paymentTerms: 'Net 30', leadTimeDays: 15,
    contractStart: '2022-04-01', contractEnd: '2023-03-31',
    onTimeDelivery: 65, qualityScore: 72, responseTime: '> 48 hrs', totalOrders: 31,
    suppliedCategories: ['Mechanical', 'Spare Parts'],
    notes: 'Contract expired. Performance below threshold. Under review.',
    preferred: false, joinedDate: '2022-04-01',
  },
  {
    id: 'sup-010', supplierId: 'SUP-0010', name: 'MedSupply Arabia',
    companyName: 'MedSupply Trading LLC', category: 'Service Provider',
    contactPerson: 'Hana Al-Dosari', phone: '+966 50 012 3456',
    email: 'fleet@medsupply.sa', address: '19 Commercial Center',
    city: 'Dammam', region: 'Eastern Province', status: 'Active', rating: 3,
    gstTaxId: 'SA-300012345600012', paymentTerms: 'Net 30', leadTimeDays: 5,
    contractStart: '2023-05-01', contractEnd: '2025-04-30',
    onTimeDelivery: 88, qualityScore: 84, responseTime: '< 12 hrs', totalOrders: 44,
    suppliedCategories: ['Consumables', 'Safety Equipment'],
    notes: 'Reliable for consumables. Competitive pricing.',
    preferred: false, joinedDate: '2023-05-01',
  },
  {
    id: 'sup-011', supplierId: 'SUP-0011', name: 'FastLog Logistics',
    companyName: 'FastLog Transport & Logistics', category: 'Logistics Partner',
    contactPerson: 'Tariq Al-Ghamdi', phone: '+966 56 123 7890',
    email: 'ops@fastlog.sa', address: '88 Logistics Hub, Zone 3',
    city: 'Riyadh', region: 'Central Region', status: 'Blacklisted', rating: 1,
    gstTaxId: 'SA-300123789000013', paymentTerms: 'Prepaid', leadTimeDays: 2,
    contractStart: '2023-02-01', contractEnd: '2023-08-31',
    onTimeDelivery: 42, qualityScore: 50, responseTime: '> 72 hrs', totalOrders: 18,
    suppliedCategories: ['Logistics'],
    notes: 'Blacklisted due to repeated delivery failures and contract violations.',
    preferred: false, joinedDate: '2023-02-01',
  },
  {
    id: 'sup-012', supplierId: 'SUP-0012', name: 'TechFleet Solutions',
    companyName: 'TechFleet IT & Telematics', category: 'Service Provider',
    contactPerson: 'Rania Al-Mutairi', phone: '+966 54 234 8901',
    email: 'support@techfleet.sa', address: '3 Innovation Park',
    city: 'Riyadh', region: 'Central Region', status: 'Active', rating: 4,
    gstTaxId: 'SA-300234890100014', paymentTerms: 'Net 30', leadTimeDays: 7,
    contractStart: '2023-10-01', contractEnd: '2025-09-30',
    onTimeDelivery: 92, qualityScore: 90, responseTime: '< 4 hrs', totalOrders: 29,
    suppliedCategories: ['Cameras / Sensors', 'Service'],
    notes: 'Telematics and IT support vendor.',
    preferred: false, joinedDate: '2023-10-01',
  },
];

/* ─── Config maps ────────────────────────────────────────────────────────── */
const STATUS_CFG: Record<SupplierStatus, { bg: string; text: string; border: string; dot: string }> = {
  'Active':           { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  'Inactive':         { bg: 'bg-slate-50',   text: 'text-slate-600',   border: 'border-slate-200',   dot: 'bg-slate-400'   },
  'Pending Approval': { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200',   dot: 'bg-amber-400'   },
  'Blacklisted':      { bg: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-200',    dot: 'bg-rose-500'    },
};

const CATEGORY_ICON: Record<SupplierCategory, React.ElementType> = {
  'Spare Parts Vendor':  Package,
  'Equipment Supplier':  Settings2,
  'Maintenance Vendor':  Wrench,
  'Electrical Supplier': Zap,
  'Logistics Partner':   Truck,
  'Service Provider':    Award,
};

/* ─── Reusable atoms ─────────────────────────────────────────────────────── */

function SupplierStatusBadge({ status }: { status: SupplierStatus }) {
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

function RatingStars({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-3 w-3',
            i < rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-300',
          )}
        />
      ))}
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
        className="h-7 appearance-none rounded border border-[#d4e0ea] bg-white pl-2 pr-6 text-[11px] font-medium text-slate-600 transition-colors hover:border-[#b8cfe0] focus:border-[#3d6b8e] focus:outline-none focus:ring-1 focus:ring-[#3d6b8e]/30"
      >
        <option value="">{label}: All</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 text-slate-400" />
    </div>
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

/* ─── SummaryChip ────────────────────────────────────────────────────────── */
interface SummaryChipProps {
  label: string; count: number;
  dotColor: string; activeColor: string; activeText: string; activeBorder: string;
  active?: boolean; onClick?: () => void;
}

function SummaryChip({ label, count, dotColor, activeColor, activeText, activeBorder, active, onClick }: SummaryChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[11px] font-medium transition-all',
        active
          ? cn(activeColor, activeText, activeBorder)
          : 'border-transparent bg-transparent text-slate-500 hover:text-slate-700',
      )}
    >
      <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', active ? dotColor : 'bg-slate-300')} />
      {label}
      <span className={cn('ml-0.5 tabular-nums font-semibold', active ? activeText : 'text-slate-600')}>{count}</span>
    </button>
  );
}

/* ─── SupplierDetailsPanel ───────────────────────────────────────────────── */
function SupplierDetailsPanel({ supplier, onClose }: { supplier: Supplier; onClose: () => void }) {
  const CatIcon = CATEGORY_ICON[supplier.category];
  const staCfg = STATUS_CFG[supplier.status];

  return (
    <div className="flex h-full flex-col overflow-hidden border-l border-[#d4e0ea] bg-white shadow-[-4px_0_16px_rgba(61,107,142,0.06)]">
      {/* Header */}
      <div className="shrink-0 border-b border-[#d4e0ea] bg-white px-4 py-3">
        <div className="flex items-start gap-3">
          <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full border', staCfg.bg, staCfg.border)}>
            <CatIcon className={cn('h-4 w-4', staCfg.text)} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[12.5px] font-bold leading-tight text-slate-800">{supplier.name}</p>
            <p className="mt-0.5 text-[10.5px] text-slate-400">{supplier.supplierId} · {supplier.category}</p>
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
          <SupplierStatusBadge status={supplier.status} />
          {supplier.preferred && (
            <span className="inline-flex items-center gap-1 rounded-sm border border-amber-300 bg-amber-50 px-1.5 py-0 text-[10.5px] font-semibold uppercase leading-[1.125rem] text-amber-700">
              <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
              Preferred
            </span>
          )}
          <RatingStars rating={supplier.rating} />
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto [scrollbar-gutter:stable]">
        <Section icon={Info} title="Contact Details">
          <DR label="Contact Person" value={supplier.contactPerson} />
          <DR label="Phone"          value={supplier.phone} />
          <DR label="Email"          value={supplier.email} />
          <DR label="Address"        value={supplier.address} />
          <DR label="City"           value={supplier.city} />
          <DR label="Region"         value={supplier.region} />
        </Section>

        <Section icon={Building2} title="Business Details">
          <DR label="Company Name"   value={supplier.companyName} />
          <DR label="GST / Tax ID"   value={supplier.gstTaxId} />
          <DR label="Payment Terms"  value={supplier.paymentTerms} />
          <DR label="Lead Time"      value={`${supplier.leadTimeDays} days`} />
          <DR label="Contract Start" value={supplier.contractStart} />
          <DR label="Contract End"   value={supplier.contractEnd} />
        </Section>

        <Section icon={TrendingUp} title="Performance">
          <div className="mb-2 grid grid-cols-2 gap-1.5">
            {[
              { label: 'On-Time Delivery', val: `${supplier.onTimeDelivery}%`, color: supplier.onTimeDelivery >= 90 ? 'text-emerald-600' : supplier.onTimeDelivery >= 75 ? 'text-amber-600' : 'text-rose-600' },
              { label: 'Quality Score',    val: `${supplier.qualityScore}%`,   color: supplier.qualityScore >= 90 ? 'text-emerald-600' : supplier.qualityScore >= 75 ? 'text-amber-600' : 'text-rose-600' },
              { label: 'Response Time',    val: supplier.responseTime,         color: 'text-blue-600' },
              { label: 'Total Orders',     val: String(supplier.totalOrders),  color: 'text-slate-800' },
            ].map(s => (
              <div key={s.label} className="rounded-md border border-[#eef4f8] bg-[#f8fafc] px-2 py-1.5 text-center">
                <p className={cn('text-[13px] font-bold tabular-nums leading-none', s.color)}>{s.val}</p>
                <p className="mt-0.5 text-[9.5px] font-medium uppercase tracking-wide text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section icon={Boxes} title="Supplied Categories" defaultOpen={false}>
          <div className="flex flex-wrap gap-1">
            {supplier.suppliedCategories.map(cat => (
              <span key={cat} className="rounded-[4px] border border-[#d4e0ea] bg-[#eef4f8] px-2 py-[3px] text-[10.5px] font-medium text-[#2e5f8a]">
                {cat}
              </span>
            ))}
          </div>
        </Section>

        {supplier.notes && (
          <Section icon={ClipboardList} title="Notes" defaultOpen={false}>
            <p className="text-[10.5px] leading-relaxed text-slate-600">{supplier.notes}</p>
          </Section>
        )}
      </div>

      {/* Actions */}
      <div className="shrink-0 border-t border-[#d4e0ea] bg-[#f8fafc] px-4 py-2.5">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Actions</p>
        <div className="flex flex-wrap gap-1.5">
          <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-[#d0e2f0] bg-[#e8f0f8] px-2.5 text-[11px] font-semibold text-[#2e5f8a] transition-colors hover:bg-[#d8ecf8]">
            <Settings2 className="h-3 w-3" />
            Edit
          </button>
          <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-violet-200 bg-violet-50 px-2.5 text-[11px] font-semibold text-violet-700 transition-colors hover:bg-violet-100">
            <Boxes className="h-3 w-3" />
            View Inventory
          </button>
          <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 text-[11px] font-semibold text-emerald-700 transition-colors hover:bg-emerald-100">
            <ShoppingCart className="h-3 w-3" />
            View Orders
          </button>
          <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 text-[11px] font-semibold text-slate-600 transition-colors hover:bg-slate-50">
            <Mail className="h-3 w-3" />
            Contact
          </button>
          {supplier.status === 'Active' ? (
            <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-2.5 text-[11px] font-semibold text-amber-700 transition-colors hover:bg-amber-100">
              <Ban className="h-3 w-3" />
              Deactivate
            </button>
          ) : supplier.status === 'Inactive' ? (
            <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 text-[11px] font-semibold text-emerald-700 transition-colors hover:bg-emerald-100">
              <Award className="h-3 w-3" />
              Activate
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ─── Empty state ────────────────────────────────────────────────────────── */
function NoSuppliersState() {
  return (
    <tr>
      <td colSpan={9} className="py-14 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef4f8]">
            <ShoppingCart className="h-5 w-5 text-[#3d6b8e]" />
          </div>
          <p className="text-sm font-medium text-slate-600">No suppliers found</p>
          <p className="text-xs text-slate-400">Try adjusting your filters or search query.</p>
        </div>
      </td>
    </tr>
  );
}

/* ─── Sort helpers ───────────────────────────────────────────────────────── */
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
      <button type="button" onClick={() => onSort(key)} className="inline-flex items-center gap-0.5 transition-colors hover:text-[#3d6b8e]">
        {label}
        <SortIcon active={currentKey === key} dir={dir} />
      </button>
    </TableHeaderCell>
  );
}

/* ─── SupplierTable ──────────────────────────────────────────────────────── */
interface SupplierTableProps {
  rows: Supplier[];
  totalCount: number;
  page: number; pageSize: number;
  onPageChange: (p: number) => void;
  onPageSizeChange: (s: number) => void;
  selectedId: string | null;
  onSelect: (s: Supplier) => void;
  sortKey: SortKey; sortDir: 'asc' | 'desc';
  onSort: (k: SortKey) => void;
}

function SupplierTable({
  rows, totalCount, page, pageSize, onPageChange, onPageSizeChange,
  selectedId, onSelect, sortKey, sortDir, onSort,
}: SupplierTableProps) {
  return (
    <DataTable className="flex-1 min-w-0">
      <DataTableToolbar>
        <div className="flex min-w-0 items-center gap-2">
          <h3 className="text-sm font-bold uppercase tracking-[0.02rem] text-slate-800">
            Suppliers
            <span className="ml-1.5 text-xs font-normal normal-case text-slate-400">
              {totalCount} result{totalCount !== 1 ? 's' : ''}
            </span>
          </h3>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button className="inline-flex h-7 items-center gap-1 rounded border border-[#d4e0ea] bg-white px-2.5 text-[11px] font-medium text-slate-500 transition-colors hover:bg-slate-50">
            <Filter className="h-3 w-3" />
            Columns
          </button>
          <button className="inline-flex h-7 items-center gap-1 rounded border border-[#d0e2f0] bg-[#eef4f8] px-2.5 text-[11px] font-medium text-[#3d6b8e] transition-colors hover:bg-[#dceaf4]">
            <Download className="h-3 w-3" />
            Excel
          </button>
          <button className="inline-flex h-7 items-center gap-1 rounded border border-rose-200 bg-white px-2.5 text-[11px] font-medium text-rose-600 transition-colors hover:bg-rose-50">
            <FileDown className="h-3 w-3" />
            PDF
          </button>
        </div>
      </DataTableToolbar>

      <DataTableBodyScroll>
        <DataTableTable className="min-w-[1100px]">
          <TableHeader>
            <tr>
              <TableHeaderCell className="w-[90px]">Supplier ID</TableHeaderCell>
              <SortableHeader label="Supplier Name" sortKey="name"       currentKey={sortKey} dir={sortDir} onSort={onSort} className="w-[180px]" />
              <SortableHeader label="Category"      sortKey="category"   currentKey={sortKey} dir={sortDir} onSort={onSort} className="w-[150px]" />
              <TableHeaderCell className="w-[130px]">Contact Person</TableHeaderCell>
              <TableHeaderCell className="w-[140px]">Phone / Email</TableHeaderCell>
              <TableHeaderCell className="w-[110px]">Location</TableHeaderCell>
              <SortableHeader label="Rating"        sortKey="rating"     currentKey={sortKey} dir={sortDir} onSort={onSort} className="w-[90px]" />
              <SortableHeader label="Status"        sortKey="status"     currentKey={sortKey} dir={sortDir} onSort={onSort} className="w-[120px]" />
              <TableHeaderCell className="w-[50px]" align="center" />
            </tr>
          </TableHeader>
          <tbody>
            {rows.length === 0 ? (
              <NoSuppliersState />
            ) : (
              rows.map(s => {
                const CatIcon = CATEGORY_ICON[s.category];
                const isSelected = selectedId === s.id;
                return (
                  <TableRow key={s.id} className={cn(isSelected && 'bg-[#eef4f8] ring-1 ring-inset ring-[#3d6b8e]/20')}>
                    <TableCell>
                      <span className={cn(fleetType.bodyMono, 'text-[#3d6b8e] font-bold')}>{s.supplierId}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {s.preferred && <Star className="h-3 w-3 shrink-0 fill-amber-400 text-amber-400" />}
                        <span className={cn(fleetType.bodyPrimary, 'truncate max-w-[150px] block')} title={s.name}>{s.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <CatIcon className="h-3 w-3 shrink-0 text-slate-400" />
                        <span className={cn(fleetType.bodyMuted, 'truncate max-w-[120px] block normal-case')} title={s.category}>{s.category}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={cn(fleetType.bodyPrimary, 'truncate max-w-[120px] block')} title={s.contactPerson}>{s.contactPerson}</span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-2.5 w-2.5 shrink-0 text-slate-400" />
                          <span className={cn(fleetType.bodyMonoMuted, 'truncate max-w-[110px]')}>{s.phone}</span>
                        </div>
                        <div className="mt-0.5 flex items-center gap-1">
                          <Mail className="h-2.5 w-2.5 shrink-0 text-slate-400" />
                          <span className={cn(fleetType.bodyMuted, 'truncate max-w-[110px] normal-case')}>{s.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-2.5 w-2.5 shrink-0 text-slate-400" />
                        <span className={cn(fleetType.bodyMuted, 'truncate max-w-[90px] normal-case')}>{s.city}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <RatingStars rating={s.rating} />
                    </TableCell>
                    <TableCell>
                      <SupplierStatusBadge status={s.status} />
                    </TableCell>
                    <TableCell align="center">
                      <button
                        onClick={() => onSelect(s)}
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
              })
            )}
          </tbody>
        </DataTableTable>
      </DataTableBodyScroll>

      <TablePagination
        page={page} pageSize={pageSize} totalCount={totalCount}
        onPageChange={onPageChange} onPageSizeChange={onPageSizeChange}
      />
    </DataTable>
  );
}

/* ─── Toolbar ────────────────────────────────────────────────────────────── */
interface ToolbarProps {
  search: string; onSearchChange: (v: string) => void;
  categoryFilter: string; onCategoryChange: (v: string) => void;
  statusFilter: string; onStatusChange: (v: string) => void;
  locationFilter: string; onLocationChange: (v: string) => void;
  onClear: () => void; hasActiveFilters: boolean;
}

const CATEGORIES: SupplierCategory[] = [
  'Spare Parts Vendor', 'Equipment Supplier', 'Maintenance Vendor',
  'Electrical Supplier', 'Logistics Partner', 'Service Provider',
];
const STATUSES: SupplierStatus[] = ['Active', 'Inactive', 'Pending Approval', 'Blacklisted'];
const LOCATIONS = ['Riyadh', 'Jeddah', 'Dammam', 'Dubai'];

function SuppliersToolbar({
  search, onSearchChange, categoryFilter, onCategoryChange,
  statusFilter, onStatusChange, locationFilter, onLocationChange,
  onClear, hasActiveFilters,
}: ToolbarProps) {
  return (
    <div className="shrink-0 rounded-lg border border-[#e8eef4] bg-white px-4 py-2.5 shadow-[0_1px_8px_rgba(61,107,142,0.07)]">
      {/* Row 1: title + primary action */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-[13px] font-bold tracking-[-0.01em] text-slate-800">Suppliers</h1>
          <span className="text-[11px] font-normal text-slate-400">· Vendor &amp; procurement management</span>
        </div>
        <button className="inline-flex h-7 items-center gap-1 rounded border border-[#3d6b8e] bg-[#3d6b8e] px-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#2e5270]">
          <Plus className="h-3 w-3" />
          Add Supplier
        </button>
      </div>

      {/* Row 2: search + filters */}
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search suppliers…"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            className="h-7 w-48 rounded border border-[#d4e0ea] bg-white pl-7 pr-2.5 text-[11px] text-slate-700 placeholder:text-slate-400 focus:border-[#3d6b8e] focus:outline-none focus:ring-1 focus:ring-[#3d6b8e]/30"
          />
        </div>
        <FilterSelect label="Category" value={categoryFilter} onChange={onCategoryChange} options={CATEGORIES} />
        <FilterSelect label="Status"   value={statusFilter}   onChange={onStatusChange}   options={STATUSES} />
        <FilterSelect label="Location" value={locationFilter} onChange={onLocationChange} options={LOCATIONS} />
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="inline-flex h-7 items-center gap-1 rounded border border-slate-200 bg-white px-2 text-[11px] text-slate-400 transition-colors hover:text-slate-600"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
        <button className="inline-flex h-7 w-7 items-center justify-center rounded border border-[#d4e0ea] bg-white text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600">
          <RefreshCw className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

/* ─── SuppliersPage ──────────────────────────────────────────────────────── */
export default function SuppliersPage() {
  const [search, setSearch]               = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter]   = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [activeChip, setActiveChip]       = useState<string | null>(null);
  const [selected, setSelected]           = useState<Supplier | null>(null);
  const [page, setPage]                   = useState(1);
  const [pageSize, setPageSize]           = useState(10);
  const [sortKey, setSortKey]             = useState<SortKey>('name');
  const [sortDir, setSortDir]             = useState<'asc' | 'desc'>('asc');

  const counts = useMemo(() => ({
    total:     MOCK_SUPPLIERS.length,
    active:    MOCK_SUPPLIERS.filter(s => s.status === 'Active').length,
    inactive:  MOCK_SUPPLIERS.filter(s => s.status === 'Inactive').length,
    preferred: MOCK_SUPPLIERS.filter(s => s.preferred).length,
    pending:   MOCK_SUPPLIERS.filter(s => s.status === 'Pending Approval').length,
    blacklisted: MOCK_SUPPLIERS.filter(s => s.status === 'Blacklisted').length,
  }), []);

  const filtered = useMemo(() => {
    let rows = MOCK_SUPPLIERS;

    if (activeChip === 'active')      rows = rows.filter(s => s.status === 'Active');
    else if (activeChip === 'inactive')    rows = rows.filter(s => s.status === 'Inactive');
    else if (activeChip === 'preferred')   rows = rows.filter(s => s.preferred);
    else if (activeChip === 'pending')     rows = rows.filter(s => s.status === 'Pending Approval');
    else if (activeChip === 'blacklisted') rows = rows.filter(s => s.status === 'Blacklisted');

    if (categoryFilter) rows = rows.filter(s => s.category === categoryFilter);
    if (statusFilter)   rows = rows.filter(s => s.status === statusFilter);
    if (locationFilter) rows = rows.filter(s => s.city === locationFilter);
    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter(s =>
        s.supplierId.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.companyName.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.contactPerson.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q),
      );
    }

    return [...rows].sort((a, b) => {
      let av: string | number = a[sortKey as keyof Supplier] as string | number;
      let bv: string | number = b[sortKey as keyof Supplier] as string | number;
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av;
      }
      av = String(av ?? ''); bv = String(bv ?? '');
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [search, categoryFilter, statusFilter, locationFilter, activeChip, sortKey, sortDir]);

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
    setSearch(''); setCategoryFilter(''); setStatusFilter('');
    setLocationFilter(''); setActiveChip(null); setPage(1);
  }

  const hasActiveFilters = !!(search || categoryFilter || statusFilter || locationFilter || activeChip);

  const CHIPS = [
    { key: 'total',       label: 'Total',           count: counts.total,       dotColor: 'bg-slate-400',   activeColor: 'bg-slate-50',   activeText: 'text-slate-700',   activeBorder: 'border-slate-300'   },
    { key: 'active',      label: 'Active',           count: counts.active,      dotColor: 'bg-emerald-500', activeColor: 'bg-emerald-50', activeText: 'text-emerald-700', activeBorder: 'border-emerald-200' },
    { key: 'inactive',    label: 'Inactive',         count: counts.inactive,    dotColor: 'bg-slate-400',   activeColor: 'bg-slate-50',   activeText: 'text-slate-600',   activeBorder: 'border-slate-300'   },
    { key: 'preferred',   label: 'Preferred',        count: counts.preferred,   dotColor: 'bg-amber-400',   activeColor: 'bg-amber-50',   activeText: 'text-amber-700',   activeBorder: 'border-amber-200'   },
    { key: 'pending',     label: 'Pending Approval', count: counts.pending,     dotColor: 'bg-violet-500',  activeColor: 'bg-violet-50',  activeText: 'text-violet-700',  activeBorder: 'border-violet-200'  },
    { key: 'blacklisted', label: 'Blacklisted',      count: counts.blacklisted, dotColor: 'bg-rose-500',    activeColor: 'bg-rose-50',    activeText: 'text-rose-700',    activeBorder: 'border-rose-200'    },
  ];

  return (
    <PageLayout title="Suppliers">
      <SuppliersToolbar
        search={search}               onSearchChange={v => { setSearch(v); setPage(1); }}
        categoryFilter={categoryFilter} onCategoryChange={v => { setCategoryFilter(v); setPage(1); }}
        statusFilter={statusFilter}   onStatusChange={v => { setStatusFilter(v); setPage(1); }}
        locationFilter={locationFilter} onLocationChange={v => { setLocationFilter(v); setPage(1); }}
        onClear={handleClear}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Summary strip */}
      <div className="shrink-0 flex flex-wrap items-center gap-0.5 px-0.5">
        {CHIPS.map(chip => (
          <SummaryChip
            key={chip.key}
            label={chip.label}
            count={chip.count}
            dotColor={chip.dotColor}
            activeColor={chip.activeColor}
            activeText={chip.activeText}
            activeBorder={chip.activeBorder}
            active={activeChip === chip.key}
            onClick={() => handleChip(chip.key)}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="flex min-h-0 flex-1 gap-2 overflow-hidden">
        <SupplierTable
          rows={paginated}
          totalCount={filtered.length}
          page={page} pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={s => { setPageSize(s); setPage(1); }}
          selectedId={selected?.id ?? null}
          onSelect={s => setSelected(prev => prev?.id === s.id ? null : s)}
          sortKey={sortKey} sortDir={sortDir}
          onSort={handleSort}
        />

        {selected && (
          <div className="w-[320px] shrink-0 overflow-hidden rounded-md border border-[#d4e0ea] shadow-sm">
            <SupplierDetailsPanel supplier={selected} onClose={() => setSelected(null)} />
          </div>
        )}
      </div>
    </PageLayout>
  );
}
