import { Module } from '@nestjs/common';
import { UsersDatabaseClient } from 'libs/databases/src';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { CaslAbilityFactory } from '../auth/factories/casl.factory';
import { TokenService } from '../auth/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [PermissionsController],
  providers: [
    PermissionsService,
    PermissionsService,
    UsersDatabaseClient,
    CaslAbilityFactory,
    TokenService,
    JwtService,
  ],
})
export class PermissionsModule {}
