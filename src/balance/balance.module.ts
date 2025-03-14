import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [BalanceService, PrismaService],
  controllers: [BalanceController],
})
export class BalanceModule {}
