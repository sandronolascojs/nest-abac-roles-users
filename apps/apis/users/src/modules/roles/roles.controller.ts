import {
  Controller,
  Body,
  Param,
  Delete,
  Get,
  NotFoundException,
  Post,
  Put,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { RolesService } from './roles.service';
import { CreateRolDto } from './dtos/createRolDto';
import { Role } from './entities/role.entity';
import { CommonHttpResponse } from '../../shared/utils/commonHttpResponse';
import { UserRoleMapper } from './mappers/userRole.mapper';
import { PermissionsService } from './permissions.service';
import { RolePermissionMapper } from './mappers/rolePermission.mapper';
import { RoleMapper } from './mappers/role.mapper';
import { Permissions } from '../../shared/decorators/permissions.decorator';
import { ActionsEnum } from '../auth/enums/actions.enum';
import { SubjectsEnum } from '../auth/enums/subjects.enum';
import { AuthGuard } from '../auth/guards/authGuard';

@Controller('roles')
export class RolesController {
  constructor(
    private rolesService: RolesService,
    private permissionsService: PermissionsService,
  ) {}

  @Get()
  @Permissions({ action: ActionsEnum.read, subject: SubjectsEnum.ROLES })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getRoles(): Promise<CommonHttpResponse<Role[]>> {
    const roles = await this.rolesService.getRoles();
    if (!roles) throw new NotFoundException('Roles not found');
    return new CommonHttpResponse<Role[]>(HttpStatus.OK, '', 'success', roles);
  }

  @Get(':id')
  @Permissions({ action: ActionsEnum.read, subject: SubjectsEnum.ROLES })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getRole(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CommonHttpResponse<Role>> {
    const role = await this.rolesService.getRole(id);
    if (!role) throw new NotFoundException('Role not found');
    return new CommonHttpResponse<Role>(HttpStatus.OK, '', 'success', role);
  }

  @Get(':id/permissions')
  @Permissions({ action: ActionsEnum.read, subject: SubjectsEnum.ROLES })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getPermissionsByRole(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CommonHttpResponse<RolePermissionMapper>> {
    const permissions = await this.permissionsService.getPermissionsByRole(id);
    if (!permissions) throw new NotFoundException('Role not found');
    return new CommonHttpResponse<RolePermissionMapper>(
      HttpStatus.OK,
      '',
      'success',
      RolePermissionMapper.rolePermissionToViewModels(permissions),
    );
  }

  @Post(':id/permissions/:permissionId')
  @Permissions({ action: ActionsEnum.read, subject: SubjectsEnum.ROLES })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async asignPermissionToRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('permissionId', ParseUUIDPipe) permissionId: string,
  ): Promise<void> {
    const roleExists = await this.rolesService.getRole(id);
    if (!roleExists) throw new NotFoundException('Role not found');

    const permissionExists = await this.permissionsService.getPermission(
      permissionId,
    );
    if (!permissionExists) throw new NotFoundException('Permission not found');
    return await this.permissionsService.asignPermissionToRole(
      id,
      permissionId,
    );
  }

  @Get('user/:userId')
  @Permissions({ action: ActionsEnum.read, subject: SubjectsEnum.ROLES })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getRolesByUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<CommonHttpResponse<UserRoleMapper[]>> {
    const roles = await this.rolesService.getRolesByUserId(userId);
    if (!roles) throw new NotFoundException('Roles not found');
    return new CommonHttpResponse<UserRoleMapper[]>(
      HttpStatus.OK,
      '',
      'success',
      UserRoleMapper.userRolesToViewModels(roles),
    );
  }

  @Get(':id/users')
  @Permissions({ action: ActionsEnum.read, subject: SubjectsEnum.ROLES })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getUsersByRole(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CommonHttpResponse<RoleMapper>> {
    const users = await this.rolesService.getUsersByRoleId(id);
    if (!users) throw new NotFoundException('Users not found');
    return new CommonHttpResponse<RoleMapper>(
      HttpStatus.OK,
      '',
      'success',
      RoleMapper.usersFromRole(users),
    );
  }

  @Post()
  @Permissions({ action: ActionsEnum.create, subject: SubjectsEnum.ROLES })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createRole(@Body() roleInput: CreateRolDto): Promise<void> {
    return await this.rolesService.createRole(roleInput);
  }

  @Post(':roleId/user/:userId')
  @Permissions({ action: ActionsEnum.create, subject: SubjectsEnum.ROLES })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async asignRoleToUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('roleId', ParseUUIDPipe) roleId: string,
  ): Promise<void> {
    return await this.rolesService.asignRoleToUser(userId, roleId);
  }

  @Put(':id')
  @Permissions({ action: ActionsEnum.update, subject: SubjectsEnum.ROLES })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() roleInput: CreateRolDto,
  ): Promise<void> {
    return await this.rolesService.updateRole(id, roleInput);
  }

  @Delete(':id')
  @Permissions({ action: ActionsEnum.delete, subject: SubjectsEnum.ROLES })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRole(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.rolesService.deleteRole(id);
  }

  @Patch(':roleId/user/:userId/enable')
  @Permissions({ action: ActionsEnum.update, subject: SubjectsEnum.ROLES })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async enableRoleToUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('roleId', ParseUUIDPipe) roleId: string,
  ): Promise<void> {
    return await this.rolesService.enableRoleToUser(userId, roleId);
  }

  @Patch(':roleId/user/:userId/disable')
  @Permissions({ action: ActionsEnum.update, subject: SubjectsEnum.ROLES })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async disableRoleToUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('roleId', ParseUUIDPipe) roleId: string,
  ): Promise<void> {
    return await this.rolesService.disableRoleToUser(userId, roleId);
  }

  @Patch(':id/enable')
  @Permissions({ action: ActionsEnum.update, subject: SubjectsEnum.ROLES })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async enableRole(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.rolesService.enableRole(id);
  }

  @Patch(':id/disable')
  @Permissions({ action: ActionsEnum.update, subject: SubjectsEnum.ROLES })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async disableRole(@Param('id', ParseUUIDPipe) id: string) {
    return await this.rolesService.disableRole(id);
  }
}
