import { TrendingUp, TrendingDown, AlertTriangle, AlertOctagon, Info } from 'lucide-react';
import { type Insight, type InsightType, getReportInsights } from '@/lib/reportInsights';

// ---------------------------------------------------------------------------
// Insight pill config
// ---------------------------------------------------------------------------

const INSIGHT_CONFIG: Record<InsightType, {
  icon: React.ElementType;
  bg: string;
  text: string;
  iconColor: string;
}> = {
  up:       { icon: TrendingUp,     bg: 'bg-amber-50',  text: 'text-amber-800',  iconColor: 'text-amber-500' },
  down:     { icon: TrendingDown,   bg: 'bg-sky-50',    text: 'text-sky-800',    iconColor: 'text-sky-500'   },
  warning:  { icon: AlertTriangle,  bg: 'bg-orange-50', text: 'text-orange-800', iconColor: 'text-orange-500'},
  critical: { icon: AlertOctagon,   bg: 'bg-red-50',    text: 'text-red-800',    iconColor: 'text-red-500'   },
  info:     { icon: Info,           bg: 'bg-slate-50',  text: 'text-slate-700',  iconColor: 'text-slate-400' },
};

// ---------------------------------------------------------------------------
// Single insight pill
// ---------------------------------------------------------------------------

function InsightPill({ insight }: { insight: Insight }) {
  const cfg = INSIGHT_CONFIG[insight.type];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 ${cfg.bg}`}>
      <Icon className={`h-3 w-3 shrink-0 ${cfg.iconColor}`} />
      <span className={`text-[11px] leading-tight ${cfg.text}`}>{insight.text}</span>
    </span>
  );
}

// ---------------------------------------------------------------------------
// Panel — rendered below the description cell when a row is expanded
// ---------------------------------------------------------------------------

interface ReportInsightsPanelProps {
  reportName: string;
  lastGenerated: string;
}

export function ReportInsightsPanel({ reportName, lastGenerated }: ReportInsightsPanelProps) {
  const result = getReportInsights(reportName, lastGenerated);

  if (result.status === 'unavailable') {
    return (
      <div className="mt-1.5 flex items-center gap-1.5 rounded border border-dashed border-slate-200 px-2.5 py-1.5">
        <Info className="h-3 w-3 shrink-0 text-slate-300" />
        <span className="text-[11px] italic text-slate-400">No insights available — run the report to generate data.</span>
      </div>
    );
  }

  return (
    <div className="mt-1.5 flex flex-wrap gap-1.5">
      {result.insights.map((insight, i) => (
        <InsightPill key={i} insight={insight} />
      ))}
    </div>
  );
}
