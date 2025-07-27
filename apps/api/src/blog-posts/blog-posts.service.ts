import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(id: number, updateBlogPostDto: UpdateBlogPostDto) {
    const updatedBlogPost = await this.blogPostsRepository.preload({
      id,
      ...updateBlogPostDto,
    });
    if (!updatedBlogPost) {
      throw new NotFoundException('blog post not found');
    }
    const blogPost = await this.blogPostsRepository.save(updatedBlogPost);
    return { blogPost };
  }

  async remove(id: number) {
    await this.blogPostsRepository.delete({ id });
    return;
  }
}
