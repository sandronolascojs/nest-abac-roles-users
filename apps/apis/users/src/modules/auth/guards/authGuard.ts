import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from '../factories/casl.factory';
import { TokenService } from '../token.service';
import { PERMISSIONS_KEY } from '../../../shared/decorators/permissions.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly caslAbilityFactory: CaslAbilityFactory,
    private readonly tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<
      { action: string; subject: string }[]
    >(PERMISSIONS_KEY, context.getHandler());
    if (!permissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      throw new UnauthorizedException('token not provided');
    }

    const userId = await this.tokenService.extractUserIdFromToken(token);
    const ability = await this.caslAbilityFactory.createForUser(userId);

    const hasPermission = permissions.every((permission) => {
      return ability.relevantRuleFor(permission.action, permission.subject);
    });

    if (!hasPermission) {
      throw new UnauthorizedException(
        'You do not have permission to perform this action',
      );
    }

    return true;
  }
}
