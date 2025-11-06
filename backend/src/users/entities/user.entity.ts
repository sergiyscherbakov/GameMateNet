import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Match } from '../../matches/entities/match.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column('simple-array', { nullable: true })
  games: string[];

  @Column({ nullable: true })
  discord: string;

  @Column({ nullable: true })
  telegram: string;

  @Column({ default: 'beginner' })
  skillLevel: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Match, match => match.creator)
  createdMatches: Match[];
}
