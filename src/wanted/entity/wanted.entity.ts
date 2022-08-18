import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { companyEntity } from 'src/company/entity/company.entity';
@Entity()
export class wantedEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @Column({ update: false })
  @ApiProperty({ description: '회사 id' })
  company_id: number;

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

  @ManyToOne(() => companyEntity, (companyEntity) => companyEntity.id)
  @JoinColumn({ name: 'company_id' })
  company: companyEntity[];
}
