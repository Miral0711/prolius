import { useState } from 'react';
import { Copy, Save, RotateCcw, Trash2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Role } from './types';

interface RoleHeaderPanelProps {
  role: Role;
  isDirty: boolean;
  isSaving: boolean;
  onSave: (updates: Partial<Pick<Role, 'name' | 'description' | 'status'>>) => void;
  onReset: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export function RoleHeaderPanel({
  role,
  isDirty,
  isSaving,
  onSave,
  onReset,
  onDelete,
  onDuplicate,
}: RoleHeaderPanelProps) {
  const [name, setName] = useState(role.name);
  const [description, setDescription] = useState(role.description);
  const [status, setStatus] = useState<Role['status']>(role.status);

  // Sync local state when active role changes externally (role switch or after reset)
  if (name !== role.name && !isDirty) setName(role.name);
  if (description !== role.description && !isDirty) setDescription(role.description);
  if (status !== role.status && !isDirty) setStatus(role.status);

  // Local fields are dirty if they differ from the saved role
  const localDirty =
    name !== role.name || description !== role.description || status !== role.status;
  const effectiveDirty = isDirty || localDirty;
  const canAct = effectiveDirty && !isSaving;

  const handleSave = () => onSave({ name, description, status });
  const handleReset = () => {
    setName(role.name);
    setDescription(role.description);
    setStatus(role.status);
    onReset();
  };

  const isSystem = role.type === 'system';

  const inputClass =
    'h-7 w-full rounded border border-[#c8d8e4] bg-[#f4f8fb] px-2 text-xs text-slate-700 placeholder:text-slate-400 focus:border-[#3d6b8e] focus:outline-none focus:ring-2 focus:ring-[#3d6b8e]/10';

  return (
    <div className="shrink-0 border-b border-[#d4e0ea] bg-white px-4 py-3">
      <div className="flex flex-wrap items-end gap-2">
        {/* Role name */}
        <div className="min-w-[160px] flex-1">
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Role Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => !isSystem && setName(e.target.value)}
            readOnly={isSystem}
            className={cn(inputClass, isSystem && 'cursor-default opacity-60')}
            placeholder="Role name"
          />
        </div>

        {/* Description */}
        <div className="min-w-[220px] flex-[2]">
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => !isSystem && setDescription(e.target.value)}
            readOnly={isSystem}
            className={cn(inputClass, isSystem && 'cursor-default opacity-60')}
            placeholder="Short description"
          />
        </div>

        {/* Status — uses the shared Select component (Radix, has built-in chevron) */}
        <div className="w-[120px]">
          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Status
          </label>
          <Select
            value={status}
            onValueChange={(v) => !isSystem && setStatus(v as Role['status'])}
          >
            <SelectTrigger
              className={cn(
                'h-7 border-[#c8d8e4] bg-[#f4f8fb] text-xs font-medium text-slate-700 shadow-none',
                isSystem && 'cursor-default opacity-60',
              )}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="disabled">Disabled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1.5 pb-0.5">
          {/* Save */}
          {canAct ? (
            <Button
              type="button"
              size="sm"
              variant="primary"
              disabled={isSaving}
              onClick={handleSave}
              className="shadow-sm"
            >
              {isSaving ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Save className="h-3 w-3" />
              )}
              {isSaving ? 'Saving…' : 'Save'}
            </Button>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex h-7 cursor-default items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-400"
            >
              <Save className="h-3 w-3" />
              Save
            </button>
          )}

          {/* Reset */}
          {canAct ? (
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={isSaving}
              onClick={handleReset}
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </Button>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex h-7 cursor-default items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-400"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
          )}

          {/* Duplicate — always available, not tied to dirty state */}
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onDuplicate}
          >
            <Copy className="h-3 w-3" />
            Duplicate
          </Button>

          {/* Delete — destructive, custom roles only */}
          {!isSystem && (
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={onDelete}
            >
              <Trash2 className="h-3 w-3" />
              Delete
            </Button>
          )}
        </div>
      </div>

      {/* Meta row */}
      <div className="mt-2 flex items-center gap-3">
        <span
          className={cn(
            'rounded-sm border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
            role.type === 'system'
              ? 'border-[#c8d8e4] bg-[#eef4f8] text-[#3d6b8e]'
              : 'border-violet-200 bg-violet-50 text-violet-700',
          )}
        >
          {role.type}
        </span>
        <span
          className={cn(
            'rounded-sm border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
            status === 'active'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'border-slate-200 bg-slate-50 text-slate-500',
          )}
        >
          {status}
        </span>
        <span className="text-[11px] text-slate-400">
          {role.userCount} user{role.userCount !== 1 ? 's' : ''} assigned
        </span>
        {isSystem && (
          <span className="text-[11px] italic text-slate-400">
            System roles cannot be renamed or deleted.
          </span>
        )}
      </div>
    </div>
  );
}
