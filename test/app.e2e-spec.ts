import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { DEMO_ACCESS_TOKEN, DEMO_CREDENTIALS } from '../src/auth/auth.constants';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/health (GET) should return status and x-request-id header', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect(({ body, headers }) => {
        expect(body).toEqual({ status: 'ok' });
        expect(headers['x-request-id']).toBeDefined();
      });
  });

  it('/health (GET) should reuse x-request-id when provided by client', () => {
    const externalRequestId = 'candidate-request-123';

    return request(app.getHttpServer())
      .get('/health')
      .set('x-request-id', externalRequestId)
      .expect(200)
      .expect(({ headers }) => {
        expect(headers['x-request-id']).toBe(externalRequestId);
      });
  });

  it('/auth/login (POST) should return token for valid credentials', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(DEMO_CREDENTIALS)
      .expect(201)
      .expect(({ body }) => {
        expect(body).toEqual({
          accessToken: DEMO_ACCESS_TOKEN,
          tokenType: 'Bearer',
        });
      });
  });

  it('/cases (GET) should return 401 without token', () => {
    return request(app.getHttpServer()).get('/cases').expect(401);
  });

  it('/cases (CRUD) should work when authenticated', async () => {
    const server = app.getHttpServer();
    const authHeader = `Bearer ${DEMO_ACCESS_TOKEN}`;

    const createResponse = await request(server)
      .post('/cases')
      .set('Authorization', authHeader)
      .send({
        title: 'Contract review for ACME',
        description: 'Review supplier contract terms',
        status: 'OPEN',
      })
      .expect(201);

    const createdCase = createResponse.body;

    await request(server)
      .get('/cases')
      .set('Authorization', authHeader)
      .expect(200)
      .expect(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        expect(body).toHaveLength(1);
        expect(body[0].id).toBe(createdCase.id);
      });

    await request(server)
      .get(`/cases/${createdCase.id}`)
      .set('Authorization', authHeader)
      .expect(200)
      .expect(({ body }) => {
        expect(body.id).toBe(createdCase.id);
        expect(body.title).toBe('Contract review for ACME');
      });

    await request(server)
      .put(`/cases/${createdCase.id}`)
      .set('Authorization', authHeader)
      .send({
        status: 'IN_PROGRESS',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.status).toBe('IN_PROGRESS');
      });

    await request(server)
      .delete(`/cases/${createdCase.id}`)
      .set('Authorization', authHeader)
      .expect(200);

    await request(server)
      .get('/cases')
      .set('Authorization', authHeader)
      .expect(200)
      .expect([]);
  });

  afterEach(async () => {
    await app.close();
  });
});
