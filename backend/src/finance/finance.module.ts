// src/finance/finance.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';
import { TransactionEntity } from './transaction.entity';

import { ExpenseEntity } from './expenses.entity';
import { SalaryPaymentEntity } from 'src/instructor/salary_payment.entity';
import { MonthlyFinanceSummaryEntity } from './monthly_finance_summary.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransactionEntity,
      MonthlyFinanceSummaryEntity,
      ExpenseEntity,
      SalaryPaymentEntity,
    ]),
  ],
  providers: [FinanceService],
  controllers: [FinanceController],
})
export class FinanceModule {}
