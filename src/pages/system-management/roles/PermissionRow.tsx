import { cn } from '@/lib/utils';
import { PermissionToggle } from './PermissionToggle';
import type { ModulePermissions, PermissionKey } from './types';
import { PERMISSION_LABELS } from './types';

interface PermissionRowProps {
  module: ModulePermissions;
  columns: PermissionKey[];
  readOnly?: boolean;
  onToggle: (moduleId: string, key: PermissionKey, value: boolean) => void;
}

export function PermissionRow({ module, columns, readOnly = false, onToggle }: PermissionRowProps) {
  const allChecked = module.available.every((k) => module.permissions[k]);
  const someChecked = module.available.some((k) => module.permissions[k]);

  const handleSelectAll = () => {
    const next = !allChecked;
    module.available.forEach((k) => onToggle(module.moduleId, k, next));
  };

  return (
    <tr className="group border-b border-[#e8eef4] transition-colors hover:bg-[#f4f8fb]/60">
      {/* Module name + select-all */}
      <td className="w-[200px] border-r border-[#e8eef4] px-3 py-2">
        <div className="flex items-center gap-2">
          {/* Select-all mini toggle */}
          <button
            type="button"
            aria-label={`Toggle all permissions for ${module.moduleLabel}`}
            disabled={readOnly}
            onClick={handleSelectAll}
            className={cn(
              'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
              readOnly && 'cursor-not-allowed opacity-40',
              allChecked
                ? 'border-[#3d6b8e] bg-[#3d6b8e] text-white'
                : someChecked
                  ? 'border-[#3d6b8e] bg-white text-[#3d6b8e]'
                  : 'border-[#c8d8e4] bg-white text-transparent hover:border-[#3d6b8e]',
            )}
          >
            {allChecked ? (
              <span className="block h-2 w-2 rounded-sm bg-white" />
            ) : someChecked ? (
              <span className="block h-0.5 w-2 rounded-full bg-[#3d6b8e]" />
            ) : null}
          </button>
          <span className="text-xs font-medium text-slate-700">{module.moduleLabel}</span>
        </div>
      </td>

      {/* Permission cells */}
      {columns.map((key) => {
        const applicable = module.available.includes(key);
        const checked = applicable ? (module.permissions[key] ?? false) : false;
        return (
          <td key={key} className="border-r border-[#e8eef4] px-3 py-2 text-center last:border-r-0">
            {applicable ? (
              <PermissionToggle
                checked={checked}
                disabled={readOnly}
                onChange={(v) => onToggle(module.moduleId, key, v)}
                label={`${PERMISSION_LABELS[key]} for ${module.moduleLabel}`}
              />
            ) : (
              <span className="inline-block h-5 w-5 rounded border border-dashed border-slate-200 bg-slate-50" aria-hidden />
            )}
          </td>
        );
      })}
    </tr>
  );
}
