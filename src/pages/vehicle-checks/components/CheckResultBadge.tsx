import { StatusBadge, type StatusVariant } from '@/components/dashboard/StatusBadge';
import type { CheckResult } from '../mock-data';

const RESULT_VARIANT: Record<CheckResult, StatusVariant> = {
  Roadworthy: 'emerald',
  'Safe to Operate': 'amber',
  'Defect Found': 'rose',
  Failed: 'rose',
  Critical: 'alert',
};

interface CheckResultBadgeProps {
  result: CheckResult;
}

export function CheckResultBadge({ result }: CheckResultBadgeProps) {
  return (
    <StatusBadge
      label={result}
      variant={RESULT_VARIANT[result]}
      size="sm"
      preserveCase
    />
  );
}
