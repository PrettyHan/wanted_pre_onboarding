import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class companyEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @Column({ update: false })
  @ApiProperty({ description: '회사이름' })
  name: string;

  @Column()
  @ApiProperty({ description: '국가' })
  contry: string;

  @Column()
  @ApiProperty({ description: '지역' })
  region: string;
}
