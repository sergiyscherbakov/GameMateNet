import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  gameId: string;

  @Column()
  gameName: string;

  @Column()
  platform: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  skillLevel: string;

  @Column({ type: 'int' })
  playersNeeded: number;

  @Column({ type: 'timestamp' })
  scheduledTime: Date;

  @Column({ default: 'open' })
  status: string;

  @ManyToOne(() => User, user => user.createdMatches)
  @JoinColumn({ name: 'creatorId' })
  creator: User;

  @Column()
  creatorId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
