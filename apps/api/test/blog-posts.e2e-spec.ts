import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, VersioningType } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';
import { buildDataSourceOptions } from '../src/config/typeorm.config';
import { runSeed } from '../seeds';
import { BlogPost } from 'src/blog-posts/entities/blog-post.entity';

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
    app.enableVersioning({
      type: VersioningType.URI,
      prefix: 'api/v',
      defaultVersion: '1',
    });

    await app.init();
  });

  afterEach(async () => {
    await app.close();
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  });
  describe('200: /api/v1/blog-posts (GET)', () => {
    it('reponds with a list of all of blog posts', () => {
      return request(app.getHttpServer())
        .get('/api/v1/blog-posts')
        .expect(200)
        .then(
          ({ body: { blogPosts } }: { body: { blogPosts: BlogPost[] } }) => {
            expect(blogPosts).toHaveLength(2);
            blogPosts.forEach((bp) => {
              expect(bp).toMatchObject({
                id: expect.any(Number),
                author: expect.any(String),
                tagline: expect.any(String),
                content: expect.any(String),
                created_at: new Date(bp.created_at).toISOString(),
                updated_at: new Date(bp.created_at).toISOString(),
              });
            });
          },
        );
    });
  });

  describe('200: /:id (GET)', () => {
    it('responds with associated blog post when param is an existing blog-post id', () => {
      return request(app.getHttpServer())
        .get('/api/v1/blog-posts/1')
        .expect(200)
        .then(({ body: { blogPost } }: { body: { blogPost: BlogPost } }) => {
          expect(blogPost).toMatchObject({
            id: 1,
            author: 'fun guy 3000',
            tagline: 'learning about turborepo',
            content:
              "I think this is how I'm going to build all my full stack TS projects from now on",
          });
        });
    });
  });
});
