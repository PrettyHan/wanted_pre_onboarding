import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class wantedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: string;

  @Column({ default: '' })
  reward: number;

  @Column({ default: '' })
  content: string;

  @Column({ default: '' })
  skill: string;
}
