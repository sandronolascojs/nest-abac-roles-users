import { randomUUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersDatabaseClient } from 'libs/databases/src';

import { IRole } from './interfaces/IRole';
import { CreateRolDto } from './dtos/createRolDto';

import { Role } from './entities/role.entity';
import { IUserRole } from './interfaces/IUserRole';

@Injectable()
export class RolesService {
  constructor(private database: UsersDatabaseClient) {}

  async getRoles(): Promise<IRole[]> {
    try {
      const roles = await this.database.role.findMany();
      if (roles.length <= 0) return null;
      return roles;
    } catch (error) {
      throw error;
    }
  }

  async getRole(id: string): Promise<IRole> {
    try {
      const role = await this.database.role.findUnique({
        where: {
          id,
        },
      });

      if (!role) return null;

      return role;
    } catch (error) {
      throw error;
    }
  }

  async createRole(roleInput: CreateRolDto): Promise<void> {
    try {
      const role = Role.create(roleInput);
      await this.database.role.create({
        data: role,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateRole(id: string, role: CreateRolDto): Promise<void> {
    try {
      await this.database.role.update({
        where: {
          id,
        },
        data: {
          name: role.name,
          description: role.description,
          slug: role.slug,
          status: role.status,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteRole(id: string): Promise<void> {
    try {
      await this.database.role.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getRolesByUserId(userId: string): Promise<IUserRole[]> {
    try {
      const userRoles = await this.database.user_Role.findMany({
        where: {
          user_id: userId,
        },
        include: {
          role: true,
        },
      });
      if (userRoles.length <= 0) return null;
      return userRoles;
    } catch (error) {
      throw error;
    }
  }

  async getUsersByRoleId(roleId: string): Promise<IUserRole[]> {
    try {
      const userRoles = await this.database.user_Role.findMany({
        where: {
          role_id: roleId,
        },
        include: {
          role: true,
          user: true,
        },
      });
      if (userRoles.length <= 0) return null;

      return userRoles;
    } catch (error) {
      throw error;
    }
  }

  async asignRoleToUser(userId: string, roleId: string): Promise<void> {
    try {
      await this.database.user_Role.create({
        data: {
          id: randomUUID(),
          user_id: userId,
          role_id: roleId,
          status: true,
          createdAt: new Date(),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async enableRoleToUser(userId: string, roleId: string): Promise<void> {
    try {
      const userRolExists = await this.database.user_Role.findMany({
        where: {
          user_id: userId,
          role_id: roleId,
        },
      });

      if (userRolExists.length <= 0)
        throw new NotFoundException('User role not found');

      await this.database.user_Role.update({
        where: {
          id: userRolExists[0].id,
        },
        data: {
          status: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async disableRoleToUser(userId: string, roleId: string): Promise<void> {
    try {
      const userRolExists = await this.database.user_Role.findMany({
        where: {
          user_id: userId,
          role_id: roleId,
        },
      });
      if (userRolExists.length <= 0)
        throw new NotFoundException('User role not found');
      await this.database.user_Role.update({
        where: {
          id: userRolExists[0].id,
        },
        data: {
          status: false,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getRolesByPermissionId(permissionId: string): Promise<IRole[]> {
    try {
      const rolePermissions = await this.database.role_Permission.findMany({
        where: {
          permission_id: permissionId,
        },
        include: {
          role: true,
        },
      });

      const roles = rolePermissions.map(
        (rolePermission) => rolePermission.role,
      );

      return roles;
    } catch (error) {
      throw error;
    }
  }

  async getRoleBySlug(slug: string): Promise<IRole> {
    try {
      const role = await this.database.role.findUnique({
        where: {
          slug,
        },
      });

      if (!role) return null;

      return role;
    } catch (error) {
      throw error;
    }
  }

  async getRoleByName(name: string): Promise<IRole> {
    try {
      const role = await this.database.role.findUnique({
        where: {
          name,
        },
      });

      if (!role) return null;

      return role;
    } catch (error) {
      throw error;
    }
  }

  async enableRole(id: string): Promise<void> {
    try {
      await this.database.role.update({
        where: {
          id,
        },
        data: {
          status: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async disableRole(id: string): Promise<void> {
    try {
      await this.database.role.update({
        where: {
          id,
        },
        data: {
          status: false,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
