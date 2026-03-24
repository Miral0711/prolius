import { useState } from 'react';
import {
  Bus,
  CheckCircle2,
  Eye,
  FileDown,
  FileSpreadsheet,
  Info,
  Pencil,
  Plus,
  Power,
  Settings,
  Trash2,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { PageShell } from '@/components/ui/page-shell';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StatCard } from '@/components/dashboard/StatCard';
import {
  StatusBadge,
  type StatusVariant,
} from '@/components/dashboard/StatusBadge';
import {
  BUS_TABLE_COL_WIDTH_PX,
  DataTable,
  DataTableBodyScroll,
  DataTableFooter,
  DataTableTable,
  DataTableToolbar,
  FilterDropdown,
  fleetSurface,
  FleetToolbarButton,
  fleetType,
  MetadataCell,
  PowerBadge,
  RowActionMenu,
  SearchInput,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  type MdtHealthState,
  type RowMenuEntry,
} from '@/components/fleet/bus-master';
import { PageSurface } from '@/components/layout';

/* ═══════════════════════════════════════════════════════════════
   TYPES & DUMMY DATA
═══════════════════════════════════════════════════════════════ */

type WaslStatus = 'Enable' | 'Disable';
type BusStatus = 'Active' | 'Out of Service' | 'Maintenance';
type PowerStatus = 'Enable' | 'Disable';

interface BusMasterRow {
  id: number;
  companyName: string;
  plateNo: string;
  seqNo: number;
  mdtId: string;
  subStart: string;
  subEnd: string;
  tariff: string;
  wasl: WaslStatus;
  status: BusStatus;
  power: PowerStatus;
  enterpriseLabel: string;
  busType: string;
  routeCode: string;
  branch: string;
  driverName: string;
  mdtHealth: MdtHealthState;
  lastMdtPing: string;
  complianceDueLabel: string;
  firmwareVersion: string;
  lastTripAt: string;
  lastUpdatedRelative: string;
  operationsNote: string;
  activeInFleet: boolean;
  fleetLocked: boolean;
}

type BusMasterSeedCore = Omit<
  BusMasterRow,
  | 'id'
  | 'enterpriseLabel'
  | 'busType'
  | 'routeCode'
  | 'branch'
  | 'driverName'
  | 'mdtHealth'
  | 'lastMdtPing'
  | 'complianceDueLabel'
  | 'firmwareVersion'
  | 'lastTripAt'
  | 'lastUpdatedRelative'
  | 'operationsNote'
  | 'activeInFleet'
  | 'fleetLocked'
>;

const BUS_MASTER_SEED: BusMasterSeedCore[] = [
  {
    companyName: 'Riyadh Bus Co.',
    plateNo: 'ABC 1234',
    seqNo: 101,
    mdtId: 'MDT-8821',
    subStart: '01/01/24',
    subEnd: '31/12/25',
    tariff: 'Standard-A',
    wasl: 'Enable',
    status: 'Active',
    power: 'Enable',
  },
  {
    companyName: 'SAPTCO Logistics',
    plateNo: 'DEF 5678',
    seqNo: 204,
    mdtId: 'MDT-9912',
    subStart: '15/03/24',
    subEnd: '14/03/26',
    tariff: 'Premium-X',
    wasl: 'Enable',
    status: 'Maintenance',
    power: 'Disable',
  },
  {
    companyName: 'Najran Transport',
    plateNo: 'GHI 9012',
    seqNo: 302,
    mdtId: 'MDT-4456',
    subStart: '20/06/23',
    subEnd: '19/06/25',
    tariff: 'Standard-B',
    wasl: 'Disable',
    status: 'Out of Service',
    power: 'Disable',
  },
  {
    companyName: 'Eastern Fleet Grp',
    plateNo: 'JKL 3456',
    seqNo: 411,
    mdtId: 'MDT-1102',
    subStart: '01/01/24',
    subEnd: '31/12/25',
    tariff: 'Standard-A',
    wasl: 'Enable',
    status: 'Active',
    power: 'Enable',
  },
  {
    companyName: 'Makkah Transit',
    plateNo: 'MNO 7890',
    seqNo: 505,
    mdtId: 'MDT-5567',
    subStart: '10/10/24',
    subEnd: '09/10/26',
    tariff: 'Premium-Y',
    wasl: 'Enable',
    status: 'Active',
    power: 'Enable',
  },
  {
    companyName: 'Madinah Express',
    plateNo: 'PQR 1122',
    seqNo: 618,
    mdtId: 'MDT-2234',
    subStart: '05/05/24',
    subEnd: '04/05/26',
    tariff: 'Standard-C',
    wasl: 'Disable',
    status: 'Out of Service',
    power: 'Enable',
  },
  {
    companyName: 'Dammam City Bus',
    plateNo: 'STU 4433',
    seqNo: 722,
    mdtId: 'MDT-7788',
    subStart: '01/01/24',
    subEnd: '31/12/24',
    tariff: 'Standard-A',
    wasl: 'Enable',
    status: 'Active',
    power: 'Enable',
  },
];

