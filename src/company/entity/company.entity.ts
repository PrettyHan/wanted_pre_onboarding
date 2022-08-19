import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class companyEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @Column({ update: false })
  @Index({ fulltext: true })
  @ApiProperty({ description: '회사이름' })
  name: string;

  @Column()
  @Index({ fulltext: true })
  @ApiProperty({ description: '국가' })
  country: string;

  @Column()
  @Index({ fulltext: true })
  @ApiProperty({ description: '지역' })
  region: string;
}
