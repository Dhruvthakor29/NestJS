import { IsEmail, IsNotEmpty, IsString , } from 'class-validator';

export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    fname : string;

    @IsString() 
    @IsNotEmpty()
    lname : string;

    @IsEmail()
    @IsNotEmpty()
    email : string;

    @IsNotEmpty()
    @IsString()
    password : string;    
      
}

      
