import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  post_title?: string;

  @IsString()
  post_description?: string;
}
