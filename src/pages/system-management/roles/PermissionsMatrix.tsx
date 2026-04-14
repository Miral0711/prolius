import { cn } from '@/lib/utils';
import { PermissionRow } from './PermissionRow';
import type { ModulePermissions, PermissionKey } from './types';
import { ALL_PERMISSION_KEYS, PERMISSION_LABELS } from './types';

const VISIBLE_COLUMNS: PermissionKey[] = ['view', 'create', 'edit', 'delete', 'export', 'approve', 'assign', 'configure'];

interface PermissionsMatrixProps {
  modules: ModulePermissions[];
  readOnly?: boolean;
  onToggle: (moduleId: string, key: PermissionKey, value: boolean) => void;
  onGlobalToggle: (value: boolean) => void;
}

export function PermissionsMatrix({ modules, readOnly = false, onToggle, onGlobalToggle }: PermissionsMatrixProps) {
  const allEnabled = modules.every((m) =>
    m.available.every((k) => m.permissions[k]),
  );

  return (
    <div className="min-h-0 flex-1 overflow-auto [scrollbar-gutter:stable]">
      <table className="w-full min-w-[700px] border-collapse text-left">
        <thead className="sticky top-0 z-10">
          <tr className="border-b border-[#d4e0ea] bg-[#eef4f8] shadow-[0_1px_0_0_rgb(212_224_234)]">
            {/* Module column header with global toggle */}
            <th className="w-[200px] border-r border-[#d4e0ea] px-3 py-2.5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Toggle all permissions globally"
                  disabled={readOnly}
                  onClick={() => onGlobalToggle(!allEnabled)}
                  className={cn(
                    'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
                    readOnly && 'cursor-not-allowed opacity-40',
                    allEnabled
                      ? 'border-[#3d6b8e] bg-[#3d6b8e] text-white'
                      : 'border-[#c8d8e4] bg-white hover:border-[#3d6b8e]',
                  )}
                >
                  {allEnabled && <span className="block h-2 w-2 rounded-sm bg-white" />}
                </button>
                <span className="text-xs font-bold uppercase tracking-[0.06em] text-[#3d6b8e]">
                  Module
                </span>
              </div>
            </th>

            {/* Permission column headers */}
            {VISIBLE_COLUMNS.map((key) => (
              <th
                key={key}
                className="border-r border-[#d4e0ea] px-3 py-2.5 text-center last:border-r-0"
              >
                <span className="text-xs font-bold uppercase tracking-[0.06em] text-[#3d6b8e]">
                  {PERMISSION_LABELS[key]}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {modules.map((module) => (
            <PermissionRow
              key={module.moduleId}
              module={module}
              columns={VISIBLE_COLUMNS}
              readOnly={readOnly}
              onToggle={onToggle}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