const EXTRA_COMPANIES = [
  'Jeddah Urban Link',
  'Tabuk Regional Bus',
  'Al Khobar Shuttle',
  'Hail Intercity',
  'Al Ahsa Connect',
  'Yanbu Port Transit',
  'Jazan Coastal Lines',
  'Buraidah Metro Bus',
  'Arar North Express',
  'Abha Highland Bus',
  'Taif Mountain Route',
  'Qassim Fleet Hub',
  'Al Jubail Industrial',
  'Ras Tanura Link',
  'Khamis Mushait City',
];

const EXTRA_TARIFFS = [
  'Standard-A',
  'Standard-B',
  'Standard-C',
  'Premium-X',
  'Premium-Y',
] as const;

const DRIVER_POOL = [
  'Ahmed Al-Otaibi',
  'Sultan Al-Rashid',
  'Khalid Al-Mutairi',
  'Faisal Al-Dosari',
  'Nora Al-Qahtani',
  'Omar Al-Harbi',
  'Layla Al-Zahrani',
] as const;

const BUS_TYPE_POOL = [
  'Coach 12m',
  'Articulated 18m',
  'Midi 9m',
  'Low-floor EV',
  'Double-decker',
] as const;

const BRANCH_POOL = [
  'North Riyadh',
  'Jeddah Hub',
  'Eastern Province',
  'Makkah',
  'Madinah',
  'Dammam Depot',
] as const;

function operationalProfile(
  index: number,
): Omit<
  BusMasterRow,
  | 'id'
  | 'companyName'
  | 'plateNo'
  | 'seqNo'
  | 'mdtId'
  | 'subStart'
  | 'subEnd'
  | 'tariff'
  | 'wasl'
  | 'status'
  | 'power'
> {
  const healthCycle: MdtHealthState[] = ['online', 'degraded', 'offline'];
  return {
    enterpriseLabel: index % 5 === 0 ? 'Government contract' : 'Enterprise',
    busType: BUS_TYPE_POOL[index % BUS_TYPE_POOL.length],
    routeCode: `R-${String((index % 42) + 1).padStart(2, '0')}`,
    branch: BRANCH_POOL[index % BRANCH_POOL.length],
    driverName: DRIVER_POOL[index % DRIVER_POOL.length],
    mdtHealth: healthCycle[index % 3],
    lastMdtPing: `${(index % 47) + 3}m ago`,
    complianceDueLabel: `PTO · Q${(index % 4) + 1} ${2026 + (index % 2)}`,
    firmwareVersion: `v${4 + (index % 2)}.${index % 12}.${index % 9}`,
    lastTripAt:
      index % 2 === 0
        ? `${String(6 + (index % 8)).padStart(2, '0')}:${String(10 + (index % 45)).padStart(2, '0')} departure`
        : 'Idle · no trip logged today',
    lastUpdatedRelative: `${(index % 20) + 1}h ago`,
    operationsNote:
      index % 4 === 0
        ? 'Brake inspection due on next depot visit.'
        : index % 4 === 1
          ? 'Camera channel 2 queued for firmware update.'
          : 'No open maintenance tickets.',
    activeInFleet: index % 9 !== 0,
    fleetLocked: index % 13 === 0,
  };
}

