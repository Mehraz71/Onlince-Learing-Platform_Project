import { IsNotEmpty, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  class_start_time: string;

  @IsString()
  class_end_time: string;
}
