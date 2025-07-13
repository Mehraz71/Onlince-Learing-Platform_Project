import { IsNotEmpty, IsString } from "class-validator";

export class CreateStudnetDto{
    @IsString()
    @IsNotEmpty()
    name:string;

      @IsString()
    @IsNotEmpty()
    email: string;

}