import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { userEntity } from '../../user/entity/user.entity';
import { wantedEntity } from '../../wanted/entity/wanted.entity';
@Entity()
export class applicationEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @Column({ update: false })
  @ApiProperty({ description: '사용자 id' })
  user_id: number;

  @Column({ update: false })
  @ApiProperty({ description: '채용공고 id' })
  wanted_id: number;

  @ManyToOne(() => userEntity, (userEntity) => userEntity.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @ApiProperty({ description: '지원한 유저 정보' })
  user: userEntity[];

  @ManyToOne(() => wantedEntity, (wantedEntity) => wantedEntity.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'wanted_id', referencedColumnName: 'id' })
  @ApiProperty({ description: '지원한 채용공고 정보' })
  wanted: wantedEntity[];
}
