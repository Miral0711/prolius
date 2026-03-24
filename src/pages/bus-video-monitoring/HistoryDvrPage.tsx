import { useState } from 'react';
import {
  DVRPlayerCard,
  DvrRightPanel,
  DvrSidebar,
  DvrTimelineAnalytics,
  PlaybackControls,
} from './components/dvr';
import { DVRPageLayout } from './components/dvr/shared/DVRPageLayout';
import { PageSectionCard } from './components/dvr/shared/DVRSharedComponents';

/* ─── DATA ───────────────────────────────────────────────────────── */

const CHANNELS = [
  'All Channels',
  'CAM 1 – Front',
  'CAM 2 – Rear',
  'CAM 3 – Cabin',
  'CAM 4 – Door',
];

const TIMELINE_MARKERS = [
  { pct: 8, color: 'bg-rose-500', label: 'HARD BRAKE' },
  { pct: 22, color: 'bg-amber-400', label: 'SPEEDING' },
  { pct: 38, color: 'bg-blue-400', label: 'CLIP START' },
  { pct: 51, color: 'bg-emerald-400', label: 'GEO-FENCE' },
  { pct: 63, color: 'bg-rose-500', label: 'HARD ACCEL' },
  { pct: 79, color: 'bg-amber-400', label: 'SHARP TURN' },
];

/* ═══════════════════════════════════════════════════════════════════ */

export default function HistoryDvrPage() {
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [speed, setSpeed] = useState('1x');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  return (
    <DVRPageLayout
      title="History DVR"
      padding="sm"
      sectionGap="sm"
      gridClassName="gap-2"
      leftColumnClassName="w-[300px]"
      rightColumnClassName="w-[300px]"
      leftPanel={
        <DvrSidebar
          channels={CHANNELS}
          selectedChannel={channel}
          onChannelChange={setChannel}
          className="min-h-0 flex-1"
        />
      }
      centerPanel={
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2">
          <DVRPlayerCard
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            channelName={channel === 'All Channels' ? 'CAM 1 - FRONT' : channel}
            vehicleTag="KSA-1029"
            currentTime="11:23:47"
            currentDate="Mar 12, 2026"
          />

          <PageSectionCard className="flex min-h-0 flex-1 flex-col gap-3 p-2">
            <PlaybackControls
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying(!isPlaying)}
              progress={progress}
              onProgressChange={setProgress}
              selectedSpeed={speed}
              onSpeedChange={setSpeed}
              currentTime="04:23:47"
              totalTime="10:00:00"
              eventMarkers={TIMELINE_MARKERS}
            />

            <DvrTimelineAnalytics />
          </PageSectionCard>
        </div>
      }
      rightPanel={<DvrRightPanel className="min-h-0 flex-1" />}
    />
  );
}
