import { Controller, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthPayloadToken } from 'src/auth/auth.service';
import { Private } from 'src/auth/public.decorator';
import { UsersService } from './users.service';

@Controller('')
@ApiTags('users')
@ApiBearerAuth()
@Private()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('user/billings')
  findOneBillingInfo(@Req() request) {
    const payload: AuthPayloadToken = request['token_payload'];
    return this.usersService.findAllBillingInfo(payload.user_id);
  }
}
