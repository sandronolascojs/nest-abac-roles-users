import { Injectable } from '@nestjs/common';
import { ITConsultDatabaseClient } from 'libs/databases/src';
import { IUser } from '../users/interfaces/IUser';
import { BcryptProvider } from '../../shared/utils/bcryptProvider';

@Injectable()
export class AuthService {
  constructor(
    private database: ITConsultDatabaseClient,
    private crypto: BcryptProvider,
  ) {}

  async validateUser(document: string): Promise<IUser> {
    try {
      const user = await this.database.user.findUnique({
        where: {
          identity_document: document,
        },
      });

      if (!user) return null;

      return user;
    } catch (error) {
      throw error;
    }
  }

  async registerUser(user: IUser): Promise<void> {
    try {
      const id = user.id;
      const password = await this.crypto.hash(user.password);

      await this.database.user.create({
        data: {
          id,
          email: user.email,
          identity_document: user.identity_document,
          name: user.name,
          lastName: user.lastName,
          phone: user.phone,
          password,
          status: user.status,
          license_plate: user.license_plate,
          license_type: user.license_type,
          title: user.title,
          specialization: user.specialization,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
