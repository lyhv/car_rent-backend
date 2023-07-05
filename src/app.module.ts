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
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { CarController } from './car/car.controller';
import { CarService } from './car/car.service';
import Car from './database/models/Car';
import CarImage from './database/models/CarImage';
import CarPrice from './database/models/CarPrice';
import CarType from './database/models/CarType';
import { AppExceptionsFilter } from './exception/http-exception.filter';
import { JsonContentTypeMiddleware } from './middleware/contenttype.middleware';
import { ResponseInterceptor } from './pipe/response.interceptor';
@Module({
  imports: [
    AuthModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'database_car_rent_development',
      define: {
        underscored: true,
        timestamps: false,
      },
      models: ['./database/models'],
      autoLoadModels: true,
      synchronize: true,
      logging: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    ConfigModule.forRoot(),
    SequelizeModule.forFeature([Car, CarType, CarImage, CarPrice]),
  ],
  controllers: [AppController, CarController],
  providers: [
    AppService,
    CarService,
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
    consumer.apply(JsonContentTypeMiddleware).forRoutes(AuthController);
  }
}
