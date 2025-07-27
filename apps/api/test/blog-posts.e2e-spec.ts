import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, VersioningType } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';
import { buildDataSourceOptions } from '../src/config/typeorm.config';
import { runSeed } from '../seeds';
import { BlogPost } from 'src/blog-posts/entities/blog-post.entity';
import { CreateBlogPostDto } from 'src/blog-posts/dto/create-blog-post.dto';

describe('/api/v1/blog-posts (e2e)', () => {
  let app: INestApplication<App>;
  let dataSource: DataSource;

  type ResponseKeys = 'blogPost' | 'blogPosts';
  type ApiResponse<Key extends ResponseKeys, Data> = {
    body: { [P in Key]: Data };
  };
  type SingleBlogPostResponse = ApiResponse<'blogPost', BlogPost>;
  type MultipleBlogPostsResponse = ApiResponse<'blogPosts', BlogPost[]>;

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
    it('200: responds with a list of all of blog posts', async () => {
      // todo: ask about the unsafe array destructuring here
      const {
        body: { blogPosts },
      }: MultipleBlogPostsResponse = await request(app.getHttpServer())
        .get('/api/v1/blog-posts')
        .expect(200);
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
    });
  });

  describe('GET /api/v1/blog-posts/:id', () => {
    it('200: responds with associated blog post when param is an existing blog-post id', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/blog-posts/1')
        .expect(200);
      const { blogPost } = response.body as SingleBlogPostResponse['body'];
      expect(blogPost).toMatchObject({
        id: 1,
        author: 'fun guy 3000',
        tagline: 'learning about turborepo',
        content:
          "I think this is how I'm going to build all my full stack TS projects from now on",
      });
    });
  });

  describe('POST /api/v1/blog-posts/', () => {
    it('201: responds with created blog post when posted JSON satisfies CreateBlogPostDTO', async () => {
      const blogToPost: CreateBlogPostDto = {
        author: 'The Node',
        tagline: 'Help with environment variables',
        content:
          'Hello, everyone. Can someone please help me share this api key across my whole monorepo: 5UP3RS3CR37-K3Y. Really appreciate it, thank you 🙏',
      };
      const response = await request(app.getHttpServer())
        .post('/api/v1/blog-posts')
        .send(blogToPost)
        .expect(201);
      const { blogPost } = response.body as SingleBlogPostResponse['body'];
      expect(typeof blogPost.id).toBe('number');
      expect(blogPost).toMatchObject({
        ...blogToPost,
        created_at: new Date(blogPost.created_at).toISOString(),
        updated_at: new Date(blogPost.updated_at).toISOString(),
      });
    });
  });

  describe('PATCH /api/v1/blog-posts/:id', () => {
    it('201: responds with updated blog post when posted JSON satisfies UpdateBlogPostDTO', async () => {
      const targetBlogPostID = 1;
      const targetKey = 'author';
      const authorUpdate = 'fun guy 4000';
      const patchedAuthorResponse = await request(app.getHttpServer())
        .patch(`/api/v1/blog-posts/${targetBlogPostID}`)
        .send({ [targetKey]: authorUpdate })
        .expect(200);

      console.log(patchedAuthorResponse.body);

      const { blogPost } =
        patchedAuthorResponse.body as SingleBlogPostResponse['body'];
      expect(blogPost.author).toBe(authorUpdate);
      expect(blogPost.id).toBe(targetBlogPostID);
    });
  });
});
