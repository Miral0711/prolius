import { Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DataCard } from '@/components/ui/data-card';
import {
  CARD_SHADOW_TILE,
  TILE_MIN_HEIGHT,
  TILE_PADDING,
} from '@/components/ui/stat-tile';
import { StatusBadge } from '@/components/ui/status-badge';

const cams = [
  { label: 'CAM 1', value: 319, status: 'online' as const },
  { label: 'CAM 2', value: 2, status: 'offline' as const },
  { label: 'CAM 3', value: 1, status: 'offline' as const },
  { label: 'CAM 4', value: 1, status: 'offline' as const },
];

/** DVR item: same elevation as other cards, subtle border for contrast. */
const DVR_ITEM_CLASS =
  'rounded-lg border border-slate-200/70 bg-white/55 ' +
  TILE_PADDING +
  ' ' +
  TILE_MIN_HEIGHT +
  ' ' +
  CARD_SHADOW_TILE;

export function DvrCameraStatus({ sectionLead }: { sectionLead?: boolean }) {
  return (
    <DataCard
      title="DVR Camera Status"
      right={<Video className="h-3.5 w-3.5 shrink-0 text-slate-400" />}
      sectionLead={sectionLead}
    >
      <div className="rounded-lg bg-slate-50/40 p-2">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 items-stretch">
          {cams.map((c, i) => (
            <div
              key={i}
              className={cn(
                DVR_ITEM_CLASS,
                'flex items-center justify-between gap-2',
              )}
            >
              <div className="min-w-0 flex-1">
                <span className="block truncate text-xs uppercase tracking-[0.02rem] text-slate-600 leading-tight">
                  {c.label}
                </span>
                <StatusBadge
                  status={c.status}
                  className="mt-0.5 px-1.5 py-0.5 text-xs font-medium leading-tight"
                />
              </div>
              <span className="shrink-0 text-base font-semibold text-slate-700 leading-tight">
                {c.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DataCard>
  );
}


