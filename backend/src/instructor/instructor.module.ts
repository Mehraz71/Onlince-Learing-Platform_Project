import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstructorEntity } from './instructor_entity';
import { InstructorService } from './instructor.service';
import { InstructorController } from './instructor.controller';
import { TransactionEntity } from '../finance/transaction.entity';
import { FinanceService } from '../finance/finance.service';
import { SalaryPaymentEntity } from './salary_payment.entity';
import { MonthlyFinanceSummaryEntity } from 'src/finance/monthly_finance_summary.entity';
import { ExpenseEntity } from 'src/finance/expenses.entity';
import { NotificationService } from 'src/notification/notification.service';
import { CourseEntity } from 'src/course/course-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InstructorEntity,
      SalaryPaymentEntity,
      TransactionEntity,
      MonthlyFinanceSummaryEntity,
      ExpenseEntity,
      CourseEntity,
    ]),
  ],
  controllers: [InstructorController],
  providers: [InstructorService, FinanceService, NotificationService],
  exports: [InstructorService],
})
export class InstructorModule {}
