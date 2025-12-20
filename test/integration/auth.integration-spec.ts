import { INestApplication } from '@nestjs/common';
import { Server } from 'http';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { UserModule } from '../../src/modules/user/user.module';
import { createTestApp } from '../test-app.helper';
import { clearDatabase } from '../test-db.helper';

describe('Auth Integration Tests', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const testSetup = await createTestApp([AuthModule, UserModule]);
    app = testSetup.app;
    dataSource = testSetup.dataSource;
  });

  beforeEach(async () => {
    await clearDatabase(dataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/v1/auth/register', () => {
    it('sollte einen neuen Benutzer registrieren', async () => {
      const registerData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
        name: 'Max Mustermann',
      };

      const response = await request(app.getHttpServer() as Server)
        .post('/api/v1/auth/register')
        .send(registerData)
        .expect(201);

      expect(response.body).toHaveProperty('access_token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.id).toBeDefined();
      expect(response.body.user.email).toBe(registerData.email);
      expect(response.body.user.name).toBe(registerData.name);
      expect(response.body.user.permissions).toEqual([]);
      expect(response.body.user).not.toHaveProperty('password');
    });

    it('sollte bei doppelter Email einen Fehler zurückgeben', async () => {
      const registerData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
        name: 'Max Mustermann',
      };

      await request(app.getHttpServer() as Server)
        .post('/api/v1/auth/register')
        .send(registerData)
        .expect(201);

      await request(app.getHttpServer() as Server)
        .post('/api/v1/auth/register')
        .send(registerData)
        .expect(409);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('sollte einen Benutzer einloggen', async () => {
      const registerData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
        name: 'Max Mustermann',
      };

      await request(app.getHttpServer() as Server)
        .post('/api/v1/auth/register')
        .send(registerData);

      const loginData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
      };

      const response = await request(app.getHttpServer() as Server)
        .post('/api/v1/auth/login')
        .send(loginData)
        .expect(201);

      expect(response.body).toHaveProperty('access_token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.id).toBeDefined();
      expect(response.body.user.email).toBe(loginData.email);
      expect(response.body.user.permissions).toEqual([]);
    });

    it('sollte bei falschen Anmeldedaten einen Fehler zurückgeben', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'WrongPassword123!',
      };

      await request(app.getHttpServer() as Server)
        .post('/api/v1/auth/login')
        .send(loginData)
        .expect(401);
    });
  });
});
