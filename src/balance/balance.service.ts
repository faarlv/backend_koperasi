import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BalanceService {
  constructor(private prismaService: PrismaService) {}

  async getBalanceUserById(userId: string) {
    const balance = await this.prismaService.userBalance.findFirst({
      where: { userId: userId },
    });
    if (!balance) throw new UnauthorizedException();
    return balance;
  }

  async getUserTransaction(userId: string) {
    return await this.prismaService.transaction.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async updateBalance(userId: string, amount: number) {
    return this.prismaService.$transaction(async (prisma) => {
      console.log('Updating balance for userId:', userId);

      // Find the balance by userId
      let balance = await prisma.userBalance.findFirst({
        where: { userId }, // Use userId to find the balance
      });
      console.log('Found balance:', balance);

      // If the balance doesn't exist, create it
      if (!balance) {
        console.log('Balance not found, creating new balance...');
        balance = await prisma.userBalance.create({
          data: { userId, totalBalance: 0 },
        });
        console.log('Created new balance:', balance);
      }

      // Calculate the new balance
      const newBalance = balance.totalBalance.plus(amount);
      console.log('New balance:', newBalance.toString());

      // Update the balance using the id (primary key)
      const updatedBalance = await prisma.userBalance.update({
        where: { id: balance.id }, // Use id (primary key) to update the balance
        data: {
          totalBalance: newBalance,
          updatedAt: new Date(),
        },
      });
      console.log('Updated balance:', updatedBalance);

      // Create a transaction record
      await prisma.transaction.create({
        data: { userId, amount },
      });
      console.log('Transaction created for userId:', userId);

      return updatedBalance;
    });
  }
}
