import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthRequest {
  @ApiProperty()
  @IsString()
  profile_id: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
