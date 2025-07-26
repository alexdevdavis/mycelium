import { buildDataSourceOptions } from '../src/config/typeorm.config';
import { DataSource } from 'typeorm';
import { seedBlogPosts } from './blog-posts.seed';

export async function runSeed(dataSource: DataSource): Promise<void> {
  try {
    console.log('initialising database connection');
    await dataSource.initialize();
    console.log('seeding data');
    await seedBlogPosts(dataSource);
  } catch (error) {
    void Promise.reject(new Error(`seeding failed: ${error}`));
  } finally {
    console.log('closing database connection');
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
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
