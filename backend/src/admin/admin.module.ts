import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { User } from '../users/entities/user.entity';
import { Loan } from '../loans/entities/loan.entity';
import { ActivityLog } from '../activity-log/entities/activity-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Loan, ActivityLog])],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
