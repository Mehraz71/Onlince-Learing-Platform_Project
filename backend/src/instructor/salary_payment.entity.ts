import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { InstructorEntity } from './instructor_entity';

@Entity('salary_payments')
export class SalaryPaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => InstructorEntity)
  @JoinColumn({ name: 'instructor_id' })
  instructor: InstructorEntity;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ default: 'Bank' })
  payment_method: 'Bank' | 'Bkash'; 

  @Column({ type: 'date' })
  payment_date: Date;

  @Column()
  month: string; 
}
