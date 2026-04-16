import { useState, useCallback } from 'react';
import {
  Download, Sparkles, Star, TrendingUp, TrendingDown,
  AlertTriangle, AlertOctagon, Info, Loader2, ChevronDown, ChevronUp, X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { EXECUTIVE_REPORTS, type ExecutiveReport, type ExecInsight } from '@/pages/reports/executive-reports';
import type { InsightType } from '@/lib/reportInsights';

// ---------------------------------------------------------------------------
// Persistence helpers
// ---------------------------------------------------------------------------

const LS_COLLAPSED = 'exec-reports:collapsed';
const LS_HIDDEN    = 'exec-reports:hidden';

function readCollapsed(): boolean {
  try { return localStorage.getItem(LS_COLLAPSED) === 'true'; } catch { return false; }
}
function writeCollapsed(v: boolean) {
  try { localStorage.setItem(LS_COLLAPSED, String(v)); } catch { /* noop */ }
}
function readHidden(): Set<string> {
  try {
    const raw = localStorage.getItem(LS_HIDDEN);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch { return new Set(); }
}
function writeHidden(s: Set<string>) {
  try { localStorage.setItem(LS_HIDDEN, JSON.stringify([...s])); } catch { /* noop */ }
}

// ---------------------------------------------------------------------------
// Insight pill
// ---------------------------------------------------------------------------

const INSIGHT_ICON: Record<InsightType, React.ElementType> = {
  up: TrendingUp, down: TrendingDown, warning: AlertTriangle, critical: AlertOctagon, info: Info,
};
const INSIGHT_STYLE: Record<InsightType, { bg: string; text: string; icon: string }> = {
  up:       { bg: 'bg-amber-50',  text: 'text-amber-800',  icon: 'text-amber-500'  },
  down:     { bg: 'bg-sky-50',    text: 'text-sky-800',    icon: 'text-sky-500'    },
  warning:  { bg: 'bg-orange-50', text: 'text-orange-800', icon: 'text-orange-500' },
  critical: { bg: 'bg-red-50',    text: 'text-red-800',    icon: 'text-red-500'    },
  info:     { bg: 'bg-slate-50',  text: 'text-slate-700',  icon: 'text-slate-400'  },
};

function InsightPill({ insight }: { insight: ExecInsight }) {
  const Icon = INSIGHT_ICON[insight.type];
  const s = INSIGHT_STYLE[insight.type];
  return (
    <span className={cn('inline-flex items-center gap-1 rounded px-1.5 py-0.5', s.bg)}>
      <Icon className={cn('h-2.5 w-2.5 shrink-0', s.icon)} />
      <span className={cn('text-[10px] leading-tight', s.text)}>{insight.text}</span>
    </span>
  );
}

// ---------------------------------------------------------------------------
// Card state + helpers
// ---------------------------------------------------------------------------

interface CardState {
  lastGenerated: string | null;
  loading: boolean;
  insightsVisible: boolean;
}

function formatNow(): string {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const mon = now.toLocaleString('en-GB', { month: 'short' });
  return `${hh}:${mm}:${ss} ${dd} ${mon} ${now.getFullYear()}`;
}

// ---------------------------------------------------------------------------
// Single card
// ---------------------------------------------------------------------------

interface ExecReportCardProps {
  report: ExecutiveReport;
  state: CardState;
  onGenerate: (id: string) => void;
  onToggleInsights: (id: string) => void;
  onDismiss: (id: string) => void;
}

function ExecReportCard({ report, state, onGenerate, onToggleInsights, onDismiss }: ExecReportCardProps) {
  const Icon = report.icon;
  const { loading, lastGenerated, insightsVisible } = state;

  return (
    <div className={cn(
      'group/card relative flex flex-col rounded-md border bg-white',
      report.recommended ? 'border-[#3d6b8e]/25' : 'border-[#d4e0ea]',
    )}>
      {/* Per-card dismiss — subtle, appears on hover */}
      <button
        type="button"
        title="Hide this report"
        onClick={() => onDismiss(report.id)}
        className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded opacity-0 transition-opacity hover:bg-slate-100 group-hover/card:opacity-40 hover:!opacity-100"
      >
        <X className="h-2.5 w-2.5 text-slate-500" />
      </button>

      {/* Body */}
      <div className="flex flex-col gap-1.5 p-2.5 pr-5">
        {/* Icon + title */}
        <div className="flex items-center gap-2">
          <span className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded', report.iconBg)}>
            <Icon className={cn('h-3.5 w-3.5', report.iconColor)} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold leading-tight text-slate-800">{report.title}</p>
            <p className="truncate text-[10px] leading-tight text-slate-400">{report.subtitle}</p>
          </div>
          {report.recommended && (
            <Star className="h-3 w-3 shrink-0 fill-[#3d6b8e] text-[#3d6b8e]" />
          )}
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-1.5">
          <span className="rounded-sm bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
            Last {report.defaultDays}d
          </span>
          {lastGenerated && (
            <span className="flex items-center gap-0.5 text-[10px] text-[#3d6b8e]">
              <Sparkles className="h-2.5 w-2.5" />
              Insights ready
            </span>
          )}
        </div>

        {/* Insights — top 2, toggled */}
        {insightsVisible && lastGenerated && (
          <div className="flex flex-col gap-1 border-t border-slate-100 pt-1.5">
            {report.insights.slice(0, 2).map((ins, i) => (
              <InsightPill key={i} insight={ins} />
            ))}
          </div>
        )}

        {/* Timestamp */}
        {lastGenerated && (
          <p className="text-[9.5px] tabular-nums text-slate-400">{lastGenerated}</p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center gap-1 border-t border-[#d4e0ea] px-2.5 py-1.5">
        <button
          type="button"
          disabled={loading}
          onClick={() => onGenerate(report.id)}
          className={cn(
            'flex h-6 flex-1 items-center justify-center gap-1 rounded text-[11px] font-medium transition-colors',
            loading
              ? 'cursor-not-allowed bg-[#3d6b8e]/50 text-white'
              : 'bg-[#3d6b8e] text-white hover:bg-[#2e5f8a]',
          )}
        >
          {loading
            ? <><Loader2 className="h-2.5 w-2.5 animate-spin" /> Generating…</>
            : lastGenerated ? 'Regenerate' : 'Generate'
          }
        </button>

        {lastGenerated && (
          <>
            <button
              type="button"
              title={insightsVisible ? 'Hide insights' : 'Show insights'}
              onClick={() => onToggleInsights(report.id)}
              className={cn(
                'flex h-6 w-6 items-center justify-center rounded border transition-colors',
                insightsVisible
                  ? 'border-[#3d6b8e]/30 bg-[#e8f0f8] text-[#3d6b8e]'
                  : 'border-slate-200 bg-white text-slate-400 hover:bg-[#e8f0f8] hover:text-[#3d6b8e]',
              )}
            >
              <Sparkles className="h-3 w-3" />
            </button>
            <button
              type="button"
              title="Download"
              className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-white text-slate-400 transition-colors hover:bg-slate-50"
            >
              <Download className="h-3 w-3" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export function ExecutiveReportsSection() {
  const [collapsed, setCollapsed] = useState<boolean>(readCollapsed);
  const [hidden, setHidden] = useState<Set<string>>(readHidden);

  const [cardStates, setCardStates] = useState<Record<string, CardState>>(() =>
    Object.fromEntries(
      EXECUTIVE_REPORTS.map(r => [r.id, { lastGenerated: null, loading: false, insightsVisible: false }]),
    ),
  );

  const toggleCollapsed = useCallback(() => {
    setCollapsed(prev => {
      const next = !prev;
      writeCollapsed(next);
      return next;
    });
  }, []);

  const handleDismiss = useCallback((id: string) => {
    setHidden(prev => {
      const next = new Set(prev).add(id);
      writeHidden(next);
      return next;
    });
  }, []);

  const handleRestoreAll = useCallback(() => {
    const empty = new Set<string>();
    writeHidden(empty);
    setHidden(empty);
  }, []);

  const handleGenerate = useCallback((id: string) => {
    setCardStates(prev => ({ ...prev, [id]: { ...prev[id], loading: true } }));
    setTimeout(() => {
      setCardStates(prev => ({
        ...prev,
        [id]: { loading: false, lastGenerated: formatNow(), insightsVisible: true },
      }));
    }, 1400);
  }, []);

  const handleToggleInsights = useCallback((id: string) => {
    setCardStates(prev => ({
      ...prev,
      [id]: { ...prev[id], insightsVisible: !prev[id].insightsVisible },
    }));
  }, []);

  const visibleReports = EXECUTIVE_REPORTS.filter(r => !hidden.has(r.id));
  const insightsReadyCount = EXECUTIVE_REPORTS.filter(
    r => cardStates[r.id]?.lastGenerated,
  ).length;

  return (
    <div className="shrink-0 overflow-hidden rounded-md border border-[#d4e0ea] bg-white">
      {/* Header — always visible */}
      <div
        className="flex cursor-pointer items-center justify-between px-3 py-2 select-none"
        onClick={toggleCollapsed}
        role="button"
        aria-expanded={!collapsed}
      >
        {/* Left: title + meta */}
        <div className="flex items-center gap-1.5">
          <Star className="h-3 w-3 fill-[#3d6b8e] text-[#3d6b8e]" />
          <span className="text-xs font-semibold text-slate-700">Executive Reports</span>
          <span className="rounded-sm bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
            {visibleReports.length} of {EXECUTIVE_REPORTS.length} shown
          </span>
          {insightsReadyCount > 0 && (
            <span className="hidden items-center gap-0.5 text-[10px] text-[#3d6b8e] sm:flex">
              <Sparkles className="h-2.5 w-2.5" />
              {insightsReadyCount} AI {insightsReadyCount === 1 ? 'insight' : 'insights'} ready
            </span>
          )}
        </div>

        {/* Right: restore + collapse toggle */}
        <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
          {hidden.size > 0 && (
            <button
              type="button"
              onClick={handleRestoreAll}
              className="text-[10px] text-slate-400 underline-offset-2 hover:text-[#3d6b8e] hover:underline"
            >
              Restore all
            </button>
          )}
          <button
            type="button"
            onClick={toggleCollapsed}
            title={collapsed ? 'Expand' : 'Collapse'}
            className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            {collapsed
              ? <><ChevronDown className="h-3 w-3" /> Expand</>
              : <><ChevronUp className="h-3 w-3" /> Collapse</>
            }
          </button>
        </div>
      </div>

      {/* Collapsible grid — CSS grid-rows trick for smooth transition */}
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-in-out',
          collapsed ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]',
        )}
      >
        <div className="overflow-hidden">
          {/* Separator only visible when expanded */}
          <div className="border-t border-[#d4e0ea]" />

          {visibleReports.length === 0 ? (
            <div className="flex items-center justify-center gap-2 py-4 text-[11px] text-slate-400">
              All reports hidden.
              <button
                type="button"
                onClick={handleRestoreAll}
                className="text-[#3d6b8e] underline-offset-2 hover:underline"
              >
                Restore all
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3 xl:grid-cols-6">
              {visibleReports.map(report => (
                <ExecReportCard
                  key={report.id}
                  report={report}
                  state={cardStates[report.id]}
                  onGenerate={handleGenerate}
                  onToggleInsights={handleToggleInsights}
                  onDismiss={handleDismiss}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
