import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  post_title: string;

  @IsString()
  @IsNotEmpty()
  post_description: string;
}
