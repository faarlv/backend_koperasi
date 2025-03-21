import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  NotFoundException,
  BadRequestException,
  Get,
  Param,
} from '@nestjs/common';
import { InstallmentService } from './installment.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PayInstallmentDto } from './dto/installment.dto';

@Controller('installments')
export class InstallmentController {
  constructor(private readonly installmentService: InstallmentService) {}

  @Post('pay')
  @UseGuards(JwtGuard)
  async payInstallment(@Body() dto: PayInstallmentDto, @Request() req) {
    return await this.installmentService.payInstallment(
      req.user.id,
      dto.loanId,
      dto.amountPaid,
    );
  }

  @Get('loan/:loanId')
  async getLoanInstallments(@Param('loanId') loanId: string) {
    try {
      return await this.installmentService.getLoanInstallments(loanId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException('Failed to fetch installments');
    }
  }
}
