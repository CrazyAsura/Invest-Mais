import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('phones')
export class Phone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ddi: string;

  @Column()
  ddd: string;

  @Column()
  number: string;

  @Column({ type: 'varchar', default: 'MOBILE' })
  type: 'MOBILE' | 'LANDLINE';

  @ManyToOne(() => User, (user) => user.phones)
  user: User;
}
