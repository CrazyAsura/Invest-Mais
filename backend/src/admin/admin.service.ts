import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Loan } from '../loans/entities/loan.entity';
import { ActivityLog } from '../activity-log/entities/activity-log.entity';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
    @InjectRepository(ActivityLog)
    private readonly activityLogRepository: Repository<ActivityLog>,
  ) {}

  async getUsers(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.userRepository, {
      sortableColumns: ['id', 'email', 'name', 'createdAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['email', 'name'],
      relations: ['address', 'phones', 'employer'],
    });
  }

  async getLoans(query: PaginateQuery): Promise<Paginated<Loan>> {
    return paginate(query, this.loanRepository, {
      sortableColumns: ['id', 'amount', 'status', 'createdAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['status'],
      relations: ['user'],
    });
  }

  async getActivityLogs(query: PaginateQuery): Promise<Paginated<ActivityLog>> {
    return paginate(query, this.activityLogRepository, {
      sortableColumns: ['id', 'action', 'module', 'createdAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['action', 'module'],
      relations: ['user'],
    });
  }

  async getDashboardStats() {
    const totalUsers = await this.userRepository.count();
    const totalLoans = await this.loanRepository.count();
    const pendingLoans = await this.loanRepository.count({ where: { status: 'PENDING' } });
    const approvedLoans = await this.loanRepository.count({ where: { status: 'APPROVED' } });
    
    const totalLoanAmount = await this.loanRepository
      .createQueryBuilder('loan')
      .select('SUM(loan.amount)', 'total')
      .getRawOne();

    return {
      totalUsers,
      totalLoans,
      pendingLoans,
      approvedLoans,
      totalLoanAmount: parseFloat(totalLoanAmount.total || 0),
    };
  }

  async updateUserStatus(userId: string, data: any) {
    return this.userRepository.update(userId, data);
  }

  async updateLoanStatus(loanId: string, status: 'APPROVED' | 'REJECTED' | 'PAID') {
    return this.loanRepository.update(loanId, { status });
  }
}
