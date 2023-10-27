import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { UsersDatabaseClient } from 'libs/databases/src';
import { IPermission } from './interfaces/IPermission';
import { IRolePermission } from './interfaces/IRolePermission';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(private database: UsersDatabaseClient) {}

  async getPermissions(): Promise<IPermission[]> {
    try {
      const permissions = await this.database.permission.findMany();
      if (permissions.length <= 0) return null;
      return permissions;
    } catch (error) {
      throw error;
    }
  }

  async getPermission(id: string): Promise<IPermission> {
    try {
      const permission = await this.database.permission.findUnique({
        where: {
          id,
        },
      });

      if (!permission) return null;

      return permission;
    } catch (error) {
      throw error;
    }
  }

  async getPermissionsForUser(userId: string): Promise<Permission[]> {
    const rolesAndPermissions = await this.database.user_Role.findMany({
      where: {
        user_id: userId,
      },
      include: {
        role: {
          include: {
            Role_Permission: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });
    const flattenedPermissions = rolesAndPermissions.flatMap((roleObject) => {
      return roleObject.role.Role_Permission.map((rolePermission) => {
        return rolePermission.permission;
      });
    });
    return flattenedPermissions.map((permission) =>
      Permission.create(permission),
    );
  }

  async createPermission(permission: IPermission): Promise<void> {
    try {
      await this.database.permission.create({
        data: {
          id: randomUUID(),
          ...permission,
          createdAt: new Date(),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getRolesByPermission(id: string): Promise<IRolePermission[]> {
    try {
      const permission = await this.database.role_Permission.findMany({
        where: {
          id,
        },
        include: {
          permission: true,
          role: true,
        },
      });

      if (permission.length <= 0) return null;

      return permission;
    } catch (error) {
      throw error;
    }
  }

  async getPermissionAndRolesForUser(userId: string): Promise<any> {
    try {
      const rolesAndPermissions = await this.database.user_Role.findMany({
        where: {
          user_id: userId,
        },
        include: {
          role: {
            include: {
              Role_Permission: {
                include: {
                  permission: true,
                },
              },
            },
          },
        },
      });

      if (rolesAndPermissions.length <= 0) return null;

      const filterDisabledRoles = rolesAndPermissions.filter(
        (roleObject) => roleObject.status === true,
      );

      return {
        roles: filterDisabledRoles.map((roleObject) => {
          return {
            id: roleObject.role.id,
            name: roleObject.role.name,
            status: roleObject.role.status,
          };
        }),
        permissions: filterDisabledRoles.flatMap((roleObject) => {
          return roleObject.role.Role_Permission.map((rolePermission) => {
            return Permission.create(rolePermission.permission);
          });
        }),
      };
    } catch (error) {
      throw error;
    }
  }

  async getPermissionsByRole(roleId: string): Promise<IRolePermission[]> {
    try {
      const permissions = await this.database.role_Permission.findMany({
        where: {
          role_id: roleId,
        },
        include: {
          role: true,
          permission: true,
        },
      });

      if (permissions.length <= 0) return null;

      return permissions;
    } catch (error) {
      throw error;
    }
  }

  async asignPermissionToRole(
    roleId: string,
    permissionId: string,
  ): Promise<void> {
    try {
      await this.database.role_Permission.create({
        data: {
          id: randomUUID(),
          role_id: roleId,
          permission_id: permissionId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
