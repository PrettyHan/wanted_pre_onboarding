import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ description: '회사이름', required: true })
  @IsNotEmpty()
  readonly name: number;

  @ApiProperty({ description: '국가', required: true })
  @IsNotEmpty()
  readonly contry: string;

  @ApiProperty({ description: '지역', required: true })
  @IsNotEmpty()
  readonly region: number;
}
