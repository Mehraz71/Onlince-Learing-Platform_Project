import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInstructorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Bank', 'Bkash'])
  payment_method: 'Bank' | 'Bkash';

  @IsString()
  @IsNotEmpty()
  bank_acc: string;

  @IsNumber()
  salary: number;
}
