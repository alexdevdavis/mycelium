import { IsShortString } from '../../common/decorators/validation.decorators';
import { IsString } from 'class-validator';

export class CreateBlogPostDto {
  @IsShortString()
  author: string;

  @IsShortString()
  tagline: string;

  @IsString()
  content: string;
}
