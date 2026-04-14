import { useState, useMemo } from 'react';
import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpFromLine,
  Ban,
  Battery,
  Box,
  Camera,
  ChevronDown,
  ChevronRight,
  CircleDot,
  ClipboardList,
  Cpu,
  Download,
  Droplets,
  FileDown,
  Filter,
  Flame,
  History,
  Info,
  Layers,
  Package,
  PackagePlus,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  Send,
  Settings2,
  Shield,
  ShoppingCart,
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
import { fleetSurface, fleetType } from '@/components/fleet/bus-master/tokens';

/* ─── Types ──────────────────────────────────────────────────────────────── */
type ItemCategory =
  | 'Spare Parts'
  | 'Tools'
  | 'Electrical'
  | 'Mechanical'
  | 'Safety Equipment'
  | 'Consumables'
  | 'Tires'
  | 'Batteries'
  | 'Fluids / Lubricants'
  | 'Cameras / Sensors';

type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Reserved' | 'Reorder Pending';

interface StockMovement {
  date: string;
  type: 'In' | 'Out' | 'Reserved' | 'Adjusted';
  qty: number;
  note: string;
}

interface InventoryItem {
  id: string;
  code: string;
  sku: string;
  name: string;
  category: ItemCategory;
  assetType: string;
  location: string;
  warehouse: string;
  qty: number;
  reserved: number;
  reorderLevel: number;
  unit: string;
  status: StockStatus;
  supplier: string;
  lastUpdated: string;
  unitCost: number;
  assignedTo: string;
  incomingQty: number;
  movements: StockMovement[];
}

