import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    default: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  user_role_id: number;

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
    default: 'password',
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    default: 'example@gmail.com',
  })
  @IsEmail()
  email: string;
}
