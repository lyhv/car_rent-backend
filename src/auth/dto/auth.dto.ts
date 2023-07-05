import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthRequest {
  @ApiProperty()
  @IsString()
  profile_id: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}

export class GoogleAuthRequest {
  @ApiProperty()
  @IsString()
  id_token: string;
}

export class LoginAuth {
  @ApiProperty({
    default: 'example@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    default: 'password',
  })
  @MinLength(8)
  @IsString()
  password: string;
}

export class RegisterUser {
  @ApiProperty({
    default: 'Bob',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    default: 'Peter',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    default: 'example@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    default: 'password',
  })
  @IsString()
  @MinLength(8)
  password: string;
}
