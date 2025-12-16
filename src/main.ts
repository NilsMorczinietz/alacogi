import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );
  
  app.setGlobalPrefix('api/v1');
  
  // Swagger/OpenAPI Configuration
  const config = new DocumentBuilder()
    .setTitle('Alacogi API')
    .setDescription('API Dokumentation für Alacogi')
    .setVersion('1.0')
    .addTag('users')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  await app.listen(3000);
  console.log('Server läuft auf http://localhost:3000/api/v1');
  console.log('API Dokumentation verfügbar unter http://localhost:3000/api/docs');
}
bootstrap();
