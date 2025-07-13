import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  course_title: string;

  @IsString()
  course_instructor: string;

  @IsString()
  @IsNotEmpty()
  course_level: string;

  @IsString()
  @IsNotEmpty()
  course_duration: string;

  @IsNumber()
  @IsNotEmpty()
  course_price: number;

  @IsNumber()
  @IsNotEmpty()
  total_enrolled: number;
}
