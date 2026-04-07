import { StatusBadge, type StatusVariant } from '@/components/dashboard/StatusBadge';
import type { IncidentStatus } from '../mock-data';

const STATUS_VARIANT: Record<IncidentStatus, StatusVariant> = {
  Reported:       'rose',
  'Under Review': 'amber',
  Pending:        'violet',
  Resolved:       'emerald',
  Closed:         'blue',
  Archived:       'slate',
};

export function IncidentStatusBadge({ status }: { status: IncidentStatus }) {
  return (
    <StatusBadge
      label={status}
      variant={STATUS_VARIANT[status]}
      size="sm"
      preserveCase
    />
  );
}
