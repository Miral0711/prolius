import { useState, useCallback, useRef } from 'react';
import { Plus } from 'lucide-react';
import { PageLayout } from '@/components/shared';
import { RolesSidebar } from './RolesSidebar';
import { RoleHeaderPanel } from './RoleHeaderPanel';
import { PermissionsMatrix } from './PermissionsMatrix';
import { ROLES_MOCK } from './mock-data';
import type { Role, PermissionKey } from './types';
import { toast } from 'sonner';

function deepCloneRole(role: Role): Role {
  return {
    ...role,
    modules: role.modules.map((m) => ({
      ...m,
      permissions: { ...m.permissions },
    })),
  };
}

export function RolesPermissionsContent() {
  const [roles, setRoles] = useState<Role[]>(() => ROLES_MOCK.map(deepCloneRole));
  const [activeRoleId, setActiveRoleId] = useState<string>(ROLES_MOCK[0].id);
  const [editedRole, setEditedRole] = useState<Role>(() => deepCloneRole(ROLES_MOCK[0]));
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeRole = roles.find((r) => r.id === activeRoleId)!;

  const handleSelectRole = useCallback((id: string) => {
    setActiveRoleId(id);
    const found = roles.find((r) => r.id === id);
    if (found) {
      setEditedRole(deepCloneRole(found));
      setIsDirty(false);
    }
  }, [roles]);

  const handleToggle = useCallback((moduleId: string, key: PermissionKey, value: boolean) => {
    setEditedRole((prev) => ({
      ...prev,
      modules: prev.modules.map((m) =>
        m.moduleId === moduleId
          ? { ...m, permissions: { ...m.permissions, [key]: value } }
          : m,
      ),
    }));
    setIsDirty(true);
  }, []);

  const handleGlobalToggle = useCallback((value: boolean) => {
    setEditedRole((prev) => ({
      ...prev,
      modules: prev.modules.map((m) => {
        const permissions = { ...m.permissions };
        m.available.forEach((k) => { permissions[k] = value; });
        return { ...m, permissions };
      }),
    }));
    setIsDirty(true);
  }, []);

  const handleSave = useCallback((updates: Partial<Pick<Role, 'name' | 'description' | 'status'>>) => {
    const merged = { ...editedRole, ...updates };
    setIsSaving(true);
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      setRoles((prev) => prev.map((r) => (r.id === activeRoleId ? merged : r)));
      setEditedRole(deepCloneRole(merged));
      setIsDirty(false);
      setIsSaving(false);
      toast.success('Role saved successfully.');
    }, 800);
  }, [editedRole, activeRoleId]);

  const handleReset = useCallback(() => {
    const original = roles.find((r) => r.id === activeRoleId);
    if (original) {
      setEditedRole(deepCloneRole(original));
      setIsDirty(false);
    }
  }, [roles, activeRoleId]);

  const handleDelete = useCallback(() => {
    const remaining = roles.filter((r) => r.id !== activeRoleId);
    setRoles(remaining);
    if (remaining.length > 0) {
      handleSelectRole(remaining[0].id);
    }
    toast.success('Role deleted.');
  }, [roles, activeRoleId, handleSelectRole]);

  const handleDuplicate = useCallback(() => {
    const source = roles.find((r) => r.id === activeRoleId);
    if (!source) return;
    const newId = `custom-${Date.now()}`;
    const clone: Role = {
      ...deepCloneRole(source),
      id: newId,
      name: `${source.name} (Copy)`,
      type: 'custom',
      userCount: 0,
      status: 'active',
    };
    setRoles((prev) => [...prev, clone]);
    handleSelectRole(newId);
    toast.success('Role duplicated.');
  }, [roles, activeRoleId, handleSelectRole]);

  const handleCreateRole = useCallback(() => {
    const newId = `custom-${Date.now()}`;
    const newRole: Role = {
      id: newId,
      name: 'New Role',
      description: 'Custom role description',
      userCount: 0,
      type: 'custom',
      status: 'active',
      modules: ROLES_MOCK[3].modules.map((m) => ({
        ...m,
        permissions: Object.fromEntries(m.available.map((k) => [k, false])) as Role['modules'][0]['permissions'],
      })),
    };
    setRoles((prev) => [...prev, newRole]);
    handleSelectRole(newId);
    toast.success('New role created. Configure permissions and save.');
  }, [handleSelectRole]);

  return (
    <PageLayout title="Roles & Permissions">


      {/* Two-panel layout */}
      <div className="flex min-h-0 flex-1 gap-2 overflow-hidden">
        {/* Left: Roles sidebar */}
        <div className="w-[240px] shrink-0">
          <RolesSidebar
            roles={roles}
            activeRoleId={activeRoleId}
            onSelectRole={handleSelectRole}
            onCreateRole={handleCreateRole}
          />
        </div>

        {/* Right: Permissions panel */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-md border border-[#d4e0ea] bg-white shadow-sm">
          {/* Role header with editable fields + actions */}
          <RoleHeaderPanel
            role={activeRole}
            isDirty={isDirty}
            isSaving={isSaving}
            onSave={handleSave}
            onReset={handleReset}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
          />

          {/* Matrix toolbar */}
          <div className="flex shrink-0 items-center justify-between border-b border-[#d4e0ea] bg-white px-4 py-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.06em] text-slate-700">
              Permission Matrix
            </h3>
            <span className="text-[11px] text-slate-400">
              {editedRole.modules.reduce(
                (acc, m) => acc + m.available.filter((k) => m.permissions[k]).length,
                0,
              )}{' '}
              permissions enabled
            </span>
          </div>

          {/* Scrollable matrix */}
          <PermissionsMatrix
            modules={editedRole.modules}
            readOnly={false}
            onToggle={handleToggle}
            onGlobalToggle={handleGlobalToggle}
          />
        </div>
      </div>
    </PageLayout>
  );
}
