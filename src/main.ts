import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
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
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
