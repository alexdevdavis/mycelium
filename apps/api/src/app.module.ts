import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { BlogPostsModule } from './blog-posts/blog-posts.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        path.resolve(
          __dirname,
          `../../env.${process.env.NODE_ENV ?? 'development'}`,
        ),
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    BlogPostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
