import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of the coffee' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The brand of the coffee' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: [] })
  @IsArray()
  @IsString({ each: true })
  readonly flavors: string[];
}
