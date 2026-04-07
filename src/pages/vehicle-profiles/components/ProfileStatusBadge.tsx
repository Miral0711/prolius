import { StatusBadge, type StatusVariant } from '@/components/dashboard/StatusBadge';
import type { ProfileStatus } from '../mock-data';

const VARIANT: Record<ProfileStatus, StatusVariant> = {
  Active:   'emerald',
  Inactive: 'amber',
  Archived: 'slate',
};

export function ProfileStatusBadge({ status }: { status: ProfileStatus }) {
  return (
    <StatusBadge label={status} variant={VARIANT[status]} size="sm" preserveCase />
  );
}
