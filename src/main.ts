import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
