// import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  // @Type(() => Number) // no need for this because in main.ts ValidationPipe transformOptions.enableImplicitConversion = true
  limit: number;

  @IsOptional()
  @IsPositive()
  // @Type(() => Number) // no need for this because in main.ts ValidationPipe transformOptions.enableImplicitConversion = true
  offset: number;
}
