import { StatusBadge, type StatusVariant } from '@/components/dashboard/StatusBadge';
import type { DefectStatus } from '../mock-data';

const STATUS_VARIANT: Record<DefectStatus, StatusVariant> = {
  Reported:        'rose',
  Acknowledged:    'amber',
  Duplicate:       'violet',
  Resolved:        'emerald',
  'Repair Rejected': 'alert',
};

export function DefectStatusBadge({ status }: { status: DefectStatus }) {
  return (
    <StatusBadge
      label={status}
      variant={STATUS_VARIANT[status]}
      size="sm"
      preserveCase
    />
  );
}
