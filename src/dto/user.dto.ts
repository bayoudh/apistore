import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Roles } from "../utils/constants";
import { Exclude, Expose } from "class-transformer";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(Roles)
  @IsNotEmpty()
  role: Roles;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  firstName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  password?: string;

  @IsEnum(Roles)
  @IsOptional()
  role?: Roles;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;
}
