import { Construction } from 'lucide-react';

interface PlaceholderTabProps {
  title: string;
}

export function PlaceholderTab({ title }: PlaceholderTabProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-slate-200 bg-white py-16">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-[#f4f8fb]">
        <Construction className="h-5 w-5 text-slate-400" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-slate-600">{title}</p>
        <p className="mt-0.5 text-xs text-slate-400">This section is coming soon</p>
      </div>
    </div>
  );
}
