import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('expenses')
export class ExpenseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  amount: number;

  @Column({ nullable: true })
  category: 'instructor_salary' | 'maintenance' | 'event' | 'marketing';

  @Column({ nullable: true })
  paid_to: string;

  @Column({ type: 'date', nullable: true })
  expense_date: Date;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;
}
