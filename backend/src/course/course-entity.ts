import { InstructorEntity } from 'src/instructor/instructor_entity';
import { StudentEntity } from 'src/student/student.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('courses')
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  course_title: string;

  @Column({ type: 'varchar', nullable: true, length: 100 })
  course_instructor: string;

  @Column({ type: 'varchar', length: 100 })
  course_level: string;

  @Column({ type: 'varchar', length: 100 })
  course_duration: string;

  @Column({ type: 'timestamp', nullable: true })
  class_start_time: string;

  @Column({ type: 'timestamp', nullable: true })
  class_end_time: string;

  @Column({ type: 'float' })
  course_price: number;

  @Column({ type: 'int' })
  total_enrolled: number;

  @ManyToMany(() => InstructorEntity, (instructor) => instructor.courses)
  instructors: InstructorEntity[];

@ManyToMany(() => StudentEntity, (student) => student.courses)
students: StudentEntity[];
}
