import type { FuelType } from '../mock-data';

interface ProfileRiskTagsProps {
  vehicleCount: number;
  fuelType: FuelType;
}

const TAG_STYLES = {
  highUtil:  'bg-amber-50   text-amber-700  border-amber-200',
  emission:  'bg-red-50     text-red-600    border-red-200',
  eco:       'bg-emerald-50 text-emerald-700 border-emerald-200',
  underutil: 'bg-slate-100  text-slate-500  border-slate-300',
  unused:    'bg-zinc-100   text-zinc-500   border-zinc-300',
} as const;

export function ProfileRiskTags({ vehicleCount, fuelType }: ProfileRiskTagsProps) {
  const tags: { label: string; style: string }[] = [];

  if (vehicleCount === 0)       tags.push({ label: 'Unused Profile',   style: TAG_STYLES.unused });
  else if (vehicleCount < 10)   tags.push({ label: 'Underutilized',    style: TAG_STYLES.underutil });
  else if (vehicleCount > 50)   tags.push({ label: 'High Utilization', style: TAG_STYLES.highUtil });
  if (fuelType === 'Diesel')    tags.push({ label: 'Emission Risk',    style: TAG_STYLES.emission });
  if (fuelType === 'Electric')  tags.push({ label: 'Eco Friendly',     style: TAG_STYLES.eco });

  if (tags.length === 0) return null;

  return (
    <div className="mt-0.5 flex flex-wrap gap-1">
      {tags.map((t) => (
        <span
          key={t.label}
          className={`inline-flex items-center rounded border px-1 py-px text-[10px] font-semibold leading-tight ${t.style}`}
        >
          {t.label}
        </span>
      ))}
    </div>
  );
}
