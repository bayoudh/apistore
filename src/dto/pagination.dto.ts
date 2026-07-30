import { IsNumber, IsOptional, IsString, Min, Max, IsIn } from "class-validator";
import { Type } from "class-transformer";

export class PaginationDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 10;

  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  sortBy?: string;

  @IsString()
  @IsIn(["ASC", "DESC"])
  @IsOptional()
  sortOrder?: "ASC" | "DESC" = "ASC";
}
