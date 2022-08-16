import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class wantedEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @Column()
  @ApiProperty({ description: '포지션' })
  position: string;

  @Column()
  @ApiProperty({ description: '채용보상금' })
  reward: number;

  @Column()
  @ApiProperty({ description: '채용내용' })
  content: string;

  @Column()
  @ApiProperty({ description: '사용스킬' })
  skill: string;
}
