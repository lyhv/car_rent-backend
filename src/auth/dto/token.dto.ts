export interface TokenCreateDto {
  user_id: number;

  access_token: string;

  refresh_token: string;

  expires_in: number;
}
