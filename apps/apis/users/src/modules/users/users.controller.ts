import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';

import { User } from './entities/user';
import { UserMapper, UserViewModel } from './mappers/user.mapper';
import { CommonHttpResponse } from '../../shared/utils/commonHttpResponse';
import { Permissions } from '../../shared/decorators/permissions.decorator';
import { AuthGuard } from '../auth/guards/authGuard';
import { ActionsEnum } from '../auth/enums/actions.enum';
import { SubjectsEnum } from '../auth/enums/subjects.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Permissions({ action: ActionsEnum.read, subject: SubjectsEnum.USERS })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<CommonHttpResponse<UserViewModel[]>> {
    const users = await this.userService.getUsers();
    return new CommonHttpResponse<UserViewModel[]>(
      HttpStatus.OK,
      '',
      'success',
      UserMapper.toViewModelList(users),
    );
  }

  @Get(':id')
  @Permissions({ action: ActionsEnum.read, subject: SubjectsEnum.USERS })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id') id: string,
  ): Promise<CommonHttpResponse<UserViewModel>> {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException('user not found');
    return new CommonHttpResponse<UserViewModel>(
      HttpStatus.OK,
      '',
      'success',
      UserMapper.toViewModel(user),
    );
  }

  @Post()
  @Permissions({ action: ActionsEnum.create, subject: SubjectsEnum.USERS })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    const user = User.create(createUserDto);
    await this.userService.create(user);
  }

  @Put(':id')
  @Permissions({ action: ActionsEnum.update, subject: SubjectsEnum.USERS })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return await this.userService.update(id, updateUserDto);
  }

  @Put(':id/enable')
  @Permissions({ action: ActionsEnum.update, subject: SubjectsEnum.USERS })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async enable(@Param('id') id: string): Promise<void> {
    return await this.userService.enableUser(id);
  }

  @Put(':id/disable')
  @Permissions({ action: ActionsEnum.update, subject: SubjectsEnum.USERS })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async disable(@Param('id') id: string): Promise<void> {
    return await this.userService.disableUser(id);
  }

  @Delete(':id')
  @Permissions({ action: ActionsEnum.delete, subject: SubjectsEnum.USERS })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.userService.remove(id);
  }
}
