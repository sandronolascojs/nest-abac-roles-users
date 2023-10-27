import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/updateUserDto';
import { UsersDatabaseClient } from 'libs/databases/src';
import { User } from './entities/user';
import { BcryptProvider } from '../../shared/utils/bcryptProvider';

@Injectable()
export class UsersService {
  constructor(
    private databaseService: UsersDatabaseClient,
    private crypto: BcryptProvider,
  ) {}

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.databaseService.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) return null;

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.databaseService.user.findMany();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async create(user: User): Promise<void> {
    try {
      const hash = await this.crypto.hash(user.password);
      await this.databaseService.user.create({
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          lastName: user.lastName,
          phone: user.phone,
          status: user.status,
          password: hash,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    { email, lastName, name, phone, status }: UpdateUserDto,
  ): Promise<void> {
    try {
      await this.databaseService.user.update({
        where: {
          id,
        },
        data: {
          email,
          name,
          lastName,
          phone,
          status,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async enableUser(id: string): Promise<void> {
    try {
      await this.databaseService.user.update({
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

  async disableUser(id: string): Promise<void> {
    try {
      await this.databaseService.user.update({
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

  async remove(id: string): Promise<void> {
    try {
      await this.databaseService.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
