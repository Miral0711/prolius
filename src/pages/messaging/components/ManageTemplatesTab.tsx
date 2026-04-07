import { useState } from 'react';
import { FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MessageEditorCard } from './MessageEditorCard';
import { cn } from '@/lib/utils';

type Priority = 'normal' | 'high' | 'alert';

interface Template {
  id: number;
  name: string;
  type: string;
  body: string;
  priority: Priority;
}

const MOCK_TEMPLATES: Template[] = [
  { id: 1, name: 'MCQ',          type: 'Standard message', body: 'Please answer the following questions.',  priority: 'normal' },
  { id: 2, name: 'MCQ Template', type: 'Standard message', body: 'Multiple choice question template body.', priority: 'normal' },
  { id: 3, name: 'new',          type: 'Standard message', body: '',                                        priority: 'normal' },
];

const TEMPLATE_TYPES = ['Standard message', 'Alert', 'Survey', 'Announcement'];

interface FormState {
  name: string;
  type: string;
  body: string;
  priority: Priority;
}

const EMPTY: FormState = { name: '', type: 'Standard message', body: '', priority: 'normal' };

const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'high',   label: 'High priority' },
  { value: 'alert',  label: 'Priority 1 alert!' },
];

export function ManageTemplatesTab() {
  const [templates, setTemplates] = useState<Template[]>(MOCK_TEMPLATES);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);

  const set = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSelectTemplate = (t: Template) => {
    setSelectedId(t.id);
    setForm({ name: t.name, type: t.type, body: t.body, priority: t.priority });
  };

  const handleAdd = () => {
    if (!form.name.trim() || !form.body.trim()) return;
    if (selectedId) {
      setTemplates((ts) =>
        ts.map((t) => (t.id === selectedId ? { ...t, ...form } : t)),
      );
    } else {
      setTemplates((ts) => [...ts, { id: Date.now(), ...form }]);
    }
    setForm(EMPTY);
    setSelectedId(null);
  };

  const handleClear = () => {
    setForm(EMPTY);
    setSelectedId(null);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Instruction */}
      <p className="text-xs text-slate-500">
        Use templates to create a new message and select recipients to receive the communication.
      </p>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.4fr]">
        {/* ── LEFT: Saved templates list ── */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-slate-600">Saved templates</span>

          {templates.length === 0 ? (
            <div className="flex items-center justify-center rounded-md border border-dashed border-slate-200 bg-white py-8 text-xs text-slate-400">
              No templates saved yet
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-slate-100 overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
              {templates.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleSelectTemplate(t)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 text-left transition-colors',
                    selectedId === t.id ? 'bg-[#f0f4f8]' : 'hover:bg-slate-50',
                  )}
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-[#f4f8fb]">
                    <FileText className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                  <span className={cn(
                    'truncate text-2sm font-medium',
                    selectedId === t.id ? 'text-[#2e5f8a]' : 'text-slate-800',
                  )}>
                    {t.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: Form ── */}
        <div className="flex flex-col gap-3">
          {/* Template name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">
              Template name <span className="text-rose-500">*</span>
            </label>
            <Input
              placeholder="Enter new template name"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              className="h-8 border-slate-200 bg-white text-2sm shadow-none placeholder:font-normal placeholder:text-slate-300"
            />
          </div>

          {/* Template type */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">Template type</label>
            <Select value={form.type} onValueChange={(v) => set('type', v)}>
              <SelectTrigger className="h-8 border-slate-200 bg-white text-2sm shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TEMPLATE_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message editor */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">
              Message <span className="text-rose-500">*</span>
            </label>
            <MessageEditorCard value={form.body} onChange={(v) => set('body', v)} />
          </div>

          {/* Priority */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-600">Priority</label>
            <div className="flex flex-wrap items-center gap-4">
              {PRIORITY_OPTIONS.map(({ value, label }) => (
                <label key={value} className="flex cursor-pointer items-center gap-1.5">
                  <input
                    type="radio"
                    name="priority"
                    value={value}
                    checked={form.priority === value}
                    onChange={() => set('priority', value)}
                    className="h-3.5 w-3.5 accent-blue-600"
                  />
                  <span className="text-2sm text-slate-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleAdd}
              disabled={!form.name.trim() || !form.body.trim()}
              className="px-6"
            >
              {selectedId ? 'Update' : 'Add'}
            </Button>
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-5 text-2sm font-medium text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-700"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
