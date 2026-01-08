import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { LoansService } from './loans.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('loans')
@UseGuards(JwtAuthGuard)
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  create(@Request() req, @Body() body: { amount: number; installments: number; interestRate: number }) {
    return this.loansService.create({
      ...body,
      userId: req.user.id,
    });
  }

  @Get('my-loans')
  findMyLoans(@Request() req) {
    return this.loansService.findByUser(req.user.id);
  }
}
