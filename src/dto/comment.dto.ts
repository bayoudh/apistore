import { IsNotEmpty, IsOptional, IsString, MaxLength, IsUUID } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUUID()
  @IsNotEmpty()
  ticketId: string;

  @IsUUID()
  @IsOptional()
  userId?: string;
}
