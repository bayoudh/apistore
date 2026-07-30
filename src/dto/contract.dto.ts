import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, IsUUID, IsDateString, IsNumber, Min } from "class-validator";
import { ContractStatus } from "../utils/constants";
import { Type } from "class-transformer";

export class CreateContractDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ContractStatus)
  @IsOptional()
  status?: ContractStatus;

  @IsUUID()
  @IsNotEmpty()
  clientId: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  contractType?: string;

  @IsString()
  @IsOptional()
  terms?: string;
}

export class UpdateContractDto {
  @IsString()
  @IsOptional()
  @MaxLength(200)
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ContractStatus)
  @IsOptional()
  status?: ContractStatus;

  @IsUUID()
  @IsOptional()
  clientId?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  value?: number;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  contractType?: string;

  @IsString()
  @IsOptional()
  terms?: string;
}
