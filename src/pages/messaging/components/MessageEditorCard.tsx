import { Link2, Image, Video, Paperclip, ListChecks } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageEditorCardProps {
  value: string;
  onChange: (v: string) => void;
}

const TOOLBAR_ACTIONS = [
  { icon: Link2,      label: 'Insert link' },
  { icon: Image,      label: 'Insert image' },
  { icon: Video,      label: 'Insert video' },
  { icon: Paperclip,  label: 'Attach file' },
  { icon: ListChecks, label: 'Insert checklist' },
];

export function MessageEditorCard({ value, onChange }: MessageEditorCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 border-b border-slate-200 bg-slate-50/80 px-2 py-1.5">
        {TOOLBAR_ACTIONS.map(({ icon: Icon, label }) => (
          <button
            key={label}
            type="button"
            title={label}
            className="inline-flex h-7 w-7 items-center justify-center rounded text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>

      {/* Editor area */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your message here..."
        rows={7}
        className={cn(
          'w-full resize-none border-0 bg-white px-3 py-2.5 text-2sm text-slate-800 outline-none',
          'placeholder:text-slate-300 focus:ring-0',
        )}
      />

      {/* Footer note */}
      <div className="border-t border-slate-100 bg-slate-50/60 px-3 py-1.5">
        <p className="text-xs text-slate-400">
          The total of all attachments can be up to 50MB and a single attachment can be up to 10MB.
        </p>
      </div>
    </div>
  );
}
