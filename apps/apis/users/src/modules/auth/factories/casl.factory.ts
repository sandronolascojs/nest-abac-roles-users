import {
  createMongoAbility,
  AbilityBuilder,
  MongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { PermissionsService } from '../../roles/permissions.service';
import { Permission } from '../../roles/entities/permission.entity';
import { defaultRolesEnum } from '../enums/defaultRoles.enum';

@Injectable()
export class CaslAbilityFactory {
  constructor(private readonly permissionsService: PermissionsService) {}

  async createForUser(userId: string): Promise<MongoAbility> {
    const permissionsAndRoles =
      await this.permissionsService.getPermissionAndRolesForUser(userId);

    const { can, build } = new AbilityBuilder(createMongoAbility);

    const permissions = permissionsAndRoles.permissions;

    const isSuperAdmin = permissionsAndRoles.roles.filter(
      (role) => role.name === defaultRolesEnum.SUPERADMIN,
    );

    if (isSuperAdmin.length > 0) {
      can('manage', 'all');
      return build();
    }

    permissions.every((permission: Permission) =>
      can(permission.action, permission.subject),
    );

    return build();
  }
}
