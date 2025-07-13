import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCourseDto {
  @IsString()
  course_title?: string;

  @IsString()
  course_instructor?: string;

  @IsString()
  course_level?: string;

  @IsString()
  course_duration?: string;

  @IsNumber()
  course_price?: number;

  @IsNumber()
  total_enrolled?: number;
}
