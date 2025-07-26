import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';
import { buildDataSourceOptions } from '../src/config/typeorm.config';
import { runSeed } from '../seeds';

describe('/api/v1/blog-posts (e2e)', () => {
  let app: INestApplication<App>;
  let dataSource: DataSource;

  beforeAll(() => {
    dataSource = new DataSource({
      ...buildDataSourceOptions(),
      dropSchema: true,
      synchronize: true,
    });
  });

  beforeEach(async () => {
    await runSeed(dataSource);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  });

  it('200: /api/v1/blog-posts (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/blog-posts')
      .expect(200)
      .then(({ body: { blogPosts } }) => {
        expect(blogPosts).toHaveLength(2);
      });
  });
});
