import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from './transaction.entity'
import { ExpenseEntity } from './expenses.entity';
import { privateDecrypt } from 'crypto';
import { Repository } from 'typeorm';
import { MonthlyFinanceSummaryEntity } from './monthly_finance_summary.entity';

@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(TransactionEntity)
    private financeRepository: Repository<TransactionEntity>,
    @InjectRepository(MonthlyFinanceSummaryEntity)
    private readonly monthlyRepo: Repository<MonthlyFinanceSummaryEntity>,

    @InjectRepository(ExpenseEntity)
    private readonly expenseRepo: Repository<ExpenseEntity>,
  ) {}

  async createTransaction(data: Partial<TransactionEntity>) {
    const transaction = this.financeRepository.create(data);
    return this.financeRepository.save(transaction);
  }

  async getAllTran(): Promise<TransactionEntity[]> {
    return this.financeRepository.find();
  }

  async createMonthly(
    data: Partial<MonthlyFinanceSummaryEntity>,
  ): Promise<MonthlyFinanceSummaryEntity> {
    const newMonthly = this.monthlyRepo.create(data);
    return this.monthlyRepo.save(newMonthly);
  }

  async getAllmonthly(): Promise<MonthlyFinanceSummaryEntity[]> {
    return this.monthlyRepo.find();
  }

  async createExpense(data: Partial<ExpenseEntity>): Promise<ExpenseEntity> {
    const newExpanse = this.expenseRepo.create(data);
    return this.expenseRepo.save(newExpanse);
  }

  async getAllexpense(): Promise<ExpenseEntity[]> {
    return this.expenseRepo.find();
  }

  // Get total income by category (for pie chart)

  async getIncomeByCategory() {
    const result = await this.financeRepository
      .createQueryBuilder('t')
      .select('t.category', 'category')
      .addSelect('SUM(t.amount)', 'total')
      .where("t.transaction_type = 'payment'")
      .groupBy('t.category')
      .getRawMany();
    return result.map((r) => ({
      category: r.category,
      total: parseFloat(r.total),
    }));
  }

  // Get monthly income (for line chart)

  async getMonthlyIncome() {
    const result = await this.financeRepository
      .createQueryBuilder('t')
      .select("TO_CHAR(t.paid_at, 'YYYY-MM')", 'month')
      .addSelect('SUM(t.amount)', 'total')
      .where("t.transaction_type = 'payment'")
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany();

    return result.map((r) => ({
      month: r.month,
      total: parseFloat(r.total),
    }));
  }
}
