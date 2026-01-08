import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Address } from './address.entity';
import { Phone } from './phone.entity';
import { Employer } from './employer.entity';
import { Loan } from '../../loans/entities/loan.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 20, default: 'PF' })
  type: 'PF' | 'PJ';

  @Column({ nullable: true })
  document: string; // CPF or CNPJ

  @Column({
    type: 'varchar',
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToOne(() => Address, (address) => address.user, { cascade: true })
  address: Address;

  @OneToMany(() => Phone, (phone) => phone.user, { cascade: true })
  phones: Phone[];

  @OneToOne(() => Employer, (employer) => employer.user, { cascade: true })
  employer: Employer;

  @OneToMany(() => Loan, (loan) => loan.user)
  loans: Loan[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
