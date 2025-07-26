import { dataSourceOptions } from '../src/config/typeorm.config';
import { DataSource } from 'typeorm';
import { seedBlogPosts } from './blog-posts.seed';

async function runSeed() {
  const dataSource = new DataSource(dataSourceOptions);

  try {
    await dataSource.initialize();
    await seedBlogPosts(dataSource);
    await dataSource.destroy();
  } catch (error) {
    console.error(`😬 Error seeding:`, error);
    process.exit(1);
  }
}

runSeed().catch(() => console.log('seed failed'));
