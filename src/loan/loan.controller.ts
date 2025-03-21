import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { LoanService } from './loan.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RequestLoanDto } from './dto/loan.dto';
import { LoanStatus } from '@prisma/client';

@Controller('loan')
export class LoanController {
  constructor(private loanService: LoanService) {}

  @Post('request')
  @UseGuards(JwtGuard)
  async requestLoan(@Request() req, @Body() dto: RequestLoanDto) {
    return this.loanService.requestLoan(req.user.id, dto);
  }

  /** 📜 Get all loans (Admin) */
  @Get('all')
  async getAllLoans() {
    return this.loanService.getAllLoans();
  }

  /** 👤 Get user’s loan history */
  @Get('history')
  @UseGuards(JwtGuard)
  async getUserLoans(@Request() req) {
    return this.loanService.getUserLoans(req.user.id);
  }

  @Patch(':id/status')
  async updateLoanStatus(
    @Param('id') loanId: string,
    @Body() body: { status: string }, // Change from LoanStatus to string
  ) {
    const status = body.status as LoanStatus; // Convert string to enum

    if (!Object.values(LoanStatus).includes(status)) {
      throw new BadRequestException('Invalid status update');
    }

    return this.loanService.updateLoanStatus(loanId, status);
  }

  @Patch(':id/ongoing')
  async markLoanOngoing(@Param('id') loanId: string) {
    return this.loanService.markLoanOngoing(loanId);
  }

  @Patch(':id/complete')
  async completeLoan(@Param('id') loanId: string) {
    return this.loanService.completeLoan(loanId);
  }
}
