import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { BlogPost } from '../blog-posts/entities/blog-post.entity';
import { config } from 'dotenv';
import { sync } from 'find-up';

const targetFile = `.env.${process.env.NODE_ENV ?? 'development'}`;
const envPath = sync(targetFile, { cwd: __dirname });

config({ path: envPath });

export function buildDataSourceOptions(): DataSourceOptions {
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT ?? 5433),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'mycelium',
    entities: [BlogPost],
  };
}

export const typeOrmConfig: TypeOrmModuleOptions = {
  ...buildDataSourceOptions(),
  autoLoadEntities: true,
};
