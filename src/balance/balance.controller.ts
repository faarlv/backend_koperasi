/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BalanceService } from './balance.service';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get('me')
  @UseGuards(JwtGuard)
  async getMyBalance(@Request() req) {
    return await this.balanceService.getBalanceUserById(req.user.id);
  }

  @Get('all')
  async getAllBalance() {
    return await this.balanceService.getAllBalance();
  }

  @Get('total')
  async getTotalBalance() {
    return await this.balanceService.getTotalBalance();
  }

  @Get(':userId')
  async getUserBalance(@Param('userId') userId: string) {
    return this.balanceService.getBalanceUserById(userId);
  }

  @Get('transaction/:userId')
  async getUserTransaction(@Param('userId') userId: string) {
    return await this.balanceService.getUserTransaction(userId);
  }

  @Put(':userId')
  async updateUserBalance(
    @Param('userId') userId: string,
    @Body() body: { amount: number; type: string },
  ) {
    return this.balanceService.updateBalance(userId, body.amount, body.type);
  }
}
