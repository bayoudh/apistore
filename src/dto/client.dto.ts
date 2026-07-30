import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, IsPhoneNumber } from "class-validator";

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  companyName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  contactFirstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  contactLastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  address?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  city?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  country?: string;
}

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  companyName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  contactFirstName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  contactLastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  address?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  city?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  country?: string;
}
