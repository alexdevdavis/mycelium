import { buildDataSourceOptions } from '../src/config/typeorm.config';
import { DataSource } from 'typeorm';
import { seedBlogPosts } from './blog-posts.seed';

export async function runSeed(dataSource: DataSource): Promise<void> {
  try {
    await dataSource.initialize();
    await seedBlogPosts(dataSource);
  } catch (error) {
    void Promise.reject(new Error(`seeding failed: ${error}`));
  }
}

if (require.main === module) {
  const dataSource = new DataSource({
    ...buildDataSourceOptions(),
    dropSchema: true,
    synchronize: true,
  });
  runSeed(dataSource).catch((error) => {
    console.error('seed failed: ', error);
    process.exit(1);
  });
}
