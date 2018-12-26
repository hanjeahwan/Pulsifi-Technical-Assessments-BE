import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class JobModel {
    
    readonly id: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    breif: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    @IsInt()
    status: number;
}
