import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoanStatus } from '@prisma/client';
import { RequestLoanDto } from './dto/loan.dto';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}

  /** 📝 User requests a loan */
  async requestLoan(userId: string, dto: RequestLoanDto) {
    return await this.prisma.loan.create({
      data: {
        userId,
        amount: dto.amount,
        duration: dto.duration,
        remainingMonths: dto.duration,
        purpose: dto.purpose,
        status: LoanStatus.PENDING,
        images: {
          create: dto.images.map((url) => ({ url })),
        },
      },
      include: { images: true },
    });
  }

  /** 📜 Get all loans (Admin) */
  async getAllLoans() {
    return await this.prisma.loan.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        installments: true,
        images: true,
      },
    });
  }

  /** 👤 Get user’s loan history */
  async getUserLoans(userId: string) {
    return await this.prisma.loan.findMany({
      where: { userId },
      include: { installments: true, images: true },
    });
  }

  /** ✅ Approve or Reject Loan */
  async updateLoanStatus(loanId: string, status: LoanStatus) {
    const loan = await this.prisma.loan.findUnique({ where: { id: loanId } });
    if (!loan) throw new NotFoundException('Loan not found');

    if (loan.status !== LoanStatus.PENDING) {
      throw new BadRequestException('Loan already processed');
    }

    return await this.prisma.loan.update({
      where: { id: loanId },
      data: { status },
    });
  }

  /** 🔄 Mark Loan as Ongoing */
  async markLoanOngoing(loanId: string) {
    const loan = await this.prisma.loan.findUnique({ where: { id: loanId } });
    if (!loan) throw new NotFoundException('Loan not found');

    if (loan.status !== LoanStatus.APPROVED) {
      throw new BadRequestException('Loan must be approved first');
    }

    return await this.prisma.loan.update({
      where: { id: loanId },
      data: { status: LoanStatus.ONGOING },
    });
  }

  /** 🎉 Mark Loan as Completed */
  async completeLoan(loanId: string) {
    const loan = await this.prisma.loan.findUnique({ where: { id: loanId } });
    if (!loan) throw new NotFoundException('Loan not found');

    if (loan.remainingMonths !== 0) {
      throw new BadRequestException('Loan still has unpaid installments');
    }

    return await this.prisma.loan.update({
      where: { id: loanId },
      data: { status: LoanStatus.COMPLETED },
    });
  }
}
