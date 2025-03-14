import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [LoanService, PrismaService],
  controllers: [LoanController],
})
export class LoanModule {}
