import { DataSource, DataSourceOptions } from 'typeorm';
import { BlogPost } from '../src/blog-posts/entities/blog-post.entity';
import { blogPostSeedData } from './data';

export async function seedBlogPosts(dataSource: DataSource) {
  const repo = dataSource.getRepository(BlogPost);

  await repo.deleteAll();

  const result = await repo.save(blogPostSeedData);
  console.log(result, '<-- seeded data save output');
}
