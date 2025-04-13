import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    email: string

    @IsString()
    name: string

    @IsOptional()
    @IsString()
    username?: string

    @IsOptional()
    @IsString()
    password?: string

}