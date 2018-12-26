import { IsString, IsEmail, IsInt, IsNotEmpty } from 'class-validator';

export class UserModel {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    name: string;

}