/* ─── Mock data ──────────────────────────────────────────────────────────── */
const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-001', code: 'ITM-0001', sku: 'SP-BRK-001', name: 'Brake Pad Set (Front)',
    category: 'Spare Parts', assetType: 'Bus / Heavy Vehicle', location: 'Shelf A-12',
    warehouse: 'Warehouse 1 – Riyadh', qty: 48, reserved: 8, reorderLevel: 20,
    unit: 'Set', status: 'In Stock', supplier: 'Al-Rashid Auto Parts',
    lastUpdated: '2024-10-20', unitCost: 185, assignedTo: 'Fleet Maintenance Team',
    incomingQty: 0,
    movements: [
      { date: '2024-10-20', type: 'Out', qty: 4, note: 'Used for Bus 22 repair' },
      { date: '2024-10-15', type: 'In',  qty: 20, note: 'Restocked from supplier' },
      { date: '2024-10-10', type: 'Out', qty: 2, note: 'Used for Bus 07 repair' },
    ],
  },
  {
    id: 'inv-002', code: 'ITM-0002', sku: 'TIR-225-001', name: 'Tyre 225/70R16',
    category: 'Tires', assetType: 'Bus / Heavy Vehicle', location: 'Bay T-03',
    warehouse: 'Warehouse 1 – Riyadh', qty: 12, reserved: 4, reorderLevel: 16,
    unit: 'Pcs', status: 'Low Stock', supplier: 'Gulf Tyre Co.',
    lastUpdated: '2024-10-19', unitCost: 420, assignedTo: '',
    incomingQty: 20,
    movements: [
      { date: '2024-10-19', type: 'Out', qty: 4, note: 'Replaced on Bus 14' },
      { date: '2024-10-12', type: 'In',  qty: 8, note: 'Partial delivery' },
    ],
  },
  {
    id: 'inv-003', code: 'ITM-0003', sku: 'BAT-12V-001', name: 'Battery 12V 100Ah',
    category: 'Batteries', assetType: 'Bus / Light Vehicle', location: 'Shelf B-04',
    warehouse: 'Warehouse 2 – Jeddah', qty: 0, reserved: 0, reorderLevel: 5,
    unit: 'Pcs', status: 'Out of Stock', supplier: 'PowerCell Arabia',
    lastUpdated: '2024-10-18', unitCost: 310, assignedTo: '',
    incomingQty: 10,
    movements: [
      { date: '2024-10-18', type: 'Out', qty: 3, note: 'Last units used for Bus 33' },
      { date: '2024-10-05', type: 'In',  qty: 3, note: 'Emergency restock' },
    ],
  },
  {
    id: 'inv-004', code: 'ITM-0004', sku: 'OIL-ENG-5W30', name: 'Engine Oil 5W-30 (5L)',
    category: 'Fluids / Lubricants', assetType: 'All Vehicles', location: 'Shelf C-01',
    warehouse: 'Warehouse 1 – Riyadh', qty: 85, reserved: 10, reorderLevel: 30,
    unit: 'Can', status: 'In Stock', supplier: 'Petromin Corp.',
    lastUpdated: '2024-10-21', unitCost: 65, assignedTo: 'Workshop 1',
    incomingQty: 0,
    movements: [
      { date: '2024-10-21', type: 'Out', qty: 10, note: 'Monthly service batch' },
      { date: '2024-10-14', type: 'In',  qty: 50, note: 'Bulk order received' },
    ],
  },
  {
    id: 'inv-005', code: 'ITM-0005', sku: 'CAM-DVR-4CH', name: 'MDVR Camera 4-Channel',
    category: 'Cameras / Sensors', assetType: 'Bus', location: 'Shelf D-07',
    warehouse: 'Warehouse 2 – Jeddah', qty: 6, reserved: 6, reorderLevel: 4,
    unit: 'Unit', status: 'Reserved', supplier: 'Hikvision ME',
    lastUpdated: '2024-10-17', unitCost: 1200, assignedTo: 'IT / Telematics Team',
    incomingQty: 0,
    movements: [
      { date: '2024-10-17', type: 'Reserved', qty: 6, note: 'Reserved for Q4 fleet upgrade' },
      { date: '2024-10-01', type: 'In', qty: 6, note: 'New stock received' },
    ],
  },
  {
    id: 'inv-006', code: 'ITM-0006', sku: 'TOOL-TRQ-001', name: 'Torque Wrench Set',
    category: 'Tools', assetType: 'Workshop Equipment', location: 'Tool Cabinet W1',
    warehouse: 'Workshop 1 – Riyadh', qty: 3, reserved: 0, reorderLevel: 2,
    unit: 'Set', status: 'In Stock', supplier: 'Stanley Tools KSA',
    lastUpdated: '2024-10-10', unitCost: 550, assignedTo: 'Workshop 1',
    incomingQty: 0,
    movements: [
      { date: '2024-10-10', type: 'Out', qty: 1, note: 'Issued to technician' },
      { date: '2024-09-28', type: 'In',  qty: 2, note: 'New purchase' },
    ],
  },
  {
    id: 'inv-007', code: 'ITM-0007', sku: 'SAF-VEST-HV', name: 'Hi-Vis Safety Vest',
    category: 'Safety Equipment', assetType: 'Driver / Staff', location: 'Shelf E-02',
    warehouse: 'Warehouse 1 – Riyadh', qty: 2, reserved: 0, reorderLevel: 15,
    unit: 'Pcs', status: 'Reorder Pending', supplier: 'SafeGuard Arabia',
    lastUpdated: '2024-10-16', unitCost: 28, assignedTo: '',
    incomingQty: 50,
    movements: [
      { date: '2024-10-16', type: 'Out', qty: 20, note: 'Distributed to new drivers' },
      { date: '2024-10-08', type: 'In',  qty: 10, note: 'Partial delivery' },
    ],
  },
  {
    id: 'inv-008', code: 'ITM-0008', sku: 'ELC-FUSE-32A', name: 'Fuse 32A (Box of 10)',
    category: 'Electrical', assetType: 'Bus / All Vehicles', location: 'Shelf B-11',
    warehouse: 'Warehouse 2 – Jeddah', qty: 22, reserved: 0, reorderLevel: 10,
    unit: 'Box', status: 'In Stock', supplier: 'Schneider Electric KSA',
    lastUpdated: '2024-10-13', unitCost: 45, assignedTo: '',
    incomingQty: 0,
    movements: [
      { date: '2024-10-13', type: 'Out', qty: 3, note: 'Used for electrical repair' },
      { date: '2024-09-30', type: 'In',  qty: 10, note: 'Restocked' },
    ],
  },
  {
    id: 'inv-009', code: 'ITM-0009', sku: 'MECH-BELT-001', name: 'Serpentine Belt',
    category: 'Mechanical', assetType: 'Bus / Heavy Vehicle', location: 'Shelf A-08',
    warehouse: 'Warehouse 1 – Riyadh', qty: 7, reserved: 2, reorderLevel: 8,
    unit: 'Pcs', status: 'Low Stock', supplier: 'Gates Arabia',
    lastUpdated: '2024-10-22', unitCost: 95, assignedTo: '',
    incomingQty: 15,
    movements: [
      { date: '2024-10-22', type: 'Out', qty: 1, note: 'Replaced on Bus 09' },
      { date: '2024-10-11', type: 'In',  qty: 5, note: 'Restocked' },
    ],
  },
  {
    id: 'inv-010', code: 'ITM-0010', sku: 'CONS-GLOVE-L', name: 'Nitrile Gloves (Box L)',
    category: 'Consumables', assetType: 'Workshop / Driver', location: 'Shelf C-09',
    warehouse: 'Workshop 1 – Riyadh', qty: 30, reserved: 0, reorderLevel: 10,
    unit: 'Box', status: 'In Stock', supplier: 'MedSupply Arabia',
    lastUpdated: '2024-10-20', unitCost: 18, assignedTo: 'Workshop 1',
    incomingQty: 0,
    movements: [
      { date: '2024-10-20', type: 'Out', qty: 5, note: 'Monthly workshop issue' },
      { date: '2024-10-01', type: 'In',  qty: 20, note: 'Monthly order' },
    ],
  },
  {
    id: 'inv-011', code: 'ITM-0011', sku: 'SP-FILT-AIR', name: 'Air Filter (Heavy Duty)',
    category: 'Spare Parts', assetType: 'Bus / Heavy Vehicle', location: 'Shelf A-15',
    warehouse: 'Warehouse 1 – Riyadh', qty: 0, reserved: 0, reorderLevel: 6,
    unit: 'Pcs', status: 'Out of Stock', supplier: 'Al-Rashid Auto Parts',
    lastUpdated: '2024-10-09', unitCost: 75, assignedTo: '',
    incomingQty: 12,
    movements: [
      { date: '2024-10-09', type: 'Out', qty: 4, note: 'Last units used' },
    ],
  },
  {
    id: 'inv-012', code: 'ITM-0012', sku: 'ELC-CAM-SENS', name: 'Reverse Camera Sensor',
    category: 'Cameras / Sensors', assetType: 'Bus', location: 'Shelf D-03',
    warehouse: 'Warehouse 2 – Jeddah', qty: 9, reserved: 3, reorderLevel: 5,
    unit: 'Pcs', status: 'In Stock', supplier: 'Hikvision ME',
    lastUpdated: '2024-10-18', unitCost: 380, assignedTo: 'IT / Telematics Team',
    incomingQty: 0,
    movements: [
      { date: '2024-10-18', type: 'Out', qty: 2, note: 'Installed on Bus 31' },
      { date: '2024-10-05', type: 'In',  qty: 5, note: 'New stock' },
    ],
  },
];

