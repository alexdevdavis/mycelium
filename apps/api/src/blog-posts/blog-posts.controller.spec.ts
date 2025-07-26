import { Test, TestingModule } from '@nestjs/testing';
import { BlogPostsController } from './blog-posts.controller';
import { BlogPostsService } from './blog-posts.service';
import { seedBlogPosts } from '../../seeds/blog-posts.seed';
import { DataSource } from 'typeorm';
import { buildDataSourceOptions } from '../../src/config/typeorm.config';

describe('BlogPostsController', () => {
  let controller: BlogPostsController;
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = new DataSource(buildDataSourceOptions());
    await dataSource.initialize();
  });

  const mockBlogPostsRepository = {};

  beforeEach(async () => {
    await seedBlogPosts(dataSource);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogPostsController],
      providers: [BlogPostsService],
    })
      .overrideProvider(BlogPostsService)
      .useValue(mockBlogPostsRepository)
      .compile();

    controller = module.get<BlogPostsController>(BlogPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
