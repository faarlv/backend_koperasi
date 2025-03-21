import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create.transaction.dto';
import { BalanceService } from 'src/balance/balance.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(
    private balanceService: BalanceService,
    private prismaService: PrismaService,
  ) {}

  async createTransaction(dto: CreateTransactionDto) {
    return this.balanceService.updateBalance(dto.userId, dto.amount, dto.type);
  }

  async getAllTransaction() {
    return await this.prismaService.transaction.findMany();
  }
}
