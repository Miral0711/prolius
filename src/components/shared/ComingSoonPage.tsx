import { Construction } from 'lucide-react';
import { PageLayout } from '@/components/shared/PageLayout';

interface ComingSoonPageProps {
  title: string;
}

export function ComingSoonPage({ title }: ComingSoonPageProps) {
  return (
    <PageLayout title={title}>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-slate-200 bg-white py-24">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-[#f4f8fb]">
          <Construction className="h-5 w-5 text-slate-400" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="mt-1 text-xs text-slate-400">This page is coming soon</p>
        </div>
      </div>
    </PageLayout>
  );
}
