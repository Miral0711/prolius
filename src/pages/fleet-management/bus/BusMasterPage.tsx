import { useState } from 'react';
import {
  Bus,
  CheckCircle2,
  Info,
  Plus,
  Power,
  Settings,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatCard } from '@/components/dashboard/StatCard';
import {
  BusListTable,
  FilterDropdown,
  fleetSurface,
  FleetToolbarButton,
  SearchInput,
  type BusListTableRow,
  type MdtHealthState,
  type RowMenuEntry,
} from '@/components/fleet/bus-master';
import { PageLayout } from '@/components/shared';

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

function buildRowMenuEntries(row: BusListTableRow): RowMenuEntry[] {
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
      color: 'text-[#2e5f8a]',
      bg: 'bg-[#e8f0f8]',
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

  return (
    <PageLayout title="Bus Management">
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
            className="border-[#d4e0ea] bg-white shadow-sm"
          />
        ))}
      </div>

      {/* Filters */}
      <div
        className={cn(
          'max-w-full shrink-0 rounded-md border border-[#d4e0ea] bg-white shadow-sm',
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
            <FleetToolbarButton tone="success" tabIndex={-1} className="px-2.5 sm:px-3">Active</FleetToolbarButton>
            <FleetToolbarButton tone="danger" tabIndex={-1} className="px-2.5 sm:px-3">Out of service</FleetToolbarButton>
            <FleetToolbarButton tone="warning" tabIndex={-1} className="px-2.5 sm:px-3">Maintenance</FleetToolbarButton>
            <FleetToolbarButton tone="primary" className="gap-1.5 px-2.5 sm:px-3">
              <Plus className="h-3.5 w-3.5" />
              Add New Bus
            </FleetToolbarButton>
          </div>
        </div>
      </div>

      <BusListTable
        rows={BUS_MASTER_DUMMY}
        selectedIds={selectedIds}
        onToggleRow={toggleSelect}
        onToggleAll={toggleAll}
        totalEntryCount={779}
        getRowMenuEntries={buildRowMenuEntries}
      />
    </PageLayout>
  );
}


