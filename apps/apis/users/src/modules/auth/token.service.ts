import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async extractUserIdFromToken(token: string): Promise<string> {
    try {
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: 'secret',
      });

      if (typeof decodedToken === 'string') {
        return decodedToken; // Si el userId está almacenado directamente en el token como una cadena
      } else if (typeof decodedToken === 'object' && 'userId' in decodedToken) {
        return decodedToken.userId; // Si el userId está almacenado en una propiedad 'userId' dentro del token
      }
    } catch (error) {
      throw new UnauthorizedException('invalid token');
    }

    throw new UnauthorizedException('token does not contain a userId property');
  }

  async generateToken(
    payload: any,
    expiresIn: string,
    secret: string,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret,
      expiresIn,
    });
  }

  async verifyToken(token: string, secret: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret,
      });
    } catch (error) {
      throw new UnauthorizedException('invalid token');
    }
  }
}
