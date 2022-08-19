import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class userEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '유저 아이디' })
  id: number;

  @Column({ update: false })
  @ApiProperty({ description: '유저이름' })
  name: string;
}
