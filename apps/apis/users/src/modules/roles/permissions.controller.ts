import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { IPermission } from './interfaces/IPermission';
import { IRolePermission } from './interfaces/IRolePermission';
import { CommonHttpResponse } from '../../shared/utils/commonHttpResponse';
import { Permissions } from '../../shared/decorators/permissions.decorator';
import { AuthGuard } from '../auth/guards/authGuard';
import { ActionsEnum } from '../auth/enums/actions.enum';
import { SubjectsEnum } from '../auth/enums/subjects.enum';

@Controller('permissions')
export class PermissionsController {
  constructor(private permissionsService: PermissionsService) {}

  @Get()
  @Permissions({ action: ActionsEnum.read, subject: SubjectsEnum.PERMISSIONS })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getPermissions(): Promise<CommonHttpResponse<IPermission[]>> {
    const permissions = await this.permissionsService.getPermissions();
    if (!permissions) throw new NotFoundException('Permissions not found');
    return new CommonHttpResponse<IPermission[]>(
      HttpStatus.OK,
      '',
      'success',
      permissions,
    );
  }

  @Get(':id')
  @Permissions({ action: ActionsEnum.read, subject: SubjectsEnum.PERMISSIONS })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getPermission(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CommonHttpResponse<IPermission>> {
    const permission = await this.permissionsService.getPermission(id);
    if (!permission) throw new NotFoundException('Permission not found');
    return new CommonHttpResponse<IPermission>(
      HttpStatus.OK,
      '',
      'success',
      permission,
    );
  }

  @Get(':id/roles')
  @Permissions({ action: ActionsEnum.read, subject: SubjectsEnum.PERMISSIONS })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getRolesByPermission(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CommonHttpResponse<IRolePermission[]>> {
    const roles = await this.permissionsService.getRolesByPermission(id);
    if (!roles) throw new NotFoundException('Permissions not found');
    return new CommonHttpResponse<IRolePermission[]>(
      HttpStatus.OK,
      '',
      'success',
      roles,
    );
  }

  @Get('user/:userId')
  @Permissions({ action: ActionsEnum.read, subject: SubjectsEnum.PERMISSIONS })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getPermissionsForUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<CommonHttpResponse<IPermission[]>> {
    const permissions = await this.permissionsService.getPermissionsForUser(
      userId,
    );
    if (!permissions) throw new NotFoundException('Permissions not found');
    return new CommonHttpResponse<IPermission[]>(
      HttpStatus.OK,
      '',
      'success',
      permissions,
    );
  }

  @Get('user/:userId/roles')
  @Permissions({ action: ActionsEnum.read, subject: SubjectsEnum.PERMISSIONS })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getRolesForUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<CommonHttpResponse<IRolePermission[]>> {
    const roles = await this.permissionsService.getPermissionAndRolesForUser(
      userId,
    );
    if (!roles) throw new NotFoundException('Roles not found');
    return new CommonHttpResponse<IRolePermission[]>(
      HttpStatus.OK,
      '',
      'success',
      roles,
    );
  }

  @Post()
  @Permissions({
    action: ActionsEnum.create,
    subject: SubjectsEnum.PERMISSIONS,
  })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createPermission(@Body() permission: IPermission): Promise<void> {
    await this.permissionsService.createPermission(permission);
  }
}
