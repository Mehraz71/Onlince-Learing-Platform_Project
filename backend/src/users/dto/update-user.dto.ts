import { IsString, IsEmail, MinLength, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  
  password: string;

  @IsString()
  phone: string;

    @IsString()

  role: 'user' | 'manager' | 'instructor' | 'admin';

}
