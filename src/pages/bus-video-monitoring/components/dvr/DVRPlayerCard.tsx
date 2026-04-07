import React, { useState } from 'react';
import {
  Download,
  Maximize,
  Pause,
  Play,
  Settings2,
  Video,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { dvrTypography } from './shared/DVRSharedComponents';

interface DVRPlayerCardProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  channelName: string;
  vehicleTag: string;
  currentTime: string;
  currentDate: string;
  className?: string;
}

export const DVRPlayerCard: React.FC<DVRPlayerCardProps> = ({
  isPlaying,
  onTogglePlay,
  channelName,
  vehicleTag,
  currentTime,
  currentDate,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'rounded-2xl bg-[#0F172A] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col transition-all relative h-[420px] border border-white/5',
        className,
      )}
    >
      {/* ── VIDEO VIEWPORT ────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[#020617] flex items-center justify-center overflow-hidden">
        {/* Placeholder background icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
          <Video className="h-64 w-64 text-white" strokeWidth={0.5} />
        </div>

        {/* TOP OVERLAY BAR - HOVER BASED */}
        <div
          className={cn(
            'absolute top-0 left-0 right-0 h-20 px-6 flex items-start pt-6 justify-between z-20 bg-gradient-to-b from-black/80 via-black/40 to-transparent transition-all duration-500 ease-in-out',
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4',
          )}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-rose-600/20 border border-rose-500/30 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
              <span
                className={cn(
                  dvrTypography.control,
                  'text-rose-500',
                )}
              >
                Archive
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2.5">
                <span className={cn(dvrTypography.videoTitle, 'leading-none')}>
                  {channelName}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span
                  className={cn(
                    dvrTypography.videoTag,
                    'leading-none bg-white/5 px-2 py-0.5 rounded border border-white/5',
                  )}
                >
                  {vehicleTag}
                </span>
              </div>
              <p
                className={cn(
                  dvrTypography.videoMeta,
                  'mt-1.5 leading-none',
                )}
              >
                {currentDate}
                <span className={dvrTypography.videoMeta}> · </span>
                <span className={dvrTypography.videoMetaStrong}>
                  {currentTime}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="h-9 w-9 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white border border-white/10 transition-all flex items-center justify-center backdrop-blur-md">
              <Settings2 className="h-4 w-4" />
            </button>
            <button className="h-9 w-9 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white border border-white/10 transition-all flex items-center justify-center backdrop-blur-md">
              <Download className="h-4 w-4" />
            </button>
            <button className="h-9 w-9 rounded-xl bg-[#2e5f8a] text-white shadow-lg shadow-blue-900/40 transition-all flex items-center justify-center border border-blue-400/20 active:scale-95">
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* CENTER PLAY BUTTON */}
        {!isPlaying && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
            <button
              onClick={onTogglePlay}
              className="h-20 w-20 flex items-center justify-center rounded-full bg-[#2e5f8a] text-white shadow-[0_0_50px_rgba(37,99,235,0.4)] transition-all hover:scale-110 active:scale-95 group/play border border-white/10"
            >
              <Play className="h-8 w-8 ml-1 fill-current" />
            </button>
          </div>
        )}

        {/* BOTTOM HOVER CONTROLS */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 h-24 px-6 flex items-end pb-6 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500 ease-in-out',
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          )}
        >
          <div className="flex items-center gap-4 w-full">
            <button
              onClick={onTogglePlay}
              className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md transition-all active:scale-90"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-current" />
              ) : (
                <Play className="h-4 w-4 fill-current ml-0.5" />
              )}
            </button>

            <div className="flex-1 h-1.5 bg-white/10 rounded-full relative overflow-hidden group/progress cursor-pointer">
              <div
                className="absolute inset-y-0 left-0 bg-[#2e5f8a] shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                style={{ width: '45%' }}
              />
            </div>

            <div
              className={cn(
                dvrTypography.videoTimecode,
                'bg-black/40 px-3 py-1 rounded-lg border border-white/5 backdrop-blur-md',
              )}
            >
              04:23:47 /{' '}
              <span className={dvrTypography.videoMeta}>10:00:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


