import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, IsDateString } from "class-validator";

export class CreateSoftwareDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  description?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  version: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  vendor: string;

  @IsDateString()
  @IsOptional()
  releaseDate?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateSoftwareDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  version?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  vendor?: string;

  @IsDateString()
  @IsOptional()
  releaseDate?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
