import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginTicket, OAuth2Client } from 'google-auth-library';
import { TokenResponse } from './interfaces/token.response.interface';
const client = new OAuth2Client(process.env.CLIENT_ID);
export interface AuthPayloadToken {
  password: string;
  email: string;
}
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async verifyGoogleId(token: string): Promise<LoginTicket> {
    return client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_SECRET,
    });
  }

  /**
   *
   * @param payload
   * @param expiresIn
   * @returns
   */
  async generateAppToken(
    payload: AuthPayloadToken,
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
