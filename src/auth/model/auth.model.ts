import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class AuthModel {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
