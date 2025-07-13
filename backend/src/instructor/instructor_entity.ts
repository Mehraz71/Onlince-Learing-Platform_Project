import { CourseEntity } from 'src/course/course-entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('instructor')
export class InstructorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ default: 'unpaid' })
  salary_status: 'paid' | 'unpaid';

  @Column({ default: 'Bank' })
  payment_method: 'Bank' | 'Bkash';

  @Column()
  bank_acc: string;

  @Column()
  salary: number;

  @ManyToMany(() => CourseEntity, (course) => course.instructors, {
    cascade: true,
  })
  @JoinTable()
  courses: CourseEntity[];
}
