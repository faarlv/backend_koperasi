import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoanStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class InstallmentService {
  constructor(private prisma: PrismaService) {}

  /** 📜 Get all installments for a loan */
  async getLoanInstallments(loanId: string) {
    return await this.prisma.installment.findMany({
      where: { loanId },
      orderBy: { createdAt: 'asc' },
    });
  }

  /** 💸 Pay an installment */
  async payInstallment(userId: string, loanId: string, amountPaid: number) {
    return await this.prisma.$transaction(async (prisma) => {
      if (typeof loanId !== 'string') {
        throw new Error('loanId must be a string');
      }
      console.log(loanId)

      const loan = await prisma.loan.findUnique({
        where: { id: loanId },
      });

      if (!loan) throw new NotFoundException('Loan not found');
      if (loan.userId !== userId) throw new BadRequestException('Unauthorized');
      if (loan.status !== LoanStatus.ONGOING) {
        throw new BadRequestException('Loan is not active');
      }
      if (loan.paidMonths >= loan.duration) {
        throw new BadRequestException('Loan is already fully paid');
      }

      // Create a new installment record
      await prisma.installment.create({
        data: {
          loanId: loanId,
          month: loan.paidMonths + 1,
          paidAt: new Date(),
          amountPaid, // New field to track how much was paid
        },
      });

      // Calculate new total paid
      const newTotalPaid = new Decimal(loan.totalPaid).plus(amountPaid);

      // Update loan progress
      const updatedLoan = await prisma.loan.update({
        where: { id: loanId },
        data: {
          paidMonths: { increment: 1 },
          remainingMonths: { decrement: 1 },
          totalPaid: newTotalPaid, // Update totalPaid
        },
      });

      // If fully paid, mark loan as completed
      if (
        updatedLoan.remainingMonths === 0 &&
        newTotalPaid.greaterThanOrEqualTo(loan.totalDue)
      ) {
        await prisma.loan.update({
          where: { id: loanId },
          data: { status: LoanStatus.COMPLETED },
        });
      }

      return {
        message: 'Installment paid successfully',
        totalPaid: newTotalPaid,
      };
    });
  }
}
