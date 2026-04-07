import { useState } from 'react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

const CURRENT_TAX_YEAR = '2025-2026';

export function P11dReportTab() {
  const [finalised, setFinalised] = useState(false);

  return (
    <div className="flex flex-col gap-4 py-1">
      <label className="flex cursor-pointer items-center gap-2.5">
        <input
          type="checkbox"
          checked={finalised}
          onChange={(e) => setFinalised(e.target.checked)}
          className="h-4 w-4 rounded border-[#c8d8e4] accent-[#3d6b8e] cursor-pointer"
        />
        <span className={cn(typography.body, 'text-slate-700')}>
          Finalise the P11D Benefits in Kind Report ({CURRENT_TAX_YEAR})
        </span>
      </label>
    </div>
  );
}
