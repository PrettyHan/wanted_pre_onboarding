import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { companyEntity } from '../../company/entity/company.entity';
@Entity()
export class wantedEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @Column({ update: false })
  @ApiProperty({ description: '회사 id' })
  company_id: number;

  @Column()
  @Index({ fulltext: true })
  @ApiProperty({ description: '포지션' })
  position: string;

  @Column()
  @ApiProperty({ description: '채용보상금' })
  reward: number;

  @Column()
  @Index({ fulltext: true })
  @ApiProperty({ description: '채용내용' })
  content: string;

  @Column()
  @Index({ fulltext: true })
  @ApiProperty({ description: '사용스킬' })
  skill: string;

  @Column('simple-array', { nullable: true })
  @ApiProperty({ description: '회사가 올린 다른 채용공고' })
  otherWanted: number[];

  @ManyToOne(() => companyEntity, (companyEntity) => companyEntity.id, {})
  @JoinColumn({ name: 'company_id', referencedColumnName: 'id' })
  @ApiProperty({ description: '채용공고 회사 정보' })
  company: companyEntity[];
}
