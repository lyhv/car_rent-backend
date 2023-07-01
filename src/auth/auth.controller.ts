import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequest } from 'src/auth/dto/auth.dto';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/auth.guard';
import { TokenResponse } from './interfaces/token.response.interface';

@Controller('auth')
@ApiTags('Auth')
@UseGuards(AuthenticationGuard) // Apply the guard to all routes in this controller
@ApiBasicAuth()
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Post('token')
  public getToken(@Body() authRequest: AuthRequest): Promise<TokenResponse> {
    const { profile_id, email } = authRequest;
    return this.appService.generateAppToken(
      {
        profile_id: profile_id,
        email: email,
      },
      7 * 24 * 60 * 60,
    );
  }
}
