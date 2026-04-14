export type PermissionKey = 'view' | 'create' | 'edit' | 'delete' | 'export' | 'approve' | 'assign' | 'configure';

export interface ModulePermissions {
  moduleId: string;
  moduleLabel: string;
  permissions: Partial<Record<PermissionKey, boolean>>;
  /** Which permission keys are applicable to this module */
  available: PermissionKey[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  type: 'system' | 'custom';
  status: 'active' | 'disabled';
  modules: ModulePermissions[];
}

export const ALL_PERMISSION_KEYS: PermissionKey[] = [
  'view', 'create', 'edit', 'delete', 'export', 'approve', 'assign', 'configure',
];

export const PERMISSION_LABELS: Record<PermissionKey, string> = {
  view: 'View',
  create: 'Create',
  edit: 'Edit',
  delete: 'Delete',
  export: 'Export',
  approve: 'Approve',
  assign: 'Assign',
  configure: 'Configure',
};
