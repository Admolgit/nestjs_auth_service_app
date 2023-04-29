import {IsEmail, IsNotEmpty, IsEnum, IsString, IsNumber, MinLength} from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  @IsString()
  readonly fullName: string;

  @IsNotEmpty()
  @IsEmail({}, {message: 'Please enter valid email address'})
  readonly email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;
}