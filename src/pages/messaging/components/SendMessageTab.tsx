import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MessageEditorCard } from './MessageEditorCard';
import { RecipientSelectionPanel } from './RecipientSelectionPanel';
import { TEMPLATE_OPTIONS } from '../mock-data';

interface FormState {
  template: string;
  recipientSearch: string;
  title: string;
  body: string;
  isPrivate: boolean;
  recipientGroups: Record<string, boolean>;
}

const EMPTY: FormState = {
  template: '',
  recipientSearch: '',
  title: '',
  body: '',
  isPrivate: false,
  recipientGroups: { users: false, regionGroups: false, created: false },
};

export function SendMessageTab() {
  const [form, setForm] = useState<FormState>(EMPTY);

  const set = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSend = () => {
    console.log('Send message:', form);
  };

  const handleClear = () => setForm(EMPTY);

  return (
    <div className="flex flex-col gap-3">
      {/* Instruction */}
      <p className="text-xs text-slate-500">
        Create and send a message. You can incorporate any groups and/or templates created on the other tabs.
      </p>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.4fr]">
        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col gap-3">
          {/* Load template */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">Load template</label>
            <Select
              value={form.template}
              onValueChange={(v) => set('template', v)}
            >
              <SelectTrigger className="h-8 border-slate-200 bg-white text-2sm shadow-none">
                <SelectValue placeholder="No template selected" />
              </SelectTrigger>
              <SelectContent>
                {TEMPLATE_OPTIONS.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Select recipients */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">Select recipients</label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="User search"
                value={form.recipientSearch}
                onChange={(e) => set('recipientSearch', e.target.value)}
                className="h-8 border-slate-200 bg-white pl-8 text-2sm shadow-none placeholder:font-normal placeholder:text-slate-300"
              />
            </div>
          </div>

          {/* Recipient group blocks */}
          <RecipientSelectionPanel
            selected={form.recipientGroups}
            onToggle={(key) =>
              set('recipientGroups', {
                ...form.recipientGroups,
                [key]: !form.recipientGroups[key],
              })
            }
          />
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="flex flex-col gap-3">
          {/* Message title */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">
              Message title <span className="text-rose-500">*</span>
            </label>
            <Input
              placeholder="Enter message title"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              className="h-8 border-slate-200 bg-white text-2sm shadow-none placeholder:font-normal placeholder:text-slate-300"
            />
          </div>

          {/* Editor */}
          <MessageEditorCard
            value={form.body}
            onChange={(v) => set('body', v)}
          />

          {/* Private checkbox + actions */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={form.isPrivate}
                onCheckedChange={(v) => set('isPrivate', Boolean(v))}
                size="sm"
                className="border-slate-300"
              />
              <span className="text-xs font-medium text-slate-600">Private message</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-4 text-2sm font-medium text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700"
              >
                Clear
              </button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleSend}
                disabled={!form.title.trim() || !form.body.trim()}
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
