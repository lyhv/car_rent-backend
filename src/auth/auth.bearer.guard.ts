import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import { AuthPayloadToken } from './auth.service';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UsersService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: AuthPayloadToken = await this.jwtService.verify(token);
      const isUserTokenValid = await this.userService.validateUserToken(
        payload.user_id,
        token,
      );
      if (!isUserTokenValid) {
        throw new UnauthorizedException('User access_token unauthorized');
      }
      request['token_payload'] = payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('access_token has expired!');
      }
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
