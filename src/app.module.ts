import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './auth/google.strategy';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ResponseInterceptor } from './pipe/response.interceptor';
import { AuthController } from './auth/auth.controller';
import { JsonContentTypeMiddleware } from './middleware/contenttype.middleware';
import { CarsModule } from './cars/cars.module';
import { CustomersModule } from './customers/customers.module';
import { RentalModule } from './rental/rental.module';
@Module({
  imports: [
    AuthModule,
    PassportModule.register({ defaultStrategy: 'google' }),
    CarsModule,
    CustomersModule,
    RentalModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    GoogleStrategy,
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => new ResponseInterceptor(),
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JsonContentTypeMiddleware).forRoutes(AuthController);
  }
}
