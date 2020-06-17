import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegisterLoginUserDto {
    @MinLength(8)
    @MaxLength(256)
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(256)
    readonly password: string;
}