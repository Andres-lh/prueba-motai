import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Italika 250z' })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example:
      'La moto Italika 250z está diseñada para quienes buscan una combinación de potencia, diseño deportivo y versatilidad en la conducción',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 15000000 })
  @IsNumber()
  price: number;
}
