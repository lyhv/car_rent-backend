import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from './public.decorator';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();

    // Check if the request contains the 'Content-Type' header with the value 'application/json'
    const contentTypeHeader = request.headers['content-type'];
    const isJsonContentType = contentTypeHeader === 'application/json';

    // Check if the request contains the 'Authorization' header
    const authorizationHeader = request.headers['authorization'];
    const hasAuthorizationHeader = !!authorizationHeader;
    // Implement your authentication logic here
    const isAuthenticated = true; /* Perform authentication check */
    // Check if the request contains the 'User-Agent' header
    const userAgentHeader = request.headers['user-agent'];
    const hasUserAgentHeader = !!userAgentHeader;

    return (
      isJsonContentType &&
      hasAuthorizationHeader &&
      isAuthenticated &&
      hasUserAgentHeader
    );
  }
}
