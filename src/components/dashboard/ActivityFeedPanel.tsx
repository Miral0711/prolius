import { cn } from '@/lib/utils';
import { DataTableCard } from './DataTableCard';
import { SimpleTable, type SimpleTableColumn } from './SimpleTable';

interface TripRow {
  id: string;
  vehicle: string;
  driver: string;
  route: string;
  revenue: string;
}

const RECENT_TRIPS: TripRow[] = [
  { id: 'TR-7702244', vehicle: 'TR-8412', driver: 'Ahmed M.', route: 'Riyadh → Jeddah', revenue: 'SAR 3,036' },
  { id: 'TR-7703411', vehicle: 'SXA0388', driver: 'Sarah L.', route: 'Dammam → Khobar', revenue: 'SAR 2,025' },
  { id: 'TR-7702231', vehicle: 'SSA0037', driver: 'Omar K.', route: 'Jeddah → Mecca', revenue: 'SAR 2,025' },
  { id: 'TR-7707444', vehicle: '85A1167', driver: 'Fatima A.', route: 'Riyadh → Qassim', revenue: 'SAR 3,411' },
  { id: 'TR-7707445', vehicle: 'VH-201', driver: 'Khaled R.', route: 'Medina → Yanbu', revenue: 'SAR 1,840' },
];

const COLUMNS: SimpleTableColumn<TripRow>[] = [
  { key: 'id', header: 'Trip ID', render: (r) => <span className="text-slate-800">{r.id}</span> },
  { key: 'vehicle', header: 'Vehicle', render: (r) => <span className="text-slate-600">{r.vehicle}</span> },
  { key: 'driver', header: 'Driver', render: (r) => <span className="text-slate-700">{r.driver}</span> },
  { key: 'route', header: 'Route', render: (r) => <span className="text-slate-500">{r.route}</span> },
  {
    key: 'revenue',
    header: 'Revenue',
    align: 'right',
    cellClassName: 'text-emerald-600',
    render: (r) => r.revenue,
  },
];

export function ActivityFeedPanel() {
  return (
    <DataTableCard title="Recent Trips">
      <SimpleTable data={RECENT_TRIPS} columns={COLUMNS} rowKey={(r) => r.id} minWidth={500} />
    </DataTableCard>
  );
}
