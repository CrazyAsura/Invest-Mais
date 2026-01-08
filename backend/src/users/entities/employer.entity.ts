import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('employers')
export class Employer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  role: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monthlyIncome: number;

  @Column({ nullable: true })
  admissionDate: Date;

  @OneToOne(() => User, (user) => user.employer)
  @JoinColumn()
  user: User;
}