function buildBusMasterRows(total: number): BusMasterRow[] {
  const nSeed = Math.min(BUS_MASTER_SEED.length, total);
  const rows: BusMasterRow[] = BUS_MASTER_SEED.slice(0, nSeed).map((r, i) => ({
    ...r,
    id: i + 1,
    ...operationalProfile(i),
  }));
  let nextId = rows.length + 1;
  let seq = 800;
  while (rows.length < total) {
    const i = rows.length;
    const company =
      EXTRA_COMPANIES[(i - BUS_MASTER_SEED.length) % EXTRA_COMPANIES.length];
    const plate = `${String.fromCharCode(65 + (i % 26))}${String.fromCharCode(65 + ((i * 3) % 26))}${String.fromCharCode(65 + ((i * 7) % 26))} ${1000 + i}`;
    const statuses: BusStatus[] = [
      'Active',
      'Active',
      'Active',
      'Maintenance',
      'Out of Service',
    ];
    const wasl: WaslStatus = i % 4 === 0 ? 'Disable' : 'Enable';
    const power: PowerStatus = i % 5 === 0 ? 'Disable' : 'Enable';
    rows.push({
      id: nextId++,
      companyName: company,
      plateNo: plate,
      seqNo: seq,
      mdtId: `MDT-${6200 + i}`,
      subStart: `${String((i % 28) + 1).padStart(2, '0')}/${String((i % 12) + 1).padStart(2, '0')}/24`,
      subEnd: `${String((i % 28) + 1).padStart(2, '0')}/${String((i % 12) + 1).padStart(2, '0')}/26`,
      tariff: EXTRA_TARIFFS[i % EXTRA_TARIFFS.length],
      wasl,
      status: statuses[i % statuses.length],
      power,
      ...operationalProfile(i),
    });
    seq += 17;
  }
  return rows;
}

const BUS_MASTER_DUMMY: BusMasterRow[] = buildBusMasterRows(28);

function busStatusVariant(status: BusStatus): StatusVariant {
  if (status === 'Active') return 'emerald';
  if (status === 'Maintenance') return 'amber';
  return 'rose';
}

function waslVariant(wasl: WaslStatus): StatusVariant {
  return wasl === 'Enable' ? 'emerald' : 'rose';
}

