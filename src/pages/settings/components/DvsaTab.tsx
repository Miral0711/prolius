import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

const DVSA_DATA = [
  { label: 'Joining period:', value: 'Period 1' },
  { label: 'Joining year:', value: '2024' },
  { label: 'Commencement date:', value: '01 Jan 2024' },
  { label: 'Operator ID:', value: 'ACR-000360' },
];

export function DvsaTab() {
  return (
    <div className="flex flex-col gap-5">
      <p className={cn(typography.body, 'text-slate-500 max-w-2xl')}>
        The date below confirms the start date when the DVSA earned recognition scheme commenced.
        This date will be used to automatically create your reporting periods.
      </p>

      <div className="flex flex-col gap-0">
        {DVSA_DATA.map(({ label, value }, i) => (
          <div
            key={label}
            className={cn(
              'grid grid-cols-[200px_1fr] items-center gap-x-6 px-0 py-3',
              i !== DVSA_DATA.length - 1 && 'border-b border-[#eef4f8]',
            )}
          >
            <span className={cn(typography.label, 'text-slate-600 text-right')}>{label}</span>
            <span className={cn(typography.body, 'text-slate-800')}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
