import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BalanceModule } from './balance/balance.module';
import { LoanModule } from './loan/loan.module';
import { InstallmentModule } from './installment/installment.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, BalanceModule, LoanModule, InstallmentModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
