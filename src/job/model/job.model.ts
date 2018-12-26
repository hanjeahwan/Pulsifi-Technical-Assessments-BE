import { IsString, IsEmail, IsInt } from 'class-validator';

export class UserModel {

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    name: string;

}
