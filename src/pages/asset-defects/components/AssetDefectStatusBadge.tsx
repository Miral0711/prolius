import { StatusBadge, type StatusVariant } from '@/components/dashboard/StatusBadge';
import type { AssetDefectStatus } from '../mock-data';

const VARIANT: Record<AssetDefectStatus, StatusVariant> = {
  Reported:          'rose',
  Acknowledged:      'amber',
  Duplicate:         'violet',
  Resolved:          'emerald',
  'Repair Rejected': 'alert',
};

export function AssetDefectStatusBadge({ status }: { status: AssetDefectStatus }) {
  return (
    <StatusBadge label={status} variant={VARIANT[status]} size="sm" preserveCase />
  );
}
