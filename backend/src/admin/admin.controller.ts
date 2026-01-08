import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { Paginate } from 'nestjs-paginate';
import type { PaginateQuery } from 'nestjs-paginate';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  getStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('users')
  getUsers(@Paginate() query: PaginateQuery) {
    return this.adminService.getUsers(query);
  }

  @Get('loans')
  getLoans(@Paginate() query: PaginateQuery) {
    return this.adminService.getLoans(query);
  }

  @Get('activity-logs')
  getActivityLogs(@Paginate() query: PaginateQuery) {
    return this.adminService.getActivityLogs(query);
  }

  @Patch('users/:id')
  updateUser(@Param('id') id: string, @Body() data: any) {
    return this.adminService.updateUserStatus(id, data);
  }

  @Patch('loans/:id/status')
  updateLoanStatus(
    @Param('id') id: string,
    @Body('status') status: 'APPROVED' | 'REJECTED' | 'PAID',
  ) {
    return this.adminService.updateLoanStatus(id, status);
  }
}
