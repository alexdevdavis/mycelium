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
  describe('GET /api/v1/blog-posts', () => {
    it('200: responds with a list of all of blog posts', () => {
      return request(app.getHttpServer())
        .get('/api/v1/blog-posts')
        .expect(200)
        .then(
          ({ body: { blogPosts } }: { body: { blogPosts: BlogPost[] } }) => {
            expect(blogPosts).toHaveLength(2);
            blogPosts.forEach(
              ({ id, author, tagline, content, created_at, updated_at }) => {
                expect(typeof id).toBe('number');
                expect(typeof author).toBe('string');
                expect(typeof tagline).toBe('string');
                expect(typeof content).toBe('string');
                expect(new Date(created_at).toISOString()).toEqual(created_at);
                expect(new Date(updated_at).toISOString()).toEqual(updated_at);
              },
            );
          },
        );
    });
  });

  describe('GET /api/v1/blog-posts/:id', () => {
    it('200: responds with associated blog post when param is an existing blog-post id', () => {
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
