
import { IsString, IsDateString, IsOptional, IsNumber } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  date: string;

  @IsString()
  event_start_time: string;

  @IsString()
  event_end_time: string;

  @IsOptional()
  @IsNumber()
  courseId?: number;
}
