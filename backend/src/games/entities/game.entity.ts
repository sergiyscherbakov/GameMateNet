import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  icon: string;

  @Column('simple-array')
  platforms: string[];

  @Column('simple-array', { nullable: true })
  genres: string[];

  @Column({ default: 0 })
  popularity: number;

  @CreateDateColumn()
  createdAt: Date;
}
