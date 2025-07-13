// src/finance/finance.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { TransactionEntity } from './transaction.entity';

import { ExpenseEntity } from './expenses.entity';
import { MonthlyFinanceSummaryEntity } from './monthly_finance_summary.entity';

@Controller('finance')
export class FinanceController {
  constructor(private financeService: FinanceService) {}

  @Post('/transactions')
  create(@Body() data: Partial<TransactionEntity>) {
    return this.financeService.createTransaction(data);
  }

  @Get('/transactions')
  getAllTransactions(): Promise<TransactionEntity[]> {
    return this.financeService.getAllTran();
  }

   @Post('/monthly')
  createMonthly(@Body() data: Partial<MonthlyFinanceSummaryEntity>) {
    return this.financeService.createMonthly(data);
  }

  @Get('/monthly')
  getAllMonthly(): Promise<MonthlyFinanceSummaryEntity[]> {
    return this.financeService.getAllmonthly();
  }
  @Get('/monthly')
getMonthly() {
  return this.financeService.getAllmonthly();
}

  @Post('/expense')
  createExpense(@Body() data: Partial<ExpenseEntity>) {
    return this.financeService.createExpense(data);
  }

  @Get('/expense')
  getAllExpenses(): Promise<ExpenseEntity[]> {
    return this.financeService.getAllexpense();
  }


  @Get('chart/income-by-category')
  getIncomeChart() {
    return this.financeService.getIncomeByCategory();
  }

  @Get('chart/monthly-income')
  getMonthlyChart() {
    return this.financeService.getMonthlyIncome();
  }
}
