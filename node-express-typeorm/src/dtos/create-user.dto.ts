import { IsEmail, IsEnum, IsNotEmpty, IsString, Max, Min } from "class-validator";
import { Role } from "src/entity/User";

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
    @Min(8)
    @Max(13)
    password: string;

    @IsEnum(Role)
    role: Role;
}