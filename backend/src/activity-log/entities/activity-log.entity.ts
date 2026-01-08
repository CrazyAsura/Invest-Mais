import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../..//users/entities/user.entity';

@Entity('activity_logs')
export class ActivityLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  action: string;

  @Column({ nullable: true })
  module: string;

  @Column({ type: 'text', nullable: true })
  details: string;

  @Column({ nullable: true })
  ip: string;

  @Column({ nullable: true })
  method: string;

  @Column({ nullable: true })
  path: string;

  @ManyToOne(() => User, { nullable: true })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
