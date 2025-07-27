import { Injectable } from '@nestjs/common';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogPost } from './entities/blog-post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogPostsService {
  constructor(
    @InjectRepository(BlogPost)
    private blogPostsRepository: Repository<BlogPost>,
  ) {}
  async create(createBlogPostDto: CreateBlogPostDto) {
    const blogPost = this.blogPostsRepository.create(createBlogPostDto);
    const createdBlogPost = await this.blogPostsRepository.save(blogPost);
    return { blogPost: createdBlogPost };
  }

  async findAll() {
    const blogPosts = await this.blogPostsRepository.find();
    return { blogPosts };
  }

  async findOne(id: number) {
    const [blogPost] = await this.blogPostsRepository.findBy({ id });
    return { blogPost };
  }

  update(id: number, updateBlogPostDto: UpdateBlogPostDto) {
    return `This action updates a #${id} blogPost`;
  }

  remove(id: number) {
    return `This action removes a #${id} blogPost`;
  }
}
