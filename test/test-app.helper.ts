import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { testDbConfig } from './test-db.helper';

/**
 * Erstellt eine NestJS Test-App mit Datenbank-Verbindung
 */
export async function createTestApp(moduleImports: any[]): Promise<{
  app: INestApplication;
  dataSource: DataSource;
}> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      TypeOrmModule.forRoot(testDbConfig),
      ...moduleImports,
    ],
  }).compile();

  const app = moduleFixture.createNestApplication();

  // Gleiche Konfiguration wie in main.ts
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api/v1');

  await app.init();

  const dataSource = app.get(DataSource);

  return { app, dataSource };
}
