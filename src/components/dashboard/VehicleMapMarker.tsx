import { Bus } from 'lucide-react';
import { cn } from '@/lib/utils';

export type VehicleStatus = 'Available' | 'On Trip' | 'Maintenance' | 'Alert';

interface VehicleMapMarkerProps {
  status: VehicleStatus;
  id: string;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const STATUS_COLORS: Record<
  VehicleStatus,
  { main: string; ring: string; text: string; bg: string; pulse: boolean }
> = {
  Available: {
    main: '#10b981',
    ring: 'rgba(16,185,129,0.25)',
    text: 'text-emerald-700',
    bg: 'bg-emerald-100',
    pulse: false,
  },
  'On Trip': {
    main: '#3b82f6',
    ring: 'rgba(59,130,246,0.25)',
    text: 'text-blue-700',
    bg: 'bg-blue-100',
    pulse: true,
  },
  Maintenance: {
    main: '#f59e0b',
    ring: 'rgba(245,158,11,0.25)',
    text: 'text-amber-700',
    bg: 'bg-amber-100',
    pulse: false,
  },
  Alert: {
    main: '#ef4444',
    ring: 'rgba(239,68,68,0.30)',
    text: 'text-rose-700',
    bg: 'bg-rose-100',
    pulse: true,
  },
};

export function VehicleMapMarker({
  status,
  id,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
  style,
}: VehicleMapMarkerProps) {
  const meta = STATUS_COLORS[status];

  return (
    <div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={style}
    >
      {/* Pulse ring for moving/alert vehicles */}
      {meta.pulse && (
        <span
          className="absolute inset-[-8px] rounded-full animate-ping opacity-30"
          style={{ background: meta.main }}
        />
      )}

      {/* Halo ring */}
      <span
        className={cn(
          'absolute inset-[-4px] rounded-full transition-all duration-300',
          isHovered ? 'scale-125 opacity-40' : 'scale-100 opacity-20',
        )}
        style={{ background: meta.ring }}
      />

      {/* Bus Marker */}
      <div
        className={cn(
          'relative flex items-center justify-center h-7 w-7 rounded-lg border-2 border-white shadow-lg transition-all duration-200',
          isHovered
            ? 'scale-125 -translate-y-1 z-20'
            : 'scale-100 translate-y-0',
        )}
        style={{
          background: meta.main,
          boxShadow: isHovered
            ? `0 4px 12px rgba(0,0,0,0.25), 0 0 0 2px ${meta.ring}`
            : '0 2px 6px rgba(0,0,0,0.15)',
        }}
      >
        <Bus className="h-4 w-4 text-white" />

        {/* Status indicator dot */}
        <span
          className="absolute -right-1 -top-1 block h-2.5 w-2.5 rounded-full border border-white shadow-sm"
          style={{ background: meta.main }}
        />
      </div>

      {/* ID Label (always show for hovered, show for alerts) */}
      {(isHovered || status === 'Alert') && (
        <span
          className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/50 px-2 py-0.5 text-xs font-semibold shadow-md backdrop-blur-md transition-all animate-in fade-in zoom-in duration-200"
          style={{ background: meta.main, color: '#fff' }}
        >
          {id}
        </span>
      )}
    </div>
  );
}


