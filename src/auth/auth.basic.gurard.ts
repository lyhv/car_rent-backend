import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Add your authentication logic here
    // Extract the request object from the execution context
    const request = context.switchToHttp().getRequest();

    // Get the authorization header from the request
    const authorizationHeader = request.headers['authorization'];
    let isAuthenticated = false;
    // Check if the authorization header is present and starts with "Basic "
    if (authorizationHeader && authorizationHeader.startsWith('Basic ')) {
      // Extract the base64-encoded credentials from the authorization header
      const credentials = authorizationHeader.replace('Basic ', '');

      // Decode the credentials from base64
      const decodedCredentials = Buffer.from(credentials, 'base64').toString();

      // Extract the username and password from the decoded credentials
      const [username, password] = decodedCredentials.split(':');

      // Check if the username and password are valid (e.g., compare against stored credentials)

      // Return true if the credentials are valid, false otherwise
      isAuthenticated =
        process.env.BASE_AUTH_USER === username &&
        process.env.BASE_AUTH_PASS === password;
    }
    // If the authorization header is missing or doesn't start with "Basic ",
    // return false to indicate authentication failure
    if (isAuthenticated) {
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}
