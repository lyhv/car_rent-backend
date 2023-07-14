import { CanActivate } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { BasicAuthGuard } from './auth/auth.basic.guard';
import { AuthenticationGuard } from './auth/auth.bearer.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const guards: CanActivate[] = [];
  if (process.env.ENABLE_BASIC_AUTH === 'true') {
    guards.push(app.get(BasicAuthGuard));
  }
  guards.push(app.get(AuthenticationGuard));
  app.useGlobalGuards(...guards);

  // Create a Swagger document options
  const config = new DocumentBuilder()
    .setTitle('Car API')
    .setVersion('1.0')
    .addBearerAuth()
    .addBasicAuth()
    .build();

  // Create a Swagger document
  const document = SwaggerModule.createDocument(app, config);

  // Set up Swagger UI
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
