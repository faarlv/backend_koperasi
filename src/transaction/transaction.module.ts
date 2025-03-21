import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { BalanceService } from 'src/balance/balance.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [TransactionService, BalanceService, PrismaService],
  controllers: [TransactionController],
})
export class TransactionModule {}
