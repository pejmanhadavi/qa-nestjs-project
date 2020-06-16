import { IsEmail, IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegisterLoginUserDto {
    @IsEmail()
    @MinLength(8)
    @MaxLength(256)
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(256)
    readonly password: string;
}