import { BlogPost } from 'src/blog-posts/entities/blog-post.entity';

export const blogPostSeedData: Partial<BlogPost>[] = [
  {
    author: 'fun guy 3000',
    tagline: 'learning about turborepo',
    content:
      "I think this is how I'm going to build all my full stack TS projects from now on",
  },
  {
    author: 'truffle',
    tagline: 'NestJS for apis',
    content: "It's like Spring Boot, but without that 'trespassy' feeling",
  },
];
