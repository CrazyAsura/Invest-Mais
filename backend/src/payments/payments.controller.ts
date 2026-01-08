import {
  Controller,
  Post,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('payments')
@Controller('payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-intent')
  @ApiOperation({ summary: 'Criar um Payment Intent no Stripe' })
  async createIntent(@Body() data: { amount: number }) {
    if (!data.amount || data.amount <= 0) {
      throw new BadRequestException('Valor inválido para o pagamento');
    }

    try {
      return await this.paymentsService.createPaymentIntent(data.amount);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Erro no processamento do pagamento';
      throw new BadRequestException(message);
    }
  }
}
