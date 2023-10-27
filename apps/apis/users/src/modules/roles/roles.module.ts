import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { UsersDatabaseClient } from 'libs/databases/src';
import { PermissionsService } from './permissions.service';
import { CaslAbilityFactory } from '../auth/factories/casl.factory';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../auth/token.service';

@Module({
  imports: [],
  controllers: [RolesController],
  providers: [
    RolesService,
    PermissionsService,
    UsersDatabaseClient,
    CaslAbilityFactory,
    JwtService,
    TokenService,
  ],
})
export class RolesModule {}
