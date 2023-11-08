import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import BillingInfo from 'src/database/models/BillingInfo';
import { User } from 'src/database/models/User';
import { UserToken } from 'src/database/models/UserToken';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forFeature([User, UserToken, BillingInfo]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  exports: [SequelizeModule],
})
export class AuthModule {}
