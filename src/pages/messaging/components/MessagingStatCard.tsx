interface MessagingStatCardProps {
  label: string;
  value: number;
}

export function MessagingStatCard({ label, value }: MessagingStatCardProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-md border border-slate-200/90 bg-white px-4 py-3 shadow-sm">
      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</span>
      <span className="text-2xl font-bold tabular-nums text-slate-800">{value.toLocaleString()}</span>
    </div>
  );
}
