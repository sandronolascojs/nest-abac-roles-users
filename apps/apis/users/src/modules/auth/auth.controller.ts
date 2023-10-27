import { Body, Controller, Get, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BcryptProvider } from '../../shared/utils/bcryptProvider';
import { TokenService } from './token.service';

interface ILogin {
  user: { id: string; identity_document: string };
  access_token: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly crypto: BcryptProvider,
    private readonly jwtService: TokenService,
  ) {}

  @Get('login')
  async login(
    @Body() { document, password }: { document: string; password: string },
  ): Promise<ILogin> {
    const userExists = await this.authService.validateUser(document);
    if (!userExists) throw new UnauthorizedException('Invalid credentials');
    const passwordMatch = await this.crypto.compare(
      password,
      userExists.password,
    );
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      identity_document: userExists.identity_document,
      userId: userExists.id,
    };
    const access_token = await this.jwtService.generateToken(
      payload,
      '1h',
      'secret',
    );

    return {
      user: {
        id: userExists.id,
        identity_document: userExists.identity_document,
      },
      access_token,
    };
  }
}
