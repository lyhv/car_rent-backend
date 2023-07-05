import { Exclude, Expose, plainToClass } from 'class-transformer';
@Exclude()
export class UserResponse {
  @Expose()
  user_id: number;
  @Expose()
  user_role_id: number;
  @Expose()
  first_name: string;
  @Expose()
  last_name: string;
  @Expose()
  user_name: string;
  @Expose()
  email: string;
  @Expose()
  access_token: string;
  @Expose()
  refresh_token: string;
  @Expose()
  expires_in: number;
  @Expose()
  created_at: Date;
  @Expose()
  updated_at: Date;

  constructor(partial: Partial<UserResponse>) {
    Object.assign(this, plainToClass(UserResponse, partial));
  }
}