/* ─── Config maps ────────────────────────────────────────────────────────── */
const STATUS_CFG: Record<StockStatus, { bg: string; text: string; border: string; dot: string }> = {
  'In Stock':       { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  'Low Stock':      { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200',   dot: 'bg-amber-400'   },
  'Out of Stock':   { bg: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-200',    dot: 'bg-rose-500'    },
  'Reserved':       { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200',    dot: 'bg-blue-400'    },
  'Reorder Pending':{ bg: 'bg-violet-50',  text: 'text-violet-700',  border: 'border-violet-200',  dot: 'bg-violet-500'  },
};

const MOVEMENT_CFG: Record<StockMovement['type'], { text: string; icon: React.ElementType; sign: string }> = {
  In:       { text: 'text-emerald-600', icon: ArrowDownToLine, sign: '+' },
  Out:      { text: 'text-rose-600',    icon: ArrowUpFromLine, sign: '-' },
  Reserved: { text: 'text-blue-600',    icon: Ban,             sign: '~' },
  Adjusted: { text: 'text-amber-600',   icon: Settings2,       sign: '±' },
};

const CATEGORY_ICON: Record<ItemCategory, React.ElementType> = {
  'Spare Parts':        Package,
  'Tools':              Wrench,
  'Electrical':         Zap,
  'Mechanical':         Settings2,
  'Safety Equipment':   Shield,
  'Consumables':        Layers,
  'Tires':              CircleDot,
  'Batteries':          Battery,
  'Fluids / Lubricants':Droplets,
  'Cameras / Sensors':  Camera,
};

/* ─── Reusable atoms ─────────────────────────────────────────────────────── */

/** InventoryStatusBadge */
function InventoryStatusBadge({ status }: { status: StockStatus }) {
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

/** FilterSelect */
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
      <span className={cn(
        'ml-0.5 tabular-nums font-semibold',
        active ? activeText : 'text-slate-600',
      )}>{count}</span>
    </button>
  );
}

/* ─── StockMovementList ──────────────────────────────────────────────────── */
function StockMovementList({ movements }: { movements: StockMovement[] }) {
  return (
    <div className="space-y-1">
      {movements.map((m, i) => {
        const cfg = MOVEMENT_CFG[m.type];
        const Icon = cfg.icon;
        return (
          <div key={i} className="flex items-start gap-2 rounded-md border border-[#eef4f8] bg-[#f8fafc] px-2.5 py-1.5">
            <Icon className={cn('mt-px h-3 w-3 shrink-0', cfg.text)} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10.5px] text-slate-600">{m.note}</p>
              <p className="text-[10px] text-slate-400">{m.date}</p>
            </div>
            <span className={cn('shrink-0 text-[10.5px] font-bold tabular-nums', cfg.text)}>
              {cfg.sign}{m.qty}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── InventoryDetailsPanel ──────────────────────────────────────────────── */
function InventoryDetailsPanel({ item, onClose }: { item: InventoryItem; onClose: () => void }) {
  const CatIcon = CATEGORY_ICON[item.category];
  const staCfg = STATUS_CFG[item.status];
  const totalValue = (item.qty * item.unitCost).toLocaleString();

  return (
    <div className="flex h-full flex-col overflow-hidden border-l border-[#d4e0ea] bg-white shadow-[-4px_0_16px_rgba(61,107,142,0.06)]">
      {/* Header */}
      <div className="shrink-0 border-b border-[#d4e0ea] bg-white px-4 py-3">
        <div className="flex items-start gap-3">
          <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full border', staCfg.bg, staCfg.border)}>
            <CatIcon className={cn('h-4 w-4', staCfg.text)} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[12.5px] font-bold leading-tight text-slate-800">{item.name}</p>
            <p className="mt-0.5 text-[10.5px] text-slate-400">{item.code} · {item.sku}</p>
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
          <InventoryStatusBadge status={item.status} />
          <span className="rounded-[4px] border border-[#3d6b8e] bg-[#3d6b8e] px-2 py-[3px] text-[10.5px] font-bold tracking-wide text-white">
            {item.qty} {item.unit}
          </span>
          <span className="rounded-[4px] border border-slate-200 bg-slate-50 px-2 py-[3px] text-[10.5px] font-semibold text-slate-600">
            {item.category}
          </span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto [scrollbar-gutter:stable]">
        <Section icon={Info} title="Item Details">
          <DR label="Item Code"         value={item.code} />
          <DR label="SKU / Ref"         value={item.sku} />
          <DR label="Category"          value={item.category} />
          <DR label="Related Asset"     value={item.assetType} />
          <DR label="Warehouse"         value={item.warehouse} />
          <DR label="Location"          value={item.location} />
          <DR label="Available Qty"     value={`${item.qty - item.reserved} ${item.unit}`}
            valueClass={(item.qty - item.reserved) <= 0 ? 'text-rose-600 font-semibold' : undefined} />
          <DR label="Reserved Qty"      value={`${item.reserved} ${item.unit}`} />
          <DR label="Reorder Level"     value={`${item.reorderLevel} ${item.unit}`} />
          <DR label="Supplier"          value={item.supplier} />
          <DR label="Last Updated"      value={item.lastUpdated} />
          <DR label="Unit Cost"         value={`SAR ${item.unitCost.toLocaleString()}`} />
          <DR label="Total Value"       value={`SAR ${totalValue}`} valueClass="font-semibold text-slate-800" />
          {item.assignedTo && <DR label="Assigned To" value={item.assignedTo} />}
        </Section>

        <Section icon={Truck} title="Stock Insights" defaultOpen>
          <div className="mb-2 grid grid-cols-3 gap-1.5">
            {[
              { label: 'Available', val: item.qty - item.reserved, color: 'text-emerald-600' },
              { label: 'Reserved',  val: item.reserved,            color: 'text-blue-600'    },
              { label: 'Incoming',  val: item.incomingQty,         color: 'text-violet-600'  },
            ].map(s => (
              <div key={s.label} className="rounded-md border border-[#eef4f8] bg-[#f8fafc] px-2 py-1.5 text-center">
                <p className={cn('text-[13px] font-bold tabular-nums leading-none', s.color)}>{s.val}</p>
                <p className="mt-0.5 text-[9.5px] font-medium uppercase tracking-wide text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
          {item.qty <= item.reorderLevel && (
            <div className="flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1.5">
              <AlertTriangle className="h-3 w-3 shrink-0 text-amber-600" />
              <p className="text-[10.5px] font-medium text-amber-700">
                Stock at or below reorder level ({item.reorderLevel} {item.unit})
              </p>
            </div>
          )}
          {item.incomingQty > 0 && (
            <div className="mt-1.5 flex items-center gap-1.5 rounded-md border border-violet-200 bg-violet-50 px-2.5 py-1.5">
              <ArrowDownToLine className="h-3 w-3 shrink-0 text-violet-600" />
              <p className="text-[10.5px] font-medium text-violet-700">
                {item.incomingQty} {item.unit} incoming from supplier
              </p>
            </div>
          )}
        </Section>

        <Section icon={History} title="Recent Movements" defaultOpen={false}>
          <StockMovementList movements={item.movements} />
        </Section>
      </div>

      {/* Workflow actions */}
      <div className="shrink-0 border-t border-[#d4e0ea] bg-[#f8fafc] px-4 py-2.5">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Actions</p>
        <div className="flex flex-wrap gap-1.5">
          <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-[#d0e2f0] bg-[#e8f0f8] px-2.5 text-[11px] font-semibold text-[#2e5f8a] transition-colors hover:bg-[#d8ecf8]">
            <Settings2 className="h-3 w-3" />
            Adjust Stock
          </button>
          <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-violet-200 bg-violet-50 px-2.5 text-[11px] font-semibold text-violet-700 transition-colors hover:bg-violet-100">
            <Send className="h-3 w-3" />
            Transfer
          </button>
          <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 text-[11px] font-semibold text-emerald-700 transition-colors hover:bg-emerald-100">
            <PackagePlus className="h-3 w-3" />
            Assign Item
          </button>
          <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-2.5 text-[11px] font-semibold text-amber-700 transition-colors hover:bg-amber-100">
            <ShoppingCart className="h-3 w-3" />
            Reorder
          </button>
          <button className="inline-flex h-7 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 text-[11px] font-semibold text-slate-600 transition-colors hover:bg-slate-50">
            <History className="h-3 w-3" />
            View History
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── NoInventoryState ───────────────────────────────────────────────────── */
function NoInventoryState() {
  return (
    <tr>
      <td colSpan={10} className="py-14 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef4f8]">
            <ClipboardList className="h-5 w-5 text-[#3d6b8e]" />
          </div>
          <p className="text-sm font-medium text-slate-600">No inventory items found</p>
          <p className="text-xs text-slate-400">Try adjusting your filters or search query.</p>
        </div>
      </td>
    </tr>
  );
}

/* ─── Sort helpers ───────────────────────────────────────────────────────── */
type SortKey = 'qty' | 'lastUpdated' | 'status' | 'category' | 'name';

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

/* ─── InventoryRowActions ────────────────────────────────────────────────── */
function InventoryRowActions({ item, isSelected, onSelect }: {
  item: InventoryItem; isSelected: boolean; onSelect: (i: InventoryItem) => void;
}) {
  const CatIcon = CATEGORY_ICON[item.category];
  const qtyColor = item.status === 'Out of Stock'
    ? 'text-rose-600 font-bold'
    : item.status === 'Low Stock' || item.status === 'Reorder Pending'
      ? 'text-amber-600 font-semibold'
      : 'text-slate-800 font-semibold';

  return (
    <TableRow className={cn(isSelected && 'bg-[#eef4f8] ring-1 ring-inset ring-[#3d6b8e]/20')}>
      <TableCell>
        <span className={cn(fleetType.bodyMono, 'text-[#3d6b8e] font-bold')}>{item.code}</span>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1.5">
          <CatIcon className="h-3 w-3 shrink-0 text-slate-400" />
          <span className={cn(fleetType.bodyPrimary, 'truncate max-w-[150px] block')} title={item.name}>{item.name}</span>
        </div>
      </TableCell>
      <TableCell>
        <span className={fleetType.bodyMuted}>{item.category}</span>
      </TableCell>
      <TableCell>
        <span className={cn(fleetType.bodyPrimary, 'truncate max-w-[110px] block')} title={item.assetType}>{item.assetType}</span>
      </TableCell>
      <TableCell>
        <div>
          <p className={cn(fleetType.bodyPrimary, 'truncate max-w-[120px]')} title={item.warehouse}>{item.warehouse}</p>
          <p className={cn(fleetType.bodyMuted, 'mt-0.5')}>{item.location}</p>
        </div>
      </TableCell>
      <TableCell align="right">
        <span className={cn('text-xs tabular-nums', qtyColor)}>{item.qty}</span>
      </TableCell>
      <TableCell>
        <span className={fleetType.bodyMuted}>{item.unit}</span>
      </TableCell>
      <TableCell>
        <InventoryStatusBadge status={item.status} />
      </TableCell>
      <TableCell>
        <span className={fleetType.bodyMonoMuted}>{item.lastUpdated}</span>
      </TableCell>
      <TableCell align="center">
        <button
          onClick={() => onSelect(item)}
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

/* ─── InventoryTable ─────────────────────────────────────────────────────── */
interface InventoryTableProps {
  rows: InventoryItem[];
  totalCount: number;
  page: number; pageSize: number;
  onPageChange: (p: number) => void;
  onPageSizeChange: (s: number) => void;
  selectedId: string | null;
  onSelect: (item: InventoryItem) => void;
  sortKey: SortKey; sortDir: 'asc' | 'desc';
  onSort: (k: SortKey) => void;
}

function InventoryTable({
  rows, totalCount, page, pageSize, onPageChange, onPageSizeChange,
  selectedId, onSelect, sortKey, sortDir, onSort,
}: InventoryTableProps) {
  return (
    <DataTable className="flex-1 min-w-0">
      <DataTableToolbar>
        <div className="flex min-w-0 items-center gap-2">
          <h3 className="text-sm font-bold uppercase tracking-[0.02rem] text-slate-800">
            Inventory Items
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
        <DataTableTable className="min-w-[1160px]">
          <TableHeader>
            <tr>
              <TableHeaderCell className="w-[90px]">Item Code</TableHeaderCell>
              <SortableHeader label="Item Name"    sortKey="name"        currentKey={sortKey} dir={sortDir} onSort={onSort} className="w-[170px]" />
              <SortableHeader label="Category"     sortKey="category"    currentKey={sortKey} dir={sortDir} onSort={onSort} className="w-[130px]" />
              <TableHeaderCell className="w-[120px]">Asset Type</TableHeaderCell>
              <TableHeaderCell className="w-[150px]">Location</TableHeaderCell>
              <SortableHeader label="Qty"          sortKey="qty"         currentKey={sortKey} dir={sortDir} onSort={onSort} className="w-[60px]" />
              <TableHeaderCell className="w-[55px]">Unit</TableHeaderCell>
              <SortableHeader label="Stock Status" sortKey="status"      currentKey={sortKey} dir={sortDir} onSort={onSort} className="w-[120px]" />
              <SortableHeader label="Last Updated" sortKey="lastUpdated" currentKey={sortKey} dir={sortDir} onSort={onSort} className="w-[100px]" />
              <TableHeaderCell className="w-[60px]" align="center">Actions</TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody>
            {rows.length === 0 ? (
              <NoInventoryState />
            ) : (
              rows.map(item => (
                <InventoryRowActions
                  key={item.id}
                  item={item}
                  isSelected={selectedId === item.id}
                  onSelect={onSelect}
                />
              ))
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

/* ─── InventoryToolbar ───────────────────────────────────────────────────── */
interface InventoryToolbarProps {
  search: string; onSearchChange: (v: string) => void;
  categoryFilter: string; onCategoryChange: (v: string) => void;
  statusFilter: string; onStatusChange: (v: string) => void;
  locationFilter: string; onLocationChange: (v: string) => void;
  dateFilter: string; onDateChange: (v: string) => void;
  onClear: () => void; hasActiveFilters: boolean;
}

function InventoryToolbar({
  search, onSearchChange, categoryFilter, onCategoryChange,
  statusFilter, onStatusChange, locationFilter, onLocationChange,
  dateFilter, onDateChange, onClear, hasActiveFilters,
}: InventoryToolbarProps) {
  const CATEGORIES: ItemCategory[] = [
    'Spare Parts', 'Tools', 'Electrical', 'Mechanical', 'Safety Equipment',
    'Consumables', 'Tires', 'Batteries', 'Fluids / Lubricants', 'Cameras / Sensors',
  ];
  const STATUSES: StockStatus[] = ['In Stock', 'Low Stock', 'Out of Stock', 'Reserved', 'Reorder Pending'];
  const LOCATIONS = [...new Set(MOCK_INVENTORY.map(i => i.warehouse))];

  return (
    <div className="shrink-0 rounded-lg border border-[#e8eef4] bg-white px-4 py-2.5 shadow-[0_1px_8px_rgba(61,107,142,0.07)]">
      {/* Row 1: title + primary action */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-[13px] font-bold text-slate-800 tracking-[-0.01em]">Inventory</h1>
          <span className="text-[11px] text-slate-400 font-normal">· Asset stock &amp; parts</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="inline-flex h-7 items-center gap-1 rounded border border-[#d4e0ea] bg-white px-2.5 text-[11px] font-medium text-slate-500 transition-colors hover:bg-slate-50">
            <RefreshCw className="h-3 w-3" />
            Refresh
          </button>
          <button className="inline-flex h-7 items-center gap-1 rounded border border-[#d0e2f0] bg-[#eef4f8] px-2.5 text-[11px] font-medium text-[#3d6b8e] transition-colors hover:bg-[#dceaf4]">
            <FileDown className="h-3 w-3" />
            Export
          </button>
          <button className="inline-flex h-7 items-center gap-1 rounded border border-[#3d6b8e] bg-[#3d6b8e] px-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#2e5270]">
            <Plus className="h-3 w-3" />
            Add Item
          </button>
        </div>
      </div>

      {/* Row 2: filters */}
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search code, name, SKU…"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            className="h-7 w-48 rounded border border-[#d4e0ea] bg-white pl-7 pr-2.5 text-[11px] text-slate-700 placeholder:text-slate-400 focus:border-[#3d6b8e] focus:outline-none focus:ring-1 focus:ring-[#3d6b8e]/30"
          />
        </div>
        <FilterSelect label="Category" value={categoryFilter} onChange={onCategoryChange} options={CATEGORIES} />
        <FilterSelect label="Status"   value={statusFilter}   onChange={onStatusChange}   options={STATUSES} />
        <FilterSelect label="Location" value={locationFilter} onChange={onLocationChange} options={LOCATIONS} />
        <input
          type="date"
          value={dateFilter}
          onChange={e => onDateChange(e.target.value)}
          className="h-7 rounded border border-[#d4e0ea] bg-white px-2 text-[11px] text-slate-600 focus:border-[#3d6b8e] focus:outline-none focus:ring-1 focus:ring-[#3d6b8e]/30"
        />
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="inline-flex h-7 items-center gap-1 rounded border border-slate-200 bg-white px-2 text-[11px] text-slate-400 transition-colors hover:text-slate-600"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────────── */
export default function InventoryPage() {
  const [search, setSearch]               = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter]   = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [dateFilter, setDateFilter]       = useState('');
  const [activeChip, setActiveChip]       = useState<string | null>(null);
  const [selected, setSelected]           = useState<InventoryItem | null>(null);
  const [page, setPage]                   = useState(1);
  const [pageSize, setPageSize]           = useState(10);
  const [sortKey, setSortKey]             = useState<SortKey>('lastUpdated');
  const [sortDir, setSortDir]             = useState<'asc' | 'desc'>('desc');

  const counts = useMemo(() => ({
    total:    MOCK_INVENTORY.length,
    inStock:  MOCK_INVENTORY.filter(i => i.status === 'In Stock').length,
    lowStock: MOCK_INVENTORY.filter(i => i.status === 'Low Stock').length,
    outOfStock: MOCK_INVENTORY.filter(i => i.status === 'Out of Stock').length,
    reserved: MOCK_INVENTORY.filter(i => i.status === 'Reserved').length,
    reorder:  MOCK_INVENTORY.filter(i => i.status === 'Reorder Pending' || i.qty <= i.reorderLevel).length,
  }), []);

  const filtered = useMemo(() => {
    let rows = MOCK_INVENTORY;

    if (activeChip === 'inStock')    rows = rows.filter(i => i.status === 'In Stock');
    else if (activeChip === 'lowStock')   rows = rows.filter(i => i.status === 'Low Stock');
    else if (activeChip === 'outOfStock') rows = rows.filter(i => i.status === 'Out of Stock');
    else if (activeChip === 'reserved')   rows = rows.filter(i => i.status === 'Reserved');
    else if (activeChip === 'reorder')    rows = rows.filter(i => i.status === 'Reorder Pending' || i.qty <= i.reorderLevel);

    if (categoryFilter) rows = rows.filter(i => i.category === categoryFilter);
    if (statusFilter)   rows = rows.filter(i => i.status === statusFilter);
    if (locationFilter) rows = rows.filter(i => i.warehouse === locationFilter);
    if (dateFilter)     rows = rows.filter(i => i.lastUpdated === dateFilter);
    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter(i =>
        i.code.toLowerCase().includes(q) ||
        i.sku.toLowerCase().includes(q) ||
        i.name.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.supplier.toLowerCase().includes(q),
      );
    }

    return [...rows].sort((a, b) => {
      let av: string | number = a[sortKey as keyof InventoryItem] as string | number;
      let bv: string | number = b[sortKey as keyof InventoryItem] as string | number;
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av;
      }
      av = String(av ?? ''); bv = String(bv ?? '');
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [search, categoryFilter, statusFilter, locationFilter, dateFilter, activeChip, sortKey, sortDir]);

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
    setLocationFilter(''); setDateFilter(''); setActiveChip(null); setPage(1);
  }

  function handleSelect(item: InventoryItem) {
    setSelected(prev => prev?.id === item.id ? null : item);
  }

  const hasActiveFilters = !!(search || categoryFilter || statusFilter || locationFilter || dateFilter || activeChip);

  const CHIPS = [
    { key: 'total',      label: 'Total',           count: counts.total,      dotColor: 'bg-slate-400',   activeColor: 'bg-slate-50',   activeText: 'text-slate-700',   activeBorder: 'border-slate-300'   },
    { key: 'inStock',    label: 'In Stock',         count: counts.inStock,    dotColor: 'bg-emerald-500', activeColor: 'bg-emerald-50', activeText: 'text-emerald-700', activeBorder: 'border-emerald-200' },
    { key: 'lowStock',   label: 'Low Stock',        count: counts.lowStock,   dotColor: 'bg-amber-400',   activeColor: 'bg-amber-50',   activeText: 'text-amber-700',   activeBorder: 'border-amber-200'   },
    { key: 'outOfStock', label: 'Out of Stock',     count: counts.outOfStock, dotColor: 'bg-rose-500',    activeColor: 'bg-rose-50',    activeText: 'text-rose-700',    activeBorder: 'border-rose-200'    },
    { key: 'reserved',   label: 'Reserved',         count: counts.reserved,   dotColor: 'bg-blue-400',    activeColor: 'bg-blue-50',    activeText: 'text-blue-700',    activeBorder: 'border-blue-200'    },
    { key: 'reorder',    label: 'Reorder Required', count: counts.reorder,    dotColor: 'bg-violet-500',  activeColor: 'bg-violet-50',  activeText: 'text-violet-700',  activeBorder: 'border-violet-200'  },
  ];

  return (
    <PageLayout title="Inventory">
      <InventoryToolbar
        search={search}               onSearchChange={v => { setSearch(v); setPage(1); }}
        categoryFilter={categoryFilter} onCategoryChange={v => { setCategoryFilter(v); setPage(1); }}
        statusFilter={statusFilter}   onStatusChange={v => { setStatusFilter(v); setPage(1); }}
        locationFilter={locationFilter} onLocationChange={v => { setLocationFilter(v); setPage(1); }}
        dateFilter={dateFilter}       onDateChange={v => { setDateFilter(v); setPage(1); }}
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
        <InventoryTable
          rows={paginated}
          totalCount={filtered.length}
          page={page} pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={s => { setPageSize(s); setPage(1); }}
          selectedId={selected?.id ?? null}
          onSelect={handleSelect}
          sortKey={sortKey} sortDir={sortDir}
          onSort={handleSort}
        />

        {selected && (
          <div className="w-[320px] shrink-0 overflow-hidden rounded-md border border-[#d4e0ea] shadow-sm">
            <InventoryDetailsPanel item={selected} onClose={() => setSelected(null)} />
          </div>
        )}
      </div>
    </PageLayout>
  );
}
