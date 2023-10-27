import { IRolePermission } from '../interfaces/IRolePermission';

export interface IRolePermissionView {
  role_id: string;
  permission_id: string;
  role: {
    name: string;
    slug: string;
    description: string;
    status: boolean;
  };
  permission: {
    id: string;
    name: string;
    action: string;
    subject: string;
    slug: string;
    description: string;
    status: boolean;
  };
}

export interface IRolePermissionViewTwo {
  role_id: string;
  role_name: string;
  role_description: string;
  role_slug: string;
  permissions: {
    id: string;
    name: string;
    action: string;
    subject: string;
    slug: string;
    description: string;
    status: boolean;
  }[];
}

export class RolePermissionMapper {
  public static rolePermissionToViewModel(
    rolePermission: IRolePermission,
  ): IRolePermissionView {
    return {
      role_id: rolePermission.role_id,
      permission_id: rolePermission.permission_id,
      permission: {
        id: rolePermission.permission.id,
        name: rolePermission.permission.name,
        slug: rolePermission.permission.slug,
        action: rolePermission.permission.action,
        subject: rolePermission.permission.subject,
        description: rolePermission.permission.description,
        status: rolePermission.permission.status,
      },
      role: {
        name: rolePermission.role.name,
        slug: rolePermission.role.slug,
        description: rolePermission.role.description,
        status: rolePermission.role.status,
      },
    };
  }

  public static rolePermissionToViewModels(
    rolePermissions: IRolePermission[],
  ): IRolePermissionViewTwo {
    return {
      role_id: rolePermissions[0].role_id,
      role_name: rolePermissions[0].role.name,
      role_description: rolePermissions[0].role.description,
      role_slug: rolePermissions[0].role.slug,
      permissions: rolePermissions.map((rolePermission) => {
        return {
          id: rolePermission.permission.id,
          name: rolePermission.permission.name,
          slug: rolePermission.permission.slug,
          action: rolePermission.permission.action,
          subject: rolePermission.permission.subject,
          description: rolePermission.permission.description,
          status: rolePermission.permission.status,
        };
      }),
    };
  }
}
