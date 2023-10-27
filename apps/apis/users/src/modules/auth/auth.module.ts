import { Module } from '@nestjs/common';
import { ITConsultDatabaseClient } from 'libs/databases/src';
import { BcryptProvider } from '../../shared/utils/bcryptProvider';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from './factories/casl.factory';
import { PermissionsService } from '../roles/permissions.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    ITConsultDatabaseClient,
    BcryptProvider,
    TokenService,
    JwtService,
    CaslAbilityFactory,
    PermissionsService,
    AuthService,
  ],
})
export class AuthModule {}
