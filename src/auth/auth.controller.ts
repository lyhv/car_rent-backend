import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { LoginAuth, RegisterUser } from 'src/auth/dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { BasicAuthGuard } from './auth.basic.gurard';

@Controller('auth')
@ApiTags('auth')
@UseGuards(BasicAuthGuard) // Apply the guard to all routes in this controller
@ApiBasicAuth()
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Post('login')
  public async login(@Body(new ValidationPipe()) loginAuth: LoginAuth) {
    return this.userService.login(loginAuth);
  }

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  public async register(@Body(new ValidationPipe()) register: RegisterUser) {
    return this.userService.register(register);
  }
}
