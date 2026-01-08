import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './entities/loan.entity';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
  ) {}

  async create(data: { amount: number; installments: number; userId: string; interestRate: number }) {
    const loan = this.loanRepository.create({
      amount: data.amount,
      installments: data.installments,
      interestRate: data.interestRate,
      user: { id: data.userId } as any,
      status: 'PENDING',
    });
    return this.loanRepository.save(loan);
  }

  async findByUser(userId: string) {
    return this.loanRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }
}
