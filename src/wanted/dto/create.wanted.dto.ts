import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWantedDto {
  @ApiProperty({ description: '회사_id', required: true })
  @IsNotEmpty()
  readonly company_id: number;

  @ApiProperty({ description: '포지션', required: true })
  @IsNotEmpty()
  readonly position: string;

  @ApiProperty({ description: '채용보상금', required: true })
  @IsNotEmpty()
  readonly reward: number;

  @ApiProperty({ description: '채용내용', required: true })
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty({ description: '스킬', required: true })
  @IsNotEmpty()
  readonly skill: string;
}
