import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  deadline: string;

  
}
