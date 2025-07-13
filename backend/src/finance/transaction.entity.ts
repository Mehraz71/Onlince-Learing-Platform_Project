import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  student_id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  transaction_type: 'payment' | 'refund';

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  amount: number;

  @Column({ nullable: true })
  category: 'course' | 'material' | 'exam' | 'Instructor Salary';

  @Column({ nullable: true })
  method: 'Bank' | 'Bkash';

  @Column({ type: 'timestamp', nullable: true })
  paid_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
