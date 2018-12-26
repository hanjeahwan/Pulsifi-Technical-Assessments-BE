import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class AuthModel {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
