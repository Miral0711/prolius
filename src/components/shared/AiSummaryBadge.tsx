import { Sparkles } from 'lucide-react';
import { getReportSummary } from '@/lib/reportSummary';

interface AiSummaryBadgeProps {
  reportName: string;
  lastGenerated: string;
}

export function AiSummaryBadge({ reportName, lastGenerated }: AiSummaryBadgeProps) {
  const result = getReportSummary(reportName, lastGenerated);

  return (
    <span className="mt-0.5 flex items-start gap-1">
      <Sparkles className="mt-px h-3 w-3 shrink-0 text-[#3d6b8e] opacity-70" />
      {result.status === 'ready' ? (
        <span className="text-[11px] leading-tight text-[#3d6b8e]">{result.text}</span>
      ) : (
        <span className="text-[11px] leading-tight text-slate-400 italic">No summary available yet</span>
      )}
    </span>
  );
}
