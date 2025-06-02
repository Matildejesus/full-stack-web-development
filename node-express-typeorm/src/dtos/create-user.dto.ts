import { IsEmail, IsEnum, IsNotEmpty, IsString, Length, Max, Min } from "class-validator";
import { Role } from "../entity/User";

export class CreateUserDTO {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @Length(8,13,{
        message: 'Password must be between 8 and 13 characters long',
    })
    password: string;

    @IsEnum(Role)
    role: Role;


}