function buildRowMenuEntries(row: BusMasterRow): RowMenuEntry[] {
  return [
    {
      kind: 'item',
      id: `audit-${row.id}`,
      icon: Info,
      label: 'View bus audit',
    },
  ];
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */

export default function BusMasterPage() {
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const kpis = [
    {
      title: 'Total Buses',
      value: 779,
      icon: Bus,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      title: 'Active',
      value: 522,
      icon: CheckCircle2,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
    },
    {
      title: 'Out of Service',
      value: 184,
      icon: XCircle,
      color: 'text-rose-500',
      bg: 'bg-rose-50',
    },
    {
      title: 'Maintenance',
      value: 73,
      icon: Settings,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
    },
    {
      title: 'Expiring Compliance',
      value: 12,
      icon: Info,
      color: 'text-violet-500',
      bg: 'bg-violet-50',
    },
    {
      title: 'Power Disabled',
      value: 45,
      icon: Power,
      color: 'text-slate-500',
      bg: 'bg-slate-100',
    },
  ];

  const toggleSelect = (id: number) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleAll = () => {
    if (selectedIds.size === BUS_MASTER_DUMMY.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(BUS_MASTER_DUMMY.map((r) => r.id)));
  };

  const tableRowCount = BUS_MASTER_DUMMY.length;

  return (
    <PageShell
      title="Bus Management"
      hideHeader
      className="flex h-full min-h-0 flex-1 flex-col space-y-0"
      contentWrapperClassName="relative flex min-h-0 flex-1 flex-col"
    >
      <PageSurface
        padding="xs"
        fill
        sectionGap="none"
        className="min-h-0 flex-1 bg-blue-50/70"
      >
        <PageSurface.Body className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div
            className={cn(
              'flex min-h-0 flex-1 flex-col',
              fleetSurface.sectionGap,
            )}
          >
            {/* KPI */}
            <div
              className={cn(
                'grid shrink-0 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
                fleetSurface.kpiGap,
              )}
            >
              {kpis.map((k, i) => (
                <StatCard
                  key={i}
                  compact
                  label={k.title}
                  value={k.value}
                  icon={k.icon}
                  color={k.color}
                  bgColor={k.bg}
                  className="border-slate-200/90 bg-white shadow-sm"
                />
              ))}
            </div>

            {/* Filters — solid card (Bus Master reference) */}
            <div
              className={cn(
                'max-w-full shrink-0 rounded-md border border-slate-200/90 bg-white shadow-sm',
                fleetSurface.filterBar,
              )}
            >
              <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                  <FilterDropdown
                    defaultValue="all"
                    widthClassName="min-w-[160px] max-w-[200px]"
                    items={[
                      { value: 'all', label: 'Select Company' },
                      { value: 'riyadh', label: 'Riyadh Bus Co.' },
                    ]}
                  />
                  <FilterDropdown
                    defaultValue="all"
                    widthClassName="min-w-[140px] max-w-[180px]"
                    items={[{ value: 'all', label: 'Select Plate' }]}
                  />
                  <SearchInput
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    containerClassName="min-w-[160px] max-w-[260px] flex-1"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-1.5 lg:justify-end">
                  <FleetToolbarButton
                    tone="success"
                    tabIndex={-1}
                    className="px-2.5 sm:px-3"
                  >
                    Active
                  </FleetToolbarButton>
                  <FleetToolbarButton
                    tone="danger"
                    tabIndex={-1}
                    className="px-2.5 sm:px-3"
                  >
                    Out of service
                  </FleetToolbarButton>
                  <FleetToolbarButton
                    tone="warning"
                    tabIndex={-1}
                    className="px-2.5 sm:px-3"
                  >
                    Maintenance
                  </FleetToolbarButton>
                  <FleetToolbarButton
                    tone="primary"
                    className="gap-1.5 px-2.5 sm:px-3"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add New Bus
                  </FleetToolbarButton>
                </div>
              </div>
            </div>

            {/* Table */}
            <DataTable className="min-h-0">
              <DataTableToolbar>
                <div className="flex min-w-0 items-center gap-2">
                  <Bus className="h-4 w-4 shrink-0 text-slate-600" />
                  <h3 className="text-[13px] font-bold uppercase tracking-wide text-slate-800">
                    Bus List
                  </h3>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 text-[11px] font-semibold text-blue-700 shadow-sm hover:border-blue-300 hover:bg-blue-100 hover:text-blue-800"
                  >
                    <FileSpreadsheet className="h-3.5 w-3.5" />
                    Excel
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1.5 rounded-md border border-rose-200 bg-rose-50 px-3 text-[11px] font-semibold text-rose-700 shadow-sm hover:border-rose-300 hover:bg-rose-100 hover:text-rose-800"
                  >
                    <FileDown className="h-3.5 w-3.5" />
                    PDF
                  </Button>
                </div>
              </DataTableToolbar>

              <DataTableBodyScroll>
                <DataTableTable>
                  <colgroup>
                    {BUS_TABLE_COL_WIDTH_PX.map((w, i) => (
                      <col key={i} style={{ width: w }} />
                    ))}
                  </colgroup>
                  <TableHeader>
                    <tr>
                      <TableHeaderCell
                        align="center"
                        variant="default"
                        className="max-w-none overflow-visible bg-white text-slate-500"
                      >
                        <span className="sr-only">Select all rows</span>
                        <Checkbox
                          checked={selectedIds.size === BUS_MASTER_DUMMY.length}
                          onCheckedChange={toggleAll}
                          className="mx-auto border-slate-300"
                        />
                      </TableHeaderCell>
                      <TableHeaderCell
                        variant="default"
                        className="bg-white text-slate-500"
                      >
                        Company Name
                      </TableHeaderCell>
                      <TableHeaderCell
                        variant="default"
                        className="bg-white text-slate-500"
                      >
                        Plate No
                      </TableHeaderCell>
                      <TableHeaderCell
                        align="center"
                        variant="default"
                        className="bg-white text-slate-500"
                      >
                        Seq No
                      </TableHeaderCell>
                      <TableHeaderCell
                        variant="default"
                        className="bg-white text-slate-500"
                      >
                        MDT ID
                      </TableHeaderCell>
                      <TableHeaderCell
                        variant="default"
                        className="bg-white text-slate-500"
                      >
                        Sub. Start &amp; End
                      </TableHeaderCell>
                      <TableHeaderCell
                        variant="default"
                        className="bg-white text-slate-500"
                      >
                        Tariff
                      </TableHeaderCell>
                      <TableHeaderCell
                        align="center"
                        variant="default"
                        className="bg-white text-slate-500"
                      >
                        WASL
                      </TableHeaderCell>
                      <TableHeaderCell
                        align="center"
                        variant="default"
                        className="bg-white text-slate-500"
                      >
                        Status
                      </TableHeaderCell>
                      <TableHeaderCell
                        align="center"
                        variant="default"
                        className="bg-white text-slate-500"
                      >
                        Power
                      </TableHeaderCell>
                      <TableHeaderCell
                        align="right"
                        variant="default"
                        className="max-w-none overflow-visible bg-white text-slate-500"
                      >
                        Actions
                      </TableHeaderCell>
                    </tr>
                  </TableHeader>
                  <tbody className="bg-white">
                    {BUS_MASTER_DUMMY.map((row) => (
                      <TableRow
                        key={row.id}
                        className={cn(
                          'hover:bg-slate-50/80',
                          selectedIds.has(row.id) &&
                            'bg-slate-50 hover:bg-slate-50',
                        )}
                      >
                        <TableCell
                          align="center"
                          className="max-w-none overflow-visible"
                        >
                          <div className="flex items-center justify-center">
                            <Checkbox
                              checked={selectedIds.has(row.id)}
                              onCheckedChange={() => toggleSelect(row.id)}
                              className="border-slate-300"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <MetadataCell primary={row.companyName} />
                        </TableCell>
                        <TableCell>
                          <span className="font-mono text-[11px] font-semibold tabular-nums text-blue-700">
                            {row.plateNo}
                          </span>
                        </TableCell>
                        <TableCell align="center">
                          <span className={cn('font-mono text-[11px]', fleetType.bodyMono)}>
                            {row.seqNo}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn('block truncate text-[11px]', fleetType.bodyMono)}
                          >
                            {row.mdtId}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn('block truncate text-[11px]', fleetType.bodyMono)}
                          >
                            {row.subStart} - {row.subEnd}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn('block truncate text-[11px]', fleetType.bodyMono)}
                          >
                            {row.tariff}
                          </span>
                        </TableCell>
                        <TableCell align="center">
                          <span
                            className="inline-flex justify-center"
                            title="WASL integration status"
                          >
                            <StatusBadge
                              label={row.wasl}
                              variant={waslVariant(row.wasl)}
                              withDot
                              preserveCase
                              className="h-6 whitespace-nowrap px-2 text-[10px]"
                            />
                          </span>
                        </TableCell>
                        <TableCell align="center">
                          <span
                            className="inline-flex justify-center"
                            title="Fleet operations status"
                          >
                            <StatusBadge
                              label={row.status}
                              variant={busStatusVariant(row.status)}
                              className="h-6 whitespace-nowrap px-2 text-[10px] font-semibold"
                            />
                          </span>
                        </TableCell>
                        <TableCell align="center">
                          <div
                            className="flex justify-center"
                            title="On-board power / ignition"
                          >
                            <PowerBadge power={row.power} />
                          </div>
                        </TableCell>
                        <TableCell
                          align="right"
                          className="max-w-none overflow-visible"
                        >
                          <RowActionMenu
                            primaryActions={[
                              {
                                icon: Eye,
                                label: 'View details',
                                variant: 'info',
                              },
                              {
                                icon: Pencil,
                                label: 'Edit bus',
                                variant: 'default',
                              },
                              {
                                icon: Trash2,
                                label: 'Delete',
                                variant: 'danger',
                              },
                            ]}
                            menuEntries={buildRowMenuEntries(row)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </DataTableTable>
              </DataTableBodyScroll>

              <DataTableFooter className="flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                    <span>Show</span>
                    <Select defaultValue="25">
                      <SelectTrigger className="h-7 w-[64px] border-slate-200 bg-white px-2 text-[11px] font-medium shadow-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                    <span>entries</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Showing{' '}
                    <span className="font-semibold text-slate-800">1</span> to{' '}
                    <span className="font-semibold text-slate-800">
                      {tableRowCount}
                    </span>{' '}
                    of <span className="font-semibold text-slate-800">779</span>{' '}
                    entries
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1">
                  <button
                    type="button"
                    className="rounded border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-50"
                  >
                    Previous
                  </button>
                  {[1, 2, 3, 4, 5].map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={cn(
                        'flex h-7 min-w-[1.75rem] items-center justify-center rounded border px-1 text-[11px] font-semibold transition-all',
                        p === 1
                          ? 'border-blue-500 bg-blue-600 text-white shadow-sm'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
                      )}
                    >
                      {p}
                    </button>
                  ))}
                  <span className="px-0.5 text-[11px] font-medium text-slate-400">
                    …
                  </span>
                  <button
                    type="button"
                    className="flex h-7 min-w-[1.75rem] items-center justify-center rounded border border-slate-200 bg-white px-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    32
                  </button>
                  <button
                    type="button"
                    className="rounded border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-50"
                  >
                    Next
                  </button>
                </div>
              </DataTableFooter>
            </DataTable>
          </div>
        </PageSurface.Body>
        <PageSurface.Footer />
      </PageSurface>
    </PageShell>
  );
}
