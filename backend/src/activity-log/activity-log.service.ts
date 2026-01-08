import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog } from './entities/activity-log.entity';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLog)
    private readonly activityLogRepository: Repository<ActivityLog>,
  ) {}

  async create(data: Partial<ActivityLog>) {
    const log = this.activityLogRepository.create(data);
    return this.activityLogRepository.save(log);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<ActivityLog>> {
    return paginate(query, this.activityLogRepository, {
      sortableColumns: ['id', 'action', 'module', 'createdAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['action', 'module', 'details'],
      relations: ['user'],
    });
  }
}
