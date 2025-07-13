import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('monthly_finance_summary')
export class MonthlyFinanceSummaryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  month: string; 

  @Column('decimal', { precision: 12, scale: 2 })
  total_income: number;

  @Column('decimal', { precision: 12, scale: 2 })
  total_refunds: number;

  @Column('decimal', { precision: 12, scale: 2 })
  net_revenue: number;

  @Column()
  transactions_count: number;

  @CreateDateColumn()
  created_at: Date;
}




