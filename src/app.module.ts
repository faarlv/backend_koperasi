import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BalanceModule } from './balance/balance.module';
import { LoanModule } from './loan/loan.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, BalanceModule, LoanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
