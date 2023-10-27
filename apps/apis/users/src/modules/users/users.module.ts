import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersDatabaseClient } from 'libs/databases/src';
import { BcryptProvider } from '../../shared/utils/bcryptProvider';
import { AWSS3Storage } from '../../shared/utils/awsStorage';
import { CaslAbilityFactory } from '../auth/factories/casl.factory';
import { PermissionsService } from '../roles/permissions.service';
import { TokenService } from '../auth/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersDatabaseClient,
    BcryptProvider,
    CaslAbilityFactory,
    PermissionsService,
    TokenService,
    JwtService,
    {
      provide: 'IStorage',
      useClass: AWSS3Storage,
    },
  ],
})
export class UsersModule {}
