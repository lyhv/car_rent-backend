import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenResponse } from './interfaces/token.response.interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateAppToken(
    payload: object,
    expiresIn: number,
  ): Promise<TokenResponse> {
    const refreshToken = this.jwtService.sign(payload);
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: expiresIn,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    };
  }
}
