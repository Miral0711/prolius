import {
  BarChart3,
  History,
  Layers,
  PlayCircle,
  RotateCcw,
  Search,
  Video,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ActionButton,
  ChannelChipGroup,
  FilterInput,
  PageSectionCard,
  RecordingListItem,
  SectionTitle,
  StatBadge,
  StatMiniCard,
  TimeInput,
} from './shared/DVRSharedComponents';

/* ─── 1. ARCHIVE CONTROLS (Merged Section) ────────────────────── */
interface ArchiveControlsProps {
  channels: string[];
  selectedChannel: string;
  onChannelChange: (val: string) => void;
}

const ArchiveControls = ({
  channels,
  selectedChannel,
  onChannelChange,
}: ArchiveControlsProps) => (
  <PageSectionCard className="shrink-0 overflow-visible">
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-[15px] font-semibold leading-none tracking-tight text-slate-800">
            Archive Controls
          </h2>
          <div className="grid w-full min-w-0 grid-cols-3 gap-2">
            <StatBadge label="Clips" value="1,240" className="w-full min-w-0" />
            <StatBadge
              label="Events"
              value="32"
              color="amber"
              className="w-full min-w-0"
            />
            <StatBadge
              label="Uptime"
              value="99.9%"
              color="emerald"
              className="w-full min-w-0"
            />
          </div>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
          <History className="h-4 w-4" />
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-100 pt-2.5">
        <div className="grid grid-cols-1 gap-2.5">
          <div className="grid min-w-0 grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] items-end gap-2.5">
            <FilterInput
              label="Date"
              type="date"
              defaultValue="2026-03-12"
              className="min-w-0"
            />
            <TimeInput label="From" defaultValue="07:00" />
            <TimeInput label="To" defaultValue="17:00" />
          </div>

          <ChannelChipGroup
            label="Select Channel"
            icon={Layers}
            channels={channels}
            selected={selectedChannel}
            onChange={onChannelChange}
          />
        </div>

        <div className="flex gap-2 pt-1">
          <ActionButton
            label="Reset"
            icon={RotateCcw}
            variant="outline"
            className="flex-1"
          />
          <ActionButton
            label="Locate"
            icon={Search}
            variant="secondary"
            className="flex-[1.5] tracking-normal"
          />
        </div>
      </div>
    </div>
  </PageSectionCard>
);

/* ─── 2. RECENT RECORDINGS LIST ────────────────────────────────── */
const DvrRecentList = () => (
  <PageSectionCard className="flex min-h-0 flex-1 flex-col overflow-hidden">
    <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden">
      <SectionTitle
        icon={PlayCircle}
        title="Recent Clips"
        subtitle="Available recordings"
        className="shrink-0 mb-0 items-center gap-2 py-0.5"
      />
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain pr-1 scrollbar-thin scrollbar-thumb-slate-200">
        {[
          { id: 'REC-2941', time: '14:20 - 14:45', cam: 'CAM 1', active: true },
          { id: 'REC-2942', time: '13:10 - 13:30', cam: 'CAM 2', active: false },
          { id: 'REC-2943', time: '12:05 - 12:40', cam: 'CAM 1', active: false },
          { id: 'REC-2944', time: '11:15 - 11:50', cam: 'CAM 3', active: false },
          { id: 'REC-2945', time: '10:00 - 10:30', cam: 'CAM 4', active: false },
          { id: 'REC-2946', time: '09:15 - 09:45', cam: 'CAM 2', active: false },
        ].map((item, i) => (
          <RecordingListItem
            key={i}
            id={item.id}
            time={item.time}
            cam={item.cam}
            icon={Video}
            active={item.active}
          />
        ))}
      </div>
    </div>
  </PageSectionCard>
);

/* ─── 3. ANALYTICS QUICK VIEW ─────────────────────────────────── */
const DvrAnalyticsSection = () => (
  <PageSectionCard className="shrink-0 overflow-visible">
    <div className="flex flex-col gap-1.5">
      <SectionTitle
        icon={BarChart3}
        title="Analytics"
        subtitle="Clip metrics"
        className="mb-0 items-center gap-2 py-0.5"
      />
      <div className="grid grid-cols-2 gap-2">
        <StatMiniCard label="Daily Clips" value="248" />
        <StatMiniCard label="Incidents" value="12" />
        <StatMiniCard label="Avg Speed" value="64" unit="km/h" />
        <StatMiniCard label="Reliability" value="99.9" unit="%" />
      </div>
    </div>
  </PageSectionCard>
);

/* ─── MAIN SIDEBAR ASSEMBLY ──────────────────────────────────── */
interface DvrSidebarProps {
  channels: string[];
  selectedChannel: string;
  onChannelChange: (val: string) => void;
  className?: string;
}

export function DvrSidebar({
  channels,
  selectedChannel,
  onChannelChange,
  className,
}: DvrSidebarProps) {
  return (
    <div
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden',
        className,
      )}
    >
      <ArchiveControls
        channels={channels}
        selectedChannel={selectedChannel}
        onChannelChange={onChannelChange}
      />
      <DvrRecentList />
      <DvrAnalyticsSection />
    </div>
  );
}
