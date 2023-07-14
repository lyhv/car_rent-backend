import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { CarController } from './car/car.controller';
import { CarService } from './car/car.service';
import { AppExceptionsFilter } from './common/http-exception.filter';
import { ResponseInterceptor } from './common/response.interceptor';
import { configuration } from './config/configuration';
import BillingInfo from './database/models/BillingInfo';
import Car from './database/models/Car';
import CarImage from './database/models/CarImage';
import CarPrice from './database/models/CarPrice';
import CarType from './database/models/CarType';
import Location from './database/models/Location';
import Payment from './database/models/Payment';
import PaymentMethod from './database/models/PaymentMethod';
import PaymentStatus from './database/models/PaymentStatus';
import Rental from './database/models/Rental';
import RentalStatus from './database/models/RentalStatus';
import User from './database/models/User';
import UserToken from './database/models/UserToken';
import { RentalController } from './rental/rental.controller';
import { RentalService } from './rental/rental.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
const dbConfig = configuration();
@Module({
  imports: [
    AuthModule,
    SequelizeModule.forRoot({
      dialect: dbConfig.dialect,
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      define: {
        underscored: true,
        timestamps: false,
      },
      models: ['./database/models'],
      autoLoadModels: true,
      synchronize: false,
      logging: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    SequelizeModule.forFeature([
      Car,
      CarType,
      CarImage,
      CarPrice,
      Rental,
      RentalStatus,
      User,
      UserToken,
      Payment,
      Location,
      PaymentMethod,
      PaymentStatus,
      BillingInfo,
    ]),
  ],
  controllers: [
    AppController,
    UsersController,
    CarController,
    RentalController,
  ],
  providers: [
    AuthService,
    AppService,
    CarService,
    RentalService,
    UsersService,
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => new ResponseInterceptor(),
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: AppExceptionsFilter,
    },
  ],
  exports: [SequelizeModule, JwtModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(JsonContentTypeMiddleware).forRoutes(AuthController);
  }
}
