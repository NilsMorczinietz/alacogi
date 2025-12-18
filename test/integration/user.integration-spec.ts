import { INestApplication } from '@nestjs/common';
import { Server } from 'http';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { UserModule } from '../../src/modules/user/user.module';
import { createTestApp } from '../test-app.helper';
import { clearDatabase } from '../test-db.helper';

describe('User Integration Tests', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let authToken: string;

  beforeAll(async () => {
    const testSetup = await createTestApp([AuthModule, UserModule]);
    app = testSetup.app;
    dataSource = testSetup.dataSource;
  });

  beforeEach(async () => {
    await clearDatabase(dataSource);

    const registerResponse = await request(app.getHttpServer() as Server)
      .post('/api/v1/auth/register')
      .send({
        email: 'test@example.com',
        password: 'SecurePass123!',
        name: 'Max Mustermann',
      });

    authToken = registerResponse.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /api/v1/users', () => {
    it('sollte alle Benutzer zurückgeben', async () => {
      const response = await request(app.getHttpServer() as Server)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0].email).toBe('test@example.com');
    });

    it('sollte ohne Token einen 401 Fehler zurückgeben', async () => {
      await request(app.getHttpServer() as Server)
        .get('/api/v1/users')
        .expect(401);
    });
  });

  describe('GET /api/v1/users/me', () => {
    it('sollte das eigene Profil zurückgeben', async () => {
      const response = await request(app.getHttpServer() as Server)
        .get('/api/v1/users/me')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.email).toBe('test@example.com');
      expect(response.body.name).toBe('Max Mustermann');
      expect(response.body).not.toHaveProperty('password');
    });

    it('sollte ohne Token einen 401 Fehler zurückgeben', async () => {
      await request(app.getHttpServer() as Server)
        .get('/api/v1/users/me')
        .expect(401);
    });
  });
});
