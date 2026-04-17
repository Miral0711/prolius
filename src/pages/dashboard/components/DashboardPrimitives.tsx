import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TOKENS, SEMANTIC_COLORS, type SemanticColor } from './dashboardTokens';

// ── Card ──────────────────────────────────────────────────────────────────────
export interface DashCardProps {
  children: ReactNode;
  className?: string;
  variant?: SemanticColor;
  important?: boolean;
}

export function DashCard({ children, className, variant, important }: DashCardProps) {
  const styles = variant ? SEMANTIC_COLORS[variant] : null;
  return (
    <div className={cn(
      TOKENS.cardBg, TOKENS.cardRadius,
      important ? TOKENS.strongShadow : TOKENS.cardShadow,
      TOKENS.cardBorder, styles?.border,
      'transition-all duration-200',
      className,
    )}>
      {children}
    </div>
  );
}

// ── SectionWrapper ────────────────────────────────────────────────────────────
// gap-3 = 12px — uniform internal spacing between sub-rows within a section
export function SectionWrapper({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(TOKENS.sectionBg, 'rounded-[6px] p-0 flex flex-col gap-3', className)}>
      {children}
    </div>
  );
}

// ── SectionTitle ──────────────────────────────────────────────────────────────
export function SectionTitle({
  title,
  variant = 'blue',
  className,
}: {
  title: string;
  variant?: SemanticColor;
  className?: string;
}) {
  const color = SEMANTIC_COLORS[variant].main;
  return (
    <div className={cn('mb-1.5 flex items-center gap-1.5', className)}>
      <div className="h-3 w-[2px] rounded-full" style={{ backgroundColor: color }} aria-hidden />
      <h3 className="typo-section-title">{title}</h3>
    </div>
  );
}

// ── RoleKpiTile ───────────────────────────────────────────────────────────────
export function RoleKpiTile({
  label,
  value,
  color,
  bg,
}: {
  label: string;
  value: string;
  color: string;
  bg: string;
}) {
  return (
    <div className={cn(
      'rounded-[6px] px-3 py-2.5 flex flex-col gap-0.5 border border-[#e2eaf2]',
      'shadow-[0_1px_4px_rgba(61,107,142,0.06)] transition-all duration-200',
      'hover:translate-y-[-1px] hover:shadow-[0_4px_12px_rgba(61,107,142,0.10)]',
      bg,
    )}>
      <p className="text-[9px] font-bold text-[#6b8299] uppercase tracking-[0.6px]">{label}</p>
      <p className="text-[18px] font-black leading-tight tabular-nums" style={{ color }}>{value}</p>
    </div>
  );
}

// ── RoleProgressBar ───────────────────────────────────────────────────────────
export function RoleProgressBar({
  label,
  pct,
  color,
}: {
  label: string;
  pct: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] font-semibold text-[#4f6478] uppercase tracking-[0.5px]">{label}</span>
        <span className="text-[10px] font-black text-[#1e3448] tabular-nums">{pct}%</span>
      </div>
      <div className="h-2 w-full bg-[#dce8f0] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// ── Sparkline ─────────────────────────────────────────────────────────────────
export function Sparkline({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 48;
  const h = 20;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  });
  const last = pts[pts.length - 1].split(',');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="2" fill={color} />
    </svg>
  );
}
