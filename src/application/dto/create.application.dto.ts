import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class createApplicationDto {
  @ApiProperty({ description: '사용자id', required: true })
  @IsNotEmpty()
  readonly user_id: number;

  @ApiProperty({ description: '채용공고id', required: true })
  @IsNotEmpty()
  readonly wanted_id: number;
}
