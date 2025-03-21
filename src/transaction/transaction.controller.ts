import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create.transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post('add/')
  async addTransaction(@Body() body: CreateTransactionDto) {
    return this.transactionService.createTransaction({ ...body });
  }

  @Get('all')
  async getAllTransaction() {
    return this.transactionService.getAllTransaction();
  }
}
