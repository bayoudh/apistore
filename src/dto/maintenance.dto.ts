import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, IsUUID, IsDateString, IsNumber, Min } from "class-validator";
import { MaintenanceStatus } from "../utils/constants";
import { Type } from "class-transformer";

export class CreateMaintenanceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(MaintenanceStatus)
  @IsOptional()
  status?: MaintenanceStatus;

  @IsUUID()
  @IsNotEmpty()
  softwareId: string;

  @IsUUID()
  @IsOptional()
  assignedToId?: string;

  @IsDateString()
  @IsNotEmpty()
  scheduledDate: string;

  @IsDateString()
  @IsOptional()
  completedDate?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  estimatedHours?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  actualHours?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateMaintenanceDto {
  @IsString()
  @IsOptional()
  @MaxLength(200)
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(MaintenanceStatus)
  @IsOptional()
  status?: MaintenanceStatus;

  @IsUUID()
  @IsOptional()
  softwareId?: string;

  @IsUUID()
  @IsOptional()
  assignedToId?: string;

  @IsDateString()
  @IsOptional()
  scheduledDate?: string;

  @IsDateString()
  @IsOptional()
  completedDate?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  estimatedHours?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  actualHours?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
